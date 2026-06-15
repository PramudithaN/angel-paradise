# 👼 Angel Paradise

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

> An online platform designed for selling children's clothing with a clean, modern, and responsive interface.

---

## 📸 Preview

**Home Page**
![Preview](https://github.com/PramudithaN/angel-paradise/raw/main/README.md) <!-- Placeholder as no actual screenshot was found in files -->

---

## 📖 About This Project

**Angel Paradise** is a full-stack MERN application tailored for a children's clothing boutique. It offers a seamless shopping experience for customers and a comprehensive administrative suite for business owners. The frontend is built with React and TypeScript for a type-safe, performant UI, while the backend utilizes Express and MongoDB for robust data management. Key highlights include real-time payment processing with Stripe and optimized media handling via Cloudinary.

---

## ✨ Features

- 🚀 **Modern Storefront** - A clean, mobile-first UI styled with Tailwind CSS and Ant Design.
- 🛍️ **Product Catalog** - Browse products by category with features like Quick View and detailed product pages.
- 🛒 **Interactive Shopping Cart** - Efficient cart management powered by React Context API.
- 💳 **Secure Checkout** - Integrated Stripe payment gateway for reliable and safe transactions.
- 🛡️ **Admin Dashboard** - Secure administrative area to manage products, view orders, and update business settings.
- 📊 **Business Analytics** - Data visualization for sales and customer trends.
- 💬 **Customer Reviews** - Integrated system for product feedback and ratings.
- ☁️ **Cloud Media** - Automated image uploads and optimization using Cloudinary.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | [React 18.3](https://reactjs.org/) |
| **Backend Framework** | [Express 4.19](https://expressjs.com/) |
| **UI Components** | [Ant Design](https://ant.design/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Database** | [MongoDB / Mongoose](https://www.mongodb.com/) |
| **Payments** | [Stripe](https://stripe.com/) |
| **Media Handling** | [Cloudinary](https://cloudinary.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Development** | [Vite](https://vitejs.dev/) |

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) **v18.0 or higher**
- [pnpm](https://pnpm.io/) (recommended) or [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) account or local instance
- [Stripe](https://stripe.com/) account for API keys
- [Cloudinary](https://cloudinary.com/) account for image storage

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PramudithaN/angel-paradise.git
cd angel-paradise
```

### 2. Install dependencies

Install root and backend dependencies:

```bash
pnpm install
cd mern-backend && npm install
cd ..
```

### 3. Set up environment variables

Create a `.env` file in the `mern-backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

*Note: Update `src/stripeKey.ts` with your Stripe Publishable Key.*

### 4. Start the development servers

**Start the Backend:**
```bash
cd mern-backend
pnpm dev
```

**Start the Frontend (in a new terminal):**
```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Available Scripts

### Frontend (Root)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Starts the Vite development server |
| `pnpm build` | Builds the application for production |
| `pnpm lint` | Runs ESLint to check for code issues |
| `pnpm preview` | Locally previews the production build |

### Backend (`mern-backend/`)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Starts the backend server with `ts-node-dev` (auto-reload) |
| `pnpm build` | Compiles TypeScript to JavaScript |
| `pnpm start` | Runs the compiled backend server |

---

## 📁 Project Structure

```
angel-paradise/
├── mern-backend/              # Node.js Express Backend
│   ├── src/
│   │   ├── models/            # Mongoose schemas
│   │   ├── routes/            # API endpoints
│   │   └── utils/             # Cloudinary & Multer config
│   ├── Dockerfile             # Backend containerization
│   └── package.json
├── src/                       # React Frontend
│   ├── components/            # Reusable UI elements
│   ├── contexts/              # Auth & Cart State
│   ├── pages/                 # Main pages & Admin views
│   ├── data/                  # Static assets/mock data
│   ├── utils/                 # Frontend helpers
│   └── App.tsx                # Main App component
├── tailwind.config.js         # Styling configuration
└── vite.config.ts             # Build tool configuration
```

---

## 🙋‍♂️ Connect with Me

- **GitHub**: [PramudithaN](https://github.com/PramudithaN)
- **LinkedIn**: [Pramuditha Nadun](https://linkedin.com/in/pramuditha-nadun-612b1b204)
- **Email**: [pramudithanadun@gmail.com](mailto:pramudithanadun@gmail.com)

---

*Developed with ❤️ by Pramuditha Nadun.*
