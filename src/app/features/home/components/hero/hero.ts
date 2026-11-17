import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faChevronLeft, faChevronRight, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { LanguageService, LocalizedText } from '../../../../core/services/LanguageService/language-service';
import { WhatsappService } from '../../../../core/services/WhatsappService/whatsapp-service';
import { SITE_CONFIG } from '../../../../core/config/site-config';

interface HeroSlide {
  image: string;
  stone: LocalizedText;
  title: LocalizedText;
  text: LocalizedText;
}

/** مدة كل سلايد بالمللي ثانية (لازم تساوي مدة --slide-time في الـ CSS) */
const SLIDE_MS = 6500;

@Component({
  imports: [RouterLink, FontAwesomeModule],
  selector: 'app-hero',
  styleUrl: './hero.css',
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly lang = inject(LanguageService);
  private readonly whatsapp = inject(WhatsappService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly site = SITE_CONFIG;
  protected readonly faArrowRight = faArrowRight;
  protected readonly faPrev = faChevronLeft;
  protected readonly faNext = faChevronRight;
  protected readonly faPhone = faPhone;
  protected readonly faWhatsapp = faWhatsapp;
  protected readonly faInstagram = faInstagram;

  /** لتغيير صور الهيرو: بدّل المسارات هنا (الصور في public/images/hero) */
  protected readonly slides: HeroSlide[] = [
    {
      image: '/images/hero/nero.jpg',
      stone: { en: 'Nero Marquina', ar: 'نيرو ماركينا' },
      title: { en: 'Where Black Marble Becomes Art', ar: 'حين يتحول الرخام الأسود إلى فن' },
      text: {
        en: 'Deep black stone with dramatic white veins, made for statement walls and luxurious floors.',
        ar: 'حجر أسود عميق بعروق بيضاء درامية، مصنوع للحوائط المميزة والأرضيات الفاخرة.',
      },
    },
    {
      image: '/images/hero/gold.jpg',
      stone: { en: 'Black & Gold', ar: 'الأسود والذهبي' },
      title: { en: 'Golden Veins. Endless Character.', ar: 'عروق ذهبية. شخصية لا تُنسى.' },
      text: {
        en: 'Every slab carries a unique pattern of natural gold lines that no two pieces share.',
        ar: 'كل لوح يحمل نقشًا فريدًا من العروق الذهبية الطبيعية لا يتكرر في أي قطعة أخرى.',
      },
    },
    {
      image: '/images/hero/emperador-light.jpg',
      stone: { en: 'Emperador Light', ar: 'إمبرادور لايت' },
      title: { en: 'Warm Tones For Timeless Interiors', ar: 'درجات دافئة لتصاميم لا تفقد بريقها' },
      text: {
        en: 'Soft brown and beige veining that brings warmth and a calm luxury to every room.',
        ar: 'عروق بنية وبيج ناعمة تمنح كل غرفة دفئًا وفخامة هادئة.',
      },
    },
    {
      image: '/images/hero/slabs.jpg',
      stone: { en: 'Premium Slabs', ar: 'ألواح فاخرة' },
      title: { en: 'Premium Slabs, Ready For Your Project', ar: 'ألواح فاخرة جاهزة لمشروعك' },
      text: {
        en: 'Choose from a wide selection of marble slabs and let us help you find the perfect match.',
        ar: 'اختر من تشكيلة واسعة من ألواح الرخام ودعنا نساعدك في إيجاد الأنسب لك.',
      },
    },
  ];

  protected readonly current = signal(0);
  protected readonly paused = signal(false);

  private timer: ReturnType<typeof setInterval> | null = null;
  private touchStartX = 0;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      if (reduce) return;
      this.timer = setInterval(() => {
        if (!this.paused() && !document.hidden) this.next();
      }, SLIDE_MS);
    });
    this.destroyRef.onDestroy(() => {
      if (this.timer) clearInterval(this.timer);
    });
  }

  protected next(): void {
    this.current.update((i) => (i + 1) % this.slides.length);
  }

  protected prev(): void {
    this.current.update((i) => (i - 1 + this.slides.length) % this.slides.length);
  }

  protected goTo(index: number): void {
    this.current.set(index);
  }

  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  protected onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  protected onTouchEnd(event: TouchEvent): void {
    const dx = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(dx) < 50) return;
    // اتجاه السحب بيتعكس في العربي
    const forward = this.lang.isArabic() ? dx > 0 : dx < 0;
    forward ? this.next() : this.prev();
  }

  protected inquire(): void {
    this.whatsapp.inquireGeneral();
  }
}
