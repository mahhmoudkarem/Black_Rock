import { Project } from '../models/Project';

/**
 * المشاريع المعروضة في صفحة Projects.
 * لتغيير صورة مشروع: ضع صورته في public/images/projects/ وغيّر `image` هنا.
 * (الصور الحالية مؤقتة من صور المشروع الموجودة.)
 */
const IMG = {
  living: '/images/hero/nero.jpg',
  gold: '/images/hero/gold.jpg',
  light: '/images/hero/emperador-light.jpg',
  slabs: '/images/hero/slabs.jpg',
  detail: '/images/about/about-detail.jpg',
  showroom: '/images/contact/contact-hero.jpg',
  beige: '/images/contact/contact-cta.jpg',
  goldDark: '/images/contact/contact-map.jpg',
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: 'murano',
    name: { en: 'Murano', ar: 'مورانو' },
    location: { en: 'Ain Sokhna', ar: 'العين السخنة' },
    type: 'coastal',
    summary: {
      en: 'A complete coastal living community, only 40 minutes from Cairo, with a 750-metre private beach and sea-view homes.',
      ar: 'مجتمع ساحلي متكامل على بعد 40 دقيقة فقط من القاهرة، بشاطئ خاص بطول 750 مترًا ومنازل مطلة على البحر.',
    },
    highlights: [
      { en: 'Chalets', ar: 'شاليهات' },
      { en: 'Penthouse chalets', ar: 'بنتهاوس شاليه' },
      { en: 'Twin houses', ar: 'توين هاوس' },
    ],
    image: IMG.light,
    featured: true,
  },
  {
    id: 2,
    slug: 'neopolis',
    name: { en: 'Neopolis', ar: 'نيوبوليس' },
    location: { en: 'Mostakbal City, New Cairo', ar: 'مدينة المستقبل، القاهرة الجديدة' },
    type: 'residential',
    summary: {
      en: 'A large integrated residential compound with a commercial strip, a medical centre and an entertainment hub.',
      ar: 'كمبوند سكني متكامل على مساحة كبيرة يضم شريطًا تجاريًا ومركزًا طبيًا ومنطقة ترفيهية.',
    },
    highlights: [
      { en: 'Apartments & duplexes', ar: 'شقق ودوبلكس' },
      { en: 'Penthouses', ar: 'بنتهاوس' },
      { en: '545 feddans', ar: '545 فدانًا' },
    ],
    image: IMG.living,
    featured: true,
  },
  {
    id: 3,
    slug: 'promenade-new-cairo',
    name: { en: 'Promenade New Cairo', ar: 'برومناد القاهرة الجديدة' },
    location: { en: 'Fifth Settlement, New Cairo', ar: 'التجمع الخامس، القاهرة الجديدة' },
    type: 'residential',
    summary: {
      en: 'A residential compound in the heart of New Cairo, close to the main roads and vital destinations.',
      ar: 'كمبوند سكني في قلب القاهرة الجديدة، قريب من المحاور الرئيسية والأماكن الحيوية.',
    },
    highlights: [
      { en: 'Apartments', ar: 'شقق' },
      { en: 'About 33 feddans', ar: 'حوالي 33 فدانًا' },
    ],
    image: IMG.gold,
    featured: true,
  },
  {
    id: 4,
    slug: 'tijan-maadi',
    name: { en: 'Tijan Maadi', ar: 'تيجان المعادي' },
    location: { en: 'Maadi, Cairo', ar: 'المعادي، القاهرة' },
    type: 'residential',
    summary: {
      en: 'A residential compound at the centre of Maadi, offering everyday comforts and views over green spaces.',
      ar: 'كمبوند سكني في قلب المعادي يجمع بين وسائل الراحة اليومية والإطلالات على المساحات الخضراء.',
    },
    highlights: [
      { en: 'Apartments & duplexes', ar: 'شقق ودوبلكس' },
      { en: 'Units from 122 m²', ar: 'وحدات من 122 م²' },
    ],
    image: IMG.showroom,
    featured: false,
  },
  {
    id: 5,
    slug: 'promenade-maadi',
    name: { en: 'Promenade Maadi', ar: 'برومناد المعادي' },
    location: { en: 'Zahraa Maadi, Cairo', ar: 'زهراء المعادي، القاهرة' },
    type: 'residential',
    summary: {
      en: 'A luxury residential compound with hotel apartments and penthouses overlooking wide green areas.',
      ar: 'كمبوند سكني فاخر يضم شقق فندقية وبنتهاوس مطلة على مساحات خضراء واسعة.',
    },
    highlights: [
      { en: 'Hotel apartments', ar: 'شقق فندقية' },
      { en: 'Penthouses', ar: 'بنتهاوس' },
      { en: '35,000 m²', ar: '35,000 م²' },
    ],
    image: IMG.detail,
    featured: false,
  },
  {
    id: 6,
    slug: 'river-walk',
    name: { en: 'River Walk', ar: 'ريفر ووك' },
    location: { en: 'New Cairo', ar: 'القاهرة الجديدة' },
    type: 'residential',
    summary: {
      en: 'A villa community in New Cairo made up of 100 villas.',
      ar: 'مجتمع فيلات في القاهرة الجديدة يضم 100 فيلا.',
    },
    highlights: [
      { en: 'Villas', ar: 'فيلات' },
      { en: '100 villas', ar: '100 فيلا' },
    ],
    image: IMG.goldDark,
    featured: false,
  },
  {
    id: 7,
    slug: 'pyramids-walk',
    name: { en: 'Pyramids Walk', ar: 'بيراميدز ووك' },
    location: { en: '6th of October City', ar: 'مدينة 6 أكتوبر' },
    type: 'residential',
    summary: {
      en: 'A residential project in 6th of October City delivered across several phases.',
      ar: 'مشروع سكني في مدينة 6 أكتوبر يتم تسليمه على عدة مراحل.',
    },
    highlights: [
      { en: 'Residential units', ar: 'وحدات سكنية' },
      { en: 'Phased delivery', ar: 'تسليم على مراحل' },
    ],
    image: IMG.slabs,
    featured: false,
  },
  {
    id: 8,
    slug: 'marina-wadi-degla',
    name: { en: 'Marina Wadi Degla', ar: 'مارينا وادي دجلة' },
    location: { en: 'Ain Sokhna', ar: 'العين السخنة' },
    type: 'coastal',
    summary: {
      en: 'A serene coastal resort on 600,000 m² with vast green spaces and premium beach facilities.',
      ar: 'قرية ساحلية هادئة على مساحة 600,000 م² بمساحات خضراء واسعة ومرافق شاطئية راقية.',
    },
    highlights: [
      { en: 'Beach facilities', ar: 'مرافق شاطئية' },
      { en: '600,000 m²', ar: '600,000 م²' },
    ],
    image: IMG.beige,
    featured: true,
  },
  {
    id: 9,
    slug: 'blumar-el-sokhna',
    name: { en: 'Blumar El Sokhna', ar: 'بلومار السخنة' },
    location: { en: 'Ain Sokhna', ar: 'العين السخنة' },
    type: 'coastal',
    summary: {
      en: 'A seaside village in Ain Sokhna made of chalets with coastal views and leisure amenities.',
      ar: 'قرية ساحلية في العين السخنة من الشاليهات بإطلالات بحرية ومرافق ترفيهية.',
    },
    highlights: [
      { en: 'Chalets', ar: 'شاليهات' },
      { en: 'Units from 130 m²', ar: 'وحدات من 130 م²' },
    ],
    image: IMG.light,
    featured: false,
  },
  {
    id: 10,
    slug: 'blumar-el-dome',
    name: { en: 'Blumar El Dome', ar: 'بلومار الدومة' },
    location: { en: 'Ain Sokhna', ar: 'العين السخنة' },
    type: 'coastal',
    summary: {
      en: 'A Red Sea escape with both mountain and sea views and first-class leisure amenities.',
      ar: 'ملاذ على البحر الأحمر بإطلالات على الجبل والبحر ومرافق ترفيهية راقية.',
    },
    highlights: [
      { en: 'Mountain & sea views', ar: 'إطلالة جبلية وبحرية' },
      { en: 'Leisure amenities', ar: 'مرافق ترفيهية' },
    ],
    image: IMG.detail,
    featured: false,
  },
  {
    id: 11,
    slug: 'blumar-sidi-abdel-rahman',
    name: { en: 'Blumar Sidi Abdel Rahman', ar: 'بلومار سيدي عبد الرحمن' },
    location: { en: 'North Coast', ar: 'الساحل الشمالي' },
    type: 'coastal',
    summary: {
      en: 'A North Coast resort village with chalets and villas by the Mediterranean.',
      ar: 'قرية سياحية على الساحل الشمالي تضم شاليهات وفيلات على البحر المتوسط.',
    },
    highlights: [
      { en: 'Chalets & villas', ar: 'شاليهات وفيلات' },
      { en: 'Beachfront', ar: 'على الشاطئ' },
    ],
    image: IMG.beige,
    featured: false,
  },
  {
    id: 12,
    slug: 'club-town-minya',
    name: { en: 'Club Town Minya', ar: 'كلوب تاون المنيا' },
    location: { en: 'Minya', ar: 'المنيا' },
    type: 'lifestyle',
    summary: {
      en: 'A club-living community that brings homes and sports and social facilities together.',
      ar: 'مجتمع يجمع بين السكن والمرافق الرياضية والاجتماعية في تجربة حياة النادي.',
    },
    highlights: [
      { en: 'Club living', ar: 'حياة النادي' },
      { en: 'Sports & social', ar: 'رياضي واجتماعي' },
    ],
    image: IMG.showroom,
    featured: true,
  },
];
