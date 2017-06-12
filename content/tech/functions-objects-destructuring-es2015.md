---
Title: Functions, Objects, and Destructuring in JavaScript
Subtitle: On functions in JS and some fun bits in ES2015 in particular
Date: 2017-03-27 18:00
Category: tech
Tags: javascript
---

<i class=editorial>A colleague just getting his feet wet with JavaScript, and coming from a background with much more C# than JavaScript, sent me a question on Slack the other day, and I realized the answer I'd written up was more generally helpful, so here you go!</i>

I'm including the context of original question because I want to call out something really important: there are no dumb questions. When you're just coming up to speed on *any* technology, stuff is going to be confusing. That goes double when making the jump as far as between something like C# and something like modern JS.

> Hey this may be a really dumb question
> 
> but I'm a JavaScript n00b, and I have no idea what's going on here
> 
> I'm not used to this syntax
> 
> I have this program:
> 
> ```js
> function ab() {
>    function fa() { console.log("A"); };
>    function fb() { console.log("B"); };
>    return {fa, fb};
> };
>
> let {fa, fb} = ab();
> 
> fa();
> fb();
> ```
> 
> and it outputs
> ```
> A
> B
> ```
> 
> (as expected)
>
> What I don't understand is the syntax for the `let` part (or maybe even the return from `ab()`)
>
> A) What is `ab()` actually returning? An object with 2 function pointers?
> 
> B) What can't I do a `let {a, b} = ab()` and then call `a()` and `b()`? I get syntax errors that `a` and `b` aren't defined
>
> _edit to show code that doesn't work (definition of ab() remains the same):_
> ```js
> let {a, b} = ab();
> 
> a(); // will throw an error here
> b();
> ```
>
> I don't understand why the names for `fa` and `fb` have to be the same across all scopes/closures (? am I using those terms correctly? JavaScript is an odd dance partner at times)

---

First, your (A) is *basically* correct, but the phrase "function pointers" is one you should banish from your mind entirely in this context. In JavaScript, functions are just items like any other. From the language's perspective, there's no difference between these things other than what you can do with them:

```js
let foo = "a string";
function quux(blah) { console.log("blah is " + blah); }
let bar = quux;
```

