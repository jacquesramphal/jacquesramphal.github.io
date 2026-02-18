# Claude Code Rules for This Project

## Documentation Page Creation Workflow

**CRITICAL:** When the user asks to create a new doc page, you MUST follow this exact workflow.

### 1. Create the Markdown Content File

**Location:** `src/assets/content/doc_XX.md`

- Determine the next available doc number (check existing files in `src/assets/content/`)
- Create the markdown file with proper frontmatter and content
- Use naming convention: `doc_58.md`, `doc_59.md`, etc.

### 2. Register in docs.json (REQUIRED)

**File:** `src/assets/data/docs.json`

Add an entry to the `entries` array. You can use either:

#### Option A: Full Metadata Entry (for featured articles)
```json
{
  "id": 26,
  "docId": 58,
  "slug": "my-article-slug",
  "title": "Article Title",
  "eyebrow": "Category Name",
  "description": "Article description...",
  "route": "/doc/my-article-slug",
  "contentFile": "doc_58.md",
  "thumbnail": "article/image.jpg",
  "alt": "Image alt text"
}
```

#### Option B: Minimal Entry (for utility pages)
```json
{
  "docId": 58,
  "slug": "my-page-slug",
  "contentFile": "doc_58.md"
}
```

**Required fields:**
- `docId` - The numeric ID matching the filename (e.g., 58 for doc_58.md)
- `slug` - The URL-friendly slug (used in `/doc/slug-name`)
- `contentFile` - The markdown filename (e.g., `doc_58.md`)

**Optional fields:**
- `id` - Sequential ID for the entry (used in featured lists)
- `title` - Display title
- `eyebrow` - Category/tag label
- `description` - Article description
- `route` - Full route path (always `/doc/{slug}`)
- `thumbnail` - Image path relative to `src/assets/images/`
- `alt` - Image alt text

### 3. Add to library.json (OPTIONAL)

**File:** `src/assets/data/library.json`

Only add to library.json if the doc should appear in the Library view (`/library` page).

Add a new entry to the `entries` array with the following structure:

```json
{
  "id": "unique-id",
  "docId": 58,
  "slug": "my-article-slug",
  "type": "article",
  "title": "Article Title",
  "eyebrow": "Category Name",
  "description": "Article description...",
  "route": "/doc/my-article-slug",
  "contentFile": "doc_58.md",
  "thumbnail": "article/image.jpg",
  "alt": "Image alt text",
  "tags": ["tag1", "tag2", "tag3"]
}
```

**Valid `type` values:**
- `"article"` - Writing/articles
- `"tool"` - CLI tools/packages
- `"case-study"` - Case studies (use full case study structure)
- `"design-project"` - Design projects

**Additional fields for library.json:**
- `tags` - Array of tag strings for filtering
- `github` - GitHub URL (for tools)
- `npm` - NPM package name (for tools)
- `link` - External link URL (if hosted elsewhere)
- `label` - CTA button label

### 4. Routing Behavior

The routing system supports both numeric IDs and semantic slugs:

- `/doc/58` → automatically redirects to → `/doc/my-article-slug`
- `/doc/my-article-slug` → renders the content directly

This is handled by [src/router/index.ts](src/router/index.ts) and [src/utils/docRegistry.ts](src/utils/docRegistry.ts).

### 5. DO NOT Create These Files

**NEVER** create or modify:
- ❌ `src/assets/data/docSlugs.json` - This file has been removed (consolidated into docs.json)
- ✅ Only modify `docs.json` and optionally `library.json`

### 6. Special Cases

#### Course Content (Design QA 101)
If creating course/chapter content, add to `src/assets/data/chapters.json` instead of docs.json.

#### Case Studies in Library
Case studies in library.json use an extended structure with additional fields:
- `variant` - Display variant (e.g., `"split"`)
- `size` - Card size (e.g., `"large"`)
- `bgcolor` - Background color
- `imageVariant` - Image display style
- `keypoints` - Array of key points
- `entries` - Array of case study sections

See existing case study entries in library.json for reference.

---

## Summary Checklist

When creating a new doc page, Claude must:

1. ✅ Create `src/assets/content/doc_XX.md`
2. ✅ Add entry to `src/assets/data/docs.json`
3. ✅ Optionally add to `src/assets/data/library.json` (if it should appear in Library view)
4. ✅ Use semantic slug naming (kebab-case)
5. ✅ Ensure `docId` matches the filename number
6. ❌ NEVER create or modify `docSlugs.json` (it no longer exists)

---

## Example: Complete New Doc Creation

**User Request:** "Create a new article about design principles"

**Claude Response:**

```markdown
I'll create a new article about design principles.

1. Creating doc_58.md with content...
2. Registering in docs.json with slug "design-principles"
3. Adding to library.json so it appears in the Library view

The article will be accessible at:
- /doc/58 (redirects to semantic URL)
- /doc/design-principles (canonical URL)
```

**Files Modified:**
- ✅ Created: `src/assets/content/doc_58.md`
- ✅ Updated: `src/assets/data/docs.json` (added entry with docId: 58)
- ✅ Updated: `src/assets/data/library.json` (added entry with tags)

---

## Important Notes

- **Single Source of Truth:** `docs.json` is the primary registry for all doc routing
- **Library is Display Layer:** `library.json` controls what appears in the Library view with additional display metadata
- **Chapters are Separate:** Course content uses `chapters.json` (different purpose)
- **No Redundancy:** We consolidated `docSlugs.json` into `docs.json` to eliminate redundant definitions
- **Semantic URLs Required:** Always use descriptive slugs, not just numbers

---

**Last Updated:** 2026-02-18
**Consolidation Date:** 2026-02-18 - Removed `docSlugs.json`, consolidated all routing into `docs.json`
