import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ProductDetails } from './product-details';

function setup(slug: string) {
  TestBed.configureTestingModule({
    imports: [ProductDetails],
    providers: [
      provideRouter([]),
      {
        provide: ActivatedRoute,
        useValue: { paramMap: of(convertToParamMap({ slug })), snapshot: { paramMap: convertToParamMap({ slug }) } },
      },
    ],
  });
  return TestBed.createComponent(ProductDetails);
}

describe('ProductDetails', () => {
  it('shows the product for a valid slug', async () => {
    const fixture = setup('silvia');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Silvia');
  });

  it('shows a not-found message for an unknown slug', async () => {
    const fixture = setup('nope');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.missing')).toBeTruthy();
  });
});
