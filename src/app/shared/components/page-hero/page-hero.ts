import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService, LocalizedText } from '../../../core/services/LanguageService/language-service';

export interface Crumb {
  label: LocalizedText;
  link?: string;
}

/** بانر أعلى الصفحات الداخلية (المنتجات / المشاريع / تفاصيل المنتج) مع breadcrumb */
@Component({
  imports: [RouterLink],
  selector: 'app-page-hero',
  styleUrl: './page-hero.css',
  templateUrl: './page-hero.html',
})
export class PageHero {
  readonly eyebrow = input.required<LocalizedText>();
  readonly title = input.required<LocalizedText>();
  readonly subtitle = input<LocalizedText | null>(null);
  readonly image = input('/images/about/marble-banner.jpg');
  readonly crumbs = input<Crumb[]>([]);

  protected readonly lang = inject(LanguageService);
}
