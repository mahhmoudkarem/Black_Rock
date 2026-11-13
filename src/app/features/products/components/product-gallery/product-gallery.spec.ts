import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductGallery } from './product-gallery';
import { PRODUCTS } from '../../../../core/data/products.data';

describe('ProductGallery', () => {
  let fixture: ComponentFixture<ProductGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProductGallery] }).compileComponents();
    fixture = TestBed.createComponent(ProductGallery);
    fixture.componentRef.setInput('product', PRODUCTS.find((p) => p.slug === 'sunny-menia')!);
    await fixture.whenStable();
  });

  it('shows a thumbnail per image', () => {
    expect(fixture.nativeElement.querySelectorAll('.thumb').length).toBe(9);
  });
});
