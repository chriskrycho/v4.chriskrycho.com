---
Title: True Myth 2.1.0 Released
Subtitle: A bunch of neat new utility functions on Maybe for arrays and tuples.
Date: 2018-09-02 16:25
Updated: 2018-09-02 16:30
Category: Tech
Tags: [TypeScript, functional programming, monads, libraries, software development, open source software, True Myth]
Summary: >
    A bunch of neat new utility functions on Maybe for arrays and tuples.

---


I’ve just released True Myth 2.1.0 ([source](https://github.com/chriskrycho/true-myth/tree/v2.1.0), [docs](https://true-myth.js.org)), which includes a handful of new utility functions for use with the `Maybe` types and arrays or tuples. Note that to make use of these you’ll need to be on at least TypeScript 3.0: they take advantage of the some of the shiny new features in the type system!

**Edit:** and, five minutes later, versions 2.1.1 and 2.1.2 are out with bugfixes consisting of "I forgot to export two functions. Now they're exported." Because that's how this *always* works, right?

Here’s what’s new:

- **`Maybe.find`:** for those times when you want to do `Array.prototype.find` and would love to not have to wrap up the result with a `Maybe` explicitly every time. As with most functions in True Myth, it’s curried so you can easily use it in a functional programming style.

	```ts
	import Maybe from 'true-myth/maybe';

	let foundRegular = Maybe.find(n => n > 1, [1, 2, 3]);
	console.log(foundRegular.toString());  // Just(2)

	let notFound = Maybe.find(n = n < 1, [1, 2, 3]);
	console.log(notFound.toString());  // Nothing

	let findAtLeast5 = Maybe.find((n: number) => n > 5);
	let foundCurried = findAtLeastFive([2, 4, 6, 8, 10]);
	console.log(foundCurried.toString());  // Just(6)
	```

- **`Maybe.head` (aliased as `Maybe.first`):** for getting the first item of an array safely. Like lodash’s `_.head` (or `someArray[0]`) but it returns a `Maybe` instead of possibly giving you back `undefined`.

	```ts
	import Maybe from 'true-myth/maybe';

	let empty = Maybe.head([]);
	console.log(empty.toString());  // Nothing

	let hasItems = Maybe.head([1, 2, 3]);
	console.log(hasItems.toString());  // Just(1)
	```

- **`Maybe.last`:** the same as `Maybe.head`, but for getting the *last* element in an array.

	```ts
	import Maybe from 'true-myth/maybe';

	let empty = Maybe.last([]);
	console.log(empty.toString());  // Nothing

	let hasItems = Maybe.last([1, 2, 3]);
	console.log(hasItems.toString());  // Just(3)
	```

- **`Maybe.all`:** for converting an array of `Maybe`s to a `Maybe` of an array. If you have an array whose contents are all `Maybe`s, it’s sometimes useful to be able to flip that around so that if all of the items are `Just`s, you get back a single `Just` wrapping the array of the values which were wrapped in all the `Just`s in the array, but if any were `Nothing`, the whole thing is a single `Nothing`. This works for both heterogeneous and homogenous arrays, which is pretty cool. A code sample will make this a lot clearer:

	```ts
	import Maybe, { just, nothing } from 'true-myth/maybe';

	let includesNothing = Maybe.all(just(2), nothing<string>());
	console.log(includesNothing.toString());  // Nothing

	let allJusts = Maybe.all(just(2), just('hi'), just([42]));
	console.log(allJusts.toString());  // Just([2, 'hi', [42]]);
	```

	The resulting type of both `includesNothing` and `allJusts` here is `Maybe<Array<string | number | Array<number>>>`.

- **`Maybe.tuple`:** just like `Maybe.all` except it works in tuples (preserving their types’ order) for up to five-item tuples. (As the docs I wrote say: if you’re doing a larger tuple than that I don’t want to know what you’re doing but I won’t help with it!)

	```ts
	import Maybe, { just, nothing } from 'true-myth/maybe';

	type Tuple = [Maybe<number>, Maybe<string>, Maybe<number[]>];

	let tupleWithNothing: Tuple = [just(2), nothing(), just([42])];
	let tupleResult = Maybe.tuple(tupleWithNothing);
	console.log(tupleResult.toString());  // Nothing

	let allJusts: Tuple = [just(2), just(), just([42])];
	```

	These have the same *output* (i.e. the same underlying representation) as the array output, but a different type. The resulting type of both `includesNothing` and `allJusts` here is `Maybe<[number, string, Array<number>]>`.

Once TypeScript 3.1 is out, I should be able to collapse these into a single `all`, and `tuple` will just become an alias for it.
