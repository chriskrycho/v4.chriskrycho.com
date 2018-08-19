---
Title: Becoming a Contributor
Subtitle: The prepared script for my talk at Rust Belt Rust 2017, given October 27, 2017 in Columbus, Ohio.
Summary: The prepared script for my talk at Rust Belt Rust 2017, given October 27, 2017 in Columbus, Ohio.
Category: Tech
Tags: [talks, software development, rust, open source software]
Date: 2017-11-02 07:00

---

<i class=editorial>Here is the full text of the talk I gave at Rust Belt Rust, as it was prepared; headings correspond to individual slides. You can see the slides as they were presented [here][slides]. Note that I extemporize fairly freely when actually giving a talk, so this is *not* a word-for-word equivalent of the talk as delivered, but the gist is the same!</i>

<i class=editorial>I'll update this post with the video once it's available!</i>

[slides]: /talks/rust-belt-rust/

---

![family](/talks/rust-belt-rust/img/family.jpg)

Hello, everyone! It's good to see all of you. We only have half an hour, and even if that's ten to fifteen minutes longer than a normal New Rustacean episode, that's still not much time, so let's jump right in! Our theme is "Becoming a Contributor." There are two prongs to this talk, two big ideas I hope you all walk away with.

### Introduction: The Big Ideas

The first thing I hope all of you take away is that **there is no reason *you* cannot contribute meaningfully** to the success of Rust – or indeed any open-source project you care about. Anyone can be a contributor. And not "even you" but perhaps "*especially* you". The fact that you're an outsider, or new to programming, or new to systems programming: sometimes that makes you a *better* contributor. Because you don't necessarily share the biases of – you're not wearing the same blinders that – someone who's been writing systems-level code for 20 years have. So the first idea: **you can contribute**.

The second idea I hope you take away is **just *how many* ways there are to contribute meaningfully**. It has almost become a cliche in the Rust community to say "code isn't the only thing that matters," but I want to show you today just how true that is. And I want to make that point again more forcefully, because for all that we often say that, the idea that *shipping code* is what really matters is the kind of pernicious lie that can come back and bite any of us. It certainly gets to me at times! But it's a lie, and we're going to see that in detail. That's the second big idea: **there are an *astounding* number of ways you can contribute**.

### Introduction: Why?

There are a lot of things to be passionate about in the world of software development. But at the end of the day, I care about software because I care about *people*. To borrow a label from Scott Wlaschin – a developer I admire enormously, mostly working over in the F# community – I am a *humanist*, not a *technologist*. The technologies are interesting in themselves to a degree; but I mostly care about the ways that technologies can help us serve people more effectively. As software developers, that takes a lot of shapes. But today I want to zoom in on just these two ideas about open-source software:

### Introduction: The Big Ideas

So: why these two ideas? For one thing, because I think they are among the most applicable to everyone here. We have an enormous open-source focus. But for another, because they can also serve as windows into the ways we can – and should – think about software more generally. So: let's talk about how you become a *contributor*.

### Introduction: Outline

We're going to take this on in the good old grammar-school fashion: *who*, *what*, *when*, *where*, *why*, and *how*. We're not going to take them in that order though, and we might smash a few of them together.

1. Introduction
2. Why bother contributing? <!-- .element: class="fragment" data-fragment-index="1" -->
3. Who is a contributor? <!-- .element: class="fragment" data-fragment-index="2" -->
4. What is a contribution? How can you contribute? <!-- .element: class="fragment" data-fragment-index="3" -->
    + ...so many things they won't fit on this slide. <!-- .element: class="fragment" data-fragment-index="4" -->
5. When and where to contribute? <!-- .element: class="fragment" data-fragment-index="5" -->
6. Conclusion <!-- .element: class="fragment" data-fragment-index="6" -->

## Why bother contributing?

The first question we might be asking is: *why contribute at all*? Why should you be interested in becoming a contributor? And the best answer I can offer is: because there is more work than hands to do it. Always. Every open-source maintainer can tell you the truth of this.

## Who is a contributor?

People define this differently, but I have a very simple definition: **A contributor is *anyone* who improves a project.**

### Who is a contributor? Examples

For example:

- submit a patch to fix a typo <!-- .element: class="fragment" data-fragment-index="1" -->
- add a small correction for a code sample in a project <!-- .element: class="fragment" data-fragment-index="2" -->
- file an issue instead of just suffering through a problem in silence <!-- .element: class="fragment" data-fragment-index="3" -->
- everything else we're going to talk about today <!-- .element: class="fragment" data-fragment-index="4" -->

