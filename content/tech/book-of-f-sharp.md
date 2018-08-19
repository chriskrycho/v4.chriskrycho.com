---
Title: The Book of F♯
Subtitle: A so-so book about a slightly strange language.
Date: 2017-07-21 19:30
Category: Tech
Tags: [book-reviews, programming languages, fsharp, writing, pedagogy]
Summary: >
    Recommended With Qualifications: This book is just okay, and at this point it’s a bit outdated—but if you're in its fairly narrow target audience, it’s a decent way to get up to speed on F♯.

---

<i class=editorial>I keep my book review ratings simple---they're either *required*, *recommended*, *recommended with qualifications*, or *not recommended*. If you want the TL;DR, this is it:</i>

**Recommended With Qualifications:** This book is just okay, and at this point it's a bit outdated---but if you're in its fairly narrow target audience, it's a decent way to get up to speed on F#.

---

_The Book of F♯: Breaking Free With Managed Functional Programming_ is a No Starch Press publication by Dave Fancher, published in 2014. I read it over the course of the last four or so months, just plugging away in my spare cycles. A couple qualifications on the short list of observations that follow:

1. I don't have any experience whatsoever writing production F♯ (though I have *read* a fair bit of it). I am interested because it's a functional programming language on the .NET stack---which isn't my own personal favorite stack, but *is* the stack at Olo. If we're going to ship functional code on the server, it'll be in F♯.[^ember]

2. I am also not a C♯ developer. As such, I'm *explicitly* not the audience of this book. As Fancher put it in the intro:

    > I wrote this book for people like me: experienced .NET developers looking to break into functional programming while retaining the safety net of the tools and libraries they’re already using.

    The net of that is that a lot of what frustrated me about the book is just a result of my not being the target audience.

[^ember]: I am of course writing a *lot* of functional code in our JavaScript; JavaScript is a surprisingly good language for it.

Those qualifications aside, some assorted thoughts on the book:

First, as the intro and my above qualification suggest: this is *really* not interesting or useful as a general introduction to F♯. Throughout, it assumes a very high baseline of C♯ knowledge. In fact, the majority of the discussion of F♯, even in the section of the book which turns away from object oriented programming toward functional programming, focuses on comparing F♯ to C♯. This makes sense for the target audience, but this is *not* the book for you if you're not a C♯ developer.

That said, if you *are* a C♯ developer, this could be a useful resource as you're spinning up. It also might be a useful book to work through with a group of C♯ developers who want to learn F♯. The comparisons *do* generally work in F♯'s favor, even when doing exactly what you would be doing in the C♯, which makes it an easier "sell" in that regard.

Along the same lines, the book is structured as a *very gradual* introduction to functional programming ideas. Roughly the first half of the book emphasizes F♯'s object-oriented programming abilities, and only in the second half does Fancher turn to a functional style. Again, this is probably the right move given the audience, but it means the book spends a *lot* of time on kinds of F♯ you won't actually be writing very often once you're going. Idiomatic F♯ isn't object-oriented. But as a way of helping someone make the transition, it's not a bad plan: object-oriented F♯ is briefer and nicer in many ways than the exact same code in C♯. It meant that the first half of the book was completely uninteresting to *me*, though: I don't want to write a line of object-oriented F♯.[^oop]

[^oop]: It's not that OOP is *bad*, exactly; it's just that what passes for OOP in languages like C♯, Java, and yes, F♯, is relatively low utility to me---and I think OOP ideas are much more interesting and useful when applied at a systems level, e.g. in an Actor system, than at the level of individual "actors" within the system. Compare Erlang/Elixir: functional components, organized in what is arguably an *incredibly* object-oriented way.

All of this had a pretty serious downside even for existing C♯ developers, though: the book often ends up seeming like it's sort of apologizing for or defending F♯ against an expected audience of people asking "What's wrong with C♯?" And even though there's a real sense in which that's true---that *is* what a lot of the audience is asking, no doubt---it became quite annoying rhetorically.[^oreilly-rust] It's also unnecessary: if someone is picking up a book on F♯, you can assume that they're alredy at least a little interested in the language and what it might offer! Along those lines, I much prefer the tack taken in what I've seen of Scott Wlaschin's upcoming _Domain Modeling Made Functional: Tackle Software Complexity with Domain-Driven Design and F♯_ (The Pragmatic Bookshelf, expected in fall 2017)---which shows not how to do the same things as in C♯, just more briefly; but how to solve the same problems much more effectively.

