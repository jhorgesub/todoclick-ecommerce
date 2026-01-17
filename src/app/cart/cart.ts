import { Component, inject, OnInit, signal, computed, OnDestroy } from '@angular/core';
import { Api } from '../services/api';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit, OnDestroy {

  private _api = inject(Api);

  cartItems = this._api.cartItems;
  quantity = signal<number>(0);
  isCompleted = signal<boolean>(false);
  countdown = signal<number>(5);
  private _router = inject(Router);
  private _intervalId: any;

  removeItem(id: number): void {
    this.cartItems.update(listaActual => {
      const nuevaLista = listaActual.filter(producto => producto.id !== id);
      return nuevaLista;
    });
    this._api.saveCartToStorage();
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this._api.clearCart();
    }
  }

  updateQuantity(id: number, quantity: number): void {
    if (quantity < 1) return;
    this.cartItems.update(listaActual =>
      listaActual.map(producto => producto.id === id ? { ...producto, quantity } : producto)
    );
    this._api.saveCartToStorage();
  }

  subtotal = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0);
  });

  totalDiscount = computed(() => {
    return this.cartItems().reduce((acc, item) => {
      // We use Math.round to match the .toFixed(0) used in the UI
      const roundedPercentage = Math.round(item.discountPercentage || 0);
      const discount = (item.price * item.quantity * roundedPercentage) / 100;
      return acc + discount;
    }, 0);
  });

  total = computed(() => {
    return this.subtotal() - this.totalDiscount();
  });

  getItemDiscount(item: any): number {
    const roundedPercentage = Math.round(item.discountPercentage || 0);
    return (item.price * item.quantity * roundedPercentage) / 100;
  }

  checkout(): void {
    if (this.cartItems().length === 0) return;

    this.isCompleted.set(true);
    this._api.clearCart();

    this._intervalId = setInterval(() => {
      this.countdown.update(prev => prev - 1);

      if (this.countdown() === 0) {
        clearInterval(this._intervalId);
        this._router.navigate(['/']);
      }
    }, 1000);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
  }

}