### Who is a contributor? Me!

That might sound overblown, but it's really not. I am literally standing on this stage in front of you today because I submitted some small typo and code sample improvements to "Rust by Example" a few years ago, and realized: I can make a difference in this community.  And that gave me the motivation I needed to *keep* contributing.

![my first Rust commit](/talks/rust-belt-rust/img/first-commit.png)<!-- .element: class="fragment" data-fragment-index="1" -->

### Who is a contributor?

I don't imagine the story is all that different for *most* people who are open-source contributors in this room. Something got them over the hump, and it was probably something small, insignificant-seeming at the time. They might be particularly skilled in this thing or that thing, but in fact a lot of them are in those roles just because they saw a need and stepped up to fill it. And then kept at it for a long time. But it made them a contributor. And that feeling – of helping build something bigger than you can build on your own – is a good one. I'd go so far as to say it's part of what humans are *meant* for. It's part of us in a deep, deep way.

## Who is a contributor?

If you're inclined to quibble with that definition, I challenge you to ask *why?* I think, most often, it's because we feel defensive about wanting to project our own particular kinds of contribution as the most important, or the most valuable. But I'm more of the mindset that, as I read recently, "anyone who would be first… must be last of all, and servant of all." We should stop worrying about our own prestige and turf-marking, and start rejoicing in the many different ways people are able to make our projects better.

There's no magic that makes you qualified to be a contributor. There's just a willingness to serve where you see a need.

## What & how can you contribute?

