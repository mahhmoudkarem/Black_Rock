import { LocalizedText } from '../services/LanguageService/language-service';

export type ProductCategory = 'marble' | 'granite' | 'other';

/** مفاتيح الفلترة في صفحة المنتجات */
export type FinishKey = 'polished' | 'honed' | 'pecked';
export type ToneKey = 'white' | 'beige' | 'gold' | 'grey' | 'brown' | 'red' | 'black';

export interface Product {
  id: number;
  slug: string;
  name: LocalizedText;
  category: ProductCategory;
  description: LocalizedText;
  color: LocalizedText;
  tone: ToneKey;
  /** لون تقريبي للحجر يُستخدم كنقطة لون في الكروت */
  swatch: string;
  finishKey: FinishKey;
  finish: LocalizedText;
  applications: LocalizedText[];
  /** صورة الغلاف */
  cover: string;
  images: string[];
  video?: string;
  videoPoster?: string;
  featured: boolean;
}
