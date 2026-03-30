# QuickBite - Food Delivery App

A food delivery web application where users can browse shops, add products to cart, and place orders.

**Live Demo:** [https://eliftech-delivery-frontend-nixh.vercel.app/](https://eliftech-delivery-frontend-nixh.vercel.app/)

## Accomplished Level: Middle + Additional Features

### Base Level
- **Shops Page** — browse shops, view products, add items to cart
- **Shopping Cart Page** — view cart items, adjust quantities, remove products, fill in delivery details (email, phone, address), submit order saved to database
- **Form Validation** — all checkout fields are validated before submission

### Middle Level
- **Product Filtering by Category** — filter products by category with pill-style UI controls
- **Product Sorting** — sort by price (ascending/descending) or alphabetically by name
- **Shop Filtering by Rating** — filter shops by rating range (4.0-5.0, 3.0-4.0, 2.0-3.0)

### Additional Features
- **Order History Page** — users can look up their orders by email and phone number
- **Coupons Page** — view all available coupons with copy-to-clipboard, apply them at checkout for discounts
- **Multi-Shop Cart** — cart supports products from different shops in a single order
- **Loading Skeletons** — skeleton UI for all loading states

## Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Zustand** (state management)

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


## Project Structure

```
app/
├── page.tsx              # Shops page (/)
├── cart/page.tsx          # Shopping cart (/cart)
├── history/page.tsx       # Order history (/history)
├── coupons/page.tsx       # Coupons (/coupons)
└── layout.tsx             # Root layout with header

components/
├── Header.tsx             # Navigation bar
├── CartBadge.tsx          # Cart icon with item count
├── ShopSidebar.tsx        # Shop list + rating filters
├── ProductGrid.tsx        # Product grid with category filter & sort
├── ProductCard.tsx        # Product card with add/quantity controls
├── CartPage.tsx           # Cart page layout
├── CartItem.tsx           # Cart item row
├── CheckoutForm.tsx       # Delivery form + coupon + order summary
├── HistoryPage.tsx        # Order history with search
├── OrderCard.tsx          # Order details card
├── CouponsPage.tsx        # Coupons listing
├── CouponCard.tsx         # Coupon card with copy button
├── ShopPage.tsx           # Shop page orchestrator
└── Skeleton.tsx           # Loading skeleton components

lib/api.ts                # API client functions
store/cartStore.ts        # Zustand cart store
types/index.ts            # TypeScript interfaces
```
