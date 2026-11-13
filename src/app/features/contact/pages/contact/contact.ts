
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faClock,
  faArrowRight,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

import { LanguageService } from '../../../../core/services/LanguageService/language-service';
import { WhatsappService } from '../../../../core/services/WhatsappService/whatsapp-service';
import { SITE_CONFIG } from '../../../../core/config/site-config';

type SubjectKey = 'marble' | 'granite' | 'project' | 'other';

const SUBJECT_LABELS: Record<SubjectKey, { en: string; ar: string }> = {
  marble: { en: 'Marble Inquiry', ar: 'استفسار عن الرخام' },
  granite: { en: 'Granite Inquiry', ar: 'استفسار عن الجرانيت' },
  project: { en: 'Project Inquiry', ar: 'استفسار عن مشروع' },
  other: { en: 'Other Inquiry', ar: 'استفسار آخر' },
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    FontAwesomeModule
  ],
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {

  private readonly language = inject(LanguageService);
  private readonly whatsapp = inject(WhatsappService);

  get isArabic(): boolean {
    return this.language.isArabic();
  }

  // بيانات التواصل بتتغير من ملف core/config/site-config.ts
  phoneNumber = SITE_CONFIG.phone;
  phoneDisplay = SITE_CONFIG.phoneDisplay;
  emailAddress = SITE_CONFIG.email;
  mapsUrl = SITE_CONFIG.mapsUrl;

  readonly socials = [
    { name: 'Facebook', icon: faFacebookF, url: SITE_CONFIG.facebook },
    { name: 'Instagram', icon: faInstagram, url: SITE_CONFIG.instagram },
    { name: 'LinkedIn', icon: faLinkedinIn, url: SITE_CONFIG.linkedin },
  ];

  readonly subjects = (Object.keys(SUBJECT_LABELS) as SubjectKey[]).map((key) => ({
    key,
    ...SUBJECT_LABELS[key],
  }));

  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faLocationDot = faLocationDot;
  faClock = faClock;
  faArrowRight = faArrowRight;
  faPaperPlane = faPaperPlane;
  faWhatsapp = faWhatsapp;

  formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };

  get contactInfo() {
    return [
      {
        icon: this.faPhone,
        title: this.isArabic ? 'رقم الهاتف' : 'Phone Number',
        value: this.phoneDisplay,
        link: `tel:${this.phoneNumber}`,
        ltr: true,
      },
      {
        icon: this.faEnvelope,
        title: this.isArabic ? 'البريد الإلكتروني' : 'Email Address',
        value: this.emailAddress,
        link: `mailto:${this.emailAddress}`,
        ltr: true,
      },
      {
        icon: this.faLocationDot,
        title: this.isArabic ? 'موقعنا' : 'Our Location',
        value: this.isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt',
        link: this.mapsUrl,
        ltr: false,
      },
      {
        icon: this.faClock,
        title: this.isArabic ? 'مواعيد العمل' : 'Working Hours',
        value: this.isArabic ? 'يتم تحديدها قريبًا' : 'To be announced',
        link: '',
        ltr: false,
      },
    ];
  }

  submitForm(): void {
    const name = this.formData.name.trim();
    const email = this.formData.email.trim();
    const phone = this.formData.phone.trim();
    const subjectKey = this.formData.subject as SubjectKey;
    const message = this.formData.message.trim();

    if (!name || !email || !phone || !subjectKey || !message) {
      return;
    }

    // الموضوع بيتبعت باللغة الحالية للموقع
    const labels = SUBJECT_LABELS[subjectKey];
    const subject = labels ? (this.isArabic ? labels.ar : labels.en) : subjectKey;

    const whatsappMessage = this.isArabic
      ? `مرحبًا بلاك روك،\n\nالاسم: ${name}\nالبريد الإلكتروني: ${email}\nرقم الهاتف: ${phone}\nموضوع الاستفسار: ${subject}\n\nالرسالة:\n${message}`
      : `Hello Black Rock,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`;

    this.whatsapp.sendMessage(whatsappMessage);
  }

  openWhatsApp(): void {
    this.whatsapp.inquireGeneral();
  }
}
