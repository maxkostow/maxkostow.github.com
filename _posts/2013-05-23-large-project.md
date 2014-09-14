---
layout: blog
title: A Year With a Large Project
category: nerd
---
<figure>
    <img src="/media/2013-05-23-large-project/pyramid.jpg" title="Pyramid">
    <figcaption>
        Pyramids by <a href="http://www.flickr.com/photos/timkelley/">timkelly</a>
    </figcaption>
</figure>

These are some lessons I learned while working on large (actually not *that* large) software projects in my first three programming jobs. I think they're good ones so maybe you can try to steer your experience in their direction.

###Stay Organized

Your organization will suck. There is no way around it. You should try to keep things sane by introducing more folders and naming things carefully. As you abstract concepts and break things down into smaller pieces, you will begin using vague, generic terms like `manager` or `group` or end up making things too specific and introduce redundancy. I think this is a limitation of the english language that we have to live with.

Of course some redundancy can actually be good. Don't let DRY keep you from your own sanity and common sense.

###Get Dirty

Don't be afraid to explore the source code of whatever libraries you happen to be using when you inevitably come across a shortcoming in their documentation. One of the reasons we use Open Source software is because The Code is the Documentation&#0153;.

The people writing those libraries ran into the same issues you're using their software to solve and they figured out a solution. Try to make sense of what they've done. Maybe you like it and want to adopt their organization techniques or style to your own code.

Or maybe you hate it and wonder how they managed to produce anything that even remotely does what it's supposed to. Shake your fist at their horrible API and hope you never have to debug their code. (yeah right!)

###Keep Learning

Don't lock yourself in to preconceived notions. Everyone has invented many wheels. Some wear big tires, some have large radii, some have spinners, and some are even square. If you're used to one kind and someone else thinks they have something better, hear them out, evaluate their nonsense, and slap them upside the head!

Just kidding. Don't assume you know more about something than another person. If you're stuck with noobs, try many approaches until you find one that works. If you're surrounded by experts, challenge their opinions and find out why their way is a good way.

###Ops Rocks/Sucks

Having a good ops person/team is amazing! I'm lucky enough to work with a few and it makes the whole development process exponentially easier. Screw something up? Just build a whole new box from `master` [automagically](http://cfengine.com/).

Unfortunately, if you aren't so fortunate, you will have to do it yourself. This is actually an area where I am still unexperienced and I don't look forward to doing this work.

###Conclusion

These things are light on concrete examples and that's because I'm a bad story teller. Basically, I'm publishing this because I came across an [article](http://joelhooks.com/blog/2013/05/22/lessons-learned-kicking-off-an-angularjs-project/) that talked about lessons learned from building an Angular-JS project, but the lessons don't specifically apply to Angular-JS; they could be applied to any project. This is just my attempt at reiterating that list.