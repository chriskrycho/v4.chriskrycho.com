---
Title: Just Write Down What You Do
Subtitle: >
    Career tip: for every day, week, and month, summarize the things you accomplished.
Date: 2018-11-13 19:50
Category: Blog
Tags: [career, productivity, getting things done]
Summary: >
    Career tip: for every day, week, and month, summarize the things you accomplished.

---

<i class=editorial><b>Assumed audience:</b> people already persuaded of the value—at least to some extent—of "getting things done" strategies and having an idea of what you accomplished over the course of the year.</i>

For the last few years, I’ve had a habit—not kept perfectly, but done more often than not, courtesy of my daily [pomodoro](https://www.chriskrycho.com/pomodoro/) discipline—of writing down what I do each day. Then, every week, I take a look at what I did each day, and turn that into a summary for the week. And every month, I look over my notes for weeks that made up that month, and write down what I did that month.

This has been *fantastic* for me professionally. For one thing, it gives me a quick and easy way to see what I’ve done over the past however-long-between-performance-evaluations. The inevitable “What did you accomplish this year?” question has an an easy answer: I can look over my month-level summaries and summarize *those*. (I’m inevitably frustrated by the months where I slacked off and don’t actually know what I did when do this exercise!)

Writing things down like this is also a helpful tool personally. I can look back at long stretches where I feel like I didn’t get a lot done and realize just many things I *did* actually do. I have found this a helpful way of staving off the malaise that inevitably comes from months where there are just too many meetings, for example. What did I do? I <i>effected these changes</i> (even if they weren’t in the form of code!).

I use [Bear](https://bear.app) for this, but you could do it anywhere: a Word document or Google Doc, a notepad on your desk, in Emacs’ [Org Mode](https://orgmode.org), with [TaskPaper](https://www.taskpaper.com), or in [Trello](#) (like my friend and colleague Ben Collins [does]), or, well… whatever gets the job done.

[does]: https://benjamincollins.com/blog/using-trello-to-organize-my-daily-work/

The main thing is: write down what you did! Write it down at each of these scales, because it’s far easier to write down the larger scales if you wrote down the smaller scales. Once you start doing this regularly, you’ll probably find yourself frustrated at the times you failed to do it. (If you’re like me, those times will exist. It’s okay. Just start back up.) And again: make it fit you. But it’s one of the best tools I know of for personal and professional development, so I commend it to you!

----

## Bonus: My Bear Templates

In case you’re curious or want to copy my approach, here are the templates I use in Bear for each of my logs.

### Daily Log

The daily log is the core of my entire productivity approach system, as well as the foundation of this specific logging strategy. These entries each includes:

- The date, which I format `YYYY.MM.DD`—today would be `2018.11.13`. A numeric year/month/day makes correctly sorting the notes easy. I use a period for the separator mostly because it looks nice in the font I use in Bear.

- A link to the parent week for the day, to make it easy to jump back and forth between individual day logs and a weekly log (as you’ll see below).[^bear-links]

- A set of goals. I set the goals either at the beginning of the day, at the end of the preceding work day, or a combination of the two. I usually limit myself to 3 goals, unless I *know* I have a bunch of very small tasks.

- A list of pomodoro sessions. The pomodoro technique is *most* effective for getting things done—both in my experience and as others describe it—when each block has both a discrete goal and what you actually got done. This helps me keep my focus during that session rather than getting sidetracked. I further break these down with **Session 1**, **Break**, **Session 2**, etc. subheads—not because this makes me productive, but just because I like it.

- A summary of the day as a whole. At the end of the day, I look back over the sessions and my goals, and write a sentence or two about what I did. This is also often a good time for me to write up the next day’s overarching goals and first session goal: I have a much better idea what I should be doing next when I’m wrapping things up for the day than I will the next morning!

- A set of checkboxes for me to track whether I succeed in breaking my day into 15 discrete pomodoro sessions,[^15-sessions] and in standing at least 5 hours out of the day every day.

[^bear-links]: `[[<some text>]]` is Bear’s way of doing internal links to a note named `<some text>`.

[^15-sessions]: 15, not 16, because of the slop that ends up in most days. Most days, more than one session ends up being 35 minutes instead of 25. Over the course of the day, those come out to being the remaining half hour in the full 8 hours I make sure I give my employer. I know that from measuring consistently when I was working as a consultant: my [Toggl](https://toggl.com) logs told the story clearly.


```md
# <YYYY.MM.DD>

**Week:** [[]]

## Goals

- [ ] ::TODO::

---

## Details
### Session 1

1. **Goal:** ::TODO:: **Actual:** ::TODO::

---

## Summary

::TODO::

---

## Rhythm
### Pomodoro

- [ ] 1
- [ ] 2
- [ ] 3
- [ ] 4
- [ ] 5
- [ ] 6
- [ ] 7
- [ ] 8
- [ ] 9
- [ ] 10
- [ ] 11
- [ ] 12
- [ ] 13
- [ ] 14
- [ ] 15

### Stand

- [ ] 1
- [ ] 2
- [ ] 3
- [ ] 4
- [ ] 5
- [ ] 6
- [ ] 7
- [ ] 8
- [ ] 9
- [ ] 10
```

### Weekly log

The weekly log is just a place for me to be able to easily capture the results of my daily efforts. It links to the monthly log at the top just like the daily logs link to the month: for easy jumping back and forth. Each of the bullet points under **Details** gets linked to a daily log entry, and the `::TODO::` items get replaced with the **Summary** from the daily log. At the end of the week, I write a summary of the whole week.

The **Goals** heading here is new, something I only just started doing in the last couple of weeks, but so far it has proven helpful for me as I orient myself to what I want to get done on any given day.

```md
# <YYYY.MM.DD> – <YYYY.MM.DD>

**Month:** [[]]

## Goals

- [ ] ::TODO::

## Details

- [[]]: ::TODO::
- [[]]: ::TODO::
- [[]]: ::TODO::
- [[]]: ::TODO::
- [[]]: ::TODO::

## Summary

::TODO::
```

### Monthly log

The monthly log is exactly like the weekly log, but one level higher. It links back to individual weeks for easy jumping back and forth between the two views, and it newly has month-level goals. (As with weeks, I’m still experimenting with those!) The **Details** bullets get filled in with links to weeks and the summary of each week copied over. At the end of the month, I take a few minutes to summarize those weeks. Unlike the lower-level summaries, I let that month-level summary expand out to a paragraph if need be. A lot tends to happen in a month!

```md
# <YYYY.MM>

## Goals

- [ ] ::TODO::

## Details

- [[]]: ::TODO::
- [[]]: ::TODO::
- [[]]: ::TODO::
- [[]]: ::TODO::

## Summary

::TODO::
```


