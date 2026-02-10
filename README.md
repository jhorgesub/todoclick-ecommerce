# 🛒 TodoClick - E-commerce Web Application
> Everything you need, just one click away.

This project is a **Modern E-commerce Web Application** built with **Angular 21**. It focuses on delivering a fast, fluid, and premium user experience by leveraging the power of **Angular Signals** and **Tailwind CSS**.

---

## 🌐 Live Demo

You can test the deployed version of this project on Vercel:

**🔗 [TodoClick - Live Demo](https://todoclick-ecommerce.vercel.app)**

### Testing the Application

1. **Browse Products:** Explore the product catalog with real data from DummyJSON.
2. **Add to Cart:** Click on any product to view details and add items to your shopping cart.
3. **Shopping Cart:** Access the cart to review items, adjust quantities, and see real-time total calculations.
4. **Checkout Simulation:** Complete the checkout process to experience the interactive countdown timer.
5. **Responsive Design:** Test on different devices to see the mobile-first responsive design in action.

> **Note:** This is a demonstration project with simulated checkout. No real transactions are processed.

---

## 🚀 Core Features

* **Real-World API Integration:** Consumes data from [DummyJSON](https://dummyjson.com/) for products, categories, and details.
* **State Management via Signals:** Utilizes the latest Angular reactive patterns for efficient data handling.
* **Full Shopping Cart System:**
    * Data persistence using `localStorage`.
    * Real-time subtotal and total calculations.
    * Quantity management and item removal.
* **Premium User Interface:**
    * Fully responsive design with **Tailwind CSS** and **Flowbite**.
    * Floating "Back to Top" button with custom scroll logic.
    * Interactive Checkout simulation with a dynamic countdown timer.

## 🛠️ Tech Stack

* **Framework:** [Angular 21](https://angular.dev/) (Standalone Components).
* **Node.js:** [v20.11+](https://nodejs.org/) / v22+ / v24+ (LTS recommended).
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Flowbite](https://flowbite.com/).
* **Icons:** [Heroicons](https://heroicons.com/).
* **API:** [DummyJSON](https://dummyjson.com/).

---

## 📦 Installation and Setup

1.  **Prerequisites:** Ensure you have **Node.js v20.11, v22, or v24** installed.
2.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/todoclick-repo.git](https://github.com/your-username/todoclick-repo.git)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    ng serve
    ```
    Navigate to `http://localhost:4200/` to view the application.

---

## 📄 Development Notes (Localization)

While built for global standards, the project includes specific localizations:
* **Currency Formatting:** Adjusted for Argentine Peso format (**$1.500,00**).
* **SSR Compatibility:** Optimized cart logic to prevent Server-Side Rendering (SSR) errors by safely handling `localStorage` checks.

---

## 🔨 Roadmap / Future Improvements

- [ ] Integrate a real payment gateway (e.g., Mercado Pago or Stripe).
- [ ] Add a search bar to filter products by name.
- [ ] Implement dynamic product categories.

---

Developed with ⚡ by **Jorge Subeldia** - Full Stack Developer