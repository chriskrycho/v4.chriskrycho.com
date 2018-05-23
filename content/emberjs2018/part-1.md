---
Title: "#EmberJS2018, Part 1"
Subtitle: Finishing What We've Started
Tags: emberjs, javascript, typescript, emberjs2018
Category: Tech
Slug: emberjs2018-part-1
Date: 2018-05-11 09:30
Modified: 2018-05-11 20:45
Summary: >
    We don’t need more new features this year. We need to ship the things we already have in progress.
---

Following [the example](https://blog.rust-lang.org/2018/01/03/new-years-rust-a-call-for-community-blogposts.html) of the Rust community, the [Ember.js](https://emberjs.com) team has [called for blog posts](https://emberjs.com/blog/2018/05/02/ember-2018-roadmap-call-for-posts.html "Ember's 2018 Roadmap: A Call for Blog Posts") as the first step in setting the 2018 roadmap (which will formally happen through the normal [<abbr title="Request for Comments">RFC</abbr> process](https://github.com/emberjs/rfcs)). This is my contribution.

There are three major themes I think should characterize the Ember.js community and project for the rest of 2018:

1. **Finishing What We’ve Started** (this post)
2. [**Doubling Down on Docs**](https://www.chriskrycho.com/2018/emberjs2018-part-2.html)
3. [**Defaulting to Public for Discussions**](http://www.chriskrycho.com/2018/emberjs2018-part-3.html)
4. **Embracing the Ecosystem**

----

## Finishing What We’ve Started

What I want, more than any new feature anyone could come up with, is for this to be the year Ember.js commits to *finishing what we have started*. The last few years have seen the Ember team do a lot of really important exploratory work, including projects like [Glimmer.js](https://glimmerjs.com); and we have landed some of the initiatives we have started. But I think it’s fair to say that focus has not been our strong suit. It’s time for a year of *shipping*.

We need to land all the things we have in flight, and as much as possible avoid the temptation (much though I feel it myself!) to go haring off after interesting new ideas. As such, literally everything I list below is an effort *already in progress*. It’s just a matter of making concerted efforts as a community to land them.[^1]

And that way of putting it is important: we have to make concerted efforts *as a community* to land these things. Very, very few people are paid to work on Ember.js full time—far too few to accomplish all of this! If these things matter to you and your company, find a way to carve out time for it. Even if it’s just a few hours a week, even if it’s “just” (and there’s no “just” about these!) helping out with triage of open issues or answering questions in Slack or Discourse or Stack Overflow, even if it doesn’t *feel* like a lot… it adds up.

To be very clear, before I go any further: none of this is a knock on everything that the Ember core team and community have done in the last couple years. A lot of things that have landed along the way—dropping in the Glimmer rendering engine midway through the 2.x series, landing ES5 getters just weeks ago in Ember 3.1, and so on—are genuinely great! *All* that I mean is, a year where we land and polish everything would make everything that much more awesome (and make Ember that much more competitive a choice in the client-side framework world).

So: what do we need to ship this year?

### Land Glimmer `<Component>`s in Ember.js proper

We’ve taken the first steps toward this already via a number of <abbr title="Request for Comments">RFC</abbr>s that were written late last year and merged since. We need to finish the implementation for these. That means getting the [Glimmer Components in Ember](https://github.com/emberjs/ember.js/issues/16301) quest across the finish line.

The whole story here will make Ember *feel* much more modern in a variety of ways, as well as enabling some great performance and programming model wins: Immutable component arguments! Auto-tracked class properties! `<AngleBracketComponent>` invocation! Clear semantic distinctions between arguments and local context! So many good things. We just need to land it! [The quest](https://github.com/emberjs/ember.js/issues/16301) needs to be moving forward, not stagnant.

**How you can help:**

- Show up and volunteer to go after pieces of the quest. There are people willing to mentor you through the work that needs to be done!
- Test it as it lands! You don’t have to commit to *shipping* things in your app to *test* them in your app.

### Land a *lot* of Ember CLI efforts

There are a great many Ember CLI efforts in flight. Every last one of them should be on stable and in use before the end of the year.

#### Module Unification

The [Module Unification <abbr title="Request for Comments">RFC</abbr>](https://github.com/dgeb/rfcs/blob/module-unification/text/0000-module-unification.md) was opened in May 2016 and merged October 2016. There has been a lot of progress made, but we need to *ship it*—from where I stand, it’d be nice if it landed less than 2 years after we approved it! And we’re [getting pretty close](https://github.com/emberjs/ember.js/issues/16373); you can actually use the Module Unification blueprint in an Ember application today. Some stuff doesn’t work *quite* right yet, but it’s getting close.

**How you can help:** try it out! Spin up new apps with the module unification blueprint flag, and try running the migrator codemod, and report back on what breaks.

#### Broccoli 1.0

We’re *super* close on this one—Oli Griffiths has done some heroic work on this since EmberConf—but we need to finish it. Ember CLI, for historical reasons, has been using a fork of Broccoli.js for quite some time. This divergence has caused all manner of trouble, including compatibility issues between Broccoli plugins and an inability to take advantage of the best things that have landed in Broccoli since the fork happened.

Perhaps the single most important example of that is that Broccoli 1.0 supports the use of the system `tmp` directory. That single change will improve the performance of Ember CLI *dramatically*, especially on Windows. It will also flat-out eliminate a number of bugs and odd behaviors that appear when trying to integrate Ember CLI with other file watching tools (e.g. TypeScript’s `--watch` invocation).

**How you can help:** once the Ember CLI team says it’s ready for testing, test your app and addons with it! Make sure that everything works as it should—specifically, that you’re not making any assumptions that depend on either the forked <abbr>API</abbr> or the location of the `tmp` directory used for intermediate build steps.

#### The new `Packager` setup, with tree-shaking and app-splitting

One of the current major pain points with Ember’s build pipeline is that it’s hard to extend, and not really documented at all. (I’ll have a *lot* more to say on the question of documentation in the next post!) However, work is in progress to change that, too!

The accepted-and-actively-being-worked-on [Packaging Ember CLI <abbr title="Request for Comments">RFC</abbr>](https://github.com/ember-cli/rfcs/blob/master/active/0051-packaging.md) aims to fix both of these. Quoting from it:

> The current application build process merges and concatenates input broccoli trees. This behaviour is not well documented and is a tribal knowledge. While the simplicity of this approach is nice, it doesn't allow for extension. We can refactor our build process and provide more flexibility when desired.

A few of the things we can expect to be possible once that effort lands:

- tree-shaking – we can lean on Rollup.js to get *only* the code we actually need, cutting shipped file size dramatically
- app-splitting – lots of different strategies to explore, including route-based or “section”-based, etc.
- static-build-asset-splitting – no reason to cache-bust your *dependencies* every time the app releases!
- distinct app builds – you could ship one build of your app for browsers which support ES Modules and one for browsers which don’t (heeeeey, IE11) – letting you minimize the payload size for the ones that do

**How you can help:**

- If you know Ember CLI internals: pop into #-dev-ember-cli and ask how you can help land the features
- If you don’t know Ember CLI internals: also pop into #-dev-ember-cli, but ask instead how you can *test* the changes
- Help document those internals (see the next post in this series)

### Install-your-way-to-Ember

We need to finish splitting apart the Ember source from its current state of still being fairly monolith and get it turned into a true set of packages. The new Modules API which landed last year was a huge step toward this and made the experience on the developer side *look* like this should be possible---but that's still a shim around the actual non-modularized Ember core code. The process of splitting it apart *is happening*, but we need to finish it.

The promise here is huge: Ember will be able to be the kind of thing you can progressively add to your existing applications and slowly convert them, rather than something that comes along all as a large bundle. It's technically possible to do this today, but you cannot drop in *just the view layer*, for example, and that's a huge value for people who want to try out the programming model or add it for just one feature in an existing application.

Making it possible for people to install Glimmer components, then the service layer, then the router, and so on as they need it will make adoption easier for people who are curious about the framework. But it will also be a huge boon to those of us already using Ember and wanting to migrate existing applications (often a tangled mix of server-side rendering and massive jQuery spaghetti files!) to Ember progressively. I've had multiple scenarios come up at my own job in just the last month where this would have been hugely useful.

**How you can help:** make it known that you're willing to help work on breaking apart Ember into its constituent pieces, and as that effort lands (hopefully over the rest of this year!) test it in your own apps and addons, and find the pain points in the install-your-way-to-the-framework process.

### Make TypeScript *great* everywhere

This one is near and dear to my heart... and it also really falls in no small part to me and the rest of the group working on ember-cli-typescript and type definitions for the Ember ecosystem!

There are two big wins we can land this year:

1. Built-in support in Ember.js itself.
2. Solid type definitions for the rest of the Ember.js ecosystem

If you don’t like TypeScript, don’t panic! The upshot here will actually be a better experience for *all* users of Ember.js.

#### 1. Built-in support in Ember.js itself

One of my goals for this summer[^2] is to finish an <abbr title="Request for Comments">RFC</abbr> making TypeScript a first-class citizen of the Ember.js ecosystem. To clarify what this will and won’t entail (assuming it’s accepted, assuming I ever manage to finish writing it!):

- Ember will *always* be JS-first, and it will *never* require type metadata reflected to runtime, unlike e.g. Angular. No one will ever have a *worse* experience because they prefer JS to TS. The idea will be to make TypeScript an *equally* good experience, and to include it for consideration when thinking about design choices for new features.

- Ember users, both JS and TS, will get the *benefits* of having good types available right out of the box: many editors and IDEs can use TypeScript type definitions to enable better docs, autocompletion, etc.—and we may even be able to leverage it for [better validation of Handlebars templates](https://twitter.com/__dfreeman/status/994410180661170177)!

- We’ll have (because we’ll have to have!) a story on what we support in terms of backwards compatibility and SemVer for TypeScript and Ember and the type definitions. Necessarily, it has been the Wild West for the first year of concentrated effort here, trying to get our type definitions from “barely exist and not useful” to “full coverage and 99% right.” But as TypeScript becomes more widely used, we have to have a stability story, and we very soon will.

There’s also ongoing work to convert Ember’s own internals to TypeScript, and landing that will help guarantee that the type definitions for Ember are actually *correct*, which in turn will make the experience for everyone better. (Bad type definitions are worse than *no* type definitions!)

**How you can help:** engage in the <abbr title="Request for Comments">RFC</abbr> process once we get it started, and if you are up for it show up to help convert the Ember internals to TypeScript as well.

#### 2. Solid type definitions for the rest of the Ember.js ecosystem

Closely related to making TypeScript a first-class citizen for Ember.js itself is getting the pieces in place for the rest of the ecosystem as well. That means we need type definitions for addons—a *lot* of them! The ember-cli-typescript team will (hopefully late this month or in early June) be launching a quest issue to get type definitions for the whole Ember ecosystem in place—by helping convert addons to TS if their authors desire it, or by adding type definitions to the addons if they’re up for it, or by getting them up on DefinitelyTyped if they’re totally disinterested. (And, as I’ll note again in that quest issue, it’s totally fine for people *not* to be interested: there *is* a maintenance burden there!) The goal, again, is that when you’re using *any* part of the Ember ecosystem it’ll be easy to get all the benefits of TypeScript—and indeed that in many cases you’ll get a fair number of those benefits as a JS user.

**How you can help:** participate in the quest issue once it’s live! We’ll help mentor you through the process of converting addons to TypeScript, writing type definitions and getting them well-validated, and so on!

----

That’s a lot to do. More than enough all by itself, and a lot of moving parts. As such, I’ll reiterate what I said at the start: we don’t need new features this year. **It’s time for a year of *shipping*.**

[^1]:   To put it in the terms the Rust community used for their similar push at the end of 2017, and which we have often used to describe the ongoing efforts in Rust to land the “Rust 2018 edition”: this is an “impl period”—a play on the Rust `impl` keyword, used to describe the *implementation* of the behavior associated with a given data type. You can think of this as the same: it’s the implementation of the good ideas we have.

[^2]:   Confession: it was a goal for the spring but I found myself utterly exhausted after EmberConf… and had a full month with *another* major talk given for internal purposes afterwards. I’m worn out.

