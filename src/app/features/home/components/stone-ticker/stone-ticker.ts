import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../../core/services/LanguageService/language-service';
import { PRODUCTS } from '../../../../core/data/products.data';

/** شريط أسماء الأحجار المتحرك تحت الهيرو */
@Component({
  selector: 'app-stone-ticker',
  styleUrl: './stone-ticker.css',
  templateUrl: './stone-ticker.html',
})
export class StoneTicker {
  protected readonly lang = inject(LanguageService);

  private readonly words = [
    ...PRODUCTS.map((p) => p.name),
    { en: 'Natural Marble', ar: 'رخام طبيعي' },
    { en: 'Premium Granite', ar: 'جرانيت فاخر' },
  ];

  // بنكرر القائمة مرتين عشان الحركة تبقى متصلة بدون فراغ
  protected readonly loop = [0, 1];
  protected readonly items = this.words;
}
