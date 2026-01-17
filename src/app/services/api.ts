import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct, Product, CartItem } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private _http = inject(HttpClient);
  private _urlBase: string = 'https://dummyjson.com/products';
  cartItems = signal<CartItem[]>(this.loadCartFromStorage());
  cartCount = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
  notification = signal<{ message: string, product?: Product } | null>(null);

  private _notificationTimeout: any;

  getProducts(limit: number = 30, skip: number = 0): Observable<IProduct> {
    return this._http.get<IProduct>(`${this._urlBase}?limit=${limit}&skip=${skip}`);
  }

  getProduct(id: number): Observable<Product> {
    return this._http.get<Product>(`${this._urlBase}/${id}`);
  }

  addToCart(product: Product) {
    this.cartItems.update(listaActual => {
      const existingProduct = listaActual.find(item => item.id === product.id);
      if (existingProduct) {
        return listaActual.map(cartItem => cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
      }
      return [...listaActual, { ...product, quantity: 1 }];
    });
    this.saveCartToStorage();

    // Trigger Notification
    if (this._notificationTimeout) clearTimeout(this._notificationTimeout);
    this.notification.set({ message: 'Added to cart', product });
    this._notificationTimeout = setTimeout(() => this.notification.set(null), 3000);
  }

  loadCartFromStorage(): CartItem[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('cart');
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()))
  }

  clearCart() {
    this.cartItems.set([]);
    this.saveCartToStorage();
  }

}
