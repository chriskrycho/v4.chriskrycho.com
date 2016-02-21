---
Title: Error-Handling in Ember.js, Part I
Subtitle: TODO
Date: TODO
Tags: software development
Status: draft
...


Over the last couple of weeks, I've been coming up to speed at my new employer,
Olo, and my first real task has been writing an error-handling service for an
application we're getting ready to deploy. There are a fair number of comments
and tutorials out there about Ember error-handling, as well as a few really good
examples in the form of Ember CLI addons. However, none of them quite covered
*everything* I've run into, so I thought I'd document it here---mostly for my
own sake, when I inevitably need to look it up later, but also for the sake of
anyone else looking to do something similar. I will particularly focus on
testing, as that's an area where the Ember guides have a few pieces missing. (If
and when I have sufficient comfort with the material to do so, I'll just
contribute to those guides myself!)

The basic outline of the series is:

1.  Ember errors overview
      - Promises
      - Logger errors
      - Uncaught `window` errors
2.  Services
3.  Initializers
4.  Components
5.  Routes

In the first post, I will look at the various pieces we need to address. In each
subsequent post, I will explain how to deal with errors in one or more parts of
the Ember puzzle.

---

Today, I will simple take a basic look at the kinds of errors we need to handle
in Ember. I'm specifically focusing on top-level errors. I expect, if you're
reading this, that you're familiar with the `try...catch...` pattern for dealing
with ordinary thrown errors in JavaScript, and that you're also familiar with
the newer ES2015 Promises (and Ember's not-quite-ES-2015 Promise implementation
in `Ember.RSVP`). If you're *not* familiar with those, you should familiarize
yourself with them first.

There are three times when 