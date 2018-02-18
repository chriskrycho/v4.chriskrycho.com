---
Title: Good Work Takes Time
Subtitle: (And most of that time is invisible from the outside.)
Date: 2018-02-17 18:00
Category: blog
Tags: software development, writing, ethics
Summary: >
    It’s obvious enough when you say it aloud, of course, but it bears reiterating, and often: Good work takes time, and most of the time and effort behind good projects remains forever invisible.

---

It’s obvious enough when you say it aloud, of course, but it bears reiterating, and often: *Good work takes time, and most of the time and effort behind good projects remains forever invisible.*

One of the things I did in 2017 that I’m most proud of (and which I get *enormous* utility from every day at work) is building [True Myth](https://github.com/chriskrycho/true-myth), a library implementing `Maybe` and `Result` types in TypeScript.

<aside>

Note: if you’re about to tune out because this sounds technical, don’t. You can understand everything important in this post without understanding a thing about TypeScript or these particular types.

</aside>

There’s nothing *particularly* special about that library compared to any of the others in the space which already do the same thing. It makes its own [design tradeoffs](https://github.com/chriskrycho/true-myth/blob/master/README.md#why-not "Comparisons with Folktale and Sanctuary"), which are slightly *different* from others, and it has what I think are [best-in-class docs](https://true-myth.js.org), but mostly it’s comparable to the others. Still, it’s *good*, and it fits that particular niche in terms of design tradeoffs pretty well in my view.

If you just saw the public work on that, you’d have first heard of it *at the earliest* when I pushed the first commit to GitHub on September 21, 2017. But the roots go much, much further back.

For one thing, I just found a related bit of work dating all the way back to January 10, 2017: an early attempt to see if I could directly reimplement Rust’s Result and Option types in TypeScript, in the early days of my adoption of TypeScript.[^1] That initial spike didn’t work—and I mean that literally; I didn’t yet have enough of a handle on TypeScript’s type system to get it to actually compile! But it was the first of *multiple* (mostly very brief) swings I took at it over the course of the year. The culmination of those repeated stabs at the problem was True Myth, with its polish, test coverage, and very considered design tradeoffs.[^2] But none of that would have happened without the better part of a year of experimenting along the way.

What’s more: even that January spike wasn’t the real start of True Myth. I have code in our codebase (code we’re finally mostly done replacing with True Myth!) that was an early attempt to capture these same basic ideas in plain-old JavaScript—code that dates to March 2016!

So: do not be discouraged when your own work seems to take a long time, or when you see others produce what seem to be fully-formed projects all in a rush. Always, our best work stands on a foundation—of ideas simmering over time, of previous attempts that got partway, of previous outright *failures*—and all of that is “underground,” out of sight.

[^1]:   Somewhat amusingly to me in retrospect, I’d switched from Flow to TypeScript on our codebase at Olo as my final act of 2016.

[^2]:   I remain convinced that we hit a *really* sweet spot with the design here: it works well as idiomatic JavaScript *and* supports nice functional idioms and I think it just feels nice to use *in JavaScript*—not just as a port of ideas from Haskell, Scala, etc.