And that takes us into the "what" of all of this, the *how*. (Yes, I'm combining those two). ***What* is a contribution? *How* can you contribute?** Turns out, this is a *long* list.

### What & how: code

Let's get this right out of the way up front, because it's the most obvious:  you can write code. You can fix bugs or help implement new features. You can do that even if you're not an expert – especially in the Rust community. Many Rust projects have gone out of their way to mark issues as good-first-issues, or easy-to-tackle, or mentorship-available. Maybe it's your first contribution to an open-source project: that's okay. You can take a stab at it, and the fact that it might not be good *is okay*. The whole point of these kinds of issues is that they give you a place where you can jump in safely.

![good first issue](/talks/rust-belt-rust/img/good-first-issue.png)
![mentored](/talks/rust-belt-rust/img/mentored.png)
![easy](/talks/rust-belt-rust/img/easy.png)

That goes equally for everything from the Rust compiler itself to many of the other projects in the ecosystem. Look at the  repository, for example! And it's not just this project. *Lots* of projects in the Rust ecosystem are like this.

#### What & how: code – we're kind here

And no one is going to swear at you or insult for making a mistake here. Not even if you're working on something important, and not even if you've been doing it for a while. That is not. how. we. roll. here. *Everyone* makes mistakes!

Instead, we *want* people to show up, knowing nothing: we're happy to help. Remember: we want people to contribute! So: try opening a PR and let people help you learn how to do it well! In fact, if you haven't ever opened a PR on a Rust project, find one that looks interesting to you and has an issue tagged that way, and submit a PR before the weekend is out! You can do it!

![good first issue](/talks/rust-belt-rust/img/good-first-issue.png)
![mentored](/talks/rust-belt-rust/img/mentored.png)
![easy](/talks/rust-belt-rust/img/easy.png)

#### What & how: code – a caveat

But code is not the only thing that makes you a contributor. I put it up front because I think it's worth doing – but I also wanted to get it out of the way. In every software community, it's easy to *over*-value the code. That might sound crazy, given that it's open-source *software*, but the reality is that no one fails to value the code. We *do* often fail to value all the other things that make an open-source software project actually useful. It's certainly true that there's no project without the code. But it's also the case that there's no *useful* software without a lot of other things besides the code, and we often undervalue those.

### Filing bugs

So let's take one step away from code, and talk about what is probably the single *easiest* way anyone can contribute. *File issues.* If you're using a binary and it doesn't work, open a ticket. If you're integrating a library and it seems like the API doesn't do what it should, or if it seems like it's missing some functionality… well, you can suffer in silence, or you can open a bug ticket! Many times, the author of the software *doesn't know there's a problem*. The only way they can fix it is if they know about it!

![filing bugs](/talks/rust-belt-rust/img/new-issue.png)

### Docs

Perhaps the thing most of you will be most persuaded of the utility of is *documentation*. All of us have faced the difficulty of trying to figure out how to integrate some poorly-documented (or undocumented!) library into our own codebase. That experience, in word, *sucks*.

So working on documentation is one of the highest-value areas you can contribute to any project. It's also really hard, in a bunch of ways – harder, in some ways, than writing the code is!

#### Docs: who?

One kind of documentation is **explanation of how things work under the hood**. The implementer is the most qualified there! That doesn't mean they don't still need help even with that, though! Some people are incredible implementors and terrible explainers; you can often do a great service by serving as an "interpreter" for them – taking their explanations and making the literary tweaks and cleanups and polish that they need.

Another kind of documentation, though, developers and maintainers are often really poorly equipped to write, and that's **introductory documentation**. This is the problem of expertise: when you know exactly how something is *meant* to work, and especially when you're the one who implemented it, there are things that seem obvious to you which simply aren't obvious to someone approaching it for the first time. And as hard as you try, you *can't* escape that entirely. You can imagine what it might be like not to know something, but there's no substitute for actually not knowing something.

#### Docs – how?

What that means is that one of the most valuable things you can do as you learn a new library is *write down the things you don't understand from the docs as you go*. And when you figure them out, *write that down, too*. If nothing else, writing up that experience – filing it as an issue on the bug tracker, or otherwise getting it in the hands of the maintainers – can help them make important changes to things like the order various concepts are introduced, or adding little notes to help people feel comfortable with not knowing something until it *can* be introduced later, and other things like that. It can help them recognize and fill in gaps in their docs – things they simply assumed but which they didn't realize they were assuming – and fill those in. At the most extreme, you might even help them realize that some parts of the docs need full rewrites… and the work you've done in writing things down might just be the foundation or the actual content of those new docs.

1. Write down the things you don't understand from the docs as you go.<!-- .element: class="fragment" data-fragment-index="1" -->
2. When you figure them out, write that down, too.<!-- .element: class="fragment" data-fragment-index="2" -->
3. Then: file an issue or write a PR to improve it!<!-- .element: class="fragment" data-fragment-index="3" -->

#### Docs: varieties

So what kinds of things would we call *documentation*?

-   API documentation<!-- .element class="fragment" data-fragment-index="1" -->
-   READMEs<!-- .element class="fragment" data-fragment-index="2" -->
-   Tutorials<!-- .element class="fragment" data-fragment-index="3" -->
-   Books<!-- .element class="fragment" data-fragment-index="4" -->
-   The Rust Reference<!-- .element class="fragment" data-fragment-index="5" -->

Okay, books are a *huge* undertaking, but they can genuinely serve as documentation. Especially for large projects. In fact, several of the most important pieces of "documentation" the Rust project itself has are books: "The Rust Programming Language", "Rust by Example", and "The Rustonomicon". But there are also important but totally unofficial books like Daniel Keep's "A Practical Intro to Macros in Rust 1.0" and "The Little Book of Rust Macros", or Jorge Aparicio's book on microcontrollers with Rust.

The Rust Reference: This is a special category, and one that's especially important to me. The Rust Reference is supposed to be an exhaustive guide to the language, and the value of that being complete and accurate is hard to overstate. It's also wildly out of date today. I wrote an RFC last year that said, basically, "We need to actually document everything! That includes updating the Reference!" The trick is: it's a huge undertaking, and while I and a few others made a good start on it earlier this year, that effort got bogged down by life, and it needs to be resuscitated. And it's not just Rust which could use investment in that area. Other languages and frameworks have the same issue. It's *really* important that there be an answer other than "dive into the source and try to figure out what its intent is" – the more central the component is in the ecosystem, the more important that is.

#### Docs: Translation

Another huge place you can contribute to documentation is *translation*. For good or ill, English has become the sort of *primary* language of programming, but that doesn't mean we should treat it as the *only* language, or as *more important* than other languages. Translating documentation is amazing and very needed work, and it's work that not everyone is really capable of! I'm fluent in English and… ancient Hebrew and ancient Greek. For some reason, there's not much demand for technical writing in Greek from the era when Plato was alive. So I'm not much use at translation.

![translation](/talks/rust-belt-rust/img/translation.png)

But many of you out there *are* multilingual, and could take docs written in English and convert them for, say, Czech-speaking developers. Perhaps just as importantly,  you can go the *other* direction, and help non-English-speaking maintainers reach a broader audience. Take an amazing project which only has documentation in Amharic (because its developers don't feel comfortable enough in English to translate it themselves) and translate it to English: *use* the fact that English *is* the common language to increase the reach of non-Western developers!

### Visual Design

One of the areas where you could move the ball down the field fastest in the Rust community is with ***visual* design**. (To be clear, the *language* design is great!) But our websites could sometimes use some work.

#### Visual design: it's not just us

Systems programming language types have historically *not* spent a lot of time on the *presentation* of their tools. In part this is just a matter of what these kinds of languages have been oriented towards: if you spend all day hacking on kernel code, you're *likelier* to be a person for whom user interface and visual design is less interesting than, say, optimizing memory performance or minimizing the number of cache misses a given approach has. But presentation *does* matter, and it matters especially as we want to enable more and more people to be able to write this kind of code.

Speaking frankly, though I've spent a large chunk of my career to date writing systems-level languages, I've found the way a lot of these tools are presented to be a huge turn-off, and at times a barrier even to getting them working for me locally. Perhaps the most egregious example of that was some of the "documentation" – I'm not sure I should even call it that! – for Fortran, when I was first getting started programming back in college. The presentation of the material was essentially hacker-ish in a *bad* way: no CSS, no attention to organization of the material, no structure to help you find your way through it.

#### Visual design: how

If you're an expert or just a talented amateur, please pitch in<!-- .element: class="fragment" data-fragment-index="1" -->

You can help here even if you're not especially comfortable with visual design or even if you're outright bad at it if you're willing to spend just a little time on it! For example, you can simply help a team adopt something like Bootstrap. Yes, it'll look like many other open-source projects out there. But it won't be horribly, catastrophically ugly and unreadable! Or you can do use one of these simple starter kits:

- [Wing](http://usewing.ml)
- [Pure.css](https://purecss.io)
- [Skeleton](http://getskeleton.coma)

So don't think that just because you aren't a design expert means you can't help here.

Just as important as the *visual* design is thinking about and actively designing the **information hierarchy** of your content. What leads to what? Which pieces go together, and which pieces can be broken up into their own pages or sections within pages? Think about the content like an *outline*. Many sites don't have any such structure to them; they're kind of haphazardly cobbled together. If you can help the maintainers with the *structure* and *organization* of their content, that can make an enormous differences as well.

### Blogging

One of the other big ways you can help a project may not even end up in the repository at all. You can *blog*.

I know blogging can seem intimidating, for many of the same reasons that writing documentation can. Technical writing is hard, and it's a completely different skill from programming. But it doesn't have to be amazing; it just has to get the information out there – and you'll get better as you practice.

#### Blogging: "Easy Mode"

You can start on "easy mode", too. I mentioned this earlier when talking about documentation, but "just write down what you're learning" is an incredibly effective technique for generating content. If you look at a lot of the technical blogging I've done over the years, it has been nothing more complicated than "here is what I just learned." And if you want a *superb* example of this which is *very* different from mine, take a look at the work that Julia Evans does on her blog! She regularly writes down, in an inimitable way, highly technical ideas she's just learning. If you want someone to make arcane Linux command line tools seem amazing and approachable, her blog is your ticket.

> Just write down what you're learning.<br/>
> —Me, just now

#### Blogging: good examples

But even beyond "what I just learned," blogging is a superb way for teaching in general. Over the course of this year, for example, Vaidehi Joshi has been writing what is essentially a friendly introduction to computer science on her blog on Medium. This is a totally different style of *content* (as well as of presentation!) from the kind of "what I just learned" content that Julia Evans writes,but it's also really effective, because she takes her knowledge and translates it into something others can pick up. That's obviously more work than just writing down things you just learned, but it can also pay really high dividends as others are able to substantially deepen their  knowledge.

#### Blogging: all the options!

In blogging, as in documentation, there is a whole spectrum of basic teaching content you can contribute! And communities need the whole spectrum for simple introductions to extremely thorough, advanced tutorials.

But blog posts can also be much more versatile than traditional documentation.

- **They can be one-offs, or series.** You can give a topic as much depth, or as little depth, as you *care about* or *think it deserves*. I wrote an 18-part series comparing Rust and Swift, and it could have been 30 parts if I hadn't eventually gotten derailed. That's not *documentation*, but there's a lot people can learn from those kinds of things.
- **They can introduce a technology, or dig deep into how to use it, or how it's built.** You're not limited to just one particular tack when blogging. Is your interest in the specific implementation details of some corner of the compiler? Write about that! Is your interest in how a given Rust library solves a specific kind of problem you've run into with another library, or with a similar library in another language? Write about that! You get the idea.
- **They can critique or highlight problems with specific pieces of the ecosystem!** A careful, well-articulated, critical blog post can do wonders for showing the problems with a given approach and can even sometimes help suggest the right solutions to those problems. I've repeatedly watched, for example, as people have blogged about their struggles getting their heads around the Tokio tooling; the result has been a *lot* of work by the Tokio team to respond to those problems. The more thoughtful and careful you are in that kind of criticism, the better! Good criticism is *incredibly* valuable. Because we all have blind spots, and someone else's perspective can help jar us out of those.
- **They can show how to *integrate* different parts of the ecosystem.** For example, as part of the "Increasing Rust's Reach" initiative, Ryan Blecher recently wrote up a detailed walk-through on how to use the Diesel ORM and the Rocket web framework together to build a small blogging engine. That's *huge*! It makes it that much easier for someone who's just starting out with Rust, coming in from something like Python or Ruby, to dive in and get that intensely rewarding feeling of *having built something* in a relatively small amount of time. That's also helpful because (almost) no one is building something with *just* Diesel, or just *any* crate. A huge part of what every software developer does is about fitting together other pieces of software.
- **They can invite feedback on your own projects.** Talk about what you're doing, what your stumbling blocks are, what you don't understand. People will often show up and help you with comments and clarifications!

And that's just scratching the surface. Blogs are incredibly versatile, and you should lean on that.

### Audio and Video

Not just words! Noises and pictures, too!

#### Audio: podcasts

- Not everyone learns the same way.<!-- .element: class="fragment" data-fragment-index="1" -->
- Lots of people have commutes.<!-- .element: class="fragment" data-fragment-index="2" -->

#### Audio: but there are already podcasts

Everything I've talked about so far has been in written form. But audio and video media can also be really helpful. Not everyone learns best by reading. And not everyone has tons of time to sit down and read a book every day. One of the reasons I started the New Rustacean podcast is that it gives people a way to get up to speed on the language while on a daily commute. But there's still a *huge* need for more audio and video content in this space!

One podcast is not enough!

![New Rustacean](/talks/rust-belt-rust/img/newrustacean.png)

*Two* podcasts is not enough!

![Request for Explanation](/talks/rust-belt-rust/img/rfe.png)

Seriously, not even *three* podcasts is enough!

![Rusty Spike](/talks/rust-belt-rust/img/rusty-spike.png)

So I'm laying down another challenge: there's plenty of room for more, and more kinds, of audio content in this ecosystem.

#### Video

Again: people have different learning styles!

There's also a huge opening for people to produce good video content. I've heard often from people that things like RailsCasts were essential in helping them learn the Ruby on Rails ecosystem. We *need* video tutorials which might look kind of like that, or like the kinds of things I'm doing on the podcast. If you have any skill that way, and any interest in teaching, you should make Rust videos – there aren't many out there.

#### Video: what

There are lots of options here---not just live streaming!

Another, totally different tack you can take with video is *live-streaming*. Sean Griffin has done this at times, and I've actually done it just once, and it's a ton of fun – and it can be incredibly illuminating for other people to see how you work and how you solve problems. You can also do like I did and live-pair on something. It's a pain to set up, but it's also a lot of fun.

And no doubt there are more ideas you have---please just go do them!

### Talk to people

Just talking with people matters. And there are lots of places to do it:

- IRC/Gitter/Slack/Discourse
- Meetups
- Conferences

You can also host or help with a local meet-up! For a lot of people, one of the major challenges of learning *any* new piece of technology is that – even with IRC and Gitter and Slack and so on – you can feel isolated and alone. And people can help you solve problems in person, and make you feel supported in person, in ways that even a great community can't really manage online. So *go* to meet-ups, at a minimum. And help the organizers. And if there isn't a meet-up in your community... you can start one! The #rust-community team has a ton of resources.

Physicality matters. Presence matters. (We know this! We're at a conference!)

### Being inviting

Last but not least in this list of *how* to be a contributor, I want to take a minute and talk about "being a contributor" to those of you who've been contributors for a long time. Some of you have been shipping open-source software for years – some of you even for decades. Much of what I've said so far is old hat for you. Maybe not the design bits quite so much! But you've been doing this for a long time, and you're not trying to get over the hump of making your first contribution. You have other things to contribute here:

-   The most important thing you can do is practice **welcome people.** The Rust community does this well, in general, but it's something we need to keep in front of us as a goal as the community grows. It's easy to get frustrated with newcomers as your project grows, demands on your time increase, and your work as a maintainer seems less like fun and more like a second job. But continuing to actively welcome newcomers in is *incredibly* powerful. You can make it possible for people to go from zero to really making a difference. And remember: so once were you. None of us started out as magical wizards of Rust and open-source.

-   The second big thing you can do is **mentoring.** As I mentioned, I'm now the maintainer of one of the core pieces necessary to make Ember.js and TypeScript play nicely together.  But while I've done *some* writing-of-code with that, a much larger part of my current and future work there is about helping other people learn TypeScript well enough to start using it in their apps and add-ons. But the flip-side of that is: even a fair bit of the code I *have* written, I was able to write because someone more comfortable with some of the infrastructure mentored *me* through its quirks and oddities.

## When & where to contribute

The last thing I want to touch on is *when and where* to contribute. There are two things I'd suggest you should consider here:

### When & where: you

Where are *you* in the process of becoming comfortable with contributing?

- Just getting started?<!-- .element: class="fragment" data-fragment-index="1" -->
- Already comfortable?<!-- .element: class="fragment" data-fragment-index="2" -->

If you've never done any open-source work at all before, that's different than if you've gotten pretty comfortable with it in a different ecosystem and are just figuring out where to make yourself useful in *this* ecosystem.

#### When & where: if you're just getting started

If you're just getting started, I'd pick a big project with lots of those "Help Wanted" and "Mentoring" and "Easy" tags on issues, and let the size of the project help you out. Those are projects that are *used to* helping people make their first contributions. Crazy as it seems, something like Servo can actually be an *easier* place to start out that a much smaller project. Sure, the technical lift is higher, but there are also a lot more people actively invested in your success there.

1. Look for these!<!-- .element: class="fragment" data-fragment-index="1" -->

    <p class="fragment" data-fragment-index="1">
    ![help wanted](/talks/rust-belt-rust/img/help-wanted.png)
    ![help wanted](/talks/rust-belt-rust/img/easy.png)
    </p>

2. Pick big projects!<!-- .element: class="fragment" data-fragment-index="2" -->

#### When & where: if you're experienced

On the other hand, if you're already comfortable contributing and have some idea what you're best at, you might look around and find smaller projects with fewer contributors which look interesting and *could use the help*. Because again, there's always more work to do than hands to do it.

#### When & where: project lifecycles

The second consideration dovetails nicely with that: **where is a given project at in its life-cycle?** As enthusiastic as you might be about some project, if it's a small project and it's already in a "basically done" state, well... that's probably a lot less useful a place to invest your time *if* you're focusing on code. On the other hand, it's often the case that projects are "done" in terms of code, but desperately need help with documentation, their web site, etc. Big projects, or projects just starting out, are often better places to dig in if you're really looking to flex your coding muscles (but both of them *also* usually have huge needs in terms of all those non-code avenues we talked about).

Where is a given project at in its life-cycle?

- small project, basically done?<!-- .element: class="fragment" data-fragment-index="1" -->
- need docs?<!-- .element: class="fragment" data-fragment-index="1" -->
- big project, a billion needs?<!-- .element: class="fragment" data-fragment-index="1" -->
- etc.<!-- .element: class="fragment" data-fragment-index="1" -->

Think about those, and then see if you can pick a project that's a good fit for your current skillset and comfort level and jump in!

## Conclusion

And that's a good place to wrap things up! I hope you're feeling like *you can do this*. Because you can. Open-source a project of your own and see where it goes. Write a blog post. Add some docs. Open a PR. Record a podcast. Make some videos. Start a meet up. Become a contributor! And remember:

- Anyone can contribute meaningfully.
- People can contribute in a stunning variety of ways.

## More info

- <https://www.rust-lang.org/en-US/contribute.html>
- <https://blog.rust-lang.org/2017/09/18-impl-future-for-rust.html>
- <https://internals.rust-lang.org/>
- `#rust`, `#rust-community`, `#rust-internals`, etc. on irc.mozilla.org
