# Vite Migration Plan for jacquesramphal.github.io

## Context

The portfolio site currently uses Vue CLI with Webpack 5, which has several limitations:
- **Build Performance**: Slower than Vite's instant HMR and faster builds
- **Plugin Compatibility**: Already encountered issues with prerender-spa-plugin
- **Developer Experience**: Vite offers superior DX with near-instant server start
- **Modern Tooling**: Vite is the recommended build tool for Vue 3 projects

However, this codebase has **significant Webpack-specific patterns** that will require careful migration. The analysis shows **3 critical blockers** and **moderate-high migration complexity**.

---

## Migration Difficulty: **MODERATE-HIGH** ⚠️

**Estimated Effort:** 2-4 days of focused development
**Risk Level:** Medium (breaking changes to dynamic asset loading)
**Recommended:** Thorough testing before production deployment

---

## Critical Blockers Identified

### 🔴 **BLOCKER 1: require.context() - Webpack-Specific Dynamic Imports**

**Impact:** High - Core content loading system
**Files Affected:** 2 critical files

**Location 1:** `src/pages/MarkdownPage.vue:93,126`
```javascript
// Pre-loads ALL images for dynamic lookup
const imageContext = require.context('../assets/images', true, /\.(png|jpg|jpeg|gif|svg)$/);
const imageMap = {};
imageContext.keys().forEach((item) => {
  imageMap[item] = imageContext(item);
  // Multiple key storage strategies for flexible lookup
});

// Pre-loads ALL markdown docs
const contentContext = require.context("../assets/content", false, /\.md$/);
```

**Location 2:** `src/components/BreadCrumb.vue:63`
```javascript
const contentContext = require.context("../assets/content", false, /\.md$/);
```

**Vite Solution:**
Replace with `import.meta.glob()`:
```javascript
const imageModules = import.meta.glob('../assets/images/**/*.(png|jpg|jpeg|gif|svg)', { eager: true });
const contentModules = import.meta.glob('../assets/content/*.md', { eager: true, as: 'raw' });
```

---

### 🔴 **BLOCKER 2: Dynamic require() with Template Strings**

**Impact:** High - 19+ instances across 8 component files
**Pattern:** `require(\`path/${variable}\`)`

**Files Affected:**
1. `src/components/card/ImageCard/ImageCard.vue` - 10 instances (Lines 34, 42, 49, 90, 98, 105, 145, 183, 192, 200)
2. `src/components/card/ArticleCard/ArticleCard.vue` - 3 instances (Lines 11, 21, 31)
3. `src/components/card/TextImage.vue` - 1 instance (Line 24)
4. `src/components/Icon.vue` - 2 instances (Lines 9, 15)
5. `src/components/ThumbDetail/ThumbDetail.vue` - 1 instance (Line 20)
6. `src/components/HeroBanner/HeroBanner.vue` - 1 instance (Line 9)
7. `src/pages/ProjectPage.vue` - 1 instance (Line 298)
8. `src/pages/MarkdownPage.vue` - 1 instance with error handling

**Example:**
```vue
<img :src="require(`../../../assets/images/${filename}`)" />
```

**Vite Solution:**
Create asset mapping function using `import.meta.glob()`:
```javascript
// In a utility file
const imageModules = import.meta.glob('@/assets/images/**/*.(png|jpg|jpeg|gif|svg)', { eager: true });

export function getImageUrl(path) {
  const fullPath = `/src/assets/images/${path}`;
  return imageModules[fullPath]?.default || null;
}

// In component
<img :src="getImageUrl(filename)" />
```

---

### 🔴 **BLOCKER 3: Webpack Loaders (Markdown & SVG)**

**Impact:** High - Custom asset processing pipelines
**Files Affected:** Build configuration

**Markdown Loader Chain:**
- Location: `vue.config.js:13-18`
- Pipeline: `.md` → html-loader → markdown-loader → HTML output
- Used by: MarkdownPage.vue, BreadCrumb.vue

