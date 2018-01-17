---
Title: "Exploring 4 Languages: Project Setup"
Subtitle: >
    Getting Rust, Elm, F<sup>♯</sup>, and ReasonML installed; their editor plugins configured; and their project files ready.
Date: 2018-01-01 13:00
Tags: functional programming, rust, elm, fsharp, reasonml, domain-driven design, four-languages
Category: Tech
Summary: >
    Getting Rust, Elm, F♯, and ReasonML installed; their editor plugins configured; and the project ready for implementing the exercises in Scott Wlaschin’s Domain Modeling Made Functional.
---

In this post, I'm just going to briefly talk through the steps I needed to do to set up each of the languages and my editor setup for them. Gladly, it was pretty simple. At the end, I'll offer a note on my thoughts on the setup processes. (Note that this isn't "How to do this for anyone ever"—it's "how I did it, with some notes where it might be relevant to you.")

For context, I'm running macOS and using [VS Code](https://code.visualstudio.com) as my editor. Whenever I say "Install the VS Code extension," you can do it either by opening the extension side panel and searching for `<Extension Name>`, or by typing `ext install <extension label>`—I'll write it like `<Extension Name>`/`<extension label>`.

The source code as of what I'm describing in this post is [at the `project-setup` tag](https://github.com/chriskrycho/dmmf/tree/project-setup) in [the repo](https://github.com/chriskrycho/dmmf/).

## Rust

* **Language installation:** Install [_rustup_](https://rustup.rs): `curl https://sh.rustup.rs -sSf | sh`[^rustup].
* **Editor setup:** Installed the VS Code extension: `Rust (rls)`/`rust`.
* **Project setup:** In the root of [my repo](https://github.com/chriskrycho/dmmf), I ran `cargo new rust`.

[^rustup]: If you're uncomfortable with running that script, there are [other options](https://www.rust-lang.org/en-US/other-installers.html) as well.

## Elm

* **Language installation**: There are installers, but I just did `npm i -g elm`.
* **Editor setup:** Installed the VS Code Elm extension: `Elm`/`elm`.[^atom]
* **Project setup:**
  * Install the `create-elm-app` tool: `npm i -g create-elm-app`
  * In the root of the project, I ran `create-elm-app elm`.

[^atom]: Note that the VS Code extension is _not_ the best experience out there for Elm: the Atom extensions ([language-elm](https://atom.io/packages/language-elm) and [elmjutsu](https://atom.io/packages/elmjutsu)) are. I stuck with VS Code because it's _good enough_ and, more importantly, the Code extensions are arguably best in class for the _other_ languages... and it's what I use every day.

## F^♯^

* **Language installation**: Install [mono](http://www.mono-project.com): `brew install mono` (note installation instructions [here](option-5-install-f-with-mono-via-homebrew-64-bit)).
* **Editor setup:** Install the VS Code Ionide extension: `Ionide-fsharp`/`ionide-fsharp`. It'll automatically install the associated Paket and FAKE extensions from the Ionide project as well, and those will install Paket and FAKE during installation.
* **Project setup:**
  * In the root of the repo, I created the `fsharp` directory.
  * Then I opened a VS Code instance to to that directory, opened the command palette, and ran `F#: New Project`.
    * I chose `console`
    * I left the directory blank
    * I named the project `dmmf` (for *D*omain *M*odeling *M*ade *F*unctional).
    * Since F^♯^ (like C^♯^) prefers PascalCase names, I renamed the generated module `DMMF`.

## ReasonML

* **Language installation**: Following the setup instructions [here](https://reasonml.github.io/guide/javascript/quickstart), I ran `npm install -g bs-platform`.
* **Editor setup:** following [the official instructions](https://reasonml.github.io/guide/editor-tools/global-installation)—
  * I ran `npm install -g https://github.com/reasonml/reason-cli/archive/3.0.4-bin-darwin.tar.gz` to install the dependencies for the editor configuration.
  * I installed the VS Code extension: `Reason`/`reasonml`.
* **Project setup:** In the root of the repo, I ran `bsb -init reason -theme basic-reason`.

## Comments on the setup processes

Most of the languages have _fairly_ straightforward processes to get up and running with a good-to-excellent tooling experience.

The best of them is Rust, which is _extremely_ easy to get up and running with.[^fanboy] Elm is roughly in the middle—it's less straightforward than Rust in that `create-elm-app` is _not_ an officially supported approach, unlike `rustup` and `cargo`, so you're going to have a much less awesome experience if you don't know about it.

[^fanboy]: I'm not just saying that because I'm a Rust fanboy, either! If Rust were hard to use, I'd be complaining _louder_ because of my enthusiasm for the language.

Reason and F^♯^ both have slightly larger negatives.

Reason requires you to `npm install` a large, gzipped file with multiple dependencies all bundled, instead of having a dedicated installer _a la_ `rustup`. It also has the possibility for a not-so-great first-run experience in the editor, which [I discovered](https://github.com/facebook/reason/issues/1729) all too quickly.

F^♯^ essentially requires you to use an editor extension to get the language setup with [Paket](https://fsprojects.github.io/Paket/), which is a _much_ better choice of package manager than the default .NET package manager NuGet. Command line tools exist and are improving rapidly, and you _can_ [get them working](https://fsprojects.github.io/Paket/paket-and-dotnet-cli.html)... but it's harder than it needs to be. And that project setup wizard is _fine_, but it's a lot noisier than just doing `create-elm-app` or especially `cargo new`.

In any case, though, I have them all up and running now! More soon!
