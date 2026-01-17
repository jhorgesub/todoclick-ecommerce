import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Api } from '../../services/api';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {

  product = signal<Product | undefined>(undefined);

  private _route = inject(ActivatedRoute);
  private _api = inject(Api);

  addToCart(product: Product) {
    this._api.addToCart(product);
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: any) => {
      const id = params['id'];
      this._api.getProduct(id).subscribe((data: Product) => {
        this.product.set(data);
      });
    })
  }

}
