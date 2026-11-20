import { RenderMode, ServerRoute } from '@angular/ssr';
import { PRODUCTS } from './core/data/products.data';

/**
 * كل الصفحات بتتعمل Prerender وقت الـ build (HTML جاهز) -> مناسب لـ Vercel كموقع static
 * وجوجل بيشوف المحتوى كامل من غير ما يستنى JavaScript.
 */
export const serverRoutes: ServerRoute[] = [
  { path: 'products/marble', renderMode: RenderMode.Prerender },
  { path: 'products/granite', renderMode: RenderMode.Prerender },
  {
    // صفحة لكل نوع حجر (من products.data.ts)
    path: 'products/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return PRODUCTS.map((p) => ({ slug: p.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
