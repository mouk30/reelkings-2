import fs from 'node:fs';
import path from 'node:path';
import type { Request, Response } from 'express';

export interface RouteEntry {
  path: string;
  type: string;
  slug?: string;
  title: string;
  description: string;
  image: string;
  imageTitle?: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export interface SeoManifest {
  defaultCanonicalOrigin: string;
  siteName: string;
  brandName: string;
  defaultImage: string;
  notFound: {
    title: string;
    description: string;
    robots: string;
  };
  routes: RouteEntry[];
}

export function loadSeoManifest(rootDir: string): SeoManifest {
  const manifestPath = path.resolve(rootDir, 'src/data/seoManifest.json');
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) as SeoManifest;
}

export function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function escapeHtmlAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const cleaned = pathname.replace(/\/+$/, '');
  return cleaned || '/';
}

const VALID_HOST_RE = /^[a-z0-9.-]+(?::\d{1,5})?$/i;

function extractHostname(hostWithPort: string): string {
  return hostWithPort.split(':')[0].toLowerCase();
}

function isAllowedHostname(hostname: string, manifest: SeoManifest): boolean {
  const canonicalHostname = new URL(manifest.defaultCanonicalOrigin).hostname.toLowerCase();
  if (hostname === canonicalHostname || hostname === `www.${canonicalHostname}`) {
    return true;
  }
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return true;
  }
  if (hostname.endsWith('.run.app') || hostname.endsWith('.pages.dev')) {
    return true;
  }

  const envUrls = [process.env.SITE_URL, process.env.PUBLIC_SITE_URL, process.env.APP_URL];
  for (const rawUrl of envUrls) {
    if (!rawUrl) continue;
    try {
      const parsed = new URL(rawUrl);
      if (parsed.hostname.toLowerCase() === hostname) {
        return true;
      }
    } catch {
      // ignore invalid env URL
    }
  }

  const extraHosts = (process.env.ALLOWED_HOSTS || '')
    .split(',')
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  return extraHosts.includes(hostname);
}

export function resolveConfiguredOrigin(manifest: SeoManifest): string {
  const candidates = [process.env.SITE_URL, process.env.PUBLIC_SITE_URL];
  for (const raw of candidates) {
    if (!raw || raw.startsWith('MY_')) continue;
    try {
      const parsed = new URL(raw);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return parsed.origin.replace(/\/+$/, '');
      }
    } catch {
      // fallback
    }
  }
  return manifest.defaultCanonicalOrigin.replace(/\/+$/, '');
}

export function resolveSafeBaseUrl(req: Request, manifest: SeoManifest): string {
  const configuredOrigin = resolveConfiguredOrigin(manifest);
  const canonicalHostname = new URL(manifest.defaultCanonicalOrigin).hostname.toLowerCase();

  // If SITE_URL is explicitly configured and not a placeholder, prefer it for production consistency
  // unless request is coming from a verified platform preview host
  const rawForwardedHost = req.headers['x-forwarded-host'];
  const firstForwardedHost = Array.isArray(rawForwardedHost)
    ? rawForwardedHost[0]
    : typeof rawForwardedHost === 'string'
      ? rawForwardedHost.split(',')[0]
      : '';
  const rawHost = (firstForwardedHost || req.headers.host || '').trim();

  if (rawHost && VALID_HOST_RE.test(rawHost)) {
    const hostname = extractHostname(rawHost);
    if (isAllowedHostname(hostname, manifest)) {
      const normalizedHost = hostname === `www.${canonicalHostname}`
        ? rawHost.replace(/^www\./i, '')
        : rawHost;

      const rawProto = req.headers['x-forwarded-proto'];
      const firstProto = Array.isArray(rawProto)
        ? rawProto[0]
        : typeof rawProto === 'string'
          ? rawProto.split(',')[0].trim().toLowerCase()
          : '';
      const proto = firstProto === 'http' || firstProto === 'https'
        ? firstProto
        : hostname === 'localhost' || hostname === '127.0.0.1'
          ? 'http'
          : 'https';

      // Canonicalize production custom domain to https://reelkings.kr
      if (hostname === canonicalHostname || hostname === `www.${canonicalHostname}`) {
        return `https://${canonicalHostname}`;
      }
      return `${proto}://${normalizedHost}`;
    }
  }

  return configuredOrigin;
}

