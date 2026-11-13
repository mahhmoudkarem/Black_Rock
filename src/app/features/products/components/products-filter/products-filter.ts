import { Component, computed, inject, input, model } from '@angular/core';
import { LanguageService, LocalizedText } from '../../../../core/services/LanguageService/language-service';
import { FinishKey, ToneKey } from '../../../../core/models/Product';

interface Option<T extends string> {
  key: T | 'all';
  label: LocalizedText;
  swatch?: string;
}

@Component({
  selector: 'app-products-filter',
  styleUrl: './products-filter.css',
  templateUrl: './products-filter.html',
})
export class ProductsFilter {
  /** القيم المختارة (two-way binding مع الصفحة) */
  readonly finish = model<FinishKey | 'all'>('all');
  readonly tone = model<ToneKey | 'all'>('all');
  readonly total = input(0);
  /** إظهار فلتر التشطيب */
  readonly showFinish = input(true);
  /** الألوان المتاحة في القسم (لو فاضية تظهر كلها) */
  readonly availableTones = input<ToneKey[]>([]);

  protected readonly lang = inject(LanguageService);

  protected readonly finishes: Option<FinishKey>[] = [
    { key: 'all', label: { en: 'All Finishes', ar: 'كل التشطيبات' } },
    { key: 'polished', label: { en: 'Polished', ar: 'لميع' } },
    { key: 'honed', label: { en: 'Honed', ar: 'هوند' } },
    { key: 'pecked', label: { en: 'Sparrow-Pecked', ar: 'سبارو بيكد' } },
  ];

  protected readonly tones: Option<ToneKey>[] = [
    { key: 'all', label: { en: 'All Colors', ar: 'كل الألوان' } },
    { key: 'white', label: { en: 'White', ar: 'أبيض' }, swatch: '#EDE8DA' },
    { key: 'beige', label: { en: 'Beige', ar: 'بيج' }, swatch: '#E0CBA0' },
    { key: 'gold', label: { en: 'Gold', ar: 'ذهبي' }, swatch: '#D6AE66' },
    { key: 'grey', label: { en: 'Grey', ar: 'رمادي' }, swatch: '#8A908E' },
    { key: 'brown', label: { en: 'Brown', ar: 'بني' }, swatch: '#6B4630' },
    { key: 'red', label: { en: 'Red & Pink', ar: 'أحمر ووردي' }, swatch: '#B5675A' },
    { key: 'black', label: { en: 'Black', ar: 'أسود' }, swatch: '#3A3D3E' },
  ];

  protected readonly visibleTones = computed(() => {
    const allowed = this.availableTones();
    return this.tones.filter((t) => t.key === 'all' || !allowed.length || allowed.includes(t.key as ToneKey));
  });

  protected reset(): void {
    this.finish.set('all');
    this.tone.set('all');
  }
}
