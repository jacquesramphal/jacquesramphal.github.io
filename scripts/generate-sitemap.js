/**
 * Automated Sitemap Generator
 * Generates sitemap.xml from routes and content data
 */

const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const fs = require('fs');
const path = require('path');

// Base URL for the site
const BASE_URL = 'https://jacquesramphal.github.io';

// Read library.json to get dynamic routes
const libraryPath = path.join(__dirname, '../src/assets/data/library.json');
const library = JSON.parse(fs.readFileSync(libraryPath, 'utf-8'));

// Static routes
const staticRoutes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/library', changefreq: 'weekly', priority: 0.8 },
  { url: '/writing', changefreq: 'weekly', priority: 0.8 },
  { url: '/work', changefreq: 'monthly', priority: 0.9 },
  { url: '/play', changefreq: 'monthly', priority: 0.7 },
  { url: '/resume', changefreq: 'monthly', priority: 0.7 },
  { url: '/info', changefreq: 'monthly', priority: 0.6 },
  { url: '/links', changefreq: 'monthly', priority: 0.5 },
];

// Generate dynamic routes from library entries
const dynamicRoutes = [];

// Process library entries
if (library.entries && Array.isArray(library.entries)) {
  library.entries.forEach((entry) => {
    // Add doc routes for articles with slug
    if (entry.slug) {
      dynamicRoutes.push({
        url: `/doc/${entry.slug}`,
        changefreq: 'monthly',
        priority: 0.9,
      });
    }
    // Add doc routes by ID as fallback
    if (entry.docId) {
      dynamicRoutes.push({
        url: `/doc/${entry.docId}`,
        changefreq: 'monthly',
        priority: 0.8,
      });
    }
    // Add work routes if they have route property
    if (entry.route && entry.route.startsWith('/work/')) {
      dynamicRoutes.push({
        url: entry.route,
        changefreq: 'monthly',
        priority: 0.9,
      });
    }
  });
}

// Combine all routes
const allRoutes = [...staticRoutes, ...dynamicRoutes];

// Remove duplicates
const uniqueRoutes = Array.from(
  new Map(allRoutes.map(item => [item.url, item])).values()
);

// Generate sitemap
async function generateSitemap() {
  try {
    const stream = new SitemapStream({ hostname: BASE_URL });

    const links = uniqueRoutes.map(route => ({
      url: route.url,
      changefreq: route.changefreq || 'monthly',
      priority: route.priority || 0.5,
      lastmod: new Date().toISOString().split('T')[0],
    }));

    const data = await streamToPromise(Readable.from(links).pipe(stream));
    const xml = data.toString();

    // Write to public directory
    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, xml);

    console.log('✅ Sitemap generated successfully!');
    console.log(`📄 Total URLs: ${uniqueRoutes.length}`);
    console.log(`📍 Location: ${outputPath}`);

    return xml;
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  generateSitemap()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { generateSitemap };
