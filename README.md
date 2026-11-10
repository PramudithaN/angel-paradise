# Angel Paradise

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)

> A modern e-commerce storefront and administrative platform tailored for children's fashion and accessories.

---

## About This Project

Angel Paradise is a full-stack e-commerce web application engineered for an artisanal children's clothing boutique. The platform combines an editorial storefront with an administrative management suite. The frontend is built with React 18, TypeScript, and Tailwind CSS, featuring an Heirloom Boutique design system, slide-over cart drawer, and responsive product filtering. The backend is powered by Node.js Express and MongoDB, featuring automated initial data seeding and fallback database handling for development environments.

---

## Features

- Boutique Storefront: A responsive, mobile-first shopping interface designed with editorial typography (Playfair Display and Plus Jakarta Sans) and soft organic hues.
- Product Catalog and Filtering: Interactive catalog supporting category tabs, age and size filters, price sliders, and keyword search.
- Quick View and Sizing Guides: Modal-based quick product exploration with embedded age-to-weight sizing charts.
- Cart and State Architecture: Persistent shopping cart with composite variant keying to prevent SKU collisions across sizes and colors.
- Slide-Over Cart Drawer: Real-time bag drawer allowing instant quantity adjustments, item removals, and subtotal calculations.
- Multi-Channel Checkout: Two-column checkout capturing recipient details, shipping destinations, and optional gift-wrap notes.
- Administrative Suite: Protected dashboard to manage product inventories, monitor customer orders, review business telemetry, and configure contact settings.
- Cloud Media Integration: Automated image upload pipeline powered by Cloudinary and Multer.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | [React 18.3](https://reactjs.org/) |
| Backend Framework | [Express 4.19](https://expressjs.com/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Database | [MongoDB / Mongoose](https://www.mongodb.com/) |
| Payments | [Stripe](https://stripe.com/) |
| Media Storage | [Cloudinary](https://cloudinary.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Build Tool | [Vite](https://vitejs.dev/) |

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18.0 or higher
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PramudithaN/angel-paradise.git
cd angel-paradise
```

### 2. Install dependencies

```bash
pnpm install
cd mern-backend && npm install
cd ..
```

### 3. Environment configuration

Create a `.env` file in the `mern-backend/` directory if connecting to a remote MongoDB Atlas cluster:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

*Note: If no `MONGO_URI` is provided, the backend automatically initializes an integrated in-memory MongoDB engine with pre-seeded boutique products for immediate development.*

### 4. Start the development servers

Start the backend:
```bash
cd mern-backend
npm run dev
```

Start the frontend (in a separate terminal):
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

### Frontend (Project Root)

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the Vite development server on port 5173 |
| `npm run build` | Compiles TypeScript and builds production bundles |
| `npm run lint` | Executes ESLint across the codebase |
| `npm run preview` | Previews the production build locally |

### Backend (`mern-backend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the backend with ts-node-dev and auto-reload |
| `npm run build` | Compiles backend TypeScript to JavaScript |
| `npm run start` | Runs the compiled server from `dist/` |

---

## Project Structure

```
angel-paradise/
├── mern-backend/              # Express API and Database Layer
│   ├── src/
│   │   ├── models/            # Mongoose data schemas (Product, Order, Review)
│   │   ├── routes/            # API route controllers
│   │   ├── utils/             # Cloudinary upload helpers
│   │   ├── seed.ts            # Default product and business data seeder
│   │   └── index.ts           # Server entrypoint and database connection
│   └── package.json           # Backend dependency manifest
├── public/
│   └── favicon.svg            # Custom boutique SVG favicon
├── src/                       # React Frontend
│   ├── components/            # UI components (Header, Footer, CartDrawer, ProductCard)
│   ├── contexts/              # Global state (CartContext, AuthContext)
│   ├── data/                  # Static product data and fallback collections
│   ├── pages/                 # Application routes (HomePage, ShopPage, ProductPage, PaymentPage)
│   ├── utils/                 # Utility functions and sweetalert helpers
│   ├── App.tsx                # Main application routing
│   ├── index.css              # Global styles and custom scrollbar
│   └── main.tsx               # Client entrypoint
├── index.html                 # HTML template and Google Fonts
├── tailwind.config.js         # Design tokens, color palette, and font definitions
└── vite.config.ts             # Vite build configuration
```

---

## Connect with Me

- GitHub: [PramudithaN](https://github.com/PramudithaN)
- LinkedIn: [Pramuditha Nadun](https://linkedin.com/in/pramuditha-nadun-612b1b204)
- Email: [pramudithanadun@gmail.com](mailto:pramudithanadun@gmail.com)

---

Developed by Pramuditha Nadun.
