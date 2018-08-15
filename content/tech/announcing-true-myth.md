---
Title: Announcing True Myth 1.0
Subtitle: >
    A library for saner programming in JavaScript, with first-class support for TypeScript (and Flow), with <code>Maybe</code> and <code>Result</code> types, and supporting both a functional style and a more traditional method-call style.
Author: Chris Krycho
Date: 2017-11-01 08:40
Tags: software development, libraries, programming languages, typescript, functional programming, true myth
Category: Tech

---

I'm pleased to announce the release of [True Myth 1.0][tm]! True Myth is a library I've been working on over the last month or so, for saner programming in JavaScript, with first-class support for TypeScript (and Flow).

[tm]: https://github.com/chriskrycho/true-myth

True Myth provides standard, type-safe wrappers and helper functions to help you with two *extremely* common cases in programming:

-   not having a value---which it solves with a `Maybe` type and associated helper functions and methods
-   having a *result* where you need to deal with either success or failure---which it solves with a `Result` type and associated helper functions and methods

You could implement all of these yourself – it's not hard! – but it's much easier to just have one extremely well-tested library you can use everywhere to solve this problem once and for all.

Even better to get one of these with no runtime overhead for using it other than the very small cost of some little container objects---which we get by leaning hard on the type systems in TypeScript or Flow!

**Aside:** If you're familiar with [Folktale] or [Sanctuary], this has a lot in common with them---its main differences are:

-   True Myth has a much smaller API surface than they do
-   True Myth aims to be much more approachable for people who aren't already super familiar with functional programming concepts and jargon
-   True Myth does *no* runtime checking of your types, whereas both those libraries do by default---it relies on TypeScript or Flow instead

I really like both of those libraries, though, so you might check them out as well!

[Folktale]: http://folktale.origamitower.com
[Sanctuary]: https://sanctuary.js.org

## `Maybe`

Sometimes you don't have a value. In JavaScript land, we usually represent that with either `null` or `undefined`, and then trying to program defensively in the places we *think* we might get `null` or `undefined` as arguments to our functions. For example, imagine an endpoint which returns a JSON payload shaped like this:

```json
{
  "hopefullyAString": "Hello!"
}
```

But sometimes it might come over like this:

```json
{
  "hopefullyAString": null
}
```

Or even like this:

```json
{}
```

Assume we were doing something simple, like logging the length of whatever string was there or logging a default value if it was absent. In normal JavaScript we'd write something like this:

```javascript
function logThatValue(thePayload) {
  const length = !!thePayload.hopefullyAString
    ? thePayload.hopefullyAString.length
    : 0;
  
  console.log(length);
}

fetch(someUrl)
  .then(response => response.json())
  .then(logThatValue);
```

This isn't a big deal right here... but---and this *is* a big deal---we have to remember to do this *everywhere* we interact with this payload. `hopefullyAString` can *always* be `undefined` or `null` everywhere we interact with it, anywhere in our program. 😬

`Maybe` is our escape hatch. If, instead of just naively interacting with the payload, we do a *very small* amount of work up front to normalize the data and use a `Maybe` instead of passing around `null` or `undefined` values, we can operate safely on the data throughout our application. If we have something, we get an instance called `Just`---as in, "What's in this field? Just a string" or "Just the string 'hello'". If there's nothing there, we have an instance called `Nothing`. `Just` is a wrapper type that holds the actual value in it. `Nothing` is a wrapper type which has no value in it. But both of them are concrete types and you'll never get an `undefined is not an object` error when trying to use them!

Both of them have all the same methods available on them, and the same static functions to work on them. And, importantly, you can do a bunch of neat things with a `Maybe` instance without checking whether it's a `Nothing` or a `Just`. For example, if you want to double a number if it's present and do nothing if it isn't, you can use the `Maybe.map` function:

```typescript
import Maybe from 'true-myth/maybe';
const hereIsANumber = Maybe.just(12);          // Just(12)
const noNumberHere = Maybe.nothing<number>();  // Nothing

const double = (n: number) => n * 2;
hereIsANumber.map(double);  // Just(24)
noNumberHere.map(double);   // Nothing
```

There are [a *lot*][Maybe docs] of those helper functions and methods! Just about any way you would need to interact with a `Maybe` is there.

[Maybe docs]: https://true-myth.js.org/modules/_maybe_.html

So now that we have a little idea what `Maybe` is for and how to use it, here's that same example, but rewritten to normalize the payload using a `Maybe` instance. We're using TypeScript, so we will get a compiler error if we don't handle any of these cases right---or if we try to use the value at `hopefullyAString` directly after we've normalized it!

(Note that `Maybe.of` will construct either a `Maybe.Just` if the string is present, or `Maybe.Nothing` if the value supplied to it is `null` or `undefined`.)

```typescript
import Maybe from 'true-myth/maybe';

type Payload = { hopefullyAString?: string };
type NormalizedPayload = { hopefullyAString: Maybe<string> };

function normalize(payload: Payload): NormalizedPayload {
  return {
    hopefullyAString: Maybe.of(payload.hopefullyAString)
  };
}

function logThatValue(payload: NormalizedPayload) {
  const length = payload.hopefullyAString.mapOr(0, s => s.length);
  console.log(length);
}

fetch(someUrl)
  .then(response => response.json())
  .then(normalize)
  .then(logThatValue);
```

Now, you might be thinking, _Sure, but we could get the same effect by just supplying a default value when we deserialize the data._ That's true, you could! Here, for example, you could just normalize it to an empty string. And of course, if just supplying a default value at the API boundary is the right move, you can still do that. `Maybe` is another tool in your toolbox, not something you're *obligated* to use everywhere you can.

