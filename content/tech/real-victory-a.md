---
Title: A Real Victory
Subtitle: Today—just shy of two years since I started adding types to our Ember app—it fully type-checks.
Date: 2018-09-05 21:45
Category: Tech
Tags: [TypeScript, JavaScript, Flow, Ember.js, software development]
Summary: >
    Today—just shy of two years since I started adding types to our Ember app—it fully type-checks.

---

On September 29, 2016, I started working on adding ([Flow](https://flow.org)) types to the [Ember](https://emberjs.com) app I had been working on since the start of the year. Throughout the rest of the year I worked on adding some basic Flow types to our app and for Ember. For my last commit in 2016, I switched us to TypeScript and began the rest of the long journey to fully type-checking our app. In early 2018, we made it to “the app type-checks”… in the loosest strictness settings.

And as of 6pm today—September 5, 2018, almost two full years later, and 21 months after we switched from Flow to TypeScript (more on this below)—we have a fully type-checked TypeScript Ember application, with the strictness notches dialed as strict as they will go.

It took almost two full years for us to get there, and I’m incredibly proud of that work.

It took almost two full years because it was a lot of work, and slow work to do at that, and it was rare that I could block out any large chunks of time for that work—we had to sneak in improvements between features we were working urgently on for our clients and our own internally goals. More, it wasn’t just the work of adding types to our application. It was also the work of writing types for Ember itself, and for the surrounding ecosystem—which thankfully I did not finish alone, but which I did have to start alone. It was the work of integrating (and reintegrating) TypeScript into Ember’s build pipeline.

Happily, I did *not* do most of that work alone, and even on our app I’ve had a ton of help getting the types in place. But it has been a massive task, and finishing it today was a real victory. It’s not perfect. We have 200-or-so instances of `any` in the application (most of them in semi-legitimate places, to be fair), and I wish it were more like 20. We have a number of places in the app with the `!` “I promise this isn’t `null` or `undefined` here” operator on some nullable field, with long comments explaining *why* it’s not possible for it to be null there.[^1]

But it type-checks today, and type errors fail the builds, and that *is* a real victory.

---- 

You can consider this “part 1” of my thoughts on what feels to me like a pretty significant achievement. I’ll hopefully follow this up with some backstory sometime in the next few weeks.

[^1]:	See my [recent post](https://v4.chriskrycho.com/2018/type-informed-design.html) on thinking a lot about design decisions I would have made differently with TypeScript’s strict null checking available from day one!