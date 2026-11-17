import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language-service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('starts in English', () => {
    expect(service.lang()).toBe('en');
    expect(service.isArabic()).toBe(false);
  });

  it('toggles language and updates <html> dir/lang', () => {
    service.toggle();
    TestBed.tick();
    expect(service.isArabic()).toBe(true);
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');

    service.toggle();
    TestBed.tick();
    expect(document.documentElement.dir).toBe('ltr');
    expect(document.documentElement.lang).toBe('en');
  });
});
