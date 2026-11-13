import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Products } from './products';
import { PRODUCTS } from '../../../../core/data/products.data';

function setup(category: 'marble' | 'granite') {
  TestBed.configureTestingModule({
    imports: [Products],
    providers: [
      provideRouter([]),
      { provide: ActivatedRoute, useValue: { data: of({ category }), snapshot: { data: { category } } } },
    ],
  });
  return TestBed.createComponent(Products);
}

describe('Products page', () => {
  it('lists only marble on the marble page', async () => {
    const fixture = setup('marble');
    await fixture.whenStable();
    const count = fixture.nativeElement.querySelectorAll('app-products-grid .card').length;
    expect(count).toBe(PRODUCTS.filter((p) => p.category === 'marble').length);
  });

  it('lists only granite on the granite page', async () => {
    const fixture = setup('granite');
    await fixture.whenStable();
    const count = fixture.nativeElement.querySelectorAll('app-products-grid .card').length;
    expect(count).toBe(PRODUCTS.filter((p) => p.category === 'granite').length);
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Granite');
  });

  it('filters marble by finish', async () => {
    const fixture = setup('marble');
    const page = fixture.componentInstance as unknown as { finish: { set: (v: string) => void } };
    page.finish.set('pecked');
    await fixture.whenStable();
    const expected = PRODUCTS.filter((p) => p.category === 'marble' && p.finishKey === 'pecked').length;
    expect(fixture.nativeElement.querySelectorAll('app-products-grid .card').length).toBe(expected);
  });

  it('filters granite by color', async () => {
    const fixture = setup('granite');
    const page = fixture.componentInstance as unknown as { tone: { set: (v: string) => void } };
    page.tone.set('red');
    await fixture.whenStable();
    const expected = PRODUCTS.filter((p) => p.category === 'granite' && p.tone === 'red').length;
    expect(fixture.nativeElement.querySelectorAll('app-products-grid .card').length).toBe(expected);
  });
});
