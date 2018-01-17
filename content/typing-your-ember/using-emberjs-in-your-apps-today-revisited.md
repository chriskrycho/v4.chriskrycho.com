---
Title: Using Ember.js in your Apps Today, Revisited
Subtitle: How do things look in early 2018? Pretty good, actually!
Date: 2018-01-12 08:00
Category: Tech
Series: Typing Your Ember
Tags: TypeScript, emberjs, typing-your-ember
slug: typing-your-ember-using-today-redux
Summary: >
    TODO
Status: draft

---

<i class='series-overview'>You write [Ember.js] apps. You think [TypeScript] would be helpful in building a more robust app as it increases in size or has more people working on it. But you have questions about how to make it work.</i>

[Ember.js]: https://emberjs.com
[TypeScript]: http://www.typescriptlang.org

<i class='series-overview'>This is the series for you! I'll talk through everything: from the very basics of how to set up your Ember.js app to use TypeScript to how you can get the most out of TypeScript today---and I'll be pretty clear about the current tradeoffs and limitations, too.</i>

<i class='series-overview'>[(See the rest of the series. →)][series]</i>

[series]: /typing-your-ember.html

---

Back in July 2017, I wrote [a post](http://www.chriskrycho.com/2017/typing-your-ember-part-3.html) on how to using TypeScript in your Ember.js apps. At the time, we were still busy working on getting the typings more solid for Ember itself, and `class` syntax for Ember was a long way away.

Things have gotten quite a bit better since then, so I thought I'd update that post with recommendations for using TypeScript in an app *now* with the updated typings, as well as with another six months of experience using TypeScript in our app at Olo (~20k lines of code in the app and another ~15k in tests).

<aside>

If you're interested in all of this and would like to learn more in person, I'm [leading a workshop on it at EmberConf 2018](http://emberconf.com/speakers.html#chris-krycho)---I'd love to see you there!

</aside>

## Normal Ember objects

For normal Ember objects, things now *mostly* just work if you're using class-based syntax, with a single (though very important) qualification I'll get to in a minute. And you can use the class-based syntax *today* in Ember.js---all the way back to 1.13, as it turns out. If you want to learn more, you can read [this RFC] or [this blog post], both by [\@pzuraq (Chris Garrett)][pzuraq], who did most of the legwork to research this and flesh out the constraints, and who has also been doing a lot of work on [Ember Decorators].

[this RFC]: https://github.com/emberjs/rfcs/blob/master/text/0240-es-classes.md
[this blog post]: https://medium.com/build-addepar/es-classes-in-ember-js-63e948e9d78e
[pzuraq]: https://github.com/pzuraq
[Ember Decorators]: https://ember-decorators.github.io/ember-decorators/docs/index.html

A few quick notes before I dig into some specific examples

1. <!-- `class` vs. using variables and "Cannot use 'new' with an expression whose type lacks a call or construct signature." -->
2. <!-- -->

### A detailed example

That means that every new bit of code I write today in our app looks roughly like this, with only the obvious modifications for services, routes, and controllers---I picked components because they're far and away the most common things in our applications.

In order to explain all this clearly, I'm going to first show the whole component, then zoom in on and explain specific parts of it.

```typescript
import Component from '@ember/component';
import { computed, get } from '@ember/object';
import Computed from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';

import Session from 'my-app/services/session'
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
  fromModel = computed('model.firstName', function(this: AnExample): string {
    return `My name is ${get(this.model, 'firstName')};`;
  })
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

#### Component arguments

```typescript
export default class AnExample extends Component {
  // Component arguments
  model: Person;      // required
  modifier?: string;  // optional, thus the `?`
```

I always put these first so that the "interface" of the object is clear and obvious. You can do the same thing on a controller instance; in that case you would export a `Model` from the corresponding `Route` class and import it into the `Controller`. It's a bit of boilerplate, to be sure, but it lets you communicate your interface clearly to consumers of the `Component` or `Controller`.

An important note about these kind of arguments: you do *not* have to do `this.get(...)` (or, if you prefer, `get(this, ...)`) to access the properties themselves: they're class instance properties. You can simply access them as normal properties: `this.model`, `this.modifier`, etc. That even goes for referencing them as computed properties, as we'll see below.

#### Injections

```typescript
  // -- Injections -- //
  session: Computed<Session> = service();
```

Here, the most important thing to note is the required type annotation. In principle, we could work around this by requiring you to explicitly name the service and using a "type registry" to look up what the service type is -- more on that below in my discussion of using Ember Data -- but I'm not yet persuaded that's better than just writing the appropriate type annotation. Either way, there's some duplication. 🤔 We (everyone working in the [typed-ember](https://github.com/typed-ember) project) would welcome feedback here, because the one thing we *can't* do is get the proper type *without* one or the other of these.

```typescript
  // the current approach -- requires importing `Session` so you can define it
  // on the property here
  session: Computed<Session> = service();
  
  // the alternative approach I've considered -- requires writing boilerplate
  // elsewhere, similar to what you'll see below in the Ember Data section
  session = service('session');
```

One other thing to notice here is that because TypeScript is a *structural* type system, it doesn't matter if what is injected is the actual `Session` service; it just needs to be something that *matches the shape* of the service -- so your normal behavior around dependency injection, etc. is all still as expected.

#### Class properties

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

This is *quite* unlike using `.extend`, which installs the property on the prototype. Two very significant differences fall out of this.

1. Since this runs during the constructor, if you make an assignment like this, but want the caller to be able to override it, you *must* write it out with an explicit fallback.

    ```typescript
    export default class MyComponent extends Component {
      aDefaultProp = this.aDefaultProp || 0;
    }
    ```
    
    (In our codebase, we have started using [`_.defaultTo`](https://lodash.com/docs/4.17.4#defaultTo), which works quite nicely.)

2. Because these are instance properties, *not* assigned on the prototype, you do not have to worry about 
    
    ```typescript
    export default Component.extend({
      anArray: [],  // <- this will be shared between instances
    })
    ```
    ```typescript
    export default class extends Component {
      anArray = [];  // <- this will *not* be shared between instances
    }
    ```
<!-- TODO: explain consequence of that for the `[]` type -->

#### Computed properties

```typescript
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

##### Variants

There are two times when things will look different.

The first is when you're using properties that need to be merged with properties in the prototype chain, e.g. `attributeBindings` or `classNameBindings`, or which (because of details of how components are constructed) have to be set on the prototype rather than as instance properties, e.g. `tagClass`.

For those, we can just leverage `.extend` in conjunction with classes:

```typescript
import Component from '@ember/component';

export default class MyListItem extends Component.extend({
  tagName: 'li',
  classNameBindings: ['itemClass'],
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

Note, however---and this is very important---that you cannot `.extend` an existing `class` implementation. As a result, deep inheritance hierarchies *may* make transitioning to classes in Ember painful. (This isn't a TypeScript limitation; it's a limitation of classes in Ember today.)

In the future, we'll (hopefully and presumably) have an escape hatch for those merged or prototypally-set properties via decorators. That'll look something like this:

```typescript
import Component from '@ember/component';
import { className, tagName } from 'ember-decorators/component';

@tagName('li')
export default class MyListItem extends Component {
  @className itemClass = 'this-be-a-list';
  
  // etc.
}
```

The other time you'll have to take a different tack is with types which don't yet work properly with classes. The most common of these are `Mixin`s and Ember Data objects. For `Mixin`s, sadly, it's difficult (if not impossible) to get rigorous type-checking in their definitions. However, you can add appropriate type definitions to them and those will be picked up in `class`es which consume them.

<aside>

Note that if you're writing *new* code in Ember.js---using TypeScript or not---I strongly encourage you to simply avoid using mixins at all. Instead, use services. This will require you to change how you write some of your code, but in my experience it also makes for a much more maintainable and easier-to-understand (and therefore easier-to-maintain) codebase.

</aside>

## Ember Data

There are two challenges to using Ember Data effectively with TypeScript today.

1. Ember Data, for reasons I haven't yet dug into myself, does not play nicely with ES6 classes. However, we *want* named class exports for the sake of being able to use them 

++TODO++

We also have some ideas and prototypes for how to make the experience of both of these much, *much* better. Sometime soon-ish---hopefully before EmberConf, where I'd really like to *not* have to mess with teaching the complicated ways above to make things work!---we should land a solution that means you can drop the type coercions and just do a lookup like you would normally, and it will Just Work™️.[^registries]

[^registries]: If you're curious about the mechanics, we're basically setting up a "type registry" which maps the string keys to the correct model, so that the type of e.g. `store.createRecord('some-model', { ... })` will do a lookup in an interface which defines a mapping from model name, i.e. `some-model` here, to the model type, e.g. `export default class SomeModel extends DS.Model.extend({ ... }) {}`;

Note for Ember CLI Mirage users: most of what I've said here is equally applicable and nearly identical for Mirage. I'm currently working on solid typings for Mirage that get us everything we need that way.
