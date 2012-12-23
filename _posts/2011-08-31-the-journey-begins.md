---
layout: blog
title: The Journey Begins
category: nerd
---
So the background to this journey will come in a later post, but basically I intend to chronicle my journey from computer engineer to computer scientist. I am beginning today because, I feel like I did something noteworthy in becoming a better developer.

A few days ago I was asked about how I would generate some sample input data to test a program. My first thoughts were to use what I knew: C. I already understood that C was massive overkill for that task, but I was not familiar with any other tools for the job (how embarrassing). I extrapolated two goals from that and made a note of them mentally (another mental goal: record goals so they are not solely stored mentally).

**Goal 1: Generate sample data using scripts**

**Goal 2: Manipulate text files using scripts**

**Goal 3: Store Goals in a less ephemeral medium than my brain**

A few days after that, I read a [story][1] on [Hacker News][2] about learning [awk][3]. A wild Road To Goal 2 appeared!

That brings us to today.

I was testing some equipment at work and there are no good tools that I know of for viewing logs of DMX data. I had a long data dump of DMX packets with a bunch of other information in a format that wasn't visually useful. What a great opportunity to experiment with awk, I thought to myself.

I don't yet know vim, so I opened up the Text Editor in my Ubuntu VM and Chrome looking for a usable awk manual. Leading me to [this Grymoire page][4] (thank you Bruce Barnett and GE). I then wrote a script.

Obviously my first try didn't do what I wanted so with a little help from [Google][5] and [StackOverflow][6] I went back and edited until I found the output I was looking for.

Fast forward a few hours and I now want to process an even sample of data. Good thing I just wrote a script that does exactly that. With a few modifications I was able to get the new output that I wanted.

That concludes this adventure. I would post the script for people to tell me what I did wrong, but I don't have it on hand. Maybe tomorrow.

It's hard to pick a place to start, so I picked here and now. There are things I've done prior to today that will probably make it into a future post, but this is where I start, officially.

[1]: http://gregable.com/2010/09/why-you-should-know-just-little-awk.html
[2]: http://news.ycombinator.com/
[3]: http://en.wikipedia.org/wiki/AWK
[4]: http://www.grymoire.com/Unix/Awk.html
[5]: http://google.com/
[6]: http://stackoverflow.com/