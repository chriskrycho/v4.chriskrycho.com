---
Title: "Exploring 4 Languages: Integrity and Consistency"
Subtitle: Making, and keeping, promises – with Rust, Elm, F<sup>♯</sup>, and ReasonML.
Date: 2018-03-24 22:00 
Tags: functional programming, rust, elm, fsharp, reasonml, domain-driven design, four-languages
Category: Tech
Summary: >
    Using the type systems of Rust, Elm, F♯, and ReasonML to not only model a domain but to make sure we keep our promises.

---

In chapter 6, Wlaschin turns to one of the most important aspects of "domain modeling": keeping it consistent. It's all well and good to set up a domain model, but if you don't have a way to make sure that model is reliable everywhere you use it, well... you've done a lot of extra work and you're not going to see a lot of results for all that effort! But as Wlaschin points out, we can actually use the type systems, and the types we wrote up in the previous chapter, to help us enforce the business *rules* for our domain (as well as the business *shapes* in the domain).

## A simple example: `WidgetCode`

We'll start with one of the simpler examples: validating that a `WidgetCode` is legitimate. A `WidgetCode`, in this domain, is valid if, and *only* if, it has a `W` followed by four digits.

The basic tack we'll take, in all four languages, is to leverage the way the types work to make it so we have to use a function to create a valid instance of a `WidgetCode`. That's a bit of extra work (though especially in the functional-first languages, it ends up not being a *lot* of extra work) but it lets us use `Result` types to handle invalid data up front.

The downside is that we can't just get directly at the value inside our wrapper types using basic pattern matching. Instead, we need to be provide a function for "unwrapping" it. Tradeoffs!

We'll go at this using the most appropriate tool from each language, but in every case we'll end up with a `create` function that takes a string and returns a `Result` with the successful option being a `WidgetCode` and the error option being a string describing the error; and a `value` function to unwrap a valid code. Throughout, I also assume an essentially-identical implementation of a related `GizmoCode` type; I pull both in to show how they end up being used side by side.

### Rust

We are using a tuple struct to wrap the string value here. Since there is no `pub` modifier in the wrapped `String`, it's opaque from the perspective of the caller---and this is exactly what we want. We'll pull in [the `Regex` crate] and validate the code passed to us on creation.

[the `Regex` crate]: https://docs.rs/regex/0.2.10/regex/

```rust
use regex::Regex;

pub struct WidgetCode(String);

impl WidgetCode {
    pub fn create(code: &str) -> Result<WidgetCode, String> {
        let re = Regex::new(r"W\d{4}").expect(r"W\d{4} is a valid regex");
        if re.is_match(code) {
            Ok(WidgetCode(String::from(code)))
        } else {
            Err(String::from(
                "`WidgetCode` must begin with a 'W' and be followed by 4 digits",
            ))
        }
    }
    
    pub fn value(&self) -> String {
        &self.0
    }
}
```

This is fairly idiomatic Rust: we're *borrowing* a *reference* to the code as a "string slice", and creating a new, wrapped `String` instance to wrap up the code *or* return a new `String` as an error. When we get the value out, we return a reference to the string,[^lifetime] with `&self.0`: `&` to indicate a reference, `.0` to indicate the first item of a tuple. Note as well that the final `if` block here is an expression. There's no semicolon terminating it, and this whole `if` block ends up being the resulting value of the function.

[^lifetime]: This reference will live and be valid as long as the underlying `WidgetCode` is. We could also return a `String` if we wanted that value to live independently of the `WidgetCode` instance backing it.

One other point of interest here is that the creation of the regex *itself* is checked by the compiler for us! If we pass an invalid regular expression, this simply won't compile.

This could also live in its own module, `ordering/widget_code.rs`, and in fact that's how I would normally do this (and have in the repository where I'm working): every one of these small types would get its own module file within the containing `Ordering` module. It's not *necessary*, but as the domain model grows, it becomes increasingly *convenient* in that you always know where to find things.[^rs-privacy]

