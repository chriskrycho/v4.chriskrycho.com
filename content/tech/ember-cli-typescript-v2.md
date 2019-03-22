---
Title: Announcing ember-cli-typescript v2.0
Subtitle: Now built with Babel, better build errors, and a docs site!
Date: 2019-03-13 16:00
Tags: [emberjs, typescript, open-source software]
Category: Tech
Summary: >
    The unofficial Ember TypeScript team just published v2 of ember-cli-typescript, with nicer build errors, a docs site, and much faster builds which play more nicely with the ecosystem by way of Babel 7.

---

I'm pleased to announce that the unofficial Ember TypeScript team (Dan Freeman, Derek Wickern, James Davis, and Mike North, and I) have just published ember-cli-typescript v2.0.0!

Check out the [upgrade instructions] to get started with the new version!

[upgrade instructions]: https://typed-ember.github.io/ember-cli-typescript/versions/master/docs/upgrade-notes

## What's new?

There are just two changes, but they're a big deal!

1. **The addon now uses Babel 7's TypeScript support** to actually build your TypeScript, while continuing to use TypeScript itself to type-check your app. We added some fancy new build errors to go with that, too! This means your builds will be *much faster* and that tools like [ember-auto-import] will Just Work™ with TypeScript apps and addons nnow. (There are a few caveats that come with this, so *please* see [the release notes]!)

2. **We added a documentation site!** You can check out the documentation at [typed-ember.github.io/ember-cli-typescript][docs]. Previously, the README was over 6,000 words long… and growing. Now, the README just has the basic stuff you need to get started, and documentation lives in… the docs! Thanks to the [ember-cli-addon-docs] crew for making it so easy to build such a nice documentation site!

[ember-auto-import]: https://github.com/ef4/ember-auto-import
[the release notes]: https://github.com/typed-ember/ember-cli-typescript/releases/tag/v2.0.0
[docs]: https://typed-ember.github.io/ember-cli-typescript/versions/master/
[ember-cli-addon-docs]: https://www.github.com/ember-learn/ember-cli-addon-docs

We covered the Babel 7 changes in detail two earlier blog posts:

- [ember-cli-typescript v2 beta](https://www.chriskrycho.com/2018/ember-cli-typescript-v2-beta.html) (me)
- [ember-cli-typescript v2 release candidate](https://medium.com/@mikenorth/ember-cli-typescript-v2-release-candidate-3d1f72876ea4) (Mike North)

Happily, nothing has changed in the implementation since the beta or <abbr>RC</abbr> releases except fixing some bugs!

For my part, thanks to Dan Freeman, who did the lion's share of the work to get us working with Babel 7!

On behalf of the whole unofficial Ember TypeScript team, thanks to everyone who tested this before we released, identified gaps in the docs (not to mention catching errors and typos there!), and provided feedback along the way. There's more good stuff coming in the months ahead!
