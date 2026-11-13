import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  HostListener,
  afterNextRender,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight, faXmark, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { LanguageService } from '../../../../core/services/LanguageService/language-service';
import { WhatsappService } from '../../../../core/services/WhatsappService/whatsapp-service';
import { Product } from '../../../../core/models/Product';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  poster?: string;
}

/** نافذة عرض كل صور وفيديو النوع (lightbox) */
@Component({
  imports: [FontAwesomeModule],
  selector: 'app-stone-lightbox',
  styleUrl: './stone-lightbox.css',
  templateUrl: './stone-lightbox.html',
})
export class StoneLightbox {
  readonly product = input.required<Product>();
  readonly closed = output<void>();

  protected readonly lang = inject(LanguageService);
  private readonly whatsapp = inject(WhatsappService);
  private readonly document = inject(DOCUMENT);

  protected readonly faPrev = faChevronLeft;
  protected readonly faNext = faChevronRight;
  protected readonly faClose = faXmark;
  protected readonly faPlay = faPlay;
  protected readonly faWhatsapp = faWhatsapp;

  protected readonly index = signal(0);

  protected readonly media = computed<MediaItem[]>(() => {
    const p = this.product();
    const items: MediaItem[] = p.images.map((src) => ({ type: 'image', src }));
    if (p.video) items.push({ type: 'video', src: p.video, poster: p.videoPoster });
    return items;
  });

  protected readonly active = computed(() => this.media()[this.index()]);

  constructor() {
    afterNextRender(() => {
      this.document.body.style.overflow = 'hidden';
    });
    inject(DestroyRef).onDestroy(() => {
      this.document.body.style.overflow = '';
    });
  }

  protected next(): void {
    this.index.update((i) => (i + 1) % this.media().length);
  }

  protected prev(): void {
    this.index.update((i) => (i - 1 + this.media().length) % this.media().length);
  }

  protected close(): void {
    this.closed.emit();
  }

  protected inquire(): void {
    this.whatsapp.inquireAboutProduct(this.lang.l(this.product().name));
  }

  @HostListener('document:keydown', ['$event'])
  protected onKey(event: KeyboardEvent): void {
    const rtl = this.lang.isArabic();
    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowRight':
        rtl ? this.prev() : this.next();
        break;
      case 'ArrowLeft':
        rtl ? this.next() : this.prev();
        break;
    }
  }
}