**SVG Inline Loader:**
- Location: `vue.config.js:6-8`, `webpack.config.js:4-8`
- Loader: vue-svg-inline-loader
- Purpose: Inline SVG optimization

**Vite Solution:**
- Markdown: Use `vite-plugin-md` or `@vueuse/markdown`
- SVG: Use `vite-svg-loader` or Vite's native SVG handling

---

### 🟡 **BLOCKER 4: Environment Variables**

**Impact:** Medium - 5+ files affected
**Pattern:** `process.env.VUE_APP_*` → Must become `import.meta.env.VITE_*`

**Files Affected:**
- `src/components/blog/BlogPost.vue:221,225`
- `src/pages/misc/MyDocs.vue:84,88`
- `src/pages/misc/MyBlog copy.vue` (multiple)
- `src/pages/InfoPage.vue` (multiple)
- `vue.config.js:1` (`process.env.NODE_ENV`)

**Variables to Rename:**
- `VUE_APP_CONTENTFUL_SPACE_ID` → `VITE_CONTENTFUL_SPACE_ID`
- `VUE_APP_CONTENTFUL_ACCESS_TOKEN` → `VITE_CONTENTFUL_ACCESS_TOKEN`

**Vite Solution:**
Global search/replace + `.env` file update

---

### 🟡 **BLOCKER 5: BASE_URL Template Variable**

**Impact:** Low - Single usage
**Location:** `public/index.html:56`

```html
<link rel="icon" href="<%= BASE_URL %>fav-dynamic.svg" />
```

**Vite Solution:**
Replace with absolute path or use Vite's asset handling:
```html
<link rel="icon" href="/fav-dynamic.svg" />
```

---

## Package Changes Required

### **Remove (20+ packages):**

**Build Tools:**
- `@vue/cli-service`
- `@vue/cli-plugin-babel`
- `@vue/cli-plugin-eslint`
- `@vue/cli-plugin-router`
- `@vue/cli-plugin-typescript`
- `webpack`
- `webpack-cli`
- `@webpack-cli/init`
- `@expo/webpack-config`

**Loaders:**
- `babel-loader`
- `sass-loader`
- `postcss-loader`
- `vue-loader` (Webpack version)
- `html-loader`
- `raw-loader`
- `markdown-loader`
- `vue-markdown-loader`
- `vue-svg-inline-loader`

**Other:**
- `babel-eslint`
- `vue-template-compiler`
- `prerender-spa-plugin`
- `escodegen`
- `esprima`

### **Add (~8 packages):**

**Core:**
- `vite@^5.0.0`
- `@vitejs/plugin-vue@^5.0.0`

**Plugins:**
- `vite-plugin-md` or `vite-plugin-vue-markdown`
- `vite-svg-loader`
- `@prerenderer/rollup-plugin` (if pre-rendering needed)

**Storybook:**
- `@storybook/vue3-vite` (replace webpack5 version)

**Optional:**
- `@vitejs/plugin-vue-jsx` (if using JSX)
- `vite-plugin-compression` (gzip/brotli)

---

## Migration Strategy

### **Phase 1: Initial Vite Setup (No Breaking Changes)**

**Goal:** Get Vite running alongside Webpack
**Duration:** 1-2 hours

**Steps:**
1. Install Vite and core plugins
2. Create basic `vite.config.ts`
3. Add Vite dev script: `"dev:vite": "vite"`
4. Test basic Vue 3 + Router functionality
5. Keep existing Webpack setup intact

**Files to Create:**
- `vite.config.ts`

**Files to Update:**
- `package.json` (add scripts, add dependencies)
- `tsconfig.json` (add Vite types)

---

### **Phase 2: Asset Loading Migration (CRITICAL)**

**Goal:** Replace all require() and require.context() patterns
**Duration:** 4-6 hours

**Steps:**

1. **Create Asset Utilities:**
   - Create `src/utils/assetLoader.ts` with `import.meta.glob()` implementations
   - Export helper functions: `getImageUrl()`, `getMarkdownContent()`, `getAllImages()`

