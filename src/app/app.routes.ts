import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then((m) => m.MainLayout),

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/pages/home/home').then((m) => m.Home),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/pages/about/about').then((m) => m.About),
      },

      // المنتجات: صفحتين (رخام / جرانيت) بنفس الصفحة والداتا بتختلف
      { path: 'products', redirectTo: 'products/marble', pathMatch: 'full' },
      {
        path: 'products/marble',
        data: { category: 'marble' },
        loadComponent: () =>
          import('./features/products/pages/products/products').then((m) => m.Products),
      },
      {
        path: 'products/granite',
        data: { category: 'granite' },
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
        loadComponent: () =>
          import('./features/projects/pages/projects/projects').then((m) => m.Projects),
      },
      {
        path: 'contact',
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
