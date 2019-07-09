---
layout: project
title: SecureBrowse
date: May 2019
thumbnail: /res/img/projects/sb-thumb.png
thumbnail_size: half-img
client: CLIENT
client_name: MyMonero
role: Lead developer & UI designer
platforms: Google Chrome, Firefox, Edge, Safari
status: Launched
featured: True
desc: SecureBrowse is a security protocol and open source browser extension which validates web resources and can block their execution if they're compromised.
---

![The Dashboard](/res/img/projects/sb-thumb.png)

[MyMonero](http://mymonero.com/) is a Monero wallet you can use on desktop, mobile, and web. The team behind it is largely interested in improving the security of their web app wallet and for any web providers interested, so I was approached to design and code the entire project.

One of the biggest issues with securing web applications is the fact that the app (Javascript, HTML, CSS) is delivered to you every time you open the page. This means that a malicious or compromised web server could change the code and steal your supposedly secure and client-side-only data.

SecureBrowse solves this by verifying the code really came from the developer. While this doesn't protect you from a malicious developer, it at least brings the security of the web app to a similar level to that of native apps.

# How does it work?

Developers first hash all of their web resources (html, css, & js files). Then, these hash digests are stored in [DNSSEC](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/)-signed TXT records on the domain of the site to be secured. Every time users access that website, the extension will compare the resources to the expected hash digests given in the TXT records. If the resource doesn't match any of its associated hash digests, the extension blocks the resource.

![Security Protocol](/res/img/projects/sb-diagram.png)

# The Challenges

- **DNS record lookup in a browser extension**. There are no built-in browser APIs to run DNS lookups, so I had to find a workaround to obtain records.
- **Implementing DNSSEC validation in Javascript**. Verifying the DNSSEC chain had to happen on the client-side to ensure security. Depending on an outside API would be at risk of interception. There are no pure-JS modules for DNSSEC validation on npm, so I had to write one myself.
- **Developing the extension**. I had to make sure the code was clean and concise for anyone who might work on this after me. I wanted to be sure that the extension wouldn't degrade a user's Internet browsing experience too. It had to be performant and work on all four major browsers: Chrome, Firefox, Edge, & Safari.
- **Maintaining a consistent visual aethetic and an intuitive UI**. Users should be able to install the browser extension and know how to use it immediately. The extension also wouldn't look reliable if it didn't give a polished feel.

## DNS record lookup

In order to verify a record's DNSSEC signature, one must obtain all the DNSSEC records from the target zone all the way up to the root zone. But that's not directly possible when developing a browser extension—no browser APIs exist for DNS lookups. Thus, I had to rely on an outside web API. I couldn't roll out my own API server, since that meant someone else would have to maintain, scale, and protect it from attackers after I leave.

Fortunately, Cloudflare launched a [DNS over HTTPS API](https://developers.cloudflare.com/1.1.1.1/dns-over-https/) for DNS queries. While it did work wonderfully for making DNS queries in an extension, I encountered an issue in it. The API did not transmit RRSIG records that covered DS records. They're vital for DNSSEC verification, and without them, the project would not be completed.

So what did I do? I hunted down the Director of Engineering at Cloudflare responsible for DNSSEC and asked him about the issue.

<center class="twt"><blockquote class="twitter-tweet"><p lang="en" dir="ltr">Hey <a href="https://twitter.com/OGudm?ref_src=twsrc%5Etfw">@OGudm</a>, can you explain why Cloudflare&#39;s DNSSEC-over-HTTP API does not return RRSIG records that specifically cover DS records? I&#39;m querying for RRSIG records and I get a bunch of them, but none of them cover the DS record set.<br><br>I&#39;m trying to do DNSSEC validation myself here.</p>&mdash; Brian Chuk (@BrianChuk) <a href="https://twitter.com/BrianChuk/status/998017306235228160?ref_src=twsrc%5Etfw">May 20, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></center>

To my surprise, he actually replied and we discussed a new `do` JSON option to add to the API. A month later, I received an email that the feature was implemented, and I was able to continue the project.

## Implementing DNSSEC validation in Javascript

DNSSEC is still a relatively new protocol on the Internet, with only <1% of `.com`, `.net`, and `.org` domains in the world being signed. As a result, there are few resources out there to learn about DNSSEC. I couldn't find any guides online on how to implement the code to validate it.

<div class="group">
    <img src="/res/img/projects/sb-so.png">
    <figcaption>You know you're on your own if StackOverflow doesn't have the answer</figcaption>
</div>

I had to learn about DNSSEC straight from the source—by reading the Request For Comments (RFC) documents. They're formal documents from the Internet Engineering Task Force (IETF) that detail technical and organizational notes from the Internet. The RFCs were a challenge on their own because, to be frank, they're a lot of information. Each memo easily goes over a thousand lines, and I had to comb through several memos to understand DNSSEC. You can view a few RFC examples here ([4033](https://ietf.org/rfc/rfc4033.txt), [4034](https://ietf.org/rfc/rfc4034.txt), [4035](https://ietf.org/rfc/rfc4035.txt)).

I broke down the DNSSEC validation process into more manageable subprocesses, and as I learned about each subprocess, I wrote a script to implement it. By writing code and keeping it modular as I learned about DNSSEC, I ended up with the entire implementation once I was done learning about it.

## Developing the extension

Luckily, browsers have an API for detecting and blocking requests for resources. Adblockers use this by checking resources against blacklists of URLs to ban. SecureBrowse operates in the same manner, except by comparing those resources to hashes in TXT records. I decided to have the extension verify and cache the TXT records, so that they won't have to be fetched and validated every time a new site page was loaded. The cache would automatically update itself upon TXT TTL expiration.

One challenge was figuring out how to support multiple browsers with one codebase. Since the extension API models for Chrome, Firefox, & Edge were similar enough, I was able to stick with using one codebase for those three browsers. Safari, however, was completely different, so I had to write Safari-specific code that used some of the modules that didn't touch browser APIs, such as the DNSSEC validation module.

## Maintaining a consistent visual aethetic and an intuitive UI

It was important to give a polished and functional look in the SecureBrowse extension. After all, even if the extension worked when verifying web pages, it wouldn't be useful if users didn't undestand what was going on.

The extension indicated the security status of the current web page its users through 3 ways:

- **Alerts.** If the extension detected an insecure resource, then a `Window.alert()` dialog will be displayed to notify the user.
- **The toolbar icon.** If the current web page doesn't have the SecureBrowse protocol set up, then the icon appears as blue. If the web page is found as insecure, then the icon becomes red. If the web page is secure, then the icon becomes green.
- **The dashboard.** Users can click on the toolbar icon to open the dashboard. If the current page is insecure, it'll display a more detailed explanation why. The dashboard also details what resources it found & verified in the page.

<div class="group">
    <img src="/res/img/projects/sb-screenshot.png">
    <figcaption>The toolbar icon colors</figcaption>
</div>

I chose to use Work Sans and Blender as typefaces for the project.

## The Launch 🚀

SecureBrowse was presented at the Revolutionizing Web Security talk at [MagicalCryptoCon 2019](https://magicalcryptoconference.com/).

<center class="twt"><blockquote class="twitter-tweet"><p lang="en" dir="ltr">Epic opening of the Magical Crypto Conference! <a href="https://twitter.com/hashtag/MCC2019?src=hash&amp;ref_src=twsrc%5Etfw">#MCC2019</a> <a href="https://t.co/YY55XGI5qC">pic.twitter.com/YY55XGI5qC</a></p>&mdash; Alexanaut933 🇨🇭🇨🇦 (@Alexandra933) <a href="https://twitter.com/Alexandra933/status/1127263656985747456?ref_src=twsrc%5Etfw">May 11, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></center>

<iframe class="twt" width="100%" height="390" src="https://www.youtube.com/embed/zFN__b6ARH4?start=3260" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

→ [GitLab](https://gitlab.com/MyMonero/securebrowse/)
<br>
→ [Website](https://securebrowse.gitlab.io/securebrowse)
<br>
→ [Read the RFC](https://gitlab.com/securebrowse/securebrowse/wikis/The-SecureBrowse-RFC)
<br>
→ [Download the extension here](https://gitlab.com/securebrowse/securebrowse/-/tags)
