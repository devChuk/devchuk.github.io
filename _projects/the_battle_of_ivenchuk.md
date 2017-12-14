---
layout: project
title: The Battle of IvenChuk
date: Dec 2016
thumbnail: /res/img/projects/ic-thumb.png
thumbnail_size: half-img
client: CLASS
client_name: Intro to Game Programming
role: Game developer (C++, OpenCV, SDL)
platforms: Windows, Mac
status: Complete
featured: True
desc: 'In CS3113: Intro to Game Programming, my class was assigned a final project where we had to make a game.
    The project was fairly open ended, and so I joked to my classmate Iven, "what if we made a fighting game where we were the main characters?"'
---

And that's what we did. We made a two player fighting game of ourselves, complete with three maps, music, and sound effects.

<div style="width:100%;height:0;padding-bottom:56%;position:relative;margin-bottom:2.46vw;"><iframe src="https://giphy.com/embed/l3mZazOQuYQhmE048" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

The idea was to film ourselves doing a bunch of fighting moves, and then extract our figures using green screen techniques. We could then convert our figures into sprites that we could animate ingame. 

Luckily, we found the perfect lecture room in New York University's Brooklyn campus. It had well-lit large red wall and floor. This meant that we could film ourselves fighting with very high contrast against the background (assuming that we didn't wear anything red). We filmed a few days before the project deadline.

Iven fought with kicks and punches. His character was slower with lower range but had higher damage.

<div style='position:relative;padding-bottom:75%;margin-bottom:2.46vw;'><iframe src='https://gfycat.com/ifr/HorribleClearcutHalcyon' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div>

And I used a wooden six-foot-long sword I built a few months prior. My character was faster with higher range, but had lower damage. We were able to take our time acting out our fighting moves, since we could speed up our animations post-production.

<div style='position:relative;padding-bottom:75%;margin-bottom:2.46vw;'><iframe src='https://gfycat.com/ifr/FittingCommonHermitcrab' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div>

We filtered out any pixels that were above a redness threshold to obtain the sprites. Then we started coding.

{% highlight c++ linenos %}
int main(int argc, char *argv[])
{
    // setup SDL environment, import sprite textures, load music
    // ...

    while (!done) {
        // Keyboard Controls
        while (SDL_PollEvent(&event)) {
            if (event.type == SDL_QUIT || event.type == SDL_WINDOWEVENT_CLOSE || event.key.keysym.scancode == SDL_SCANCODE_ESCAPE)
                done = true;
            switch (event.type) {
                case SDL_KEYDOWN:
                // ...
            }
        }

        // Calculate time elapsed.
        float ticks = (float)SDL_GetTicks() / 1000.0f;
        elapsed = ticks - lastFrameTicks;
        lastFrameTicks = ticks;

        if (gameRunning) {
            // If elapsed is too high, use fixedElapsed instead for smaller intervals
            float fixedElapsed = elapsed;
            if (fixedElapsed > FIXED_TIMESTEP * MAX_TIMESTEPS) {
                fixedElapsed = FIXED_TIMESTEP * MAX_TIMESTEPS;
            }
            while (fixedElapsed >= FIXED_TIMESTEP) {
                fixedElapsed -= FIXED_TIMESTEP;
                Update(FIXED_TIMESTEP);
            }

            // Update attack/movement cooldown timers
            p1timeSinceLastJump += fixedElapsed;
            p2timeSinceLastJump += fixedElapsed;
            if (players.size() >= 2){
                players[0].cooldown -= fixedElapsed;
                players[1].cooldown -= fixedElapsed;

                if (players[0].cooldown <= 0)
                    players[0].cooldown = 0;

                if (players[1].cooldown <= 0)
                    players[1].cooldown = 0;
            }
            if (dead)
                deathCounter += fixedElapsed;
            
            // Self explanatory.
            Update(fixedElapsed);
            Render();
        }
    }

    Mix_FreeChunk(chukatk);
    Mix_FreeChunk(ivenatk);
    Mix_FreeMusic(music);

    SDL_Quit();
    return 0;
{% endhighlight %}

The way it works is through one loop. Let's call one iteration of this loop a frame. First, it polls for keyboard inputs to control the game characters and navigate the user interface.

Then, it calculates the amount of seconds elapsed since the last frame. This is stored in `elapsed` (in line 18 above). We use this value to *move everything* in the game. Note that `Update(fixedElapsed)` is used to update the game object values, while `Render()` is responsible for drawing and depicitng the visual elements of the game.

{% highlight c++ %}
// setup
float lastFrameTicks = 0.0f;

// loop
float ticks = (float)SDL_GetTicks() / 1000.0f;
elapsed = ticks - lastFrameTicks;
lastFrameTicks = ticks;
{% endhighlight %}

Computers run through frames at different speeds due to several factors, such as their processing power and whatever they're running in the background. By tracking the amount of time passed,
we can set the game speed in proportion to it. This enables us to run the game at the same speed consistently. If the time `elapsed` is high, then we move our objects farther. If the time `elapsed` is low, then we move our objects shorter.

However, this may lead to issues when running our collision detection code. If for high values of `elapsed`, we might have objects "phase" through platforms and not detect any collisions.

<img class="himg" src="/res/img/projects/ic-elapse.png">
<img class="himg" src="/res/img/projects/ic-coll.png">

To counter this, we check if `elapsed` goves above a certain threshold. If it does, then we decrement by `FIXED_TIMESTEP` and update our objects based on `FIXED_TIMESTEP` until `elapsed` is low enough. The user does not notice anything as we only run `Update()` but not `Render()`.

{% highlight c++ %}
#define FIXED_TIMESTEP 0.0166666f // 1/60 seconds
#define MAX_TIMESTEPS 6

float fixedElapsed = elapsed;
if (fixedElapsed > FIXED_TIMESTEP * MAX_TIMESTEPS) {
    fixedElapsed = FIXED_TIMESTEP * MAX_TIMESTEPS;
}
while (fixedElapsed >= FIXED_TIMESTEP) {
    fixedElapsed -= FIXED_TIMESTEP;
    Update(FIXED_TIMESTEP);
}
{% endhighlight %}

You can see the codebase [here](https://github.com/devChuk/The-Fight-Of-IvenChuk/tree/master/SOURCE/NYUCodebase), or view the main C++ file [here](https://github.com/devChuk/The-Fight-Of-IvenChuk/blob/68d80297b89d3339bb88c5561df9c8a70d1fdfc3/SOURCE/NYUCodebase/main.cpp).
