# TDD-ing a <br>Small Ember Feature
## How to test-drive through a feature with Ember's test tools

- - - - -

## What is TDD?

- No: test-after-implementation<!-- .element: class="fragment" data-fragment-index="1" -->
    + May help prevent regression<!-- .element: class="fragment" data-fragment-index="1" -->
    + But fragile<!-- .element: class="fragment" data-fragment-index="1" -->

- Yes: Use tests to think through design<!-- .element: class="fragment" data-fragment-index="2" -->
    + We have to do the design work anyway<!-- .element: class="fragment" data-fragment-index="2" -->
    + Using TDD means we know when we're done<!-- .element: class="fragment" data-fragment-index="2" -->

- - -

### What is TDD: An Outside-In Approach

Start from the outside and work in:
application→components→functions

1. Define high-level interactions (routes, etc.)
2. Define user interface interactions (click/fill/etc.)
3. Define programmatic interfaces (for services, actions, etc.)

- - - - -

## Testing in Ember

Three kinds of tests:

- **Acceptance** tests: *application*
- **Integration** tests: *components*
- **Unit** tests: *functions*

- - -

### Testing in Ember: Acceptance Tests

All about testing the application from an interaction standpoint.

- Visit URLs and navigate around the app
- Interact with items on the page
- Helpers available for...
    + Navigation
    + Filling forms
    + Clicking things
    + Dealing with asynchrony

- - -

### Testing in Ember: Integration Tests

All about testing isolated user interface *components*.

- Does it render correctly?
- Does it handle different arguments correctly?

- - -

### Testing in Ember: Unit Tests

All about testing *functions*.

- - -

### Testing in Ember: The Future

- There's a better set of test tools coming. <!-- .element: class="fragment" data-fragment-index="1" -->
- Ember RFC: Grand Testing Unification <!-- .element: class="fragment" data-fragment-index="2" -->
    + [Text][gtu-text]
    + [Discussion][gtu-discussion]

[gtu-text]: https://github.com/rwjblue/rfcs/blob/42/text/0000-grand-testing-unification.md
[gtu-discussion]: https://github.com/emberjs/rfcs/pull/119

- - -

### Testing in Ember: Outside-In

1. Write acceptance tests.<!-- .element: class="fragment" data-fragment-index="1" -->
2. Write integration tests for components.<!-- .element: class="fragment" data-fragment-index="2" -->
3. Write unit tests for services, mixins, and component "actions"<!-- .element: class="fragment" data-fragment-index="3" -->

- - -

### Testing in Ember: Outside-In
#### 1. Acceptance Tests

- *Cover the acceptance criteria with individual tests.*
- Identify required routes and interactions
- Generate the routes, fill in the templates.

*Status:* <!-- .element: class="fragment" data-fragment-index="1" -->

Most of your tests will still be failing. <!-- .element: class="fragment" data-fragment-index="1" -->

- - -

### Testing in Ember: Outside-In
#### 2. Integration Tests

- Write components UI to pass integration UI tests
- Identify required services, mixins, etc.

*Status:* <!-- .element: class="fragment" data-fragment-index="1" -->

- Some acceptance tests may be passing now.<!-- .element: class="fragment" data-fragment-index="1" -->
- Some components will be simple enough that hey pass, too. <!-- .element: class="fragment" data-fragment-index="1" -->
- Lots of pieces will still be failing.<!-- .element: class="fragment" data-fragment-index="1" -->

- - -

### Testing in Ember: Outside-In
#### 3. Unit Tests

- Write tests for APIs for services, mixins, component actions, etc.
- Implement the services, mixins, etc.

*Status:* <!-- .element: class="fragment" data-fragment-index="1" -->

At this point, everything should be passing. <!-- .element: class="fragment" data-fragment-index="1" -->

But sometimes you have to repeat phases. Iteration is normal. <!-- .element: class="fragment" data-fragment-index="2" -->

- - - - -

# Walkthrough

## Custom menubar nav links

(I actually built this within the last two weeks.)

(Also, it's going to be lots of code---but I'll keep it in small chunks.)

- - - - -

### Custom menubar nav links: Acceptance Tests

```sh
$ ember generate acceptance-test custom-nav-menu-link
version: 2.4.2
installing acceptance-test
  create tests/acceptance/custom-nav-menu-link-test.js
```

