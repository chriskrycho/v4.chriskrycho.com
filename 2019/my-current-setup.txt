---
Title: My Current Setup
Subtitle: Apps I use to get things done.
Date: 2019.01.19 09:00
Category: Tech
Tags: [productivity, pomodoro, apps, writing, reading, software development]
Summary: >
    A quick overview of the apps I currently use, and a bit of commentary on why I use them.

---

<i><b>[Assumed Audience](https://v4.chriskrycho.com/2018/assumed-audiences.html):</b> people interested in productivity and work flow and app choice.</i>

A friend was asking me the other day what my workflow looks like, and while I don't generally spend a *lot* of time writing about my working setup, I figured I'd throw up a quick post representing my *current* list so that if people ask I can point them here.

Two important notes on this, though: First, this is *just what I use*. I make no particular claim that it's *the best*. There are lots of things here that are very specific to me and the way I work, and even to my specific mental quirks. Second, it's far more important to care about the work you do than about the tools you use to get it done. The tools matter: some people say they don't and I don't think that's right at all. But they don't matter as much as they might *feel* like they do, and tool fetishism is real. I think the happy point is finding tools which are good enough and fit comfortably enough into your workflow that they don't *distract* you, and then get back to the work you do!

---

## Software development

For software development, I currently use:

- [VS Code] as my primary text editor; I also occasionally use Sublime Text or Vim for specific tasks where it makes sense. Code is incredibly fast, impressively low in memory usage given it's an Electron app, and remarkably customizable. My only outstanding complaint is that there's no way to actually make it look like a native macOS app. Happily, I *can* make it *behave* like a native macOS app in all the ways that matter to me. Its support for both TypeScript and Rust—the two languages I spend the most time with right now—is *great*. You're welcome to see [my full configuration][config]; I keep it updated at that location via the [Settings Sync] plugin.

- macOS' built-in Terminal app, just using its tabs for individual tasks. I have spent a lot of time with alternatives, including [iTerm 2] and [kitty], and I'm comfortable in [tmux] – but at the end of the day I just like the way Terminal *feels* the best. It's fast, light, and built-in macOS things all just work correctly out of the box.

- [Fork] for a [git] <abbr>GUI</abbr>. I've also used [Tower] in the past, but I've found Fork to be lighter, faster, and a better fit for the way I think and how I expect things to behave (e.g. for interactive rebasing). I do a ton of work in git on the command line as well.

- A mix, varying day by day, of Safari Tech Preview, Firefox, and Chrome for my test browsers. I substantially prefer Safari in nearly every way, but Chrome's dev tools remain best in class for most things—with the exception of Grid, where Firefox is still the undisputed champion. (When I can, I do most of my JavaScript/TypeScript debugging in VS Code, though: it's a much better experience.)

- [Dash] for offline documentation access. There are other options out there, including some which are free, but Dash remains the best in my experience, and if nothing else it's deeply integrated into my workflow and muscle memory.

[VS Code]: https://code.visualstudio.com
[config]: https://gist.github.com/chriskrycho/f39442dd78ad6d150bcaaadd9fedf9f4
[Settings Sync]: https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync
[iTerm 2]: https://iterm2.com
[tmux]: https://github.com/tmux/tmux/wiki
[kitty]: https://sw.kovidgoyal.net/kitty/
[Fork]: http://git-fork.com
[git]: https://git-scm.com
[Tower]: https://www.git-tower.com
[Dash]: https://kapeli.com/dash

That's basically the whole list at the moment. I keep my software development workflow fairly light.

## Research and writing

For research and writing, I use:

- [iA Writer] for all my blogging and longer-form writing. This is a recent change; I had been a heavy user of [Ulysses] for the last few years. However, while Ulysses was the best option I had found for how I work, it's never been quite *right* for me. For one, I've always found Ulysses' "feel" to be a bit heavy: it's *just* noticeably slower for me than most of the other writing apps, and I'm hypersensitive to input latency. I've also always disliked one of the things that makes many people love it: the way it abstracts Markdown into its "smart text objects." iA Writer gives me the ability to manage a library in much the same way that Ulysses did, but in a way that feels more truly native on both macOS and iOS; it just uses normal Markdown (no fancy text objects); and it's *fast*.[^mostly] That combo makes it a better fit for me.

- [Bear] for my note-taking. I've talked about this [a fair bit][bear-1] here [before][bear-2], so I won't belabor the details. It's an excellent, lightweight note-taking app. The main way it falls down for me is that it does not really handle nested block content in Markdown documents (e.g. it won't correctly display a block quote inside another block quote, or a code sample inside a list, etc.). I'd also love it if it stored its library in a way that made it easier for me to interact with from other apps, i.e. as plain text on the local drive. (You can export content from it easily enough, which is great, but it's not quite as seamless as I'd like.) Those nits are just that, though: nits. I'm very happy with Bear for my note-taking at this point.

