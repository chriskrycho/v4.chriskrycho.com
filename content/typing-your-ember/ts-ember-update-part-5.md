---
Title: TypeScript and Ember.js Update, Part 5
Subtitle: TODO
Date: 2018-01-25 07:00
Category: Tech
Series: Typing Your Ember
Tags: TypeScript, emberjs, typing-your-ember
slug: typing-your-ember-update-part-5
Summary: >
    TODO
Status: draft
---

<!-- TODO: previous posts and what they covered -->

<aside>

If you're interested in all of this and would like to learn more in person, I'm [leading a workshop on it at EmberConf 2018](http://emberconf.com/speakers.html#chris-krycho)---I'd love to see you there!

</aside>

Here's the outline of this update sequence:

1. [Overview, normal Ember objects, component arguments, and injections.][pt1]
2. [Class properties---some notes on how things differ from the `Ember.Object` world.][pt2]
3. [Computed properties, actions, mixins, and class methods.][pt3]
4. [Ember Data and related concerns.][pt4]
5. [Mixins and proxies; or: the really hard-to-type-check bits (this post).][pt5]

[pt1]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-1.html
[pt2]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-2.html
[pt3]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-3.html
[pt4]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-4.html
[pt5]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-4.html

<!-- TODO: how to write the type definition for a mixin, using `typeof` and export merging -->

However, as long as you annotate the type definitions appropriately---we'll come back to that in part 5 of this series---their property types will be picked up in `class`es which consume them. Once you've created a mixin, you add it to a class like this:

```typescript

```

<!-- TODO: how to write the type definition of a proxy -->
