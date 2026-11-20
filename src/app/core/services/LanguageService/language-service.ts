import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

export type Lang = 'en' | 'ar';

export interface LocalizedText {
  en: string;
  ar: string;
}

const STORAGE_KEY = 'blackrock-lang';

/**
 * مصدر واحد للغة في كل الموقع.
 * أي كومبوننت يقرأ `lang.isArabic()` وهيتحدث تلقائيًا لما الزرار في الناف بار يتضغط.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly _lang = signal<Lang>('en');

  readonly lang = this._lang.asReadonly();
  readonly isArabic = computed(() => this._lang() === 'ar');
  readonly dir = computed(() => (this._lang() === 'ar' ? 'rtl' : 'ltr'));

  constructor() {
    // بنطبّق اللغة على <html> كل ما تتغير (العنوان والـ meta مسؤولية SeoService)
    effect(() => {
      const lang = this._lang();
      const root = this.document.documentElement;
      root.lang = lang;
      root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    });

    // استرجاع اللغة المحفوظة بعد الـ hydration عشان ما يحصلش mismatch مع السيرفر
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'ar' || saved === 'en') {
          this._lang.set(saved);
        }
      } catch {
        /* التخزين غير متاح - مش مشكلة */
      }
    });
  }

  /** اختصار للترجمة داخل التمبلت: lang.t('Hello', 'مرحبا') */
  t(en: string, ar: string): string {
    return this._lang() === 'ar' ? ar : en;
  }

  /** نفس الفكرة لكن لكائن {en, ar} */
  l(text: LocalizedText): string {
    return text[this._lang()];
  }

  set(lang: Lang): void {
    this._lang.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* ignore */
      }
    }
  }

  toggle(): void {
    this.set(this._lang() === 'ar' ? 'en' : 'ar');
  }
}
