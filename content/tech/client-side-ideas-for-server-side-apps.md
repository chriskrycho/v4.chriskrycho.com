---
Title: Client-Side Ideas for Server-Side Apps
Subtitle: I suddenly just discovered that I do actually want Ember.js (or React) for a static site. Why? Components.
Date: 2018-06-07 16:00
Tags: emberjs, javascript, web design
Summary: >
    It turns out that a bunch of the tools we've built for front-end web development are really, really nice ways to build UI. Who could have guessed, from all the kvetching you hear about them?

---

<i class="editorial">A quick note: I drafted this back in June, but forgot to actually publish it!</i>

I’ve been working on the design of a particular website I maintain (not this one; keep your eyes open), and besides the fact that I have learned a *lot* about web design in general in the years since I originally built that site, I discovered that I desperately want to use a component-drive model for developing sites on the client.

In my day job, I’m used to breaking down my application into discrete components with their own responsibilities. I’ve gotten spoiled by the component-driven model that dominates the front-end web development world now. (My tool of choice is usually Ember, but you’d get the same with React or Vue or whatever else.) And on the server development side, I’m desperately missing those.

I’m using [Pelican](https://getpelican.com) for this particular site because that’s what it’s been built on for the past few years and I have no desire to change it at the moment. And that means using [Jinja2](http://jinja.pocoo.org) for templating. And Jinja2 has no notion of *components*. Partials, yes—with all the implicit context you have to carry around in your head. It has a few different ways you can sort of hack your way to something sort of vaguely component-like using some of its [fancy features](http://jinja.pocoo.org/docs/2.10/templates/#block-assignments).  But without any kind of “argument” or “return value”/yielding (*a la* the ideas I discussed in [this post](https://www.chriskrycho.com/2018/higher-order-components-in-emberjs.html "Higher-Order Components in Ember.js")). All of the solutions available in *any* of these server-side frameworks for breaking up pages are *partial*-style: which means they’re basically just dumb string includes!

There’s nothing like the way I solve this problem in an Ember app every single day: *components*. There’s no particular reason that the same component-based approach that has flourished on the client *can’t* be done on the client side. It just… hasn’t, mostly. Which is kind of weird.

Until this week, projects like [Gatsby](https://github.com/gatsbyjs/gatsby) in the React world made no sense to me at all. It seemed like using a sledgehammer to kill a spider. But after this week, I’m suddenly *very* interested in it—and I might in fact experiment with some server-side component-driven approaches to this at some point in the future—because a couple of days mucking with Jinja2 has me desperately wishing for a good old Ember or React component.

---- 

As an aside: people talk about client-side development being overly complicated. I know some of what they mean, but the truth is that my experience hacking on this over the last week has actually served to remind me of just how *great* the tooling is in this world.

It’s true that there’s more complexity in many ways to building things with Ember or React or whatever other <abbr>JS</abbr>-powered client-side framework than with plain-old <abbr>HTML</abbr>. It’s more complex even than with something like Jinja2 or Liquid or whatever other server-side templating language you use. There’s good reason for that complexity, though: it comes with *more power* and *more expressiveness*. And the thing many critiquing the front-end seem to miss is that once you are used to having that power and expressiveness, it’s *really* painful to go back to not having it.