import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { LanguageService, LocalizedText } from '../../../core/services/LanguageService/language-service';

export interface SpotlightSlide {
  image: string;
  badge: LocalizedText;
  title: LocalizedText;
  text: LocalizedText;
  /** نقاط صغيرة تحت النص */
  meta?: LocalizedText[];
  /** رابط الزرار (اختياري) */
  link?: string | string[];
  linkLabel?: LocalizedText;
}

const SLIDE_MS = 6000;

/**
 * كاروسيل "سبوت لايت" قابل لإعادة الاستخدام (المنتجات والمشاريع):
 * بيتحرك لوحده، ويقف لما تعدّي الماوس، وفيه أسهم ونقط وسحب باللمس.
 */
@Component({
  imports: [RouterLink, FontAwesomeModule],
  selector: 'app-spotlight-carousel',
  styleUrl: './spotlight-carousel.css',
  templateUrl: './spotlight-carousel.html',
})
export class SpotlightCarousel {
  readonly slides = input.required<SpotlightSlide[]>();
  readonly autoplay = input(true);

  protected readonly lang = inject(LanguageService);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly faArrowRight = faArrowRight;
  protected readonly faPrev = faChevronLeft;
  protected readonly faNext = faChevronRight;

  protected readonly current = signal(0);
  protected readonly paused = signal(false);
  protected readonly slideMs = SLIDE_MS;

  private timer: ReturnType<typeof setInterval> | null = null;
  private touchStartX = 0;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId) || !this.autoplay()) return;
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;
      this.timer = setInterval(() => {
        if (!this.paused() && !document.hidden) this.next();
      }, SLIDE_MS);
    });
    inject(DestroyRef).onDestroy(() => {
      if (this.timer) clearInterval(this.timer);
    });
  }

  protected next(): void {
    const n = this.slides().length;
    this.current.update((i) => (i + 1) % n);
  }

  protected prev(): void {
    const n = this.slides().length;
    this.current.update((i) => (i - 1 + n) % n);
  }

  protected goTo(i: number): void {
    this.current.set(i);
  }

  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  protected onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.changedTouches[0].clientX;
  }

  protected onTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(dx) < 50) return;
    const forward = this.lang.isArabic() ? dx > 0 : dx < 0;
    forward ? this.next() : this.prev();
  }
}
