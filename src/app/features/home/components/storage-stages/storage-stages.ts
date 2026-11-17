import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';
import { LanguageService, LocalizedText } from '../../../../core/services/LanguageService/language-service';

interface Stage {
  title: LocalizedText;
  text: LocalizedText;
  images: string[];
}

const STAGE_MS = 5500;

/** قسم مراحل التخزين والتوزيع: خطوات + صور بتتبدل لوحدها */
@Component({
  selector: 'app-storage-stages',
  styleUrl: './storage-stages.css',
  templateUrl: './storage-stages.html',
})
export class StorageStages {
  protected readonly lang = inject(LanguageService);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly stageMs = STAGE_MS;

  protected readonly stages: Stage[] = [
    {
      title: { en: 'Selection & Inspection', ar: 'الفرز والمعاينة' },
      text: {
        en: 'Every batch is checked for color, veining and finish before it moves to the next stage.',
        ar: 'تُفحص كل دفعة من حيث اللون والعروق والتشطيب قبل الانتقال إلى المرحلة التالية.',
      },
      images: ['/images/storage/inspection-1.jpg', '/images/storage/inspection-2.jpg'],
    },
    {
      title: { en: 'Palletizing & Stacking', ar: 'التشوين والترتيب' },
      text: {
        en: 'Tiles and slabs are stacked neatly on pallets and strapped so nothing moves during handling.',
        ar: 'تُرتب البلاطات والألواح بعناية على بالتات وتُربط جيدًا حتى لا تتحرك أثناء المناولة.',
      },
      images: ['/images/storage/palletizing-1.jpg', '/images/storage/palletizing-2.jpg'],
    },
    {
      title: { en: 'Protective Crating', ar: 'التعبئة في صناديق خشبية' },
      text: {
        en: 'Strong wooden crates protect the stone during storage and long-distance transport.',
        ar: 'صناديق خشبية قوية تحمي الحجر أثناء التخزين والنقل لمسافات طويلة.',
      },
      images: ['/images/storage/crating-1.jpg', '/images/storage/crating-2.jpg'],
    },
    {
      title: { en: 'Container Loading', ar: 'تحميل الحاويات' },
      text: {
        en: 'Crates are loaded and secured inside the container with care, ready for shipping.',
        ar: 'تُحمّل الصناديق وتُثبّت داخل الحاوية بعناية استعدادًا للشحن.',
      },
      images: ['/images/storage/loading-1.jpg'],
    },
    {
      title: { en: 'Shipping & Distribution', ar: 'الشحن والتوزيع' },
      text: {
        en: 'Your order is dispatched and followed up until it reaches its destination safely.',
        ar: 'يتم شحن طلبك ومتابعته حتى يصل إلى وجهته بأمان.',
      },
      images: ['/images/storage/loading-2.jpg'],
    },
  ];

  protected readonly current = signal(0);
  protected readonly paused = signal(false);

  private timer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;
      this.timer = setInterval(() => {
        if (!this.paused() && !document.hidden) {
          this.current.update((i) => (i + 1) % this.stages.length);
        }
      }, STAGE_MS);
    });
    inject(DestroyRef).onDestroy(() => {
      if (this.timer) clearInterval(this.timer);
    });
  }

  protected select(i: number): void {
    this.current.set(i);
  }

  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
