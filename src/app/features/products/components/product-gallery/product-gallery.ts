import { Component, computed, inject, input, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../../../core/services/LanguageService/language-service';
import { Product } from '../../../../core/models/Product';

interface Media {
  type: 'image' | 'video';
  src: string;
  poster?: string;
}

/** معرض صور وفيديو المنتج: صورة كبيرة + صور مصغرة + أسهم */
@Component({
  imports: [FontAwesomeModule],
  selector: 'app-product-gallery',
  styleUrl: './product-gallery.css',
  templateUrl: './product-gallery.html',
})
export class ProductGallery {
  readonly product = input.required<Product>();

  protected readonly lang = inject(LanguageService);
  protected readonly faPrev = faChevronLeft;
  protected readonly faNext = faChevronRight;
  protected readonly faPlay = faPlay;

  protected readonly index = signal(0);

  protected readonly media = computed<Media[]>(() => {
    const p = this.product();
    const items: Media[] = p.images.map((src) => ({ type: 'image', src }));
    if (p.video) items.push({ type: 'video', src: p.video, poster: p.videoPoster });
    return items;
  });

  protected readonly active = computed(() => this.media()[Math.min(this.index(), this.media().length - 1)]);

  protected next(): void {
    this.index.update((i) => (i + 1) % this.media().length);
  }

  protected prev(): void {
    this.index.update((i) => (i - 1 + this.media().length) % this.media().length);
  }
}
