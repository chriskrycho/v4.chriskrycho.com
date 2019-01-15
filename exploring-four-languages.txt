---
Title: Exploring Four Languages
Subtitle: >
  Rust, Elm, Reason, and F♯ – a bunch of cousins! And domain-driven design! And functional programming!
Summary: >
  I’m going to implement the exercises from Domain Modeling Made Functional in Rust, Elm, ReasonML, and F♯… because I think it'll be an interesting learning experience and a lot of fun!
---

## Overview

I recently started reading through Scott Wlaschin's _Domain Modeling Made Functional_, in which Wlaschin pulls together F^♯^ and domain-driven design to teach both functional programming and DDD. As I’ve noted [elsewhere](https://twitter.com/chriskrycho/status/934170826718429184) in the past, very little of the book is _truly_ specific to F^♯^, though that’s the language Wlaschin uses in the book---and Wlaschin himself [agrees](https://twitter.com/ScottWlaschin/status/934177554331848705):

> Thanks! Yes, it's true that you could easily use \#ElmLang, \#RustLang, \#Scala, or especially \#OCaml to work through the book. I use hardly any F# specific features.

So… I decided to try something a little bit bonkers. I’m going to implement these exercises in _four different languages_:

* [Rust](https://www.rust-lang.org)
* [Elm](http://elm-lang.org)
* [F^♯^](http://fsharp.org)
* [ReasonML](https://reasonml.github.io)

These languages are all related: they’re descended from [Standard ML](http://smlnj.org/sml.html). ReasonML and F^♯^ are like siblings: Reason is merely a custom syntax for OCaml; F^♯^ is (originally) an implementation of OCaml on .NET (though the two languages have diverged since F^♯^ came into existence). Elm and Rust are cousins of each other and of Reason and F^♯^, though they’re both drawing on other languages besides OCaml as well. I also have some familiarity with Rust, Elm, and F^♯^ already, and have read the docs for Reason a couple times. So this is a _bit_ less crazy than it might otherwise be.

Why, though? Mostly because I think it’s be interesting to compare the implementations of the domain model from the book side by side. It’ll look just a bit different in each language, and I expect to learn a bit more of the _feel_ of each language by doing this. (That side by side comparison is something I’ve [done before][rust and swift] and [found very profitable][profit].) I’ll also turn it into blog posts, which hopefully will be interesting to others!

[rust and swift]: http://www.chriskrycho.com/rust-and-swift.html 'Series: Rust and Swift'
[profit]: http://www.chriskrycho.com/2015/rust-and-swift-v.html 'Part V: The value (and challenge) of learning languages in parallel.'

## Parts in the Series

This list is updated whenever I publish a new post in the series. You can also subscribe to the dedicated [#four-languages] RSS feed, or to the more general [#rust], [#elm], [#fsharp], [#reasonml], [#domain-driven-design], or [#domain-driven-design] RSS feeds.

[#four-languages]: /feeds/four-languages.xml
[#rust]: /feeds/rust.xml
[#elm]: /feeds/elm.xml
[#fsharp]: /feeds/fsharp.xml
[#reasonml]: /feeds/reasonml.xml
[#domain-driven-design]: /feeds/domain-driven-design.xml
[#domain-driven-design]: /feeds/domain-driven-design.xml

1. [Exploring 4 Languages][1]—intro to the series, much the same content as this post)
2. [Project Setup][2]—Getting Rust, Elm, F♯, and ReasonML installed; their editor plugins configured; and their project files ready.
3. [Starting to Model the Domain][3]—How we use types to capture business concepts in Rust, Elm, F♯, and ReasonML.
4. [Integrity and Consistency][4]—Making, and keeping, promises – with Rust, Elm, F♯, and ReasonML.

[1]: http://www.chriskrycho.com/2017/exploring-4-languages.html
[2]: http://www.chriskrycho.com/2018/exploring-4-languages-project-setup.html
[3]: http://www.chriskrycho.com/2018/exploring-4-languages-starting-to-model-the-domain.html
[4]: https://www.chriskrycho.com/2018/exploring-4-languages-integrity-and-consistency.html

