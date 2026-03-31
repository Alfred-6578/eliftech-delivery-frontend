# QuickBite - Food Delivery App

A food delivery web application where users can browse shops, add products to cart, and place orders.

**Live Demo:** [https://eliftech-delivery-frontend-nixh.vercel.app/](https://eliftech-delivery-frontend-nixh.vercel.app/)

## Accomplished Level: Advanced + Additional Features

### Base Level
- **Shops Page** — browse shops, view products, add items to cart
- **Shopping Cart Page** — view cart items, adjust quantities, remove products, fill in delivery details (email, phone, address), submit order saved to database
- **Form Validation** — all checkout fields are validated before submission

### Middle Level
- **Product Filtering by Category** — filter products by their actual category field (Burgers, Drinks, Desserts, etc.)
- **Product Sorting** — sort by price (ascending/descending) or alphabetically by name
- **Shop Filtering by Rating** — filter shops by rating range (4.0-5.0, 3.0-4.0, 2.0-3.0)
- **Responsive Design** — all pages support different screen sizes

### Advanced Level
- **Pagination** — products displayed in pages with truncated page numbers for large datasets
- **Reorder Previous Order** — each order in history has a "Reorder" button that adds all products to cart with original quantities and pre-fills delivery details

### Additional Features
- **Order History Page** — look up orders by email and phone number
- **Coupons Page** — view all available coupons with copy-to-clipboard, apply them at checkout for discounts
- **Product Detail Modal** — click any product to view details in a modal with add-to-cart controls
- **Multi-Shop Cart** — cart supports products from different shops in a single order
- **Persistent Cart** — cart saved to localStorage, survives page refreshes
- **Loading Skeletons** — skeleton UI for all loading states
- **Smooth Image Loading** — images fade in with skeleton placeholders while loading

## Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Zustand** (state management with localStorage persistence)

### Backend
- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- Hosted on **Render**

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=https://eliftech-delivery-backend-2ak7.onrender.com
```

## Project Structure

```
app/
├── page.tsx               # Shops page (/)
├── cart/page.tsx           # Shopping cart (/cart)
├── history/page.tsx        # Order history (/history)
├── coupons/page.tsx        # Coupons (/coupons)
└── layout.tsx              # Root layout with header

components/
├── Header.tsx              # Navigation bar
├── CartBadge.tsx           # Cart icon with item count
├── ShopSidebar.tsx         # Shop list + rating filters
├── ProductGrid.tsx         # Product grid with category filter, sort & pagination
├── ProductCard.tsx         # Product card with add/quantity controls
├── ProductModal.tsx        # Product detail modal
├── CartPage.tsx            # Cart page layout
├── CartItem.tsx            # Cart item row
├── CheckoutForm.tsx        # Delivery form + coupon + order summary
├── HistoryPage.tsx         # Order history with search
├── OrderCard.tsx           # Order details card with reorder
├── CouponsPage.tsx         # Coupons listing
├── CouponCard.tsx          # Coupon card with copy button
├── CategoryFilter.tsx      # Category pill buttons
├── ShopPage.tsx            # Shop page orchestrator
└── Skeleton.tsx            # Loading skeleton components

lib/api.ts                 # API client functions
store/cartStore.ts         # Zustand cart store with localStorage persistence
types/index.ts             # TypeScript interfaces
```
