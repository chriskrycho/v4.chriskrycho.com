---
Title: TypeScript and Ember.js Update, Part 2
Subtitle: >
    Class properties—some notes on how things differ from the <code>Ember.Object</code> world.
Date: 2018-01-23 21:25
Category: Tech
Series: Typing Your Ember
Tags: TypeScript, emberjs, typing-your-ember
slug: typing-your-ember-update-part-2
Summary: >
    For years, you've been using Ember Object and .extend()—but the rules are different with classes.

---

<i class='series-overview'>You write [Ember.js] apps. You think [TypeScript] would be helpful in building a more robust app as it increases in size or has more people working on it. But you have questions about how to make it work.</i>

[ember.js]: https://emberjs.com
[typescript]: http://www.typescriptlang.org

<i class='series-overview'>This is the series for you! I'll talk through everything: from the very basics of how to set up your Ember.js app to use TypeScript to how you can get the most out of TypeScript today---and I'll be pretty clear about the current tradeoffs and limitations, too.</i>

<i class='series-overview'>[(See the rest of the series. →)][series]</i>

[series]: /typing-your-ember.html

---

In the previous post in this series, I introduced the big picture of how the story around TypeScript and Ember.js has improved over the last several months. In this post, I'll be pausing from TypeScript-specific to take a look at how things work with *class properties*, since they have some big implications for how we work, which then have ripple effects on computed properties, actions, etc.

<aside>

If you're interested in all of this and would like to learn more in person, I'm [leading a workshop on it at EmberConf 2018](http://emberconf.com/speakers.html#chris-krycho)---I'd love to see you there!

</aside>

Here's the outline of this update sequence:

1. [Overview, normal Ember objects, component arguments, and injections.](http://www.chriskrycho.com/2018/typing-your-ember-update-part-1.html)
2. [Class properties---some notes on how things differ from the `Ember.Object` world (this post).](http://www.chriskrycho.com/2018/typing-your-ember-update-part-2.html)
3. Computed properties and actions and mixins.
4. Ember Data and related concerns.

## A detailed example (cont'd.) -- class properties

Let's start by recalling the example Component we're working through:

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
  model: Person; // required
  modifier?: string; // optional, thus the `?`

  // -- Injections -- //
  session: Computed<Session> = service();

  // -- Class properties -- //
  aString = 'this is fine';
  aCollection: string[] = [];

  // -- Computed properties -- //
  // TS correctly infers computed property types when the callback has a
  // return type annotation.
  fromModel = computed('model.firstName', function(this: AnExample): string {
    return `My name is ${get(this.model, 'firstName')};`;
  });
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

Throughout, you'll note that we're using *assignment* to create these class properties---a big change from the key/value setup in the old `.extends({ ... })` model:

```typescript
// -- Class properties -- //
aString = 'this is fine';
aCollection: string[] = [];
```

Class properties like this are *instance properties*. These are compiled to, because they are *equivalent to*, assigning a property in the constructor. That is, these are equivalent:

```typescript
// class property assignment
class AnyClass {
  aClassProperty = 'yay';
  constructor() {
    console.log('all done constructing');
  }
}
```

```typescript
// constructor assignment
class AnyClass {
  aClassProperty: string;
  constructor() {
    this.aClassProperty = 'yay';
    console.log('all done constructing');
  }
}
```

This is *quite* unlike using `.extend`, which installs the property on the prototype. Three very important differences from what you're used to fall out of this, and *none of them are specific to TypeScript.*[^babel]

[^babel]: You can use this same feature on classes using Babel, with the [class properties transform][b-cp].

[b-cp]: https://babeljs.io/docs/plugins/transform-class-properties/

### 1. Default values

Since class property setup runs during the constructor, if you want the caller to be able to override it, you *must* give it an explicit fallback that references what's passed into the function. Something like this:

```typescript
class AnyClass {
  aDefaultProp = this.aDefaultProp || 0;
}
```

Again, translated back into the constructor form:

```typescript
class AnyClass {
  constructor() {
    this.aDefaultProp = this.aDefaultProp || 0;
  }
}
```

Here, you can see that if something has *already set* the `aDefaultProp` value (before the class constructor is called), we'll use that value; otherwise, we'll use the default. (You can think of this as being something like default arguments to a function.)

In our codebase, we have started using [`_.defaultTo`](https://lodash.com/docs/4.17.4#defaultTo), which works quite nicely.

### 2. No more shared state

Because these are instance properties, *not* assigned on the prototype, you do not have to worry about the problem---[well-known among experienced Ember.js developers, but prone to bite people new to the framework][prototype-instances]---where you assign an array or object in the `.extend()` method and then find that it's shared between instances.

[prototype-instances]: https://dockyard.com/blog/2014/04/17/ember-object-self-troll

```typescript
export default Component.extend({
  anArray: [],  // <- this *will* be shared between instances
});
```

We've long had to handle this by setting up those properties in our `init()` method instead, so that they are created during object instantiation, rather than on the prototype. This problem goes away entirely with classes, including in TypeScript.

```typescript
export default class MyComponent extends Component {
  anArray = [];  // <- this will *not* be shared between instances
}
```

(Note that here, we don't have a type for the array, so it's of type `any[]`; we *always* need type annotations for empty arrays if we want them to be a "narrower," or more specific, type than that.)

### 3. Performance changes

The flip-side of this is that the only way we currently have to create computed property instances (until decorators stabilize) is *also* as instance, not prototype, properties. I'll look at computed properties (and their types) in more detail in the next post, so here mostly just note how the computed is set up on the class: by assignment, *not* as a prototypal property.

```typescript
export default class MyComponent extends Component {
  aString = 'Hello, there!';

  itsLength: Computed<number> = computed(
    'aString',
    function(this: MyComponent) {
      return this.aString.length;
    }
  );
}
```

This *does* have a performance cost, which will be negligible in the ordinary case but pretty nasty if you're rendering hundreds to thousands of these items onto the page. You can use this workaround for these as well as for any other properties which need to be prototypal (more on *that* in the next post as well):

```typescript
export default class MyComponent extends Component.extend({
  itsLength: Computed<number> = computed(
    'aString',
    function(this: MyComponent) {
      return this.aString.length;
    }
  );
}) {
  aString = 'Hello, there!';
}
```

This *looks* really weird, but it works exactly as you'd expect.

[^getters]: Even when [Ember.js RFC #281][281] lands, this problem will not go away, at least under the current implementation, since *these* will *not* be transformed into getters on the prototype. We may be stuck waiting for decorators to solve this problem completely.

[281]: https://github.com/emberjs/rfcs/pull/281

## Summary

Those are the *biggest* differences from `Ember.Object` that you need to be aware of when working with class properties in Ember.js today, at least in my experience working with them day to day. These are not the only differences with *classes*, though, especially when dealing with TypeScript, so in my next entry we'll take a look at how classes work (and work well!) with most things in Ember.js and TypeScript together.
