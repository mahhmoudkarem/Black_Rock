import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../../../core/services/LanguageService/language-service';

@Component({
  imports: [RouterLink, FontAwesomeModule],
  selector: 'app-about-preview',
  styleUrl: './about-preview.css',
  templateUrl: './about-preview.html',
})
export class AboutPreview {
  protected readonly lang = inject(LanguageService);
  protected readonly faArrowRight = faArrowRight;
  protected readonly faCheck = faCheck;

  protected readonly points = [
    { en: 'A wide variety of marble and granite', ar: 'تنوع كبير في الرخام والجرانيت' },
    { en: 'Polished and honed finishes', ar: 'تشطيبات لميع وهوند' },
    { en: 'Help choosing the right stone for your project', ar: 'مساعدة في اختيار الحجر المناسب لمشروعك' },
  ];
}
