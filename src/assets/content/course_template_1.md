# How this template works

This is template content. Replace it with your own, or delete this course once you have cloned it. It exists to show every moving part of a multipage course in one place.

## The three pieces

A course is made of three things:

1. **A manifest** — a JSON file in `src/assets/data/` that names the course, sets its order, and lists each chapter.
2. **Chapter docs** — one markdown file per chapter in `src/assets/content/`, rendered by the standard document page.
3. **The hub** — the landing page that lists the chapters, shows your progress, and links into the sequence.

You only ever edit the first two. The hub, the progress bar, the table of contents, and the previous/next navigation all come for free.

## What you get without building anything

Because a chapter is just an ordinary document, every chapter page already has a table of contents built from its headings, a reading-time estimate, print and share controls, and a breadcrumb back to the course.

The course layer adds three things on top: a progress bar on the hub, a completion check on each chapter you have read, and previous/next links at the foot of every chapter.

## How to make your own

Copy the manifest, give it a new `slug` and `title`, point each entry at your own chapter docs, and you have a second course. Nothing else needs to change.

The next chapter covers what goes inside a chapter doc.
