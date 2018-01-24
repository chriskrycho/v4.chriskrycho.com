---
Title: TypeScript and Ember.js Update, Part 3
Subtitle: >
    Computed properties and actions and mixins!
Date: 2018-01-24 07:00
Category: Tech
Series: Typing Your Ember
Tags: TypeScript, emberjs, typing-your-ember
slug: typing-your-ember-update-part-3
Summary: >
    Now that we know a bit more about how computed properties work, we’ll talk about computed properties, actions, and mixins.
Status: draft
---


### Computed properties

So now let's talk about computed properties in a bit more detail!

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

Here, for example, 

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

Note, however---and this is very important---that you cannot `.extend` an existing `class` implementation. As a result, deep inheritance hierarchies *may* make transitioning to classes in Ember painful. Most importantly: they may work some of the time in some ways, but will break when you least expect. So don't do that! (This isn't a TypeScript limitation; it's a limitation of classes in Ember today.)[^prototype]

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
