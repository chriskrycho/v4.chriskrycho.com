---
Title: iZotope RX is Amazing
Date: 2018-12-31 19:45
Subtitle: Expensive—but worth it!—audio post-production for podcasting.
Category: Blog
Tags: [audio, podcasting, software]
Summary: >
    iZotope RX is an expensive tool for audio post-production, and it's an amazing tool for podcasting if you have the budget for it.

---

<i><b>[Assumed Audience:](https://v4.chriskrycho.com/2018/assumed-audiences.html)</b> people interested in audio post-production for podcasts.</i>

For the last  I’ve been using [iZotope RX](https://www.izotope.com/en/products/repair-and-edit/rx.html)[^1] to post-process the audio for [the various podcasts](https://v4.chriskrycho.com/podcasts) I produce. It is an absolutely astounding piece of software, and if you’re at the point in your podcasting work where it makes sense—and if you have the budget for it!—I very, very highly recommend it.

First, let’s me say something really important, though: for most podcasters, this is not where you should be spending your time or money. You will see far more improvement by investing first of all in your microphone *technique*, secondly in your microphone itself, and third in your recording environment.

<aside>

Feel free to skip this aside if you’re already in the know about these basics!

- <b>You microphone technique:</b> consistently staying at an appropriate distance from your microphone will make far more difference than all the post-processing in the world in terms of the quality and consistency of your sound.[^2]

- <b>Your microphone itself:</b> you probably don’t need to spend $600 on a microphone for podcasting, and if you’re just starting out, you *definitely* shouldn’t. However, picking up something *decent*—like the [Audio Technica ATR2100-USB](https://www.audio-technica.com/cms/wired_mics/b8dd84773f83092c/index.html)—and combining that with good technique will make a massive difference over recording into your earbuds or your

- <b>Your recording environment:</b> changing the sound dynamics of your space is often easier and certainly [cheaper](https://www.homedepot.com/b/Lumber-Composites-Paneling-Acoustic-Wall-Paneling/N-5yc1vZcbqd) than investing post-processing software—and, just as importantly, it will dramatically reduce the *need* for post-processing software.

</aside>

All of those things being true, there are still times when post-processing software is useful! If you’re recording interviews[^3] in particular, you can have the best control over your own sound in the world and still need post-production software. You may have limitations on how much you can change your recording environment. (I was living in seminary housing when I picked up iZotope: I literally didn’t have *room* for sound treatments on the walls in my recording area!) You may have times when there are unexpected noise inputs. And for all of those, iZotope RX is just astoundingly good.

Many people interested in basic audio post-production have likely experimented with the denoising functionality in Audacity, or even used a better tool like the one in Adobe Audition. I’ve used those, and they were *okay* for certain kinds of noise, but I ultimately found them wanting and never much used them. iZotope’s Spectral De-noise tool is not like those. It consistently removes *all* the noise matching the profiles you give it, and—more impressively, if you’ve used Audacity or even Audition—it does it without destroying the quality of the actual audio!

[![Spectral Denoise in iZotope RX 6][i-thumb]][i-img]

[i-thumb]: https://f001.backblazeb2.com/file/chriskrycho-com/images/izotope-denoise-thumb.png
[i-img]: https://f001.backblazeb2.com/file/chriskrycho-com/images/izotope-denoise.png

Other tools require a bit more finesse to use than the spectral denoise, but are equally powerful: De-ess and De-plosive to cut down harsh “s” sounds and loud “p” or “b” sounds,[^4] Mouth De-click to deal with overly aggressive smacking and clicking noises; Breath Control to cut down the volume of those sharp intakes of breath that can sound odd in a discussion… there’s a lot here, and they all work *extremely* well if you deploy them judiciously and use them when you need them.

The thing that actually prompted me to write this up, though, was my discovery a little while ago that these are all standard [Audio Unit](https://en.m.wikipedia.org/wiki/Audio_Units) plugins—which means that you can use them in *other* tools on macOS. And the secret sauce here for me was combining them with [Rogue Amoeba](https://rogueamoeba.com/)’s [Audio Hijack](https://rogueamoeba.com/audiohijack/) software and an [Icecast](http://www.icecast.org) server. I took my local audio, punched up the volume, and then ran the Spectral De-noise plugin against that audio just before streaming it.

[![Audio Hijack with iZotope Denoise][ah-thumb]][ah-img]

[ah-thumb]: https://f001.backblazeb2.com/file/chriskrycho-com/images/audio-hijack-izotope-denoise-thumb.png
[ah-img]: https://f001.backblazeb2.com/file/chriskrycho-com/images/audio-hijack-izotope-denoise.png

It turns out that even with my not-at-all-cheap recording setup[^5], I end up with some low-level (but quite audible! background hum when I punch up the volume like that. I use iZotope to kill that, so that the listening experience for any live listeners to the show when recording get something *nearly* as nice as the final product, at least in terms of sound quality.

The net of all of this is: if you’re making any reasonable amount of money from your podcasting, and you’ve already invested in your technique, equipment, and environment… you should buy iZotope. It’s amazing.

[^1]:	I’m using version 6; version 7 is relatively recently released.

[^2]:	I gave my [Winning Slowly](https://winningslowly.org) cohost [Stephen Carradini](http://stephencarradini.com) a hard time about this for a while: he is one of those people who just cannot stop moving, *especially* when he is talking. Being the good sport that he is, he improved dramatically over the course of [Season 6](https://winningslowly.org/season-6.html).

[^3]:	or big [panel shows](https://www.theincomparable.com), but most of us are not <cite>The Incomparable</cite>!

[^4]:	again: start with your microphone technique and getting a cheap pop shield!

[^5]:	a [Tascam USB 2x2 interface](https://tascam.com/us/product/us-2x2/top) and a [Shure Beta 87A microphone](https://www.shure.com/americas/products/microphones/beta/beta-87A-vocal-microphone)
