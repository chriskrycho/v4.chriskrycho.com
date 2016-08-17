# TDD-ing a Small Ember Feature
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

## Upsell Support

(I actually built this last month.)

- - - - -

### Upsell Support: Acceptance Tests

```sh
$ ember generate acceptance-test upsell
version: 2.4.2
installing acceptance-test
  create tests/acceptance/upsell-test.js
```

- - -

#### Upsell Support: Acceptance Tests

```js
import { test } from 'qunit';
import moduleForAcceptance from 'mobile-web/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | upsell');

test('visiting /upsell', function(assert) {
  visit('/upsell');

  andThen(function() {
    assert.equal(currentURL(), '/upsell');
  });
});
```
