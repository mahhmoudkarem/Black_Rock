import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { LanguageService } from '../../../../core/services/LanguageService/language-service';
import { WhatsappService } from '../../../../core/services/WhatsappService/whatsapp-service';
import { SITE_CONFIG } from '../../../../core/config/site-config';
import { PRODUCTS } from '../../../../core/data/products.data';
import { PageHero } from '../../../../shared/components/page-hero/page-hero';
import { CtaSection } from '../../../../shared/components/cta-section/cta-section';
import { Reveal } from '../../../../shared/directives/reveal';
import { ProductGallery } from '../../components/product-gallery/product-gallery';
import { ProductsGrid } from '../../components/products-grid/products-grid';

@Component({
  imports: [RouterLink, FontAwesomeModule, PageHero, ProductGallery, ProductsGrid, CtaSection, Reveal],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  protected readonly lang = inject(LanguageService);
  private readonly whatsapp = inject(WhatsappService);
  private readonly route = inject(ActivatedRoute);

  protected readonly site = SITE_CONFIG;
  protected readonly faArrowRight = faArrowRight;
  protected readonly faPhone = faPhone;
  protected readonly faWhatsapp = faWhatsapp;

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug'))), {
    initialValue: this.route.snapshot.paramMap.get('slug'),
  });

  protected readonly product = computed(() => PRODUCTS.find((p) => p.slug === this.slug()) ?? null);

  /** منتجات مشابهة: نفس التشطيب أو نفس اللون */
  protected readonly related = computed(() => {
    const p = this.product();
    if (!p) return [];
    return PRODUCTS.filter(
      (x) => x.id !== p.id && x.category === p.category && (x.finishKey === p.finishKey || x.tone === p.tone),
    ).slice(0, 3);
  });

  protected inquire(): void {
    const p = this.product();
    if (p) this.whatsapp.inquireAboutProduct(this.lang.l(p.name));
  }
}
