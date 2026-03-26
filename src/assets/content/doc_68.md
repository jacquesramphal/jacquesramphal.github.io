ad# Pixel Buddy
An interactive 8-bit character that lives on your website, responding to cursor movement and exploring the DOM.

| | |
|---|---|
| **Role** | Author |
| **Type** | Experiment |
| **Status** | WIP · 2025 |
| **Tags** | interaction · animation · vue · experiment |

## Overview

A small pixel art character rendered in pure CSS that inhabits the page. It follows your cursor, lands on DOM elements, and can be controlled directly with keyboard input. The character treats the page itself as a platformer level, detecting visual elements and using them as surfaces.

The design is a placeholder. The behavior is the experiment.

## The Constraint

Most website mascots or helper characters exist in a fixed position, disconnected from the content. They hover in a corner or pop up in a chat widget. The question here was whether a character could actually interact with the page layout itself, treating headings, images, cards, and buttons as physical surfaces.

## Approach

The character uses `document.elementsFromPoint()` to scan for elements below its feet, checking whether they have visual presence: background colors, images, borders, or text content. Invisible containers and padding are ignored. When it finds something solid, it lands on it.

Movement follows the cursor horizontally with gravity pulling it down to the nearest surface. Jumping lets it reach higher elements. A drop-through mechanic lets it fall past the current platform to whatever is below.

### Interactions

- **Follow mode**: walks toward the cursor, jumps when the cursor is far above
- **WASD control**: direct keyboard control with jump and drop-through
- **Drag and drop**: click and drag to reposition manually
- **Emotes**: wave, dance, sleep, celebrate
- **Go home**: returns to the default position in the bottom right corner

Right-click opens a context menu with all available actions.

## What I Learned

DOM collision detection is imprecise. Bounding boxes don't reflect visual boundaries, and what looks solid to a user (text, images, cards) requires explicit checks for backgrounds, borders, and content. The scanning approach works but has performance costs when many elements are present.

The character's behavior is more interesting than its appearance. A simple placeholder design is enough to test whether the interaction model feels right. The visual design can evolve once the mechanics are working.