[^rs-privacy]: Putting it in its own module, whether in a separate *does* have implications for privacy, though we don't much care about them in this case. Rust lets us set the privacy on [a whole spectrum](https://doc.rust-lang.org/1.24.1/reference/visibility-and-privacy.html), from "visible everywhere" to "only visible in this specific module."

Then we can import it and use it like this in `ordering/mod.rs`:

```rust
mod widget_code;
mod gizmo_code;

use widget_code::WidgetCode;
use gizmo_code::GizmoCode;

pub enum ProductCode {
    Widget(WidgetCode),
    Gizmo(GizmoCode),
}

fn demo_it() {
    let valid = WidgetCode::create("W1234");
    let invalid = WidgetCode::create("wat");

    let unwrapped = match valid {
        Ok(ref code) => code.value(),
        Err(_) => "",
    };
}
```

Notice that in Rust, the `mod.rs` file declares all child modules. If you had a `widget_code.rs` on the file system but no `mod widget_code;`, Rust would just ignore the declaration entirely. Then Rust also requires us to `use widget_code;` to access its contents. The distinction between declaring and using a given module makes some sense: by the time all is said and done with this exercise, we won't be doing much of anything in this `Ordering` module; it'll exist primarily as a grouping construct for all the *other* modules.

In this case, we go ahead and import the `WidgetCode` type from the module. We only have the one type there, with no standalone functions: everything is attached to the type via the `impl` block; so we can just call everything directly off of the type. This ends up feeling *kind of* like the way we'd do things in a traditional OOP language, but also *really not*, because we still have a separation between the data type and the implementation of functionality attached to it. It's not obvious *here*, but we could write `impl WidgetCode` in some *other* module in the crate, and as long as there's no conflict between the implementations, it's fine! And then we could call whatever function we defined in *that* block "on" `WidgetCode`. This is on the one hand *totally* unlike what we'll see in the other languages, and on the other hand *weirdly analogous* to them.

I'm going to pass over why we need `ref code` here, as it gets into details of Rust's model of ownership and reference borrowing *and* it's going to be unneeded because of improvements to Rust's compiler fairly soon. The one thing to note here is that we get nice memory/allocation behavior, i.e. we're not doing a bunch of separate heap string allocations here. This is one of the big upsides to Rust in general! It's not quite as pretty as what we'll see below, but the performance wins are awesome.

### Elm

Elm introduces us to a pattern we'll see in each of the more traditional "functional" languages: the use of *modules* for this kind of structure. First the code, then some comments on it:

```elm
-- src/ordering/WidgetCode.elm
module Ordering.WidgetCode exposing (create, value)

import Regex exposing (contains, regex)


type WidgetCode
    = WidgetCode String


create : String -> Result String WidgetCode
create code =
    if contains (regex "W\\d{4}") code then
        Ok (WidgetCode code)
    else
        Err "`WidgetCode` must begin with a 'W' and be followed by 4 digits"


value : WidgetCode -> String
value (WidgetCode code) =
    code
```

Elm's module system lets you choose exactly what to expose. In this case, we're only exporting the `create` and `value` functions.

You can import the things exposed both as a module and as individual items. Assume we implemented `GizmoCode` the same way. We'd import and use them in `Ordering.elm` like this:

```elm
-- Ordering.elm
import Ordering.WidgetCode as WidgetCode exposing (WidgetCode)
import Ordering.GizmoCode as GizmoCode exposing (GizmoCode)

type ProductCode
    = Widget WidgetCode
    | Gizmo GizmoCode
    
valid =
    WidgetCode.create "W1234"


invalid =
    WidgetCode.create "wat"


unwrapped =
    case valid of
        Result.Ok code ->
            WidgetCode.value (code)

        Result.Err _ ->
            ""
```

As with Rust, we can't construct the type without using the provided function. As I've written the imports, you'd create a `WidgetCode` by writing `WidgetCode.create "W1234"`. You could also import it directly, but that would have its own problems once you had the `create` function imported for `GizmoCode` as well.

