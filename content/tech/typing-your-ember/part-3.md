---
Title: Typing Your Ember, Part 3
Subtitle: How to actually use types effectively in Ember today.
Date: 2017-07-28 12:00
Tags: [emberjs, typescript, typing-your-ember]
Category: tech
Series:
    Title: Typing Your Ember
    Part: 3

---

<i class='series-overview'>You write [Ember.js] apps. You think [TypeScript] would be helpful in building a more robust app as it increases in size or has more people working on it. But you have questions about how to make it work.</i>

[Ember.js]: https://emberjs.com
[TypeScript]: http://www.typescriptlang.org

<i class='series-overview'>This is the series for you! I'll talk through everything: from the very basics of how to set up your Ember.js app to use TypeScript to how you can get the most out of TypeScript today---and I'll be pretty clear about the current tradeoffs and limitations, too.</i>

<i class='series-overview'>[(See the rest of the series. →)][series]</i>

[series]: /typing-your-ember.html

---

In the [first][part-1] of this series, I described how to set up a brand new Ember.js app to use TypeScript. In the [second][part-2] part, walked through adding TypeScript to an existing Ember.js app. In this part, I'm going to talk about using TypeScript effectively in a modern Ember.js app.

[part-1]: /2017/typing-your-ember-part-1
[part-2]: /2017/typing-your-ember-part-2

## Heavy lifting, so-so results

Let's get this out of the way up front: right now, using types in anything which extends `Ember.Object` is going to be a lot of work for a relatively low reward. `Ember.Object` laid the foundation for the modern JavaScript class system (and thus the TypeScript class system), but it has a huge downside: it's string keys and referennces all the way down. This kind of thing is just normal Ember code---and note all the string keys:[^new-module-api]

[^new-module-api]: Note that here and throughout, I'm using the [RFC #176 Module API][176 api], which you can use today via [this polyfill].

[176 api]: https://github.com/emberjs/rfcs/blob/master/text/0176-javascript-module-api.md#addendum-1---table-of-module-names-and-exports-by-global

[this polyfill]: https://github.com/ember-cli/babel-plugin-ember-modules-api-polyfill

```javascript
import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  someProperty: 'with a string value',
  someOther: computed('someProperty', function() {
    const someProperty = get(this, 'someProperty');
    return someProperty + ' that you can append to';
  }),
});
```

What this comes out to---even with a lot of the very helpful changes made to TypeScript itself in the 2.x series to help support object models like this one---is a lot of work adding types inline, and having to be really, really careful that your types are *correct*. If that property you're `Ember.get`-ing can ever be `undefined` or `null`, you'd better write the type as `string | void` instead of just `string`. For example: this code is written with the correct types:

```typescript
import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  someProperty: 'with a string value',  // no type annotation
  someOther: computed('someProperty', function() {
    const someProperty: string = get(this, 'property');
    return someProperty + ' that you can append to';
  }),
});
```

Note two important things about it, however:

1. TypeScript does not (and, with the *current* typings for Ember, cannot) figure out the type of `someProperty` from this definition; `get` currently just hands back `any` as the type of these kinds of things. That type annotation is necessary for you to get any mileage out of TypeScript *at all* in a computed property like this.
2. If, anywhere in your code, you *set* the value of `someProperty`---including to `undefined` or `null`, or to `{ some: 'object' }`---this could fail.

Unfortunately, this second point means that TypeScript actually *can't* guarantee this the way we'd like. There's hope coming for this in the future in several ways---more on that in a moment---but for now, I'll summarize this by saying TypeScript is really helpful *within* a function, once you've correctly defined the types you're using. That means that you have to continue to be *very* careful in what you're doing in the context of any `Ember.Object` instance, including all the Ember types which descend from `Object`, and therefore also any types *you* define which extend those in turn.

## Future niceties

In the future, we'll be able to get away from a lot of these difficulties by way of two changes coming down the line: Ember embracing ES6 classes to replace its current custom object system, and embracing decorators as a way of replacing the current approach to computed properties. Let's take those in turn.

