import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Projects } from './projects';
import { PROJECTS } from '../../../../core/data/projects.data';

describe('Projects page', () => {
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Projects);
    await fixture.whenStable();
  });

  it('lists all projects', () => {
    expect(fixture.nativeElement.querySelectorAll('.card').length).toBe(PROJECTS.length);
  });

  it('filters by type', async () => {
    const page = fixture.componentInstance as unknown as { filter: { set: (v: string) => void } };
    page.filter.set('coastal');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.card').length).toBe(
      PROJECTS.filter((p) => p.type === 'coastal').length,
    );
  });
});
