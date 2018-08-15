---
Title: Stable Libraries
Subtitle: "A crazy idea: that sometimes a library might just be… done.
Date: 2018-08-14 19:45
Categories: Tech
Tags: software development, open source software, libraries, true myth, javascript
Summary: >
    True Myth has changed very little since I first released it, and I do not expect it to change much in the future: because it is basically done. I wish more libraries took this approach; churn is not a virtue.

---

True Myth has changed very little since I first released it, and although I have a few ideas for small additions I might make, I don’t really expect it to change much in the future. *That’s okay.*

There’s a strange idea in some parts of the software development ecosystem—a way of think I also find myself falling into from time—which takes a lack of changes to a library as a sign that the library is *dead* and shouldn’t be used. I call this idea “strange” because if you take a step back, it’s actually not necessarily very healthy for certain kinds of libraries to be changing all the time.

But if you’re in an ecosystem where rapid change in libraries is normal, you end up assuming that something which *isn’t changing* is *unmaintained* or *not usable* when in fact the opposite may be true. If someone opens a pull request or an issue for True Myth, I generally get to it in under a day, often under an hour if it’s in my normal working time. (That’s easy enough for me to do because it’s a small, simple library; I don’t have the scale problems that larger projects do.) The project isn’t *dead*. It’s just mostly *done*.

One of the things I’d like to see in the front-end/JavaScript community in particular is a growing embrace of the idea that some libraries can genuinely be finished. They might need a tweak here or there to work with a new packaging solution, or to fix some corner case bug that has been found. But the “churn” we all feel to varying degrees would be much diminished if maintainers didn’t feel a constant push to be changing for the sake of, well… change. The burden on maintainers would be lower, too. Maybe we’d all get to spend less time on small changes that just keep us “up to date” and more on solving bigger problems.

Don’t get me wrong: sometimes changing perspective warrants a rewrite. But in libraries as in apps, just as often you’ll end up with a bad case of [second system syndrome](https://en.m.wikipedia.org/wiki/Second-system_effect); and rewrites are *rarely*—not never, but rarely—clean wins.
