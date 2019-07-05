---
Title: >
    My Final Round of <abbr>URL</abbr> Rewrites… Ever.
Subtitle: Tweaking how I handle my domain so my life is simpler for future redesigns.
Date: 2019-07-05 10:45
Category: Tech
Topics: [web development, writing, web design]
Summary: >
    This site now lives at v4.chriskrycho.com, and the previous versions of my public site are being migrated to v1, v2, and v3. And so I will never have to do a bunch of URL rewrites for new designs again. (Yes, this means I’m working on a redesign!)

---

<i><b>[Assumed Audience][aa]:</b> web development nerds like me.</i>

[aa]: https://v4.chriskrycho.com/2018/assumed-audiences.html

Those of you subscribed to my <abbr>RSS</abbr> feed most likely saw a bunch of posts again earlier this week. That’s because the canonical <abbr>URL</abbr>s for the posts on my site changed: from `www.chriskrycho.com/<year>/<title slug>` to `v4.chriskrycho.com/<year>/<title slug>`. So, for example, [my announcement] that I’m speaking at All Things Open 2019 moved from `www.chriskrycho.com/2019/all-things-open-2019.html` to `v4.chriskrycho.com/2019/all-things-open-2019.html`. I spent much of this past Wednesday working on getting this migration done, after spending a fair bit of time over the last week *planning* it. Over the course of the next few days, you’ll see [v1] and [v3] start working; [v2] is already up as I write this.[^52-verses]

[my announcement]: https://v4.chriskrycho.com/2019/all-things-open-2019
[v1]: https://v1.chriskrycho.com
[v2]: https://v2.chriskrycho.com
[v3]: https://v3.chriskrycho.com
[blog]: https://blog.chriskrycho.com
[2012-2013]: 2012-2012.chriskrycho.com

[^52-verses]: For *very* long-time readers: I also used this as an opportunity to get my old [52 Verses] site off of Blogger's infrastructure and into a purely-static-<abbr>HTML</abbr> setup as well. Happily, that one doesn't involve any <abbr>URL</abbr> tweaking—just extracting the content from Blogger and pushing it to a static site host.

[52 Verses]: https://52verses.chriskrycho.com

But *why*, you ask? Because I now have—at last!—a stable <abbr>URL</abbr> design for my website, which will *never have to change again*. (“At last” I say because I’ve been thinking about doing this since 2015. It feels *great* to finally have it done.) I care about stable <abbr>URL</abbr>s. I want a link to my content to work just exactly as well in 10 years as it does today. Don’t break the web! Don’t break all the documents that *aren’t* on the web but which point to places on the web! Historically, that has meant that *every* time I launch a new website design, I have to do a bunch of work to move the *previous* version of the site and create redirects for it.

No more! From this point forward, my content will always live at a *versioned* <abbr>URL</abbr>. This site is `v4.chriskrycho.com`. When I launch the redesign I’ve been working on (very soon!), it’ll be `v5.chriskrycho.com`.[^v5-progress] When I launch another redesign in 5 years, that’ll live at `v6.chriskrycho.com`—and so on. All I’ll have to do at that point is change where `www` and the root `feed.xml` redirect to, and everything else will just keep working.

[^v5-progress]: Feel free to watch that space as I iterate on it! It’s coming together nicely but still has a long way to go.

The idea isn’t new to me—I got it originally from *someone* else; but I don’t remember who because it has been such a long time since I first saw the idea. I had done something *somewhat* similar when I launched the last version of my site, archiving the previous version at `2012-2013.chriskrycho.com`, but I failed to start the *new* version at a similarly specific location. What this means is that I had to take and redirect every piece of content that lived on what is now `v3.chriskrycho.com` from `www.chriskrycho.com` to its new home. Now, as I’m preparing to do the `v5` launch, I had to do the same *again*, but this time for what is now at `v4`!

I don’t want to do this again! Even with building [a small tool][redirects-tool] to generate either file-based or Netlify redirect rules, getting it right is both time-consuming and error-prone, especially when *also* needing to do a <abbr title="domain name server">DNS</abbr> migration to *create* `v4.chriskrycho.com` and get myself off some old shared hosting and… it was a pain and a lot of manual work.[^redirects] The new approach means I will never have to do this again, and I cannot express just how happy that makes me.

[redirects-tool]: https://github.com/chriskrycho/redirects

[^redirects]: The final redirects file is [here][redirects-file], if you’re curious.

[redirects-file]: https://github.com/chriskrycho/www.chriskrycho.com/blob/d0b2584d94b55060d89c500bf0f146635e17d84f/public/_redirects

So: `v4` it is for now, and `v5` coming soon. When that happens, you’ll see an announcement post in your feed, and then you’ll automatically be switched over to the new root feed on the `v5` site, without having to do anything at all. 🎉
