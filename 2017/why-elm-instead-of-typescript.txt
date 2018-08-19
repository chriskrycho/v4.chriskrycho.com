---
Title: Why Elm Instead of TypeScript?
Subtitle: Or, yet another long comment in Slack turned into a blog post.
Date: 2017-04-23 17:20
Tags: [Elm, JavaScript, TypeScript, programming languages, functional programming]
Category: tech

---

A few weeks ago, an acquaintance asked in a Slack channel we're both in:

> Can I ask a noob type Elm / JS question?
>
> Why Elm instead of Typescript? The dev stack and functional programming?

I responded as follows, with only light tweaks to clarify a couple things (and I'll be reusing some of this material as the basis of an internal tech talk I'm giving on the same subject at Olo in a few weeks):

A couple things Elm gives you:

1. It’s not tied to JS directly, which means it’s free to just do what is the best fit for the language rather than needing to be able to express all the quirks and oddities of JS. That’s the single biggest thing I find all the time with TS (which I use every day and do quite like): as good as it is, and as both powerful and expressive as its type system is, at the end of the day it’s… still a superset of JavaScript, and that can mean some really nice things, but it also means a lot of *weird* things.

2. Elm’s type system is *sound*; TypeScript’s is not. At a practical level, that means that if an Elm program type-checks (and thus compiles), you can be *sure* – not mostly sure, 100% sure – that it is free of things like `undefined is not a function`. TypeScript does not (and by design cannot) give you that guarantee. And when I say “by design,” I mean that its designers believed from the outset that soundness was in tension with developer productivity, so they intentionally left a number of “soundness holes” in the type system—there’s still a lot of opportunity for `undefined is not a function`, sad to say. You can make it *less* than in JS… but not none. (That's even still true in the TypeScript 2.x series, though the various soundness flags they added in 2.0 and the `--strict` option [coming in 2.3][strict] do get you closer.) In Elm, you can make it truly *none*. It’s just a sort of known fact at this point that Elm codebases tend to *have zero runtime errors*.

3. Elm’s language design is a huge win.

    1. Elm is a *pure functional language*. Because non-pure things are offloaded to the Elm runtime, every single function *you* write is pure. Same input means the same output.

    2. Elm supports first-class currying and partial application. This makes it much, much easier to do the kind of functional-building-block approach that is natural in FP and which is *attractive* in (but a lot more work in) JS or TS. Example code to show what I mean---

        Javascript:

        ```js
        const add = (a, b) => a + b;
        const add2 = (c) => add(2, c);
        const five = add2(3);
        ```

        Elm:

        ```elm
        add a b = a + b
        add2 = add 2
        five = add2 3
        ```

    3. The combination of the above means that you can refactor and *always be sure you get everything*, which is truly magical. And the compiler errors are the best in the world (and that’s no exaggeration).

The way I’d summarize it is to say that Elm makes it easy to do the right thing and hard or impossible to do the wrong thing. TypeScript makes it possible to do the right thing, and gives you a couple switches you can flip to make it harder to do the wrong things, but will ultimately let you do anything.

[strict]: https://blogs.msdn.microsoft.com/typescript/2017/04/10/announcing-typescript-2-3-rc/