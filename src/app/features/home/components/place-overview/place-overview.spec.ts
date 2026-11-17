import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceOverview } from './place-overview';

describe('PlaceOverview', () => {
  let fixture: ComponentFixture<PlaceOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PlaceOverview] }).compileComponents();
    fixture = TestBed.createComponent(PlaceOverview);
    await fixture.whenStable();
  });

  it('shows a poster first and the video after clicking play', async () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('video')).toBeNull();
    (el.querySelector('.poster') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(el.querySelector('video')).toBeTruthy();
  });
});
