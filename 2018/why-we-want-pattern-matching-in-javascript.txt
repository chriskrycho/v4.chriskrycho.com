---
Title: Why We Want Pattern-Matching in JavaScript
Subtitle: A worked example, showing how much it can <em>clarify</em> code.
Date: 2018-09-23 13:00
Modified: 2018-09-24 18:10
Category: tech
Tags: [javascript, programming languages]
Summary: >
    A worked example of transforming if/else statements to the proposed pattern-matching syntax, showing how much pattern-matching can clarify (as well as shorten) complicated code.

---

I've often noted how much I want the [JavaScript pattern-matching proposal][proposal] to land. I noted in conversation with some people recently, though, that it's not always obvious *why* it will be so helpful. Similarly, [Dave Herman] recently noted to me that [DHH]'s mantra of "Show me the code" is a really helpful tool for thinking about language design. (I tend to agree!) So with that in mind, here’s a piece of example code from the Ember app I work on today, very slightly modified to get at the pure essentials of this particular example.[^1]

[proposal]: https://github.com/tc39/proposal-pattern-matching
[Dave Herman]: https://twitter.com/littlecalculist
[DHH]: https://twitter.com/dhh

The context is a <abbr>UI</abbr> component which shows the user their current discount, if any, and provides some nice interactivity if they try to switch to a different discount.

First, some types that we’ll use in the example, which I use in the actual component to avoid the problems that inevitably come with using string values for these kinds of things. Linters like ESLint or type systems like TypeScript or Flow will catch typos this way, and you’ll also get better errors at runtime even if you’re not using a linter or a type system![^2]

```js
const DiscountTypes = {
  Offer: 'Offer',
  Coupon: 'Coupon',
  None: 'None',
};

const Change = {
  OfferToOffer: 'OfferToOffer',
  OfferToCoupon: 'OfferToCoupon',
  CouponToCoupon: 'CouponToCoupon',
  CouponToOffer: 'CouponToOffer',
};
```

Now, we set up a component which has a little bit of internal state to track the desired change before we submit it, which we display differently based on what the value of the [<abbr>ES5</abbr> getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) for `change` is here: 

```js
class DiscountComponent {
  constructor(currentDiscountType) {
    this.currentDiscountType = currentDiscountType;
    this.newDiscountType = null;
  }

  changeDiscount(newDiscountType) {
    this.newDiscountType = newDiscountType;
  }

  submitChange() {
    // logic for talking to the server
  }

  get change() {
    const { currentDiscountType, newDiscountType } = this;

    if (currentDiscountType === DiscountTypes.Offer) {
      if (newDiscountType === DiscountTypes.Offer) {
        return Change.OfferToOffer;
      } else if (newDiscountType === DiscountTypes.Coupon) {
        return Change.OfferToCoupon;
      } else if (newDiscountType === DiscountTypes.None) {
        return null;
      } else {
        assertInDev(
          `Missed a condition: ${currentDiscountType}, ${newDiscountType}`
        );
      }
    } else if (currentDiscountType === DiscountTypes.Coupon) {
      if (newDiscountType === DiscountTypes.Offer) {
        return Change.CouponToOffer;
      } else if (newDiscountType === DiscountTypes.Coupon) {
        return Change.CouponToCoupon;
      } else if (newDiscountType === DiscountTypes.None) {
        return null;
      } else {
        assertInDev(
          `Missed a condition: ${currentDiscountType}, ${newDiscountType}`
        );
      }
    } else if (currentDiscountType === DiscountTypes.None) {
      return null;
    } else {
      assertInDev(
        `Missed a condition: ${currentDiscountType}, ${newDiscountType}`
      );
    }
  }
}
```

Here's the *exact* same semantics for computing the `change` value we’re interested, but with pattern matching:

```js
class DiscountComponent {
  // ...snip

  get change() {
    case ([this.currentDiscountType, this.newDiscountType]) {
      when [DiscountTypes.Offer, DiscountTypes.Offer] ->
        return Change.OfferToOffer;
      when [DiscountTypes.Offer, DiscountTypes.Coupon] ->
        return Change.OfferToCoupon;
      when [DiscountTypes.Coupon, DiscountTypes.Offer] ->
        return Change.CouponToOffer;
      when [DiscountTypes.Coupon, DiscountTypes.Coupon] ->
        return Change.CouponToCoupon;
      when [DiscountTypes.None, ...] || [..., DiscountTypes.None] ->
        return null;
      when [...] ->
        assertInDev(
          `Missed a condition: ${currentDiscountType}, ${newDiscountType}`
        );
    }
  }
}
```

The difference is stark. It’s not just that there are fewer lines of code, it’s that the actual intent of the code is dramatically clearer. (And while I’ve formatted it for nice display here, those are all one-liners in my normal 100-characters-per-line formatting.)

My preference would be for pattern-matching to have expression semantics, so you wouldn’t need all the `return` statements in the mix—and it's *possible*, depending on how a number of proposals in flight right now shake out, that it still will. Even if pattern matching doesn’t ultimately end up with an expression-based syntax, though, we can still get a lot of those niceties if the `do`-expression proposal lands:

```js
class DiscountComponent {
  // ...snip

  get change() {
    return do {
      case ([this.currentDiscountType, this.newDiscountType]) {
        when [DiscountTypes.Offer, DiscountTypes.Offer] ->
          Change.OfferToOffer;
        when [DiscountTypes.Offer, DiscountTypes.Coupon] ->
          Change.OfferToCoupon;
        when [DiscountTypes.Coupon, DiscountTypes.Offer] ->
          Change.CouponToOffer;
        when [DiscountTypes.Coupon, DiscountTypes.Coupon] ->
          Change.CouponToCoupon;
        when [DiscountTypes.None, ...] || [..., DiscountTypes.None] ->
          null;
        when [...] ->
          assertInDev(
            `Missed a condition: ${currentDiscountType}, ${newDiscountType}`
          );
      }
    }
  }
}
```

Again, this is profoundly clearer about the intent of the code, and it’s far easier to be sure you haven’t missed a case.[^3]

[^1]:	`assertInDev` looks a little different; we're actually using the `Maybe` type from my [True Myth](https://github.com/chriskrycho/true-myth) library instead of returning `null`; it’s an Ember app; as such it uses a `@computed` decorator; and of course it’s all in TypeScript. I chose to write it with standard JavaScript to minimize the number of things you have to parse as a reader.

[^2]:	In the actual TypeScript, these are defined with an [`enum`](http://www.typescriptlang.org/docs/handbook/enums.html).

[^3]:	Fun fact: the original code actually *had* missed a number of cases, which I  learned only because TypeScript’s `strictNullChecks` setting informed me.
