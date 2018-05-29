---
Title: "#EmberJS2018, Part 3"
Subtitle: Default to open for discussions and decision-making.
Date: 2018-05-23 07:30
Tags: emberjs, emberjs2018, javascript, leadership
Category: Tech
Summary: >
    There are often good reasons to have private discussions in any kind of core team—but they should not be the default. The default should be public.
---

Following [the example](https://blog.rust-lang.org/2018/01/03/new-years-rust-a-call-for-community-blogposts.html) of the Rust community, the [Ember.js](https://emberjs.com) team has [called for blog posts](https://emberjs.com/blog/2018/05/02/ember-2018-roadmap-call-for-posts.html "Ember's 2018 Roadmap: A Call for Blog Posts") as the first step in setting the 2018 roadmap (which will formally happen through the normal [<abbr title="Request for Comments">RFC</abbr> process](https://github.com/emberjs/rfcs)). This is my contribution.

There are three major themes I think should characterize the Ember.js community and project for the rest of 2018:

1. [**Finishing What We’ve Started**](http://www.chriskrycho.com/2018/emberjs2018-part-1.html)
2. [**Doubling Down on Documentation**](https://www.chriskrycho.com/2018/emberjs2018-part-2.html)
3. **Defaulting to Public for Discussions** (this post)
4. [**Embracing the Ecosystem**](https://www.chriskrycho.com/2018/emberjs2018-part-4.html)

----

One of the small changes I think would substantially improve the Ember.js ecosystem is: **defaulting to public for discussions** among the core team. Indeed: for any open-source project with community involvement like Ember.js has, that should be the default. Not the *only* option, just the default option.

There is plenty of value in having private channels for discussion in contexts like this. Sometimes you have to deal with something awkward or socially difficult. Sometimes you have already taken the community’s input and just have to come to a decision about what to do on something. Private channels are useful.

But: they shouldn’t be the default. They should be what you turn to when you’re in one of those particular kinds of situations which require it. The default should be public discussion and interaction.

Over the last year, the maintainer-ship (and therefore decision-making) of ember-cli-typescript and the surrounding TypeScript ecosystem has grown from being pretty much just me to being a small group of four of us: Derek Wickern, Dan Freeman, James Davis, and me. We have the “final say,” so to speak, on the things we’re doing with the addon and the typings and so on. (What that actually means in practice is mostly just we all try to shoulder the burden of staying on top of pull requests.) And we have a private channel for discussions as a “core team” for projects in the [typed-ember](https://github.com/typed-ember) organization.

But: it’s not the default. It’s what we turn to when we’re in one of those particular kinds of situations which require it. The default is public discussion and interaction.

And this isn’t just an unspoken norm or something. As a team, we all explicitly agreed that we default to public. Pretty much the only times we chat in our private channel is if we’re figuring out how to diffuse an awkward situation kindly, or if we’re adding someone else to the team. Otherwise, we try to have all our discussions in the GitHub issues for the projects or the `#topic-typescript` room in the Ember Community Slack.

This has a few major effects, as I see it:

- No one should feel left out or in the dark about what we’re up to. Even if we’re hashing out crazy-seeming ideas for how to move stuff forward, it’s all there for everyone to see. This includes neat things like Dan Freeman’s proof-of-concept on [type-checked templates](https://twitter.com/__dfreeman/status/994410180661170177), or our mad sprint (as a team!) to get some core improvements landed before I gave a workshop at EmberConf, or anything else we’re going after.

- We’re obviously available for input on things as people have questions, because we’re interacting with *each other* in those public forums. And if we’d like to start moving some of the oft-repeated questions over to the [Ember Discourse](https://discuss.emberjs.com) or to [Stack Overflow](https://stackoverflow.com/questions/tagged/ember.js), it’s still really helpful for people who *are* on the Slack to see that we’re there and available for help.

- We get to see the regular pain points others run into. That often turns into issues, priorities, etc. for us as a group. The slowly growing issue [tracking things we need to document](https://github.com/typed-ember/ember-cli-typescript/issues/170) is essentially a direct product of that constant cycle of interaction.

- We get the benefit of input from others! If we’ve missed something, or simply failed to think of something, others in the community often haven’t. One prime example of this: the “registry” strategy we use for making things like Ember Data store, adapter, etc. lookups work came out of conversations with a community member ([Maarten Veenstra](https://github.com/maerten)) which happened many months before we were in a spot where we could land that kind of thing—and initially I was pretty skeptical of it, but they were totally right, and it’s now core to how Ember’s typings work!

I recommend—very strongly—that the Ember.js core team adopt the same strategy. Teams *do* need private channels sometimes. But they shouldn’t be the default. They should be for those particular circumstances which *require* it.

The biggest things I think could come out of this are:

- A greater confidence from within the Ember.js community about what the core team is up to and where we’re going. Technical leadership seems to me to be about 10% technical brilliance and 90% clear communication. We have loads of technical brilliance; we need more communication!

- More confidence in the trajectory of Ember.js from *outside* its existing community. Seeing that there is active leadership is essential for people to have confidence that choosing Ember.js is a good choice both today and for the medium-to-long-term.

And we need both of those—a lot—for Ember.js to continue to grow and thrive in the years ahead!
