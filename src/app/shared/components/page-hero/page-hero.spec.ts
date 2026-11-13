import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PageHero } from './page-hero';

describe('PageHero', () => {
  let fixture: ComponentFixture<PageHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHero],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(PageHero);
    fixture.componentRef.setInput('eyebrow', { en: 'E', ar: 'ع' });
    fixture.componentRef.setInput('title', { en: 'Title', ar: 'عنوان' });
    await fixture.whenStable();
  });

  it('renders the title', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Title');
  });
});
