---
Title: I Want JSON Decoders
Subtitle: Elm taught me something important about how to handle my <abbr>API</abbr>s.
canonical: https://www.dailydrip.com/blog/i-want-json-decoders.html 
Summary: >
    Parsing JavaScript well is a solved problem in lots of contexts. But it's time for JavaScript to take a page from Elm.
Category: Tech
Tags: [JavaScript, Elm, TypeScript, web development, software development]
Date: 2017-12-25 19:20

---

<i class=editorial>This post was originally published at <a href="https://www.dailydrip.com/blog/i-want-json-decoders.html">DailyDrip.com</a>. They're doing really great work over there, so I encourage you to check out their content and consider subscribing!</i>

<hr/>

The other day, I got a report about the Ember.js app I'm working on: when a customer applied a coupon in the basket, they'd see an indication that the coupon was applied, but the basket total would still display as if it hadn't been updated. Orders were *placed* correctly, but they wouldn't render right. I dug around for a bit, and then discovered that it was one of the (many) places where `undefined` was biting us. 

How did this happen? It turned out it was a perfect storm: a confusingly-designed <abbr>API</abbr> combined with a reasonable (but in this case, very unhelpful) assumption in our data layer. When the total on a given basket dropped to zero, our <abbr>API</abbr> simply didn't send back a value on the payload at all. Instead of `{ total: 0, ... }`, there was just, well, `{ ... }` – no `total` field at all. Meanwhile, our data layer was designed to let a server send back only the fields which *required* updating. That way, you can send back partial records to indicate only what has changed, instead of having to send back the whole of what might be a very large record, or a very large collection of records.

The combination was terrible, though: because the server didn't send back the `total` field at all when it dropped to `0`, the client never updated the total it displayed to the user: as far as it was concerned, the server was saying "no change here!"

The first and most obvious solution here, of course, is the one we implemented: we had the <abbr>API</abbr> always send back a value, even if that value was `0`. But it seems like there should be a better way.

Lots of languages have fairly nice facilities for parsing JavaScript. Several languages even have tools for automatically constructing local, strongly-typed data structures from the structure of a <abbr>JSON</abbr> response on an <abbr>API</abbr>. F♯'s [type providers] are like this and *really fancy* in the way they'll automatically derive the type for you so you don't even have to write it out as you would in everything from Haskell to C#. But for the most part in JavaScript, you have at most a way to map data to a local record in your data store – certainly none of those type safe guarantees. In TypeScript, you can write the types you receive out carefully – though, as I discovered in this case, probably not carefully *enough* unless you model *everything* as an optional field, and then you're back to checking for `null` or `undefined` everywhere, and _why isn't this already a solved problem?_

[type providers]: https://docs.microsoft.com/en-us/dotnet/fsharp/tutorials/type-providers/

And it turns out, it *is* a solved problem – or at least, it is in Elm, [via][guide] those [<abbr>JSON</abbr> Decoders][decoders]. I don't get to write Elm at work right now (or any time in the foreseeable future) – but if I can't write Elm, I can at least try to steal a bunch of its great ideas and push them back into my TypeScript.

So… what exactly are <abbr>JSON</abbr> Decoders and how would they have solved this problem? (And why, if you're already familiar a little with Elm and possibly feeling frustrated with decoding, are they actually worth it?)

[guide]: https://guide.elm-lang.org/interop/json.html
[decoders]: https://guide.elm-lang.org/interop/json.html

A <abbr>JSON</abbr> Decoder is just a way of guaranteeing that once you're inside the boundary of your program, you *always* have a valid instance of the data type you've decoded it into, *or* an error which tells you why you *don't* have a valid instance of the data. They're composable, so you can stack them together and take smaller decoders to build bigger ones, so if you have a complex <abbr>JSON</abbr> structure, you can define repeated substructures in it, or decoders for dissimilar sibling items in it, and use them to put together a grand decoder for your whole final structure. The decoders use the [`Result`][result] type, and they hand back either `Ok` with the decoded value or `Err` with the reason for the failure – and if *any* piece of a decoded type doesn't match with what you've specified, you'll end up with an `Err`.

[result]: http://package.elm-lang.org/packages/elm-lang/core/5.1.1/Result

Now, initially that might sound like a recipe for disaster – <abbr>JSON</abbr> payloads can be formed in weird ways all the time! – but in fact it encourages you to think through the various ways your payloads can be formed and to account for them. *Sometimes*, if the payload doesn't have what you expect, that really does mean something is wrong either in your request or in the server-side implementation. In that case, getting an `Err` is *exactly* what you want. Other times, the server might be perfectly legitimate in sending back a variety of shapes in its response, and your responsibility is to decide how to decode it to make sense in your app.
Remember, the problem I had was that I received a payload which didn't have the data. With Elm's decoders, I would have had three choices:

1. I could have treated this as an error, and passed that along to be dealt with in some way.
2. I could have normalized it as a 0-value payload.
3. I could have treated it *explicitly* as a no-op, maintaining whatever previous state I had in the data store, i.e. the implicit behavior of my actual data store.

What I *couldn't* do, though, is do any one of those *accidentally*. I could still support incomplete payloads (via option 3), but I'd be explicitly opting into that, and there would be an obvious place where that was the case. This would be particularly helpful in a scenario where I wasn't also in charge of the <abbr>API</abbr>: if I couldn't just go change it so the <abbr>API</abbr> itself had a more sensible behavior, I could enforce whichever desired behavior on my own end. More than that, with something modeled on the Elm <abbr>JSON</abbr> Decoders, I would *have* to: there would be no implicit consumption of raw <abbr>JSON</abbr>.

The first time I played with the Elm <abbr>JSON</abbr> Decoder approach, I thought it was a lot of work. I was used to just doing `JSON.parse()` in JS or `json.loads()` in Python. Now I needed to define a whole series of decode steps explicitly for every field in a response? Good grief! But it grew on me. More than that, I now actively miss it in my apps; I'd have been really happy not to have to spend a morning hunting down this particular bug.

Sometimes that explicitness can seem like quite a lot of boilerplate, and indeed it is: there's a reason the Elm [elm-decode-pipeline] project exists. But even given the *initial* nicety of something like F♯ type providers, I think the Elm approach has a slight edge in the long-term for *maintainability* specifically. It's one thing to be able to just get to work right away and have a type definition you know to conform to a given <abbr>API</abbr> response. It's something else entirely to be able to *know* that you've accounted for all the varieties of responses you might get (and without throwing an exception for failed <abbr>JSON</abbr> decoding at that!).

[elm-decode-pipeline]: https://github.com/NoRedInk/elm-decode-pipeline

Given all of this, I've started mentally teasing out what such a <abbr>JSON</abbr> decoding library for Ember.js might look like in TypeScript. It's a long way off, but it's the kind of thing that I *really* want to experiment with, and that I think would make for a big win for the maintainability of our apps. Keep your eyes peeled, because I suspect this is another thing JS will steal from Elm, and that's *great* in my book.

