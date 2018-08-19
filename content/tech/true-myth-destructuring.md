---
Title: Destructuring with True Myth 1.3+
Subtitle: A thing I didn't even realize I could do until after I published it.
Date: 2018-05-19 12:20
Tags: [functional programming, typescript, open source software, libraries, true myth]
Summary: >
    Making the value and error properties available means you can now use destructuring.

---

I just realized a neat capability that [True Myth 1.3+](#) unlocks: you can now use destructuring of the `value` property on `Just` and `Result` and the `error` property on `Error` instances.

With `Maybe` instances:

```ts
import Maybe, { just, nothing, isJust } from 'true-myth/maybe';

const maybeStrings: Maybe<string>[] =
  [just('hello'), nothing(), just('bye'), nothing()];

const lengths = maybeStrings
  .filter(Maybe.isJust)
  .map(({ value }) => value.length);
```

With `Result` instances:

```ts
import Result, { ok, err } from 'true-myth/result';

const results: Result<number, string>[] =
  [ok(12), err('wat'), err('oh teh noes'), ok(42)];

const okDoubles = results
  .filter(Result.isOk)
  .map(({ value }) => value * 2);

const errLengths = results
  .filter(Result.isErr)
  .map(({ error }) => error.length);
```

None of this is especially novel or anything. It was just a neat thing to realize after the fact, because it wasn’t something I had in mind when I was making these changes! [^1]

[^1]:	This was a very strange experience. There’s nothing quite like learning something about a library *you wrote*.
