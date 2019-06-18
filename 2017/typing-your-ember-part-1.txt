---
Title: Typing Your Ember, Part 1
Subtitle: Set your Ember.js project up to use TypeScript.
Category: Tech
Tags: [typescript, emberjs, typing-your-ember]
Series:
    Title: Typing Your Ember
    Part: 1
Date: 2017-05-05 00:10
Slug: typing-your-ember-part-1
Summary: >
  In this first post in the series, we're going to keep things simple and easy: we're going to get an Ember.js app configured to use TypeScript. Later posts will cover some of the other details.

---

<i class='series-overview'>You write [Ember.js] apps. You think [TypeScript] would be helpful in building a more robust app as it increases in size or has more people working on it. But you have questions about how to make it work.</i>

[Ember.js]: https://emberjs.com
[TypeScript]: http://www.typescriptlang.org

<i class='series-overview'>This is the series for you! I'll talk through everything: from the very basics of how to set up your Ember.js app to use TypeScript to how you can get the most out of TypeScript today---and I'll be pretty clear about the current tradeoffs and limitations, too.</i>

<i class='series-overview'>[(See the rest of the series. →)][series]</i>

[series]: /typing-your-ember.html

---

In this first post in the series, we're going to keep things simple and easy: we're going to get an Ember.js app configured to use TypeScript. Later posts will cover some of the other details.

Because of the lovely [Ember CLI] ecosystem, this is a pretty straightforward process. I'm going to start from *zero* so that even if you've never written an Ember app before, you can get this up and running by following these instructions. These instructions have also been tested and confirmed to work across platforms---you can do this equally on Windows, macOS, or Linux.

[Ember CLI]: https://ember-cli.com

1. Make sure you have Ember's prerequisites installed. Get [Node] for your platform. Optionally (but highly recommended) install [Yarn] to manage your Node packages.[^why-yarn]

2. Install the Ember command lines tools globally:

    ```sh
    yarn global add ember-cli
    ```
    or

    ```sh
    npm install --global ember-cli
    ```

3. Create an Ember app.

    ```sh
    ember new my-ts-app --yarn
    ```

    (Using the `--yarn` flag will make it so your app uses [`yarn`][Yarn] and creates a `yarn.lock` file instead of using `npm` when it installs its dependencies.)

4. Now move to the root of the newly created app: this is where we'll do everything else in the post.

    ```sh
    cd my-ts-app
    ```

5. Add the [_ember-cli-typescript_ add-on][e-c-ts].

    ```sh
    ember install ember-cli-typescript
    ```

6. Generate your first UI component.

    ```sh
    ember generate component some-input
    ```

7. Rename the files it generated from `.js` to `.ts`:
    - `app/components/some-input.js` → `app/components/some-input.ts`
    - `tests/integration/components/some-input-test.js` → `tests/integration/components/some-input-test.ts`

    (Eventually, we'll make it so that you get TypeScript for all newly generated components when using _ember-cli-typescript_.)

8. Add some content to the files:

    ```handlebars
    {{!-- some-input.hbs --}}
    {{input value=theValue change=(mut theValue)}}
    {{theValue}}
    ```

    ```typescript
    // some-input.ts
    import Ember from 'ember';

    export default Ember.Component.extend({
      theValue: '',
    });
    ```

9. Update your `application.hbs` file to remove the default `{{welcome}}` template and replace it with `{{some-input}}`

10. Spin up the Ember application with Ember CLI's development server:

    ```sh
    ember serve
    ```

    You'll likely note some warnings: the TypeScript compiler won't be able to find some of the modules imported in your files. I'll have more to say about this in a future post. For now, suffice it to say: don't worry, Ember CLI is still resolving and compiling your modules just fine.[^typings]

11. Load the application by going to `localhost:4200` in your browser. You should see a blank white screen with an input in it. Type in it, and see the input rendered to the page. Simple enough, but it's using a TypeScript file compiled along the way!

And that's it: we're done setting up an Ember.js app to use TypeScript! In the next post, I'll talk a bit about strategies for migrating an existing app to TypeScript---not just the mechanics of it, but also where and how to start actually integrating types into your code.

[Node]: https://nodejs.org/en/
[Yarn]: https://yarnpkg.com
[e-c-ts]: https://emberobserver.com/addons/ember-cli-typescript

[^why-yarn]: I strongly prefer to use `yarn` over `npm` because `yarn` installs are predictable and repeatable, and if there's one thing I don't need to spend time on when developing our Ember.js app at Olo, it's chasing problems with transitive dependencies that are different in the build server than in my local development environment. Yarn's lockfiles mean what ends up built on the server is *exactly* what ended up built on my machine.

[^typings]: But if you're curious, here's a preview: we really need more [type definitions] for the Ember ecosystem. I'll be covering *how* we build those in much more detail in a future installment.

[type definitions]: http://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html

- [**Next:** Part 2 –  Adding TypeScript to an existing Ember.js project.][part-2]

[part-2]: /2017/typing-your-ember-part-2