export function buildSitemapXml(baseUrl: string, manifest: SeoManifest, rootDir: string): string {
  const origin = baseUrl.replace(/\/+$/, '');
  const seenUrls = new Set<string>();
  const seenImages = new Set<string>();

  const urlNodes: string[] = [];

  for (const route of manifest.routes) {
    const loc = route.path === '/' ? `${origin}/` : `${origin}${route.path}`;
    if (seenUrls.has(loc)) continue;
    seenUrls.add(loc);

    let imageBlock = '';
    if (route.image) {
      const publicRelPath = route.image.replace(/^\/+/, '');
      const localImageExists = fs.existsSync(path.resolve(rootDir, 'public', publicRelPath));
      const imageLoc = `${origin}${route.image}`;
      if (localImageExists && !seenImages.has(imageLoc)) {
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

export function buildRobotsTxt(baseUrl: string): string {
  const origin = baseUrl.replace(/\/+$/, '');
  return `User-agent: *
Allow: /
Disallow: /assets/aistudio/

Sitemap: ${origin}/sitemap.xml
`;
}

export function injectRouteHeadMetadata(
  html: string,
  pathname: string,
  baseUrl: string,
  manifest: SeoManifest
): { html: string; status: number } {
  const origin = baseUrl.replace(/\/+$/, '');
  const normalized = normalizePathname(pathname);
  const route = manifest.routes.find((r) => r.path === normalized) || null;
  const isNotFound = !route;

  const title = escapeHtmlAttr(route ? route.title : manifest.notFound.title);
  const description = escapeHtmlAttr(route ? route.description : manifest.notFound.description);
  const robots = isNotFound
    ? manifest.notFound.robots
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
  const googlebot = isNotFound
    ? 'noindex, nofollow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  const canonicalUrl = escapeHtmlAttr(
    isNotFound ? `${origin}/` : normalized === '/' ? `${origin}/` : `${origin}${normalized}`
  );
  const imagePath = route?.image || manifest.defaultImage;
  const imageUrl = escapeHtmlAttr(`${origin}${imagePath}`);
  const imageAlt = escapeHtmlAttr(route?.imageTitle || title);

  let output = html;
  output = output.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  output = output.replace(
    /<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="title" content="${title}" />`
  );
  output = output.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${description}" />`
  );
  output = output.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${robots}" />`
  );
  output = output.replace(
    /<meta\s+name="googlebot"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="googlebot" content="${googlebot}" />`
  );
  output = output.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  output = output.replace(
    /<link\s+rel="alternate"\s+hreflang="ko-KR"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="ko-KR" href="${canonicalUrl}" />`
  );
  output = output.replace(
    /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`
  );
  output = output.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${title}" />`
  );
  output = output.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${description}" />`
  );
  output = output.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  output = output.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${imageUrl}" />`
  );
  output = output.replace(
    /<meta\s+property="og:image:secure_url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:secure_url" content="${imageUrl}" />`
  );
  output = output.replace(
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:alt" content="${imageAlt}" />`
  );
  output = output.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${title}" />`
  );
  output = output.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${description}" />`
  );
  output = output.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${imageUrl}" />`
  );
  output = output.replace(
    /<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image:alt" content="${imageAlt}" />`
  );

  // Also replace static canonical origin in JSON-LD when running on an alternate validated domain
  const defaultOrigin = manifest.defaultCanonicalOrigin.replace(/\/+$/, '');
  if (origin !== defaultOrigin) {
    output = output.split(defaultOrigin).join(origin);
  }

  return { html: output, status: isNotFound ? 404 : 200 };
}

export function sendSitemapResponse(req: Request, res: Response, manifest: SeoManifest, rootDir: string): void {
  const baseUrl = resolveSafeBaseUrl(req, manifest);
  const xml = buildSitemapXml(baseUrl, manifest, rootDir);
  res.status(200);
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.send(xml);
}

export function sendRobotsResponse(req: Request, res: Response, manifest: SeoManifest): void {
  const baseUrl = resolveSafeBaseUrl(req, manifest);
  const robotsTxt = buildRobotsTxt(baseUrl);
  res.status(200);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.send(robotsTxt);
}
