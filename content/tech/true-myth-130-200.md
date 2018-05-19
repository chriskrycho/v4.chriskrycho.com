---
Title: True Myth 1.3 and 2.0
Subtitle: A couple nice ergonomic updates and some breaking changes for consuming the library.
Date: 2018-05-18 09:00
Tags: TypeScript, functional programming, libraries, software development, open source software, versioning
Category: Tech
Summary: >
    Get `value` and `error` directly after type narrowing, make type definitions Just Work™, drop Flow types, and simplify the contents of the distributed build.

---

Today I released two versions of [True Myth](https://github.com/chriskrycho/true-myth): [1.3.0](https://github.com/chriskrycho/true-myth/releases/tag/v1.3.0) and [2.0.0](https://github.com/chriskrycho/true-myth/releases/tag/v2.0.0). You can read the [1.0 announcement](https://www.chriskrycho.com/2017/announcing-true-myth-10.html) from last November for an overview of the library and a discussion of why you might want to use the library in the first place!

Since its initial release last November, True Myth has gone through a number of small [feature and bug fix releases](https://github.com/chriskrycho/true-myth/releases "True Myth releases on GitHub"), each of which is more interesting in its own right than 2.0 is—because there are almost no new “features” here, and the changes to the *functionality* which are in 2.0 are purely additive and could readily have gone in 1.3 instead.

In fact, the act of writing that sentence made me realize that there really *should* be a 1.3 which people can trivially upgrade to and then take on the changes in 2.0 later.

## 1.3

There are a few very small changes in 1.3 that are just nice ergonomic wins. (You may also be interested in looking back at the [list of other releases](https://github.com/chriskrycho/true-myth/releases) to see what else has landed since 1.0.)

### Expose `value` and `error`

The `value` property in `Maybe.Just` and `Result.Ok` instances, and the `error` property in `Result.Err` instances, are now *public, readonly properties* instead of *private properties*. I made those private in the initial implementation because I thought it made more sense to expose them via methods, but experience showed that this is a relatively common pattern in practice:

```ts
function dealsWithAMaybe(couldBeAString: Maybe<string>) {
  if (couldBeAString.isJust()) {
    console.log(`It was! ${couldBeAString.unsafelyUnwrap()}`);
  }
}
```

This is a contrived example of course, but I and my colleagues found in practice that this is a scenario that comes up relatively often, *especially* when integrating with existing code rather than writing new code – control flow patterns there tend to assume early-return-on-`null` or similar instead.

So I made a change (leaning on TypeScript’s notion of [“type narrowing”](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards "“User-Defined Type Guards” in the TypeScript handbook")) so that you don’t have to use `unsafelyUnwrap` in this scenario anymore! You can use the method types, the standalone functions, or direct matching against the variants on the property 

```ts
import Maybe from 'true-myth/maybe';

function dealsWithAMaybe(maybe: Maybe<string>) {
  if (maybe.isJust()) {
    console.log(`It was! ${maybe.value}`);
  }
}
```

In the `Result` case this is even nicer (notice that I’m using the variant, rather than a function, to discriminate between the two and narrow the types here):

```ts
import Result, { Variant } from 'true-myth/result';

function dealsWithAResult(result: Result<string, Error>) {
  if (result.variant === Variant.Ok) {
    console.log(`Huzzah: ${result.value}`);
  } else {
    console.log(`Alas: ${result.error.message}`);
  }
}
```

Basically: you now have more options for handling these scenarios, a nicer <abbr title="application programming interface">API</abbr>, and—not that it should *usually* matter that much, but for whatever it’s worth—better performance by way of doing things with property lookups instead of function invocations in quite a few places.[^1]

### Static helper methods

At my friend and collaborator [Ben Makuh](https://mobile.twitter.com/bmakuh)’s suggestion, I built a couple static helper methods to go with those. These helpers just give you nice abstractions to drop into functional pipelines. For example, you can lean on the type-narrowing capabilities described above while working through a *list* of `Maybe`s to *know* that an item is a `Just` and use the new `Just.unwrap` static method in the pipeline:

```ts
import Maybe, { Just } from 'true-myth/maybe';

function justLengths(maybeStrings: Array<Maybe<string>>) {
  return maybeStrings
    .filter(Maybe.isJust) .map(Just.unwrap)
    .map(s => s.length);
}
```

Analogous helpers exist for `Result` in the form of the `Ok.unwrap` and `Err.unwrapErr` methods. (`Nothing` has no analog for what I hope are obvious reasons!)

### Tweaks to the `variant` properties

The `variant` property on both `Maybe` and `Result` has changed in two ways:

1. It is now `readonly`. This was an implicit invariant previously—you would break *everything* in the library if you changed the `variant` value—and I’ve just made it explicit in the type system.

2. It is now properly constrained with a *literal type* on the concrete instances. That is, the type of `Just.variant` is no longer `Variant` but specifically `Variant.Just`. (This is what enables you to use the variant for narrowing as demonstrated above. I should have done this in 1.0, and just forgot to!)

And that’s it for 1.3.0!

## 2.0

The 2.0 release is identical in *features* with the 1.3 release. However, it makes a breaking change to how consumers interact with the application, requiring updates to your `tsconfig.json` file and your bundler configuration, and removing support for Flow types.

### Configuration file updates

Getting True Myth working nicely with consuming TypeScript packages has been a source of frustration for me *and* others. In short, requiring you to use the `"paths"` key in the `"compilerOptions"` section of the `tsconfig.json` made for an annoying amount of setup work, *and* it meant that using True Myth in a library *required* you to set it up in any consuming app. No good.

For type resolution to Just Work™, the types *must* be at the root of the distributed package.

As a result, I’ve stopped using [libkit](https://github.com/tildeio/libkit), which put the generated types in a reasonable-seeming but (in my experience) painful-to-use place, and have simplified the build layout substantially.

- The types themselves are generated only when publishing an update to npm. They go in the root at that point, and they get cleaned up after publishing. (This is pretty much identical to the solution we came up in [ember-cli-typescript](https://github.com/typed-ember/ember-cli-typescript).)
- The other build files no longer get dropped in a nested `src` directory.
- Since I was already at it, I renamed the two build directories from `commonjs` to `cjs` and from `modules` to `es`

So the distributed build now looks something like this:

```
/ 
  index.d.ts
  maybe.d.ts
  result.d.ts
  unit.d.ts
  utils.d.ts
  dist/
    cjs/
      index.js
      maybe.js
      result.js
      unit.js
      utils.js
    es/
      index.js
      maybe.js
      result.js
      unit.js
      utils.js
```

You’ll just need to completely remove the `"paths"` mapping for True Myth from your `tsconfig.json` and, if you’ve done anything unusual with it, update your bundler configuration to point to the new build location, i.e. `dist/commonjs/src` should now just be `dist/cjs`. Bundlers which respect the `modules` key in `package.json` will pick it up automatically, as will Ember <abbr>CLI</abbr>.

### Removing Flow types

To my knowledge, no one is actually using the Flow types for the library. When I first started on it, my collaborator [Ben Makuh](https://github.com/bmakuh) *was* using Flow, but he ended up migrating to TypeScript in the intervening time, and there are no consumers I know of. I was always relatively unsure of their correctness, *and* I don’t have a good way to validate their correctness, *and* maintaining them involved doing manual work on every release to update the types by hand.
  
If you *do* use True Myth with Flow, and you’re missing the types, please let me know. I just can’t maintain them myself at this point!

---- 

And that’s it! We’ve been using True Myth in production at Olo for quite some time, and it’s proved to be a really valuable tool. Give it a spin and let me know how these latest versions work for you!

[^1]:   I’ve made some changes under the hood to take advantage of this as well, so the library should be faster. Probably *trivially* faster, but my philosophy around library code is very much *be as fast as you can*; it’s a way of considering the people using your code—not just the developers, but the end users.

