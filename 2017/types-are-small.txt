---
Title: Types are Small
Subtitle: (Scott Wlaschin is really smart.)
Date: 2017-12-29 14:00
Category: Tech
Tags: [functional programming, software development]
Summary: >
    A really fabulous quote from Scott Wlaschin's book Domain Modeling Made Functional crystallized an important point for me: types (in typed functional programming) are small.

---

I’ve been reading through [Scott Wlaschin](https://fsharpforfunandprofit.com "F♯ for Fun and Profit")’s really excellent book [_Domain Modeling Made Functional_](https://pragprog.com/book/swdddf/domain-modeling-made-functional) and this quote (from his chapter introducing the idea of *types* in *typed functional programming*) crystallized something for me:

> A type in functional programming is not the same as a class in object-oriented programming. It is much simpler. In fact, a type is just the name given to the set of possible values that can be used as inputs or outputs of a function.

A lot of times when I’m trying to explain how I use types in a typed functional programming style, this is a serious point of confusion—both for the Java or C♯ OOP programmer and for the programmers coming from dynamic languages. When people think of “types” they tend to think of *classes and interfaces and methods, oh my!*[^1]

One is the big heavy class. The other is a nice little LEGO block. The difference is *huge* in my day to day experience, but I’ve never been able to express it so clearly as Wlaschin’s quote.

I suspect that when I’m talking to most people coming from dynamically typed languages *or* from the standard OOP languages, they hear “Write three interfaces and six classes” when I say “using types to help me with my program.” But what I mean is “Write three tiny little shapes, and then one more that shows how they snap together in a slightly bigger one.” Types aren't big heavy things. They’re just the shapes I want to flow through my program, written down like documentation for later… that gets checked for me to make sure it stays up to date, and lets me know if I missed something in my description of the shape of the data, or tried to do something I didn’t mean to before.

You *can* write a language like F♯ or TypeScript or Elm like you would C♯, but it’s generally not going to be an especially *happy* experience (and it’ll be less happy the more “purely functional,” _a la_ Elm, you go). But you don’t have to! Types are just tiny little descriptions of the shapes you plan to deal with in a particular spot—more concise and more dependable than writing a JSDoc or something like that.

Types are small. You can build big things with them, but *types are small*.

[^1]: In fact, nearly every “I’m just not into types” or even “I think types are worse for most things” talks I’ve seen—including [this recent and popular one by Rich Hickey](https://www.youtube.com/watch?v=2V1FtfBDsLU)—tend to conflate *all* type systems together. But the experience of writing TypeScript is *very* different from the experience of writing C♯. (You’ll note that in that talk, for example, Hickey freely jumps back and forth between Java-style types and Haskell-style types when it suits his purposes, and he entirely skips past the structural type systems currently having something of a heyday.) In many cases, I *suspect* this is simply a lack of deep experience with the whole variety of type systems out there (though I’d not attribute that to any specific individual).

