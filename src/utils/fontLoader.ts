/**
 * Font Loader Utility
 *
 * Provides singleton font loading with caching for opentype.js.
 * Ensures fonts are loaded once and reused across component instances.
 */

import opentype from 'opentype.js';

// In-memory cache for loaded fonts
const fontCache = new Map<string, opentype.Font>();

// Track ongoing font loading promises to prevent duplicate loads
const loadingPromises = new Map<string, Promise<opentype.Font>>();

/**
 * Load a font file and parse it with opentype.js
 *
 * @param fontPath - Path to the TTF/OTF font file
 * @returns Promise that resolves to parsed Font object
 *
 * @example
 * ```typescript
 * const font = await loadFont('/assets/type/epilogue/epilogue-regular.ttf');
 * ```
 */
export async function loadFont(fontPath: string): Promise<opentype.Font> {
  // Return cached font if available
  if (fontCache.has(fontPath)) {
    return fontCache.get(fontPath)!;
  }

  // Return existing loading promise if font is currently being loaded
  if (loadingPromises.has(fontPath)) {
    return loadingPromises.get(fontPath)!;
  }

  // Create new loading promise
  const loadPromise = (async () => {
    try {
      // Resolve font path - handle both relative and absolute paths
      // In production, webpack will bundle these assets
      let fontUrl = fontPath;

      // If path doesn't start with '/', treat as relative to public/assets
      if (!fontPath.startsWith('/') && !fontPath.startsWith('http')) {
        // Convert to absolute path from src
        fontUrl = require(`@/${fontPath}`);
      }

      // Load font asynchronously using opentype.js
      const font = await opentype.load(fontUrl);

      // Cache the loaded font
      fontCache.set(fontPath, font);

      // Clean up loading promise
      loadingPromises.delete(fontPath);

      return font;
    } catch (error) {
      // Clean up loading promise on error
      loadingPromises.delete(fontPath);

      // Re-throw with more context
      throw new Error(`Failed to load font from ${fontPath}: ${(error as Error).message}`);
    }
  })();

  // Store loading promise
  loadingPromises.set(fontPath, loadPromise);

  return loadPromise;
}

/**
 * Get a font from the cache without loading
 *
 * @param fontPath - Path to the font file
 * @returns Cached Font object or null if not loaded
 */
export function getFontFromCache(fontPath: string): opentype.Font | null {
  return fontCache.get(fontPath) || null;
}

/**
 * Check if a font is currently cached
 *
 * @param fontPath - Path to the font file
 * @returns true if font is in cache
 */
export function isFontCached(fontPath: string): boolean {
  return fontCache.has(fontPath);
}

/**
 * Clear the font cache (useful for testing or memory management)
 */
export function clearFontCache(): void {
  fontCache.clear();
  loadingPromises.clear();
}

/**
 * Preload a font without waiting for it
 * Useful for preloading fonts on app initialization
 *
 * @param fontPath - Path to the font file
 */
export function preloadFont(fontPath: string): void {
  loadFont(fontPath).catch((error) => {
    console.warn(`Font preload failed for ${fontPath}:`, error);
  });
}
