---
Title: Exploring 4 Languages
Subtitle: Rust, Elm, Reason, and F<sup>♯</sup> – a bunch of cousins!
Date: 2017-12-31 20:20
Tags: [functional programming, rust, elm, fsharp, reasonml, domain-driven design, four-languages]
Category: tech
Summary: >
    I’m going to implement the exercises from Domain Modeling Made Functional in Rust, Elm, ReasonML, and F♯… because I think it'll be an interesting learning experience and a lot of fun!
---

Today, as I hit the first of the implementation chapters in [_Domain Modeling Made Functional_](https://pragprog.com/book/swdddf/domain-modeling-made-functional), I started thinking about how I wanted to implement it. As I’ve noted [elsewhere](https://twitter.com/chriskrycho/status/934170826718429184) in the past, very little of the book is _truly_ specific to F^♯^, though that’s the language Wlaschin uses in the book—and Wlaschin himself [agrees](https://twitter.com/ScottWlaschin/status/934177554331848705):

> Thanks! Yes, it's true that you could easily use \#ElmLang, \#RustLang, \#Scala, or especially \#OCaml to work through the book. I use hardly any F# specific features.

So… I decided to try something a little bit bonkers. I’m going to implement these exercises in _four different languages_:

* [Rust](https://www.rust-lang.org)
* [Elm](http://elm-lang.org)
* [F^♯^](http://fsharp.org)
* [ReasonML](https://reasonml.github.io)

These languages are all related: they’re descended from [Standard ML](http://smlnj.org/sml.html). ReasonML and F^♯^ are like siblings: Reason is merely a custom syntax for OCaml; F^♯^ is (originally) an implementation of OCaml on .NET (though the two languages have diverged since F^♯^ came into existence). Elm and Rust are cousins of each other and of Reason and F^♯^, though they’re both drawing on other languages besides OCaml as well. I also have some familiarity with Rust, Elm, and F^♯^ already, and have read the docs for Reason a couple times. So this is a _bit_ less crazy than it might otherwise be.

Why, though? Mostly because I think it’ll be interesting to compare the implementations of the domain model from the book side by side. It’ll look just a bit different in each language, and I expect to learn a bit more of the _feel_ of each language by doing this. (That side by side comparison is something I’ve [done before](http://www.chriskrycho.com/rust-and-swift.html 'Series: Rust and Swift') and [found very profitable](http://www.chriskrycho.com/2015/rust-and-swift-v.html 'Part V: The value (and challenge) of learning languages in parallel.').) I’ll also turn it into blog posts, which hopefully will be interesting to others!

More to come, and soon.
