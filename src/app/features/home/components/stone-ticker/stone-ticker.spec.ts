import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoneTicker } from './stone-ticker';

describe('StoneTicker', () => {
  let fixture: ComponentFixture<StoneTicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StoneTicker] }).compileComponents();
    fixture = TestBed.createComponent(StoneTicker);
    await fixture.whenStable();
  });

  it('should create and render the stone names twice for a seamless loop', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('.ticker-group').length).toBe(2);
  });
});