2. **Migrate MarkdownPage.vue:**
   - Replace `require.context()` for images (Line 93)
   - Replace `require.context()` for markdown (Line 126)
   - Update dynamic imports to use new utilities
   - Test markdown rendering

3. **Migrate Image Components:**
   - Update ImageCard, ArticleCard, TextImage, Icon, ThumbDetail, HeroBanner
   - Replace all `require(\`...\`)` with utility functions
   - Maintain prop interfaces (no component API changes)

4. **Migrate BreadCrumb.vue:**
   - Replace markdown require.context (Line 63)

**Files to Create:**
- `src/utils/assetLoader.ts`

**Files to Update:**
- `src/pages/MarkdownPage.vue`
- `src/components/BreadCrumb.vue`
- `src/components/card/ImageCard/ImageCard.vue`
- `src/components/card/ArticleCard/ArticleCard.vue`
- `src/components/card/TextImage.vue`
- `src/components/Icon.vue`
- `src/components/ThumbDetail/ThumbDetail.vue`
- `src/components/HeroBanner/HeroBanner.vue`
- `src/pages/ProjectPage.vue`

---

### **Phase 3: Environment Variables Migration**

**Goal:** Update all process.env references
**Duration:** 30 minutes

**Steps:**
1. Rename `.env` variables: `VUE_APP_*` → `VITE_*`
2. Global find/replace: `process.env.VUE_APP_` → `import.meta.env.VITE_`
3. Update `process.env.NODE_ENV` → `import.meta.env.MODE`

**Files to Update:**
- `.env` (if exists)
- `src/components/blog/BlogPost.vue`
- `src/pages/misc/MyDocs.vue`
- `src/pages/misc/MyBlog copy.vue`
- `src/pages/InfoPage.vue`

---

### **Phase 4: Vite Configuration (Plugins & Loaders)**

**Goal:** Replicate Webpack loader functionality
**Duration:** 2-3 hours

**Steps:**

1. **Configure Markdown Plugin:**
```typescript
// vite.config.ts
import Markdown from 'vite-plugin-md';

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      // Options to match markdown-loader behavior
    }),
  ],
});
```

2. **Configure SVG Plugin:**
```typescript
import svgLoader from 'vite-svg-loader';

plugins: [
  svgLoader({
    svgoConfig: {
      // Match vue-svg-inline-loader behavior
    }
  }),
]
```

3. **Configure Path Aliases:**
```typescript
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  }
}
```

**Files to Create:**
- Complete `vite.config.ts`

---

### **Phase 5: Build Scripts & Cleanup**

**Goal:** Update package.json and remove Webpack files
**Duration:** 30 minutes

**Steps:**
1. Update scripts in package.json
2. Remove `vue.config.js`
3. Remove `webpack.config.js`
4. Remove Webpack dependencies
5. Update `index.html` template syntax (remove `<%= BASE_URL %>`)

**Files to Delete:**
- `vue.config.js`
- `webpack.config.js`

**Files to Update:**
- `package.json`
- `public/index.html`
- `tsconfig.json`

---

### **Phase 6: Storybook Migration**

**Goal:** Migrate Storybook to Vite
**Duration:** 1-2 hours

**Steps:**
1. Update framework: `@storybook/vue3-webpack5` → `@storybook/vue3-vite`
2. Update `.storybook/main.js` framework config
3. Remove `.storybook/webpack.config.js`
4. Test all Storybook stories
5. Update `build-storybook` script

**Files to Update:**
- `.storybook/main.js`

**Files to Delete:**
- `.storybook/webpack.config.js`

---

### **Phase 7: Testing & Validation**

**Goal:** Ensure feature parity with Webpack build
**Duration:** 2-3 hours

**Test Checklist:**
- [ ] Dev server starts (`pnpm dev`)
- [ ] Homepage loads correctly
- [ ] All routes work (/, /library, /writing, /work, etc.)
- [ ] Dynamic images load in ImageCard components
- [ ] Markdown pages render correctly (case studies)
- [ ] Icon component works with SVGs
- [ ] Environment variables accessible
- [ ] Production build succeeds (`pnpm build`)
- [ ] Sitemap generation works
- [ ] Storybook builds and loads
- [ ] GitHub Actions deployment works

