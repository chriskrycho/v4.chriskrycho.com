---
Title: Announcing rewrite
Subtitle: >
    An absurdly ambitious project: building a genuinely great research writing app.
Date: 2019-07-06 21:50
Tags: [rewrite, software development, note-taking]
Category: Tech
Summary: >
    For the past four years, I have been dreaming about an absurdly ambitious project: to build a genuinely great research writing app. Today, I’m “kicking off” the project publicly, at rewrite.software.

---

<i><b>[Assumed Audience][aa]:</b> people interested in note-taking, research, and long-form writing.</i>

[aa]: https://v4.chriskrycho.com/2018/assumed-audiences.html

For the past four years, I have been dreaming of an absurdly ambitious application: a tool that can actually handle research writing *well*. Good research writing—whether it’s a college paper or a Ph.D. thesis, a journal publication or a magazine article, a scholarly blog or a big book—is a complex and challenging task. At a *minimum*, research writing includes:

- finding resources, tracking references to them, and citing them correctly
- taking, and making good use of, notes—including quotes from those references
- writing large, complex, highly structured documents
- publishing in a *very* specific format for everything from typeface to page margins to citation styles

There are tools out there which handle *some* of those pieces well—a few genuinely great notes apps in particular, and some solid contenders in the reference management space. They don’t play together well, though—whether it’s sync errors between apps, the disjointed experience of using tools which know almost nothing about each other, fighting with different journals’ styles, or the simple pain of trying to *write* in what is really a <i>desktop publishing tool</i> (looking at you, Microsoft Word).

And I would know: over the course of my M.Div., I wrote well over a hundred thousand words of papers; and never mind the many books’ worth of notes I took.

I eventually found a flow that worked for me during those years, pulling together [Markdown], [BibTeX], [pandoc], and [<abbr title="citation style languages">CSL</abbr>s][CSLs] to generate Word documents. (I wrote about that [here][academic-md], if you’re curious.) It did what I wanted! But it was arcane: even after years of working that way, I could never remember the various script invocations involved without looking them up. In short: there was something wonderful there… but the user experience was terrible.

[academic-md]: https://v4.chriskrycho.com/2015/academic-markdown-and-citations.html
[Markdown]: https://daringfireball.net/projects/markdown
[pandoc]: https://pandoc.org
[BibTeX]: https://en.wikipedia.org/wiki/BibTeX
[CSLs]: https://citationstyles.org

Even by the time I wrote [that blog post][academic-md], I was thinking: <i>what would a genuinely great app in this space look like?</i> I had sketched out the basics in a notebook early that month—

![the first page of my working notebook](https://f001.backblazeb2.com/file/rewrite/first-page.jpeg "a picture of the first page of my working notebook")

—and I haven’t stopped thinking about it ever since. <i>How do you do reference management well? What makes for a good note-taking system? How do you author large, complex documents with easy reference to those notes? How do you pull all those all together for publishing? How do you make it a *great* app *and* make it cross-platform?</i>

For the past four years, I have been doing two things in preparation for building <b><i>re</i>write</b> (the working title for this app):

- filling up that same notebook with design constraints, software architecture considerations, and business model ideas
- developing the technical skills I’ll need to actually deliver on that dream

Even with those years of planning, though, I’d be lying if I said I feel ready to take this on: this project is huge. It will take years to get to a minimum viable product. But you can plan forever and never ship… or you can just get moving, whether you feel ready or not. I quietly launched [a newsletter][email] for the project back at the end of April, and over the past few weeks since getting back from vacation—and having at last [wrapped up New Rustacean][NR]—I have been working on it in earnest. I started digging into [SwiftUI], and have been sketching out more detailed <abbr title="user interface">UI</abbr> ideas, and even decided on what to build first.[^first]

[email]: https://buttondown.email/rewrite
[NR]: https://v4.chriskrycho.com/2019/finishing-things-on-the-internet.html
[SwiftUI]: https://developer.apple.com/xcode/swiftui/

[^first]: I’m going to try to ship a nice tool for managing references. It’ll be good to have the experience of actually *shipping* an app. More on that 

And so today, I’m publicly “launching” the project, by which I mean: giving it a little more fanfare than I have previously by blogging about it here *and* by giving it its own website: [rewrite.software]. For now, it’s just a simple landing page with a form to sign up for the mailing list, mostly there so I have a place to direct people to sign up for [the project mailing list][email]. Anything more than that would be a distraction from what I really need to be doing now: learning and building!

[rewrite.software]: https://rewrite.software

I hope some of you will follow along as I take on this absurdly ambitious project, and I expect to be blogging about my adventures in Swift and SwiftUI, Rust, and more in the years to come!
