import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SpotlightCarousel, SpotlightSlide } from './spotlight-carousel';

const slides: SpotlightSlide[] = [1, 2, 3].map((n) => ({
  image: `/x${n}.jpg`,
  badge: { en: 'B', ar: 'ب' },
  title: { en: `T${n}`, ar: `ع${n}` },
  text: { en: 'text', ar: 'نص' },
}));

describe('SpotlightCarousel', () => {
  let fixture: ComponentFixture<SpotlightCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotlightCarousel],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(SpotlightCarousel);
    fixture.componentRef.setInput('slides', slides);
    fixture.componentRef.setInput('autoplay', false);
    await fixture.whenStable();
  });

  it('renders one dot per slide and wraps around', async () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('.dot').length).toBe(3);
    const c = fixture.componentInstance as unknown as { next: () => void; current: () => number };
    c.next(); c.next(); c.next();
    expect(c.current()).toBe(0);
  });
});
