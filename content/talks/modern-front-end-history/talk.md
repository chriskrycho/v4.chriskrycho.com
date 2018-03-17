# Why the Front End is a Full Stack

## (Or, a sketch of the history of modern front-end web development.)

## Chris Krycho

*****

Note:

*****

### The Only Constant is Change

This can be disorienting.



> Where’s my C♯?

Note: I imagine more than one of you has had this experience sometime in the last couple years. You go to poke at the mobile web client repository to see how to implement a given feature, and it’s this completely foreign-to-you landscape: all JavaScript and TypeScript and Handlebars templates, no C♯ or Razor templates to be seen. No jQuery, either!

---

### The Only Constant is Change



Note: Many, perhaps *most* of you, were jQuery slingers at some point in your career – and many of you were *comfortable* with that paradigm. So now you walk into one of our front ends and it can feel kind of like this. \<click\>

---

Note: But it turns out there are really good reasons for how things have changed in the last decade, and I thought it’d be helpful to walk through those reasons.

I’m not going to talk about the whole history of JavaScript starting back in 1996, interesting though that will be. Instead, I’m going to take as our jumping-off point the era where things really started to change. And we’re just going to walk through from the start of the jQuery era to today, looking over and over again at a motivating problem and the solution to that problem. And then we’re  I’m going to skip a *ton*, of course. But we’ll get the highlights, at least!

---

### Ecosystems move fast sometimes

C♯ 5

	namespace MyStuff {
	    public class MyThing {
	        public string FirstName;
	        public string LastName;

	        public string FullName {
				return FirstName + LastName;
		    }
	    }
	}

C♯ 6

	namespace MyStuff {
	    public class MyThing {
	        public string FirstName;
	        public string LastName;

	        public string FullName => FirstName + LastName;
	    }
	}

Note: One other thing that’s probably helpful to keep in mind as we go is that JavaScript has changed a *ton* in the last five years, but that happens to all sorts of languages at specific points in their history. If you look at any given 5-year period in C♯ and imagine yourself working in a context where you didn’t really need to pay attention to its changes because you only surfaced from something like SQL query optimizations every once in a while to help someone with an ORM issue, well… when you started and when you finished that 5-year period, you’d probably be surprised to see how much C♯ had changed.

*Part* of the reason that JavaScript seems to move so fast is that for *most* developers, JavaScript is not their primary language. Part of it is also that it has changed a lot really quickly. But it’s definitely a both-and, not an either-or.

*****

### Problem: the browser support matrix

It’s 2008.

I have to somehow write JavaScript that works in…  

- IE6
- IE7
- Firefox
- Safari for Windows
- this cool new browser from Google, Chrome
- Safari for iOS, I guess? How is that going to work?

Note: if anyone worked in this era, you will remember: it was *truly* a nightmare. As much as we get frustrated today about cross-browser compatibility bugs when they still spring up, it was a different world a decade ago.

---

#### Solution: jQuery (and MooTools and Prototype)



*****

### Problem: the browser support matrix (again!)

```js
class Foo {
  bar() {
    console.log('yay');
  }
}
```
is way better than

```js
function Foo() {}
Foo.prototype.bar = function() {
  console.log('yay');
}
```

but I still have to support IE9 😭

Solution: Babel

*****

Metaproblem: managing state (in the extra complicated world of UI)
Metasolution: separate your concerns, just like we do with SQL.

---

Problem: how do I keep track of the state of my application?
Answer: I’ll just use the values in the HTML!

---

Problem: values in the HTML make me scrape strings out and convert them to the desired type, and comparisons like that are iffy at best.
Answer: we’ll use data attributes.

---

Problem: even with data attributes, it’s hard

---

So what are we left with? Well, something resembling today’s front-end stacks! With Ember.js, for example, we have a set of tools that pulls all of this together for us:

- Ember itself abstracts over the remaining browser inconsistencies (historically, by using jQuery! Though that’s going away now)

- Ember’s templates and components know all about each other – there is no gap between them; they *define* each other. You write JavaScript or TypeScript side-by-side with Handlebars, and there’s no scraping the page to figure out what has changed. Updates in the one automatically invoke functions in the other.

- Ember CLI provides us easy hooks to use Babel without configuring it directly – and we can actually get really specific about our build targets. This gives us the opportunity to do things in the future like generate slimmed-down payloads that don’t have IE11-specific fallback workarounds for e.g. mobile browsers... where it really, *really* counts

- Ember Data, Ember-Redux, Orbit.js, Ember Apollo Client, etc. all exist and give us easy ways to integrate an API with our application. We don’t have to wire up specific AJAX calls for every