---

## What WILL Break During Migration

### **1. All Dynamic Image Loading (19+ instances)**
- **Current:** `require(\`../images/${filename}\`)`
- **Breaks:** Vite doesn't support dynamic require()
- **Fix:** Refactor to `import.meta.glob()` with mapping function

### **2. Markdown File Loading (2 files)**
- **Current:** `require.context()` for .md files
- **Breaks:** Webpack API not available
- **Fix:** Use `import.meta.glob()` with `{ as: 'raw' }`

### **3. SVG Inline Processing**
- **Current:** `vue-svg-inline-loader` in webpack config
- **Breaks:** Webpack loaders not compatible
- **Fix:** Use `vite-svg-loader` plugin

### **4. Build Scripts**
- **Current:** `vue-cli-service serve/build`
- **Breaks:** Vue CLI commands won't exist
- **Fix:** Update to `vite` and `vite build`

### **5. Environment Variables**
- **Current:** `process.env.VUE_APP_*`
- **Breaks:** Different API in Vite
- **Fix:** Replace with `import.meta.env.VITE_*`

### **6. BASE_URL in Templates**
- **Current:** `<%= BASE_URL %>` (EJS syntax)
- **Breaks:** Vite doesn't use EJS templating
- **Fix:** Use plain `/` or environment variable

---

## What Will NOT Break

✅ **Vue 3 Components** - All .vue files work in Vite
✅ **Vue Router 4** - Fully compatible
✅ **Vuex** - Fully compatible
✅ **TypeScript** - Vite has excellent TS support
✅ **Sass/SCSS** - Supported natively in Vite
✅ **@vueuse/head** - Works perfectly with Vite
✅ **GSAP Animations** - No changes needed
✅ **Sitemap Generation** - Node script, independent of build tool
✅ **Most NPM Packages** - Should work as-is

---

## Recommended Migration Approach

### **Option A: Incremental Migration (RECOMMENDED)**

**Pros:**
- Lower risk - keep Webpack as fallback
- Can test Vite in parallel
- Gradual refactoring of dynamic imports
- Easy rollback if issues arise

**Cons:**
- Dual build system temporarily
- Slightly longer total migration time

**Timeline:** 2-4 days

---

### **Option B: Complete Replacement**

**Pros:**
- Faster completion
- Clean break from Webpack
- Forces comprehensive refactoring

**Cons:**
- Higher risk - no fallback
- Must fix all blockers before testing
- Potential for extended debugging

**Timeline:** 2-3 days (if all goes well)

---

## Critical Files to Modify

### **High Priority (Core Functionality):**
1. `src/pages/MarkdownPage.vue` - Extensive refactoring needed
2. `src/components/card/ImageCard/ImageCard.vue` - 10 require() calls
3. `src/components/Icon.vue` - Dynamic SVG loading
4. `vue.config.js` → Delete, replace with `vite.config.ts`

### **Medium Priority:**
5. `src/components/card/ArticleCard/ArticleCard.vue`
6. `src/components/BreadCrumb.vue`
7. `src/components/card/TextImage.vue`
8. `src/components/ThumbDetail/ThumbDetail.vue`
9. `src/components/HeroBanner/HeroBanner.vue`
10. `src/pages/ProjectPage.vue`

### **Low Priority (Config/Scripts):**
11. `package.json` - Scripts and dependencies
12. `public/index.html` - Template syntax
13. `tsconfig.json` - Type definitions
14. `.storybook/main.js` - Framework change
15. `.github/workflows/gh-pages-deploy.yml` - May need pnpm cache update

---

## New File Structure After Migration

