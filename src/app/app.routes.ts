import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Contact } from './pages/contact/contact';
import { Cart } from './cart/cart';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'products', component: Products },
    { path: 'product/:id', component: ProductDetail },
    { path: 'contact', component: Contact },
    { path: 'cart', component: Cart },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
