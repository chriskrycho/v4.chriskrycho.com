---
Title: "#EmberJS2019, Part 2"
Subtitle: Let’s make TypeScript a first-class citizen of the Ember ecosystem.
Date: 2019-06-17 21:20
Category: Tech
Tags: [emberjs, emberjs2019, TypeScript, JavaScript, open-source software]
Series:
    Title: EmberJS2019
    Part: 2
Summary: >
    Let’s make TypeScript a first-class citizen of the Ember ecosystem. There’s a lot already done, but a lot left to do!

---

Over the last year, the Ember community has steadily delivered on the vision we all traced out in last year’s \#EmberJS2018 and Roadmap <abbr title="Request for Comments">RFC</abbr> process, culminating with the shipping-very-soon-now [Ember Octane Edition][octane]. (All the pieces are pretty much done and are either on stable or will be shortly; we just need another <abbr title="long term support">LTS</abbr> release before we cut a full new edition!)

[octane]: https://emberjs.com/editions/octane/

So… what should we tackle next? This year, I have only two parts, unlike [last year’s four][emberjs2018] (and I’m sneaking them in just under the wire, as today is the deadline for entries!):

- <b>Part 1:</b> [Let’s finish modernizing the Ember programming model!][part-1]
- <b>Part 2 (this post):</b> [Let’s make TypeScript a first-class citizen of the Ember ecosystem.</b>][part-2]

[emberjs2018]: https://v4.chriskrycho.com/emberjs2018
[part-1]: https://v4.chriskrycho.com/2019/emberjs2019-part-1
[part-2]: https://v4.chriskrycho.com/2019/emberjs2019-part-2

---

For the last two and a half years, I have been working off and on towards making TypeScript viable in Ember apps and addons. I was delighted when others came along to help pick up the load, and we’ve [charted a course][priorities] for what we’d like to do over the year ahead. The major priorities we identified all point at what I’ve wanted since I started down this road back at the very end of 2016: for TypeScript to be a first-class citizen in the Ember ecosystem. Here’s my roadmap for how we get there. (Note that here I’m speaking only for myself—neither for the Typed Ember team nor for LinkedIn!)

[priorities]: https://v4.chriskrycho.com/2019/emberconf-2019-typed-ember-team-report.html

## The Roadmap

### 1. Execute on Our Priorities

All of us want this to happen. It’s not yet clear what all of our priorities will be in our jobs over the back half of 2019—but if we can, we’d like to see those efforts across the line.

The TypeScript team has eased one of our heavy burdens, by investing in performance monitoring infrastructure over the course of this year and paying close attention to how their changes affect us as well as other TypeScript consumers. We’re deeply appreciative! But there’s still a lot of work to be done that just needs time to actually do the work—reducing churn in type definitions, building type-checked templates, and improving our documentation.

None of those are insurmountable by any stretch. But they’d also be far likelier to happen if they were concretely identified as priorities for Ember as a whole, and we had commitment from the community to help!

To briefly summarize [those priorities][priorities] again:

-   We need to make it so that consumers of our type definitions do not face breakage from updates to Ember’s types *or* TypeScript definitions. We already worked out a basic strategy to solve this problem, and I’ve done further exploration to validate that with key stakeholders of large apps (both TypeScript users and apps which *want* to use TypeScript) and core Ember contributors… but none of us have had time since EmberConf to write out the strategy as a Typed Ember <abbr title="Request for Comments">RFC</abbr>, much less to do the actual implementation work.

-   We need to make templates type-aware and type-safe. As fantastic as the experience of writing Glimmer components is—and I genuinely do love it!—it’ll be an order of magnitude better when you get autocomplete from your editor as soon as you type `<SomeComponent @`… and see the names of the valid arguments to a `SomeComponent` and the types of things you can pass to them. Everyone who has used TSX in a well-typed React app knows just how good this can be. We can make the experience equally great in Ember, while maintaining the authoring and performance advantages of separate templates. Again: we know how to do this (and the TypeScript team is also working on things which may make it even better for us). We just need the time allocated to take the work from prototype to ready-for-real-world-use.

