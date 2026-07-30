# Tokens as the contract

_About ten minutes, then an afternoon building. One small token system, themed by changing values instead of components._

Every designer has lived the drift. The blue in the header is `#0A5FCE`, the blue on the primary button is `#0A60CF`, and the blue in the footer link is something a third person picked in a hurry two years ago. Nobody decided there would be three blues. Three blues just happened, one reasonable edit at a time.

Tokens are how you stop that. A token is a named decision, `color.action` instead of `#0A5FCE`, that every component points at instead of restating. Change the decision in one place and everything pointing at it moves together. The system stays one system because the components no longer hold their own opinions about color; they defer to the token.

The word "contract" is doing real work here. A style guide that lives in a document is a suggestion, and suggestions drift. A token that a component imports is enforced by the build: if the token changes, the component has no choice but to follow. That's the difference between writing the rule down and wiring it in.

## Watch one value move everything

Open the starter's token file and find the background and text values. Now switch the whole interface from light to dark without touching a single component.

You do it by changing what the tokens resolve to, not by editing the card, the header, or the button. `color.surface` was near-white; now it's near-black. `color.text` inverts to match. Every component that referenced those tokens flips at once, because none of them hardcoded the color. You changed two decisions and the entire interface followed.

If any component didn't flip, you just found the one place someone hardcoded a value instead of using the token. That's the leak. The theme switch is also a test.

## Your turn

Build a small token system from the starter: a handful of colors, a spacing scale, two or three type sizes. Then build two or three components that use only tokens, never raw values.

Now theme it. Make a second set of token values, a different brand or a dark mode, and switch between them by swapping values alone. If you have to open a component to change how it looks, that component is cheating, and you fix it until it isn't.

The test you're really running: can the look change without the components changing? If yes, you have a system. If you're in there editing components to reskin it, you have a pile of files that happen to look consistent today.

If it only lives in the design file, you don't have a system, you have a file.

<!-- line: the one value I changed that moved the most, and what didn't move that should have -->
