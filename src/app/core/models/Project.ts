import { LocalizedText } from '../services/LanguageService/language-service';

export type ProjectType = 'residential' | 'coastal' | 'lifestyle';

export interface Project {
  id: number;
  slug: string;
  name: LocalizedText;
  location: LocalizedText;
  type: ProjectType;
  summary: LocalizedText;
  /** نقاط قصيرة (أنواع الوحدات، المساحة...) */
  highlights: LocalizedText[];
  /** مسار الصورة - غيّره لصورة المشروع الحقيقية داخل public/images/projects */
  image: string;
  featured: boolean;
}
