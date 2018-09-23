---
Title: Curriculum Vitae
Subtitle: >
    I am currently a senior software engineer, focused on web <abbr>UI</abbr>, typography, functional programming—and ethics.
# Template: formats/resume
Summary: >
    I am currently a senior software engineer, focused on web UI, typography, functional programming—and ethics. You can have my traditional résumé, but this page will tell you a lot more about whether we might work well together.
Status: hidden
---

In helping hire people over the last few years, I’ve seen a lot of résumés. Even the best of them leave a lot to be desired: they lack context and narrative. So if you’d like a traditional résumé for me, you can snag it [here](http://cdn.chriskrycho.com/resume.pdf)—but if you’d like a better idea of whether we might work well together, I think you’ll find the rest of this page a lot more helpful. If you're interested, [say hello](mailto:hello@chriskrycho.com?subject=Read%20your%20CV)!

- [<i>About Me</i>](#about-me)—my philosophy of software development and my unusual educational background
- [<i>My Work</i>](#my-work)—not just where I’ve worked and the tech I used, but what I brought to the table and the difference I made
- [<i>My Projects</i>](#my-projects)—including podcasts I produce, talks I've given, and open-source software I’ve developed or contributed to

----

## About Me

I am currently a senior software engineer, focused on web <abbr>UI</abbr>, typography, functional programming—and ethics. Besides my varied full-stack web development experience, I bring to the table half a decade of experience in systems-level programming (including avionics software and computational physics models), an [undergraduate degree in physics](#undergrad), a [master’s degree in theology](#masters), and a passion for building the *right things* in the *right way*.

Building the *right things* means I’m not particularly interested in startups whose vision consists of either “tear down an existing industry” or “applying software will solve all our problems.” I’d much rather work for a company with both a vision for how its product improves human lives and also a recognition of the limits of technology—which is never a panacea for human ills and too often simply reinforces the worst of our existing failings. **Ethics is foundational for good software engineering.**

Building those things the *right way* means I’m not interested in slapdash product development and rushed delivery on the one hand, or infinite delays in pursuit of a perfect implementation on the other. Instead, I want both to get a piece of software live and also to improve it continuously after launch. **Shipping is a feature—and equally so is quality.**

### Education

<a name=masters></a>I graduated with honors with a **Master of Divinity** from **Southeastern Baptist Theological Seminary** in **May 2017**, after 4.5  years simultaneously pursuing the degree and working as a software developer. I am not a pastor by vocation, but I care deeply about the ethical, social and, yes, spiritual implications of the software I build.

<a name=undergrad></a>I graduated *magna cum laude* with a **Bachelor of Science in Physics** from **The University of Oklahoma** in **May 2009**, having been a regular departmental award winner. My senior thesis, a project in computational neurophysics (in Fortran 90!), led me into programming—but I admit I still miss doing physics and math on a regular basis.

## My Work

### Olo (Current)

*From individual contributor to a project lead with organization-wide influence.*

**Since January 2016**, I have been a front-end-focused software engineer at [**Olo**](https://www.olo.com), a scale-up-phase startup which is the leading provider of online ordering for large restaurant brands.

As a **Software Engineer** (January 2016–May 2017), I was a productive individual contributor even while working 30-hour weeks as I completed my M. Div.: I led the adoption of a **test-driven development** approach in a greenfield **Ember.js** rewrite of our mobile web <abbr>UI</abbr>; introduced JavaScript type systems to the application (landing on **TypeScript** after an initial experiment with Flow); and helped us achieve **full <abbr>AA</abbr> <abbr>WCAG</abbr> accessibility**.

As a **Senior Software Engineer** (May 2017–present), I *led a team effort* to expand our mobile web <abbr>UI</abbr> as a **responsive web <abbr>UI</abbr>** to reduce our maintenance burden, improve our overall <abbr>UX</abbr>, and decrease the cost of launching new features. To support those business goals, I designed a new technical strategy for white-labeling (including the adoption of **<abbr>CSS</abbr> Modules**), enabling the business to scale to support more brands by way of better tooling.

To support that design work, I introduced **<abbr title="request for comments">RFC</abbr>s** (modeled on the <abbr title="request for comments">RFC</abbr> processed from the Rust and Ember communities) as a tool for architecture design and documentation. After using <abbr title="request for comments">RFC</abbr>s successfully within our team, I pitched them to the broader engineering organization—which ultimately adopted them as a useful tool for documenting internal architectural changes and as prerequisites for all new services.

In this same span, I also led the community effort to **integrate TypeScript with Ember.js**; helped launch a shared component library for future rich client projects; gave over a dozen internal tech talks on subjects including Ember.js basics, functional programming techniques, and introductions to Rust and Elm; and substantially shaped our front-end engineering practices and tooling choices as an informal leader among our front-end engineering group.

### Earlier Work

#### [HolyBible.com](https://holybible.com)

*A formative experience: a technical success but a product design failure.*

[HolyBible.com](https://holybible.com) is a beautiful interface for reading the King James Version of the Bible and the [Reformation Heritage Study Bible](https://kjvstudybible.org) materials online, built for [Puritan Reformed Theological Seminary](https://prts.edu). The <abbr>MVP</abbr> launched in **December 2014**, with approximately 16 months of small bug fixes and feature enhancements following.

I worked closely with a designer to create the visual language for the app before diving into the implementation solo. The app uses **AngularJS**, **Express/Node.js**, and **PostgreSQL**; I also did a great deal of <abbr>XML</abbr>-mashing in **Python** for the Bible source text and study bible integration.

The project was a *substantial technical success* (it has neither crashed nor had a bug reported since spring 2017)—one I’m doubly proud of because it was only the second time in my career I’d built an entire non-trivial web application from scratch, and the first time I did so solo.

On the other hand, the project was a *mixed success as a product*. The site is beautiful and functional, but it failed to meet the seminary’s goals for driving more traffic to the seminary landing page. My failure to establish what “success” meant to the seminary led me to deliver a technically-solid piece of software… that solved the wrong problem.

#### Quest Consultants, Inc.

*Collaborating across disciplines effectively and adjusting to remote work.*

From **May 2012–January 2016**, I worked (first as a full-time employee, then remotely as a half-time consultant) for [**Quest Consultants, Inc.**](http://www.questconsult.com). During that time, I improved the performance of one existing computational hazard model by a factor of 7, rewrote another computational model in **C** (from Fortran 77), supported another rewrite effort (again from Fortran 77) to **Python 3**, and also helped the team adopt **version control** (Mercurial) and **bug tracking software** (JIRA).

Those efforts taught me a great deal about communicating effectively with domain experts, working remotely (as I did beginning in January 2013), testing effectively, refactoring legacy codebases safely, and wrangling large software development efforts over time.

#### Northrop Grumman

*Learning the basics of software engineering.*

From **July 2009–May 2012**, I worked as a **Software Engineer I** on the B-2 program at [**Northrop Grumman**](http://www.northropgrumman.com/Pages/default.aspx). My work included writing **C** targeting a real-time operating system and developing requirements for a modernized message bus architecture. My basic implementation of the *Sparse A\* Search Algorithm* was used as a performance baseline for route-finding software on the platform.

During those three years I acquired a good dose of humility along with a great deal of basic knowledge of software engineering disciplines, including the use of source control, patterns for writing maintainable code, and the importance of good tests.

#### Miscellaneous web development and consulting

*Teaching myself web development.*

**Beginning in January 2010**, I taught myself web programming, beginning with <abbr>PHP</abbr> and jQuery and the <abbr>LAMP</abbr> stack, having picked up a good working knowledge of <abbr>HTML</abbr> and <abbr>CSS</abbr> for my own blog in college. I started by building church websites and blogs for friends in WordPress, and eventually (while working as a subcontracting consultant for [Innova Computing](https://innovacomputing.com)) developing a custom <abbr>CMS</abbr> for the Oklahoma Board of Medical Licensure.

My goal throughout was not merely to make some extra money—nice though that was—but to actually be able to transition from the world of C and Fortran where I began my career to working full time in web development, especially <abbr>UI</abbr>-focused web development: a goal I eventually achieved through [my work on HolyBible.com](#holybible.com) and my transition [to Olo](#olo-current).

## My Projects

Besides my family life, church participation, and day-to-day work, I am also a prolific writer, podcaster, and open source software contributor. My writing you can find primarily on this website; I focus primarily on technology, ethics, and faith (though if you want to read my so-so poetry, [that’s here too](https://www.chriskrycho.com/poetry)).

### Podcasts

- [**Winning Slowly**](https://winningslowly.org): cohosted with [Stephen Carradini](https://stephencarradini.com), a show about taking the long view on technology, religion, ethics and art. Stephen describes it (accurately) as a show focused on tech, but from the angles of religion, ethics, and art. I describe it (also accurately) as our excuse to talk about whatever we want, since “technology, religion, ethics and art” pretty much touches on all of human existence. For a good sample of the way I approach **software and ethics**, check out [6.06: A Kind of Blindness,](https://winningslowly.org/6.06/) on smart cities, “big data”, and the meaninglessness of mere information.

- [**New Rustacean**](https://newrustacean.com): a show about the **Rust** programming language and the people who use it—dedicated primarily to *teaching* people Rust. Initially a way of helping myself stay motivated to keep up with learning the language, New Rustacean is now one of the most popular resources for people learning Rust and has inspired a few other teaching-programming-languages podcasts.

### Open Source Software

#### TypeScript in the Ember.js community

As we began actively adopting TypeScript in our Ember.js app [at Olo](#current), we very soon ran into the limitations of the existing support. Integration with Ember’s <abbr>CLI</abbr> tooling was limited; the type definitions were a mix of incomplete, unhelpful, and outright wrong; there was little information about how to use TypeScript *effectively* with Ember; and, worst of all, no one was actively contributing to fill these gaps—much less leading.

In March 2017, I began working on the <abbr>CLI</abbr> tooling and the type definitions for the Ember ecosystem. Once I began leading the effort, several others began contributing actively; in early 2018 we formed a small team working on shepherding Ember and TypeScript integration forward. Over the rest of 2017 and 2018, I have [taught](https://emberconf.com/schedule.html#d-typescript-up-your-ember-js-app "EmberConf Workshop: “TypeScript Up Your Ember.js App”") and [written extensively](https://www.chriskrycho.com/typing-your-ember/ "Typing Your Ember series") on using TypeScript effectively with Ember, and our small team’s efforts have made TypeScript both viable—and increasingly, mainstream!—as a choice for Ember apps and addons.

#### True Myth

In the **fall of 2017**, I developed [True Myth](https://github.com/chriskrycho/true-myth): a **TypeScript**-targeted library with `Maybe` and `Result` types. Several existing libraries in the space work excellently but had a number of downsides, including second-class support for TypeScript, runtime overhead, and <abbr>API</abbr>s designed to mirror Haskell or Scala rather than to be idiomatic JavaScript. True Myth was my attempt to fill that gap, supplying **idiomatic JavaScript <abbr>API</abbr>s**, while achieving **zero runtime overhead** (beyond the inherent cost of the container types themselves) by relying on TypeScript to handle type safety at build time.

I wrote [extensive documentation](https://true-myth.js.org/) for the project, and while I have slightly expanded the library since its initial release with additional helpers and tooling as TypeScript has supported more capabilities, it is largely [done](https://www.chriskrycho.com/2018/stable-libraries.html).

### Talks

- **Rust and WebAssembly** (Denver/Boulder Rust Meetup, May 2018)

- **[TypeScript and Ember.js: Why And How](https://m.youtube.com/watch?v=fFzxbBrvytU)** (Ember <abbr title="Austin, Texas">ATX</abbr> Meetup, April 2018):

	> **Abstract:** A three-part look at Ember.js and TypeScript today: What are the benefits to me as an Ember developer for using TypeScript? What are the tradeoffs if I adopt TypeScript? Where are things going from here?

- **TypeScript Up Your Ember.js App** (EmberConf 2018 Workshop, March 2018):

	> **Abstract:**an introduction to TypeScript and how to use it with Ember.js, with a worked example of converting part of the Ember.js <abbr>TODO</abbr> <abbr>MVC</abbr> app from JavaScript to TypeScript.

	The workshop was not recorded, but the teaching materials are all available online:

	- [slides](https://github.com/chriskrycho/emberconf-2018-slides/) and [script](https://github.com/chriskrycho/emberconf-2018-slides/blob/master/talk.md) for the introduction to TypeScript and overview of using it in Ember
	- [sample code repository](https://github.com/chriskrycho/emberconf-2018), where each commit is a discrete step in the process of the conversion

- **[Becoming a Contributor](https://m.youtube.com/watch?v=Abu2BNixXak)** (Rust Belt Rust 2017, October 2017):

	> **Abstract:** So, you’re new to the Rust community. (Or any community, really!) And you want to help, but, well, you’re new. So how exactly do you start contributing? What kinds of contributions are valuable? We’ll talk about everything from asking questions to writing documentation, from pitching in on forums and chat to writing blog posts, and from starting your own projects to contributing to other open-source projects.

- **[*Tolle Lege!* Designing Readable Bibles With Digital Typography](https://m.youtube.com/watch?v=cDAh35IwJsE)** (BibleTech 2015, May 2015):

	> **Abstract:** The Bible has always been a challenging text to display, whether copied by hand or printed on a Gutenberg press, and the task has only grown more complicated in the era of digital text. The challenges are not insurmountable, though. We have the tools to solve them: the principles of good typography, especially careful page design and the deliberate choice and skillful use of appropriate typefaces (fonts). When we apply those principles to the Scriptures—whether in an app or on the web—we can provide people with digital Bibles that are both readable and beautiful.
