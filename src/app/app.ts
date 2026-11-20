import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './core/services/SeoService/seo-service';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  // تشغيل الـ SEO مع بداية الأبلكيشن (title / meta / canonical لكل صفحة)
  private readonly seo = inject(SeoService);
}
