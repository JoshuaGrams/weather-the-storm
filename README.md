Weather the Storm
=================

Spend a nostalgic night at a rustic cabin. Let the mundane tasks of food
and shelter give you some distance from your troubles.

-----

I haven't really written fiction since doing school assignments as a
teenager in the 90s, so I don't expect this is particularly good as a
story, but the code might be interesting as a TinyQBN example.

You can [play it](https://joshgrams.itch.io/weather-the-storm) over at
itch.io, or download the source here and build it with Tweego:

	tweego -o index.html src

-----

* I built a map using normal Twine links: each passage is a room.
* I used a pile of boolean (true/false) variables to fake a world model:
  have you moved firewood from the woodshed outside to the wood box
  inside? Have you lit a fire? Have you cooked and eaten supper?
* I used cycling links to let you choose "verb noun" commands.
* Then the storylets provide responses to those commands, matching
  against the verb and noun variables and other world state.
* I added a little JavaScript snippet to sort storylets by the number of
  conditions they have so more specific responses can override the
  generic catch-all "I don't understand this command" storylets (a
  simple salience model, if you will).
* Also it heavily uses my [piecewise text
  reveal](https://gist.github.com/JoshuaGrams/2e5d3029dc48edf8770abb4a6b682ff2)
  code to break up my walls of text.

I only spent parts of maybe five days working on this, so it's a bit
messy and ad hoc.

In particular I'm including and excluding commands in two separate ways.
I have code that explicitly adds or removes nouns and verbs, so you can
only even enter particular commands in certain places or at certain
times. And then the storylets match against those, so they overlap and
get included and excluded in various ways.

Those two mechanics interact in ways that are probably hard to follow in
the code (i.e. why aren't there storylets to handle this case? Oh, it's
excluded by some command-input code which is scattered across several
passages). Otherwise I think it should be pretty readable. But feel free
to contact me with questions.
