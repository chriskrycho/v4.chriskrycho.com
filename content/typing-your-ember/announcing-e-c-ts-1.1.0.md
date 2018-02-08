---
Title: Announcing ember-cli-typeScript 1.1
Subtitle: Now with generators, support for addons, and incremental compilation!
Tags: emberjs, typescript, javascript, typing-your-ember
Category: Tech
Date: 2018-02-09 07:00
Summary: >
    TODO
Status: draft

---

I’m delighted to announce the release of [ember-cli-typescript 1.1.0][1.1.0]. This first minor release since 1.0 includes the following shiny and awesome new features:

[1.1.0]: https://github.com/typed-ember/ember-cli-typescript/releases/tag/v1.0.0

- [Generators](#generators)
- [Support for developing addons in TypeScript](#developing-addons)
- [Incremental compilation (a.k.a. fast rebuilds in `ember serve` mode)](#incremental-compilation)

## Generators

We’ve now added support for generating *all* standard Ember items as TypeScript files instead of JavaScript files. So now when you run `ember generate component user-profile` for example, you’ll get `user-profile.ts`, `user-profile-test.ts`, and `user-profile.hbs`. For most files, this is just a nicety---just two files you don’t have to rename!---but in the case of services, controllers, and Ember Data models, adapters, and serializers it will actually make a really big difference in your experience of using TypeScript in your app or addon.[^pt4]

[^pt4]: For details on how this all works, see [TypeScript and Ember.js Update: Part 4][pt4], where I discuss these changes in detail.

Those generators have been customized so you get the most mileage out of TypeScript for the least effort we can manage today. So when you do `ember generate service session`, this is what you’ll see:

```ts
import Service from '@ember/service';

export default class Session extends Service.extend({
  // anything which *must* be merged on the prototype
}) {
  // normal class definition
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module 'ember' {
  interface ServiceRegistry {
    'session': Session;
  }
}
```

Courtesy of these generators, you can now just write this (and the analogous kinds of things for controllers as well as Ember Data models, serializers, and adapters) and get full support for autocompletion of properties and methods on the `Session` service, as well as type-checking for how you use those:

```ts
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class UserProfile extends Component {
  session = service('session');
}
```

So, for example, if your `session` service had a `login` method on it:

```ts
import Service from '@ember/service';
import RSVP from 'rsvp';

export default class Session extends Service {
  login(email: string, password: string): RSVP.Promise<string> {
    // some API call to log in
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module 'ember' {
  interface ServiceRegistry {
    'session': Session;
  }
}
```

Then anywhere you injected and used it, you'll get auto-complete suggestions and type checking:

++TODO: example in VS Code++

(You'll see the same kinds of things in other editors, from Vim to IntelliJ IDEA. Visual Studio Code is just my current editor of choice.)

## Addon development

As [promised with the 1.0 release](http://www.chriskrycho.com/2017/announcing-ember-cli-typescript-100.html#the-roadmap), 1.1 (though arriving much later than I hoped it would) includes support for developing addons with TypeScript.

Strictly speaking, of course, you could *always* develop addons using TypeScript, but there were two problems with it: (1) dependency management and (2) manual work required to deal with the dependency management problems.

### 1. Dependency management

In the normal Ember CLI workflow, TypeScript had to be a `dependency`---not a `devDependency`---of the addon, because the normal pattern with Ember CLI is to ship the uncompiled files and have the consumer compile them all together at build time.

This makes a certain amount of sense for Babel given the Ember community’s shared reliance on Babel: it’s just assumed to be part of every app build. In that case, it gives consumers control over their compilation target. If an app only needs to target evergreen browsers, it can do that and ship a smaller payload, because an addon won’t have pre-compiled in things like generator support, etc.

In the case of TypeScript, however, this makes a lot less sense: many (probably *most*) consumers of addons written in TypeScript will still be normal JavaScript consumers. We did not want to burden normal consumers with a TypeScript compile step. We *also* didn’t want to burden any consumers with the reality that TypeScript is a *large* install. TypeScript 2.6.2 is 32MB on disk for me. Even with some degree of deduplication by npm or yarn, if addons used a variety of versions of TypeScript along the wa---as they surely would!---the install cost for consumers would quickly spiral into a nasty spot. And again: that’s bad enough for someone who *wants* to use TypeScript in their app; it’s far worse for someone who just wants to consume the compiled JavaScript.

### 2. Manual workarounds

You could work around all of that by building the JavaScript (and TypeScript definitions) yourself. But as part of that, you had to do all the work of making sure both the JavaScript files and the type definitions you generated ended up in the right place for distribution and consumption.  That was always possible, but it was also always going to be a lot of work. In practice, as far as I know, *no one has done this*.

### Solution

We now support TypeScript as a `devDependency` and also manage the work of generating JavaScript and type definitions for you. All you have to do is install ember-cli-typescript into an addon, and then when you do your build step, we'll automatically do the work (on prepublish) of generating TypeScript `.d.ts` files and JavaScript source for you.

Consumers of your addon, therefore, will (a) not know or care that the addon is written in TypeScript if they just want to consume it as normal JavaScript[^normal-JS] or (b) will get the benefits of your having written the library in TypeScript without paying the penalty of having to have multiple versions of the TypeScript compiler downloaded to their own app.

[^normal-JS]: although they may actually get some benefits in a number of modern editors, since e.g. VS Code and the JetBrains IDEs will leverage types if they exist!

One important caveat: we do *not* support TypeScript in an addon’s `app` directory. However, for most addons, we don't think this should be a problem. It's rare for addons to put actual implementation in the `app` directory; instead it has simply become conventional for the `app` directory simply to have re-exports for convenient access to the functionality supplied by the addon.

Also note that you can supply type definitions for your addon *without* developing the addon itself in TypeScript.[^typing-plan] You do *not* need ember-cli-typescript installed for that. You only need the addon if you actually want to take advantage of the opportunities TypeScript affords for developing your own addon.

[^typing-plan]: More on that in a post to be released in the next couple weeks---one I promised *long* ago, but which we're now in a place to actually do: a plan and a roadmap for typing the whole Ember ecosystem!

## Incremental compilation

Last but not least, we’ve managed---mostly through the hard work of both Dan Freeman ([@dfreeman]) and Derek Wickern ([@dwickern]---to get support for TypeScript’s --watch` mode integrated.[^watch] What this means in practice is: *way* faster iteration as you work.

Previously, every time you triggered *any* change in your app (even if it didn’t involve any TypeScript files at all), the TypeScript compiler would recompile *all* the TypeScript files in your application. We didn’t initially have a good way to make TypeScript and Broccoli (and therefore Ember CLI) communicate clearly about what had changed. Now, courtesy of Dan and Derek’s hard work (and my cheerleading, testing, and fixing a few corner pieces along the way), we do! So when you change a `.hbs` file or a `.js` file... the TypeScript compiler won’t do anything. And when you change a TypeScript file, the TypeScript compiler will *only* recompile that file.

On my own app (~35,000 lines of TypeScript across ~700 files), that’s the difference between rebuilds involving TypeScript taking 15--20 seconds and their taking 1--2 seconds. Literally an order of magnitude faster! Over the course of a day of development, that saves a *huge* amount of time.

[^watch]: And of course, right as we finally landed our support for it, by hacking around the `--watch` invocation in a lot of really weird ways, Microsoft shipped API-level support for it. We hope to switch to using that under the hood, but that shouldn’t make any difference at all to you as a consumer of the addon, except that if/when we land it at some point, you’ll just have a nicer experience.

[@dfreeman]: https://github.com/dfreeman
[@dwickern]: https://github.com/dwickern
