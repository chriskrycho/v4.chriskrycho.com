---
Title: Why Everything is Broken
Subtitle: Because we all forget how broken it is.
Date: 2016-11-01 20:45
Category: Tech
Tags: software development
---

It's something of a joke among many of the software developers I know to wonder aloud how *anything* works. We're all very painfully aware of how hard it is to write correct code, of how hard it is to account for all the corner cases that will arise, and of how hard it is to write user interfaces (of any sort) that make good sense to the user.

And our assumptions are broken in weird ways, but we don't even realize it. Our paradigms for computing are built on decisions made 40--50 years ago, and in many cases there is no *good* reason to continue doing things that way in a vacuum. But we're not in a vacuum, and we have incredible resources built on top of those existing paradigms, and rewriting everything form scratch in a saner way with the lessons we've learned in the intervening years seems impossible.

All of this came home to me again this evening in one of those startlingly painful moments of realization at how ridiculous this stack of cards we've built really is.

I was helping a colleague, a designer who's been learning HTML and CSS, figure out why his page wasn't displaying properly on GitHub Pages. The site was loading, and the image assets were loading, but the style sheets weren't. In fairly short order, I pulled up the site, noticed that the paths were to `/css/style.css`, glanced at the source and noted that the actual content was at `/CSS/style.css`, and said: "Oh, you just need to make the case of these match!" I explained: the URL proper (everything up through `.com` or whatever domain ending) is case-insensitive, but everything after that is case-sensitive.

There are reasons for that, some historical and some having to do with the fact that you can just serve a web page directly from a server, so the paths on your file system map to the paths on the web. And if your file system is case-sensitive, then the URL has to respect that.

That is, in a word, *dumb*. Don't get me wrong: again, I see the perfectly defensible technical reasons why that is so. But it's a leaky abstraction. And when you look closely at them, nearly *all* of our abstractions leak, and badly.

The pain of that moment was realizing, that like so many other things in tech, this particular thing is still broken for two reasons:

1. It's too hard or too painful to change it. (That's a big one here; the web has a pretty firm commitment to absolute backwards compatibility forever, _modulo_ a few things like killing Flash.)
2. We get used to it, and just come to accept the ten thousand papercuts as normal, and eventually even forget about them until something comes up again and *forces* us to see them. Usually in the form of someone learning for the first time.

We can't necessarily do a lot about (1). We don't have infinite time or money, and reinventing everything really is impossible. We can do wacky experiments, and iterate toward better solutions that can gradually replace what was there originally.

But (2) is the bigger one. We need to stop accepting the papercuts as just part of how things are---and especially, stop seeing our acclimation to them as a badge of honor to be earned---and start treating them as rough edges that ought to be sanded off over time wherever possible. Notice the things that trip up new learners, and if you can, *get rid of them*. If you can't get rid of them, make note so that you are sure to cover it when you're helping someone in the future. And explain the *whys* for those little edge cases: even worse than not knowing them, in some ways, is knowing them but not understanding them---having a bag of little tricks you can use but never being able to progress because you can't see how they fit together.

Making our tech better starts, in many ways, with recognizing the problems we have. It requires us not to accept (much less embrace or revel in) the status quo, and always to push ourselves to do better. So iterate like made to get away from (1) and to fix (2).
