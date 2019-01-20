---
Title: Tech Criticism and Hope
Subtitle: >
    Is the window in which we could chart a new course for technology and moral philosophy closed?
Date: 2019.01.21 08:00
Category: Theology
Tags: [ethics, moral philosophy, technologism]
Summary: >
    TODO
Status: draft

---

<i><b>[Assumed Audience](https://www.chriskrycho.com/2018/ssumed-audiences.html):</b> TODO.</i>

L. M. Sacasas, [reflecting on][sacasas] Paul Goodman’s [claim] that “technology is a branch of moral philosophy, not of science,” and that “technology must have its proper place on the faculty as a learned profession important in modern society, along with medicine, law, the humanities, and natural philosophy, learning from them and having something to teach them”—emphasis mine:

[sacasas]: https://thefrailestthing.com/2019/01/19/technology-is-a-branch-of-moral-philosophy/
[claim]: https://www.nybooks.com/articles/1969/11/20/can-technology-be-humane/

> Clearly [Goodman’s proposal] was a far more robust program than contemporary attempts to shoehorn an ethics class into engineering and computer science programs, however noble the intent. Equally clearly, it almost impossible to imagine such a re-organization. **That horizon of opportunity closed, if it was ever truly open.**

This particular kind of response to the challenges posed by our current technical milieu seems endemic among the tech criticism currently in vogue: it’s the same basic sentiment I see from [Alan Jacobs], [Librarian Shipwreck], [Nick Carr], and others (though those three offer much of the most trenchant critical work, especially at the popular level). Even somewhat less skeptical but still thoughtful tech journalists—e.g. [Ian Bogost] and [Alexis C. Madrigal] at <cite>The Atlantic</cite>—seem to have a strong degree of pessimism about what opportunities still remain before us.

[Alan Jacobs]: http://blog.ayjay.org
[Librarian Shipwreck]: http://librarianshipwreck.wordpress.com
[Nick Carr]: http://www.nicholascarr.com
[Ian Bogost]: https://www.theatlantic.com/author/ian-bogost/
[Alexis C. Madrigal]: https://www.theatlantic.com/author/alexis-madrigal/

And they stand in good company: so far as I can tell, the basic outlook of *all* the major tech critical figures of the 20th century—Ellul, Mumford, Postman, etc.—is one of distressed resignation. That is: distress at the all-consuming embrace of technique they saw unfolding before them; but resignation in that they saw no hope or possibility for anything *else*.

I understand this outlook—but I do not share it.

It is true that we live in an era of unprecedented embrace of technique. Ours is an age of scientism and technologism—the basic outlook that with the tools at our command, we can reshape *anything*. The earth—for ill, and perhaps if we invest enough also someday for good—has been and will continue to be radically reshaped by human technological products and interventions. Human nature [seems increasingly malleable][ws 6.05] through both genetic and cybernetic alternation—and with that malleability the assumption that we *may* alter as we see fit. The digitization and algorithm-izing of every part of our lives ([“the algorithm was good to me today”][algorithm-theology]) continues to leave us subject to forces that most of us do not understand—including, too often, [their makers][NYT/Google/language].[^un-understood]

[ws 6.05]: https://winningslowly.org/6.05/
[algorithm-theology]: https://www.google.com/search?hl=en&biw=1241&bih=788&ei=Sr9EXPndEcvbjwSvkYfYCw&q=%22the+algorithm%22+was+good+%22me+today%22&oq=%22the+algorithm%22+was+good+%22me+today%22&gs_l=psy-ab.3...10303.14867..15029...0.0..0.63.171.3......0....1..gws-wiz.HoaG_RB_Yxw
[NYT/Google/language]: https://www.nytimes.com/2016/12/14/magazine/the-great-ai-awakening.html

[^un-understood]: From [that article][NYT/Google/language], emphasis mine:

    > Le [one of the pioneers in recent natural language processing innovations] was around, but *even he couldn’t always make heads or tails of what they had done.*
    >
    > As Schuster put it, “Some of the stuff was not done in full consciousness. *They didn’t know themselves why they worked.*”

So perhaps we are indeed currently captors to this regime of technique. But I am unwilling on that basis to acquiesce.

An analogy, from the field: much of the software engineering world has spent most of the last three decades in what I would describe as wandering in a particular wilderness: an essentially unthinking acceptance of certain dogmas about what constitutes "good programming" and what programming languages are therefore viable "for industry." These languages have a number of good things going for them, and in particular the way they are built represent some absolutely phenomenal technology built by some of the best minds in the industry. However, the paradigm they represent (a certain flavor of "object-oriented programming") has some deep flaws and has consistently failed to live up to its promise.[^oop] For a very long time, it didn't seem to matter: use of these languages was accepted as simply *necessary* by most large engineering organizations.

In the last decade or so, though, there has been something of a frost in that long winter. Other paradigms are being given more of a shot. Other programming languages are gaining real currency. Had you asked someone a decade ago whether "functional programming" would be in any way mainstream, they would have laughed at you. Today, though, while "object-oriented" programming is still far and away the dominant paradigm, "functional" programming has seen an entirely unexpected surge, and with it a number of new languages that either fully embrace that paradigm[^elm] or pull in many of its insights while going off in their own new directions.[^rust] And, in a matter of deep surprise (and sometimes a bit of personal frustration), a great deal of that newfound *opportunity* has come from, of all places, Facebook.

[^oop]: To be clear, for my readers who are well-versed in programming languages: my claim has little or nothing to do with object oriented programming as Alan Kay original defined it—message passing and late binding—and is not even that <abbr>OOP</abbr> is inherently or always *bad*. It is simply that <abbr>OOP</abbr> *as represented by Java and C^♯^* is a deeply flawed approach, not least in its lack of affordances for other paradigms, but also in terms of their type systems being exactly in the worst middle ground for type systems: insufficiently robust as to be truly helpful by comparison with languages in the Standard ML lineage, and requiring so much boilerplate as to be infuriating by comparison with languages like Ruby or Python. <abbr>OOP</abbr> remains an interesting paradigm, and I think many of the deep insights to be mined in that space remain little recognized and little explored.

[^elm]: e.g. Elm

[^rust]: e.g. Rust—and you should probably also include Swift and Kotlin in this category as well

My point with this example—nerdy and embedded in the very largest symptom of all that the tech critics rightly condemn though it be!—is that sea changes are rarely predictable, and often come about in surprising ways. Few programming language enthusiasts would have guessed in 2009 that JavaScript web programming ideas from Facebook would quietly but thoroughly shift the [Overton window] for programming techniques and languages. This certainly does not mean we can simply *expect* things to go as we wish. But it does mean that we may continue to *hope* that things will not go as we fear—even when we see no particular reason for that hope at present.

[Overton window]: https://en.wikipedia.org/wiki/Overton_window

To return then to the comment by Michael Sacasas with which I opened this post:

> That horizon of opportunity [to reimagine technology as a discipline *entailing* moral philosophy] closed, if it was ever truly open.

I think Sacasas is wrong: the door may appear shut at the moment, but who knows what fresh winds may blow through in the years ahead? Moreover: the work of the tech critic must be to continue hoeing hard ground and planting seeds in hope of the right mix of sun and rain. We cannot count on those: the farmer has no *guarantee* that hoeing and planting will bring the desired results. The alternative, though starvation. We cannot afford to—and, as Christians, we dare not!—succumb to the idea that the age as we find it is unchangeable. And there are, I daresay, hints of rain in the air: The kind of bracing criticism offered up against the tech giants in 2018 would have come as a surprise to anyone looking forward from 2013 (or even 1968). Tech critics may not yet be in a position to chart a new course for us, but that does not absolve us of the responsibility to sow seeds and hoe hard ground—that is, teach those who have ears to hear, to work to open new ears—and to pray for rain.