(Shhhh: I actually ran this from inside Atom, and could have done it from inside a JetBrains IDE, too. The tools are good.)

- - -

### Acceptance Tests
#### Start with a stub...

It generates the default stub:

```js
import { test } from 'qunit';
import moduleForAcceptance from 'mobile-web/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | custom nav menu link');

test('visiting /custom-nav-menu-link', function(assert) {
  visit('/custom-nav-menu-link');

  andThen(function() {
    assert.equal(currentURL(), '/custom-nav-menu-link');
  });
});
```

- - -

### Acceptance Tests
#### Stub out acceptance criteria

```js

import { test } from 'qunit';
import moduleForAcceptance from 'mobile-web/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | custom nav menu link');

test('when there are no custom nav-menu dictionary elements', function(assert) {
  visit('/');
  andThen(() => {
    assert.ok(false, 'TODO');
  });
});

test('when there are custom nav-menu dictionary elements', function(assert) {
  visit('/');
  andThen(() => {
    assert.ok(false, 'TODO')
  });
});
```

- - -

### Acceptance Tests
#### Fill out acceptance criteria (negative)

```js
test('when there are no custom nav-menu dictionary elements', function(assert) {
  visit('/');
  andThen(() => {
    const customElements = find(testSelector('navMenuCustomElements'));
    assert.equal(customElements.length, 0, 'There are no one custom elements');
  });
});
```

(I *always* write negative versions of the acceptance criteria.)<!-- .element: class="fragment" data-fragment-index="1" -->

- - -

### Acceptance Tests
#### Fill out acceptance criteria (positive)

```js
test('when there are custom nav-menu dictionary elements', function(assert) {
  // TODO: set MOBILE_NUTRITIONAL_LABEL
  // TODO: set MOBILE_NUTRITIONAL_HTML

  visit('/');
  andThen(() => {
    const customElements = find(testSelector('navMenuCustomElements'));
    assert.equal(customElements.length, 1, 'There is one custom element');
    assert.equal(customElements.text().trim(), "What's in your food, bro?");
    assert.equal(customElements.children('a').attr('href'), '#food-links');
  });
});
```

- - -

### Acceptance Tests
#### Further analysis

What do we know now?

- We need to stub out a response for the dictionary elements.
- We need to render the custom element(s) on the page.

- - -

### Acceptance Tests
#### Further analysis (cont'd.)

What don't we know now?

- The total list of these kinds of elements (clients can ask for more)<!-- .element: class="fragment" data-fragment-index="1" -->
- Therefore: the number of items in the list<!-- .element: class="fragment" data-fragment-index="2" -->

We need to wrap this up nicely somehow<!-- .element: class="fragment" data-fragment-index="3" -->

- - -

### Acceptance Tests
#### Refinement (i)

Make constants to use later.

```js
test('when there are custom nav-menu dictionary elements', function(assert) {
  // TODO: set MOBILE_NUTRITIONAL_LABEL response on server.
  // TODO: set MOBILE_NUTRITIONAL_HTML response on server.
  const MOBILE_NUTRITIONAL_HTML = '#food-links';
  const MOBILE_NUTRITIONAL_LABEL = 'Just what do they put in this?';
  const NUTRITION = `<a href='${MOBILE_NUTRITIONAL_HTML}'>${MOBILE_NUTRITIONAL_LABEL}</a>`;

  const toRender = [NUTRITION];

  // ...
});
```

- - -

### Acceptance Tests
#### Refinement (ii)

Rewrite the actual expectation so it accounts for this.

```js
test('when there are custom nav-menu dictionary elements', function(assert) {
  // ...

  visit('/');
  andThen(() => {
    const customElements = find(testSelector('navMenuCustomElements'));
    assert.equal(customElements.length, toRender.length, 'There is one custom element');

    const link = customElements.children('a').first();
    assert.equal(link.text().trim(), MOBILE_NUTRITIONAL_LABEL);
    assert.equal(link.attr('href'), MOBILE_NUTRITIONAL_HTML);
  });
});
```

- - -

### Acceptance Tests
#### Further analysis (cont'd.)

What do we already have?

- A `nav-menu` component (but it's *very full*)
- A component for dictionary content

- - -

### Acceptance Tests
#### Further refinement

We need to make sure it is where it belongs.

```js

```

- - -

### Acceptance Tests

{>> TODO <<}

- - - - -
