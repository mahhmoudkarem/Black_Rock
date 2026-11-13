import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../../../core/services/LanguageService/language-service';
import { PRODUCTS } from '../../../../core/data/products.data';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-video-showcase',
  styleUrl: './video-showcase.css',
  templateUrl: './video-showcase.html',
})
export class VideoShowcase {
  protected readonly lang = inject(LanguageService);
  protected readonly faPlay = faPlay;

  protected readonly videos = PRODUCTS.filter((p) => p.video);

  /** السلاج اللي الفيديو بتاعه شغال حاليًا */
  protected readonly playing = signal<string | null>(null);

  protected play(slug: string): void {
    this.playing.set(slug);
  }
}
