import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faLinkedinIn, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { LanguageService } from '../../../core/services/LanguageService/language-service';
import { WhatsappService } from '../../../core/services/WhatsappService/whatsapp-service';
import { SITE_CONFIG } from '../../../core/config/site-config';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-cta-section',
  styleUrl: './cta-section.css',
  templateUrl: './cta-section.html',
})
export class CtaSection {
  protected readonly lang = inject(LanguageService);
  private readonly whatsapp = inject(WhatsappService);

  protected readonly site = SITE_CONFIG;
  protected readonly faPhone = faPhone;
  protected readonly faWhatsapp = faWhatsapp;
  protected readonly faInstagram = faInstagram;
  protected readonly faFacebook = faFacebookF;
  protected readonly faLinkedin = faLinkedinIn;

  protected inquire(): void {
    this.whatsapp.inquireGeneral();
  }
}
