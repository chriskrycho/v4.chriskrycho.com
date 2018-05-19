---
Title: "#EmberJS2018, Part 2"
Subtitle: Doubling Down on Documentation
Tags: emberjs, javascript, typescript, emberjs2018
Category: Tech
Slug: emberjs2018-part-2
Date: 2018-05-18 22:00
Summary: >
    A project is only as good as its documentation. Ember’s documentation has come a long way… but it still has a long way to go, and it's essential for helping Ember thrive.

---

Following [the example](https://blog.rust-lang.org/2018/01/03/new-years-rust-a-call-for-community-blogposts.html) of the Rust community, the [Ember.js](https://emberjs.com) team has [called for blog posts](https://emberjs.com/blog/2018/05/02/ember-2018-roadmap-call-for-posts.html "Ember's 2018 Roadmap: A Call for Blog Posts") as the first step in setting the 2018 roadmap (which will formally happen through the normal [<abbr title="Request for Comments">RFC</abbr> process](https://github.com/emberjs/rfcs)). This is my contribution.

There are three major themes I think should characterize the Ember.js community and project for the rest of 2018:

1. [**Finishing What We’ve Started**](http://www.chriskrycho.com/2018/emberjs2018-part-1.html)
2. **Doubling Down on Documentation** (this post)
3. **Embracing the Ecosystem**

----

## Part 2: Double down on docs

The best project in the world is useless without documentation. As such, my *second* major goal for Ember.js this year is to see our documentation story improve dramatically across a number of fronts. This is not just the kind of thing that’s important in principle or because we care about doing the right thing, though those alone *are* sufficient motivation. It’s *also* absolutely necessary for Ember to grow and thrive in the ways it deserves to in the years ahead.

To be clear: Ember’s story around documentation is *pretty good* and it continues to improve all the time. A few years ago, the base documentation was a mess and even figuring out where to start was hard. Today, Ember.js itself has great guides along with versioned-and-searchable <abbr title="application programming interface">API</abbr> documentation. The gaps now are in the *surrounding ecosystem* and in the *framework internals*. That’s huge progress! But if we want Ember to excel, we need to go after both of these with gusto.

### The surrounding ecosystem

Ember Data, Ember Engines, and perhaps most important Ember <abbr title="command line interface">CLI</abbr> and its core dependency Broccoli all *desperately* need documentation work just at the “how do you even use these things level.”

- **Broccoli.js** in particular is core to pretty much everything in Ember’s ecosystem, and its docs today are in roughly the state Webpack’s were back in its sad 1.0 days. We should take a page out of our own history (and Webpack’s for that matter!) and make it  easy for people to use Broccoli in whatever ways their apps need, and that mostly means documenting it![^1] Oli Griffith’s recent [blog post series](http://www.oligriffiths.com/broccolijs/) is an incredibly valuable first step in that direction. But we need really solid documentation for [Broccoli itself](http://broccolijs.com), and also for the equally important [plugin ecosystem](https://www.npmjs.com/search?q=keywords:broccoli-plugin) which is the primary way people interact with it.

- The docs for **Ember <abbr>CLI</abbr>** itself are *decent*, but they’re quite out of date and are about to be a lot more so because of the previously-mentioned packager bits. We need accurate and up-to-date guides and <abbr>API</abbr> docs for the <abbr>CLI</abbr>, and we also need clarity about the seams between Ember <abbr>CLI</abbr> and Broccoli—something I’ve only begun to become clear on after a year of hacking on [ember-cli-typescript](https://github.com/typed-ember/ember-cli-typescript)! This includes a number of kinds of documentation:
    - up-to-date guides
    - complete <abbr>API</abbr> documentation
    - a “cookbook” of common patterns to use

- The **Ember Data** docs need to be split into two parts: one for *users* of Ember Data, and one for people building Ember Data integrations and addons. Right now, all the docs are targeted squarely at implementors of Ember Data addons. This means that one of the pieces of the Ember ecosystem that’s in widest use (and is *most* distinct from the rest of the JS ecosystem!) is really, really hard to learn. This is the part of the framework I still struggle the most with, despite having worked full time on an Ember app for over two years now.

- **Ember Engines** are really need for manually breaking up your app into discrete sections which can be worked on independently and even loaded dynamically as you need them, and they provide a different level of abstraction than route-splitting and other similar approaches. (Not necessarily better or worse, but different.) Unfortunately, most of the documentation hasn’t been touched in over a year. That means if you *want* to use Ember Engines, almost all of the information is in an example here and a Slack conversation there. We need to turn that sort of “tribal knowledge” into actual docs!

To be clear, the Ember docs team is doing great work and is already going after a lot of these areas; but there’s an enormous amount of ground to cover. They could use your help! Because if Ember is going to flourish in the year(s) ahead, we need good docs. And users are the people best-placed in all the world to help write docs.

So **how you can help:**

- Open issues about things you don’t understand.

- If you see an error in the documentation, open a pull request to fix it.

- Volunteer to proofread or edit as new materials are produced. Yes, seriously: proofreading is *incredibly* valuable.

- Volunteer to write documentation of things you *do* understand where you see gaps.

### Framework internals

Every time I have started poking into Ember’s own codebase—to ship a fix for some small bug, or simply to understand the behavior of my own application—I have found myself stymied by a really serious issue. *Almost nothing is documented.* This is true of Ember proper, of Ember Data, of Ember <abbr>CLI</abbr>, of Broccoli’s internals… Everything I named above as being in need of *user*-facing documentation also desperately needs *developer*-facing documentation.

A lot of this happens naturally in projects developed organically by small teams. I’ve seen it in my own current job: the *vast* majority of our codebase is without any formal documentation, because it didn’t *require* it when we were a much smaller organization working on a much smaller codebase. But no project—whether private or open-source—can grow or thrive unless it becomes possible for new contributors to come in, understand the system as it exists, and start making changes effectively. “Tribal knowledge” is *not* a bad thing in some contexts, but it does not scale.

The Ember.js ecosystem needs developer documentation of several sorts, then:

- **Architecture documents:** what are the pieces of the framework or library in question, and how do they fit together? This is often the hardest piece to maintain, simply because it changes organically over time, and unlike the next couple examples it doesn’t have an inherent attachment to the code. However, it’s also the piece that’s absolutely the most important, because it’s what gives anyone trying to dive in and contribute the orientation they need to be effective.

- **“Why” comments:** The internals of the core libraries very often have good reasons for doing things even in apparently odd ways. However, the reasons for those are *very* rarely written down anywhere. This is *precisely* what comments are for! If some implementation actually *can’t* be simplified in the way it looks like it can, write it down right there in a comment! This will save both you and other developers lots of wasted time with false starts and useless pull requests and so on.

- **Documentation of private <abbr>API</abbr>:** Much of the public-facing <abbr>API</abbr> for Ember is fairly clear (modulo caveats around completeness and accuracy). However, most internal <abbr>API</abbr> is essentially entirely undocumented. This makes it *extremely* difficult for someone to know how to use the internal <abbr>API</abbr>s when working on internal code!

All of these things came home to me pretty sharply as I started poking at the Glimmer VM project to see where and how I can pull together my knowledge of both TypeScript and Rust to drive some of those efforts forward. The core team folks I’ve interacted with have all been *extremely* helpful—and that’s always been true all along the way!—but they’re also busy, and taking the time to write down something *once* ends up being a major “force multiplier”. You can explain the same thing to multiple different people via multiple different conversations, or you can write it down *once* and make it a resource that anyone can use to start working effectively in the system!

**How you can help:**

- If you’re a current Ember developer in any part of the ecosystem: *start writing down what you know.* If a question comes up more than once, put it in a document somewhere. If nothing else, then you can link to it instead of typing it up one more time in Slack!

- If you’re just getting started on developing core Ember functionality: *write down what you learn.* If you’re working through some section of the codebase, don’t understand it, and then come to understand it by way of asking questions, add documentation for that! You’ll help the next person coming along behind you!

----

In short: please write more things down! We need user-facing and developer-facing documentation; they need to be different and distinct from each other; and we need the whole range in both. That’s an *enormous* amount of work, and it’s very different from programming (and therefore harder for many of us).[^2]  But it’s also work that will pay equally enormous dividends in enabling the Ember community to grow in both the *number* and the *effectiveness* of its contributors—and that’s something we very much need!

[^1]:   Most of Webpack’s bad reputation is long-since undeserved: it *was* poorly documented… a few years ago. So was Ember!

[^2]:   I’ll let you draw your own conclusions about my own relationship to writing given the absurd number of words I put out on this site.