Both `foo` and `bar` are just variables. (`quux` is a variable, too, but it behaves a little differently; I'll cover that in a minute.) They have different types, and therefore different things you can do on them. `foo` has the `length` property and a bunch of string-specific methods attached. `bar` is callable. But both of them are just *things* in the same way, and at the same level in the program.

So in your original `function ab() { ... }`, what you're doing is declaring two functions, `fa` and `fb`, and returning them attached to an object.

For various reasons which aren't especially interesting, functions can have *names*...

```js
function fa() { ... }
```

...and can be *assigned to other variables*...

```js
let trulyISayToYou = function waffles() { console.log("are so tasty"); };
```

...and in fact you can define the functions *themselves* anonymously, that is, without any name attached to the function declaration itself: combine those:

```js
let lookMa = function() { console.log("no function name!"); };
```

Doing `function ab() { ... }` simultaneously *declares* the function and *hoists* it, that is, it makes it available in that entire scope, regardless of where it is defined. So you can do this, even though it's kind of insane most of the time and you shouldn't:

```js
quux();
function quux() { console.log('SRSLY?'); }
```

---

Now, about returning `fa` and `fb` from the function.

First, note that you normally define objects in a long form, like so:

```js
let someObject = {
  a: true,
  b: 'some string'
};

console.log(someObject.a);  // prints true
console.log(someObject.b);  // prints "some string"
```

However, very, *very* often, you find yourself doing something like this:

```js
// do some work to define what `a` and `b` should be, then...
let someObject = {
  a: a,
  b: b
};
```
Because this is such a common pattern, the 2015 version of JS introduced a "shorthand," which lets you just write that last assignment like this:

```js
let someObject = {
  a,
  b
};
```
And of course, for convenience we often write that on one line:

```js
let someObject = { a, b };
```

Then you can combine that with the fact that you declared two items (functions, but again: that *really* doesn't matter, they could be anything) with the names `fa` and `fb`, and what you're doing is returning an object containing those two items in it: `return {fa, fb}` is equivalent to this:

```js
let theFunctions = {
  fa: fa,
  fb: fb, 
};
return theFunctions;
```

---

What about the `let` assignment?

JS has three kinds of name bindings: `var`, `let`, and `const`. `var` bindings act like `function`: the names you use get "hoisted". So:

```js
console.log(neverDefined);  // throws an error
console.log(definedLater);  // prints undefined
var definedLater = "what";
console.log(definedLater);  // prints "what"
```

`let` and `const` behave much more like you'd expect: they're only valid *after* they're defined, and they're scoped to the blocks they appear in. (`var` will escape things like `if` blocks, too. It's crazy-pants.) The difference between `let` and `const` is that they create *mutable* or *immutable* *bindings* to a name.

So `let a = true;` is just creating a name, `a`, and binding the value `true` to it. Likewise, with `const b = false;` it's creating a name, `b`, and binding the value `false` to it. And those *won't* be hosted. Now, having done `let a = true;` we could on the next line write `a = false;` and that's fine: `let` bindings are mutable; they can change. We'll get an error if we try to do `b = true;` though, because `const` bindings are *not* mutable.

One thing to beware of with that: things like objects and arrays, being reference types, are not themselves created as immutable when you use `const`. Rather, the specific *instance* is immutably bound to the name. So:

```js
const foo = { a: true };
foo.b = 'I can add properties!';  // okay
delete foo.a;  // okay
foo = { c: "assign a new object" };  // will error
```

You can change the internals of the item bound to the name, but not assign a new item to the name. For value types (numbers, booleans, etc.), that makes them behave like *constants* in other languages. You have to use something like `Object.freeze` to get actually constant object types.

That was a long digression to explain what you're seeing in a general sense with `let`.

---

Finally, let's come back around and talk about that assignment and why you need the names `fa` and `fb`.

As noted, `ab()` returns an object with two items attached, `fa` and `fb`. (And again: functions are *just* items in JS.) So you could also write that like this:

```js
let theFunctions = ab();  // theFunctions is now the object returned
theFunctions.fa();  // and it has the `fa` item on it
theFunctions.fb();  // and the `fb` item, too
```

Of course, if your original `ab()` function had returned other properties, they'd be accessible there, too, in just the same way (though they wouldn't be callable if they weren't functions).

Again, this is a super common pattern: you want to immediately do something with the values returned on an object by some function, and you don't necessarily want to type out the name of the object every time. So ES2015 introduced *destructuring* to help with this problem. I'll do it without the function in the way to show how it works at the simplest level first.

```js
let someObject = {
  foo: 'what is a foo anyway',
  bar: 'hey, a place to drink *or* a thing to hit people with',
  quux: 'is this like a duck'
};

console.log(someObject.foo);  // etc.
```

Now, if we wanted to get at `foo`, `bar`, and `quux`, we could always do that with `someObject.quux` and so on. But, especially if we have some large object floating around, we often just want a couple properties from it—say, in this case, `foo` and `quux`. We could do that like this:

```js
let foo = someObject.foo;
let quux = someObject.quux;
```
And of course those new names *don't* have to match:

```js
let whatever = someObject.foo;
let weLike = someObject.quux;
```

However, because wanting to snag just a couple items off of objects like this is so common, the shorthand is available. In the case of the shorthand for *destructuring*, just like the case of the shorthand for object creation, the names have to match: otherwise, it wouldn't know what to match them with.

```js
let { foo, quux } = someObject;
```

So, going back to your original example: `ab()` returns an object which has the items `fa` and `fb` on it. You're using the destructuring assignment there to get just `fa` and `fb`. There's no reason they *have* to be those names in the outer scope, other than that you're using the destructuring assignment. You could also do this:

```js
let theFunctions = ab();
let oneOfThem = theFunctions.fa;
let theOtherOne = theFunctions.fb;
oneOfThem();  // does what fa() does
theOtherOne();  // does what fb() does
```

---

I *think* that covers everything your questions brought up; but please feel free to ask more!

The most important thing to take away is that even though yes, those are pointers to functions under the hood, in JS that's *absolutely* no different than the fact that there are pointers to objects and arrays under the hood. Functions are just more items you can do things with. You can put them on objects, you can return them directly, you can take them as arguments, etc.

Hopefully that's helpful!

---

Bonus content: in ES2015 and later, you can also define anonymous functions like this:

```js
let someFunction = (someArg) => { console.log(someArg); };
```

This has some interesting side effects about the value of `this` in the body of the function you declare... but that's for another time.