---
Title: Ember.js, TypeScript, and Class Properties
Subtitle: An important set of corrections about the behavior of class properties in Ember.js.
Date: 2018-07-10 20:00
Category: Tech
Series: Typing Your Ember
Tags: [TypeScript, emberjs, typing-your-ember]
slug: ember-ts-class-properties
Summary: >
    I made an important mistake in my discussion of JavaScript and TypeScript class properties in relation to computed properties and injections in Ember earlier this year. Here's the fix you need.
---

A few months ago, I wrote a mostly-complete series describing the state of using [TypeScript](https://typescriptlang.org) with [Ember](https://emberjs.com) in 2018. I got one *very* important thing wrong in that series, and I'm back with the correction![^feel-bad]

[^feel-bad]: I don't feel too bad about having gotten in wrong: no one who read the posts noticed the problem at the time, and it was subtle and easy to miss... because, at the time, everything actually *worked*.

In that series, I showed an example of a component definition; it looked like this:

```typescript
import Component from '@ember/component';
import { computed, get } from '@ember/object';
import Computed from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';

import Session from 'my-app/services/session';
import Person from 'my-app/models/person';

export default class AnExample extends Component {
  // -- Component arguments -- //
  model: Person;      // required
  modifier?: string;  // optional, thus the `?`

  // -- Injections -- //
  session: Computed<Session> = service();

  // -- Class properties -- //
  aString = 'this is fine';
  aCollection: string[] = [];

  // -- Computed properties -- //
  // TS correctly infers computed property types when the callback has a
  // return type annotation.
  fromModel = computed(
    'model.firstName',
    function(this: AnExample): string {
      return `My name is ${get(this.model, 'firstName')};`;
    }
  );

  aComputed = computed('aString', function(this: AnExample): number {
    return this.lookAString.length;
  });

  isLoggedIn = bool('session.user');
  savedUser: Computed<Person> = alias('session.user');

  actions = {
    addToCollection(this: AnExample, value: string) {
      const current = this.get('aCollection');
      this.set('aCollection', current.concat(value));
    }
  };

  constructor() {
    super();
    assert('`model` is required', !isNone(this.model));

    this.includeAhoy();
  }

  includeAhoy(this: AnExample) {
    if (!this.get('aCollection').includes('ahoy')) {
      this.set('aCollection', current.concat('ahoy'));
    }
  }
}
```

The problem here is all the computed property assignments and the actions hash assignments. The fact that this sample code ever worked at all was... an accident. It wasn't *supposed* to work. I [noted at the time][cps] that this way of doing things had a performance tradeoff because computed properties ended up installed on every *instance* rather than on the *prototype*... and as it turns out, that was never intended to work. Only the prototype installation was supposed to work. And as it turns out, the [<abbr>ES5</abbr> getters implementation of computed properties][RFC-0281] which landed in Ember 3.1 broke every computed property set up this way.

[cps]: https://www.chriskrycho.com/2018/typing-your-ember-update-part-3.html#computed-properties
[RFC-0281]: https://github.com/emberjs/rfcs/blob/master/text/0281-es5-getters.md "RFC #0281"

So if you can't use class properties for this... how *do* you do it? There are two ways: the `.extend()` hack I mentioned [previously][cp-details], and [decorators][e-@]. (The Ember Decorators docs include a discussion of this topic as well—see [their discussion of class fields][e-@/classes].)

[cp-details]: https://www.chriskrycho.com/2018/typing-your-ember-update-part-3.html#computed-properties-1
[e-@]: http://ember-decorators.github.io/ember-decorators/latest/
[e-@/classes]: http://ember-decorators.github.io/ember-decorators/latest/docs/class-fields

Note that throughout I'm assuming Ember 3.1+ and therefore <abbr>ES5</abbr> getter syntax (`this.property` instead of `this.get('property')`).

## `.extend()`

The first workaround uses `.extend()` in conjunction with a class definition. I originally wrote about this approach:

> If you need the absolute best performance, you can continue to install them on the prototype by doing this instead...

As it turns out, it's more like "If you want your app to work at all..."

Here's how that would look with our full example from above. Note that there are three things which *must* go in the `.extend()` block with this approach: injections, computed properties, and the `actions` hash.

```typescript
import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';

import Person from 'my-app/models/person';

export default class AnExample extends Component.extend({
  // -- Injections -- //
  session: service('session'),

    // -- Computed properties -- //
  // TS correctly infers computed property types when the callback has a
  // return type annotation.
  fromModel: computed(
    'model.firstName',
    function(this: AnExample): string {
      return `My name is ${this.model.firstName};`;
    }
  ),

  aComputed: computed('aString', function(this: AnExample): number {
    return this.lookAString.length;
  }),

  isLoggedIn: bool('session.user'),
  savedUser: alias('session.user') as Person,

  actions: {
    addToCollection(this: AnExample, value: string) {
      this.set('aCollection', this.aCollection.concat(value));
    }
  },
}) {
  // -- Component arguments -- //
  model!: Person;     // required
  modifier?: string;  // optional, thus the `?`

  // -- Class properties -- //
  aString = 'this is fine';
  aCollection: string[] = [];

  constructor() {
    super();
    assert('`model` is required', !isNone(this.model));

    this.includeAhoy();
  }

  includeAhoy(this: AnExample) {
    if (!this.aCollection.includes('ahoy')) {
      this.set('aCollection', this.aCollection.concat('ahoy'));
    }
  }
}
```

There are three main things to note here.

First, check out the `session('service')` injection. We need the name of the service being injected for TypeScript to be able to resolve the type correctly (which it does by using "type registries," as discussed briefly [in this footnote][fn] in my series earlier this year). The alternative is writing `session: service() as Session`—a type cast—which is *fine* but isn't particularly idiomatic TypeScript.

[fn]: https://www.chriskrycho.com/2018/typing-your-ember-update-part-4.html#fn1

Second, notice that we do have to use a type cast, `as Person`, for the `savedUser` definition. While many computed property macros and the `computed` helper itself can properly infer the type of the resulting computed property, macros which accept nested keys do not and cannot. Thus, `bool` can resolve its type to a `boolean`, but `readOnly` or `alias` have to resolve their type as `any`. The value passed to them could be a strangely shaped string key on the local object (`['like.a.path']: true`) or an actual path through multiple objects. (This is the same limitation that means we cannot do nested `get` lookups.)

Third, as I noted even when we were doing this the *wrong* way, with class field assignment, we need to explicitly specify the type of `this` for callback passed in to define the computed properties. In the context of a `.extend()` invocation, though, this sometimes falls down. You'll see an error like this:

> 'AnExample' is referenced directly or indirectly in its own base expression.

This doesn't happen for *all* computed properties, but it happens often enough to be very annoying—and it *always* happens with Ember Concurrency tasks. (More on this [below](#ember-concurrency).) This problem was actually the original motivation for my experimentation with assigning computed properties to class fields.

This set of problems with defining computed properties and injections in an `.extend()` invocation is a major motivator for my team in eagerly adopting decorators.

## Decorators

The cleaner, but currently still experimental, way to do this is to use Ember Decorators.[^experimental] To use these, you should run `ember install ember-decorators` and then set the `experimentalDecorators` compiler option to `true` in your `tsconfig.json`.

[^experimental]: It's experimental because decorators are still only at Stage 2 in the <abbr>TC39</abbr> process. They *may* advance at this month's meeting.

Once you've installed the decorators package, you can update your component. In general, the imports match exactly to the Ember module imports, just with `@ember-decorators` as the top-level package rather than `@ember`. Here's how our component looks using decorators:

```typescript
import Component from '@ember/component';
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';

import { action, computed } from '@ember-decorators/object';
import { alias, bool } from '@ember-decorators/object/computed';
import { service } from '@ember-decorators/service';

import Session from 'my-app/services/session';
import Person from 'my-app/models/person';

export default class AnExample extends Component {
  // -- Component arguments -- //
  model!: Person;     // required
  modifier?: string;  // optional, thus the `?`

  // -- Injections -- //
  @service session: Session;

  // -- Class properties -- //
  aString = 'this is fine';
  aCollection: string[] = [];

  // -- Computed properties -- //
  // TS correctly infers computed property types when the callback has a
  // return type annotation.
  @computed('model.firstName')
  get fromModel(): string {
    return `My name is ${this.model.firstName}`;
  }

  @computed('aString')
  get aComputed(): number {
    return this.aString.length;
  }

  @bool('session.user') isLoggedIn: boolean;
  @alias('session.user') savedUser: Person;

  @action
  addToCollection(this: AnExample, value: string) {
    this.set('aCollection', this.aCollection.concat(value));
  }

  constructor() {
    super();
    assert('`model` is required', !isNone(this.model));

    this.includeAhoy();
  }

  includeAhoy(this: AnExample) {
    if (!this.aCollection.includes('ahoy')) {
      this.set('aCollection', this.aCollection.concat('ahoy'));
    }
  }
}
```

First, notice that using decorators switches us to using actual <abbr>ES5</abbr> getters. This is *exactly* the same thing that [<abbr>RFC</abbr> #0281][RFC-0281] specified, and which was implemented for Ember's traditional computed property and injection functions in Ember 3.1 to unlock . What's extra nice, though, is that decorators are backwards compatible [all the way to Ember 1.11][e-@-support]. (You won't get the <abbr>ES5</abbr> getters on versions prior to to Ember 3.1—there the decorators *just* install things on the prototype—but you will at least get the correct behavior.)

[e-@-support]: http://ember-decorators.github.io/ember-decorators/latest/docs/stability-and-support#ember-support

Second, note that we don't get type inference for the computed property macros like `@bool` here. That's because decorators are not currently allowed to modify the *type* of the thing they're decorating from TypeScript's perspective. Now, decorators can—and *do*!—modify the type of the thing they decorate at runtime; it's just that <abbr>TS</abbr> doesn't yet capture that. This means that *all* decorated fields will still require type annotations, not just a subset as in the `.extend()` world. It's annoying—especially in the case of things like `@bool`, where it *really* seems like we ought to be able to just tell TypeScript that this means the thing is a boolean rather than writing `@bool('dependentKey') someProp: boolean`.

This leads us to our final point to notice: we also need the type annotations for service (or controller) injections—but we do *not* need the string keys for them service injections.[^injection-keys] The net of this is that the injections themselves roughly equally ergonomic.[^imports]

```ts
// the old way
session: service('session'),
// the new way
@service session: Session;
```

[^injection-keys]: If you're using a non-default name, like `specialSession`, for the name of the property, the usual rules apply for injections. In that case, you'd write the injection like this:
    ```ts
    import Component from '@ember/component';
    import { service } from '@ember-decorators/service';
    import Session from 'my-app/services/session';

    export default class AnExample extends Component {
      @service('session') specialSession: Session;
    }
    ```

[^imports]: Files do get an extra import in the decorator version... but as it happens, I'm more than okay with that; I'd actually *prefer* explicit imports of dependencies personally.

## Ember Concurrency

One other thing I need to draw your attention to here: I and a few others have taken a stab at writing type definitions for [Ember Concurrency][ec]. Unfortunately, typings that *type-check* run smack dab into the fact that as of 3.1 that style doesn't *work*; and typings that *work* cannot be type-checked at present. You can't even use decorators to push your way to a solution. Nor is there a lot of hope on the horizon for this reality to change.

You can see some of the discussion as to *why* [starting here][pr] in one pull request for them; it all gets back to the limitation I mentioned above: TypeScript doesn't let you change the types of things with decorators. Unfortunately, there's no reason to believe that will change anytime soon. This is a *fundamental* conflict between the Ember Object model and modern JavaScript—and specifically TypeScript's understanding of it.

[ec]: http://ember-concurrency.com/docs/introduction/
[pr]: https://github.com/machty/ember-concurrency/pull/209#issuecomment-403246551

I am still mulling over solutions to that problem (as are others), and we'll be continuing to work on this idea in [#-topic-typescript][slack] in the Ember Community Slack (and publicizing any good ideas we come up with there in a searchable location, of course). For today, the best thing you can do is explicitly set the `this` type to `any` for the task property generator function callback, and use type casts internally if you look up services or other properties from the containing object.

[slack]: https://embercommunity.slack.com/messages/C2F8Q3SK1

## Summary: _mea culpa_

Sorry again to everyone I misled along the way with my earlier, very wrong advice! Hopefully this helps clear up the state of things and will help you keep from falling into this tar pit going forward!