### `class` syntax

When Ember was birthed in the early 2010s (first as "SproutCore 2" and then "Amber.js" and finally "Ember.js"), the JavaScript world was a *remarkably* different place. The current pace of change year to year is nothing short of astounding for any language, but doubly so for one that sat languishing for so long. When Ember came around, something like today's `class` syntax was unimaginable, and so essentially every framework had its own class system of some sort. Over the past few years, with the proposal and standardization of the `class` syntax as nice sugar for JavaScript's prototypal inheritance, the need for a custom object and inheritance model has essentially gone away entirely. However, Ember doesn't do breaking changes to its API just because; we as a community and the core team in particular have chosen to place a high priority on backwards compatibility. So any adoption of ES6 classes had to work in such a way that we got it *without* making everyone rewrite their code from scratch.

All of this impacts our story with TypeScript because, well, TypeScript for a long time couldn't even begin to handle this kind of complexity (it's a lot for a static type system to be able to express, given how *very* dynamic the types here can be). As of TS 2.3, it can express *most* of this object model, which is great... but it's forever out of step with the rest of the JS/TS ecosystem, which is not so great. ES6 classes are first-class items in TypeScript and the support for getting types right within them is much, *much* stronger than the support for the mixin/extension style object model Ember currently uses. So moving over to ES6 classes will make it much easier for TS to do the work of telling you *you're doing it wrong with that class*---and most importantly, it'll be able to do that automatically, without needing the incredibly hairy type definition files that we're still trying to write to get Ember's current model represented. It Will Just Work. That means less maintenance work and fewer places for bugs to creep in.

Gladly, we're getting there! Already today, in the most recent versions of Ember, you can write this, and it will work:

```typescript
import Component from '@ember/component';

export default class MyComponent extends Component {
  theAnswer = 42;
  andTheQuestionIs =
    "What is the meaning of life, the universe, and everything?";
}
```

When I say "it will work," I mean you can then turn around and write this in your `my-component.hbs` and it'll be exactly what you would expect from the old `Ember.Component.extend()` approach:

```hbs
{{andTheQuestionIs}} {{the Answer}}
```

There is one serious limitation of that today: you can't do that with a class you need to extend *further*. So if, for example, you do like we do and customize the application route rinstance and then reuse that in a couple places, you'll still have to use the old syntax:

```typescript
import Route from '@ember/route';

export default Route.extend({
  // your customizations...
});
```

But everywhere you consume that, you can use the new declaration:

```typescript
import ApplicationRoute from 'my-app/routes/application';

export default class JustSomeRoute extends ApplicationRoute {
  model() {
    // etc.
  }
}
```

There's more work afoot here, too, to make it so that these restrictions can go away entirely... but those changes will undoubtedly be covered in considerable detail on [the official Ember blog] when they roll out.

[the official Ember blog]: http://www.emberjs.com/blog/

### Decorators

Now, that's all well and good, but it doesn't necessarily help with this scenario:

```typescript
import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default class MyComponent extends Component {
  someProperty = 'is just a string';

  someOtherProperty = computed('someProperty', function() {
    const someProperty = get(this, 'someProperty');
    return someProperty + ' and now I have appended to it';
  });
}
```

We're back in the same spot of having unreliable types there. And again: some really careful work writing type definitions to make sure that `computed` and `get` both play nicely together with the class definition would help somewhat, but... well, it'd be nice if the types could just be determined automatically by TypeScript. (Also, there's an [open bug] on the TypeScript repository for trying to deal with `computed`; suffice it to say that computed as it currently stands is a sufficiently complicated thing that even with all the incredible type machinery TS 2.1, 2.2, and 2.3 have brought to bear on exactly these kinds of problems... it still can't actually model `computed` correctly.)

[open bug]: https://github.com/Microsoft/TypeScript/issues/16699

