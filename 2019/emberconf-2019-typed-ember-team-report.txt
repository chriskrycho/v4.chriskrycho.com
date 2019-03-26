---
Title: EmberConf 2019 Typed Ember Team Report
Subtitle: What are the next big problems on deck for TypeScript in Ember?
Date: 2019-03-26 15:30
Summary: >
    At EmberConf 2019, the Typed Ember team (Mike North, James Davis, Dan Freeman, and I) enjoyed dinner together and talked about the big problems on deck for TypeScript in Ember. Here’s what we covered!
Category: Tech
Tags: [Ember.js, TypeScript]

---

One of the real joys of working on [ember-cli-typescript](https://ember-cli-typescript.com) over the last few years has been the *team* that has grown up around it. When I started, it was just me—trying desperately to just make things work at all and blogging about it as a way of documenting what I had learned and maybe, just *maybe*, drumming up interest along the way. No longer! Over the last two years, those efforts have grown into a group of us—Mike North, Dan Freeman, James Davis, and me—steadily pushing forward the state of the art for TypeScript in Ember.[^derek] This week, the four of us were all at EmberConf 2019, and we ate dinner together the last evening of the conference—turning it into an impromptu discussion of the current state of affairs and what’s next on our plates.

[^derek]: We also want to mention—and thank!—Derek Wickern, who did a heroic amount of work to write types for Ember in 2017, and even though he is no longer working in Ember projects, he kindly still contributes especially by way of answering questions in Discord now and again.

## Notes on Our Meeting

The following is a summary (which all of us signed off on as accurate) of what ended up being a very wide-ranging conversation about the state of TypeScript in the Ember ecosystem.

### Reducing Churn

We have made very good progress getting the types to the generally very-good state they’re now in, including *mostly* insulating Ember users from the breakages in types that come up at times as TypeScript itself changes. However, the single most significant challenge for our efforts remains finding a way to change this story from *mostly insulating users* to *genuine reliability* of the sort Ember users are used to. An initial period of churn was to be expected given the amount of ground we had to cover. However, we are rapidly moving out of the early adopter phase for this tooling, and our responsibility to shield users from churn is increasing commensurate with that shift.

This is not a small task, because Ember and TypeScript have diametrically opposed views of the world when it comes to [Semantic Versioning][semver] and tooling stability.

On the one hand, Ember is deeply committed to SemVer—more than nearly any other tool we’re aware of.[^rust-and-elm] As a result, the Ember community expects tooling and libraries to have similar commitments to backwards compatibility, stability, and clear deprecation warnings and migration paths when there are breaking changes.

On the other hand, the TypeScript team [wholly disavows the validity of SemVer for a compiler in particular][semver-ts]: They take the view that *any* change to a compiler is effectively a breaking change, since even a bug fix will certainly cause *someone’s* code to stop compiling. (See especially these two comments: [1][semver-1], [2][semver-2].) As a team, we understand the TypeScript team’s position, but broadly land on Ember’s side in this discussion—no surprise there![^my-pov]

[semver]: https://semver.org/spec/v2.0.0.html
[semver-ts]: https://github.com/Microsoft/TypeScript/issues/14116
[semver-1]: https://github.com/Microsoft/TypeScript/issues/14116#issuecomment-280592571
[semver-2]: https://github.com/Microsoft/TypeScript/issues/14116#issuecomment-292581018

Although we need to clearly articulate for our users the reasons for churn when churn does exist, reconciling these two opposed paradigms is not merely a matter of documentation. We also need (more) tooling to bridge the gap between them. A few examples of the kinds of things we need to address:

- We need to be able to map type definitions to specific versions of Ember and TypeScript. For example, our types today do not have any way to distinguish between how computed properties resolve (and therefore can be accessed) in Ember <3.1 and Ember ≥3.1 for the traditional `EmberObject` model—that is, do you need to do `this.get('someProperty')` or can you simply do `this.someProperty`? We’d like to be able to offer that kind of granularity.

- We need to guarantee that the Ember sub-packages (`@ember/object`, `@ember/array`, etc.) specify their own dependencies on each other correctly. In our current flow and structure with DefinitelyTyped, these occasionally get out of sync, with changes in the packages getting published in an order that makes it difficult for them to resolve each *other* correctly.

- We need to help users avoid the problem of having multiple versions of the type definitions installed as a result of yarn’s and npm’s strategies for preventing unwanted transitive dependency changes—strategies which are basically correct for everything *except* type definitions, but which are the *opposite* of what type definitions require.[^deps] Current strategies (mostly involving Yarn’s `resolutions` field in `package.json`) *work* but are fragile, error-prone, and difficult for end users to automate.

- Perhaps most importantly, we need to be able to insulate end users from changes in TypeScript that break the existing type definitions. Minimally, this probably means specifying the versions of TypeScript with which they’re compatible. TS already provides some tooling for this—but we have not yet started using that tooling, and we may need some layer on top of it. Our end goal will be to make it possible for users to reliably *know* when they can safely upgrade between TypeScript versions and what version of the type definitions they will need.

We batted around a number of ideas as a group for how to address those issues, and we *think* we have ideas for how to solve all of them. You can expect to see a Typed Ember Roadmap <abbr title='Request for Comments'>RFC</abbr> forthcoming in which we synthesize those thoughts into a coherent plan for solving these pain points, pending further discussion and an idea of when and how we can allocate our own time toward those efforts.

[^rust-and-elm]: The only comparable ecosystems I’m aware of are the Rust and Elm programming languages. Rust has an official <abbr title='Request for Comments'>RFC</abbr> defining its commitment to and definition of SemVer for the language and packages within the ecosystem. Elm has a similar commitment for packages—enforcing its definition with integration between the package manager and the compiler—while still being in a 0.x mode for the language.

[^my-pov]: I may write more on this from my own perspective in the future; I leave that aside here as this post aims to accurately present of the team’s conversation and perspective, not just mine!

[^deps]: I am going to (TODO: already did?) add documentation with details on the current state of affairs around this specific issue to the docs site!

### Typed Templates

The other major pain point for TypeScript adopters in Ember has been that no type-checking occurs in templates.[^other-frameworks] This means that a substantial part of all apps and many addons is completely outside the TypeScript world and the benefits it brings—type checks around invocation, autocomplete, refactoring, etc. The same is true of everything except JSX/TSX, it turns out. People have written *workarounds* for Vue and Angular, but they are just that: workarounds, rather than first-class citizens of TypeScript the way TSX is. We know how to implement that kind of workaround ourselves—Dan implemented a basic prototype last year, in fact!—and we plan to work out the remaining details and do so.

“Remaining details” is an important part of that, though.

- We want to make sure that we build that in such a way that it can be generalized to other kinds of files (e.g. <abbr title='cascading style sheets'>CSS</abbr> for use with <abbr title='cascading style sheets'>CSS</abbr> Modules).
- We will need to work out what the story will be for integrating with editor tooling.
- We need to make sure that any solution we implement will integrate nicely with the recently proposed [template imports and single-file components primitives][SFC RFC].
- We need to identify what they will and won’t be able to type-check effectively, and document those constraints.
- Last but not least, we need to make sure the implementation will be relatively straightforward to to rework if TypeScript eventually exposes a first-class hook for us to provide it this kind of information.

[SFC RFC]: https://github.com/emberjs/rfcs/pull/454

These are obviously not trivial problems to solve. More details will be in the aforementioned roadmap <abbr title='Request for Comments'>RFC</abbr> when it appears!

### Improving Documentation

We also need to substantially expand our documentation in general. We made a decision not to ship ember-cli-typescript 2.0 without having a proper documentation site in place,[^docs] and we finally got that foundation in place last week, with an [ember-cli-addon-docs] setup. We converted the existing (far-too-long) README, updated the pieces which were out of date, and added notes for upgrading from ember-cli-typescript 1.x. However, the documentation as its stands is a *starting* point. We need to expand it to cover (at least):

[ember-cli-addon-docs]: https://ember-learn.github.io/ember-cli-addon-docs/

- successful strategies both for starting new projects and for migrating existing projects
- working with types effectively
- writing type definitions effectively
- managing your public API as a library/addon author
- standard troubleshooting and debugging techniques
- explanations for the mechanics of some of the unusual workarounds we have implemented

And no doubt that’s just the tip of the iceberg. If that sounds like a lot, that’s because it is! (If it sounds like a lot of that will be useful to the broader TypeScript ecosystem, that point isn’t lost on me, either.)

[^docs]: I have long been of the mind that an open source project is simply not done until it has at least a reasonable baseline of documentation, and was delighted to learn that the rest of the team shares that mentality.

## Other Concerns on our Radar

There are a number of other concerns on our radar which we didn’t explicitly talk about at our impromptu meetup but which we have discussed at other times over the last few months:

- <b>Performance:</b> we have occasionally seen *massive* regressions in the performance of TypeScript against our apps and types, and we’d like to prevent that happening in the future. At the moment, we don’t even have good benchmarks to point the TypeScript team to—we’ll need to work out a good strategy here.

- <b>Education:</b> as members of the Ember community get excited about adopting TypeScript and start adopting it, we want to help them be successful—avoiding common pitfalls, making libraries/addons easy for others to use safely, and so on. *In particular, if you are converting an addon to TypeScript or adding type definitions for it, **please involve us** so we can help you stay on the happy path and author your types in a way that is stable and usable for the rest of the community!*

- <b>Providing a type-safe story for Ember Concurrency:</b> currently, the various workarounds available for using Ember Concurrency with TypeScript require you to throw away type safety in several places, because TypeScript does not understand the type-level transformation applied by decorators and cannot resolve the types correctly in the traditional `.extend` block. We’ve been working on a strategy to solve this with with [Jan Buschtöns (\@buschtoens)][buschtoens], involving a bit of a clever hack with a Babel transform that none of us love, but which *will* get the job done.

- <b>Supporting Ember core’s adoption of TypeScript:</b> much as with the community in general, we want to help make sure that as core Ember libraries adopt TypeScript, they’re able to do so successfully—both in terms of gaining utility to their own projects, and also so that someday we can see…

- <b>Ember shipping its own types:</b> we would love to get to a point where Ember itself ships its own types natively. However, we all see many of the other points in this document as effectively being prerequisites for that to happen successfully—especially the issues around stability and semantic versioning.

[buschtoens]: https://github.com/buschtoens

## Onward!

In many ways, the ember-cli-typescript 1.x era was the <abbr title='minimum viable product'>MVP</abbr> era for Ember-with-TypeScript. We made it *possible* for teams to successfully adopt TypeScript in their Ember apps and addons, even in large codebases. Early adopters in this era have enjoyed many upsides—but have also had to eat higher costs as we tried to stabilize the foundational tooling and types for the ecosystem. In the 2.x era, we aim to eliminate that churn and make the experience best-in-class, in ways that benefit the rest of the Ember ecosystem whether or not users are adopting TypeScript.

Someday, we’d love for TypeScript support to be so good everywhere in Ember that our team is out of a job. There’s a long way to go to get there, though—we could use your help! Come find us [on GitHub][github] and in **#e-typescript** on [the Ember Discord][discord] and help us make this happen!

[github]: https://github.com/typed-ember/ember-cli-typescript
[discord]: https://discordapp.com/invite/zT3asNS