```
project/
├── vite.config.ts              ← NEW: Vite configuration
├── src/
│   └── utils/
│       └── assetLoader.ts      ← NEW: Dynamic asset loading utilities
├── .storybook/
│   └── main.js                 ← UPDATED: Vite framework
└── DELETED:
    ├── vue.config.js
    ├── webpack.config.js
    └── .storybook/webpack.config.js
```

---

## Risk Mitigation

### **Before Migration:**
1. ✅ Commit all current changes (already done)
2. ✅ Tag current version: `git tag pre-vite-migration`
3. ✅ Create migration branch: `git checkout -b feat/vite-migration`
4. ✅ Document current working state

### **During Migration:**
1. Test each phase incrementally
2. Keep Webpack build working until Vite is fully validated
3. Use feature flags if needed for gradual rollout

### **After Migration:**
1. Full regression testing
2. Performance benchmarking (build time, bundle size, HMR speed)
3. Deploy to staging/preview environment first
4. Monitor production after deployment

---

## Expected Benefits

### **Build Performance:**
- **Dev Server Start:** ~15s (Webpack) → ~1s (Vite) ⚡
- **HMR:** ~500ms → ~50ms ⚡⚡
- **Production Build:** ~60s → ~30s ⚡

### **Developer Experience:**
- Instant server start
- Near-instant HMR
- Better error messages
- Native ESM support

### **Bundle Optimization:**
- Automatic code splitting
- Better tree shaking
- Smaller bundle sizes
- Modern browser targeting by default

---

## Verification Plan

### **Phase 1: Development Testing**
```bash
# Test dev server
pnpm dev

# Verify:
- Homepage loads
- Navigation works
- Images display correctly
- Markdown pages render
- Dynamic content loads
- HMR updates work
```

### **Phase 2: Build Testing**
```bash
# Test production build
pnpm build

# Verify:
- Build completes successfully
- Sitemap generates
- Dist folder contains all assets
- No broken asset references
```

### **Phase 3: Preview Testing**
```bash
# Test production preview
pnpm preview

# Verify:
- All routes work in production mode
- Assets load correctly
- No console errors
- Performance is good
```

### **Phase 4: Storybook Testing**
```bash
# Test Storybook
pnpm storybook
pnpm build-storybook

# Verify:
- All stories load
- Components render correctly
- No webpack errors
```

### **Phase 5: GitHub Actions**
- Push to migration branch
- Verify GitHub Actions build succeeds
- Check deployed preview

---

## User Preferences (Confirmed)

✅ **Approach:** Incremental Migration (Webpack + Vite in parallel)
✅ **Pre-rendering:** Skip for now (rely on dynamic meta tags)
✅ **Storybook:** Migrate simultaneously with main site
✅ **Urgency:** Low - Planning ahead, no rush

---

## Final Migration Strategy

Based on your preferences, here's the **incremental, low-risk migration plan**:

### **Step 1: Create Migration Branch**
```bash
git checkout -b feat/vite-migration
git tag pre-vite-migration
```

**Step 2: Install Vite Alongside Webpack**
```bash
pnpm add -D vite @vitejs/plugin-vue vite-plugin-md vite-svg-loader
```

**Step 3: Create Minimal vite.config.ts**
- Test basic dev server
- Validate Vue 3 compatibility

**Step 4: Refactor Asset Loading**
- Start with MarkdownPage.vue (biggest blocker)
- Create assetLoader.ts utility
- Migrate one component at a time

**Step 5: Full Cutover**
- Remove Webpack when all tests pass
- Update GitHub Actions
- Deploy

---

## Detailed Implementation Plan

### **Phase 1: Vite Setup (Parallel to Webpack)**

**1.1 Install Dependencies:**
```bash
pnpm add -D vite @vitejs/plugin-vue vite-plugin-md vite-svg-loader
pnpm add -D @storybook/vue3-vite  # For Storybook migration
```

**1.2 Create vite.config.ts:**
```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import Markdown from 'vite-plugin-md';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
    }),
    svgLoader(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8081, // Different from Webpack (8080) to run in parallel
  },
  build: {
    outDir: 'dist-vite', // Separate output during migration
  },
});
```