For several years now, Rob Jackson has maintained [a small library] that let you write computed properties with decorators. Up till recently, those were incompatible with TypeScript, because they used to work in the context of object literals rather than classes---and TypeScript never supported that. However, as of about a month ago as I'm writing this, they've been updated and they *do* work with ES6 classes. So, given the class syntax discussed above, you can now `ember install ember-decorators` and then do this:

[ember-decorators]: https://github.com/rwjblue/ember-decorators

```typescript
import Component from '@ember/component';
import { computed } from 'ember-decorators/object';

export default class MyComponent extends Component {
  someProperty = 'with a string value';

  @computed('someProperty')
  someOther(someProperty: string) {
    return someProperty + ' that you can append to';
  }
}
```

Here, we can provide a type on the parameter to `someOther`, which at a minimum makes this enormously cleaner and less repetitive syntactically. More interestingly, however, we *should* (though no one has done it just yet, to my knowledge) be able to write a type definition for `@computed` such that TypeScript will already know that `someProperty` here *is* a string, because it'll have the context of the class in which it's operating. So that example will be even simpler:

```typescript
import Component from '@ember/component';
import { computed } from 'ember-decorators/object';

export default class MyComponent extends Component {
  someProperty = 'with a string value';

  @computed('someProperty')
  someOther(someProperty) {
    return someProperty + ' that you can append to';
  }
}
```

And in that imagined, wonderful future world, if we tried to do something that isn't a valid string operation---say, we tried `someProperty / 3`---TypeScript would complain to us, loudly.

Although this is still a future plan, rather than a present reality, it's not *that* far off. We just need someone to write that type definition for the decorators, and we'll be off to the races wherever we're using the new ES6 class approach instead of the existing `Ember.Object` approach. So: *soon*. I don't know how soon, but soon.

## Current ameliorations

In the meantime, of course, many of us are maintaining large codebases. I just checked, and our app (between the app itself and the tests) has around 850 files and 34,000 lines of code. Even as those new abilities land, we're not going to be converting all of them all at once. And we want to get some real mileage out of TypeScript in the meantime. One of the best ways I've found to do this is to take a step back and think about the pieces of the puzzle which Ember is solving for you, and which it *isn't*. That is, Ember is really concerned with managing application state and lifecycle, and with rendering the UI. And it's *fabulous* about those things. What it's not particularly concerned with (and what it shouldn't be) is the particulars of how your business logic is implemented. And there's no particular reason, *especially* if most of that business logic is implemented in terms of a bunch of pure, straightforward, input-to-output functions that operate on well-defined data types, for all of your business logic to live in `Ember.Object`-descended classes.

Instead, we have increasingly chosen to write our business logic in bog-standard TypeScript files. These days, our app has a `lib` directory in it, with packages like `utilities` for commonly used tools... but also like `billing`, where we implement *all* of our client-side billing business logic. The display logic goes in the `Ember.Controller` and `Ember.Component` classes, and the routing and state management goes in the `Ember.Route` and `Ember.Data` pieces as you'd expect. But none of the business logic lives there. That means that we're entirely free of the aforementioned constraints for the majority of the time dealing with that data. If we do a good job making sure the data is good at the boundaries---route loads, for example, and when we send it back to the server---then we can effectively treat everything else as just boring old (new?) TypeScript.

So far we've only taken that approach with about a quarter of our app, but it's all the latest pieces of our app, and it has been incredibly effective. Even once we're able to take advantage of all those shiny new features, we're going to keep leaning heavily on this approach, because it lets Ember do what Ember is best at, and keeps us from coupling our business logic to the application state management or view rendering details.

## Conclusion

So that's the state of things in Ember with TypeScript today. Your best bet for getting real mileage out of TypeScript today is to use the new class syntax support and decorators wherever you can within Ember-specific code, and then to write as much of your business logic outside the Ember system as possible. Gladly, all of that points you right at the future (in the case of syntax) and just good practice (in the case of separating out your business logic). So: not too shabby overall. It's working well for us, and I hope it does for you as well!

Next time: how we got here with the `ember-cli-typescript` compiler, and where we hope to go from here!









