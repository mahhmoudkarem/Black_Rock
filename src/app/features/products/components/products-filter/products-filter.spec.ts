import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsFilter } from './products-filter';

describe('ProductsFilter', () => {
  let fixture: ComponentFixture<ProductsFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProductsFilter] }).compileComponents();
    fixture = TestBed.createComponent(ProductsFilter);
    await fixture.whenStable();
  });

  it('updates the finish model when a chip is clicked', async () => {
    const chips = fixture.nativeElement.querySelectorAll('.chip') as NodeListOf<HTMLButtonElement>;
    chips[1].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.finish()).toBe('polished');
  });
});
