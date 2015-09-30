---
Title: Rust and Swift (viii)
Subtitle: Pattern matching and the value of expression blocks.
Tags: software development, listicles
Date: 2015-09-19 15:00
Modified: 2015-09-20 13:42
Series:
  Title: Rust and Swift
  Part: 8
Status: Draft
...

<i class="editorial">I am reading through the Swift book, and comparing it to
Rust, which I have also been learning over the past month. As with the other
posts in this series, these are off-the-cuff impressions, which may be
inaccurate in various ways. I'd be happy to hear feedback! Note, too, that my
preferences are just that: preferences. Your tastes may differ from mine.</i>

---

-   Rust and Swift handle function definition fairly similarly, at least for basic function definitions. In fact, for most basic functions, the only difference between the two is the keyword used to indicate that you're declaring a function: `fn` in Rust and `func` in Swift.

-   Likewise, both return an empty tuple, `()`, called the *unit type* in Rust or `Void` in Swift. Note, however, that this unit/`Void` type is *not* like C(++)'s `void` or Java's `null`: you cannot coerce other types to it; it really is an empty tuple.
-   Type declarations on functions are basically identical for simple cases, varying only
