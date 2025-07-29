import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ProductListing } from './components/productListing/productListing';
import { Cart } from './components/cart/cart';
import { Users } from './pages/users/users';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'productListing',
    component: ProductListing,
  },
  {
    path: 'cart',
    component: Cart,
  },
  {
    path: 'users',
    component: Users
  }
];
