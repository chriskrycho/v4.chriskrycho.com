---
Title: "#EmberJS2019, Part 1"
Slug: emberjs2019-part-1
Subtitle: Let’s finish modernizing the Ember programming model!
Date: 2019-06-17 20:25
Category: Tech
Tags: [emberjs, emberjs2019, JavaScript, open-source software]
Series:
    Title: EmberJS2019
    Part: 1
Summary: >
    Let’s finish modernizing the Ember programming model! That means everything from routes and controllers to the file system and build pipeline changes.

---

Over the last year, the Ember community has steadily delivered on the vision we all traced out in last year’s \#EmberJS2018 and Roadmap <abbr title="Request for Comments">RFC</abbr> process, culminating with the shipping-very-soon-now [Ember Octane Edition][octane]. (All the pieces are pretty much done and are either on stable or will be shortly; we just need another <abbr title="long term support">LTS</abbr> release before we cut a full new edition!)

[octane]: https://emberjs.com/editions/octane/

So… what should we tackle next? This year, I have only two parts, unlike [last year’s four][emberjs2018] (and I’m sneaking them in just under the wire, as today is the deadline for entries!):

- <b>Part 1 (this post):</b> [Let’s finish modernizing the Ember programming model!][part-1]
- <b>Part 2:</b> [Let’s make TypeScript a first-class citizen of the Ember ecosystem.][part-2]

[emberjs2018]: https://www.chriskrycho.com/emberjs2018
[part-1]: https://www.chriskrycho.com/2019/emberjs2019-part-1
[part-2]: https://www.chriskrycho.com/2019/emberjs2019-part-2

---

The Octane Edition represents the *delivery* of several years worth of work and experimentation. It represents a willingness to say “no” to many good efforts and things Ember needs to continue succeeding. All of that is *very* much to the good! It’s precisely what I and many others called for last year.

This year, it’s time to deliver on a number of other long-standing goals of the Ember effort. That means:

- a modernized *build-system*, and with it the long-promised “svelte” builds, tree-shaking, and the ability to npm-install-your-way-to-Ember
- a modernized *routing system*, leaving behind the final bits of cruft from the Ember 1.x era and fully-embracing the component-service architecture suggested last year

## Modernized Build System

Others have covered the build system in some detail, and I largely agree with their assessments. We *do* need to focus on landing that and continuing to modernize our build pipeline, and the Embroider effort and everything it unlocks should absolutely be a core part of the roadmap. One of the biggest ones, for many potential adopters of Ember *and* many existing Ember users who have large codebases they’d like to migrate *into* Ember is that long-awaited npm-install-your-way-to-Ember story. Let’s make that happen! I’m confident that as long as we make that commitment, we’ll get it done.

Given that confidence, I’m going to focus for the rest of this post on the *directional* question with our routing system—both why we need a change and what I think the change should look like.

## Modernized Routing System

The Ember Router was years ahead of its time, and it remains very solid and reliable; it’s a workhorse. Unfortunately, the routing system *as a system* is showing its age, and has entered something of a period of instability of just the sort Editions are meant to address. Today, routing concerns are spread across four different parts of the application: the <i>route map</i>, <i>route classes</i>, <i>controller classes</i>, and <i>the router service</i>. Over the next year, we should iteratively design and implement our way toward a future without controllers… and possibly some other simplifications, if we can manage them. We can make working with Ember simultaneously *easier for newcomers* and *better for old hands*.

“Controllers are dead!” is one of the great bogeymen of Ember lore at this point; but I hope quite sincerely that a year from now it’s basically true. Controllers are the single part of Ember today that shows *very* clearly the application’s SproutCore roots. When I started learning AppKit and UIKit early this year, I was struck by all the things that sounded like Ember 1.x—or rather, vice versa! And just as Apple itself is now [moving aggressively toward a programming model without controllers][swiftui], so should we\![^swiftui]

[swiftui]: https://developer.apple.com/xcode/swiftui/

[^swiftui]: You can expect to hear a *lot* more from me about Swift <abbr title="user interface">UI</abbr> in this space, both in a general sense *and* as it relates to Ember. There are some fascinating points of contact between the two programming models!

It’s not that controllers are *bad*, exactly. It’s that they don’t *fit* with the rest of the framework at this point. They’re long-lived singletons (like services) but serve as backing classes for templates (like components). They are eagerly instantiated as soon as a `LinkTo` component with references them is instantiated, but not *set up* until the app transitions to the route associated with them. They’re required if you want to use query parameters, and query parameters don’t work with Ember’s “data down, actions up” paradigm… pretty much at all.

Controllers need to go, but they need a well-designed set of replacements—in particular, we need a good design for query parameter handling and for what template should be associated with a given route.

Query param handling is, I admit, mostly outside my wheelhouse. All of the situations where I’ve used it would be trivially solved by putting them on the router service, tracking changes on them with the `@tracked` decorator, and updating them with actions. However, I’m reliably informed that some of the more gnarly scenarios out there require a bit more than this, and I defer to the folks who know what they’re talking about there!

React and Vue simply solve the template problem by mounting *components* at given route locations. Ember should probably follow *roughly* the same path, while baking in good defaults along the way. Don’t call them “routable components” though! It’s not just that it’s too much baggage; it’s that a good design in this space should not require the components themselves to be anything special at all. Instead, whether it’s part of the route map or the router class grows a small bit of new, purely declarative <abbr>API</abbr>—e.g. static class properties specifying the relevant components for the loading, resolved, and error states of the route’s model—the route itself should be able to specify exactly what component to render.

If we put in the work to get a design that satisfies all these constraints, we can come out with a *much* simpler routing system—and Ember’s entirely programming model will be *much* more coherent as a result.[^routing] We’ll simply have components, services, and routes—and routes will simply be a mapping from URL to a particular set of data and a corresponding component to render it into. That in turn will take us most of the rest of the way toward the programming model Chris Garrett proposed a year ago: [Ember as a Component-Service Architecture][csa]. This is the fitting conclusion to what we started in Octane: bringing the *whole* Ember programming model into coherence.

[csa]: https://medium.com/@pzuraq/emberjs-2018-ember-as-a-component-service-framework-2e49492734f1

[^routing]: There may also be opportunities for further simplification past this, along with more substantial rethinks of our router as we have it. But those are not *necessary* for the next year, and making these changes will unlock further experimentation in that direction while making Ember more usable in the meantime.

## Bonus

I’d also like to strongly commend my friend Dustin Masters’ post, [The Case for Embeddable Ember][masters]. Call this a stretch goal: if we ship all the build pipeline elements represented above, the extra work required to get to that point is *relatively* small—and extremely valuable for many teams who want to replace legacy applications written wholly with Backbone, jQuery etc., or who just want to see if Ember might have value to add without doing a full rewrite of their existing React/Vue/Angular/Aurelia apps.

Oh… and it turns out that the design constraints I suggested for a routing system that works well with components would lead fairly nicely and easily to Dustin’s proposal, and make for a straightforward path to fully adopt Ember and map its component tree to the router when you’re ready. Just saying.

[masters]: https://dev.to/dustinsoftware/the-case-for-embeddable-ember-4120
