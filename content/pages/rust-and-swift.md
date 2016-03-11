---
Title: Rust and Swift
Subtitle: >
  Comparing two exciting, new, apparently (but not always <em>actually</em>) similar programming languages.
Summary: >
  Rust and Swift are in a similar phase in their development, and they look pretty similar in a lot of ways. But how similar are they actually? Where does each excel relative to the other, and what do they do differently?
---


Background
----------

In summer 2015, I started learning [Rust]. Then, in September 2015, I started learning [Swift]. The superficial similarities between the two languages are obvious, and they hit their stride at roughly the same time: Rust's 1.0 release was in May 2015 and Swift's 2.0 release[^swift-1] was in June 2015. Both cite inspiration from languages like Haskell, while retaining a C-like[^c-like] syntax which is more approachable to many of the developers inclined to pick up the language.

[Rust]: https://www.rust-lang.org
[Swift]: https://swift.org

So, when I started reading the [Swift book], comparisons were inevitable. For all that the two are very similar at a superficial level, they also make some very different choices in terms of language design and philosophy---and those choices are interesting!

[Swift book]: https://swift.org/documentation/#the-swift-programming-language

Parts in the Series
-------------------

This list is updated whenever I publish a new post in the series. You can also subscribe to the dedicated [#rust-and-swift] RSS feed, or to the more general [#rust] and [#swift] RSS feeds.

[#rust]: /feeds/rust.xml
[#swift]: /feeds/swift.xml
[#rust-and-swift]: /feeds/rust-and-swift.xml

1.  [Thoughts after reading the introduction to the Swift book.][1]
2.  [Basic types and the syntax around them.][2]
3.  [Operators, including overloading, and thoughts on brevity.][3]
4.  [Language design tradeoffs, highlighted by string manipulation.][4]
5.  [The value (and challenge) of learning languages in parallel.][5]
6.  [Collection types and the difference between syntax and semantics.][6]
7.  [Pattern matching and the value of expression blocks.][7]
8.  [Functions, closures, and an awful lot of Swift syntax.][8]
9.  [Sum types (`enum`s) and more on pattern matching.][9]
10. [Classes and structs (product types), and reference and value types.][10]
11. [Hopes for the next generation of systems programming.][11]
12. [Properties: type and instance, stored and computed.][12]
13. [Methods, instance and otherwise.][13]
14. [Indexing and subscripts, or: traits vs. keywords again.][14]

[1]: /2015/rust-and-swift-i.html
[2]: /2015/rust-and-swift-ii.html
[3]: /2015/rust-and-swift-iii.html
[4]: /2015/rust-and-swift-iv.html
[5]: /2015/rust-and-swift-v.html
[6]: /2015/rust-and-swift-vi.html
[7]: /2015/rust-and-swift-vii.html
[8]: /2015/rust-and-swift-viii.html
[9]: /2015/rust-and-swift-ix.html
[10]: /2015/rust-and-swift-x.html
[11]: /2016/rust-and-swift-xi.html
[12]: /2016/rust-and-swift-xii.html
[13]: /2016/rust-and-swift-xiii.html
[14]: /2016/rust-and-swift-xiv.html


Some Notes on the Series
------------------------

I am not by any means a programming language theory nut. (Or, at least, I *wasn't*. This project, alongside a few other things, might be making one of me.) I am also not an expert. My opinions are considered, but not necessarily deeply *informed*, and you'll see places where I have added corrections along the way as I got new information from feedback received along the way.

I also freely admit to a bit of a bias toward Rust, between the two. I *like* Swift, but I *really like* Rust. I think I come by this fairly, in that it's just a matter of my own language-design preferences. I like Python better than Ruby, and in terms of how the languages *feel*, Rust is more like Python and Swift more like Ruby.

But---full disclosure---I've also made something of a personal investment in the future of Rust, in that I run [a podcast][NR] focused on the language, from which I actually [earn] (a very small amount of) money.

[NR]: http://www.newrustacean.com
[earn]: https://patreon.com/newrustacean

One other thing: as of February 2016, I haven't had a chance to build anything serious in *either* language---though I hope to change that over the course of this year. So these are very much surface-level impressions of the two languages. My thoughts and feelings about the two may change over time.

One last bit: the series [literally started][1] as a series of comments in a Slack team I participate in. You'll note a substantial shift in the tone, structure, and content as I went along. The first post was really just off-the-cuff responses as I started reading. Starting with the second post, I was a good deal more intentional about what I was doing. As the series goes along, there is more and more of this, and it's also informed by my work on [New Rustacean][NR].



[^swift-1]: which functioned somewhat like its 1.0, since its actual 1.0 was the point it was announced and served as a public beta

[^c-like]: really, ALGOL-like, of course 😉
