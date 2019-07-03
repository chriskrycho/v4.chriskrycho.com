---
Title: Hey Siri, Record a Zettel
Subtitle: Making some small Siri shortcuts for adding to my Zettelkasten on the fly.
Date: 2018-12-14 22:15
Category: Blog
Tags: [Zettelkasten, automation, iOS, research, notes]
Summary: >
    Making some small Siri shortcuts for adding to my Zettelkasten on the fly.

---

<i><b>[Assumed Audience:](https://v4.chriskrycho.com/2018/assumed-audiences.html)</b> people interested in reading, writing, learning, and research systems—particularly on iOS, and particularly with automation in view.</i>

A few evenings ago, I spent a little while building out some Siri Shortcuts to make the process of building out notes in [my Zettelkasten](https://v4.chriskrycho.com/zettelkasten) on the fly easier. Building them in Bear is easy *enough*, but it’s even nicer to just be able to tap a button and have things like the date auto-generated for the note title in exactly the format I want: `YYYY.MM.DD.HHMM`, like `2018.12.14.2205` for a note created on December 14, 2018, at 10:05 pm.

This timestamp format means I can always find notes by when they were written, and it’s easy to sort them by when I created them, which in turn seems the kind of thing that will prove helpful in the long-term, given how much our memories are *associative*. (This insight is [not original](https://zettelkasten.de/posts/no-categories/) by any means, but it’s something I’ve long valued in my [work](https://v4.chriskrycho.com/2018/just-write-down-what-you-do.html).)

So having a little tool that handles that part automatically is *great*. The other thing that’s nice about using shortcuts is that I can use them in a hands-free context. I can now just say, “Hey Siri, record a new Zettel” and (since Shortcut configurations are shared across my iCloud account), I can do the whole process without typing a thing. Tagging is a bit harder here, but I can do well enough (it helps that I enunciate *extremely* clearly).

One thing I wish is that iOS had support for doing these kinds of things when in do-not-disturb mode when driving. That’s the time when my “record a new Zettel” Siri Shortcut would be *most* handy, and it’s not available. I’d be perfectly fine with having to come back and do a bit of cleanup later to get it *just right*, as long as I could get the thought down somewhere I could come back to it later. You can do things like say “Hey Siri, in Bear, add a note,” and Siri will prompt you for its content—so clearly the functionality is there. SiriKit just needs to better support it.

As for these particular shortcuts: I’m still working out the kinks, but for what it’s worth, here are the shortcuts I’ve built so far:

- [Record a New Zettel](https://www.icloud.com/shortcuts/c2406245de5846bebbda93d798034e25)
- [Write a New Zettel](https://www.icloud.com/shortcuts/ae956fdd00454f0d824dd47ea69cecd2)
- [Quote → Zettel](https://www.icloud.com/shortcuts/45a7c484309344c9a59e2f3e48a68083)

I’m also thinking I’ll end up using the built-in hook Bear has to download a web page, but I haven’t worked that into my flow just yet.

