---
Title: TypeScript and Ember.js Update, Part 4
Subtitle: TODO
Date: 2018-01-25 07:00
Category: Tech
Series: Typing Your Ember
Tags: TypeScript, emberjs, typing-your-ember
slug: typing-your-ember-update-part-4
Summary: >
    TODO
Status: draft
---

<!-- TODO: previous posts and what they covered -->

<aside>

If you're interested in all of this and would like to learn more in person, I'm [leading a workshop on it at EmberConf 2018](http://emberconf.com/speakers.html#chris-krycho)---I'd love to see you there!

</aside>

Here's the outline of this update sequence:

1. [Overview, normal Ember objects, component arguments, and injections.][pt1]
2. [Class properties---some notes on how things differ from the `Ember.Object` world.][pt2]
3. [Computed properties, actions, mixins, and class methods.][pt3]
4. [**Ember Data and related concerns (this post).**][pt4]
5. Mixins and proxies; or: the really hard-to-type-check bits.

[pt1]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-1.html
[pt2]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-2.html
[pt3]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-3.html
[pt4]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-4.html

## Ember Data

There remains one significant challenges to using Ember Data effectively with TypeScript today: Ember Data, for reasons I haven't yet dug into myself, does not play nicely with ES6 classes. However, we *need* named class exports for the sake of being able to use them as types elsewhere in our programs. The hack to work around this is much the same as anywhere else we need named exports but have to get things back into the prototype:

```ts
import DS from 'ember-data'

export default class Person extends DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
}) {}
```

You can still define other items of the class normally, but attributes have to be prototypally bound or *you will have problems*. Note that this only applies (as far as I can tell) to Ember Data `Model`s specifically---`Adapter` and `Serializer` classes work just fine.

The other problem we've historically had was dealing with lookups—the situation was similar to that I described in [Part 3][pt3] for service injection. However, as of *this week*, we're landing a solution that means you can drop the type coercions and just do a lookup like you would normally, and it will Just Work™️.[^registries] Keep your eyes open for the ember-cli-typescript 1.1 release in the next couple days!

[^registries]: If you're curious about the mechanics, we're basically setting up a "type registry" which maps the string keys to the correct model, so that the type of e.g. `store.createRecord('some-model', { ... })` will do a lookup in an interface which defines a mapping from model name, i.e. `some-model` here, to the model type, e.g. `export default class SomeModel extends DS.Model.extend({ ... }) {}`. I'll write up a full blog post on the mechanics of that sometime soon.

Once this release of both ember-cli-typescript and the updated typings land, when you generate an Ember Data model by doing `ember generate model person firstName:string lastName:string`, it will look like this:

```ts
import DS from 'ember-data'

export default class Person extends DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
}) {}

declare module 'ember-data' {
  interface ModelRegistry {
    'person': Person;
  }
}
```

That module and interface declaration at the bottom *merges* the declaration for this model with the declarations for all the other models. You'll see the same basic pattern for `DS.Adapter` and `DS.Serializer` instances. The result is that *using* a model will now look like this. In addition to the `Person` model definition just above, our adapter might be like this:

```ts
import DS from 'ember-data'

export default class Person extends DS.Adapter {
  update(changes: { firstName?: string, lastName?: string }) {
    fetch('the-url-to-change-it', {
      method: 'POST',
      body: JSON.stringify(changes),
    });
  }
}

declare module 'ember-data' {
  interface ModelRegistry {
    'person': Person;
  }
}
```

Then putting the pieces together, our component definition will just look like this:

```ts
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class PersonCard extends Component {
  id: string | number;
  
  store = service('store');
  model = this.store.findRecord('person', this.id);
  
  actions = {
    savePerson(changes: { firstName?: string, lastName?: string }) {
      this.store.adapterFor('person').update(changes);
    }
  }
}
```

The type of `model` here is now `Person & DS.Promise<Person>` (which is actually what Ember Data returns for these kinds of things!), and the `this.store.adapterFor` actually correctly returns the `Person` adapter as well, so the call to its `update` method type-checks as well (including guaranteeing that the arguments to it are correct)!

You'll also notice that the service injection is much cleaner than it was in earlier examples in the series. That's because we made the same "registry"-type changes---as I suggested we might back in [Part 1][pt1]!---for controller and service injections. Before, for this kind of thing:

```ts
export default class PersonCard extends Component {
  store: Computed<DS.Store> = service();
}
```

Now:

```ts
export default class PersonCard extends Component {
  store = service('store');
}
```

That's not *quite* as minimalist as what you get in vanilla Ember (where the name of the property is used to do the lookup at runtime), but it's pretty close, and a huge improvement! Not least since it's *exactly* as type-checked, and therefore as friendly to autocomplete/IntelliSense/etc. as it was before.

### Migrating existing Ember Data items

Your path forward for using the new approach is straightforward and fairly mechanical:

1. Add the module-and-interface declaration for each Ember Data `Model`, `Adapter`, and `Serializer`; and also each Ember `Service` and `Controller` you have defined.
2. Remove any type coercions you've written out already for these.

#### 1. Add declaration

`DS.Model`:

```ts
import DS from 'ember-data'

export default class Person extends DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
}) {}
 
declare module 'ember-data' {
  interface ModelRegistry {
    'person': Person;
  }
}
```

`DS.Adapter`:

```ts
import DS from 'ember-data';

export default class Person extends DS.Adapter {
  // customization
}

declare module 'ember-data' {
  interface AdapterRegistry {
    'person': Person;
  }
}
```

`DS.Serializer`:

```ts
import DS from 'ember-data';

export default class Person extends DS.Serializer {
  // customization
}

declare module 'ember-data' {
  interface SerializerRegistry {
    'person': Person;
  }
}
```

`Service`:

```ts
import Service from '@ember/service';

export default class Session extends Service {
  // implementation
}

declare module '@ember/service'{
  interface ServiceRegistry {
    'session': Session;
  }
}
```

`Controller`:

```ts
import Controller from '@ember/controller';

export default class Profile extends Controller {
  // implementation
}

declare module '@ember/controller' {
  interface ControllerRegistry {
    'profile': Profile;
  }
}
```

If you *don't* do that, you'll just get back:[^coercion]

- `DS.Model` for `this.store.findRecord`/`this.store.queryRecord`, etc. invocations
- `DS.Adapter` for `this.store.adapterFor`
- `DS.Serializer` for `this.store.serializerFor`.
- `Service` for `Ember.inject.service` (or `service` if doing modern imports)
- `Controller` for `Ember.inject.controller` (or `controller` if doing modern imports)



[^coercion]: If you want to write an inline-coercion as a stopgap, you'll need to write out a bit more than you might expect in a number of places, because calls like `findRecord('person', 123)` actually return the type `Person & DS.PromiseObject<Person>` – i.e., a type that acts like both the model and a promise wrapping the model. This is, to be sure, *weird*, but it's the reality, so that's what our types give you.

    As a corollary: if you want to just migrate things in-place, rather than going through and writing the interface definitions for all your models, you can define something like this to use wherever you have `findRecord`, `queryRecord`, etc. results:
    
    ```ts
    type Loaded<T> = T & DS.PromiseObject<T>;
    const person: Loaded<Person> = this.store.findRecord('person', 123);
    ```

#### 2. Remove any existing coercions

If you've been using the type coercions we shipped as a stopgap, like this---

```ts
const person = this.store.findRecord<Person>('person', 123);
```

---you'll need to drop the type coercion on `findRecord<Person>`, which will give you a type error:

> [ts] Type 'Person' does not satisfy the constraint 'string'.

This is because, behind the scenes, `findRecord` still takes a type parameter, but it's now a string---the name of the model you're looking up---*not* the model itself. As such, you should never supply it yourself; it's taken care of automatically. As a result, your invocation should just be:

```ts
const person = this.store.findRecord('person', 123);
```

### Migrating services and controllers

For any services or controllers you are injecting, you'll need to make the same kinds of changes:

1. Add the module-and-interface declaration for each Ember Data `Model`, `Adapter`, and `Serializer` you have defined.
2. Remove any type coercions you've written out already for these.

#### 1. Add declaration



## Mirage

Note for Ember CLI Mirage users: most of what I've said here is equally applicable and nearly identical for Mirage. I'm currently working on solid typings for Mirage that get us everything we need that way. We've been using them in our own app for quite some time, but they're incomplete because we're not using a lot of the stuff that Mirage supplies
