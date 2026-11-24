import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const publicDir = path.resolve(rootDir, 'public');
const distDir = path.resolve(rootDir, 'dist');
const manifestPath = path.resolve(rootDir, 'src/data/seoManifest.json');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

function resolveBuildOrigin() {
  const candidates = [process.env.SITE_URL, process.env.PUBLIC_SITE_URL];
  for (const raw of candidates) {
    if (!raw || raw.startsWith('MY_')) continue;
    try {
      const parsed = new URL(raw);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return parsed.origin.replace(/\/+$/, '');
      }
    } catch {
      // ignore invalid URL
    }
  }
  return manifest.defaultCanonicalOrigin.replace(/\/+$/, '');
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtmlAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildSitemapXml(origin) {
  const seenUrls = new Set();
  const seenImages = new Set();
  const urlNodes = [];

  for (const route of manifest.routes) {
    const loc = route.path === '/' ? `${origin}/` : `${origin}${route.path}`;
    if (seenUrls.has(loc)) continue;
    seenUrls.add(loc);

    let imageBlock = '';
    if (route.image) {
      const rel = route.image.replace(/^\/+/, '');
      const localExists = fs.existsSync(path.resolve(publicDir, rel));
      const imageLoc = `${origin}${route.image}`;
      if (localExists && !seenImages.has(imageLoc)) {
        seenImages.add(imageLoc);
        const imageTitle = route.imageTitle || route.title;
        imageBlock = `
    <image:image>
      <image:loc>${escapeXml(imageLoc)}</image:loc>
      <image:title>${escapeXml(imageTitle)}</image:title>
    </image:image>`;
      }
    }

    urlNodes.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(route.lastmod)}</lastmod>
    <changefreq>${escapeXml(route.changefreq)}</changefreq>
    <priority>${escapeXml(route.priority)}</priority>${imageBlock}
  </url>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlNodes.join('\n')}
</urlset>
`;
}

function buildRobotsTxt(origin) {
  return `User-agent: *
Allow: /
Disallow: /assets/aistudio/

Sitemap: ${origin}/sitemap.xml
`;
}

function injectMetadata(templateHtml, route, origin, isNotFound = false) {
  const title = escapeHtmlAttr(isNotFound ? manifest.notFound.title : route.title);
  const description = escapeHtmlAttr(isNotFound ? manifest.notFound.description : route.description);
  const robots = isNotFound
    ? manifest.notFound.robots
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
  const googlebot = isNotFound
    ? 'noindex, nofollow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
  const canonicalUrl = escapeHtmlAttr(
    isNotFound ? `${origin}/` : route.path === '/' ? `${origin}/` : `${origin}${route.path}`
  );
  const imagePath = (!isNotFound && route?.image) || manifest.defaultImage;
  const imageUrl = escapeHtmlAttr(`${origin}${imagePath}`);
  const imageAlt = escapeHtmlAttr((!isNotFound && route?.imageTitle) || title);

  let html = templateHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = html.replace(/<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i, `<meta name="title" content="${title}" />`);
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${description}" />`);
  html = html.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i, `<meta name="robots" content="${robots}" />`);
  html = html.replace(/<meta\s+name="googlebot"\s+content="[^"]*"\s*\/?>/i, `<meta name="googlebot" content="${googlebot}" />`);
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="ko-KR"\s+href="[^"]*"\s*\/?>/i, `<link rel="alternate" hreflang="ko-KR" href="${canonicalUrl}" />`);
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/i, `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${imageUrl}" />`);
  html = html.replace(/<meta\s+property="og:image:secure_url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image:secure_url" content="${imageUrl}" />`);
  html = html.replace(/<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image:alt" content="${imageAlt}" />`);
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${title}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${description}" />`);
  html = html.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${imageUrl}" />`);
  html = html.replace(/<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image:alt" content="${imageAlt}" />`);

  const defaultOrigin = manifest.defaultCanonicalOrigin.replace(/\/+$/, '');
  if (origin !== defaultOrigin) {
    html = html.split(defaultOrigin).join(origin);
  }

  return html;
}

const origin = resolveBuildOrigin();
const sitemapXml = buildSitemapXml(origin);
const robotsTxt = buildRobotsTxt(origin);

fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.resolve(publicDir, 'robots.txt'), robotsTxt, 'utf-8');

if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.resolve(distDir, 'robots.txt'), robotsTxt, 'utf-8');

  const distIndexPath = path.resolve(distDir, 'index.html');
  if (fs.existsSync(distIndexPath)) {
    const baseHtml = fs.readFileSync(distIndexPath, 'utf-8');

    for (const route of manifest.routes) {
      const rendered = injectMetadata(baseHtml, route, origin, false);
      if (route.path === '/') {
        fs.writeFileSync(distIndexPath, rendered, 'utf-8');
      } else {
        const subDir = path.resolve(distDir, route.path.replace(/^\/+/, ''));
        fs.mkdirSync(subDir, { recursive: true });
        fs.writeFileSync(path.resolve(subDir, 'index.html'), rendered, 'utf-8');
      }
    }

    const notFoundHtml = injectMetadata(baseHtml, null, origin, true);
    fs.writeFileSync(path.resolve(distDir, '404.html'), notFoundHtml, 'utf-8');
  }
}

console.log(`SEO static files generated for ${origin}: ${manifest.routes.length} routes + 404.html`);
