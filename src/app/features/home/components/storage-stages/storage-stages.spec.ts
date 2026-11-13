import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorageStages } from './storage-stages';

describe('StorageStages', () => {
  let fixture: ComponentFixture<StorageStages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StorageStages] }).compileComponents();
    fixture = TestBed.createComponent(StorageStages);
    await fixture.whenStable();
  });

  it('renders 5 stages and switches on click', async () => {
    const steps = fixture.nativeElement.querySelectorAll('.step') as NodeListOf<HTMLButtonElement>;
    expect(steps.length).toBe(5);
    steps[2].click();
    await fixture.whenStable();
    expect(steps[2].classList.contains('on')).toBe(true);
  });
});