Finally, notice the way we aliased the module name here with `as` on the import: we don't have to write out the fully qualified path this way. And there's no conflict between the aliased module name and the type name – they live in their own namespaces (as it should be!). Importing the type name distinctly is handy because it means we don't have to write the body of the union type out as `Widget WidgetCode.WidgetCode`.

### F^♯^

The F^♯^ code looks a *lot* like the Elm code. The main differences here have to do with their module systems.

```fsharp
namespace Ordering

type WidgetCode = private WidgetCode of string
module WidgetCode =
    let create code =
        if Regex.IsMatch(code, @"W\d{4}") then
            Ok (WidgetCode code)
        else
            Error "`WidgetCode` must begin with a 'W' and be followed by 4 digits"

    let value (WidgetCode code) = code
```

Here we declare that we're in the `namespace Ordering`. Everything here will be publicly visible to everything *else* in the `namespace Ordering`. We could also make this a `module`, and in that case we'd need to explicitly open it in other modules. Because it's part of the base namespace we're using for `Ordering`, though, we get it for "free". There's a downside to this, though. More on that below.

Also notice that this means that we have yet one more "namespace" for names to live in: `namespace` names are different from `module` are different from type names! So here we declare a top-level `module Ordering` here so that we can actually write code that *does something* in the file – `namespace`s can only contain type definitions (including `module` definitions).

```fsharp
namespace Ordering

type ProductCode =
    | Widget of WidgetCode
    | Gizmo of GizmoCode

module DemoIt =
    let valid = WidgetCode.create "W1234"
    let invalid = WidgetCode.create "wat"
    
    let unwrapped =
        match valid with
        | Ok(code) -> WidgetCode.value code
        | Error(_) -> ""
```

The things to notice here as particularly different from the others:

1. We don't have to explicitly import the module names, because we used the same namespace (`Ordering`) to group them. We could also have done `namespace Ordering.WidgetCode` and `open Ordering.WidgetCode`; that might actually make more or less sense in the context. I *think* this is probably more idiomatic, however, which is why I picked it.
2. Since we're keeping the rest of the containing module in the same namespace, we *do* have to declare `module DemoIt` for functionality – not just types – to live in. This is true for both `Ordering.fs` and `WidgetCode.fs` and so on.

This way of structuring things works really well, but it has one major downside compared to Elm and Rust: where any given name comes from is *not* obvious from any given text file. Using modules instead of namespaces and using more fully qualified names *could* help here, but the reality is simply that F^♯^ (like C^♯^) basically leaves you out to dry here. My take is that this is basically what happens when you design a language *assuming* IDE-like tooling. But especially when looking at e.g. GitHub diff views, or just browsing source code in general, I strongly prefer the way Elm and Rust generally lead you to do explicit imports or fully qualified paths. (Both have an escape hatch: Rust's `use path::to::module::*;` and Elm's `import Path.To.Module exposing (..)`, but both are actively discouraged as bad practice in *most* situations.)

### Reason

Interestingly, Reason *looks* most like Rust but *behaves* most like F^♯^. The biggest difference is that I need a separate *interface file* for Reason to get the privacy benefits that I'm getting in all the other languages.

