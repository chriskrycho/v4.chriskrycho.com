---
Title: Rust is Incredibly Productive for CLIs
Subtitle: Don’t let the tagline fool you: Rust is for more than just “systems programming.”
Date: 2018-05-20 08:35
Tags: Rust, programming languages
Category: tech
Summary: >
    I built a little tool in Rust to convert an Evernote export file to Markdown. It was impressively easy.

---

There are *reasons* I’m a Rust fanboy. One of them is the kind of thing I proved out to myself today—again, because I’ve had this experience before, albeit not with anything quite this “complicated.”

I built [a little tool](https://github.com/chriskrycho/evernote2md) in Rust to convert Evernote exports (in their custom `.enex` <abbr>XML</abbr> format) to Markdown files with <abbr>YAML</abbr> metadata headers—mostly just to see how quickly and effectively I could do it, because I’ve never actually had an excuse to use [Serde](https://serde.rs) and I thought this might be a nice spot to try it.

There’s a lot this little library *doesn’t* do. (Like include the creation and modification timestamps in the header, for example.) But all of those things would be *very* straightforward to do. I built this functioning little “script” in about two hours. For context: I’ve taken multiple passes at this in Python—which in the way people normally think about these things should be way *easier*—and I’ve failed both times.

Rust’s compiler just helps you out *so much* along the way, not only with the type-checking but with the really amazing metaprogramming capabilities you get with it. Being able to slap `#[derive(Deserialize)]` on a struct and a couple attributes on struct fields and having it Just Work™ to deserialize XML into local types is mind-blowing. (The only thing I know of that’s playing the same game is F^♯^ type-providers. I’d love to hear about similar capabilities in other languages!)

I’m basically at the point where if I need a small command-line tool, I write it in Rust, *not* in a conventional scripting language like Python, because the benefits I get more than outweigh whatever small extra amount of mental overhead there is. And there’s not much of that mental overhead anyway for this kind of thing! As you can see [in the actual code](https://github.com/chriskrycho/evernote2md/blob/master/src/main.rs#L71), I make free and liberal use of [`expect`](https://doc.rust-lang.org/1.26.0/std/option/enum.Option.html) for this kind of tool.

It’s also hard to oversell the ecosystem—even as relatively nascent as it is compared to some much older languages, the tools which exist are just really good. This project uses [Serde](https://serde.rs) for deserializing from <abbr>XML</abbr> and serializing to <abbr>YAML</abbr>; [Regex](https://github.com/rust-lang/regex); [Clap](https://clap.rs) for command line parsing; a nice little wrapper around [pandoc](https://pandoc.org); and, superpower even among superpowers, [Rayon](https://docs.rs/rayon/1.0.1/rayon/): free parallelization.

Rust is, in short, *very productive* for things in this space. Far more than you might expect from the billing. Yes, it’s a “systems programming language” and you can write operating systems with it. But it’s also just a really great tool for *all sorts* of domains, including little <abbr>CLI</abbr> tools like this one.
