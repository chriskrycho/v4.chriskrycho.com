---
Title: Farewell, Dropbox
Subtitle: Because I don’t trust you anymore.
Category: Tech
Tags: [writing, workflow]
Date: 2017-07-06 21:00

---

Over the last few years, I've grown increasingly annoyed with Dropbox. There have been a number of fairly high-profile misbehaviors on their part---most notably, [this one][1]---and then this past week, they started sending me notifications advertising Dropbox for Business.

![Notification ads are the worst.](https://f001.backblazeb2.com/file/chriskrycho-com/images/bad-dropbox.png)

So, as I was with Google a few years ago [when they pushed me over the edge][2]---*also* with notifications!---I'm out.

I don't mind Dropbox's wanting to have a sustainable business. To the contrary: as I often note, I'm quite willing to pay for software I use, and I currently use a number of paid services where free alternatives exist because I'd rather do that than pay for ads.[^1] I *do* mind when a company---*any* company---decides that building their business means mistreating their users and customers. And harassing me with notifications about a variant of their product I don't care about certainly crosses that line. Combine that with the misbehavior *and* the fact that Dropbox has a tendency to hammer my system for no apparent reason, and, well, I'm out.

## Transition Plans

### File syncing

For basic storage and access to files across my devices, the shift will be pretty easy: I already have paid iCloud storage for backing up Photos (it's far easier and comparably priced to all the other options, so that's what we use). So everything I've *been* doing with Dropbox I'll be doing with iCloud Drive instead. And I have *way* more overhead there with a 250GB plan that I do in my current 9GB of Dropbox storage.

### File sharing

For things where I need to share files with other people, I'll be using [Droplr][3]. If or when I find a need to share something for a longer period of time, more often, or with more people, I'll think about the Pro plan, but for right now the free plan will *more* than suffice for, say, sending an audio file to [Stephen][4] for editing [Winning Slowly][5] episodes. (Also, iOS 11's Files app [will support][6] this sharing workflow natively.)

### My writing setup

Probably the *most* vexing (or at least: vexing-seeming) change here will be to my writing workflow. For a long time, I've made an alias pointing from a folder in Dropbox on my main machine into the clone of the [Git repository][7] on that machine where I manage my website.[^2] That has meant that I can edit the source version of a given post anywhere at any time, with any editor that has Dropbox integration. That was a winning combo for a long time, and it's one thing I actually *can't* do with iCloud Drive. (I tried, and it sort of works, for a little while; but iCloud Drive doesn't seem to expect this scenario. In its defense, it's a weird setup.) I realized in thinking it through this evening, though: it doesn't actually matter to me with the ways my workflow has shifted---and, perhaps just as importantly, with the way that the iOS ecosystem has shifted.

For one thing, there are a *lot* of options for directly editing files from Git repositories on iOS now. I don't need to have it in Dropbox to be able to open it in any one of several *great* iOS writing environments, whether to make a quick edit or to create a post from scratch. Both [Working Copy][9] and [Git2Go][10] work *very* well. But for another thing, I currently can't *generate* the site without logging into my home machine anyway.[^3] So if I need to make a tweak, well... [Blink.sh][11] or [Prompt][12] will let me log in remotely and do what I need to. And a little bit of Vim or Emacs will let me make any quick edits that way if I really feel I must.

And one side effect of realizing *that* is that I can easily enough just copy a file from iCloud storage to my site's working directory after writing it in a writing folder in iCloud if I so desire. Sure, that's a *little* finicky, but for the most part I won't really need to mess with it: I can just `git push` from my iPad, `git pull` on my iMac and be ready to do whatever I need.

### Other apps

The last piece of the puzzle is the other "apps" that have made a home in my Dropbox. The reality, though, is that almost none of those actually matter to me. I don't even look at the majority of that data, and other pieces of it ---backups of GPS and heart-rate data from workouts, or copies of all my tweets from when I wanted to maintain a microblog on this site, for example---are really just needless at this point, as I have all of that data stored in *several* cloud platforms (in the case of workout data) and/or don't care about being able to retrieve it (in the case of tweets). I can happily just shut those things down and call it a day.

## In Conclusion

So that's it: goodbye Dropbox; hello other tools. (This post written from an iPad, and stored in iCloud Drive before publishing.) It's been a long, and mostly just-fine ride, but I'm getting off here.

[^1]:	Full disclosure here: I am *not* a Dropbox paying customer---though that is the fault of their perhaps overly aggressive early customer acquisition strategy. I have never *needed* to pay for Dropbox, even though I have many gigabytes stored in it, because I earned so much free storage for inviting other users early on.

[^2]:	[You don't want a Git repo sitting inside your Dropbox folder][8], but a symlink like this works just fine: you don't end up with the conflicts that can happen with a full repo in Dropbox.

[^3]:	I'm hoping to change that a bit in two ways in the future, by having the generator live on a not-my-home-machine server and by making Lighting much easier to just drop in and use than my finicky Pelican setup currently is. But that depends on actually making Lightning, you know, *work*.

[1]:	http://applehelpwriter.com/2016/07/28/revealing-dropboxs-dirty-little-security-hack/
[2]:	http://www.chriskrycho.com/2014/goodbye-chrome.html "Goodbye, Chrome: You're just too creepy now."
[3]:	https://droplr.com
[4]:	http://independentclauses.com
[5]:	http://www.winningslowly.org
[6]:	https://www.imore.com/files-app "iOS 11's Files app FAQ"
[7]:	https://github.com/chriskrycho/chriskrycho.com
[8]:	https://stackoverflow.com/questions/19305033/why-is-putting-git-repositories-inside-of-a-dropbox-folder-not-recommended
[9]:	https://workingcopyapp.com/
[10]:	https://git2go.com
[11]:	http://www.blink.sh
[12]:	https://www.panic.com/prompt/
