import { Injectable, inject } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';
import { LanguageService } from '../LanguageService/language-service';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  private readonly language = inject(LanguageService);

  private readonly phoneNumber = SITE_CONFIG.whatsappNumber;

  sendMessage(message: string): void {
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  inquireAboutProduct(productName: string): void {
    const message = this.language.isArabic()
      ? `مرحبًا بلاك روك، أنا مهتم بـ ${productName}. من فضلكم أرسلوا لي مزيدًا من التفاصيل.`
      : `Hello Black Rock, I am interested in ${productName}. Please provide more details.`;

    this.sendMessage(message);
  }

  inquireAboutProject(projectName: string): void {
    const message = this.language.isArabic()
      ? `مرحبًا بلاك روك، أريد مناقشة مشروع مشابه لمشروع ${projectName}.`
      : `Hello Black Rock, I would like to discuss a project similar to ${projectName}.`;

    this.sendMessage(message);
  }

  inquireGeneral(): void {
    const message = this.language.isArabic()
      ? 'مرحبًا، أريد الاستفسار عن منتجات بلاك روك.'
      : 'Hello, I would like to inquire about Black Rock products.';

    this.sendMessage(message);
  }
}
