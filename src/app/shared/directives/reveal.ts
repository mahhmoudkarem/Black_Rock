import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
} from '@angular/core';

/**
 * أنيميشن ظهور بسيط عند التمرير: <div appReveal [revealDelay]="100">
 * (fade + slide up). الستايل في styles.css (.reveal / .reveal.in)
 */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class Reveal {
  readonly revealDelay = input(0);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      const node = this.el.nativeElement;
      node.style.transitionDelay = `${this.revealDelay()}ms`;

      if (!('IntersectionObserver' in window)) {
        node.classList.add('in');
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              node.classList.add('in');
              observer.disconnect();
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      );
      observer.observe(node);
    });
  }
}
