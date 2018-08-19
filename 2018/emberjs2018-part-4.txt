---
Title: "#EmberJS2018, Part 4"
Subtitle: Embracing the Ecosystem
Category: Tech
Tags: [emberjs, javascript, typescript, emberjs2018]
Date: 2018-05-29 07:45
Summary: >
    We need to shift from a posture of defensiveness about Ember.js to one of embracing the ecosystem, and embracing our role in the ecosystem.
---

Following [the example](https://blog.rust-lang.org/2018/01/03/new-years-rust-a-call-for-community-blogposts.html) of the Rust community, the [Ember.js](https://emberjs.com) team has [called for blog posts](https://emberjs.com/blog/2018/05/02/ember-2018-roadmap-call-for-posts.html "Ember's 2018 Roadmap: A Call for Blog Posts") as the first step in setting the 2018 roadmap (which will formally happen through the normal [<abbr title="Request for Comments">RFC</abbr> process](https://github.com/emberjs/rfcs)). This is my contribution.

There are three major themes I think should characterize the Ember.js community and project for the rest of 2018:

1. [**Finishing What We’ve Started**](http://www.chriskrycho.com/2018/emberjs2018-part-1.html)
2. [**Doubling Down on Documentation**](https://www.chriskrycho.com/2018/emberjs2018-part-2.html)
3. [**Defaulting to Public for Discussions**](https://www.chriskrycho.com/2018/emberjs2018-part-3.html)
4. **Embracing the Ecosystem** (this post)

----

Over the last few weeks, I’ve talked about a few big ideas that I think the Ember.js community should go after in 2018 which will help the framework excel over the next few years. This last one (like Part 3 before it) is more a *culture shift* than a matter of *things to build*.

We need to shift from a posture of defensiveness about Ember.js to one of embracing the ecosystem, and embracing our role in the ecosystem.

It’s easy to end up in an us-vs.-them mentality when looking at different libraries and frameworks. It’s doubly easy to go there when you often hear “Isn’t Ember dead?” or variations on that theme. We should avoid that way of thinking anyway. And there are three big pieces to this: *contributing outwards*, *smoothing the paths into Ember* from other ecosystems, and *embracing the rest of the ecosystem*.

### Contributing outwards

There is genuinely great stuff happening all over the place in the front-end, and many of the things we love about working with Ember today have come directly out of e.g. React—hello, “data-down-actions-up”! The same is true in reverse: Ember has contributed many important ideas to the broader front-end ecosystem, from its early emphasis on rigorously linking URLs and application state to helping pioneer and popularize the use of good command line tooling, to more recent emphasis on *compilation* as a way of solving certain classes of problems.

So as we build all of these things, one of the best things to do—and, I believe, one of the ways we help Ember grow!—is think about how our work can benefit the larger ecosystem. When you build a library, you should consider whether there are parts of it that *don’t* have to be Ember specific. For example, a colleague and I recently built out the foundation of a solution for well-rationalized form-handling. [^1] We build it in two pieces, though: a core library in TypeScript that will work as well in Vue or React as in Ember, and an Ember component library that consumes that core functionality.

The more we can take that tack in *general*, the better. It’s the first piece of making the gap between people’s experience in other parts of the front-end ecosystem and the Ember part smaller. Ember will seem much more interesting if people find themselves *often* getting value out of things we’ve built.

### Smoothing the paths in

The flip side of this is figuring out ways to make it easier for people coming *into* Ember.js to map patterns from their existing experience onto the framework’s tools and patterns. The simple reality is that there are far, far more developers familiar with React, Angular, and Vue than with modern Ember.js. Ember genuinely has a lot to offer there, but we need to make it easier for people to see that value and to recognize how it's a lot like the good parts of what they already know!

This is primarily a communications effort; it means changes to the docs and to the homepage, but also to what we do in blog posts and tutorials and talks as a community!

At the highest level, I cannot recommend strongly enough the model suggested by Chris Garrett in [his #EmberJS2018 post](https://medium.com/@pzuraq/emberjs-2018-ember-as-a-component-service-framework-2e49492734f1): treat Ember.js (both in the docs and also in our presentations and communications about it) as a *component-service* framework. This not only maps more easily to patterns people know from other communities, it has the really important effect of demystifying a lot of the “magic” that seems perplexing in the framework, especially around Ember Data—which is, after all, just a service you can inject!

When we write blog posts, we can accomplish a lot of this simply by being aware of the rest of the ecosystem and making analogies there. You can see an example of how I’ve started trying to do this in my recent blog post on [higher-order components in Ember.js](http://www.chriskrycho.com/2018/higher-order-components-in-emberjs.html). It was just one little line:

> In React, the [higher-order components] pattern as a whole is often known as the `renderProps` pattern, for the way you most often accomplish it. It’s all the same idea, though!

That’s not a lot of extra work, but it means that if someone searches for “renderProps Ember.js” there now exists a blog post which will help someone map there existing knowledge over! I wasn’t writing a “how to do React renderProps in Ember” post—but I still smoothed the path in just a little bit. We should be doing that everywhere we can. It’s usually not a lot of effort to make those kinds of moves in talks or blog posts, but the yield is high: Ember stops being some super weird foreign entity and starts looking like a variation on a theme.

There is also a much larger effort we *do* need to undertake to make that story clearer on the home page and in the documentation—an effort that I know is already very much in consideration from chatting with the really amazing crew in `#-team-learning` on Slack. In the **how you can help** bucket: seriously please go into that channel and start chipping away at small tasks! There’s ([always!](https://m.youtube.com/watch?v=Abu2BNixXak "“Becoming a Contributor”, my Rust Belt Rust 2017 talk")) way more work to be done than hands to do it.

I think this also means prioritizing technical work that eases this. The sooner we can land the Glimmer component model, the better. The sooner we can hash out a more cogent story on routes and controllers and components, the better. The sooner we can make “npm-install-your-way-to-Ember” an actually viable strategy, the better. Because each of those things makes Ember dramatically more accessible to people working in other ecosystems today; each lowers the barrier to entry in some substantial way; and the combination of them all makes it far more viable for someone to *try* Ember in an existing application.

### Embracing the rest of the ecosystem

The final piece of this is actively embracing the best parts of the rest of the ecosystem.

We as a community need to avoid defensiveness and recognize that there’s a *lot* of good in the rest of the front-end space. I understand how it can be easy to feel defensive. Being dismissed, having people be surprised that the project even still exists, etc. gets really old after a while. But however reasonable that defensiveness is, it’s ultimately counterproductive. It makes us hold onto things we don’t need to hold onto, and it makes us ignore things that might benefit us, and as a result it can make us *needlessly weird* technically.

*Needless weirdness* is an important idea I’d love for us to keep in mind. Any time you’re willing to move more slowly, to let the “new shiny” bake for a while to see whether it’s genuinely worth investing in, you’re going to seem weird. Likewise when you strongly embrace stability, in a broader ecosystem which hasn’t. Likewise when you value convention over configuration, in a broader ecosystem which hasn’t. But it’s important to be able to distinguish between *needful* and *needless* weirdness.

We should have regular conversations as a community—through <abbr title="request for comments">RFC</abbr>s, through forum threads, through blog post arguments, etc.—about what’s *needful* weirdness, and what has become *needless* weirdness. (Because which weird things are needful change over time!) We should gleefully embrace the needful weirdness. But we should equally gleefully drop the needless weirdness.

What makes Ember special is, by and large, *not* the specific technical implementations we’ve landed on.[^2] What makes Ember valuable is having a coherent top-to-bottom story and a rich community with a commitment to aggressively seeking out shared solutions, and an even deeper commitment to providing good migration paths forward when we change things.

But here’s the thing: those values are increasingly (if slowly) being embraced *outside* the Ember ecosystem as well. Ember can contribute and even lead in many ways here—but only if we start actively embracing the good of other parts of the front-end ecosystem.

For example: I’ve heard more times than I can count over the last few years that our use of Broccoli.js is really important for Ember, and the reality is… that isn’t true. We could have built on top of just about *any* solution, and it would have been *fine*. Broccoli *does* have some advantages; it also has some real disadvantages (one of which is that we’re the only ones using it!), and we should forthrightly acknowledge those. By the same token, if Webpack is working well for many people, let’s neither trash it in discussion nor ignore it in implementation. Instead, let’s make it easy for people to integrate Webpack into the Ember world.

That doesn’t oblige us to chuck out our existing build tooling! It just means making our own build pipelines robust enough to interoperate well with other packaging systems. And that’s precisely what the Ember <abbr>CLI</abbr> team has been doing! This needs to be our pattern across the board going forward.

It’s truly well and good to have made a call a few years ago, and to be going out of our way to mitigate the costs of churn. At the same time, we need to communicate—to a degree that probably feels like *over*communicating to the people who already understand all these decisions!—so that both the original rationales and the current status are accessible to all the people who *weren’t* there when the decisions were made.

Insofar as it’s true that Broccoli and Webpack solve different problems, *explaining* how Broccoli and Webpack actually solve meaningfully different problems —or at least, *excel* at solving different problems—is one of the most important things we can do as well. Props to Chris Thoburn ([\@runspired](https://twitter.com/runspired)) for doing this in a few different contexts recently, but we need a lot more of it—because it’s one example I think most people both inside and outside the Ember community have just kind of scratched their heads at for a long time (me included).

Again: I take the Broccoli/Webpack example simply because it’s an obvious one. The broader point is that we need to find ways to embrace the shared solutions which emerge not only in the Ember community but in the front-end ecosystem as a whole, even as we also do the hard work to make our own shared solutions useful to the rest of the front-end ecosystem. That two-way exchange will benefit us, and smooth the paths in for newcomers, and benefit the rest of the ecosystem, too—and that’s a huge win. Because in a very real sense, we front-end developers are all in this together.

[^1]:	Keep your eyes open; you’ll see a blog post announcing that along with a full set of documentation for it sometime in the next month or so!

[^2]:	To be clear: many, though certainly not all, of those specific implementations I like, but that’s beside the point.
