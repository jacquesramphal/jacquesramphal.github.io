/**
 * Counter Typography Composable
 *
 * Provides functionality to parse font glyphs, classify contours as outer shapes
 * vs counters (holes), and generate SVG path data for independent rendering.
 *
 * This implements the core algorithm for counter-only typography fill effect.
 */

import { ref, type Ref } from 'vue';
import opentype from 'opentype.js';
import { loadFont } from '@/utils/fontLoader';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Point {
  x: number;
  y: number;
}

interface Contour {
  points: Point[];
  commands: opentype.PathCommand[];
}

interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
}

interface ParsedTextResult {
  counterPaths: string[];      // SVG path data for counters
  foregroundPath: string;      // SVG path data for foreground text
  viewBox: string;             // SVG viewBox attribute
  bounds: BoundingBox;         // Bounding box of the text
}

interface CounterTypographyOptions {
  fontPath?: string;
  cacheResults?: boolean;
}

// ============================================================================
// POINT-IN-POLYGON ALGORITHM (RAY CASTING)
// ============================================================================

/**
 * Determine if a point is inside a contour using ray-casting algorithm
 *
 * Casts a horizontal ray from the point to infinity and counts intersections
 * with contour edges. Odd count = inside, even count = outside.
 *
 * @param point - The point to test
 * @param contour - The contour to test against
 * @returns true if point is inside the contour
 */
function isPointInContour(point: Point, contour: Contour): boolean {
  let inside = false;
  const points = contour.points;

  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i].x;
    const yi = points[i].y;
    const xj = points[j].x;
    const yj = points[j].y;

    // Check if horizontal ray from point intersects edge (i,j)
    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

// ============================================================================
// BEZIER CURVE FLATTENING
// ============================================================================

/**
 * Flatten a quadratic bezier curve into line segments
 *
 * @param cmd - Quadratic curve command from opentype.js
 * @returns Array of points approximating the curve
 */
function flattenQuadraticCurve(cmd: opentype.PathCommand): Point[] {
  const points: Point[] = [];
  const steps = 10; // Number of line segments to approximate curve

  // Get control points
  const x0 = cmd.x || 0;
  const y0 = cmd.y || 0;
  const x1 = (cmd as any).x1 || x0;
  const y1 = (cmd as any).y1 || y0;
  const x2 = (cmd as any).x || x0;
  const y2 = (cmd as any).y || y0;

  // Sample points along curve using quadratic bezier formula
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const mt = 1 - t;

    const x = mt * mt * x0 + 2 * mt * t * x1 + t * t * x2;
    const y = mt * mt * y0 + 2 * mt * t * y1 + t * t * y2;

    points.push({ x, y });
  }

  return points;
}

/**
 * Flatten a cubic bezier curve into line segments
 *
 * @param cmd - Cubic curve command from opentype.js
 * @returns Array of points approximating the curve
 */
function flattenCubicCurve(cmd: opentype.PathCommand): Point[] {
  const points: Point[] = [];
  const steps = 10;

  // Get control points
  const x0 = cmd.x || 0;
  const y0 = cmd.y || 0;
  const x1 = (cmd as any).x1 || x0;
  const y1 = (cmd as any).y1 || y0;
  const x2 = (cmd as any).x2 || x0;
  const y2 = (cmd as any).y2 || y0;
  const x3 = (cmd as any).x || x0;
  const y3 = (cmd as any).y || y0;

  // Sample points along curve using cubic bezier formula
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;
    const t2 = t * t;
    const t3 = t2 * t;

    const x = mt3 * x0 + 3 * mt2 * t * x1 + 3 * mt * t2 * x2 + t3 * x3;
    const y = mt3 * y0 + 3 * mt2 * t * y1 + 3 * mt * t2 * y2 + t3 * y3;

    points.push({ x, y });
  }

  return points;
}

// ============================================================================
// CONTOUR EXTRACTION
// ============================================================================

/**
 * Extract contours from opentype.js Path commands
 *
 * A contour is a closed path (M...Z sequence). Glyphs can have multiple contours:
 * - Outer contours define the letter shape
 * - Inner contours define counter spaces (holes)
 *
 * @param path - opentype.js Path object
 * @returns Array of contours with points and commands
 */
