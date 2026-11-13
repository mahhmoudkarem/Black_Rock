import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { LanguageService, LocalizedText } from '../../../../core/services/LanguageService/language-service';
import { PRODUCTS } from '../../../../core/data/products.data';

interface GalleryItem {
  src: string;
  name: LocalizedText;
}

/** صور بتتشال من الكاروسيل المتحرك (بتفضل موجودة في صفحة المنتج نفسه) */
const EXCLUDED = ['/images/stones/galala-white/2.jpg'];

/** صور بتتثبت في أول الكاروسيل المتحرك */
const PINNED = ['/images/stones/sinai-pearl/1.jpg'];

/** كاروسيل بيتحرك لوحده: صفّين من صور الأحجار بيمشوا في اتجاهين عكس بعض */
@Component({
  imports: [RouterLink, FontAwesomeModule],
  selector: 'app-stone-gallery',
  styleUrl: './stone-gallery.css',
  templateUrl: './stone-gallery.html',
})
export class StoneGallery {
  protected readonly lang = inject(LanguageService);
  protected readonly faArrowRight = faArrowRight;

  protected readonly loop = [0, 1];

  protected readonly rowA: GalleryItem[];
  protected readonly rowB: GalleryItem[];

  constructor() {
    const all: GalleryItem[] = PRODUCTS.flatMap((p) =>
      p.images.filter((src) => !EXCLUDED.includes(src)).map((src) => ({ src, name: p.name })),
    );
    // الصور المثبتة تتحط في الأول (بالترتيب)
    all.sort((a, b) => Number(PINNED.indexOf(b.src) >= 0) - Number(PINNED.indexOf(a.src) >= 0));
    // بنوزّع الصور على الصفين بالتبادل عشان الأنواع تتنوع في كل صف
    this.rowA = all.filter((_, i) => i % 2 === 0);
    this.rowB = all.filter((_, i) => i % 2 === 1).reverse();
  }
}
