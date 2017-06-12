---
Title: Ember.js and TypeScript in Early 2017, Part II
Slug: emberjs-typescript-early-2017-ii
Subtitle: Configuring and using TypeScript in your Ember.js app today.
Date: 2017-04-13 21:00
Category: Tech
Tags: emberjs, typescript, software development
Status: draft
---

[part-i]: '/2017/emberjs-typescript-early-2017-i.html'

## Using it

At the most basic level, integrating TypeScript into your Ember app is as simple as doing two things:

1. Run `ember install ember-cli-typescript`.

2. Change `tsconfig.js` to look like this:

    ```js
    {
      "compilerOptions": {
        "target": "ES6",
        "allowJs": true,
        "moduleResolution": "node",
        "noEmitOnError": false,
        "noEmit": true,
        "baseUrl": ".",
        "lib": ["dom", "es2016", "es2016.array.include"],
        "paths": {
          "<your app name>/config/*": ["config/*"],
          "<your app name>/tests/*": ["tests/*"],
          "<your app name>/*": ["app/*"],
          "npm:*": ["local-types/*"],
          "*": ["local-types/*", "node_modules/@types/*"]
        }
      },
      "include": [
        "app/**/*",
        "tests/**/*"
      ]
    }
    ```

3. Go wild!

In practice, because of the limitations I talked about in [the first of these posts][part-i], (3) is more like "Go use it eagerly but only in certain parts of the app." The places where we currently get the *most* mileage out of tests are *tests* and *business logic*. I have several fairly complex places where I do transformations from one state to another, and those are all encoded in functions written in TypeScript---and, importantly, those are *not* members of a component. They're just standalone functions.[^pure] That has the delightful effect of making them amenable to use with TypeScript. It also makes them much easier to test.

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