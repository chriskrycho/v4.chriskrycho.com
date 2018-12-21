---
Title: JavaScript is C
Subtitle: Maintaining invariants the most painful way possible.
Date: 2018-12-20 18:45
Category: Tech
Tags: [JavaScript, TypeScript, Elm, Rust, C, software development]
Summary: >
    TODO
---

<i><b>[Assumed Audience:](https://www.chriskrycho.com/2018/assumed-audiences.html)</b> software developers, especially those interested in modern, typed programming languages.</i>

Earlier this week, I was working on a problem in the Ember app where I spend most of my day job, and realized: <i>JavaScript is the same as C.</i>

That probably doesn’t make any sense, so let’s back up. The scenario I was dealing with was one where there was a bit of invariant around a piece of data that I *had* to maintain for the application not to blow up in horrible ways, but had no good way to enforce with the language’s tools. *This* action on *that* piece of data was only valid if *this* condition held true… but even with the fully-type-checked TypeScript application we now have, the action (because of the entire application’s architecture and indeed the entire way that Ember apps are wired together!) could not be statically verified to be safe.

As I considered the best way to handle this—I ended up having the function involved in the action just throw an error if the invariant wasn’t properly maintained—I was reminded of the years I spent writing C. In C, it’s quite *possible* to write safe code around memory management. I managed it fine in the applications I worked on, by carefully documenting the invariants a given function required to be safe. *This* piece of data is allocated by *that* function and then released to *the caller* to manage. Even with every bit of static analysis I threw at those kinds of things, it was possible to get it wrong.

The exact same kinds of problems I had in C, I have in JavaScript or even TypeScript today. Experientially, JavaScript[^not-just-js] *is* C, as far as having to deal with these kinds of invariants goes.[^not-c]

[^not-just-js]: This goes for plenty of languages that aren't JavaScript, too. It's equally true of c^♯^ or Python.

[^not-c]: Obviously there are some kinds of things you don't have to worry about in JS that you do in C: memory management, for one. The point is that the manual-verification-of-every-invariant-you-care-about is the same.

Enter [Rust](https://www.rust-lang.org): the kinds of management of memory that I was always having to keep track of in my head (or, better, with detailed documentation comments along the way—but with the same problem that it was easy to get wrong), I could now have statically guaranteed by a compiler. Given that I spent the first six years of my career managing and carefully tracking all of that by hand, it’s no wonder I [fell in love](https://newrustacean.com) with Rust. I could have the *compiler* guarantee the invariants I needed around memory management.

And it turns out, this same dynamic exists in the world of front-end web development. People sometimes wonder why (and colleagues are often bemused that) I get so excited by [Elm](https://elm-lang.org). But the step from JavaScript (or even TypeScript) to Elm is just like the step from C to Rust. It’s a real and profound shift in what kinds of things you can *know for certain* about your program.

In a C application, try as hard as I may, at the end of the day I am always on my own, making sure the invariants I need for memory safety hold. In a JavaScript or TypeScript application, try as hard as I may, at the end of the day I am always on my own, making sure the invariants I need for state management hold.

In Rust, I can be 100% confident that I will not have memory-unsafe code. Not 98%-and-I’d-better-check-those-last-2%-really-closely. One hundred percent. That’s a game-changer.

In Elm, I can be 100% confident that I will not have code which needs a given invariant about a piece of state to hold break the way it could in this TypeScript application. Because I can’t even apply the relevant transformations in question if it isn’t! That’s a game-changer.

Neither of those is a guarantee I won’t have bugs. (A compiler that could guarantee that would have to be sentient and far smarter than any human!) Neither of them means I can’t intentionally do stupid things that violate invariants in ways that get the program into broken states from the user’s point of view. But both of them give me the tools and the confidence that I can absolutely guarantee that certain, very important kinds of invariants hold. We’re not looking for an absence of all bugs or a system which can prevent us from making any kind of mistake. We’re looking to be able to spend our times on the things that matter, *not* on minutiae the computer can check for us.

So: I’m not going back to C, and I’m ready to move past JavaScript and TypeScript.
