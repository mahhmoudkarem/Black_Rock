import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { LanguageService, LocalizedText } from '../../../../core/services/LanguageService/language-service';
import { PRODUCTS } from '../../../../core/data/products.data';
import { FinishKey, ProductCategory, ToneKey } from '../../../../core/models/Product';
import { PageHero } from '../../../../shared/components/page-hero/page-hero';
import { SpotlightCarousel, SpotlightSlide } from '../../../../shared/components/spotlight-carousel/spotlight-carousel';
import { CtaSection } from '../../../../shared/components/cta-section/cta-section';
import { Reveal } from '../../../../shared/directives/reveal';
import { ProductsFilter } from '../../components/products-filter/products-filter';
import { ProductsGrid } from '../../components/products-grid/products-grid';

interface InfoCard {
  title: LocalizedText;
  text: LocalizedText;
}

/**
 * صفحة واحدة بتشتغل للرخام وللجرانيت:
 * الراوت (products/marble أو products/granite) بيحدد النوع عن طريق route data.
 */
@Component({
  imports: [RouterLink, FontAwesomeModule, PageHero, SpotlightCarousel, ProductsFilter, ProductsGrid, CtaSection, Reveal],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products {
  protected readonly lang = inject(LanguageService);
  private readonly route = inject(ActivatedRoute);

  protected readonly faArrowRight = faArrowRight;

  protected readonly category = toSignal(
    this.route.data.pipe(map((d) => (d['category'] ?? 'marble') as ProductCategory)),
    { initialValue: (this.route.snapshot.data['category'] ?? 'marble') as ProductCategory },
  );

  protected readonly isGranite = computed(() => this.category() === 'granite');

  /** منتجات القسم الحالي */
  protected readonly items = computed(() => PRODUCTS.filter((p) => p.category === this.category()));
  protected readonly tones = computed(() => [...new Set(this.items().map((p) => p.tone))]);

  // الفلاتر
  protected readonly finish = signal<FinishKey | 'all'>('all');
  protected readonly tone = signal<ToneKey | 'all'>('all');

  protected readonly filtered = computed(() =>
    this.items().filter(
      (p) =>
        (this.finish() === 'all' || p.finishKey === this.finish()) &&
        (this.tone() === 'all' || p.tone === this.tone()),
    ),
  );

  /** القسم التاني (للينك في آخر الصفحة) */
  protected readonly otherLink = computed(() =>
    this.isGranite()
      ? {
          link: '/products/marble',
          eyebrow: { en: 'LOOKING FOR MARBLE?', ar: 'تبحث عن الرخام؟' },
          title: { en: 'Explore Our Marble Collection', ar: 'اكتشف مجموعة الرخام' },
          button: { en: 'View Marble', ar: 'عرض الرخام' },
        }
      : {
          link: '/products/granite',
          eyebrow: { en: 'LOOKING FOR GRANITE?', ar: 'تبحث عن الجرانيت؟' },
          title: { en: 'Explore Our Granite Collection', ar: 'اكتشف مجموعة الجرانيت' },
          button: { en: 'View Granite', ar: 'عرض الجرانيت' },
        },
  );

  protected readonly hero = computed(() =>
    this.isGranite()
      ? {
          eyebrow: { en: 'GRANITE', ar: 'الجرانيت' },
          title: { en: 'Natural Granite Collection', ar: 'مجموعة الجرانيت الطبيعي' },
          subtitle: {
            en: 'Hard, durable and made to last. Browse our granite range and open any stone to see its details.',
            ar: 'صلب ومتين ومصنوع ليدوم. تصفح مجموعة الجرانيت وافتح أي نوع لمشاهدة تفاصيله.',
          },
          image: '/images/stones/aswan-red/1.jpg',
          crumb: { en: 'Granite', ar: 'الجرانيت' },
        }
      : {
          eyebrow: { en: 'MARBLE', ar: 'الرخام' },
          title: { en: 'Natural Marble Collection', ar: 'مجموعة الرخام الطبيعي' },
          subtitle: {
            en: 'Browse our range of polished, honed and pecked marble. Open any stone to see all its photos and videos.',
            ar: 'تصفح مجموعتنا من الرخام اللميع والهوند والسبارو بيكد. افتح أي نوع لمشاهدة كل صوره وفيديوهاته.',
          },
          image: '/images/about/marble-banner.jpg',
          crumb: { en: 'Marble', ar: 'الرخام' },
        },
  );

  /** سلايدات الكاروسيل (الأنواع المميزة في القسم) */
  protected readonly slides = computed<SpotlightSlide[]>(() =>
    this.items()
      .filter((p) => p.featured)
      .map((p) => ({
        image: p.cover,
        badge: p.category === 'granite' ? { en: 'Granite', ar: 'جرانيت' } : p.finish,
        title: p.name,
        text: p.description,
        meta: p.applications,
        link: ['/products', p.slug],
        linkLabel: { en: 'View Details', ar: 'عرض التفاصيل' },
      })),
  );

  private readonly marbleInfo: InfoCard[] = [
    {
      title: { en: 'Polished', ar: 'لميع (Polished)' },
      text: {
        en: 'A glossy mirror-like surface that highlights color and veining. Best for interior floors, walls and kitchens.',
        ar: 'سطح لامع كالمرآة يبرز اللون والعروق. الأفضل للأرضيات والحوائط والمطابخ الداخلية.',
      },
    },
    {
      title: { en: 'Honed', ar: 'هوند (Honed)' },
      text: {
        en: 'A smooth matte surface with a soft, natural feel and better grip. Great for modern floors and exteriors.',
        ar: 'سطح أملس مطفي بملمس ناعم وطبيعي وتماسك أفضل. رائع للأرضيات العصرية والخارجية.',
      },
    },
    {
      title: { en: 'Sparrow-Pecked', ar: 'سبارو بيكد (Sparrow-Pecked)' },
      text: {
        en: 'A hand-textured, rugged surface with a natural look. Ideal for facades, garden paths and feature walls.',
        ar: 'سطح خشن مُشغّل يدويًا بمظهر طبيعي. مثالي للواجهات وممرات الحدائق وحوائط الديكور.',
      },
    },
  ];

  private readonly graniteInfo: InfoCard[] = [
    {
      title: { en: 'Hard & Durable', ar: 'صلب ومتين' },
      text: {
        en: 'Granite resists scratches and wear, so it keeps its look for years even in busy spaces.',
        ar: 'يقاوم الجرانيت الخدوش والتآكل، فيحافظ على مظهره لسنوات حتى في الأماكن كثيرة الاستخدام.',
      },
    },
    {
      title: { en: 'Easy To Maintain', ar: 'سهل الصيانة' },
      text: {
        en: 'A dense surface that is simple to clean, ideal for kitchens, stairs and entrances.',
        ar: 'سطح كثيف سهل التنظيف، مثالي للمطابخ والسلالم والمداخل.',
      },
    },
    {
      title: { en: 'Indoor & Outdoor', ar: 'للداخل والخارج' },
      text: {
        en: 'Strong enough for floors, facades and garden areas, in a wide range of natural colors.',
        ar: 'قوي بما يكفي للأرضيات والواجهات والحدائق، بتشكيلة واسعة من الألوان الطبيعية.',
      },
    },
  ];

  protected readonly info = computed(() => (this.isGranite() ? this.graniteInfo : this.marbleInfo));
  protected readonly infoHead = computed(() =>
    this.isGranite()
      ? { eyebrow: { en: 'WHY GRANITE', ar: 'لماذا الجرانيت' }, title: { en: 'Built To Last', ar: 'مصنوع ليدوم' } }
      : { eyebrow: { en: 'FINISHES', ar: 'التشطيبات' }, title: { en: 'Choose The Right Finish', ar: 'اختر التشطيب المناسب' } },
  );
}
