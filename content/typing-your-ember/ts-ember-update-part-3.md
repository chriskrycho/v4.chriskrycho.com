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

---

<i class='series-overview'>You write [Ember.js] apps. You think [TypeScript] would be helpful in building a more robust app as it increases in size or has more people working on it. But you have questions about how to make it work.</i>

[ember.js]: https://emberjs.com
[typescript]: http://www.typescriptlang.org

<i class='series-overview'>This is the series for you! I'll talk through everything: from the very basics of how to set up your Ember.js app to use TypeScript to how you can get the most out of TypeScript today---and I'll be pretty clear about the current tradeoffs and limitations, too.</i>

<i class='series-overview'>[(See the rest of the series. →)][series]</i>

[series]: /typing-your-ember.html

---

**Note:** if you're following along with this *as I publish it* in late January 2018, please go back and read the end of [Part 2][pt2], which I updated substantially yesterday evening to include more material I missed in the first version of that post, but which belonged there and not here.

In the previous posts in this series, I introduced the big picture of how the story around TypeScript and Ember.js has improved over the last several months and walked through some important background on class properties. In this post, I'll build on that foundation to look closely at computed properties, actions, and mixins.

<aside>

If you're interested in all of this and would like to learn more in person, I'm [leading a workshop on it at EmberConf 2018](http://emberconf.com/speakers.html#chris-krycho)---I'd love to see you there!

</aside>

Here's the outline of this update sequence:

1. [Overview, normal Ember objects, component arguments, and injections.][pt1]
2. [Class properties---some notes on how things differ from the `Ember.Object` world.][pt2]
3. [**Computed properties, actions, mixins, and class methods (this post).**][pt3]
4. Ember Data and related concerns.
5. Mixins and proxies; or: the really hard-to-type-check bits.

[pt1]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-1.html
[pt2]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-2.html
[pt3]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-3.html

## A detailed example (cont'd.) -- computed properties, mixins, actions, and class methods

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

### Computed properties

We already covered component arguments and injections as well as basic class properties and the exceptions to normal class-property ways of doing things, in Parts [1][pt2] and [2][pt2]. With that background out of the way, we can now turn to computed properties. I'm including the component arguments in this code sample because they're referenced in the computed property. Assume `Person` is a pretty "person" representation, with a `firstName` and a `lastName`and maybe a few other properties.

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

#### `computed` properties

When using a computed property in the brave new world of ES6 classes, we normally just assign them as instance properties. As mentioned in [the previous post][pt2], and in line with my comments above, this has some important tradeoffs around performance. If you need the absolute *best* performance, you can continue to install them on the prototype by doing this instead:

```typescript
export default class MyComponent extends Component.extend({
  fromModel: computed(
    'model.firstName',
    function(this: AnExample): string {
      return `My name is ${get(this.model, 'firstName')};`;
    }
  ),
}) {
  // other properties
}
```

Whichever way you do it, TypeScript will correctly infer the type of the computed property in question (here `fromModel`) as long as you explicitly annotate the return type of the callback passed to `computed`. Accordingly, in this case, the type of `fromModel` is `ComputedProperty<string>`. The fact that it's a `ComputedProperty` means if you try to treat it as a plain string, without using `Ember.get` to unwrap it, TypeScript will complain at you.[^getters]

```typescript
// type checking error:
this.fromModel.length;

// type checking valid:
this.get('fromModel').length;
```

[^getters]: As mentioned in [Part 2][pt2], this problem doesn't go away until we get decorators, unless you're putting them on the prototype via `.extends()`---but see below for the problems with *that*. The short version is, we need decorators for this to actually be *nice*. Once we get decorators, we will be able to combine them with the work done for [RFC #281] and normal lookup will just work:

    ```typescript
    @computed('model.firstName')
    get fromModel() {
      return `My name is ${this.model.firstName};`;
    }
    ```

[RFC #281]: https://github.com/emberjs/rfcs/pull/281

The other really important thing to note here is the use of `this: MyComputed`. By doing this, we're telling TypeScript explicitly that the type of `this` in this particular function is the class context. We have to do this here, because we don't have any way to tell the `computed` helper itself that the function inside it will be bound to the `this` context of the containing class. Put another way: we don't have any *other* way to tell TypeScript that one of the things `computed` does is bind `this` appropriately to the function passed into it; but gladly we do have *this* way---otherwise we'd be out of luck entirely! (You'll see the same thing below when we look at actions). The boilerplate is a bit annoying, admittedly---but it at least makes it type-check.

#### Computed property macros

Beyond `computed`, there are a lot of other computed property tools we use all the time. Some of them can (and therefore *do*) infer the type of the resulting computed property correctly. But there are a bunch of idiomatic things that TypeScript does not and cannot validate -- a number of the computed property macros are in this bucket, because they tend to be used for nested keys, and as noted above, TypeScript does not and *cannot* validate nested keys like that.

We have a representative of each of these scenarios:

```typescript
  isLoggedIn = bool('session.user');
  savedUser: Computed<Person> = alias('session.user');
```

In the case of `isLoggedIn`, the `bool` helper only ever returns a boolean, so the type of `isLoggedIn` is `ComputedProperty<boolean>`. In the case of `savedUser`, since TypeScript can't figure out what the nested key means, we have to specify it explicitly, using `Computed<Person>`.[^cp] In these cases, you have to do the work yourself to check that the type you specify is the *correct* type. If you write down the wrong type here, TypeScript will believe you (it doesn't have any other good option!) and you'll be back to things blowing up unexpectedly at runtime.

[^cp]: I've used `Computed<Person>` and similar throughout here because it's the most clear while still being reasonably concise. The actual type name in Ember's own code is `ComputedProperty`, but `ComputedProperty<Person>` is *long*, and it wouldn't have added any real clarity here. In my own codebase, we use `CP` (for "**C**omputed **P**roperty") for the sake of brevity---so here that would just be `CP<Person>`.

The typings supply the concrete (non-`any`) return type for: `and`, `bool`, `equal`, `empty`, `gt`, `gte`, `lt`, `lte`, `match`, `map`, `max`, `min`, `notEmpty`, `none`, `not`, `or`, and `sum`.

#### On nested keys

As noted above, TypeScript cannot do a lookup for any place using nested keys---which means that `this.get('some.nested.key')` won't type-check, sadly. This is an inherent limitation of the type system as it stands today, and for any future I can foresee. The problem is this: what exactly *is* `'some.nested.key'`? It *could* be what we use it for in the usual scenario in Ember, of course: a string representing a lookup on a property of a property of a property of whatever `this` is. But it could equally well be a key named `'some.nested.key'`. This is perfectly valid JavaScript, after all:

```javascript
const foo = {
  ['some.nested.key']: 'Well, this is weird, but it works',
};
```

TypeScript does not today and presumably *never will* be able to do that lookup. The workaround is to do one of two things:

1.  If you *know* you have a valid parent, you can do the (catastrophically ugly, but functional) nested `Ember.get` that now litters our codebase:

    ```typescript
    import { get } from '@ember/object';
    const value = get(get(get(anObject, 'some'), 'nested'), 'key');
    ```

    Yes, it's a nightmare. But... it type-checks, and it works well *enough* in the interim until we get a decorators-based solution that lets us leverage [RFC #281].

2.  Use the `// @ts-ignore` to simply ignore the type-unsafety of the lookup. This approach is preferable when you don't know if any of the keys might be missing. If, for example, either `some` or `nested` were `undefined` or `null`, the lookup example above in (1) would fail.

    ```typescript
    import { get } from '@ember/object';
    // @ts-ignore -- deep lookup with possibly missing parents
    const value = get(anObject, 'some.nested.key');
    ```

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

As with computed properties, we need the `this` type declaration to tell TypeScript that this method is going to be automatically bound to the class instance. Otherwise, TypeScript thinks the `this` here is the `actions` hash, rather than the `MyComponent` class.[^actions]

[^actions]: In the future, this problem will hopefully be solved neatly by decorators:

    ```typescript
      @action
      addToCollection(value: string) {
        const current = this.get('aCollection');
        this.set('aCollection', current.concat(value));
      }
    ```

    For today, however, specifying a `this` type is where it's at.

Happily, that's really all there is to it for actions: they're quite straightforward other than needing the `this` type specification.

### Types in `.extend({...})` blocks

By and large, you can get away with using the same `this: MyComponent` trick when hacking around prototypal extension problems, or performance problems, by putting computed properties in a `.extend({...}` block. However, you *will* sometimes see a type error indicating that the class is referenced in its own definition expression. In that case, you may need to judiciously apply `any`, if you can't make it work by using normal class properties.

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

For the most part, you can just switch to using normal ES6 class constructors instead of the Ember `init` method. You can, if you so desire, also move existing `init` functions passed to a `.extends({ ...})` hash to class methods, and they'll work once you change `this._super(...arguments)` to `super.init(...arguments)`. It's worth pausing to understand the relationship between `init` and prototypal `init` and the `constructor`. An `init` in the `.extends()` hash runs first, then an `init` method on the class, then the normal `constructor`.[^twiddle]

[^twiddle]: You can see this for yourself in [this Ember Twiddle][init]---just open your developer tools and note the sequence.

[init]: https://ember-twiddle.com/36844717dcc50d734139368edf2e87da

Note that you do not need to (and cannot) annotate the `constructor` with `this: MyComponent`. Depending on the class you're building, you may *occasionally* have type-checking problems that come up as a result of this. I've only ever seen that happen when using computed properties while defining a proxy,[^proxies] but it does come up. In that case, you can fall back to using `init` as a method, and set `this: MyComponent` on *it*, and things will generally fall out as working correctly at that point. When it comes up, this seems to be just a limitation of what `this` is understood to be in a `constructor` given Ember's rather more-complex-than-normal-classes view of what a given item being constructed is.

[^proxies]: Proxies, along with details of mixins, are a subject I'm leaving aside for Part 5, otherwise known as the "wow, this stuff is really weird to type" entry in the series.

Other class methods do also need the `this` type specified if they touch computed properties. (Normal property access is fine without it.) That's because the lookups for `ComputedProperty` instances (using `Ember.get` or `Ember.set`) need to know what `this` is where they should do the lookup, and the full `this` context isn't inferred correctly at present. You can either write that on every invocation of `get`and `set`, like `(this as MyComponent).get(...)`, or you can do it once at the start of the method. Again, a bit boiler-platey, but it gets the job done and once you're used to it it's minimal hassle.[^hassle]

[^hassle]: Not *no* hassle, though, and I look forward to a future where we can drop it, as Ember moves more and more toward modern JavaScript ways of solving these same problems!

One last note, which I didn't include in the example: if you have a function (usually an action) passed into the component, you can define it most simply by just using `onSomeAction: Function;` in the class definition, right with other class arguments. However, it's usually most helpful to define what the type should actually *be*, for your own sanity check if nothing else. As with e.g. `model` in this example, we don't actually have a good way to type-check that what is passed is correct. We can, however, at least verify in the constructor that the caller passed in a function using [`assert`], just as with other arguments.

[`assert`]: https://emberjs.com/api/ember/2.18/classes/@ember%2Fdebug/methods/assert?anchor=assert

## Summary

So that's a wrap on components (and controllers, which behave much the same way).

In the next post, I'll look at the elephant in the room: Ember Data (and closely related concern Ember CLI Mirage). While you *can* make Ember Data stuff largely work today, it's still a ways from _Just Works™️_, sadly, but we'll cover how to work around the missing pieces---we've gotten there in our own codebase, so you can, too!
