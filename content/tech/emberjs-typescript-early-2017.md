---
Title: Ember.js and TypeScript in Early 2017
Subtitle: It’s not awesome yet… but it is getting there.
Date: 2017-04-11 22:00
Category: Tech
Tags: emberjs, typescript, software development
Status: draft
---

A few weeks ago at EmberConf 2017, Tom Dale and Yehuda Katz announced [Glimmer.js], a lightweight UI component library... and they noted that it was written in and had full support right out of the gate for [TypeScript]. A fair number of people have [had questions] about this, but there's also been consistent interest in using TypeScript with Ember in the community. And, as readers of this blog know, I'm *kind of* obsessed with finding ways to make type systems help me [express invariants] and [solve real problems].

[Glimmer.js]: https://glimmerjs.com
[TypeScript]: http://www.typescriptlang.org
[had questions]: https://medium.com/@tomdale/glimmer-js-whats-the-deal-with-typescript-f666d1a3aad0
[express invariants]: http://www.chriskrycho.com/2016/the-itch.html
[solve real problems]: http://www.chriskrycho.com/2016/keyof-and-mapped-types-in-typescript-21.html

Although I haven't talked about it expressly before, I've been making heavy use of TypeScript in our Ember.js app at Olo (after a period of experimentation with [Flow]. My experiments have been on the *relatively* early end of the adoption curve for Ember.js and TypeScript. It hasn't always been smooth sailing. But it's been valuable nonetheless: we've seen many of the same kinds of [productivity wins as Slack] has had with it---even *with* those limitations and hiccups.

[Flow]: https://flowtype.org
[productivity wins as Slack]: https://slack.engineering/typescript-at-slack-a81307fa288d

Given that (and some persistent pestering from one Ember.js core team member---you know who you are), I thought it might be useful to write up a sort of **State of the Ember.ts**. I'm going to explain how it works, then cover the bad bits up front, and then end on the good stuff. But you should know that even with the bad bits, I'm *extremely* happy with the results I've had converting existing modules and especially with writing new modules in TypeScript.

## 

## The Bad

Let's get this right out of the way up front: there are a couple things which simply don't work with TypeScript and Ember today.

1. Add-ons currently can't use `ember-cli-typescript`, and no one has had the bandwidth to chase it down. It's a pretty high priority: I know some core team members have their eyes on it, because it's important for integrating Glimmer.js and Ember.js easily. But as of today, if you're trying to write add-ons, you're out of luck doing it that way, which means it's a *lot* more work, if it's possible at all.

2. The [typings] story is... weak. [\@winding-lines] did a bang-up job getting them in a reasonable state a few months ago, but he's been busy, and so have I and everyone else who's had the motivation to work on it. They're much, much better than nothing: you still get pretty decent completion of the core Ember functionality. But it doesn't *yet* take advantage of all the features Microsoft has shipped in the TypeScript 2.x series which make it possible to actually represent Ember's custom object model with type checking and get the smart completion benefits ("Intellisense"). So it's not great, but it's not *horrible*, by a long shot. It can just stand to improve.

    The net of this is that when you're in the definition of any `Ember.Object` descendant---i.e. anything that extends `Ember.Object`, including `Ember.Controller`, `Ember.Component`, `Ember.Mixin`, `Ember.Route`, and also `DS.Model` and so on---you don't yet get either completion or type checking for the items attached to the item in question. When you do `this.get('foo')`, you get back an `any` type: TypeScript has the ability to know that `Ember.get` should handle keys and the associated types on them, but that ability isn't being taken advantage of yet.
    
3. Along with that, Ember doesn't yet have the ability to use ES6 classes, so a lot of the kinds of type constraints it's *nice* to do---specifically, defining that a given property of an object is of a specific type---is incredibly verbose. You end up writing things like this:

    ```ts
    const { foo, bar }: { foo: string, bar: boolean } =
      getProperties(this, 'foo', 'bar');
    ```
    
    As you can imagine, extending that same practice out for a `Component` definition is simply untenable (and, importantly, the order is backwards from what's actually useful when reading a file!):
    
    ```ts
    export default Ember.Component.extend({
      foo: 'whatever',
      bar: false,
    }: {
      foo: string,
      bar: boolean,
    });
    ```
    
    I'll talk about the pragmatics of what we are and aren't doing with TS in our Ember codebase more below, but those limitations are all there for now and they do stymie me at times. They'll go away once better typings land. Which they will (see below under **The Good**)---but they're not here yet.

[typings]: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/ember
[\@winding-lines]: https://github.com/winding-lines

The overarching theme here is: we currently don't have an *owner* for the TypeScript integration, and that means that stuff stagnates because all of us who are interested have things which push it down our priority list... fairly permanently. (I'd like to be that guy, but work constraints haven't allowed for it, at least not yet.)

## The Good

1. [Better typings are coming.][video] :tada: That's TypeScript Program Manager Daniel Rosenwasser at EmberConf talking about the stuff he's working on with the Ember team to make the typings awesome.
2. Even with the relatively weak typings right now, {>> TODO <<}

[video]: https://www.youtube.com/watch?v=951HiqnNQ1w

## Using it

At the most basic level, integrating TypeScript into your Ember app is as simple as doing two things:

1. Run `ember install ember-cli-typescript`.
2. Start converting existing modules or writing new modules as TypeScript.
3. Go wild!

In practice, because of the aforementioned limitations, (3) is more like "Go use it eagerly but only in certain parts of the app." The places where we currently get the *most* mileage out of tests are *tests* and *business logic*. I have several fairly complex places where I do transformations from one state to another, and those are all encoded in functions written in TypeScript---and, importantly, those are *not* members of a component. They're just standalone functions.[^pure] That has the delightful effect of making them amenable to use with TypeScript. It also makes them much easier to test.

[^pure]: [Pure functions], to be specific, because my goal is to write as *many* of my functions as pure functions as possible.

[Pure functions]: http://www.chriskrycho.com/2016/what-is-functional-programming.html#pure-functions

I also do make fairly extensive use of TypeScript when defining the return type of a computed property:

```ts
export default Ember.Component.extend({
  someOtherThing: false,
  someThing: Ember.computed('someOtherThing', function(): string {
    const someOtherThing = Ember.get(this, 'someOtherThing');
    return `someOtherThing was ${someOtherThing}`;
  }),
});
```

That gets me a small but already valuable check that I'm returning what I think I'm returning. (Unfortunately, we can't yet use decorated functions via the oh-so-awesome [ember-computed-decorators] with these because the decorator syntax used there isn't in line with the version of the decorator spec TypeScript currently enforces. Someday!)

[ember-computed-decorators]: https://github.com/rwjblue/ember-computed-decorators