- [Unread] on iOS for reading RSS, with [Feedbin] as my long-preferred RSS feed service backing it. (I'm a fan of paying for these kinds of services, so I'm happy to lay out the $5/month for Feedbin. Free alternatives exist, but I don't love ad-driven models and avoid them where I can.)

[iA Writer]: https://ia.net/writer
[Ulysses]: http://www.ulysses.app
[Bear]: https://bear.app
[bear-1]: https://v4.chriskrycho.com/2018/starting-to-build-a-zettelkasten.html
[bear-2]: https://v4.chriskrycho.com/2018/zettelkasten-update-all-in-on-bear.html
[Unread]: https://www.goldenhillsoftware.com/unread/
[Feedbin]: https://feedbin.com

[^mostly]: iA Writer seems to get *randomly* slow at times for reasons I haven't yet identified, but at least for now, I'm taking that tradeoff over Ulysses' habit of being a bit slow *all the time*. As I've often noted before: [my ideal writing app doesn't exist][just right].

[just right]: https://v4.chriskrycho.com/2016/ulysses-byword-and-just-right.html "Ulysses, Byword, and “Just Right”"

You'll note that there are no apps for reading *longer* material on that list. I could mention Apple Books as the place I read most ebooks I read, but that's more a function of the alternatives not being meaningfully *better* in the ways I care about.

## "Productivity"

For "productivity" concerns, I use:

- [Tadam] for a Pomodoro timer—because it's precisely as annoyingly obtrusive as I need it to be, which is *very*!—and [Bear] for [tracking] what I do each Pomodoro cycle, each day, each week, each month, and each year. That habit remains very helpful for me.

- [Things] for a to-do app. Things hits the sweet spot for me in terms of its ability to manage everything from simple tasks and recurring to-do items around the house up to complex multi-month-long projects. I particularly like its distinction between when I want to be *reminded* about something and when that task is *due*. I've used [OmniFocus] in the past, but it never quite *fit* me; Things does. They're very comparable in terms of features; it's just that the way Things approaches those features works better for me.

- [Spark] as my email client, mostly for its snooze feature, which I use when I know I need to see an email *as an email* sometime later, and its ability to integrate nicely with other apps. I have it connect to Things, and emails that require an *action* get put there instead of snoozed. The combination lets me keep my inbox at Zero by the end of every day. And its lovely "Inbox Zero" images are a really nice touch:

    ![Inbox Zero in Spark][img]

[Tadam]: https://tadamapp.com
[tracking]: https://v4.chriskrycho.com/2018/just-write-down-what-you-do.html
[Things]: https://culturedcode.com
[OmniFocus]: https://www.omnigroup.com/omnifocus/
[Spark]: https://sparkmailapp.com
[img]: https://f001.backblazeb2.com/file/chriskrycho-com/images/inbox-zero-spark.png

## Podcasting

For podcast production, I use:

- [iZotope RX] (I'm using v6 Standard) for audio cleanup, as I [recently wrote about][izotope post].

- [Logic Pro X][logic] for the actual editing work most of the time, occasionally using [Ferrite]. Logic is overkill for what I do, but I'm *fast* with it at this point, so I can't see moving anytime soon, and there's nothing else out there that I think is substantially *better* (though there are other apps that are comparably good).

- [Forecast] for encoding and including chapter breaks.

- [Feeder] for generating the <abbr>RSS</abbr> feeds, since all my podcasts are currently built in ways that don't support <abbr>RSS</abbr> feed generation: [Pelican] for [Winning Slowly] and [Mass Affection],[^ma] and [rustdoc] for [New Rustacean]. (If I ever manage to finish building my own site generator, it'll have out-of-the-box support for custom RSS feed templates, so that I can have this stuff generated automatically for me!)

- [Netlify] for serving the actual static site content (i.e. HTML, CSS, and JS), and [Backblaze B2] for hosting the audio.

- [Transmit] for actually uploading the audio files.

[iZotope RX]: https://www.izotope.com/en/products/repair-and-edit/rx.html
[izotope post]: https://v4.chriskrycho.com/2018/izotope-rx-is-amazing.html
[logic]: https://www.apple.com/logic-pro/
[Ferrite]: https://www.wooji-juice.com/products/ferrite/
[Forecast]: https://www.overcast.fm/forecast
[Feeder]: https://reinventedsoftware.com/feeder/
[Pelican]: http://docs.getpelican.com/en/stable/
[Winning Slowly]: https://winningslowly.org
[Mass Affection]: https://massaffection.com
[rustdoc]: https://doc.rust-lang.org/rustdoc
[New Rustacean]: https://newrustacean.com
[Netlify]: https://www.netlify.com
[Transmit]: https://panic.com/transmit/
[Backblaze B2]: https://www.backblaze.com/b2

[^ma]: Mass Affection isn't dead! I promise!
