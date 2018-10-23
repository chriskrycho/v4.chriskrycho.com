---
Title: Scales of Feedback Time in Software Development
Subtitle: >
    Orders of magnitude: build-time errors, automated tests, manual test, <abbr>CI</abbr>, staging, production.
Date: 2018-10-22 21:15
Category: Tech
Tags: [software development, testing, programming languages, Rust]
Summary: >
    There are rough order-of-magnitude differences between the feedback times for build-time errors, automated tests, manual testing, CI, staging, and production. This is useful when thinking about tradeoffs of where you want to catch certain failure classes.
---

<i class=editorial>**[Assumed Audience]:** fans of compiled languages with expressive type systems. (I’m not trying to persuade fans of dynamic languages they should use a compiler here; I’m trying to surface something that often goes unstated in discussions among fans of compiled languages with expressive type systems.)</i>

[Assumed Audience]: http://www.chriskrycho.com/2018/assumed-audiences.html

There are basically six stages of the development of any given software component where you can receive feedback on what you build:[^1]

[^1]: There's some ongoing work in the Rust web working group to build an exemplar web framework, [Tide](https://rust-lang-nursery.github.io/wg-net/2018/09/11/tide.html). The [most recent post](https://rust-lang-nursery.github.io/wg-net/2018/10/16/tide-routing.html) tackled routing, and prompted [an interesting discussion](https://internals.rust-lang.org/t/routing-and-extraction-in-tide-a-first-sketch/8587) on the [Rust internals forum](https://internals.rust-lang.org/). This post is a cleaned-up, better-articulated, more general version of [a post](https://internals.rust-lang.org/t/routing-and-extraction-in-tide-a-first-sketch/8587/36?u=chriskrycho) I offered in that thread.

1. compilers and static analysis tools

2. automated test suites

3. manual local testing

4. continuous integration (<abbr>CI</abbr>) test results

5. deploying to staging (or a similar test environment) for manual testing

6. deploying to live, i.e. when production traffic is meaningfully different from what you can test on staging

What's interesting to note is that there are also, in my experience, roughly order-of-magnitude differences between each of those layers in terms of the *cycle time* between when you make a change and whether you know it is broken. That is, there seem to be rough factor-of-ten differences between the feedback you get from--

1. compilers and static analysis tools , which can show you feedback in near-real-time as you're typing and saving your code, especially with a good language server or a fast compiler or a speedy linter

2. automated test suites, assuming they're running on every build change and are reasonably speedy themselves, or scoped to the things impacted by the changes made

3. manual local testing, which you can repeat after every build, but which usually requires you to switch contexts to execute the program in some way

4. <abbr>CI</abbr>, presumably doing the automated equivalent of what you do in both layers 2 and 3, but requiring a push to some central location and a remote build and execution of the test suite, and often a much larger integration test suite than you'd run locally

5. deploying to staging, and repeating the same kinds of manual testing you might do locally in layer 2 in a more production-like environment

6. deploying to live, and repeating the same kinds of manual testing you might do locally in layers 2 or 5, as well as getting feedback from observability or monitoring systems using your real traffic

(Those last two *might* be comparable in the cycle time sense. However, the way most teams I've heard of work, any deploy to live is usually preceded by a deploy to staging. What's more, with most changes that you can't test until it's live, it's often the case that you're not going to know if something is wrong until it has been live for at least a little while. Finally, some kinds of things you can really only test with production load and monitoring or observability systems, and those kinds of things are at least sometimes not to be visible immediately after deployment, but only in the system’s aggregate behavior or weird outliers that show up given enough scale.)

What all of this gets at is that stepping to a higher layer nearly always entails a *dramatic* increase in the *cycle time* for software development: that is, the amount of time between when I make a change and when I know whether it's broken or not. If I can know that I have a problem because my compiler surfaces errors in my editor, that probably saves me a minute or two each day over only being able to see the same error in a test suite. By the same token, being able to surface an error in a test suite running on every build will likely save me anything from minutes to hours of cycle time compared to something I can only test in production.

At first blush, this looks like an argument for pushing everything to the lowest-numbered layer possible, and I think that's *kind of* right. I (and probably many other people who end up in, say, Rust or Haskell or Elm or other languages with similarly rich type systems) tend to prefer putting as much as possible into layer 1 here precisely because we have so often been bitten by things that are at layer 2 in other languages or frameworks and take a lot of time to figure out why they broke at layer 2. This happened to me in a C^♯^ server application just a couple weeks ago, and chasing it down was *not fun*.

However, my enthusiasm for rich type systems notwithstanding, I *don't* think this observation about these layers of cycle time means we should put everything in the compiler all the time. Indeed, there are some things it is too expensive or difficult to test anywhere *but* production (all the way up at layer 6). What's more--although this is often overlooked in these discussions--putting too much of this rich information in layer 1 can absolutely kill your compile times in many languages. In my experience, this is particularly true of many of the languages with rich enough type systems to make layer 1 handling genuinely viable in the first place![^2]

[^2]: Right now I and a few others are trying to figure out why one particular type definition in the TypeScript definitions for Ember.js causes a build to take about 20⨉ as long as the build without that type definition. It’s the difference between a 6.5-second build and a 2.5-*minute* build.

I do think, though, that being aware of the cost in cycle time is useful, as is being explicit about *why* we think it's worth slotting a particular set of feedback into layer 2 vs. layer 1 (or layers 3, 4, 5, or 6). That goes for library development, of course.[^3] It goes equally for application development, though! It can be really helpful to make explicit both which of these layers you're landing in and (just as important) why you've landed there for any given bit of feedback you want or need to get--making the tradeoffs explicit along the way.

[^3]: as in the example of a web server's <abbr>API</abbr> for route handling which originally prompted this post

---- 

<i class=editorial>Thanks to my friend Ben Makuh for looking over an earlier draft of this piece and providing really helpful feedback on it!</i>
