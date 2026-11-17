
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';

import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

import { LanguageService } from '../../../core/services/LanguageService/language-service';
import { SITE_CONFIG } from '../../../core/config/site-config';
import { PRODUCTS } from '../../../core/data/products.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {

  private readonly language = inject(LanguageService);

  readonly site = SITE_CONFIG;
  readonly instagramLink = SITE_CONFIG.instagram;
  readonly facebookLink = SITE_CONFIG.facebook;
  readonly linkedinLink = SITE_CONFIG.linkedin;
  readonly whatsappLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;

  get isArabic(): boolean {
    return this.language.isArabic();
  }

  readonly stones = PRODUCTS;

  protected readonly lang = this.language;

  currentYear = new Date().getFullYear();

  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faLocationDot = faLocationDot;
  faArrowUp = faArrowUp;

  faFacebook = faFacebookF;
  faLinkedin = faLinkedinIn;
  faInstagram = faInstagram;
  faWhatsapp = faWhatsapp;

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
