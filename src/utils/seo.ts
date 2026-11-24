import seoManifest from '../data/seoManifest.json';

export interface RouteMetaEntry {
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

export const SEO_ROUTES: RouteMetaEntry[] = seoManifest.routes;
export const DEFAULT_CANONICAL_ORIGIN: string = seoManifest.defaultCanonicalOrigin;

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const cleaned = pathname.replace(/\/+$/, '');
  return cleaned || '/';
}

export function resolveRuntimeOrigin(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, '');
  }
  return DEFAULT_CANONICAL_ORIGIN;
}

export function findRouteMeta(pathname: string): RouteMetaEntry | null {
  const normalized = normalizePathname(pathname);
  return SEO_ROUTES.find((r) => r.path === normalized) ?? null;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>): void {
  let selector = `link[rel="${rel}"]`;
  if (extra?.hreflang) {
    selector = `link[rel="${rel}"][hreflang="${extra.hreflang}"]`;
  }
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (extra) {
      for (const [k, v] of Object.entries(extra)) {
        el.setAttribute(k, v);
      }
    }
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function applyRouteMetadata(pathname: string): void {
  if (typeof document === 'undefined') return;

  const origin = resolveRuntimeOrigin();
  const normalized = normalizePathname(pathname);
  const matched = findRouteMeta(normalized);

  const isNotFound = !matched;
  const title = matched ? matched.title : seoManifest.notFound.title;
  const description = matched ? matched.description : seoManifest.notFound.description;
  const robots = isNotFound
    ? seoManifest.notFound.robots
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
  const imagePath = matched?.image || seoManifest.defaultImage;
  const imageUrl = imagePath.startsWith('http') ? imagePath : `${origin}${imagePath}`;
  const canonicalUrl = isNotFound ? `${origin}/` : `${origin}${normalized === '/' ? '/' : normalized}`;

  document.title = title;

  upsertMeta('name', 'title', title);
  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', robots);
  upsertMeta('name', 'googlebot', isNotFound ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('property', 'og:image', imageUrl);
  upsertMeta('property', 'og:image:secure_url', imageUrl);
  upsertMeta('property', 'og:image:alt', matched?.imageTitle || title);

  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', imageUrl);
  upsertMeta('name', 'twitter:image:alt', matched?.imageTitle || title);

  upsertLink('canonical', canonicalUrl);
  upsertLink('alternate', canonicalUrl, { hreflang: 'ko-KR' });
  upsertLink('alternate', canonicalUrl, { hreflang: 'x-default' });
}

export function navigateTo(to: string): void {
  if (typeof window === 'undefined') return;
  const current = window.location.pathname + window.location.search + window.location.hash;
  if (current === to) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
  if (!to.includes('#')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
