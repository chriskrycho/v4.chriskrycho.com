---
Title: "Exploring 4 Languages: Starting to Model the Domain"
Subtitle: How we use types to capture business concepts in Rust, Elm, F<sup>♯</sup>, and ReasonML.
Date: 2018-01-14 09:00
Tags: functional programming, rust, elm, fsharp, reasonml, domain-driven design, four-languages
Category: tech
Summary: >
    Using the type systems of Rust, Elm, F♯, and ReasonML to encode the elements of a domain model—and starting to get some idea how the languages are like and unlike each other.

---

In the first three chapters of _Domain Modeling Made Functional_, Wlaschin walks through the creation of a "domain model" for an order-taking system. (It's well worth reading the book just for a bunch of the lessons in that section—I found them quite helpful!) Then, after spending a chapter introducing F^♯^'s type system, he introduces the ways you can *use* those type mechanics to express the domain. In today's post, I'll show the idiomatic implementations of these types in each of Rust, Elm, F^#^, and ReasonML.

## Simple values

Simple wrapper types let you take simple types like strings, numbers, etc. and use types to represent part of the business domain you're dealing with—the basic idea being that a Customer ID may be a number, but it's not interchangeable with *other* numbers such as Order IDs.

Here's the most ergonomic and effective (and automatically-formatted in line with the language standards, where applicable!) way to do that in each of the languages:

Rust:

```rust
struct CustomerId(i32);
```

Elm:

```elm
type CustomerId
    = CustomerId Int
```

F^♯^:

```fsharp
type CustomerId = CustomerId of int
```

ReasonML:

```reason
type customerId =
  | CustomerId(int);
```

Note how similar these all are! The Rust implementation is the *most* distinctive, though you can do it with the same kind of union type as the others. Here's how that would look:

```rust
enum CustomerId {
  CustomerId(i32),
}
```

For performance reasons, you might also choose to implement the F^♯^ type as a struct:

```fsharp
<Struct>
type CustomerId = CustomerId of int
```

## Complex data

Wlaschin then moves on to showing how to model more complex data structures: types that "and" or "or" together other data. We "and" data together using record or struct types, and "or" data together using "union" or "enum" types.

Rust:

```rust
// "and"
struct Order {
    customer_info: CustomerInfo,
    shipping_address: ShippingAddress,
    billing_address: BillingAddress,
    order_lines: Vec<OrderLine>,
    billing_amount: BillingAmount,
}

// "or"
enum ProductCode {
    Widget(WidgetCode),
    Gizmo(GizmoCode),
}
```

Elm:

```elm
-- "and"
type alias Order =
    { customer_info : CustomerInfo
    , shipping_address : ShippingAddress
    , billing_address : BillingAddress
    , order_lines : List OrderLine
    , billing_amount : BillingAmount
    }

-- "or"
type ProductCode
    = Widget WidgetCode
    | Gizmo GizmoCode
```

F^♯^:

```fsharp
// "and"
type Order = {
    CustomerInfo : CustomerInfo
    ShippingAddress : ShippingAddress
    BillingAddress : BillingAddress
    OrderLines : OrderLine list
    AmountToBill: BillingAmount
}

// "or"
type ProductCode =
    | Widget of WidgetCode
    | Gizmo of GizmoCode
```

ReasonML:

```reason
/* "and" */
type order = {
  customerInfo,
  shippingAddress,
  billingAddress,
  orderLine,
  billingAmount
};

/* "or" */
type productCode =
  | Widget(widgetCode)
  | Gizmo(gizmoCode);
```

An interesting aside: unless you planned to reuse these types, you wouldn't usually write these as standalone types with this many wrapper types in it in Rust in particular (even if the compiler would often recognize that it could squash them down for you).[^wrapper-types] Instead, you'd normally write *only* the base enum type to start, and refactor out the `struct` wrapper later only if you found you needed it elsewhere:

```diff
enum ProductCode {
-    Widget(WidgetCode),
+    Widget(String),
-    Gizmo(GizmoCode),
+    Gizmo(String),
}
```

That said: given how the book is tackling things, and the fact that you might want to *validate* these types... having them as these low-cost wrappers is probably worth it. (In fact, having read a bit further than I've managed to write out yet, I can guarantee it.)

[^wrapper-types]: I can't speak to what's idiomatic this way in any of the non-Rust languages, because I just haven't used them enough yet.

We work through the rest of the basic types this way. But what about the types where we don't yet have a good idea how we want to handle them?

Each of these languages gives us an out (or more than one) for how to say "I don't know what to put here yet."

Rust (which does not have a built-in `Never` type... yet; see below):

```rust
// Make an empty enum (which you by definition cannot construct)
enum Never {}

// Use it throughout where we don't know the type yet. It will
// fail to compile anywhere we try to *use* this.
type OrderId = Never;
```

Elm (which has a built-in `Never` type):

```elm
--  It will fail to compile anywhere we try to *use* this.
type alias OrderId =
    Never
```

F^#^ (which *sort* of does):

```fsharp
// Make a convenience type for the `exn`/`System.Exception` type
type Undefined = exn

type OrderId = Undefined
```

Reason (which also *sort* of does---identically with F^#^):

```reason
/* Make a convenience type for the `exn`/`System.Exception` type */
type undefined = exn

/*
  Use it throughout where we don't know the type yet. It will
  fail to compile anywhere we try to *use* this.
 */
type orderId = undefined
```

For both F^#^ and Reason, that's following Wlaschin's example. The main reason to do that is to make explicit that we're not wanting an unconstructable type in our domain model (weird though that idea is), but just something we haven't *yet* defined.

```rust
type OrderId = !;
```


## Workflows and functions

Once we have the basic types themselves in place, we need to write down the ways we transform between them. In a functional style, we're not going to implement instance methods---though as we'll see in the next post, what we do in Rust will have *some* similarities to class methods---we're going to implement standalone functions which take types and return other types.

Again, you'll note that despite the common lineage, there is a fair amount of variation here. (Note that we'd also have defined the `UnvalidatedOrder`, `ValidationError`, and `ValidatedOrder` types for all of this; I'm mostly interested in showing *new* differences here.)

Rust (using the [Futures](https://github.com/alexcrichton/futures-rs) library to represent eventual computation):

```rust
type ValidationResponse<T> = Future<Item = T, Error = ValidationError>;

fn validate_order(unvalidated: UnvalidatedOrder) -> Box<ValidationResponse<ValidatedOrder>> {
    unimplemented!()
}
```

Elm (using the built-in `Task` type for eventual computation):

```elm
type ValidationResponse a
    = Task a (List ValidationError)

type alias ValidateOrder =
    UnvalidatedOrder -> ValidationResponse ValidatedOrder
```

F^#^ (using the built-in `Async` type for eventual computation):

```fsharp
type ValidationResponse<'a> = Async<Result<'a,ValidationError list>>

type ValidateOrder =
    UnvalidatedOrder -> ValidationResponse<ValidatedOrder>
```

Reason (using the built-in JavaScript-specific `Js.Promise` type---which is exactly what it sounds like---for eventual computation):

```reason
type validationResponse('a) = Js.Promise.t(Js.Result.t('a, list(validationError)));

type validateOrder = unvalidatedOrder => validationResponse(validatedOrder);
```

Once again Rust is much *more* different here from the others than they are from each other. The biggest difference between Elm, F^#^, and Reason is how they handle generics and type parameters.

You'll note that in Elm, they just follow the name of the wrapping type. This is a kind of syntactic symmetry: the way you *name* a generic type like this is the same basic way you *construct* it. It's quite elegant. And as it turns out, the same is true of Reason; it's just that its authors have chosen to follow OCaml and use parentheses for them instead of following Haskell with spaces---a reasonable choice, given Reason is surface syntax for OCaml and not Haskell. F^#^ uses angle brackets, I strongly suspect, because that's what C^#^ uses for generics, and keeping them syntactically aligned in things like this is very helpful.

Rust uses angle brackets for generics, just as F^#^ does, but we haven't written out a *type* declaration here; we've actually written out a stub of a function, with the [`unimplemented!()`](https://doc.rust-lang.org/std/macro.unimplemented.html) [macro](https://doc.rust-lang.org/1.17.0/reference/macros-by-example.html). If you invoke this function, you'll get a clear crash with an explanation of which function isn't implemented.

Now, Rust also *does* let us write out the type of these functions as type aliases if we want:

```rust
type VaidateOrder =
    Fn(UnvalidatedOrder) -> Box<ValidationResponse<ValidatedOrder>>;
```

You just don't use these very often in idiomatic Rust; it's much more conventional to simply write out what I did above. However, the one time you *might* use a type alias like this is when you're defining the type of a closure and you don't want to write it inline. This is a pretty sharp difference between Rust and the other languages on display here, and it goes to the difference in their approaches.

Rust is *not* a functional-first language in the way that each of the others are, though it certainly draws heavily on ideas from functional programming throughout and makes quite a few affordances for a functional style. Instead, it's a programming language first and foremost interested in combining the most screaming performance possible with true safety, and leaning on ideas from the ML family (among others!) as part of achieving that.

Among other things, this is why you don't have currying or partial application in Rust: those essentially *require* you to have invisible heap-allocation to be ergonomic. We *don't* have that in Rust, as we do in Elm, Reason, and F^#^. If we want to pass around a function, we have to explicitly wrap it in a pointer to hand it around if we construct it in another function. (I won't go into more of the details of this here; I've covered it some [on New Rustacean](http://www.newrustacean.com/show_notes/e004/index.html) and some [in my Rust and Swift comparison](http://www.chriskrycho.com/2015/rust-and-swift-viii.html) a couple years ago.)

That same underlying focus on performance and explicitness is the reason we have `Box<ValidationResponse<ValidatedOrder>>` in the Rust case: we're explicitly returning a *pointer* to the type here. In Elm, F^#^, and Reason, that's *always* the case. But in Rust, you can and often do return heap-allocated data and rely on "move" semantics to copy or alias it properly under the hood.

## Summary

So: lots of similarities here at first blush. The biggest differences that show up at this point are purely syntactical, other than some mildly sharper differences with Rust because of its focus on performance. The fact that these languages share a common lineage means it's not hard to read any of them if you're familiar with the others, and it's actually quite easy to switch between them at the levels of both syntax and semantics.

As usual, when dealing with languages in a relatively similar family, it's *most* difficult to learn the *library* differences. The most obvious example of that here is Reason's `Js.Promise`, Elm's `Task`, F^#^'s `Async`, and Rust's `Future` types: each of those has their own quirks, their own associated helper functions or methods, and their own ways of handling the same basic patterns.

Still, if you have played with any one of these, you could pretty easily pick up one of the others. It's sort of like switching between Python and Ruby: there are some real differences there, but the similarities are greater than the differences. Indeed, if anything, these languages are *more* similar than those.

Next time I'll dig into Wlaschin's chapter on *validating* the domain model, and here some of the not-just-syntax-level differences in the languages will start to become more apparent.
