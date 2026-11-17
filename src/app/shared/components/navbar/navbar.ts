import { Component, ElementRef, HostListener, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faXmark, faGlobe, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../../core/services/LanguageService/language-service';
import { PRODUCTS } from '../../../core/data/products.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  private readonly language = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  isMobileMenuOpen = false;

  /** قايمة المنتجات المنسدلة */
  protected readonly desktopOpen = signal(false);
  protected readonly mobileProductsOpen = signal(false);

  faBars = faBars;
  faXmark = faXmark;
  faGlobe = faGlobe;
  faChevronDown = faChevronDown;

  protected readonly marbleCount = PRODUCTS.filter((p) => p.category === 'marble').length;
  protected readonly graniteCount = PRODUCTS.filter((p) => p.category === 'granite').length;

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  /** أي صفحة تحت /products (رخام، جرانيت، تفاصيل منتج) */
  protected readonly productsActive = computed(() => this.url().startsWith('/products'));

  // الكومبوننت بيقرا اللغة من السيرفس المشترك
  get isArabic(): boolean {
    return this.language.isArabic();
  }

  toggleLanguage(): void {
    this.language.toggle();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) this.mobileProductsOpen.set(false);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.mobileProductsOpen.set(false);
  }

  protected closeDropdown(): void {
    this.desktopOpen.set(false);
  }

  /** اقفل القايمة لو دوست برّاها أو ضغطت Esc */
  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: Event): void {
    if (!this.host.nativeElement.contains(event.target as Node)) this.closeDropdown();
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeDropdown();
  }
}
