---
Title: User Interfaces are API Boundaries
Subtitle: >
    Applying domain-driven design ideas to <abbr title="user interface">UI</abbr> implementation.
Date: 2019-09-12 09:00
Category: Tech
Tags: [software development, domain-driven design, UI, software architecture]
Summary: >
    Yesterday, in the midst of a rollicking conversation about building forms in web apps, I realized: User interfaces are API boundaries, too!

---

<i><b>[Assumed Audience][aa]:</b> software developers, especially those who work on user interfaces.</i>

[aa]: https://v4.chriskrycho.com/2018/assumed-audiences.html

[Domain-driven design], and its near neighbor the [ports and adapters (hexagonal) architecture][p-and-a] all emphasize the importance of distinguishing between your internal “business logic” and your interactions with the rest of the world. Much of the time, the “ports” that get discussed are <abbr title="application programming interface">API</abbr> calls (e.g. over <abbr title="hyper-text transfer protocol">HTTP</abbr>) or interacting with a database.

[Domain-driven design]: https://fsharpforfunandprofit.com/ddd/
[p-and-a]: https://web.archive.org/web/20060711221010/http://alistair.cockburn.us:80/index.php/Hexagonal_architecture

Yesterday, in the midst of a rollicking conversation about building forms in web apps,[^conversation] I realized:

*User interfaces are <abbr title="application programming interface">API</abbr> boundaries, too!*

<aside>

I claim no novelty here; I’m sure that if I went through the literature on domain-driven design and the adjacent architectural ideas, I’d find this same point made by others. It’s just a fruitful[^fruitful] wording I have not heard before—a concise way of expressing an idea that has been rather floating around in my head in much vaguer terms for the last couple years.

</aside>

One of the key insights of DDD and the ports-and-adapters model is that every interaction with the world outside your program is a place of uncertainty. The <abbr title="application programming interface">API</abbr> might have changed and you might be getting back different responses than you expect. The database might have been corrupted. The network might be down—or worse, degraded so that you get *partial* messages through, and have to deal with incomplete or nonsensical data. Your software design has to account for this. If you isolate the complexity of dealing with that to well-defined, well-constrained boundaries for your application, everything in between can be *much* simpler.

And the most reliably unpredictable source of data we have for *any* application… is users! People are complicated and distracted, and our interfaces are always imperfect, often misleading or confusing in various ways (our best intentions notwithstanding). So we get “bad” data from our users. I scare-quote “bad” here because the data is not (necessarily) *morally* bad (though: see Twitter!) and it is (usually) a *mistake* rather than *malice* at root (though: see all sorts of hacking). But from the perspective of our app’s internals, the data has to be validated and transformed to our model of the world, just as data returned from an <abbr title="application programming interface">API</abbr> or a database does.

If you’re familiar with how these architectures suggest handling sources of data external to your program, the implication for user interaction is obvious: you need to treat it like you would an <abbr title="application programming interface">API</abbr>. You should have a clean separation between the data model of a form and the data model used within your application. Put in common <abbr title="object oriented">OO</abbr> parlance: your form model is a kind of [data transfer object][dto].

[dto]: https://martinfowler.com/eaaCatalog/dataTransferObject.html

Notice that this holds whether you’re using a traditional web form which submits a `POST` request via <abbr title="hyper-text transfer protocol">HTTP</abbr>, or building a rich <abbr title="single page application">SPA</abbr>-style JavaScript app which will use the form data without ever sending it anywhere. You have to first validate the data to make sure it is complete and correct—presumably with a mechanism for letting the user know if it isn’t. You also normally need to *transform* the basically flat data you get back from your form into in a data structure which is appropriately rich for the domain you’re working with.

Again: all of this is bog standard for DDD and ports-and-adapters thinking. The point is that you should treat forms specifically and user interaction in general in much the same way as any other external data: because *user interfaces are <abbr title="application programming interface">API</abbr> boundaries*.

In a future post, hopefully some time in the next week or two, I’ll trace out one of the implications of this for how I think about building forms in much more concrete terms!

[^conversation]: about which conversation more another day!

[^fruitful]: I found it <i>fruitful</i> in two senses: it was generative for me as I reflected on it, and it produced some forward motion in a conversation about real-world software development.