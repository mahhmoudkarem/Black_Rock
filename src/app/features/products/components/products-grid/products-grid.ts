import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { LanguageService } from '../../../../core/services/LanguageService/language-service';
import { WhatsappService } from '../../../../core/services/WhatsappService/whatsapp-service';
import { Product } from '../../../../core/models/Product';
import { Reveal } from '../../../../shared/directives/reveal';

@Component({
  imports: [RouterLink, FontAwesomeModule, Reveal],
  selector: 'app-products-grid',
  styleUrl: './products-grid.css',
  templateUrl: './products-grid.html',
})
export class ProductsGrid {
  readonly products = input.required<Product[]>();
  /** كارت أخير: "لم تجد النوع المطلوب؟" */
  readonly helpTile = input(false);

  protected readonly lang = inject(LanguageService);
  private readonly whatsapp = inject(WhatsappService);

  protected readonly faArrowRight = faArrowRight;
  protected readonly faPlay = faPlay;
  protected readonly faWhatsapp = faWhatsapp;

  protected askGeneral(): void {
    this.whatsapp.inquireGeneral();
  }

  protected inquire(p: Product): void {
    this.whatsapp.inquireAboutProduct(this.lang.l(p.name));
  }
}
