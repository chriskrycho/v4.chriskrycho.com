---
Title: TypeScript and Ember.js Update, Part 4
Subtitle: Ember Data and injections update
Date: 2018-02-08 07:30
Category: Tech
Series: Typing Your Ember
Tags: TypeScript, emberjs, typing-your-ember
slug: typing-your-ember-update-part-4
Summary: >
    Using Ember Data effectively, and migrating to new (better, easier!) approaches for service and controller lookup while we’re at it.
---

<i class='series-overview'>You write [Ember.js] apps. You think [TypeScript] would be helpful in building a more robust app as it increases in size or has more people working on it. But you have questions about how to make it work.</i>

[ember.js]: https://emberjs.com
[typescript]: http://www.typescriptlang.org

<i class='series-overview'>This is the series for you! I'll talk through everything: from the very basics of how to set up your Ember.js app to use TypeScript to how you can get the most out of TypeScript today---and I'll be pretty clear about the current tradeoffs and limitations, too.</i>

<i class='series-overview'>[(See the rest of the series. →)][series]</i>

[series]: /typing-your-ember.html

---

In the previous posts in this series, I introduced the big picture of how the story around TypeScript and Ember.js has improved over the last several months, walked through some important background on class properties, and dug deep on computed properties, actions, and mixins.

In today's post, we'll look at how to write Ember Data models so they work correctly throughout your codebase, and see some improvements to how we can do `Service` and `Controller` injections even from a few weeks ago.

<aside>

