---
Title: TypeScript and Ember.js Update, Part 3
Subtitle: >
    Computed properties, actions, mixins, and class methods.
Date: 2018-01-25 07:00
Category: Tech
Series: Typing Your Ember
Tags: TypeScript, emberjs, typing-your-ember
slug: typing-your-ember-update-part-3
Summary: >
    Now that we know a bit more about how computed properties work, we’ll talk about computed properties, actions, and mixins on the Ember.js side, along with the normal class methods.
Status: draft
---

<i class='series-overview'>You write [Ember.js] apps. You think [TypeScript] would be helpful in building a more robust app as it increases in size or has more people working on it. But you have questions about how to make it work.</i>

[ember.js]: https://emberjs.com
[typescript]: http://www.typescriptlang.org

<i class='series-overview'>This is the series for you! I'll talk through everything: from the very basics of how to set up your Ember.js app to use TypeScript to how you can get the most out of TypeScript today---and I'll be pretty clear about the current tradeoffs and limitations, too.</i>

<i class='series-overview'>[(See the rest of the series. →)][series]</i>

[series]: /typing-your-ember.html

---

In the previous posts in this series, I introduced the big picture of how the story around TypeScript and Ember.js has improved over the last several months and walked through some important background on class properties. In this post, I'll build on that foundation to look closely at computed properties, actions, and mixins.

<aside>

If you're interested in all of this and would like to learn more in person, I'm [leading a workshop on it at EmberConf 2018](http://emberconf.com/speakers.html#chris-krycho)---I'd love to see you there!

</aside>

Here's the outline of this update sequence:

1. [Overview, normal Ember objects, component arguments, and injections.](http://www.chriskrycho.com/2018/typing-your-ember-update-part-1.html)
2. [Class properties---some notes on how things differ from the `Ember.Object` world.](http://www.chriskrycho.com/2018/typing-your-ember-update-part-2.html)
3. [Computed properties, actions, mixins, and class methods. (this post)](http://www.chriskrycho.com/2018/typing-your-ember-update-part-3.html)
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

We already covered component arguments and injections as well as basic class properties. Now let's look at the special cases of computed properties, actions, and mixins, before turning our attention

### Computed properties

So now let's talk about computed properties in a bit more detail! I'm including the component arguments

```typescript
  // -- Component arguments -- //
  model: Person;      // required
  modifier?: string;  // optional, thus the `?`

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
```

<!-- TODO: describe `this` -->
<!-- TODO: describe types -->

But some things, TypeScript does not and cannot validate -- a number of the computed property macros are in this bucket, because they tend to be used for nested keys, and as noted above, TypeScript does not and *cannot* validate nested keys like that.

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

As with computed properties, we need the `this` type declaration to tell TypeScript that this method is going to be automatically bound to the class instance. Otherwise, TypeScript thinks the this is the `actions` hash.[^actions]

[^actions]: In the future, this problem will hopefully be solved neatly by decorators:

    ```typescript
      @action
      addToCollection(value: string) {
        const current = this.get('aCollection');
        this.set('aCollection', current.concat(value));
      }
    ```
    
    For today, however, specifying a `this` type is where it's at.


### Class property variants

There are two times when things will look different from basic class properties. Both have to do with setting up the prototype to work the way other parts of the Ember object ecosystem expect.

#### Prototypal/merged properties

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

#### Mixins

The other time you'll have to take a different tack is with types which don't yet work properly with classes. The most common of these are `Mixin`s and Ember Data objects. For `Mixin`s, sadly, it's difficult (if not impossible) to get rigorous type-checking in their definitions. However, you can add appropriate type definitions to them and those will be picked up in `class`es which consume them.

<aside>

Note that if you're writing *new* code in Ember.js---using TypeScript or not---I strongly encourage you to simply avoid using mixins at all. Instead, use services. This will require you to change how you write some of your code, but in my experience that change will make your codebase much easier to understand, and therefore much easier to maintain.

</aside>

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
