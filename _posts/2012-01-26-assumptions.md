---
layout: blog
title: Assumptions
category: nerd
---
Today I made some bad assumptions about how a system I was working on actually worked. They lead me on a wild goose chase for almost the whole day trying to solve a bug. It took my manager to walk through the ailing process with me to finally figure out what was actually going wrong. Once there, the fix was relatively straight forward.

Why wasn't I able to figure it out? I think maybe I was over confident in my code and knowledge of it. I probably would have made a simpler system had I wrote it and assumed there were was only one entry point (an assumption I should have easily disproved in the first step of debugging the problem).

My manager changed one thing at a time, making no assumptions about whether two things were related. I have a feeling this process saves time in the long run by spending time in the short run. It's frustratingly slow to prove every assumption when there is no obvious culprit, but obviously some assumption was wrong at some point, otherwise the system would work.