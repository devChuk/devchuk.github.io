---
layout: project
title: Firefly
date: Oct 2016
thumbnail: /res/img/projects/firefly-thumb.jpg
thumbnail_size: full-img
client: HACKATHON
client_name: HackRU Fall 2016
role: Python & C developer. Circuit designer.
platforms: Raspberry Pi, Hardware tool
status: Complete
featured: True
desc: A new method of light painting. Upload images into the Firefly and "print" them out into a long exposure photograph.
---

As one heavily involved in CS and tech, I've learned to communicate logically and diagraphically, but beautiful code still makes for terrible conversation. I wanted to try an art project and explore other creative pastimes, so what better way is there than to intersect art with technology to create something new and meaningful?

So, I created something called Firefly. It’s a new form of light painting. Before we dig into how it works and what it does and the process of making it, we’ll need to take a step back and see what light painting is in the first place:

When you take a normal picture with a DSLR camera, the shutter opens to allow light into the camera's sensor for a brief instant, and then slams shut. This is the mechanical clicking sound you hear when you take photos.

<div style="width:100%;height:0;padding-bottom:56%;position:relative;margin-bottom:2.46vw;"><iframe src="https://giphy.com/embed/LPpd58gGbdTBC" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

In a long exposure photo, the shutter is open for an extended period of time, and all the light recorded during that period is combined into one picture. Bright, moving objects become more visible, while dark moving objects start to disappear. Automobile headlights and stars transform into streaks. Flowing rivers and waterfalls turn into glowing clouds.

<img src="https://source.unsplash.com/q7evPTAgsk8/">
<img src="https://source.unsplash.com/lcyF8BHpJBM/">

Light painting is a photographic technique where you take a long exposure photograph and wave around sources of light to create your artwork. 

<div class="group">
    <img src="/res/img/projects/firefly-example-1.jpg">
    <img src="/res/img/projects/firefly-example-2.jpg">
    <img src="/res/img/projects/firefly-example-3.jpg">
    <img src="/res/img/projects/firefly-example-4.jpg">
    <figcaption>That's Picasso painting a centaur. I have a hard time seeing it too.</figcaption>
</div>

There’s a few problems with it however. It's difficult to master and you're limited by drawing out each and every single line of light by hand. As a result, everything seems very hand-drawn or roughly drawn out. Also, expert light painters require a large set of expensive custom tools.

<img src="/res/img/projects/firefly-tools.jpg">

So instead of using all these tools, what if we had a rather long stick with a row of LEDs instead? We can upload an image to this stick, and as we hold it upright, walk around, and move the stick through 3D space, it'll sequentially display each pixel-column of the image on the LEDs.

The Firefly is made of a 2 meter long wooden stick with a handle, a Raspberry Pi, a custom-made circuit on a breadboard, 288 LEDs, 5 buttons, a phone charger battery, and a bunch of other electrical components and wires.

For instance, to print out the green circle below, the Firefly would start with the right-edge column of pixels and progress to the left.

Input:
<p style="text-align: center;"><img class="himg" src="/res/img/projects/firefly-circle.png"></p>

Process:
<iframe width="100%" height="315" src="https://www.youtube.com/embed/zt6ym_ibw0Y?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>


Result:
<img src="/res/img/projects/firefly-result.jpg">

The code for the Firefly was initially only written in Python, but I realized that part of it had to be written in C to make performance as efficient as possible. The Pi had to read an image and control 288 LEDs simultaneously;if there was any lag, the images would be ruined.


The resolution and brightness of the Firefly were surprisingly fairly high, and my friends and I were able to create GIFs and pictures in well-lit rooms.

<div class="group">
    <img src="/res/img/projects/firefly-wings.jpg">
    <figcaption>It took <a href="https://gfycat.com/BeneficialFreshAnole">26 tries</a> to get this pic right.</figcaption>
</div>

<div style="width:100%;padding-bottom:56%;position:relative;margin-bottom:2.46vw;">
    <iframe src="https://giphy.com/embed/3o7TKzetIUjSfzjLTW" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</div>

<img style="margin-right:0;" class="himg" src="/res/img/projects/firefly-flag.jpg">
<img class="himg" src="/res/img/projects/firefly-goku.jpg">
<img class="himg" src="/res/img/projects/firefly-harambe.jpg">
<img class="himg" src="/res/img/projects/firefly-paint.jpg">
<img class="himg" src="/res/img/projects/firefly-pika.jpg">
<img class="himg" src="/res/img/projects/firefly-conflict.jpg">


<div style='position:relative;padding-bottom:67%;margin-bottom:2.46vw;'><iframe src='https://gfycat.com/ifr/MarvelousPhonyEmperorshrimp' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div>

The Firefly definitely made it possible to create light images that were impossible to normally create. It was like a printer as traditional light painting was the pen. Or like how photography is to painting. While the Firefly loses the aesthetics of more organic and three-dimensional hand drawn shapes, it's interesting to think about what new possibilities can be achieved. For instance, can the Firefly be used to implement datasets into artwork?

I had a ton of fun messing around with the Firefly with friends and seeing what we could create. If you'd like to see more photos, you can check out the album <a href="https://www.facebook.com/media/set/?set=a.10154691935314650.1073741833.775144649&type=1&l=f3c21adca1">here</a>. The DevPost page is also right <a href="https://devpost.com/software/project-firefly">here</a>. The Firefly won the Best Hardware Hack category at HackRU.