---
Title: Ember.js, TypeScript, and Class Properties
Subtitle: An important set of corrections about the behavior of class properties in Ember.js.
Date: 2018-07-06 17:00
Category: Tech
Series: Typing Your Ember
Tags: TypeScript, emberjs, typing-your-ember
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

The problem here is all the computed property assignments and the actions hash assignments. The fact that this sample code ever worked at all was... an accident. It wasn't *supposed* to work. I [noted at the time][cps] that this way of doing things had a performance tradeoff because computed properties ended up installed on every *instance* rather than on the *prototype*... and as it turns out, that was never intended to work. Only the prototype installation was supposed to work. And as it turns out, the [<abbr>ES5</abbr> getters implementation of computed properties][getters] which landed in Ember 3.1 broke every computed property set up this way.

[cps]: https://www.chriskrycho.com/2018/typing-your-ember-update-part-3.html#computed-properties
[getters]: TODO/rfc

So if you can't use class properties for this... how *do* you do it? There are two ways: the `.extend` hack I mentioned [previously][cp-details], and [decorators][e-@]. (The Ember Decorators docs include a discussion of this topic as well—see [their discussion of class fields][e-@/classes].)

[cp-details]: https://www.chriskrycho.com/2018/typing-your-ember-update-part-3.html#computed-properties-1
[e-@]: http://ember-decorators.github.io/ember-decorators/latest/
[e-@/classes]: http://ember-decorators.github.io/ember-decorators/latest/docs/class-fields

Note that throughout I'm assuming Ember 3.1+ and therefore <abbr>ES5</abbr> getter syntax (`this.property` instead of `this.get('property')`).

## `.extend`

The first workaround uses `.extend` in conjunction with a class definition. I originally wrote about this approach:

> If you need the absolute best performance, you can continue to install them on the prototype by doing this instead...

As it turns out, it's more like "If you want your app to work at all..."

Here's how that would look with our full example from above. Note that there are three things which *must* go in the `.extend` block with this approach: injections, computed properties, and the `actions` hash.

```typescript
import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';

import Session from 'my-app/services/session';
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
    if (!this.get('aCollection').includes('ahoy')) {
      this.set('aCollection', current.concat('ahoy'));
    }
  }
}
```

The main things to note here are:

- TODO: `session('service')`
- TODO: `this: AnExample`
- TODO: `as Person` (`alias` vs. `bool`)

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
    if (!this.get('aCollection').includes('ahoy')) {
      this.set('aCollection', current.concat('ahoy'));
    }
  }
}
```

Things to notice here:

- TODO: required type annotations but no string
- TODO: 