---
Title: TypeScript and Ember.js Update, Part 4
Subtitle: TODO
Date: 2018-01-25 07:00
Category: Tech
Series: Typing Your Ember
Tags: TypeScript, emberjs, typing-your-ember
slug: typing-your-ember-update-part-4
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
4. [**Ember Data and related concerns (this post).**][pt4]
5. Mixins and proxies; or: the really hard-to-type-check bits.

[pt1]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-1.html
[pt2]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-2.html
[pt3]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-3.html
[pt4]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-4.html

## Ember Data

There are two challenges to using Ember Data effectively with TypeScript today.

1. Ember Data, for reasons I haven't yet dug into myself, does not play nicely with ES6 classes. However, we *need* named class exports for the sake of being able to use them as types elsewhere in our programs.

++TODO++

We also have some ideas and prototypes for how to make the experience of both of these much, _much_ better. Sometime soon-ish---hopefully before EmberConf, where I'd really like to _not_ have to mess with teaching the complicated ways above to make things work!---we should land a solution that means you can drop the type coercions and just do a lookup like you would normally, and it will Just Work™️.[^registries]

[^registries]: If you're curious about the mechanics, we're basically setting up a "type registry" which maps the string keys to the correct model, so that the type of e.g. `store.createRecord('some-model', { ... })` will do a lookup in an interface which defines a mapping from model name, i.e. `some-model` here, to the model type, e.g. `export default class SomeModel extends DS.Model.extend({ ... }) {}`;

Note for Ember CLI Mirage users: most of what I've said here is equally applicable and nearly identical for Mirage. I'm currently working on solid typings for Mirage that get us everything we need that way.
