import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Api } from '../../services/api';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [RouterLink, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {

  public productList = signal<Product[]>([]);
  public loading = signal<boolean>(true);
  public loadingMore = signal<boolean>(false);
  public hasMore = signal<boolean>(true);
  public showButton = signal<boolean>(false);

  // Search, Filter and Sort Signals
  public searchQuery = signal<string>('');
  public selectedCategory = signal<string>('all');
  public sortOrder = signal<string>('default');

  // Computed signal for filtered and sorted results
  public filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();
    const order = this.sortOrder();
    let list = this.productList();

    // 1. Filter
    list = list.filter(product => {
      const matchesQuery = product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      const matchesCategory = category === 'all' || product.category === category;
      return matchesQuery && matchesCategory;
    });

    // 2. Sort
    return [...list].sort((a, b) => {
      switch (order) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'discount-desc':
          return (b.discountPercentage || 0) - (a.discountPercentage || 0);
        case 'discount-asc':
          return (a.discountPercentage || 0) - (b.discountPercentage || 0);
        default:
          return 0; // Default order from API
      }
    });
  });

  // Computed signal for unique categories
  public categories = computed(() => {
    const cats = this.productList().map(p => p.category);
    return ['all', ...new Set(cats)];
  });

  private _api = inject(Api);
  private _skip = 0;
  private _limit = 100;
  private _total = 0;

  ngOnInit(): void {
    this.loadProducts();
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        // Show button if user scrolls down more than 300px
        this.showButton.set(window.scrollY > 300);
      });
    }
  }

  loadProducts(): void {
    // We already have a limit of 100, which is enough for now.
    this._api.getProducts(this._limit, this._skip).subscribe({
      next: (data) => {
        this._total = data.total;
        this.productList.update(prev => {
          // Avoid duplicates if loading more
          const existingIds = new Set(prev.map(p => p.id));
          const newProducts = data.products.filter(p => !existingIds.has(p.id));
          return [...prev, ...newProducts];
        });
        this._skip += data.products.length;
        this.hasMore.set(this.productList().length < this._total);

        this.loading.set(false);
        this.loadingMore.set(false);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.loading.set(false);
        this.loadingMore.set(false);
      }
    });
  }

  loadMore(): void {
    if (this.loadingMore() || !this.hasMore()) return;

    this.loadingMore.set(true);
    this.loadProducts();
  }

  addToCart(product: Product) {
    this._api.addToCart(product);
    // Opcional: mostrar una notificación
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
