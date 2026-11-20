import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { SITE_CONFIG } from '../../config/site-config';
import { LanguageService, LocalizedText } from '../LanguageService/language-service';

export interface PageSeo {
  title: LocalizedText;
  description: LocalizedText;
  /** مسار الصفحة بدون الدومين، مثال: /products/marble */
  path?: string;
  /** صورة المشاركة (مسار نسبي أو لينك كامل) */
  image?: string;
}

const DEFAULT_SEO: PageSeo = {
  title: { en: 'Black Rock | Marble & Granite', ar: 'بلاك روك | الرخام والجرانيت' },
  description: {
    en: 'Black Rock supplies premium Egyptian natural marble and granite slabs for flooring, wall cladding, stairs, countertops and facades.',
    ar: 'بلاك روك لتوريد الرخام والجرانيت الطبيعي المصري الفاخر للأرضيات والحوائط والسلالم وأسطح المطابخ والواجهات.',
  },
  image: '/images/logo/logo.jpg',
};

/**
 * مسؤول عن الـ title والـ meta tags والـ canonical والـ JSON-LD لكل صفحة.
 * - الصفحات الثابتة: بتاخد الـ SEO من `data.seo` في app.routes.ts تلقائيًا.
 * - صفحة تفاصيل المنتج: بتنادي `seo.set(...)` بنفسها.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly lang = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly current = signal<PageSeo>(DEFAULT_SEO);

  constructor() {
    // لما الصفحة تتغير: لو الراوت عليه data.seo نطبّقه
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      let r = this.route.snapshot;
      while (r.firstChild) r = r.firstChild;
      const seo = r.data['seo'] as PageSeo | undefined;
      if (seo) {
        const path = (e as NavigationEnd).urlAfterRedirects.split(/[?#]/)[0];
        this.set({ ...seo, path: seo.path ?? path });
      }
    });

    // نطبّق على الـ <head> كل ما الصفحة أو اللغة تتغير
    effect(() => this.apply(this.current(), this.lang.lang()));

    this.addOrganizationSchema();
  }

  set(seo: PageSeo): void {
    this.current.set({ ...DEFAULT_SEO, ...seo });
  }

  private abs(path: string): string {
    if (/^https?:\/\//.test(path)) return path;
    return SITE_CONFIG.siteUrl + (path.startsWith('/') ? path : '/' + path);
  }

  private apply(seo: PageSeo, lang: 'en' | 'ar'): void {
    const title = seo.title[lang];
    const description = seo.description[lang];
    const url = this.abs(seo.path ?? '/');
    const image = this.abs(seo.image ?? DEFAULT_SEO.image!);

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });

    // Open Graph (فيسبوك / واتساب / لينكدإن)
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Black Rock' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:locale', content: lang === 'ar' ? 'ar_EG' : 'en_US' });

    // Twitter / X
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /** بيانات الشركة لجوجل (Structured Data) */
  private addOrganizationSchema(): void {
    const head = this.document.head;
    if (head.querySelector('script[data-schema="org"]')) return;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Black Rock',
      alternateName: 'بلاك روك',
      url: SITE_CONFIG.siteUrl,
      logo: this.abs('/favicon-512.png'),
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.phone,
      address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
      sameAs: [SITE_CONFIG.instagram, SITE_CONFIG.facebook, SITE_CONFIG.linkedin],
    };

    const script = this.document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-schema', 'org');
    script.textContent = JSON.stringify(schema);
    head.appendChild(script);
  }
}
