---
Title: TypeScript and Ember.js Update, Part 1
Subtitle: How do things look in early 2018? Pretty good, actually!
Date: 2018-01-22 07:10
Category: Tech
Series: Typing Your Ember
Tags: TypeScript, emberjs, typing-your-ember
slug: typing-your-ember-update-part-1
Summary: >
    A bunch has changed for the better in the TypeScript/Ember.js story over the last six months. Here’s an overview of the changes, and a look at normal Ember objects,
---

<i class='series-overview'>You write [Ember.js] apps. You think [TypeScript] would be helpful in building a more robust app as it increases in size or has more people working on it. But you have questions about how to make it work.</i>

[ember.js]: https://emberjs.com
[typescript]: http://www.typescriptlang.org

<i class='series-overview'>This is the series for you! I'll talk through everything: from the very basics of how to set up your Ember.js app to use TypeScript to how you can get the most out of TypeScript today---and I'll be pretty clear about the current tradeoffs and limitations, too.</i>

<i class='series-overview'>[(See the rest of the series. →)][series]</i>

[series]: /typing-your-ember.html

---

Back in July 2017, I wrote [a post](http://www.chriskrycho.com/2017/typing-your-ember-part-3.html) on how to using TypeScript in your Ember.js apps. At the time, we were still busy working on getting the typings more solid for Ember itself, and `class` syntax for Ember was apparently a long way away.

Things have gotten quite a bit better since then, so I thought I'd update that post with recommendations for using TypeScript in an app _now_ with the updated typings, as well as with another six months of experience using TypeScript in our app at Olo (~20k lines of code in the app and another ~15k in tests).

<aside>

If you're interested in all of this and would like to learn more in person, I'm [leading a workshop on it at EmberConf 2018](http://emberconf.com/speakers.html#chris-krycho)---I'd love to see you there!

</aside>

Here's how I expect this update series to go:

1. Overview, normal Ember objects, component arguments, and injections (this post).
2. Class properties, including computed properties, as well as mixins.
3. Ember Data and related concerns.

## Normal Ember objects

For normal Ember objects, things now _mostly_ just work if you're using class-based syntax, with a single (though very important) qualification I'll get to in a minute. And you can use the class-based syntax _today_ in Ember.js---all the way back to 1.13, as it turns out. If you want to learn more, you can read [this RFC] or [this blog post], both by [\@pzuraq (Chris Garrett)][pzuraq], who did most of the legwork to research this and flesh out the constraints, and who has also been doing a lot of work on [Ember Decorators].

[this rfc]: https://github.com/emberjs/rfcs/blob/master/text/0240-es-classes.md
[this blog post]: https://medium.com/build-addepar/es-classes-in-ember-js-63e948e9d78e
[pzuraq]: https://github.com/pzuraq
[ember decorators]: https://ember-decorators.github.io/ember-decorators/docs/index.html

Accordingly, I'm assuming the use of ES6 `class` syntax throughout. The big reason for this is that things mostly just _don't work_ without it. And we'll see (in a later post) some hacks to deal with places where parts of Ember's ecosystem don't yet support classes properly. In general, however, if you see an error like `"Cannot use 'new' with an expression whose type lacks a call or construct signature."`, the reason is almost certainly that you've done `export default Component.extend({...})` rather than creating a class.

## A detailed example

That means that every new bit of code I write today in our app looks roughly like this, with only the obvious modifications for services, routes, and controllers---I picked components because they're far and away the most common things in our applications.

In order to explain all this clearly, I'm going to start by showing a whole component written in the new style. Then, over the rest of this post and the next post, I'll zoom in on and explain specific parts of it.

```typescript
import Component from "@ember/component";
import { computed, get } from "@ember/object";
import Computed from "@ember/object/computed";
import { inject as service } from "@ember/service";
import { assert } from "@ember/debug";
import { isNone } from "@ember/utils";

import Session from "my-app/services/session";
import Person from "my-app/models/person";

export default class AnExample extends Component {
  // -- Component arguments -- //
  model: Person; // required
  modifier?: string; // optional, thus the `?`

  // -- Injections -- //
  session: Computed<Session> = service();

  // -- Class properties -- //
  aString = "this is fine";
  aCollection: string[] = [];

  // -- Computed properties -- //
  // TS correctly infers computed property types when the callback has a
  // return type annotation.
  fromModel = computed("model.firstName", function(this: AnExample): string {
    return `My name is ${get(this.model, "firstName")};`;
  });
  aComputed = computed("aString", function(this: AnExample): number {
    return this.lookAString.length;
  });
  isLoggedIn = bool("session.user");
  savedUser: Computed<Person> = alias("session.user");

  actions = {
    addToCollection(this: AnExample, value: string) {
      const current = this.get("aCollection");
      this.set("aCollection", current.concat(value));
    }
  };

  constructor() {
    super();
    assert("`model` is required", !isNone(this.model));

    this.includeAhoy();
  }

  includeAhoy(this: AnExample) {
    if (!this.get("aCollection").includes("ahoy")) {
      this.set("aCollection", current.concat("ahoy"));
    }
  }
}
```

### Component arguments

```typescript
export default class AnExample extends Component {
  // Component arguments
  model: Person;      // required
  modifier?: string;  // optional, thus the `?`
```

I always put these first so that the "interface" of the object is clear and obvious. You can do the same thing on a controller instance; in that case you would export a `Model` from the corresponding `Route` class and import it into the `Controller`. It's a bit of boilerplate, to be sure, but it lets you communicate your interface clearly to consumers of the `Component` or `Controller`.

An important note about these kind of arguments: you do _not_ have to do `this.get(...)` (or, if you prefer, `get(this, ...)`) to access the properties themselves: they're class instance properties. You can simply access them as normal properties: `this.model`, `this.modifier`, etc. That even goes for referencing them as computed properties, as we'll see below.

For optional arguments, you use the `?` operator to indicate they may be `undefined`. To get the _most_ mileage out of this, you'll want to enable `strictNullChecks` in the compiler options.[^maybe] However, note that we don't currently have any way to validate component argument invocation.[^ts-templates] The way I've been doing this is using Ember's debug `assert` in the constructor:

```typescript
assert("`model` is required", !isNone(this.model));
```

[^maybe]: This isn't my preferred way of handling optional types; [a `Maybe` type](https://true-myth.js.org) is. And you can, if you like, use `Maybe` here:

    ```typescript
    import Component from "@ember/component";
    import { Maybe } from "true-myth";

    export default class MyComponent extends Component {
      optionalProperty: Maybe<string> = Maybe.of(this.optionalProperty);
    }
    ```

Then if you invoke the property without the argument, it'll construct a `Nothing`; if you invoke it with the argument, it'll be `Just` with the value.

[^ts-templates]: A few of us have batted around some ideas for how to solve that particular problem, but _if_ we manage those, it'll probably be way, way later in 2018.

### Injections

```typescript
  // -- Injections -- //
  session: Computed<Session> = service();
```

Here, the most important thing to note is the required type annotation. In principle, we could work around this by requiring you to explicitly name the service and using a "type registry" to look up what the service type is -- more on that below in my discussion of using Ember Data -- but I'm not yet persuaded that's better than just writing the appropriate type annotation. Either way, there's some duplication. 🤔 We (everyone working in the [typed-ember](https://github.com/typed-ember) project) would welcome feedback here, because the one thing we _can't_ do is get the proper type _without_ one or the other of these.

```typescript
  // the current approach -- requires importing `Session` so you can define it
  // on the property here
  session: Computed<Session> = service();

  // the alternative approach I've considered -- requires writing boilerplate
  // elsewhere, similar to what you'll see below in the Ember Data section
  session = service('session');
```

One other thing to notice here is that because TypeScript is a _structural_ type system, it doesn't matter if what is injected is the actual `Session` service; it just needs to be something that _matches the shape_ of the service -- so your normal behavior around dependency injection, etc. is all still as expected.

That's enough for one post, I think. In the next entry, we'll pick up with how you handle class properties, including computed properties, and then talk about mixins as well. In the post after that, we'll look at Ember Data and some related concerns.
