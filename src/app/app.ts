import { Component, signal, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Fake Store');
  protected readonly isMenuOpen = signal(false);
  public readonly darkMode = signal<boolean>(this.getInitialTheme());
  private _api = inject(Api);
  protected cartCount = this._api.cartCount;
  protected notification = this._api.notification;

  constructor() {
    effect(() => {
      if (typeof window !== 'undefined') {
        const isDark = this.darkMode();
        if (isDark) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        }
      }
    });
  }

  private getInitialTheme(): boolean {
    if (typeof window === 'undefined') return false;

    // Cleanup old theme key from previous implementation
    if (localStorage.getItem('theme')) {
      localStorage.removeItem('theme');
    }

    const storedTheme = localStorage.getItem('color-theme');
    if (storedTheme) {
      return storedTheme === 'dark';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  protected toggleDarkMode() {
    this.darkMode.update(dark => !dark);
  }

  protected toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }


}