However, sometimes there isn't a single correct default value to use at the API boundary. You might need to handle that missing data in a variety of ways throughout your application. For example, what if you need to treat "no value" distinctly from "there's a value present, and it's an empty string"? *That's* where `Maybe` comes in handy.


## `Result`

Another common scenario we find ourselves in is dealing with operations which might fail. There are a couple patterns we often use to deal with this: *callbacks* and *exceptions*. There are major problems with both, especially around reusability and composability.

The callback pattern (as in e.g. Node) encourages a style where literally every function starts with the exact same code:

```js
function getMeAValue(err, data) {
  if (err) {
    return handleErr(err);
  }
  
  // do whatever the *actual* point of the function is
}
```

There are two major problems with this:

1.  It's incredibly repetitive – the very opposite of "Don't Repeat Yourself". We wouldn't do this with *anything* else in our codebase!

2.  It puts the error-handling right up front and *not in a good way.* While we want to have a failure case in mind when designing the behavior of our functions, it's not usually the *point* of most functions – things like `handleErr` in the above example being the exception and not the rule. The actual meat of the function is always after the error handling.

But if we're not using some similar kind of callback pattern, we usually resort to exceptions. But exceptions are unpredictable: you can't know whether a given function invocation is going to throw an exception until runtime as someone calling the function. No big deal if it's a small application and one person wrote all the code, but with even a few thousand lines of code or two developers, it's very easy to miss that. And then this happens:

```js
// in one part of the codebase
function getMeAValue(url) {
  if (isMalformed(url)) {
    throw new Error(`The url `${url}` is malformed!`);
  }
  
  // do something else to load data from the URL
  return data;
}

function render(toRender) {
  // if toRender can't generate valid HTML, throw Error("invalid HTML");
  // if it can, theRenderedHTML;
}

function setDom(html) {
  /* magic to render into DOM */
}

// somewhere else in the codebase -- throws an exception
const badUrl = 'http:/www.google.com';  // missing a slash
const response = getMeAValue(badUrl);  // throws here

// we never get here, but it could throw too
const htmlForPage = render(value);

// so we definitely can't get here safely
setDom(htmlForPage);
```

Notice: there's no way for the caller to know that the function will throw. Perhaps you're very disciplined and write good docstrings for every function – *and* moreover, perhaps everyone's editor shows it to them *and* they pay attention to that briefly-available popover. More likely, though, this exception throws at runtime and probably as a result of user-entered data – and then you're chasing down the problem through error logs.

More, if you *do* want to account for the reality that any function anywhere in JavaScript might actually throw, you're going to write something like this:

```js
try {
  const badUrl = 'http:/www.google.com';  // missing a slash
  const response = getMeAValue(badUrl);  // throws here
  
  // we never get here, but it could throw too
  const htmlForPage = render(value);
  
  // so we definitely can't get here safely
  setDom(htmlForPage);
} catch (e) {
  handleErr(e);  // ends up here
}
```

This is like the Node example *but even worse* for repetition!

And TypeScript and Flow can't help you here! They don't have type signatures to say "This throws an exception!" (TypeScript's `never` might come to mind, but it might mean lots of things, not just exception-throwing.)

Instead, we can use a `Result` to get us a container type, much like `Maybe`, to let us deal with this scenario. A `Result` is either an `Ok` wrapping around a value (like `Just` does) or an `Err` wrapping around some type defining what went wrong (*not* like `Nothing`, which has no contents). Both of them have the same sets of methods on them, and the same static functions which can operate on them.

```typescript
import Result from 'true-myth/result';

type Payload = {/* details of the payload...*/}

function getMeAValue(url: string): Result<Payload, string> {
  if (isMalformed(url)) {
    return Result.err(`The url '${url}' is malformed`);
  }
  
  // do something else to load data from the url
  return Result.ok(data);
}

function render(toRender: string): Result<HTMLElement, string> {
  // if toRender can't generate valid HTML, return Err("invalid HTML");
  // if it can, return Ok(theRenderedHTML);
}

function setDom(html: HTMLElement) {
  
}

// somewhere else in the codebase -- no exception this time!
const badUrl = 'http:/www.google.com';  // missing a slash

// value = Err(The url '${http:/www.google.com}' is malformed)
const value = getMeAValue(badUrl);

// htmlForPage = the same error! or, if it was Ok, could be a different
// `Err` (because of how `andThen` works).
const htmlForPage = value.andThen(render);

// we can't just invoke `setDom` because it doesn't take a `Result`.
value.match({
  Ok: html => setDom(html);
  Err: reason => alert(`Something went seriously wrong here! ${reason}`);
})
```

When we have a `Result` instance, we can perform tons of operations on whether it's `Ok` or `Err`, just as we could with `Maybe.Just` and `Maybe.Nothing`, until we *need* the value. Maybe that's right away. Maybe we don't need it until somewhere else deep in our application! Either way, we can deal with it easily enough, and have type safety throughout!

## Conclusion

Give it a spin!

- `yarn add true-myth`
- `npm install true-myth`
- You can even just `ember install true-myth` and use it if you're using Ember (in which case I encourage you to also use [ember-cli-typescript])

Let me know what you think – if there's stuff missing, [open issues](https://github.com/chriskrycho/true-myth)! And if it's just not to your taste, again, I encourage you to take a look at [Folktale] and [Sanctuary], which are both excellent and land in very different design spaces in many ways.

[ember-cli-typescript]: https://github.com/typed-ember/ember-cli-typescript
