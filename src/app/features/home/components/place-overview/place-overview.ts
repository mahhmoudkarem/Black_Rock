import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay, faCheck } from '@fortawesome/free-solid-svg-icons';
import { LanguageService, LocalizedText } from '../../../../core/services/LanguageService/language-service';

/** قسم فيديو نظرة عامة على المكان (Overview) */
@Component({
  imports: [FontAwesomeModule],
  selector: 'app-place-overview',
  styleUrl: './place-overview.css',
  templateUrl: './place-overview.html',
})
export class PlaceOverview {
  protected readonly lang = inject(LanguageService);
  protected readonly faPlay = faPlay;
  protected readonly faCheck = faCheck;

  /** لتغيير الفيديو: بدّل الملف في public/videos/overview.mp4 */
  protected readonly video = '/videos/overview.mp4';
  protected readonly poster = '/videos/overview.jpg';

  protected readonly playing = signal(false);

  protected readonly points: LocalizedText[] = [
    { en: 'Cutting blocks into slabs', ar: 'تقطيع البلوكات إلى ألواح' },
    { en: 'Careful storage and packing', ar: 'تخزين وتعبئة بعناية' },
    { en: 'Ready for shipping', ar: 'جاهزة للشحن' },
  ];

  protected play(): void {
    this.playing.set(true);
  }
}
