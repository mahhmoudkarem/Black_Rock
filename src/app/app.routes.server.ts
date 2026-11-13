import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // صفحات القسمين ثابتة فبتتعمل prerender (لازم قبل راوت :slug)
  { path: 'products/marble', renderMode: RenderMode.Prerender },
  { path: 'products/granite', renderMode: RenderMode.Prerender },
  {
    // راوت فيه باراميتر (slug) - بيتعمل render على السيرفر وقت الطلب
    path: 'products/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
