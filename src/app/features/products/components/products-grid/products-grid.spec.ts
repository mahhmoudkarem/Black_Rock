import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductsGrid } from './products-grid';
import { PRODUCTS } from '../../../../core/data/products.data';

describe('ProductsGrid', () => {
  let fixture: ComponentFixture<ProductsGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsGrid],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductsGrid);
  });

  it('renders a card for each product', async () => {
    fixture.componentRef.setInput('products', PRODUCTS);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.card').length).toBe(PRODUCTS.length);
  });

  it('shows an empty state when there are no products', async () => {
    fixture.componentRef.setInput('products', []);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.empty')).toBeTruthy();
  });
});
