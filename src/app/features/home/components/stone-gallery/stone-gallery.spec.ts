import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { StoneGallery } from './stone-gallery';

describe('StoneGallery', () => {
  let fixture: ComponentFixture<StoneGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoneGallery],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(StoneGallery);
    await fixture.whenStable();
  });

  it('should create and render two moving rows', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('.track').length).toBe(2);
  });
});
