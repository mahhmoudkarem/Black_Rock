import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGem, faLayerGroup, faHandshake, faComments } from '@fortawesome/free-solid-svg-icons';
import { LanguageService, LocalizedText } from '../../../../core/services/LanguageService/language-service';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-why-choose-us',
  styleUrl: './why-choose-us.css',
  templateUrl: './why-choose-us.html',
})
export class WhyChooseUs {
  protected readonly lang = inject(LanguageService);

  protected readonly items: { icon: typeof faGem; title: LocalizedText; text: LocalizedText }[] = [
    {
      icon: faGem,
      title: { en: 'Premium Selection', ar: 'اختيار مميز' },
      text: {
        en: 'Carefully selected marble and granite with natural beauty and lasting quality.',
        ar: 'رخام وجرانيت مختار بعناية يجمع بين الجمال الطبيعي والجودة الدائمة.',
      },
    },
    {
      icon: faLayerGroup,
      title: { en: 'Finishes For Every Style', ar: 'تشطيبات لكل ذوق' },
      text: {
        en: 'Polished and honed finishes to suit both classic and contemporary designs.',
        ar: 'تشطيبات لميع وهوند تناسب التصميمات الكلاسيكية والعصرية.',
      },
    },
    {
      icon: faHandshake,
      title: { en: 'Support For Every Project', ar: 'دعم لكل مشروع' },
      text: {
        en: 'We help you choose the right stone for floors, walls, stairs and more.',
        ar: 'نساعدك في اختيار الحجر المناسب للأرضيات والحوائط والسلالم وغيرها.',
      },
    },
    {
      icon: faComments,
      title: { en: 'Easy Communication', ar: 'تواصل سهل' },
      text: {
        en: 'Reach us directly on WhatsApp, send photos and get the details you need.',
        ar: 'تواصل معنا مباشرة عبر واتساب، أرسل الصور واحصل على التفاصيل التي تحتاجها.',
      },
    },
  ];

  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
