---
Title: Integrating Ember.js and Flow
Subtitle: Getting some static type analysis with Ember
---

Let's say that you, like me, would love to have some of the goodness of static typing in your Ember.js application. Unfortunately, TypeScript isn't an option---doubly a downside given we're already using it with React elsewhere at Olo.[^typescript]

[^typescript]: Given how much the core team is enjoying using TypeScript to build pieces of Ember itself, I'd be willing to bet it *will* be.

This is actually an incredibly simple process: add `nonStandard: true` to the Babel config in your `ember-cli-build.js` file. With that and the [polyfill] turned on, here's what our Ember app config would look like:

```js
const app = new EmberApp(defaults, {
  babel: {
    includePolyfill: true,
    nonStandard: true
  }
});
```

---

Why do it this way rather than with the currently-recommended [Flow plugin for Babel]? Because Ember.js is currently stuck on Babel 5.x---there is a fair bit of work required to update it. That work is ongoing, and should hopefully be done in the next few months. If you have some spare cycles, you should send them that way!

[Flow plugin for Babel]: 