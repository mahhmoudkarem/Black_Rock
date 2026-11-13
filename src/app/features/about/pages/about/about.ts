
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faGem,
  faAward,
  faHandshake,
  faCompassDrafting,
  faArrowRight,
  faCheck,
  faEye,
  faBullseye,
  faLeaf,
} from '@fortawesome/free-solid-svg-icons';

import { LanguageService } from '../../../../core/services/LanguageService/language-service';
import { WhatsappService } from '../../../../core/services/WhatsappService/whatsapp-service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About {
  private readonly language = inject(LanguageService);
  private readonly whatsapp = inject(WhatsappService);

  get isArabic(): boolean {
    return this.language.isArabic();
  }

  openWhatsApp(): void {
    this.whatsapp.inquireGeneral();
  }

  faGem = faGem;
  faAward = faAward;
  faHandshake = faHandshake;
  faCompassDrafting = faCompassDrafting;
  faArrowRight = faArrowRight;
  faCheck = faCheck;
  faEye = faEye;
  faBullseye = faBullseye;
  faLeaf = faLeaf;

  get advantages() {
    return this.isArabic
      ? [
          {
            icon: this.faGem,
            title: 'خامات مميزة',
            description: 'نهتم بتوفير اختيارات متنوعة من الرخام والجرانيت لتناسب مختلف الأذواق والاستخدامات.',
          },
          {
            icon: this.faAward,
            title: 'الاهتمام بالجودة',
            description: 'نركز على جودة الخامات والتفاصيل في كل مرحلة من مراحل اختيار المنتج.',
          },
          {
            icon: this.faCompassDrafting,
            title: 'تنوع التصميمات',
            description: 'مجموعة متنوعة من الألوان والتشطيبات لتناسب التصميمات الكلاسيكية والعصرية.',
          },
          {
            icon: this.faHandshake,
            title: 'خدمة تهتم بالعميل',
            description: 'نساعد عملاءنا في اختيار الخامات المناسبة لاحتياجاتهم ومشروعاتهم.',
          },
        ]
      : [
          {
            icon: this.faGem,
            title: 'Premium Materials',
            description: 'A diverse selection of marble and granite to suit different tastes and applications.',
          },
          {
            icon: this.faAward,
            title: 'Quality Focus',
            description: 'We pay attention to material quality and details throughout the product selection process.',
          },
          {
            icon: this.faCompassDrafting,
            title: 'Design Variety',
            description: 'Different colors and finishes to complement both classic and contemporary spaces.',
          },
          {
            icon: this.faHandshake,
            title: 'Customer Commitment',
            description: 'We help our customers choose materials that match their needs and project requirements.',
          },
        ];
  }
}
