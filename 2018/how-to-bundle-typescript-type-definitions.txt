---
Title: How To Bundle TypeScript Type Definitions
Subtitle: If your consumers have to use compiler options, they will be very sad.
Date: 2018-05-21 07:00
Tags: [typescript, programming languages, true myth]
Summary: >
    Create a custom build that puts the type definitions in the root of your package, instead of putting them alongside the compiled JavaScript files. Because if your consumers have to use compiler options, they will be very sad.

---

One of the lessons that led to the True Myth 2.0.0 release was the difficulty of consuming the library under its original packaging strategy. There are a few things that are *not* obvious about how TypeScript type definitions get consumed when you’re first starting out, and a few things that seem like they should work *don’t*. This is my attempt to help *you* (and the people consuming your TypeScript libraries!) avoid the same pain I (and the people consuming mine) have felt.

## The Problem

The problem is the result of the ways TypeScript resolves type definitions, and the kinds of type definition files it can (and cannot) generate for you.

TypeScript only properly resolves two kinds of type definition distributions automatically:

- A single-file type definition, located anywhere in the package as long as `package.json` has a `types` key pointing to it.
- Type definition module files in the *root* of the distributed package, mapping to the distributed modules of the package (wherever they live).

TypeScript will only generate a single-file type definition for the <abbr>AMD</abbr> and SystemJS standards—which *cannot* be imported with ES6 module imports. If you want to use an output mode which generates a JS file per originating TS file—Node, ES6, etc.—you will get individual TS module file type definitions as well. It is not that the type definition files themselves can’t be written to support Node or ES6-style module layouts in a single-file definition. To the contrary: hand-written definitions for libraries *often* do just that. It is just a matter of what the compiler supports generating.

The net of this is: if you want module type definitions to go with ES6 modules to import, they *must* live in the root of your distributed bundle.

However, most libraries I’m familiar with—because I work in the *browser* ecosystem, not the *Node* ecosystem—do not work with the root of their repository as the place where their source lives, or for the place where the output of their build process lives. It’s far more common to have a `src` directory and `dist` or `build` directory, the latter of which is where the build artifacts go.

## The Solution

The solution—which we shipped for ember-cli-typescript some time ago, and which I switched to this past week for True Myth—is to have separate build artifacts for the type definitions and the JavaScript output. Put the JavaScript output in the `dist` or `build` directory as usual, without type declarations. Then, put the type definitions in the root of the repository.

In the case of both ember-cli-typescript and True Myth, we’re doing the type generation step in the `prepublishOnly` hook and cleaning it up in the `postpublish` hook. Your `package.json` might look like something like this, assuming your `tsconfig.json` is set to generate JavaScript artifacts in `dist` as your build directory.

```json
{
  "scripts": {
    "ts:js": "tsc",
    "ts:defs": "tsc --declaration --outDir . --emitDeclarationOnly",
    "prepublishOnly": "yarn ts:js && yarn ts:defs",
    "postpublish": "rm -r *.d.ts dist"
  }
}
```

(If you have nested modules, your `postpublish` hook there should clean up the generated folders as well as the generated files.)

You can see the full setup I built for True Myth—which generates type defs along these lines, as well as both CommonJS and ES6 modules—in the repository:

- [`package.json`](https://github.com/chriskrycho/true-myth/blob/v2.0.0/package.json)—note especially the [`"scripts"`](https://github.com/chriskrycho/true-myth/blob/v2.0.0/package.json#L32:L42) configuration
- [root `tsconfig.json`](https://github.com/chriskrycho/true-myth/blob/v2.0.0/tsconfig.json), with derived[CommonJS `tsconfig.json`](https://github.com/chriskrycho/true-myth/blob/v2.0.0/ts/cjs.tsconfig.json) and [ES6 `tsconfig.json`](https://github.com/chriskrycho/true-myth/blob/v2.0.0/ts/es.tsconfig.json) files.

----

This isn’t an especially complicated thing, but the scenario leading to the need for this is common enough, and the dance frustrating enough and easy enough to get wrong, that I really wish the TypeScript team would make it possible to generate single-file type definitions for *all* kinds of JavaScript module systems.
