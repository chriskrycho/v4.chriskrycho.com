---
Title: Rust and Swift (xvi)
Subtitle: "Initialization: another area where Swift has a lot more going on than Rust."
Tags: rust, swift, rust-and-swift, programming languages
Date: 2016-03-19 22:00
Series:
  Title: Rust and Swift
  Part: 16
Status: draft
...

<i class="editorial">I am reading through the Swift book, and comparing it to Rust, which I have also been learning over the past few months. As with the other posts in this series, these are off-the-cuff impressions, which may be inaccurate in various ways. I'd be happy to hear feedback! Note, too, that my preferences are just that: preferences. Your tastes may differ from mine. [(See all parts in the series.)][series]</i>

[series]: http://www.chriskrycho.com/rust-and-swift.html

<i class="editorial">Thanks to ubsan, aatch, and niconii on the [#rust-lang IRC] for a fascinating discussion of the current status of Rust's initialization analysis, as well as some very interesting comments on what might be possible to do in the future. Everything actually interesting about Rust in this post comes from the conversation I had with them on the evening of March 13.</i>

[#rust-lang IRC]: 

---

The rules various languages have around construction and destruction of objects are *extremely* important for programmer safety and ergonomics. I think it's fair to say that both Swift and rust are actively trying to avoid some of the mistakes made in e.g. C++ which poorly affect both its safety and its ease of use for developers, albeit it in some superficially different ways.

The basic aim both Rust and Swift have in this area seems to be the same: avoid *partially* initialized objects.

Swift does this via its rules around *initializers*. Rust does it by requiring that all the values of a type be initialized at its creation. So, for example, the following *looks* like it should work, but as the comment explains, it doesn't. You can initialize the variable piecemeal, but you cannot *use* it.

```rust
#[derive(Debug)]
struct Foo {
    pub a: i32,
    pub b: f64,
}

fn main() {
    let mut foo: Foo;
    foo.a = 14;
    foo.b = 42.0;

    // You can't do this because of the following:
    // 1. the ability to move out of a struct per-field
    // 2. the ability to re-initialize moved variables.
    // 3. treating uninitialized variables the same as moved-from variables.
    // println!("{:?}", foo);
}
```

As a result, especially with more complex data types, providing standard constructor-style methods like `new` or `default` is conventional and helpful. (If the type has non-public members, it's also strictly necessary.)

Swift has a number of options for initializers, which correspond to things you variously can odd in Rust, but in a very different way.

First, Swift allows you to overload the `init` method on a type, so that you can have different constructors for different starting conditions. (This is, to my recollection, the first time any kind of overloading has come up so far in the Swift book---but that could just be my memory failing me. Certainly I haven't referenced it in any previous discussion, though.)

The example offered by the Swift book is illuminating for the different approaches the languages take, so we'll run with it. Here's a class defining a Celsius type in Swift:

```swift
struct Celsius {
    let temp: Double
    
    init(fromFahrenheit f: Double) {
       temp = 1.8 * (f - 32.0)
    }
    
    init(fromKelvin k: Double) {
        temp = k - 273.15
    }
}

// Create an instance each way
let freezing = Celsius(temp: 0)
let balmy = Celsius(fromFahrenheit: 75.0)
let absoluteZero = Celsius(fromKelvin: 0.0)
```

And the same in Rust:

```rust
struct Celsius {
    temp: f64
}

impl Celsius {
    fn from_fahrenheit(f: f64) {
        Celsius { temp: 1.8 * (f - 32.0) }
    }
    
    fn from_kelvin(k: f64) {
        Celsius { temp: k - 273.15 }
    }
}

// Create an instance each way
let freezing = Celsius { temp: 0 };
let balmy = Celsius::from_fahrenheit(75.0);
let absoluteZero = Celsius::from_kelvin(0.0);
```

(Note that there might be other considerations in implementing such types, like using a `Temperature` base `trait` or `protocol`, or employing type aliases, but those are for later entries!)

You can see a point I made about Swift's initializer syntax back in [part x][10]: the way Rust reuses normal struct methods while Swift has the special initializers. Neither is clearly the "winner" here: Rust gets to use existing language machinery, simplifying the model a bit, but the addition of initializer syntax lets Swift use a fairly familiar type construction syntax even for special initializer cases, and a bit less noise in the constructor method. Note, though, that initializers in Swift *are* special syntax; they re not just a special kind of method (as the absence of the `func` keyword emphasizes).



---

- [**Previous:** Inheritance: a Swiftian specialty (for now).][15]

[10]: http://www.chriskrycho.com/2016/rust-and-swift-x.html
[15]: http://www.chriskrycho.com/2016/rust-and-swift-xv.html
