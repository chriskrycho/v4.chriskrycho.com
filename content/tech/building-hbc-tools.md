Title: Building HolyBible.com: Tools
Author: Chris Krycho
Status: draft

## The Project

Back in May, I heard from internet acquaintance and generally great guy Cameron Morgan, who gave me a brief overview and then asked if I'd be interested in working on the HolyBible.com project with him---with him taking the lead on the visual design and branding, and me picking up the development work. I had a couple other projects possibly on the line at the time, but I was excited about the prospect from the beginning.

A generous donor had given Puritan Reformed Theological Seminary the holybible.com domain some years ago, and they had been exploring the best option for it ever since. 

## The Process

This was a bit larger a standalone project than anything I've taken on as a freelancer by myself before, so I had to put a lot more process in place, and I've learned an awful lot *about* managing a project of this scale along the way. (Unfortunately, in part by missing the targets I set for delivery. Insert frowny face here.)

### Design

### Development

## Tooling

### Frameworks

#### Frontend: AngularJS

I looked at a variety of options for the front-end Javascript framework. I knew for a project of this scale that I didn't want to do this the way I've done things in the past---that is, a nasty mess of jQuery cobbled together and mostly working. Mostly. I spent some time reading up and asking around among acquaintances who've had experience in this world, and ended up settling on AngularJS

#### Backend: ExpressJS

### Tooling

#### Testing

The documentation for AngularJS heavily emphasizes both unit and end-to-end testing. The Angular docs use Jasmine with Karma as the test-runner for the former, and Protractor for the latter, so those were natural choices.

#### Miscellaneous

I used quite a variety of tools along the way on this project:

- SCSS: I love me some SCSS. I started using it on my projects of all sizes over a year ago, and I haven't looked back.
- [svgo][1]
- ImageOptim: a slightly insane 89.5% compression overall vs. what came out of Illustrator, with over 95% on some of those files.
- Bower


[1]:	https://github.com/svg/svgo