---
Title: >
    rewrite Dev Journal: How I Started
Subtitle: The smallest possible set of tasks.
Date: 2019-09-04 21:30
Category: Tech
Tags: [rewrite, rewrite dev journal, software development, productivity]
Summary: >
    This week, I started actually writing software for my rewrite project. This is the story of how I got past the daunting feeling of not knowing where to begin.

---

<i><b>[Assumed Audience][aa]:</b> practitioners or interested lookers-on for software development—especially indies.</i>

[aa]: https://v4.chriskrycho.com/2018/assumed-audiences.html

This week, I started the <i>actually writing software</i> phase of working on [<b><i>re</i>write</b>][rewrite]. As of yesterday evening, I actually have a bit of code that, although useless in every way, and not especially attractive, does in fact displays a single reference on an iPhone screen. I have an incredibly, impossibly long way to go.

It doesn’t matter: I *started*.

I had the day off on Monday courtesy of Labor Day, and I chose to spend the chunk of it that *wasn’t* focused on chores and housework and family time on actually getting this thing moving. I’ve been dreaming for over four years now. That time wasn’t wasted, by a long shot, but as I noted in [my announcement post][announcement], you can plan forever… or you can just start building at some point.

The problem I had—as I noted [back in July][starting]—is that I didn’t actually feel like I knew *how* to start. This a mammoth project, for one thing. For another, doing this kind of indie work requires dramatically improving my design and product chops. And of course, developing for native apps means learning whole new technology stacks as well!

I’ve known all along that the only way to get anywhere was to break the problem down. You know: the same as always in software development. Find something small to start on. I had already identified which *part* of the app to dig into first: reference management. This is a place where I could have something that is useful to *me* in reasonably short order (I want to be able to update my own reference library on my iPad!). Even that was daunting, though—still far too large.

So, Monday, I asked: <i>What is the smallest possible reference-related functionality I could build?</i> The answer, I concluded, was: <i>just display an existing library of references.</i> Then I went further, because “display an existing library of references” is surprisingly complicated. It involves, at a minimum:

- defining how to display a reference
	- …and therefore also designing the data structures representing references
- actually building that display
- defining how to display a list of references to the user—which things to include, which not to, etc.
- actually building that list
- making it so that tapping on an item in a list displays the detailed view defined previously
- making it so you can get back *out* of the detail view to the list view again
- loading a list of references from somewhere, e.g. a BibTeX file from iCloud Drive
- parsing that list of references into the internal data structures designed to represent them

Now, for an experienced iOS or macOS developer, some of those things might feel trivial enough that they don’t even warrant their own bullet point. But I’m *not* an experienced iOS or macOS developer; I have no idea how to do any of this! What’s more breaking it down that way means that I have small, discrete tasks that I can go after in small blocks of time. Remember: this is a side project, which I am fitting in around my day job, my church commitments, and time with friends and family. I have to be able to make progress in small blocks of time! I have to *feel* that progress, at least a little, so that I can keep going.

Every bullet point on the list I came up with represents a discrete item of work. It not only *may* but *must* be small, so that I can do it in an evening or three. It needs to be done in such a way that later steps can build on it—but it doesn’t actually need to be anything like what those later steps will transform it into. It just needs to be enough to keep momentum moving, and done in such a way that later changes are not too difficult to make.[^agile] 

Monday evening, I took the items I had identified and turned them into GitHub Issues in a GitHub project, called <b>Display a BibTeX Library</b>. (I’ll talk about how I’m using GitHub projects a little at some point in the future; it’s a nice flow so far.) Every single one of those items, no matter how apparently small, got its own card. One of them, about Swift-Rust interop, got a note saying, roughly, “I’m pretty sure this will need to be its own whole sub-project.” And looking at that list… I felt a lot less daunted! Every one of the tasks involves something I don’t know how to do yet—but only *one* thing I don’t know how to do yet, not *many*.

Last night, I took the first item on the list: display a single reference item. Not *parsing* them, not even from a string hard-coded into the app, and certainly not loading a file or anything like that. Just hard-coding in a data structure and displaying it on the screen. And, over the course of a few hours, including *lots* of searching[^ddg] for answers about specific SwiftUI error messages,[^diagnostics] I managed to implement that one thing.

As I said above: it’s *useless* in the strict sense. It’s not especially pretty, either. But it’s progress. I started. And now I have that little sense of momentum, and I can keep going!

[rewrite]: https://rewrite.software
[announcement]: https://v4.chriskrycho.com/2019/announcing-rewrite.html
[starting]: https://v4.chriskrycho.com/2019/starting.html

[^agile]: If you think this sounds like the ideas current in the best parts of agile software development—working to make future changes easy; iterating rapidly; delivering the smallest possible chunks of value, and doing so continuously—you’re not wrong!

[^ddg]: “Searching,” not “Googling,” because I only very rarely Google anything. I search, with [Duck Duck Go][ddg] as my starting point and its [! search commands][!] as power tools for searches in specific places.

[ddg]: https://duckduckgo.com
[!]: https://duckduckgo.com/bang

[^diagnostics]: *Wow* could SwiftUI’s compiler diagnostics use some improvement! I sincerely hope that the Swift team in general and the SwiftUI folks in particular take a close look at Rust and Elm for inspiration here.
