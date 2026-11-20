import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then((m) => m.MainLayout),

    children: [
      {
        path: '',
        data: {
          seo: {
            title: {
              en: 'Black Rock | Egyptian Marble & Granite Supplier',
              ar: 'بلاك روك | توريد الرخام والجرانيت المصري',
            },
            description: {
              en: 'Black Rock supplies premium Egyptian natural marble and granite slabs - Galala, Sinai Pearl, Silvia and more - for flooring, walls, stairs and countertops.',
              ar: 'بلاك روك لتوريد الرخام والجرانيت الطبيعي المصري الفاخر - جلالة، سيناي بيرل، سيلفيا وغيرها - للأرضيات والحوائط والسلالم وأسطح المطابخ.',
            },
          },
        },
        loadComponent: () =>
          import('./features/home/pages/home/home').then((m) => m.Home),
      },
      {
        path: 'about',
        data: {
          seo: {
            title: { en: 'About Us | Black Rock Marble & Granite', ar: 'من نحن | بلاك روك للرخام والجرانيت' },
            description: {
              en: 'Learn about Black Rock, an Egyptian marble and granite company focused on quality stone, careful inspection and reliable delivery.',
              ar: 'تعرّف على بلاك روك، شركة مصرية للرخام والجرانيت تهتم بجودة الحجر والفحص الدقيق والتسليم في المواعيد.',
            },
            image: '/images/about/about-hero.jpg',
          },
        },
        loadComponent: () =>
          import('./features/about/pages/about/about').then((m) => m.About),
      },

      // المنتجات: صفحتين (رخام / جرانيت) بنفس الصفحة والداتا بتختلف
      { path: 'products', redirectTo: 'products/marble', pathMatch: 'full' },
      {
        path: 'products/marble',
        data: {
          category: 'marble',
          seo: {
            title: { en: 'Egyptian Marble Types | Black Rock', ar: 'أنواع الرخام المصري | بلاك روك' },
            description: {
              en: 'Browse Egyptian marble types at Black Rock: Galala White, Silvia, Sunny Menia, Sinai Pearl and more, in polished, honed and pecked finishes.',
              ar: 'تصفح أنواع الرخام المصري في بلاك روك: جلالة، سيلفيا، صني منيا، سيناي بيرل وغيرها بتشطيبات لميع ومطفي وبيكد.',
            },
          },
        },
        loadComponent: () =>
          import('./features/products/pages/products/products').then((m) => m.Products),
      },
      {
        path: 'products/granite',
        data: {
          category: 'granite',
          seo: {
            title: { en: 'Egyptian Granite Types | Black Rock', ar: 'أنواع الجرانيت المصري | بلاك روك' },
            description: {
              en: 'Browse Egyptian granite at Black Rock: Aswan Red, Rosa, New Halayeb, Grey and more for floors, stairs, countertops and facades.',
              ar: 'تصفح أنواع الجرانيت المصري في بلاك روك: أحمر أسوان، روزا، حلايب وغيرها للأرضيات والسلالم وأسطح المطابخ والواجهات.',
            },
          },
        },
        loadComponent: () =>
          import('./features/products/pages/products/products').then((m) => m.Products),
      },
      // لازم يبقى بعد الصفحتين اللي فوق
      {
        path: 'products/:slug',
        loadComponent: () =>
          import('./features/products/pages/product-details/product-details').then(
            (m) => m.ProductDetails,
          ),
      },

      {
        path: 'projects',
        data: {
          seo: {
            title: { en: 'Our Projects | Black Rock Marble & Granite', ar: 'مشاريعنا | بلاك روك للرخام والجرانيت' },
            description: {
              en: 'Residential and coastal projects across Egypt supplied with marble and granite by Black Rock.',
              ar: 'مشاريع سكنية وساحلية في مصر تم توريد الرخام والجرانيت لها من بلاك روك.',
            },
          },
        },
        loadComponent: () =>
          import('./features/projects/pages/projects/projects').then((m) => m.Projects),
      },
      {
        path: 'contact',
        data: {
          seo: {
            title: { en: 'Contact Us | Black Rock Marble & Granite', ar: 'تواصل معنا | بلاك روك للرخام والجرانيت' },
            description: {
              en: 'Contact Black Rock for marble and granite prices, samples and quotations via WhatsApp, phone or email.',
              ar: 'تواصل مع بلاك روك لمعرفة أسعار الرخام والجرانيت وطلب العينات وعروض الأسعار عبر واتساب أو التليفون.',
            },
            image: '/images/contact/contact-hero.jpg',
          },
        },
        loadComponent: () =>
          import('./features/contact/pages/contact/contact').then((m) => m.Contact),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