If you're interested in all of this and would like to learn more in person, I'm [leading a workshop on it at EmberConf 2018](http://emberconf.com/speakers.html#chris-krycho)---I'd love to see you there!

</aside>

Here's the outline of this update sequence:

1. [Overview, normal Ember objects, component arguments, and injections.][pt1]
2. [Class properties---some notes on how things differ from the `Ember.Object` world.][pt2]
3. [Computed properties, actions, mixins, and class methods.][pt3]
4. [**Using Ember Data and improved injections.** (this post)][pt4]
5. Mixins and proxies; or: the really hard-to-type-check bits.

[pt1]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-1.html
[pt2]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-2.html
[pt3]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-3.html
[pt4]: http://www.chriskrycho.com/2018/typing-your-ember-update-part-4.html

## Ember Data

There remains one significant challenges to using Ember Data effectively with TypeScript today: Ember Data, for reasons I haven't yet dug into myself, does not play nicely with ES6 classes. However, we _need_ named class exports for the sake of being able to use them as types elsewhere in our programs. The hack to work around this is much the same as anywhere else we need named exports but have to get things back into the prototype:

```ts
import DS from "ember-data";

export default class Person extends DS.Model.extend({
  firstName: DS.attr("string"),
  lastName: DS.attr("string")
}) {}
```

You can still define other items of the class normally, but attributes have to be prototypally bound or _you will have problems_. Note that this only applies (as far as I can tell) to Ember Data `Model`s specifically---`Adapter` and `Serializer` classes work just fine.

The other problem we've historically had was dealing with lookups—the situation was similar to that I described in [Part 3][pt3] for service injection. However, as of _this week_, we're landing a solution that means you can drop the type coercions and just do a lookup like you would normally, and it will Just Work™️.[^registries] Keep your eyes open for the ember-cli-typescript 1.1 release in the next couple days!

[^registries]: If you're curious about the mechanics, we're basically setting up a "type registry" which maps the string keys to the correct model, so that the type of e.g. `store.createRecord('some-model', { ... })` will do a lookup in an interface which defines a mapping from model name, i.e. `some-model` here, to the model type, e.g. `export default class SomeModel extends DS.Model.extend({ ... }) {}`. I'll write up a full blog post on the mechanics of that sometime soon.

Once this release of both ember-cli-typescript and the updated typings land, when you generate an Ember Data model by doing `ember generate model person firstName:string lastName:string`, it will look like this:

```ts
import DS from "ember-data";

export default class Person extends DS.Model.extend({
  firstName: DS.attr("string"),
  lastName: DS.attr("string")
}) {
  // normal class body definition here
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module "ember-data" {
  interface ModelRegistry {
    person: Person;
  }
}
```

That module and interface declaration at the bottom _merges_ the declaration for this model with the declarations for all the other models. You'll see the same basic pattern for `DS.Adapter` and `DS.Serializer` instances. The result is that _using_ a model will now look like this. In addition to the `Person` model definition just above, our adapter might be like this:

```ts
import DS from "ember-data";

export default class Person extends DS.Adapter {
  update(changes: { firstName?: string; lastName?: string }) {
    fetch("the-url-to-change-it", {
      method: "POST",
      body: JSON.stringify(changes)
    });
  }
}

declare module "ember-data" {
  interface ModelRegistry {
    person: Person;
  }
}
```

Then putting the pieces together, our component definition will just look like this:

```ts
import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default class PersonCard extends Component {
  id: string | number;

  store = service("store");
  model = this.store.findRecord("person", this.id);

  actions = {
    savePerson(changes: { firstName?: string; lastName?: string }) {
      this.store.adapterFor("person").update(changes);
    }
  };
}
```

The type of `model` here is now `Person & DS.PromiseObject<Person>` (which is actually what Ember Data returns for these kinds of things!), and the `this.store.adapterFor` actually correctly returns the `Person` adapter as well, so the call to its `update` method type-checks as well (including guaranteeing that the arguments to it are correct). That also means you'll get autocompletion for those, including for their types, if you're using an editor configured for it. And, happily for everyone, if you mistype a string (`preson` instead of `person`, for example), you'll get a compile-time error!

Notice as well that the service injection is much cleaner than it was in earlier examples in the series. That's because we made the same "registry"-type changes---as I suggested we might back in [Part 1][pt1]!---for controller and service injections. Before, for this kind of thing:

```ts
export default class PersonCard extends Component {
  store: Computed<DS.Store> = service();
}
```

Now:

```ts
export default class PersonCard extends Component {
  store = service("store");
}
```

That's not _quite_ as minimalist as what you get in vanilla Ember (where the name of the property is used to do the lookup at runtime), but it's pretty close, and a huge improvement! Not least since it's _exactly_ as type-checked, and therefore as friendly to autocomplete/IntelliSense/etc. as it was before.

### Migrating existing items

Your path forward for using the new approach is straightforward and fairly mechanical:

1. Add the module-and-interface declaration for each Ember Data `Model`, `Adapter`, and `Serializer`; and also each Ember `Service` and `Controller` you have defined.
2. Remove any type coercions you've written out already for these.

#### 1. Add declaration

##### `DS.Model`

**Before:**

```ts
import DS from "ember-data";

export default class Person extends DS.Model.extend({
  firstName: DS.attr("string"),
  lastName: DS.attr("string")
}) {}
```

**Now:**

```ts
import DS from "ember-data";

export default class Person extends DS.Model.extend({
  firstName: DS.attr("string"),
  lastName: DS.attr("string")
}) {}

declare module "ember-data" {
  interface ModelRegistry {
    person: Person;
  }
}
```

##### `DS.Adapter`

**Before:**

```ts
import DS from "ember-data";

export default class Person extends DS.Adapter {
  // customization
}
```

**Now:**

```ts
import DS from "ember-data";

export default class Person extends DS.Adapter {
  // customization
}

declare module "ember-data" {
  interface AdapterRegistry {
    person: Person;
  }
}
```

##### `DS.Serializer`

**Before:**

```ts
import DS from "ember-data";

export default class Person extends DS.Serializer {
  // customization
}
```

**Now:**

```ts
import DS from "ember-data";

export default class Person extends DS.Serializer {
  // customization
}

declare module "ember-data" {
  interface SerializerRegistry {
    person: Person;
  }
}
```

##### `Service`

**Before:**

```ts
import Service from "@ember/service";

export default class ExternalLogging extends Service {
  // implementation
}
```

**Now:**

```ts
import Service from "@ember/service";

export default class ExternalLogging extends Service {
  // implementation
}

declare module "ember" {
  interface ServiceRegistry {
    "external-logging": ExternalLogging;
  }
}
```

##### `Controller`

**Before:**

```ts
import Controller from "@ember/controller";

export default class Profile extends Controller {
  // implementation
}
```

**Now:**

```ts
import Controller from "@ember/controller";

export default class Profile extends Controller {
  // implementation
}

declare module "@ember/controller" {
  interface ControllerRegistry {
    profile: Profile;
  }
}
```

If you _don't_ do add the type registry declarations, you'll just get back:

* _compiler errors_ for any use of a string key in your service and controller lookups

* `Service` and `Controller` (the top-level classes we inherit from) instead of the specific class you created if you use the no-argument version of the `inject` helpers

* _compiler errors_ for `DS.Model`, `DS.Adapter`, and `DS.Serializer` lookups (since they always have a string key)

If you're looking to allow your existing code to all just continue working while you _slowly_ migrate to TypeScript, you can add this as a fallback somewhere in your own project (adapted to whichever of the registries you need):

```ts
declare module "ember-data" {
  interface ModelRegistry {
    [key: string]: DS.Model;
  }
}
```

This will lose you the type-checking if you type a key that doesn't exist, but it means that models you haven't yet added the type definition for won't throw compile errors. (We've made this opt-in because otherwise you'd never be able to get that type-checking for using an invalid key.)

#### 2. Remove any existing coercions

Now that we have the necessary updates to be able to do these lookups automatically in the compiler, we need to remove any existing type coercions.

##### `Service` and `Controller`

This change is really straightforward (and actually just simplifies things a lot!) for `Service` and `Controller` injections.

```diff
  import Component from '@ember/component';
  import { inject as service } from '@ember/service';
- import Computed from '@ember/object/computed';
-
- import ExternalLogging from 'my-app/services/external-logging';

  export default class UserProfile extends Component {
-   externalLogging: Computed<ExternalLogging> = service();
+   externalLogging = service('external-logging');
    // other implementation
  }
```

##### Ember Data

This looks _slightly_ different for the Ember Data side.

If you've been using the type coercion forms we shipped as a stopgap, like this---

```ts
const person = this.store.findRecord<Person>("person", 123);
```

---you'll need to drop the type coercion on `findRecord<Person>`, which will give you a type error:

> [ts] Type 'Person' does not satisfy the constraint 'string'.

This is because, behind the scenes, `findRecord` still takes a type parameter, but it's now a string---the name of the model you're looking up---_not_ the model itself. As such, you should _never_ supply that type parameter yourself; it's taken care of automatically. As a result, your invocation should just be:

```ts
const person = this.store.findRecord("person", 123);
```

### The full type of lookups

One last note on Ember Data: calls like `findRecord('person', 123)` actually return the type `Person & DS.PromiseObject<Person>` – i.e., a type that acts like both the model and a promise wrapping the model. This is, to be sure, _weird_, but it's the reality, so that's what our types give you.

If you find yourself needing to write out that type locally for some reason---e.g. because part of your app deals explicitly with the result of a lookup---you may find it convenient to define a global type alias like this:

```ts
type Loaded<T> = T & DS.PromiseObject<T>;
const person: Loaded<Person> = this.store.findRecord("person", 123);
```

Given the new support for getting that type automatically, you shouldn't _normally_ need that, but it's convenient if or when you _do_ need it. For example, if a component is passed the result of a `Person` lookup and needs to be able to treat it as a promise _or_ the model, you could write it like this:

```ts
import Component from "@ember/component";

export default class PersonDisplay extends Component {
  model: Loaded<Person>; // instead of just `model: Person`
}
```

### Preview: Mirage

As it turns out, Ember CLI Mirage's approach is a lot like Ember Data's (although it's actually a lot more dynamic!), so I have a very similar approach working in our codebase for doing lookups with Mirage's database. Sometime in February or March, we hope to get that completed and upstreamed into Mirage itself, so that you can get these exact same benefits when using Mirage to write your tests.

## Conclusion

And that's pretty much a wrap on Ember Data! The _next_ post you can expect in this series will be a break from nitty-gritty "how to use TS in Ember" posts for a very exciting, closely related announcement---probably tomorrow or Monday! The post after that will be a deep dive into (mostly the limitations of!) writing types for mixins and proxies.
