---
Title: Type-Informed Design
Subtitle: Revisiting our app in TypeScript’s strict mode has me thinking about what we’d do different if we had this input in the first place.
Date: 2018-08-30 19:40
Category: Tech
Tags: [TypeScript, JavaScript, functional programming, types, software development, Ember.js]
Summary: >
    Revisiting our app in TypeScript’s strict mode has me thinking about what we’d do different if we had this input in the first place.
---

I’ve been working on getting the Ember app I work on fully type-checked in strict mode this week, and  noticed something interesting along the way: there are a lot of design decisions—a few of them really core to the behavior of the app!—which we never, *ever* would have made if we had been using Typescript in the first place.

One of these is pervasive references to certain optional properties that appear in services throughout our app—the basket, for example. These can indeed be inset and at certain times they are. However, many of our components pull in this property from the service and simply assume it’s there to use. We’ve known for a while that this was a problem at times: [Raygun](https://raygun.com/) has told us loud and clear. But it wasn’t obvious how pervasive this was—and how badly we were just assuming the presence of something that may well be absent *all over the app*!—until I saw the type errors from it. Dozens of them.

Some of them are places where we should have built the components differently: to take the item as an argument, for example, and to require it as an input, because the component just doesn’t make any sense without it, indeed lives in a part of the app such that it’s not even possible to render the component without it.

And sure, we could document that invariant and use TypeScript’s override tools to carry on. (What do you think I’m doing this week?)

But, and this is the thing that really caught my attention in thinking about all of this: it would be much better *not* to have to do that. Had we had TypeScript in place when we started, we simply would have designed large swaths of the app differently because we’d have seen these kinds of things when we were building it in the first place!

That’s a bit of wishing for the impossible in one sense: we literally couldn’t have done that when we started on the app, because TS didn’t have the necessary pieces to support typing the Ember libraries. My team helped *build* the TS and Ember story over the last 18 months! But at a minimum I have a pretty good idea how the process will be different next time around, with this tool available and providing this kind of helpful design feedback from the outset!
