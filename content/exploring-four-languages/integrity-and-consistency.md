---
Title: "Exploring 4 Languages: Integrity and Consistency"
Subtitle: Making, and keeping, promises – with Rust, Elm, F<sup>♯</sup>, and ReasonML.
Date: 2018-03-23 09:00
Tags: functional programming, rust, elm, fsharp, reasonml, domain-driven design, four-languages
Category: Tech
Summary: >
    Using the type systems of Rust, Elm, F♯, and ReasonML to not only model a domain but to make sure we keep our promises.
Status: draft

---

In chapter 6, Wlaschin turns to one of the most important aspects of "domain modeling": keeping it consistent. It's all well and good to set up a domain model, but if you don't have a way to make sure that model is reliable everywhere you use it, well... you've done a lot of extra work and you're not going to see a lot of results for all that effort! But as Wlaschin points out, we can actually use the type systems, and the types we wrote up in the previous chapter, to help us enforce the business *rules* for our domain (as well as the business *shapes* in the domain).

## A simple example: `WidgetCode`

We'll start with one of the simpler examples: validating that a `WidgetCode` is legitimate. A `WidgetCode`, in this domain, is valid if, and *only* if, it has a `W` followed by four digits.

The basic tack we'll take, in all four languages, is to leverage the way the types work to make it so we have to use a function to create a valid instance of a `WidgetCode`. That's a bit of extra work (though especially in the functional-first languages, it ends up not being a *lot* of extra work) but it lets us use `Result` types to handle invalid data up front.

The downside is that we can't just get directly at the value inside our wrapper types using basic pattern matching. Instead, we need to be provide a function for "unwrapping" it. Tradeoffs!

We'll go at this using the most appropriate tool from each language, but in every case we'll end up with a `create` function that takes a string and returns a `Result` with the successful option being a `WidgetCode` and the error option being a string describing the error; and a `value` function to unwrap a valid code.

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

This could also live in its own module, and in fact that's how I would normally do this: every one of these small types would get its own module file within the containing `Domain` module. It's not *necessary*, but as the domain model grows, it becomes increasingly *convenient* in that you always know where to find things.[^rs-privacy]

[^rs-privacy]: Putting it in its own module, whether in a separate *does* have implications for privacy, though we don't much care about them in this case. Rust lets us set the privacy on [a whole spectrum](https://doc.rust-lang.org/1.24.1/reference/visibility-and-privacy.html), from "visible everywhere" to "only visible in this specific module."

One other point of interest here is that the creation of the regex *itself* is checked by the compiler for us! If we pass an invalid regular expression, this simply won't compile.

### Elm

Elm introduces us to a pattern we'll see in each of the more traditional "functional" languages: the use of *modules* for this kind of structure.

```elm
module Domain.WidgetCode exposing (WidgetCode, create)

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

### F^♯^

```fsharp
type WidgetCode = private WidgetCode of string
module WidgetCode =
    let create code =
        if Regex.IsMatch(code, @"W\d{4}") then
            Ok (WidgetCode code)
        else
            Error "`WidgetCode` must begin with a 'W' and be followed by 4 digits"

    let value (WidgetCode code) = code
```

### Reason

```reason
module WidgetCode: {
  type widgetCode;
  let create: string => Js.Result.t(widgetCode, string);
  let value: widgetCode => string;
} = {
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
};
```

## Numeric validation: `UnitQuantity`

So far, the showing tilts *heavily* in F^♯^'s favor in terms of expressiveness. However, there's a lot of variation depending on exactly what you're doing. If, for example, you want to validate a *range*, well... then Rust actually has a pretty good approach! Once again, you'll note that these all have a lot in common; the difference mostly comes down to the degree of syntactical noise required to express the same basic thing.

### Rust

```rust
pub struct UnitQuantity(u32);

impl UnitQuantity {
    pub fn create(qty: u32) -> Result<UnitQuantity, String> {
        match qty {
            0 => Err(String::from("`UnitQuantity` cannot be less than 1")),
            1...1000 => Ok(UnitQuantity(qty)),
            _ => Err(String::from("`UnitQuantity` cannot be greater than 1000")),
        }
    }
}
```

### Elm

```elm
module Domain.UnitQuantity exposing (UnitQuantity, create, value)


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
```

### F^♯^

```fsharp
type UnitQuantity = private UnitQuantity of uint32 // between 1 and 1000
module UnitQuantity =
    let create qty =
        if qty < 1u then
            Error "`UnitQuantity` cannot be less than 1"
        else if qty > 1000u then
            Error "`UnitQuantity` cannot be greater than 1000"
        else
            Ok (UnitQuantity qty)

    let value (UnitQuantity qty) = qty
```

### Reason

```reason
module UnitQuantity: {
  type unitQuantity;
  let create: int => Js.Result.t(unitQuantity, string);
  let value: unitQuantity => int;
} = {
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
};
```

## Aside: On Documentation

One thing that became *extremely* clear in the course of working all of this out is that the documentation stories for these languages are in vastly, *vastly* different places.

Figuring out how to write this private `create`/`value` approach was *very* straightforward in Rust, because it's literally just right there in how `impl` blocks and the `pub` keyword work: things default to private, including the contents of a struct, and you *always* define the related functionality with `pub fn` declarations in the related `impl` block.

Elm and F^♯^ were both slightly harder, in that I had to poke around a bit to figure out the right way to do it. But not *that* much harder. Both use module-level isolation to accomplish this; the main difference there was that F^♯^ just lets you do it inline and Elm explicitly ties modules to files.