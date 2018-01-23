---
Title: TypeScript and Ember.js Update, Part 2
Subtitle: TODO
Date: 2018-01-24 07:00
Category: Tech
Series: Typing Your Ember
Tags: TypeScript, emberjs, typing-your-ember
slug: typing-your-ember-update-part-2
Summary: >
    TODO
Status: draft
---

<i class='series-overview'>You write [Ember.js] apps. You think [TypeScript] would be helpful in building a more robust app as it increases in size or has more people working on it. But you have questions about how to make it work.</i>

[ember.js]: https://emberjs.com
[typescript]: http://www.typescriptlang.org

<i class='series-overview'>This is the series for you! I'll talk through everything: from the very basics of how to set up your Ember.js app to use TypeScript to how you can get the most out of TypeScript today---and I'll be pretty clear about the current tradeoffs and limitations, too.</i>

<i class='series-overview'>[(See the rest of the series. →)][series]</i>

[series]: /typing-your-ember.html

---

<!-- TODO: previous post and what it covered -->

<aside>

If you're interested in all of this and would like to learn more in person, I'm [leading a workshop on it at EmberConf 2018](http://emberconf.com/speakers.html#chris-krycho)---I'd love to see you there!

</aside>

Here's the outline of this update sequence:

1. [Overview, normal Ember objects, component arguments, and injections.](http://www.chriskrycho.com/2018/typing-your-ember-update-part-1)
2. [Class properties, including computed properties, as well as mixins (this post).](http://www.chriskrycho.com/2018/typing-your-ember-update-part-2)
3. Ember Data and related concerns.

## A detailed example (cont'd.)

Let's recall the example Component we're working through:

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

### Class properties

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

This is *quite* unlike using `.extend`, which installs the property on the prototype. Three very significant differences fall out of this.

1. Since this runs during the constructor, if you make an assignment like this, but want the caller to be able to override it, you *must* write it out with an explicit fallback.

   ```typescript
   export default class MyComponent extends Component {
     aDefaultProp = this.aDefaultProp || 0;
   }
   ```

   (In our codebase, we have started using [`_.defaultTo`](https://lodash.com/docs/4.17.4#defaultTo), which works quite nicely.)

2. Because these are instance properties, *not* assigned on the prototype, you do not have to worry about the problem---[well-known among experienced Ember.js developers, but prone to bite people new to the framework][prototype-instances]---where you assign an array or object in the `.extend()` method and then find that it's shared between instances.

   ```typescript
   export default Component.extend({
     anArray: [] // <- this will be shared between instances
   });
   ```

   We've long had to

   ```typescript
   export default class MyComponent extends Component {
     anArray = []; // <- this will *not* be shared between instances
   }
   ```

3. The flip-side of this is that the only way we currently have to create computed property instances (until decorators stabilize) is *also* as instance, not prototype, properties. (I'll look at computed properties in more detail just below, so here mostly just note how the computed is set up on the class: by assignment.)

   ```typescript
   export default class MyComponent extends Component {
     aString = 'Hello, there!';
     itsLength: Computed<number> = computed('aString', function(
       this: MyComponent
     ) {
       return this.aString.length;
     });
   }
   ```

   This *does* have a performance cost, which will be negligible in the ordinary case but pretty nasty if you're rendering hundreds to thousands of these items onto the page. Again, when decorators land this won't be a problem; in the meantime, you can use the same workaround as for other properties which need to be prototypal:

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

[prototype-instances]: https://dockyard.com/blog/2014/04/17/ember-object-self-troll

### Computed properties

So now let's talk about computed properties in a bit more detail!

```typescript
  // -- Component arguments -- //
  model: Person;      // required
  modifier?: string;  // optional, thus the `?`

  // -- Computed properties -- //
  // TS correctly infers computed property types when the callback has a
  // return type annotation.
  fromModel = computed('model.firstName', function(this: AnExample): string {
    return `My name is ${get(this.model, 'firstName')};`;
  })
  aComputed = computed('aString', function(this: AnExample): number {
    return this.lookAString.length;
  });
  isLoggedIn = bool('session.user');
  savedUser: Computed<Person> = alias('session.user');
```

But some things, TypeScript does not and cannot validate -- a number of the computed property macros are in this bucket, because they tend to be used for nested keys, and as noted above, TypeScript does not and *cannot* validate nested keys like that.

#### Variants

There are two times when things will look different.

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

Note, however---and this is very important---that you cannot `.extend` an existing `class` implementation. As a result, deep inheritance hierarchies *may* make transitioning to classes in Ember painful. Most importantly: they may work some of the time in some ways, but will break when you least expect. So don't do that! (This isn't a TypeScript limitation; it's a limitation of classes in Ember today.)

In the future, we'll (hopefully and presumably 🤞🏼) have an escape hatch for those merged or prototypally-set properties via decorators. That'll look something like this:

```typescript
// FUTURE, NOT TODAY

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

#### Mixins

The other time you'll have to take a different tack is with types which don't yet work properly with classes. The most common of these are `Mixin`s and Ember Data objects. For `Mixin`s, sadly, it's difficult (if not impossible) to get rigorous type-checking in their definitions. However, you can add appropriate type definitions to them and those will be picked up in `class`es which consume them.

<aside>

Note that if you're writing *new* code in Ember.js---using TypeScript or not---I strongly encourage you to simply avoid using mixins at all. Instead, use services. This will require you to change how you write some of your code, but in my experience that change will make your codebase much easier to understand, and therefore much easier to maintain.

</aside>

### Actions

What about actions? As usual, these just become class instance properties in the current scheme.

```typescript
  actions = {
    addToCollection(this: AnExample, value: string) {
      const current = this.get('aCollection');
      this.set('aCollection', current.concat(value));
    }
  };
```

### `constructor` and class methods

ES6 class constructors and class methods both work as you'd expect, though as we'll see you'll need an extra bit of boilerplate for methods, at least for now.

```typescript
  constructor() {
    super();
    assert('`model` is required', !isNone(this.model));

    this.includeAhoy();
  }

  includeAhoy(this: AnExample): void {
    if (!this.get('aCollection').includes('ahoy')) {
      this.set('aCollection', current.concat('ahoy'));
    }
  }
```

For the most part, you can just switch to using normal ES6 class constructors instead of the Ember `init` method. You can, if you so desire, also convert existing instances of `init` to class methods, and they'll work once you change `this._super(...arguments)` to `super.init(...arguments)`. It's worth pausing to understand the relationship between `init` and prototypal `init` and the `constructor`. An `init` in the `.extends()` hash runs first, then an `init` method on the class, then the normal `constructor`.

(You can see this for yourself in [this Ember Twiddle][init]---just open your developer tools and note the sequence.)

[init]: https://ember-twiddle.com/36844717dcc50d734139368edf2e87da

<!-- TODO: regular class methods and `this: TheThing` -->

## Summary

So that's a wrap on components (and controllers, which behave much the same way).

In the next post, I'll look at the elephant in the room: Ember Data. While you *can* make Ember Data stuff largely work today, it's still a ways from *Just Works™️_, sadly, and 
