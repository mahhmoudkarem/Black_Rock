import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faExpand,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { LanguageService } from '../../../../core/services/LanguageService/language-service';
import { WhatsappService } from '../../../../core/services/WhatsappService/whatsapp-service';
import { PRODUCTS } from '../../../../core/data/products.data';
import { Product } from '../../../../core/models/Product';
import { StoneLightbox } from '../stone-lightbox/stone-lightbox';

const GAP = 24;

/**
 * الكاروسيل اللي المستخدم بيحركه بنفسه:
 * أسهم + سحب بالماوس/اللمس + نقط + كيبورد.
 */
@Component({
  imports: [RouterLink, FontAwesomeModule, StoneLightbox],
  selector: 'app-featured-products',
  styleUrl: './featured-products.css',
  templateUrl: './featured-products.html',
})
export class FeaturedProducts {
  protected readonly lang = inject(LanguageService);
  private readonly whatsapp = inject(WhatsappService);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly faPrev = faChevronLeft;
  protected readonly faNext = faChevronRight;
  protected readonly faArrowRight = faArrowRight;
  protected readonly faExpand = faExpand;
  protected readonly faPlay = faPlay;
  protected readonly faWhatsapp = faWhatsapp;
  protected readonly gap = GAP;

  protected readonly products = PRODUCTS.filter((p) => p.featured);

  /** عدد الكروت الظاهرة حسب عرض الشاشة */
  protected readonly perView = signal(3);
  protected readonly index = signal(0);
  protected readonly dragX = signal(0);
  protected readonly dragging = signal(false);
  protected readonly selected = signal<Product | null>(null);

  protected readonly maxIndex = computed(() => Math.max(0, this.products.length - this.perView()));
  protected readonly dots = computed(() => Array.from({ length: this.maxIndex() + 1 }, (_, i) => i));

  /** في العربي الحركة بتتعكس */
  protected readonly sign = computed(() => (this.lang.isArabic() ? 1 : -1));

  private startX = 0;
  private moved = false;
  private pointerId: number | null = null;

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) this.onResize();
    });
  }

  @HostListener('window:resize')
  protected onResize(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const w = window.innerWidth;
    this.perView.set(w < 700 ? 1 : w < 1100 ? 2 : 3);
    this.index.update((i) => Math.min(i, this.maxIndex()));
  }

  protected next(): void {
    this.index.update((i) => (i >= this.maxIndex() ? 0 : i + 1));
  }

  protected prev(): void {
    this.index.update((i) => (i <= 0 ? this.maxIndex() : i - 1));
  }

  protected goTo(i: number): void {
    this.index.set(i);
  }

  /* ---------- Drag / swipe ---------- */
  protected onPointerDown(event: PointerEvent): void {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    this.startX = event.clientX;
    this.moved = false;
    this.pointerId = event.pointerId;
    this.dragging.set(true);
  }

  protected onPointerMove(event: PointerEvent): void {
    if (!this.dragging() || event.pointerId !== this.pointerId) return;
    const dx = event.clientX - this.startX;
    if (Math.abs(dx) > 6) {
      if (!this.moved) (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
      this.moved = true;
    }
    if (this.moved) this.dragX.set(dx);
  }

  protected onPointerUp(event: PointerEvent): void {
    if (!this.dragging() || event.pointerId !== this.pointerId) return;
    const dx = this.dragX();
    this.dragging.set(false);
    this.dragX.set(0);
    this.pointerId = null;
    if (this.moved && Math.abs(dx) > 55) {
      // السحب في اتجاه الحركة = السلايد التالي
      dx * this.sign() > 0 ? this.next() : this.prev();
    }
  }

  protected onKey(event: KeyboardEvent): void {
    const rtl = this.lang.isArabic();
    if (event.key === 'ArrowRight') rtl ? this.prev() : this.next();
    if (event.key === 'ArrowLeft') rtl ? this.next() : this.prev();
  }

  /* ---------- Actions ---------- */
  protected open(product: Product): void {
    // لو كان سحب مش كليك
    if (this.moved) {
      this.moved = false;
      return;
    }
    this.selected.set(product);
  }

  protected inquire(product: Product, event: Event): void {
    event.stopPropagation();
    this.whatsapp.inquireAboutProduct(this.lang.l(product.name));
  }

  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
