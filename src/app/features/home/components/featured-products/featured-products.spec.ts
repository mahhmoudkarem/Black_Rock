import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FeaturedProducts } from './featured-products';
import { PRODUCTS } from '../../../../core/data/products.data';

describe('FeaturedProducts', () => {
  let fixture: ComponentFixture<FeaturedProducts>;
  let component: FeaturedProducts;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedProducts],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should render one slide per featured product', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('.slide').length).toBe(PRODUCTS.filter((p) => p.featured).length);
  });

  it('should move forward and wrap around', () => {
    const c = component as unknown as { index: () => number; next: () => void; maxIndex: () => number };
    const max = c.maxIndex();
    for (let i = 0; i < max; i++) c.next();
    expect(c.index()).toBe(max);
    c.next();
    expect(c.index()).toBe(0);
  });
});
