---
Title: Better Off Using Exceptions?
Subtitle: Maybe, but only if your language demands it.
Date: 2017-02-20 12:00
Tags: fsharp, software development, rust, functional programming
Category: Tech
---

I saw this post on error-handling in F^♯^, ["You’re better off using Exceptions"][post] making the rounds on Twitter:

[post]: https://eiriktsarpalis.wordpress.com/2017/02/19/youre-better-off-using-exceptions/ "You’re better off using Exceptions"

> Exception handling is an error management paradigm that has often been met with criticism. Such criticisms typically revolve around scoping considerations, exceptions-as-control-flow abuse or even the assertion that exceptions are really just a type safe version of goto. To an extent, these seem like valid concerns but it is not within the scope of this article to address those per se.
>
> Such concerns resonate particularly well within FP communities, often taken to the extreme: we should reject exceptions Show more…

And I get the argument, and in the specific context of F^♯^—especially given how much C^♯^-interoperating and therefore exception-throwing-code-interoperating there is there—it’s reasonable.

But it still makes me sad. (To be clear: exceptions were and are a big win over what you get in languages like C. I'll take them any day over `goto` or `segfault`.)

You need to embrace exceptions in F^♯^ _because F^♯^ has exceptions_ and because _many of its libraries rely on exceptions_. But my experience with Rust and other non-exception-using languages is that you *don’t* need exceptions in the general case.

The questions are: whether your language has good support for things like flat-mapping, and whether you’re willing to commit to letting the compiler help you with these problems.

To be sure: there’s more work involved up front to deal with that. But that's a tradeoff I'm *always* willing to make. I'd rather have the compiler tell me if I'm failing to account for something than learn because I saw a runtime error report come up in [Raygun][Raygun], especially because that tends to mean an error that affects the user in some way.

[Raygun]: https://raygun.com

Rust's model gives you something like exceptions for truly unrecoverable errors, "panics." A panic gives you all the context you'd get from an exception (one of the virtues of exceptions highlighted in that post), but you can only "catch" it at thread boundaries, and it otherwise just kills the program. Because it's catastrophic, you only use it where you don't have any way to recover in your immediate context. But where you can recover in your immediate context... using something like a highly descriptive enum (just as suggested at the end of [that original post][post]!) is a better option.

It's well-understood in my circles that you shouldn't use exceptions for things you can recover from; you should use them for things you *can't* recover from. But in most languages which lean heavily on exceptions, you inevitably start using them for control flow. I say: if you can recover from an error... just recover from it! Account for recoverable errors as possible conditions in your program and carry on! If you can't recover... don't. Die and let some other part of your system kick things back off.

In summary: yes, if you're in F^♯^, use exceptions. It *is* the right thing to do in many cases (and you don't have a choice in many others). But I'm hopeful for a future where we handle recoverable errors locally, and [act like Erlang or Elixir otherwise][just-crash].

[just-crash]: http://elixir-lang.org/getting-started/mix-otp/supervisor-and-application.html
