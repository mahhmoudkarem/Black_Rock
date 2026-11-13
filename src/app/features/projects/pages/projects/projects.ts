import { Component, computed, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { LanguageService, LocalizedText } from '../../../../core/services/LanguageService/language-service';
import { WhatsappService } from '../../../../core/services/WhatsappService/whatsapp-service';
import { PROJECTS } from '../../../../core/data/projects.data';
import { Project, ProjectType } from '../../../../core/models/Project';
import { PageHero } from '../../../../shared/components/page-hero/page-hero';
import { SpotlightCarousel, SpotlightSlide } from '../../../../shared/components/spotlight-carousel/spotlight-carousel';
import { CtaSection } from '../../../../shared/components/cta-section/cta-section';
import { Reveal } from '../../../../shared/directives/reveal';

const TYPE_LABEL: Record<ProjectType, LocalizedText> = {
  residential: { en: 'Residential', ar: 'سكني' },
  coastal: { en: 'Coastal & Resorts', ar: 'ساحلي وسياحي' },
  lifestyle: { en: 'Lifestyle', ar: 'نمط حياة' },
};

@Component({
  imports: [FontAwesomeModule, PageHero, SpotlightCarousel, CtaSection, Reveal],
  selector: 'app-projects',
  styleUrl: './projects.css',
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly lang = inject(LanguageService);
  private readonly whatsapp = inject(WhatsappService);

  protected readonly faPin = faLocationDot;
  protected readonly faWhatsapp = faWhatsapp;

  protected readonly typeLabel = TYPE_LABEL;
  protected readonly filter = signal<ProjectType | 'all'>('all');

  protected readonly filters: { key: ProjectType | 'all'; label: LocalizedText }[] = [
    { key: 'all', label: { en: 'All Projects', ar: 'كل المشاريع' } },
    ...(Object.keys(TYPE_LABEL) as ProjectType[]).map((key) => ({ key, label: TYPE_LABEL[key] })),
  ];

  protected readonly filtered = computed<Project[]>(() =>
    this.filter() === 'all' ? PROJECTS : PROJECTS.filter((p) => p.type === this.filter()),
  );

  /** أرقام مأخوذة من بيانات المشاريع نفسها */
  protected readonly stats = [
    { value: PROJECTS.length, label: { en: 'Projects', ar: 'مشروعًا' } },
    { value: new Set(PROJECTS.map((p) => p.location.en)).size, label: { en: 'Locations', ar: 'موقعًا' } },
    { value: new Set(PROJECTS.map((p) => p.type)).size, label: { en: 'Project Types', ar: 'أنواع مشاريع' } },
  ];

  protected readonly slides: SpotlightSlide[] = PROJECTS.filter((p) => p.featured).map((p) => ({
    image: p.image,
    badge: TYPE_LABEL[p.type],
    title: p.name,
    text: p.summary,
    meta: [p.location, ...p.highlights.slice(0, 2)],
  }));

  protected discuss(p: Project): void {
    this.whatsapp.inquireAboutProject(this.lang.l(p.name));
  }
}
