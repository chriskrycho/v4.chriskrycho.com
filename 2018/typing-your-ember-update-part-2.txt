---
Title: TypeScript and Ember.js Update, Part 2
Subtitle: >
    Class properties—some notes on how things differ from the <code>Ember.Object</code> world.
Date: 2018-01-24 07:00
Modified: 2018-07-10 20:00
Category: Tech
Series:
    Title: Typing Your Ember—Update
    Part: 2
Tags: [TypeScript, emberjs, typing-your-ember]
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

1. [Overview, normal Ember objects, component arguments, and injections.][pt1]
2. [**Class properties---some notes on how things differ from the `Ember.Object` world (this post).**][pt2]
3. [Computed properties, actions, mixins, and class methods.][pt3]
4. [Using Ember Data, and service and controller injections improvements.][pt4]
5. Mixins and proxies; or: the really hard-to-type-check bits.

[pt1]: https://v4.chriskrycho.com/2018/typing-your-ember-update-part-1.html
[pt2]: https://v4.chriskrycho.com/2018/typing-your-ember-update-part-2.html
[pt3]: https://v4.chriskrycho.com/2018/typing-your-ember-update-part-3.html
[pt4]: https://v4.chriskrycho.com/2018/typing-your-ember-update-part-4.html

## A detailed example (cont'd.) -- class properties

<aside>

***Note:** please see the [update about class properties published mid-2018][cp-update]. The example below and in the following posts is incorrect in several important ways.

[cp-update]: https://v4.chriskrycho.com/2018/ember-ts-class-properties.html

</aside>

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

Throughout, you'll note that we're using *assignment* to create these class properties---a big change from the key/value setup in the old `.extends({ ... })` model:

```typescript
  // -- Class properties -- //
  aString = 'this is fine';
  aCollection: string[] = [];
```

Class properties like this are *instance properties*. These are compiled to, because they are *equivalent to*, assigning a property in the constructor. That is, these two ways of writing class property initialization are equivalent---

At the property definition site:

```typescript
export default class AnExample extends Component {
  // snip...

  // -- Class properties -- //
  aString = 'this is fine';
  aCollection: string[] = [];

  // snip..

  constructor() {
    super();
    assert('`model` is required', !isNone(this.model));

    this.includeAhoy();
  }

  // snip...
}
```

In the constructor:

```typescript
export default class AnExample extends Component {
  // snip...

  // -- Class properties -- //
  aString: string;
  aCollection: string[];

  constructor() {
    super();

    this.aString = 'this is fine';
    this.aCollection = [];

    assert('`model` is required', !isNone(this.model));

    this.includeAhoy();
  }

  // snip...
}
```

You can see why the first one is preferable: if you don't need any input to the component to set the value, you can simply set the definition inline where the property is declared.

However, this is *quite* unlike using `.extend`, which installs the property on the prototype. Three very important differences from what you're used to fall out of this, and *none of them are specific to TypeScript.*[^babel]

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

Here, you can see that if something has *already set* the `aDefaultProp` value (before the class constructor is called), we'll use that value; otherwise, we'll use the default. You can think of this as being something like default arguments to a function. In our codebase, we have started using [`_.defaultTo`](https://lodash.com/docs/4.17.4#defaultTo), which works quite nicely. In the old world of declaring props with their values in the `.extends({ ... })` hash, we got this behavior "for free"---but without a lot of other benefits of classes, so not *actually* for free.

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

  itsLength = computed('aString', function(this: MyComponent): number {
    return this.aString.length;
  });
}
```

This *does* have a performance cost, which will be negligible in the ordinary case but pretty nasty if you're rendering hundreds to thousands of these items onto the page. You can use this workaround for these as well as for any other properties which need to be prototypal (more on *that* in the next post as well):[^getters]

```typescript
export default class MyComponent extends Component.extend({
  itsLength: computed('aString', function(this: MyComponent): number {
      return this.aString.length;
    }
  );
}) {
  aString = 'Hello, there!';
}
```

This *looks* really weird, but it works exactly as you'd expect.

[^getters]: Even when [Ember.js RFC #281][RFC #281] lands, this problem will not go away, at least under the current implementation, since [*these* will *not* be transformed into getters on the prototype][281-comment]. We are waiting for decorators to solve this problem completely.

[RFC #281]: https://github.com/emberjs/rfcs/pull/281
[281-comment]: https://github.com/emberjs/rfcs/pull/281#issuecomment-360023258

## Class property variants

There are two times when things will look different from basic class properties. Both have to do with setting up the prototype to work the way other parts of the Ember object ecosystem expect.

### Variant 1: Prototypal/merged properties

The first is when you're using properties that need to be merged with properties in the prototype chain, e.g. `attributeBindings` or `classNameBindings`, or which (because of details of how components are constructed) have to be set on the prototype rather than as instance properties, e.g. `tagClass`.

For those, we can just leverage `.extend` in conjunction with classes:

```typescript
import Component from '@ember/component';

export default class MyListItem extends Component.extend({
  tagName: 'li',
  classNameBindings: ['itemClass']
}) {
  itemClass = 'this-be-a-list';

  // etc.
}
```

This is also how you'll *use* mixins (on defining them, see below):

```typescript
import Component from '@ember/component';
import MyMixin from 'my-app/mixins/my-mixin';

export default class AnExample extends Component.extend(MyMixin) {
  // the rest of the definition.
}
```

Note, however---and this is very important---that you cannot `.extend` an existing `class` implementation. As a result, deep inheritance hierarchies *may* make transitioning to classes in Ember painful. Most importantly: they may work *some* of the time in *some* ways, but will break when you least expect. So don't do that! (This isn't a TypeScript limitation; it's a limitation of classes in Ember today.)[^prototype]

[^prototype]: In the future, we'll (hopefully and presumably 🤞🏼) have an escape hatch for those merged or prototypally-set properties via decorators. That'll look something like this:

    ```typescript
    import Component from '@ember/component';
    import { className, tagName } from 'ember-decorators/component';

    @tagName("li")
    export default class MyListItem extends Component {
      @className itemClass = 'this-be-a-list';

      @action
      sendAMessage(contents: string): void {

      }
      // etc.
    }
    ```

### Variant 2: Mixins

The other time you'll have to take a different tack---and this falls directly out of the need for prototypal merging---is with `Mixin`s, which don't yet work properly with classes. Worse, it's difficult (if not impossible) to get rigorous type-checking internally in `Mixin` definitions, because you cannot define them as classes: you *have* to use the old style throughout, because mixins are created with `.create()`, not `.extend()`.

<aside>

Note that if you're writing *new* code in Ember.js---using TypeScript or not---I strongly encourage you to simply avoid using mixins at all. Instead, use services (or, occasionally, inheritance). This will require you to change how you write some of your code, but in my experience that change will make your codebase much easier to understand, and therefore much easier to maintain.

</aside>

I'll have a lot more to say about these in part 5 of this series, including a detailed example of how to carefully type-annotate one and use it in another class. For now, suffice it to say that you'll still need to incorporate `Mixin`s via `.extend()`:

```typescript
import Component from '@ember/component';
import MyMixin from 'my-app/mixins/my-mixin';

export default class SomeNewComponent extends Component.extend(MyMixin) {
  // normal class properties
}
```

## Summary

Those are the *biggest* differences from `Ember.Object` that you need to be aware of when working with class properties in Ember.js today, at least in my experience working with them day to day. These are not the only differences with *classes*, though, especially when dealing with TypeScript, so in my next entry we'll take a look at how classes work (and work well!) with most things in Ember.js and TypeScript together.
