---
Title: ember-cli-typescript v2 beta
Subtitle: >
    Faster, more reliable builds, with better error reporting – <em>please</em> come test it in your apps and addons!
Date: 2018-11-19 21:30
Category: Tech
Tags: [ember.js, typescript, ember-cli-typescript, open-source software]
Summary: >
    We've released a beta of ember-cli-typescript v2, which will make your builds faster and more reliable, and which will give you better error output with type errors. Please come test it in your apps and addons!

---

A few weeks ago, the Typed Ember team published the first beta releases of `ember-cli-typescript` v2 (currently at beta 3). The new version brings much faster and more reliable builds, with nicer error reporting to boot.

In this post:

- [Testing the Upgrade](#testing-the-upgrade)
- [Under the Hood](#under-the-hood)

## Testing the Upgrade

I emphasize: ***this is a beta release.*** We have tested it in two large apps (including the one I work on every day) and a number of addons, and it seems to work correctly, but that does *not* mean it is ready for production. We need your help to *get* it ready for production. Accordingly, please *do* test it in your apps, and please *do not* run it in production! (If you do, and something breaks, we will not feel bad for you! You have been warned!)

This upgrade *requires* that you be using Babel 7. As such, we suggest you start by doing that upgrade:

```bash
ember install ember-cli-babel@7
```

There may be a couple things you find different with your app with Babel 7, so resolve those first. Then, and only then, upgrade `ember-cli-typescript`.

To test the `ember-cli-typescript` v2 beta in an app:

```bash
ember install ember-cli-typescript@beta
```

To test it in an addon:

```bash
ember install ember-cli-typescript@beta --save
```

(This will add the addon to your addon’s runtime dependencies, not just its development-time dependencies, which is necessary because of the changes we made to how the build pipeline works. See [below](#under-the-hood) for details.)

Then run your test suite and poke around! Note that on your first run, there are *almost certainly* going to be some things that break. In both of the large apps this has been tested in, there were a number of small changes we had to make to get everything working again. (We’re marking this as a breaking [semver](http://www.semver.org/spec/v2.0.0.html) change for a reason!)

In general, most apps will only have a few places they need to make changes, but because a certain kind of imports are included in the things affected, you may see your test suite explode. Don’t panic! You will probably make a couple a couple changes and see everything go back to working again.

Here are the changes you need to know about:

- We now build the application using Babel 7's TypeScript plugin. This has a few important limitations—some of them bugs (linked below); others are conscious decisions on the part of Babel. The changes:

	- `const enum` types are unsupported. You should switch to constants or regular enums.

	- trailing commas after rest function parameters (`function foo(...bar[],) {}`) are disallowed by the ECMAScript spec, so Babel also disallows them.

	- re-exports of types have to be disambiguated to be *types*, rather than values. Neither of these will work:

		```ts
		export { FooType } from 'foo';
		import { FooType } from 'foo';
		export { FooType };
		```

		In both cases, Babel attempts to emit a *value* export, not just a *type* export, and fails because there is no actual value to emit. You can do this instead as a workaround:

		```ts
		import * as Foo from 'foo';
		export type FooType = Foo.FooType;
		```

	Other bugs you should be aware of:

	- If an enum has a member with the same name as an imported type ([babel/babel#8881](https://github.com/babel/babel/issues/8881)), it will fail to compile.

	- `this` types in ES5 getters and setters do not work ([babel/babel#8069](https://github.com/babel/babel/issues/8069)).

	- Destructuring of parameters in function signatures currently do not work ([babel/babel#8099](https://github.com/babel/babel/issues/8099)).

- `ember-cli-typescript` must be in `dependencies` instead of `devDependencies` for addons, since we now hook into the normal Broccoli + Babel build pipeline instead of doing an end-run around it.

- Addons can no longer use `.ts` in app, because an addon's `app` directory gets merged with and uses the *host's* (i.e. the other addon or app's) preprocessors, and we cannot guarantee the host has TS support. Note that everything will continue to work for in-repo addons because of the app build works with the host's (i.e. the app's, not the addon's) preprocessors.

- Apps need to use `.js` for addon overrides in the `app` directory, since the different file extension means apps no longer consistently "win" over addon versions (a limitation of how Babel + app merging interact)—note that this won’t be a problem with Module Unification apps.

That’s it. Again, please test it out in your app and [report any issues](https://github.com/typed-ember/ember-cli-typescript/issues/new/choose) you find!

## Under the Hood

In the 1.x series of releases, we used TypeScript’s own build tooling, including its `--watch` setting, and then fed the results of that into Ember’s build pipeline. We made this work, but it was pretty fragile. Worse, it was *slow*, because we had to compile your code twice: once with TypeScript, and once with Babel in the normal Ember <abbr>CLI</abbr pipeline.

In v2, we’re [now able](https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/) to use Babel to do the actual *build* of your TypeScript code, while using the TypeScript compiler in parallel to type-check it. This meant we were able to throw away most of that fragile custom code wiring TypeScript and Ember <abbr>CLI</abbr>’s file-watching and build pipelines together, so it’s much less fragile. And of course it’s much *faster*. What’s more, because Babel 7 is itself substantially faster than Babel 6 was, build times see an even *larger* speedup.

While we were at it, we added some extra nice error reporting for your type errors:

![An example of TypeScript build errors in an Ember app](https://user-images.githubusercontent.com/108688/47465007-19687d80-d7b9-11e8-8541-395ad82ceb67.gif "build errors")

These changes are why the addon is now back to being part of the runtime dependencies for addons. In the 1.x series, we did a complicated dance to make sure you could use TypeScript in an addon without burdening consumers with the full size of each distinct version of the TypeScript compiler in use by addons they consumed. (For more on that, see [my blog post on the 1.1 release](https://www.chriskrycho.com/2018/announcing-ember-cli-typescript-110.html#addon-development).) We still want to keep that commitment, and  we do: TypeScript is only a dev dependency. `ember-cli-typescript`, however, is a full dependency for addons, because we’re just part of the regular Babel/Ember <abbr>CLI</abbr> pipeline now! We play exactly the same role that other Babel transforms in the Ember ecosystem do, including e.g. the [modules <abbr>API</abbr> polyfill](https://github.com/ember-cli/babel-plugin-ember-modules-api-polyfill).

In short, this update simplifies our internals *and* makes your experience as a developer better. That’s about as good an outcome as we could hope for. We as a team have been thinking through this for quite some time—ever since we learned that Babel 7 was [adding TypeScript support](https://github.com/facebook/create-react-app/pull/4837)—but the actual implementation was almost all [Dan Freeman](https://twitter.com/__dfreeman)’s excellent work, so say thank you to him if you get a chance!

We’re eager to get it to a production-ready state, so please test it!
