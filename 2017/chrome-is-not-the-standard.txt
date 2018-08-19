---
Title: Chrome is Not the Standard
Subtitle: Developer infatuation with Chrome is not good—because competition between browsers is good.
Category: Tech
Tags: [web development]
Summary: >
    No single browser vendor represents ”the future of the web.” Each ships in line with its own business priorities. And that's a good thing.
Date: 2017-12-21 07:10

---

<i class=editorial>This got an enormous amount of play around the web, and as a result people have ended up translating it to other languages. If you have a translation, I'll be happy to link it here!</i>

- [Russian], translated by Vlad Brown (<http://softdroid.net>)
- [Uzbek], translated by Alisher

[Russian]: http://softdroid.net/chrome-ne-yavlyaetsya-standartom
[Uzbek]: http://getdrawings.com/uz-chrome-standart-emas

---

## The post

Over the past few years, I’ve increasingly seen articles with headlines that run something like, “New Feature Coming To the Web”—followed by content which described how Chrome had implemented an experimental new feature. “You’ll be able to use this soon!” has been the promise.

The reality is a bit more complicated. Sometimes, ideas the Chrome team pioneers make their way out to the rest of the browsers and become tools we can all use. Sometimes... they get shelved because none of the other browsers decide to implement them.

Many times, when this latter tack happens, developers grouse about the other browser makers who are “holding the web back.” But there is a fundamental problem in this way of looking at things: *Chrome isn’t the standard.* The fact that Chrome proposes something, and even the fact that a bunch of developers like it, does not a standard make. Nor does it impose an obligation to other browsers to prioritize it, or even to ship it.

As web developers, it can be easy to become focused on interesting new features for the platform we work on. That’s no different than the excitement Android and iOS developers have when Google and Apple release new SDKs for developing on their platforms. It’s healthy to be excited about possible new features, things that might make our jobs easier or enable us to do things we couldn’t do before.

But there *is* an important difference between those platforms and the web. Those platforms are the domain of a single vendor. The web is a shared platform. This is its unique benefit, and its unique cost. It uniquely allows us to write software that can actually run, and run reasonably well, *everywhere*. But it also means that a minimum of four companies—the major browser vendors—get a say in whether a feature is a *feature* or whether it’s just an interesting idea one of the teams had.

Let’s get concrete about an example that’s been extremely high-profile for the last couple years—and, to be clear, one I think is a *good* idea from Google: [progressive web apps](https://developers.google.com/web/progressive-web-apps/ "Google’s PWA page") (hereafter <abbr title='Progressive Web App'>PWA</abbr>). They have been pitched by Google and other supporters as an unambiguous win for the user experience of complex web applications. And, as a web developer myself, I’m actually inclined to agree with that assessment! However, I have fairly regularly seen people getting angry at especially Apple for not prioritizing support for <abbr title='Progressive Web App'>PWA</abbr>s in (especially iOS) Safari—Apple is, in this view, “holding back the future of the web.”

Well... no. For any given idea Google pitches, Apple may or may not be sold on Google’s vision of the web, or they may even think it’s a good idea but not *more* important than other things they’re working on.[^1]

And this is what it *means* to be part of the web platform. No single company gets to dominate the others in terms of setting the agenda for the web. Not Firefox, with its development and advocacy of [WebAssembly](http://webassembly.org/), dear to my heart though that is. Not Microsoft and the IE/Edge team, with its proposal of the CSS grid spec in *2011*, sad though I am that it languished for as long as it did. Not Apple, with its pitch for [concurrent JavaScript](https://webkit.org/blog/7846/concurrent-javascript-it-can-work/ "“Concurrent JavaScript: it can work!”"). And not—however good its developer relations team is—Chrome, with any of the many ideas it’s constantly trying out, including <abbr title='Progressive Web App'>PWA</abbr>s.

It’s also worth recognizing how these decisions aren’t, in almost any case, unalloyed pushes for “the future of the web.” They reflect *business* priorities, just like any other technical prioritization. Google cares about <abbr title='Progressive Web App'>PWA</abbr>s because Google makes its money from the web and wants people to spend more of their time on the web. Apple cares about things like the battery life implications and the sheer speed of its iOS JavaScript engine because it makes money from hardware and it wants people to be happy with their iPhones and iPads.

Does any one of those browser’s commitments map cleanly to *all* users’ (or even all *developers’*) priorities? Of course not! This is and always has been the beauty of a competitive browser landscape. I’m a web developer who wants <abbr title='Progressive Web App'>PWA</abbr> support everywhere—so I want Apple supporting it. But I’m also a smartphone user who wants those applications to *scream* on my device—not to crawl, like they do on Chrome on Android, which is still years behind iOS in performance. As an end user, not just a developer, it matters to me that running Safari on my laptop instead of Chrome can dramatically increase my battery life.

These are tradeoffs, plain and simple. Chrome ships new features fast, but they’re not always stable and they often have performance costs. Safari ships new features on a much slower cadence, but they’re usually solid and always perform incredibly well. These are both engineering and business tradeoffs, and the companies behind the browsers are making because of their own business and engineering priorities. Don’t valorize any of the browser vendors, and don’t act as if *any* of them is the standard, or a reliable predictor of the future. Instead, value what each brings to the table, but also value the interplay *at* the table, and the ways each of these vendors pushes the others and challenges the others’ assumptions of what is most important. That’s what makes the web so great, even when it makes things move more slowly. Sometimes—often, even!—moving more slowly not in the *experimental* phase but in the *finalizing* phase makes for a much better outcome overall.

[^1]:   In this case, it seems to have been the latter, since yesterday’s release of Safari Tech Preview enabled Service Workers, one of the major pieces of the <abbr title='Progressive Web App'>PWA</abbr> push.

