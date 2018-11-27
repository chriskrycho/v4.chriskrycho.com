---
Title: Internal and External Parameter Names in JavaScript and TypeScript
Subtitle: >
    A handy design pattern stolen from Objective-C and Swift for designing nicely usable <abbr>API</abbr>s.
Date: 2018-11-26 20:25
Tags: [javascript, typescript, swift, software development]
Summary: >
    You can use destructuring to make nice JavaScript/TypeScript APIs both for users and implementers of a given function: a handy design pattern stolen from Objective-C and Swift.
---

Earlier this month I was working on a fairly thorny problem for work—taking a total value and splitting it into numbers which summed up to it, possibly including with a rule about what the split-up values had to be a multiple of. E.g. you want to order 50 Buffalo wings, and you have to choose the flavors for the wings in increments of 5.

I spent a lot of time thinking about the implementation of the algorithm for that, but I also spent a lot of time thinking about what its <abbr>API</abbr> should look like. Here, it's the latter I want to dive into (the former is a little tricky but not all that interesting).

I started out with just simple parameters to the function:

```ts
function splitNicely(
  total: number, components: number, factor?: number
): number {
  // the implementation
}
```

This is nice enough to use internally. But calling it is pretty confusing:

```ts
const result = splitNicely(50, 5, 2);
```

Which number is what value here? Who knows!

So then I just exposed *all* of the items as an options hash:

```ts
interface SplitArgs {
  total: number;
  components: number;
  factor?: number;
}

function splitNicely(
  { total, components, factor }: SplitArgs
): number {
  // the implementation
}
```

This was a lot nicer to call:

```ts
const result =
	splitNicely({ total: 50, components: 5, factor: 2 });
```

However, it was a bit verbose, and I realized that it’s fairly obvious that the first argument should be the value we’re splitting up, so I simplified a bit:

```ts
interface SplitArgs {
  components: number;
  factor?: number;
}

function splitNicely(
  total: number,
  { components, factor }: SplitArgs
): number {
  // the implementation
}

```

Now calling it read *relatively* well:

```ts
splitNicely(10, { components: 5, factor: 2 });
```

However, the names were not my favorite for invoking the function. Really, what I wanted was for the function invocation to describe what I was doing, when reading it from the outside—while having these useful names for operating on the implementation internally.

At this point, I remembered two things:

1. Swift and Objective-C have the nice notion of internal and external parameter names.
2. JavaScript (and thus TypeScript) let you rename values in “destructuring assignment.”

The second one lets us get the same basic effect in JavaScript or TypeScript as we get in Swift, if we’re using an options argument! Here’s how destructuring works in the function definition. Let's see it first with just JavaScript. The object passed as a parameter has a key named `of`, which has a string value—but `of` is a bad name inside the function; there, we can just call it `str` and it's perfectly clear.

```js
function length({ of: str }) {
  return str.length;
}

console.log(length({ of: "waffles" }));  // 7
```

That's the equivalent of a function that looks like this:

```js
function length({ of }) {
  const str = of;
  return str.length
}
```

Here's the same code but in TypeScript:

```ts
function length({ of: str }: { of: string }): number {
  return str.length;
}

console.log(length({ of: "waffles" }));  // 7
```

This is a big more annoying to write out in TypeScript, because we need to supply the type of the whole object after the object we've destructured, but the effect is the same once we get past the declaration. It's also pretty silly to do this kind of thing at all in this example—but it becomes much more useful in more complicated functions, like the one that motivated me to explore this in the first place.

Recall that I *liked* having `components` and `factor` as the internal names. They weren't great for *calling* the function, though. After some consideration, I decided invoking the function should look like this:

```ts
splitNicely(10, { into: 5, byMultiplesOf: 2 });
```

By using the destructuring technique, we can get exactly this, while keeping `components` and `factor` internally:

```ts
interface SplitArgs = {
  into: number;
  byMultiplesOf?: number;
}

function splitNicely(
  total: number,
  { into: components, byMultiplesOf: factor }: SplitArgs
): number {
  // the implementation
}
```

This is a great pattern to put in your toolbox. You can of course overdo it with this, as with any technique, but it’s a nice tool for these kinds of cases where you really want to make an expressive <abbr>API</abbr> for both callers and the internal implementation of a function.