We put the definition file at `ordering/Ordering_WidgetCode.rei`. (I'll comment on the long name in a moment.)

```reason
type gizmoCode = pri | GizmoCode(string);

let create: string => Js.Result.t(widgetCode, string);

let value: widgetCode => string;
```

With that module definition in place, we can separately supply the implementation, in `ordering/Ordering_WidgetCode.re`.

```reason
type widgetCode =
  | WidgetCode(string);

let create = code => {
  let isMatch =
    Js.Re.fromString("W\\d{4}") |> Js.Re.exec(code) |> Js.Option.isSome;
  if (isMatch) {
    Js.Result.Ok(WidgetCode(code));
  } else {
    Js.Result.Error(
      "`WidgetCode` must begin with a 'W' and be followed by 4 digits"
    );
  };
};

let value = (WidgetCode(code)) => code;
```

Note that you could do the same thing with an interface file for F^♯^. We're also doing something that's similar in principle to the use of private types in in F^♯^, but unlike in F^♯^ we *have* to use the module interface to make it work as far as I can tell. The *interface* can declare the type private, but in the actual implementation, the type has to be non-private to be constructable. (If I'm wrong, please send me a note to let me know! But that's what I gathered from reading OCaml docs, as well as from command line error messages as I played around.) Also, the fact that Reason has landed on the keyword `pri` instead of OCaml and F^♯^'s much saner `private` is super weird.

The interface file just defines the types, and has the `.rei` extension. `type widgetCode` here is an *abstract* type, which provides no information about what it contains. Note the function types are provided as well. Here I'm using specifically the `Js.Result` type; there is also a `Result` type in at least one of the OCaml standard libraries. This is one of the more complicated things about Reason compared to the others: there are... *several* standard libraries to choose from, which will or won't work differently depending on what compile target you're picking.

In any case, once we have both the module and the implementation defined, we can use it like this in `ordering.re`:

```reason
module WidgetCode = Ordering_WidgetCode;

module GizmoCode = Ordering_GizmoCode;

open WidgetCode;

open GizmoCode;

type productCode =
  | Widget(widgetCode)
  | Gizmo(gizmoCode);

let valid = WidgetCode.create("W1234");

let invalid = WidgetCode.create("wat");

let unwrapped =
  switch valid {
  | Js.Result.Ok(code) => WidgetCode.value(code)
  | Js.Result.Error(_) => ""
  };
```

We do this mapping from `Ordering_WidgetCode` to `WidgetCode` here because OCaml and therefore Reason has only a single global namespace for its module names as defined by the file system. You can nest modules, but only *within* files. The workaround is, well… `Ordering_` and remapping the name as we have here. This lets you access the nested modules as `Ordering.WidgetCode` and so on elsewhere.

Then we `open WidgetCode` etc. so that we can write `widgetCode` instead of `WidgetCode.widgetCode` in the `productCode` definition. This is basically the same effect we get from just being in the same `namespace` in F^♯^ (which, again, we could rewrite exactly this way), or from the kinds of imports we discussed above for Rust and Elm.

## Numeric validation: `UnitQuantity`

So far, the showing tilts *heavily* in F^♯^'s and Elm's favor in terms of expressiveness and elegance. However, there's a lot of variation depending on exactly what you're doing. If, for example, you want to validate a *range*, well... then Rust actually has a pretty good approach! Once again, you'll note that these all have a lot in common; the difference mostly comes down to the degree of syntactical noise required to express the same basic thing.

In this section, I'm not really going to spend a lot of time discussing the details and differences; I'm just leaving it here to show an interesting example where the languages' design decisions end up have slightly different ergonomic tradeoffs.

### Rust

```rust
// ordering/unit_quantity.rs
pub struct UnitQuantity(u32);

impl UnitQuantity {
    pub fn create(qty: u32) -> Result<UnitQuantity, String> {
        match qty {
            0 => Err(String::from("`UnitQuantity` cannot be less than 1")),
            1...1000 => Ok(UnitQuantity(qty)),
            _ => Err(String::from("`UnitQuantity` cannot be greater than 1000")),
        }
    }

    pub fn value(&self) -> u32 {
        self.0
    }

    pub fn minimum() -> UnitQuantity {
        UnitQuantity(1)
    }
}
```

### Elm

```elm
-- ordering/UnitQuantity.elm
module Ordering.UnitQuantity exposing (UnitQuantity, create, value)


type UnitQuantity
    = UnitQuantity Int


create : Int -> Result String UnitQuantity
create qty =
    if qty < 1 then
        Err "`UnitQuantity` cannot be less than 1"
    else if qty > 1000 then
        Err "`UnitQuantity` cannot be greater than 1000"
    else
        Ok (UnitQuantity qty)


value : UnitQuantity -> Int
value (UnitQuantity qty) =
    qty

    
minimum : UnitQuantity
minimum = UnitQuantity 0
```

### F^♯^

```fsharp
// ordering/UnitQuantity.fs
namespace Ordering

type UnitQuantity = private UnitQuantity of uint32
module UnitQuantity =
    let create qty =
        if qty < 1u then
            Error "`UnitQuantity` cannot be less than 1"
        else if qty > 1000u then
            Error "`UnitQuantity` cannot be greater than 1000"
        else
            Ok (UnitQuantity qty)

    let value (UnitQuantity qty) = qty
    
    let minimum = UnitQuantity 0
```

### Reason

```reason
/* ordering/Ordering_UnitQuantity.rei */
type unitQuantity = pri | UnitQuantity(int);

let create: int => Js.Result.t(unitQuantity, string);

let value: unitQuantity => int;
```

```reason
/* ordering/Ordering_UnitQuantity.re */

type unitQuantity =
  | UnitQuantity(int);

let create = qty =>
  if (qty < 1) {
    Js.Result.Error("`UnitQuantity` cannot be less than 1");
  } else if (qty > 1000) {
    Js.Result.Error("`UnitQuantity` cannot be greater than 1000");
  } else {
    Js.Result.Ok(UnitQuantity(qty));
  };

let value = (UnitQuantity(qty)) => qty;

let minimum = UnitQuantity(0);
```

## Aside: On Documentation

One thing that became *extremely* clear in the course of working all of this out is that the documentation stories for these languages are in vastly, *vastly* different places.

Figuring out how to write this private `create`/`value` approach was *very* straightforward in Rust, because it's literally just right there in how `impl` blocks and the `pub` keyword work: things default to private, including the contents of a struct, and you *always* define the related functionality with `pub fn` declarations in the related `impl` block.

Elm and F^♯^ were both slightly harder, in that I had to poke around a bit to figure out the right way to do it. But not *that* much harder. Both use module-level isolation to accomplish this; the main difference there was that F^♯^ just lets you do it inline and Elm explicitly ties modules to files.

Reason... was very, *very* difficult to get sorted out. This is just a function of the state of the ecosystem. Reason is *distinct syntax* for OCaml, but it also leans on BuckleScript. That means that if you want to figure out how to do anything, you probably need to search in the docs for all of those, and if your answer turns out to come from OCaml then you have to figure out how to translate it back into Reason and BuckleScript! Ultimately, I was able to figure it out and get the project layout to how you see it in the repository, but… it took a lot more digging than with any of the other projects!

## Summary

As with our [previous foray](http://www.chriskrycho.com/2018/exploring-4-languages-starting-to-model-the-domain.html), we can see a ton of similarities across these languages. All lean heavily on pattern-matching for dealing with different scenarios; all let us make use of a `Result` type for handling success or failure; all make heavy use of expression-bodied-ness; and all supply *some* way to make types constructable only in safe/controlled ways.

For Rust, that's a matter of leaving the internals of a `struct` private and making `pub fn` helpers to do the construction and value retrieval. For Elm, F^♯^, and Reason, that's a matter of having the normal type *constructors* be private while exposing the types themselves normally. They do that in different ways (F^♯^'s `private type`, Elm's `exposing`, and Reason's `pri` annotation on the type variant in a module interface file), but the effect is essentially identical, and functionally equivalent to what we see in Rust.

The main differences we see across Elm, F^♯^, and Reason have to do with the nature of the various module systems. In a lot of ways, Reason's is the least capable *for this specific purpose*, because it's directly tied to OCaml's module system, which substantially predates any of the others. (I say "in a lot of ways" because OCaml's modules are surprisingly capable; they end up being their own kind of types and you can do some crazy things with them, all of which I'd like to actually come to understand... eventually.) Rust's module system, meanwhile, has a lot of similarities to Elm's in particular, but because we actually carry functions along with the types they `impl` (though they get defined separately, with all the power that entails), we have a bit less boilerplate we need to write just to get at the specific functions in play.

Next time (probably only a couple of weeks away because we're working through the book at work in a book club!), I'll be looking at Chapter 7: Modeling Workflows as Pipelines. I suspect this will be a place where the true functional orientation of Elm, F^♯^, and Reason will much more sharply differentiate them from the sometimes-functionalish-but-not-actually-functional way we write things in Rust.