-   We need to dramatically expand the documentation we provide. Right now, ember-cli-typescript provides a minimal (and very useful!) set of docs. It’s enough to get you *started*, and if you’re already comfortable with TypeScript you’ll do all right. However, we’d love to provide helpful guides that show people not just the *mechanics* of using TypeScript with an Ember app, but best practices and techniques and the happy path. There’s a world of difference between being able to run `ember install ember-cli-typescript` successfully and being able to author an app or addon in TypeScript successfully, and we need to bridge that gap for successful ecosystem-wide adoption!

### 2. Type the Ecosystem

We also need to do the work—and this simply *cannot* be done solely by the handful of us that make up the core team—to get types in place for the whole of the Ember ecosystem. Two years ago, I started drafting a blog post outlining a quest to type the ecosystem. I rewrote a good chunk of it last year. I even began working on a draft of the quest in our repository in 2018! But we haven’t actually done it, and while a handful of important addons do now have types, (a) most still don’t, and (b) many of those which *do* have type definitions could use further iteration to tighten them up to make them more reliable or more useful.

I *hope* to actually open that quest sometime during the third quarter of this year. If things go as I hope, I will be doing some of that work myself, and I will be building documentation and training materials for others so *they* can see how to do it, and I will be available for code reviews on conversion efforts. I cannot guarantee that by any stretch—but it is my fervent hope, and there is very good reason to think it may actually come to pass!

In many ways, this also hinges on our ability to provide a good story for reducing churn in type definitions. Just as it’s important that we make Ember’s *own* types stable for consumers, it’s also important that we help addon developers provide the same kinds of guarantees for *their* consumers. The entire Ember community takes SemVer seriously, and that means the tools have to support that.

### 3. Define Ember’s TypeScript Story

If we manage to execute on all the priorities outlined above, then there’s one last step for making TypeScript an official part of Ember’s story: an <abbr title="Request for Comments">RFC</abbr> defining *exactly* how Ember can officially support TypeScript—including two major commitments:

-   shipping its own type definitions, with a well-considered approach to SemVer and TypeScript
-   considering TypeScript a *peer* to JavaScript in <abbr title="Application Programming Interface">API</abbr> design decisions

I have an basic frame in mind for how we tackle both of those. The first is by far the more important of the two; the latter is already happening in an <i>ad hoc</i> way and merely requires the former before it can be formalized. But getting to the point where Ember can ship its own type definitions while upholding its semantic versioning commitments *and* taking advantage of the advances always happening with TypeScript itself is a large and non-trivial task.

It means a substantial amount of work within the Ember codebase. It means building new tooling for Ember’s core development process—so that the experience of working on Ember itself can remain ever-more productive even as we make sure that the types published for consumers are reliable, accurate, and stable. It means investing in both further education of the community and more static analysis tooling, to make sure that breaking *type*-level changes are not introduced accidentally.

These efforts are worth the investment they will require, but they *are* serious efforts.

## Why It Matters

This is not just me speaking as TypeScript fanboy and promoter. These things matter for TypeScript consumers of Ember—and they do, profoundly. But I would not suggest even that <abbr title="Request for Comments">RFC</abbr> for official support merely to that end. The TypeScript user community in Ember has done extremely well to date *without* that kind of official commitment, and could continue to do so (as do many other communities in the broader JavaScript ecosystem).

Why, then, do I suggest we make this not just a commitment for our little informal team but for the Ember community as a whole? Because while TypeScript users will benefit the *most* from these improvements, JavaScript developers will *also* benefit from them.

When both Ember core and every major addon in the Ember ecosystem has top-notch types available, *every* other app and addon author will be able to take advantage of those types, courtesy of the integration offered by TypeScript in every major editor. Whether they’re using Vim or Visual Studio, Ember developers will be able to get rich documentation, suggestions, and inline errors—even for their templates! This can be a massive win for developer productivity throughout the ecosystem. Investing to make TypeScript a first-class citizen fo the Ember ecosystem will make the experience of authoring Ember apps and libraries better for *everyone*. So let’s do it!
