# The Future of JavaScript
## ES2015, ES2016, and Hopes for ES2017 and Later

------

## History

- JavaScript: NetScape 1995

------

## Names

(You know, one of the hardest problems in computer science...)

- "JavaScript"
- "ECMAScript"

------

# Block-scoping
## `let` and `const`

------

## The problem: hoisting

```javascript
console.log(a);  // throws a `ReferenceError`
```

but...

```javascript
console.log(a);  // `undefined`, not an error.
var a = "defined here";
```

------

![What?](http://i2.kym-cdn.com/photos/images/original/000/874/569/852.gif)

------

### Another example

```javascript
var someVariable = "Outside";

function demonstrateHoisting() {
  someVariable = "Does it override? NOPE."
  console.log(someVariable);
  var someVariable;  // gets hoisted, so it *shadows* the global.
}

console.log(someVariable);  // Outside
demonstrateHoisting();  // Does it override? NOPE.
console.log(someVariable);  // Outside
```

------

These two have ***the same behavior*** in old JavaScript:

```javascript
var a = "Set it sanely";

b = "Set it not so sanely";
var b;
```

`var` declarations get processed *first* in the interpretation/compilation
process for JS. Quirky and weird.

------

### Blocks are weird, too

What does this do?

```javascript
console.log(b);
if (true) {
  var b = "Something spooky!";
}
console.log(b);
```

<!-- .element: class="fragment" data-fragment-index="1" -->
It logs `undefined`, then `Something spooky!`, not a thrown `ReferenceError`.

<!-- .element: class="fragment" data-fragment-index="2" -->
`var` declarations are hoisted to the top of a *function* scope (or module, or
global, depending on context!).

------

## In ES2015

Two new, *block-level* scope declarators, which behave the way you would expect
coming from other languages.

-   `let`
-   `const`

Earlier examples become *normal* using either `let` or `const`.

------

### `let`

No hoisting:

```javascript
console.log(nineToDaleks);  // throws a `ReferenceError`
let nineToDaleks = 'I said no. It means no.';
```

Block scoping:

```javascript
console.log(tenToDonna);  // throws a `ReferenceError`
if (true) {
  var tenToDonna = "TARDIS. Time Lord. Yeah";
}
console.log(tenToDonna);  // *also* throws a `ReferenceError`
```

------

### `const`

`const` is just like `let`, but is a *constant binding*.

```javascript
let a = 10;
a = "This is a fighting hand!";
console.log(a);  // This is a fighting hand!

const b = 12;
b = "These are attack eyebrows!";
console.log(b);  // 12
```

That last one isn't (yet) an error anywhere. (JS is not C♯)

------

### `const` and immutability

**Very important:**

-   `const` does **not** indicate constant *value* or *data*
-   `const` indicates constant ***binding***

```javascript
// Legal
const doctor = { regeneration: 10, age: 900 };
doctor.regeneration = 11;
doctor.age = 907;

// Illegal, won't work (in compliant browsers)
doctor = { regeneration: 12, age: 2100 };
```

<!-- .element: class="fragment" data-fragment-index="1" -->
For immutability, you want `Object.freeze(doctor)` instead.

------

#### Caveats

-   Safari (up through 9.x) doesn't enforce `const` bindings
-   *No* support yet in Edge
-   Chrome and Firefox enforce the behavior... but don't *tell* you that they're
    enforcing it, so you can write the wrong thing; it just won't work.

<!-- .element: class="fragment" data-fragment-index="1" -->
![Ah](http://i.imgur.com/tRHpLOT.gif)

<!-- .element: class="fragment" data-fragment-index="2" -->
For now, we'll get around this via *transpilation*. (More on this below.)

------

## Block Scoping: Summary

Use `let` or `const` instead of `var`.

There is essentially no reason to use `var` if you can write ES2015.

------

# Arrow-functions
## Or: how `this` just `=>` both easier and harder