[^oreilly-rust]: The temptation extends beyond this book; O'Reilly's _Programming Rust_ (Jim Blandy and Jason Orendorff) reads as the same kind of defensive introduction to Rust for C++ developers.

Those problems aside, the book was… *fine*. I wouldn't call it scintillating reading, but this kind of technical writing, especially at this length, is really hard work. Credit to Fancher for managing an introduction to an entire programming language in a relatively approachable way, and credit to him and his editors for making sure it remains lucid throughout. Still: I'd love to see the bar for programming books be higher. We need more books which are genuinely engaging in the world of programming language texts. These things are *interesting*; we don't have to make them dry and dull! (And if you want a pretty good example of that: everything I've read of Edwin Brady's _Type-Driven Development with Idris_ hits the mark.)

---

A few other observations about the language itself from reading the book.

**First,** reading this highlighted a lot of strange things about F♯, all of which ultimately come down to the ways F♯'s development has been driven by concerns for interoperability with C♯. Worse, there are a lot of places where the influence of C♯ casts this shadow *entirely unnecessarily*. One particular expression of this which drove me crazy: F♯ far too often uses exceptions instead of `Option`s. It's [one thing] to make sure the language gracefully handle exceptions: you *will* have them coming from outside contexts. It is another entirely to design core parts of the language to throw exceptions where it doesn't have to.

[one thing]: http://www.chriskrycho.com/2017/better-off-using-exceptions.html

Perhaps the most prominent example is the `List.head` function. Its type signature is `'T list -> 'T`, where I would expect it to be `'T list -> 'T option`. If you call `List.head` on an empty list, you get an exception. It would make far more sense for it to return an `Option` and just give you `None` if there's no item. Then you're not worried about `try` expressions and the type system will actually help you! This is one of the most valuable parts of having a type system like F♯'s! I really don't understand a lot of these decisions, not least since this isn't for interop with C♯ collections---these are for native F♯ collections.

**Second,** the use of things like computation expressions instead of type machinery has an interesting effect: it makes it simpler to read when you first encounter it, but harder to compose, build, etc.---and it's more syntax to remember. Computation expressions just end up being a way to do "monadic" transformations, from what I can tell. But as I noted often in my discussion of [Rust and Swift], I profoundly prefer approaches that build on the same existing machinery---even in the surface syntax of the language---rather than constantly building new machinery. It makes it easier to deeply internalize new concepts and to *understand* the language (rather than just being able to *use*) the language. It also seems (from my admittedly limited vantage point) that computation expressions are as a result much less *composable* than actual type machinery of the sort available in other languages (Haskell, Idris, etc.).

[Rust and Swift]: http://www.chriskrycho.com/rust-and-swift.html

Now, the tradeoff there is that adding those adds a lot of complexity both to the compiler and to the libraries people are apt to write; there's a reason Elm has totally eschewed that kind of type machinery to date. But Elm has also refused to just add syntax around ideas like this the way F♯ has here, and it makes for a much cleaner and frankly *nicer* language.

And that brings me to my **third and final** point: I'm really glad F♯ exists, and that it's providing a pretty good experience of functional programming on the <abbr title='Common Language Runtime'>CLR</abbr>. But---and I fully grant that a fair bit of this kind of thing is almost entirely subjective---it doesn't *feel* good in the same way that Elm or Rust do. There is something very difficult to nail down here, but I get a vsiceral experience of joy when writing some languages and not others. Again: that will vary person to person, but I think there are things that make it more or less likely. Things that make it more likely, at least for me, include everything from self-consistency and predictability at the semantic level to the way the code lays out and flows at the visual/syntactical level.[^syntax] Sadly, F♯ just doesn't hit the right notes[^pun] for me. I'll be much, much happier to write it than C♯ at work... but I really just want Elm and Rust and Idris to come save the day.

[^syntax]: And yes, nerds, syntax *does* matter. Try reading this sentence, nicely punctuated, and with spaces and capitalization. Now: tryreadingthissentencewithoutpunctuationorspacesorcapitalization. There may be a point after which it becomes less important, and a range of things which are equally good in an absolute sense, but it matters.

[^pun]: Pun not intended, but inevitable given the language names here.