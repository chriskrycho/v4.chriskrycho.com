---
Title: The Front End is a Full Stack
Subtitle: Or, a sketch of modern front-end web development.
Date: 2018-02-14 10:30
Category: Tech
Tags: talks
Status: draft

---

So I've chosen something of a provocative title for this talk, and that's on purpose. At Olo right now, like a lot of other companies, we have "full stack developers" and "mobile engineers" and "front end engineers" and so on. And I understand what those terms mean, of course. But I think they're increasingly misleading, and as the landscape continues to change around us, so should our understanding of these roles. In the course of the rest of this talk, I'd like to give you all something of an introduction to modern front-end web development, and by the end I hope you both understand it better and also understand why in the world I would title the talk this way!

## History

Let's start with a little background, though---a brief history of how we got to where we are today. I think that's not only useful, but important. Even in a discipline as relatively young as software engineering, we have history, and that history informs why we use the terms we do today, and how think about different parts of our field, and how we go forward from here. So: some history.

Once upon a time, there was just HTML. No JavaScript, no CSS, just plain old HTML. Being a "web developer" in that era mostly meant figuring out how to set servers up to spit out those HTML pages, and, eventually, to respond to form inputs.

The introduction of JavaScript in late 1995 and CSS in 1996 fairly radically changed the game---although JavaScript caught on much faster than CSS did. Both let you create visuals and behavior in the browser in much more sophisticated ways than plain-old-HTML-with-tables-and-images alone could do. By the early 2000s, that turned into the basics of what became the ever-more-popular AJAX and initiatives to popularize CSS like the CSS Zen Garden.

From the early 2000s until the early 2010s, a *lot* of web development meant doing some of everything: SQL, some server-side language (early on a *lot* of Perl) HTML, CSS, and JavaScript---the "full stack." If you were building a web app, you were building it basically like this:

++TODO: sketch of rendering HTML++