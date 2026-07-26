# Publishing and gating

This is template content. This chapter covers the two flags that control whether a chapter is live and whether the course is visible.

## Ordering and publishing chapters

Chapters appear in the order they are listed in the manifest. The `tag` field is the label shown on the left of each row — use it for a chapter number like `00`, `01`, `02`.

Set `"published": true` on a chapter to make it live. A chapter that is not published still shows on the hub as a muted "coming soon" row, but it is skipped by the previous/next navigation and left out of the progress count. This lets you sketch out a full course and fill it in over time.

## Keeping a course private

A course marked `"locked": true` in its manifest is not linked anywhere public and its hub is gated behind a secret. Until the secret has been entered, the hub is hidden.

This is a soft gate, not real security. The site is static, so the content ships in the page and a determined person could read it. Use it to keep a work-in-progress out of sight, not to protect anything sensitive.

## Going live

When a course is ready for everyone, remove the `locked` flag and link its hub from wherever you want people to find it. The chapters, progress, and navigation all keep working unchanged.

That is the whole system. Duplicate the manifest, write your chapters, and the rest follows.
