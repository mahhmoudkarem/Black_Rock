import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { LanguageService } from '../../../core/services/LanguageService/language-service';
import { WhatsappService } from '../../../core/services/WhatsappService/whatsapp-service';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-whatsapp-button',
  styleUrl: './whatsapp-button.css',
  templateUrl: './whatsapp-button.html',
})
export class WhatsappButton {
  private readonly whatsapp = inject(WhatsappService);
  protected readonly lang = inject(LanguageService);

  protected readonly faWhatsapp = faWhatsapp;

  open(): void {
    this.whatsapp.inquireGeneral();
  }
}