function extractContours(path: opentype.Path): Contour[] {
  const contours: Contour[] = [];
  let currentPoints: Point[] = [];
  let currentCommands: opentype.PathCommand[] = [];
  let lastPoint: Point = { x: 0, y: 0 };

  path.commands.forEach((cmd) => {
    currentCommands.push(cmd);

    switch (cmd.type) {
      case 'M': // MoveTo - start new contour
        if (currentPoints.length > 0) {
          contours.push({
            points: currentPoints,
            commands: currentCommands.slice(0, -1),
          });
        }
        currentPoints = [{ x: cmd.x, y: cmd.y }];
        currentCommands = [cmd];
        lastPoint = { x: cmd.x, y: cmd.y };
        break;

      case 'L': // LineTo
        currentPoints.push({ x: cmd.x, y: cmd.y });
        lastPoint = { x: cmd.x, y: cmd.y };
        break;

      case 'Q': // Quadratic bezier
        // Flatten curve into line segments for containment testing
        const qPoints = flattenQuadraticCurve(cmd);
        currentPoints.push(...qPoints);
        lastPoint = { x: cmd.x, y: cmd.y };
        break;

      case 'C': // Cubic bezier
        // Flatten curve into line segments for containment testing
        const cPoints = flattenCubicCurve(cmd);
        currentPoints.push(...cPoints);
        lastPoint = { x: cmd.x, y: cmd.y };
        break;

      case 'Z': // Close path
        // Don't add anything, contour will be closed by next M or end
        break;

      default:
        console.warn(`Unknown path command type: ${cmd.type}`);
    }
  });

  // Add last contour if exists
  if (currentPoints.length > 0) {
    contours.push({
      points: currentPoints,
      commands: currentCommands,
    });
  }

  return contours;
}

// ============================================================================
// CONTOUR CLASSIFICATION
// ============================================================================

/**
 * Calculate the containment depth of a contour
 *
 * Depth = number of other contours that contain this contour
 * - Depth 0 = outermost contour (not contained by any other)
 * - Depth 1 = counter/hole (contained by one outer contour)
 * - Depth 2+ = nested counters (rare in typical fonts)
 *
 * @param contour - The contour to test
 * @param allContours - All contours to test against
 * @returns Containment depth
 */
function calculateContourDepth(contour: Contour, allContours: Contour[]): number {
  let depth = 0;

  // Use first point of contour as test point
  const testPoint = contour.points[0];

  // Count how many contours contain this point
  allContours.forEach((otherContour) => {
    if (otherContour !== contour && isPointInContour(testPoint, otherContour)) {
      depth++;
    }
  });

  return depth;
}

/**
 * Classify contours as outer shapes vs counters (holes)
 *
 * Algorithm:
 * 1. Calculate depth for each contour
 * 2. Even depth (0, 2, 4...) = outer contour
 * 3. Odd depth (1, 3, 5...) = counter/hole
 *
 * @param contours - Array of contours to classify
 * @returns Object with outer and counter contours separated
 */
function classifyContours(contours: Contour[]): {
  outer: Contour[];
  counters: Contour[];
} {
  const outer: Contour[] = [];
  const counters: Contour[] = [];

  contours.forEach((contour) => {
    const depth = calculateContourDepth(contour, contours);

    if (depth % 2 === 0) {
      outer.push(contour);
    } else {
      counters.push(contour);
    }
  });

  return { outer, counters };
}

// ============================================================================
// SVG PATH GENERATION
// ============================================================================

/**
 * Convert contour commands to SVG path data string
 *
 * @param contour - Contour with path commands
 * @returns SVG path data string
 */
function contourToPathData(contour: Contour): string {
  return contour.commands
    .map((cmd) => {
      switch (cmd.type) {
        case 'M':
          return `M ${cmd.x} ${cmd.y}`;
        case 'L':
          return `L ${cmd.x} ${cmd.y}`;
        case 'Q':
          return `Q ${(cmd as any).x1} ${(cmd as any).y1} ${cmd.x} ${cmd.y}`;
        case 'C':
          return `C ${(cmd as any).x1} ${(cmd as any).y1} ${(cmd as any).x2} ${
            (cmd as any).y2
          } ${cmd.x} ${cmd.y}`;
        case 'Z':
          return 'Z';
        default:
          return '';
      }
    })
    .join(' ');
}

/**
 * Calculate bounding box for multiple contours
 *
 * @param contours - Array of contours
 * @returns Bounding box coordinates
 */
