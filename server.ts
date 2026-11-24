import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import {
  loadSeoManifest,
  resolveSafeBaseUrl,
  injectRouteHeadMetadata,
  sendSitemapResponse,
  sendRobotsResponse
} from './server/seoServerUtils.ts';

function parseTrustProxy(raw: string | undefined): number | boolean | string {
  if (!raw) return 1;
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  const num = Number(raw);
  return Number.isInteger(num) && num >= 0 ? num : raw;
}

async function startServer() {
  const rootDir = process.cwd();
  const manifest = loadSeoManifest(rootDir);
  const app = express();
  const isProd = process.env.NODE_ENV === 'production';
  const port = Number(process.env.PORT || 3000);

  // Reverse proxy trust configuration (prevents unconditional Host/IP spoofing)
  app.set('trust proxy', parseTrustProxy(process.env.TRUST_PROXY));
  app.disable('x-powered-by');

  // Dynamic Sitemap endpoints (/sitemap.xml and /sitemap.xml/)
  app.get(['/sitemap.xml', '/sitemap.xml/'], (req, res) => {
    sendSitemapResponse(req, res, manifest, rootDir);
  });

  // Dynamic Robots.txt matching sitemap domain
  app.get('/robots.txt', (req, res) => {
    sendRobotsResponse(req, res, manifest);
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        const templatePath = path.resolve(rootDir, 'index.html');
        let template = fs.readFileSync(templatePath, 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);
        const baseUrl = resolveSafeBaseUrl(req, manifest);
        const { html, status } = injectRouteHeadMetadata(template, req.path, baseUrl, manifest);
        res.status(status).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });
  } else {
    const distDir = path.resolve(rootDir, 'dist');
    const templateHtml = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8');

    // Serve static assets from dist (disable index auto-serve so HTML routes go through SEO injector)
    app.use(express.static(distDir, { index: false }));

    app.get('*', (req, res) => {
      const baseUrl = resolveSafeBaseUrl(req, manifest);
      const { html, status } = injectRouteHeadMetadata(templateHtml, req.path, baseUrl, manifest);
      res.status(status).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