**1.3 Update package.json scripts:**
```json
{
  "scripts": {
    "dev": "vue-cli-service serve",           // Keep Webpack
    "dev:vite": "vite",                        // Add Vite
    "build": "node scripts/generate-sitemap.js && vue-cli-service build",
    "build:vite": "node scripts/generate-sitemap.js && vite build",
    "preview": "vite preview",                 // Add preview
  }
}
```

**1.4 Update tsconfig.json:**
```json
{
  "compilerOptions": {
    "types": ["vite/client"]  // Replace "webpack-env"
  }
}
```

**Validation:**
- Run `pnpm dev:vite`
- Check if basic pages load (may have broken images initially - that's expected)
- Verify no compilation errors

---

### **Phase 2: Create Asset Loading Utilities**

**2.1 Create src/utils/assetLoader.ts:**
```typescript
// Pre-load all images using Vite's import.meta.glob
const imageModules = import.meta.glob('@/assets/images/**/*.(png|jpg|jpeg|gif|svg)', {
  eager: true,
  import: 'default'
});

// Create mapping for flexible lookup (matches current require.context behavior)
const imageMap: Record<string, string> = {};

Object.keys(imageModules).forEach((path) => {
  const url = imageModules[path] as string;

  // Store with full path (e.g., '/src/assets/images/article/token.jpg')
  imageMap[path] = url;

  // Store with relative path (e.g., 'article/token.jpg')
  const relativePath = path.replace('/src/assets/images/', '').replace('@/assets/images/', '');
  imageMap[relativePath] = url;

  // Store with just filename for direct lookup
  const filename = relativePath.split('/').pop();
  if (filename && !imageMap[filename]) {
    imageMap[filename] = url;
  }
});

/**
 * Get image URL by filename or path
 * Supports: 'token.jpg', 'article/token.jpg', '../assets/images/article/token.jpg'
 */
export function getImageUrl(path: string): string | null {
  if (!path) return null;

  // Clean path
  const cleanPath = path
    .replace('../assets/images/', '')
    .replace('./assets/images/', '')
    .replace('@/assets/images/', '')
    .replace('/assets/images/', '');

  return imageMap[cleanPath] || imageMap[path] || null;
}

/**
 * Get all images (for debugging/inspection)
 */
export function getAllImages() {
  return imageMap;
}

// Pre-load all markdown content
const contentModules = import.meta.glob('@/assets/content/*.md', {
  eager: true,
  as: 'raw'
});

const contentMap: Record<string, string> = {};

Object.keys(contentModules).forEach((path) => {
  const content = contentModules[path] as string;
  const filename = path.split('/').pop() || '';
  contentMap[filename] = content;
  contentMap[path] = content;
});

/**
 * Get markdown content by filename
 */
export function getMarkdownContent(filename: string): string | null {
  return contentMap[filename] || contentMap[`./${filename}`] || null;
}
```

**Validation:**
- Create test component to verify image URLs resolve correctly
- Test with various path formats

---

### **Phase 3: Migrate Image Components (One by One)**

**3.1 Migrate Icon.vue first (simplest):**

Before:
```vue
<img :src="require(`../assets/images/${name}`)" />
```

After:
```vue
<script setup>
import { computed } from 'vue';
import { getImageUrl } from '@/utils/assetLoader';

const props = defineProps<{ name: string }>();
const imageUrl = computed(() => getImageUrl(props.name));
</script>

<template>
  <img :src="imageUrl" />
</template>
```

**3.2 Migrate remaining components** in this order:
1. ThumbDetail.vue
2. TextImage.vue
3. HeroBanner.vue
4. ArticleCard.vue
5. ImageCard.vue (most complex - 10 instances)
6. ProjectPage.vue
7. MarkdownPage.vue (most critical)

**Validation per component:**
- Test in Vite dev server
- Verify images load correctly
- Check console for errors

---

### **Phase 4: Environment Variables Migration**

**4.1 Update .env file:**
```bash
# Before
VUE_APP_CONTENTFUL_SPACE_ID=xxx
VUE_APP_CONTENTFUL_ACCESS_TOKEN=xxx

# After
VITE_CONTENTFUL_SPACE_ID=xxx
VITE_CONTENTFUL_ACCESS_TOKEN=xxx
```

**4.2 Global replace in code:**
```bash
# Find all occurrences
grep -r "process.env.VUE_APP_" src/

# Replace pattern:
process.env.VUE_APP_CONTENTFUL_SPACE_ID
# With:
import.meta.env.VITE_CONTENTFUL_SPACE_ID
```

**Files to update:**
- src/components/blog/BlogPost.vue
- src/pages/misc/MyDocs.vue
- src/pages/misc/MyBlog copy.vue
- src/pages/InfoPage.vue

---

### **Phase 5: Storybook Migration**

**5.1 Update .storybook/main.js:**

Before:
```javascript
framework: '@storybook/vue3-webpack5'
```

After:
```javascript
framework: '@storybook/vue3-vite'
```

**5.2 Remove .storybook/webpack.config.js** (no longer needed)

**5.3 Update storybook scripts:**
```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

---

### **Phase 6: Full Cutover**

**When ready (all tests passing):**

**6.1 Update package.json scripts:**
```json
{
  "scripts": {
    "dev": "vite",                                              // Changed
    "build": "node scripts/generate-sitemap.js && vite build",  // Changed
    "preview": "vite preview",                                  // New
    "lint": "eslint . --ext .js,.ts,.vue"                       // Updated
  }
}
```

**6.2 Remove Webpack dependencies:**
```bash
pnpm remove @vue/cli-service @vue/cli-plugin-babel @vue/cli-plugin-eslint @vue/cli-plugin-router @vue/cli-plugin-typescript webpack webpack-cli @webpack-cli/init babel-loader sass-loader postcss-loader vue-loader html-loader raw-loader markdown-loader vue-markdown-loader vue-svg-inline-loader @expo/webpack-config prerender-spa-plugin vue-template-compiler babel-eslint
```

**6.3 Delete config files:**
- Delete `vue.config.js`
- Delete `webpack.config.js`

**6.4 Update public/index.html:**
```html
<!-- Before -->
<link rel="icon" href="<%= BASE_URL %>fav-dynamic.svg" />

<!-- After -->
<link rel="icon" href="/fav-dynamic.svg" />
```

**6.5 Update GitHub Actions** (if build changes needed)

---

### **Phase 7: Final Testing Checklist**

**Development:**
- [ ] `pnpm dev` starts Vite dev server
- [ ] Homepage renders correctly
- [ ] All images load (check browser console)
- [ ] Navigation works (/library, /writing, /work, etc.)
- [ ] Markdown pages render (case studies)
- [ ] Dynamic content loads correctly
- [ ] HMR updates work instantly
- [ ] No console errors

**Production Build:**
- [ ] `pnpm build` completes successfully
- [ ] Sitemap.xml generated (22 URLs)
- [ ] `dist/` contains all assets
- [ ] `pnpm preview` works
- [ ] Images accessible in preview
- [ ] Meta tags present in HTML
- [ ] Bundle size is reasonable

**Storybook:**
- [ ] `pnpm storybook` starts successfully
- [ ] All stories load correctly
- [ ] Components render properly
- [ ] `pnpm build-storybook` succeeds

**Deployment:**
- [ ] GitHub Actions build succeeds
- [ ] Site deploys to GitHub Pages
- [ ] All routes accessible
- [ ] Images load on production
- [ ] SEO meta tags working
- [ ] OG image displays when shared

---

## Estimated Timeline (Incremental Approach)

| Phase | Duration | Risk | Can Run Webpack? |
|-------|----------|------|------------------|
| Phase 1: Vite Setup | 1-2 hours | Low | ✅ Yes |
| Phase 2: Asset Utilities | 2-3 hours | Low | ✅ Yes |
| Phase 3: Component Migration | 6-8 hours | Medium | ✅ Yes |
| Phase 4: Environment Variables | 30 min | Low | ✅ Yes |
| Phase 5: Storybook Migration | 1-2 hours | Medium | ✅ Yes |
| Phase 6: Full Cutover | 1 hour | Low | ❌ No |
| Phase 7: Testing & Validation | 2-3 hours | Low | ❌ No |
| **Total** | **3-4 days** | **Low-Medium** | - |

**Key Advantage:** Can revert to Webpack at any point until Phase 6.

---

## Rollback Strategy

### **If Issues Arise:**

**Before Phase 6 (Full Cutover):**
```bash
# Simply use Webpack scripts
pnpm dev        # Uses Webpack
pnpm build      # Uses Webpack
```
No rollback needed - Webpack still works.

**After Phase 6:**
```bash
# Rollback branch
git checkout main
git branch -D feat/vite-migration

# Or reset specific files
git restore vue.config.js package.json
```

---

## Success Metrics

**Performance Targets:**
- ⚡ Dev server start: < 2 seconds (vs ~15s with Webpack)
- ⚡ HMR updates: < 100ms (vs ~500ms)
- ⚡ Production build: < 45 seconds (vs ~60s)
- 📦 Bundle size: Similar or smaller than Webpack

**Quality Targets:**
- ✅ Zero console errors in development
- ✅ Zero broken images or assets
- ✅ All routes functional
- ✅ Storybook fully operational
- ✅ SEO meta tags preserved
- ✅ GitHub Actions deployment succeeds

---

## Known Gotchas & Solutions

### **Gotcha 1: import.meta.glob() is eager by default**
- **Issue:** May load all assets at startup
- **Solution:** Use `{ eager: true }` only for critical assets, lazy load others

### **Gotcha 2: Absolute imports might break**
- **Issue:** `@/` alias needs explicit configuration
- **Solution:** Configure in vite.config.ts resolve.alias

### **Gotcha 3: CSS module imports**
- **Issue:** Different syntax than Webpack
- **Solution:** Vite handles this automatically, but verify SCSS imports

### **Gotcha 4: Public directory handling**
- **Issue:** Assets in `public/` referenced differently
- **Solution:** Use `/` prefix for public assets, not `BASE_URL`

### **Gotcha 5: Dynamic imports in production**
- **Issue:** May need different chunking strategy
- **Solution:** Configure `build.rollupOptions.output.manualChunks`

---

## Final Recommendation

**For your situation (low urgency, planning ahead):**

1. **Now:** Keep this plan as reference documentation
2. **When ready:** Start with Phase 1 (setup Vite in parallel)
3. **Validate:** Run both dev servers side-by-side
4. **Migrate:** One component at a time over several sessions
5. **Deploy:** Only after thorough testing

**Benefits of waiting:**
- Vite ecosystem matures further
- Storybook 8+ may have better Vite support
- More community examples for your use cases
- Can batch with other major updates

**Drawbacks of waiting:**
- Stuck with slower Webpack builds
- Plugin compatibility issues may persist
- Missing out on Vite DX improvements

---

## When to Execute This Migration

**Good Time to Migrate:**
- ✅ During a slow period / between major features
- ✅ When you have 3-4 days for focused work
- ✅ Before adding significant new features
- ✅ When upgrading other dependencies (Vue, TypeScript, etc.)

**Bad Time to Migrate:**
- ❌ Right before a major launch
- ❌ During active feature development
- ❌ When deadlines are tight
- ❌ Without adequate testing time

---

## Conclusion

This migration is **definitely achievable** but requires careful execution due to:
- Heavy use of Webpack-specific dynamic imports (19+ instances)
- require.context() in critical files (MarkdownPage.vue)
- Custom loader pipeline for markdown and SVG

**The incremental approach you selected** is the safest path forward, allowing you to:
- Keep Webpack working while migrating
- Test Vite thoroughly before committing
- Roll back easily if issues arise
- Learn Vite patterns gradually

**Total effort:** 3-4 focused days when you're ready to execute.
