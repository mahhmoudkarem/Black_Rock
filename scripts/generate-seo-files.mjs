/**
 * بيعمل public/sitemap.xml و public/robots.txt تلقائيًا قبل كل build.
 * الدومين بياخده من siteUrl في src/app/core/config/site-config.ts
 * والمنتجات من src/app/core/data/products.data.ts (أي نوع جديد بيدخل الـ sitemap لوحده).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const config = readFileSync(join(root, 'src/app/core/config/site-config.ts'), 'utf8');
const products = readFileSync(join(root, 'src/app/core/data/products.data.ts'), 'utf8');

const siteUrl = config.match(/siteUrl:\s*'([^']+)'/)?.[1]?.replace(/\/$/, '');
if (!siteUrl) throw new Error('siteUrl not found in site-config.ts');

const slugs = [...products.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const today = new Date().toISOString().slice(0, 10);

const pages = [
  { path: '/', priority: '1.0' },
  { path: '/products/marble', priority: '0.9' },
  { path: '/products/granite', priority: '0.9' },
  { path: '/about', priority: '0.7' },
  { path: '/projects', priority: '0.7' },
  { path: '/contact', priority: '0.8' },
  ...slugs.map((s) => ({ path: `/products/${s}`, priority: '0.8' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${siteUrl}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(join(root, 'public/sitemap.xml'), xml);
writeFileSync(join(root, 'public/robots.txt'), robots);
console.log(`sitemap.xml: ${pages.length} URLs on ${siteUrl}`);
