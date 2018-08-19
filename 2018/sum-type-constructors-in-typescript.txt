---
Title: Sum Type Constructors in TypeScript
Subtitle: Or, making TypeScript into a terrible ML because I can’t use Elm in my day job.
Category: Tech
Tags: [elm, typescript, programming languages]
Date: 2018-05-31 07:00
Summary: >
    You can build the same kind of sophisticated discriminated union types in TypeScript as you'd get in Elm or F♯. Kind of. With a lot of work. (Here’s how.)
---

A pretty common pattern I've seen is to have three basic states for some kind of <abbr>HTTP</abbr> request: *loading*, *failure*, and *success*. Since each of these has its own associated date, it's a really good fit for a discriminated union or sum type. In a language like Elm (or F^♯^ or Haskell or PureScript or…) you'd write that basically like this:

```elm
module Fetch exposing (State)

type alias HTTPStatusCode = Int
type alias ErrorData = { code: HTTPStatusCode, reason: String }

type State a
    = Loading
    | Failure ErrorData
    | Success a
```

Because I find that pattern extremely helpful, I've at times gone out of my way to replicate it in TypeScript. And what you get is… verbose. It's a necessary evil, given what TypeScript is doing (layering on top of JavaScript), and so much so that I wouldn't actually recommend this unless you're already doing this kind of programming a lot and find it pretty natural. If you are, though, here's how you get the equivalent of those four lines of Elm in TypeScript:

```typescript
type HttpStatusCode = number;

export enum Type { Loading, Failure, Success }

export class Loading {
  readonly type: Type.Loading = Type.Loading;

  static new() {
    return new Loading();
  }
}

type ErrorData = { code: HttpStatusCode, reason: string };

export class Failure {
  readonly type: Type.Failure = Type.Failure;
  constructor(readonly value: ErrorData) {}

  static new(value: ErrorData) {
    return new Failure(value);
  }
}

export class Success<T> {
  readonly type: Type.Success = Type.Success;
  constructor(readonly value: T) {}

  static new<A>(value: A) {
    return new Success(value);
  }
}

export type FetchState<T> = Loading | Failure | Success<T>;
export const FetchState = {
  Type,
  Loading,
  Failure,
  Success,
};

export default FetchState;
```

That's a *lot* more code to do the same thing. Even if you dropped the static constructors—which you really don't want to do, because then you can't use them in a functional style but *have* to use `new Loading()` or whatever to construct them.

You can make this work. And I do. And honestly, it's amazing that TypeScript can do this at all—a real testament to the sophistication of the TypeScript type system and the ingenuity that has gone into it.

But have I mentioned recently that I'd *really* prefer to be writing something like F^♯^ or Elm than TypeScript?