function calculateBounds(contours: Contour[]): BoundingBox {
  let x1 = Infinity;
  let y1 = Infinity;
  let x2 = -Infinity;
  let y2 = -Infinity;

  contours.forEach((contour) => {
    contour.points.forEach((point) => {
      x1 = Math.min(x1, point.x);
      y1 = Math.min(y1, point.y);
      x2 = Math.max(x2, point.x);
      y2 = Math.max(y2, point.y);
    });
  });

  // Add padding (5% on each side)
  const padding = Math.max(x2 - x1, y2 - y1) * 0.05;
  x1 -= padding;
  y1 -= padding;
  x2 += padding;
  y2 += padding;

  return {
    x1,
    y1,
    x2,
    y2,
    width: x2 - x1,
    height: y2 - y1,
  };
}

// ============================================================================
// MAIN COMPOSABLE
// ============================================================================

// Result cache: key = `${text}:${fontSize}`
const resultCache = new Map<string, ParsedTextResult>();

/**
 * Counter Typography Composable
 *
 * Provides reactive font parsing and counter detection for typography effects
 *
 * @param options - Configuration options
 * @returns Composable interface with parseText function and state refs
 *
 * @example
 * ```typescript
 * const { parseText, isLoading, error } = useCounterTypography();
 *
 * const result = await parseText('Jacques', 48);
 * // result.counterPaths = SVG path data for counter fills
 * // result.foregroundPath = SVG path data for letter bodies
 * ```
 */
export function useCounterTypography(options: CounterTypographyOptions = {}) {
  const {
    fontPath = 'assets/type/epilogue/epilogue-regular.ttf',
    cacheResults = true,
  } = options;

  const isLoading: Ref<boolean> = ref(false);
  const error: Ref<Error | null> = ref(null);

  /**
   * Generate cache key for result caching
   */
  function getCacheKey(text: string, fontSize: number): string {
    return `${text}:${Math.round(fontSize)}`;
  }

  /**
   * Parse text into counter and foreground paths
   *
   * @param text - Text string to parse (e.g., "Jacques")
   * @param fontSize - Font size in pixels
   * @returns Parsed text result with SVG path data, or null on error
   */
  async function parseText(
    text: string,
    fontSize: number
  ): Promise<ParsedTextResult | null> {
    // Check cache first
    const cacheKey = getCacheKey(text, fontSize);
    if (cacheResults && resultCache.has(cacheKey)) {
      return resultCache.get(cacheKey)!;
    }

    isLoading.value = true;
    error.value = null;

    try {
      // Load font
      const font = await loadFont(fontPath);

      // Convert text to glyphs (handles ligatures and substitutions)
      const glyphs = font.stringToGlyphs(text);

      // Process each glyph and collect contours
      const allCounterContours: Contour[] = [];
      const allOuterContours: Contour[] = [];

      let xOffset = 0;

      glyphs.forEach((glyph) => {
        // Get path for this glyph at current position
        const path = glyph.getPath(xOffset, 0, fontSize);

        // Extract contours from path
        const contours = extractContours(path);

        // Classify into outer vs counter contours
        const { outer, counters } = classifyContours(contours);

        allOuterContours.push(...outer);
        allCounterContours.push(...counters);

        // Advance x position for next glyph
        xOffset += glyph.advanceWidth * (fontSize / font.unitsPerEm);
      });

      // Generate SVG path data
      const counterPaths = allCounterContours.map(contourToPathData);

      // Combine all outer contours into single path for foreground
      const foregroundPath = allOuterContours.map(contourToPathData).join(' ');

      // Calculate bounding box for viewBox
      const bounds = calculateBounds([...allOuterContours, ...allCounterContours]);

      // Generate viewBox string
      const viewBox = `${bounds.x1} ${bounds.y1} ${bounds.width} ${bounds.height}`;

      const result: ParsedTextResult = {
        counterPaths,
        foregroundPath,
        viewBox,
        bounds,
      };

      // Cache result
      if (cacheResults) {
        resultCache.set(cacheKey, result);
      }

      return result;
    } catch (err) {
      error.value = err as Error;
      console.error('Error parsing text:', err);
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Clear the result cache
   */
  function clearCache(): void {
    resultCache.clear();
  }

  return {
    parseText,
    isLoading,
    error,
    clearCache,
  };
}
