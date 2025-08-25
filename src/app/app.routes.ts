import { Routes } from '@angular/router';
import { FourThemeComponent } from './site-themes/four-theme/four-theme.component';

export const routes: Routes = [
  {
    path: '',
    component: FourThemeComponent,
    children: [
      // {
      //   path: 'product-search',
      //   loadChildren: () =>
      //     import(
      //       './site-themes/four-theme/four-theme-product-search/four-theme-product-search.module'
      //     ).then((m) => m.FourThemeProductSearchModule),
      // },
      {
        path: 'myaccount',
        loadComponent: () =>
          import(
            './myaccount/my-account/my-account.component'
          ).then((m) => m.MyAccountComponent),
      },
      {
        path: 'my-orders',
        loadComponent: () =>
          import(
            './myaccount/my-orders/my-orders.component'
          ).then((m) => m.MyOrdersComponent),
      },
      {
        path: 'shopping-cart',
        loadComponent: () =>
          import(
            './shopping-cart/shopping-cart/shopping-cart.component'
          ).then((m) => m.ShoppingCartComponent),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import(
            './checkout/checkout/checkout.component'
          ).then((m) => m.CheckoutComponent),
      },
      // {
      //   path: 'product',
      //   loadChildren: () =>
      //     import(
      //       './site-themes/four-theme/four-new-product-details/four-new-product-details.module'
      //     ).then((m) => m.FourNewProductDetailsModule),
      // },
    ],
  },
];
