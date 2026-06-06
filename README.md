
# Boot Handcraft Afghanistan

A production-ready modern e-commerce platform for authentic Afghan handcrafted boots and leather goods.

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat&logo=tailwindcss)

## Features

- **Authentication** — Register, login, logout with JWT and protected routes
- **Products** — Listing, details, categories, search, filters, pagination
- **Shopping Cart** — Add, remove, update quantity, cart summary
- **Checkout** — Shipping info, order review, order placement
- **User Dashboard** — Profile management and order history
- **Admin Dashboard** — Stats, product CRUD, order & user management
- **UI/UX** — Glassmorphism design, dark/light mode, animations, mobile responsive

## Project Structure

```
boot-handcraft-afghanistan/
├── backend/                 # Express.js REST API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/seed.js
│   └── server.js
├── frontend/                # React 19 + Vite SPA
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       └── utils/
├── COMMIT_PLAN.md
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## Installation Guide

### 1. Clone the repository

```bash
git clone https://github.com/your-username/boot-handcraft-afghanistan.git
cd boot-handcraft-afghanistan
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` with your values:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/boot-handcraft
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

Seed the database (optional):

```bash
npm run seed
```

Start the API:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
cp .env.example .env
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Demo Accounts (after seeding)

| Role  | Email                    | Password  |
|-------|--------------------------|-----------|
| Admin | admin@boothandcraft.af   | admin123  |
| User  | demo@boothandcraft.af    | demo123   |

## Environment Variables

### Backend (`backend/.env`)

| Variable      | Description                          |
|---------------|--------------------------------------|
| NODE_ENV      | `development` or `production`        |
| PORT          | Server port (default: 5000)          |
| MONGODB_URI   | MongoDB Atlas connection string      |
| JWT_SECRET    | Secret key for signing JWT tokens    |
| JWT_EXPIRE    | Token expiry (e.g. `7d`)             |
| CLIENT_URL    | Frontend URL for CORS                |

### Frontend (`frontend/.env`)

| Variable       | Description                    |
|----------------|--------------------------------|
| VITE_API_URL   | Backend API base URL           |

## API Endpoints

### Auth
| Method | Endpoint           | Access  |
|--------|--------------------|---------|
| POST   | /api/auth/register | Public  |
| POST   | /api/auth/login    | Public  |
| GET    | /api/auth/me       | Private |
| POST   | /api/auth/logout   | Private |

### Products
| Method | Endpoint              | Access        |
|--------|-----------------------|---------------|
| GET    | /api/products         | Public        |
| GET    | /api/products/:id     | Public        |
| GET    | /api/products/categories | Public     |
| POST   | /api/products         | Admin         |
| PUT    | /api/products/:id     | Admin         |
| DELETE | /api/products/:id     | Admin         |

### Orders
| Method | Endpoint           | Access  |
|--------|--------------------|---------|
| POST   | /api/orders        | Private |
| GET    | /api/orders/my     | Private |
| GET    | /api/orders/:id    | Private |

### Users
| Method | Endpoint            | Access  |
|--------|---------------------|---------|
| PUT    | /api/users/profile  | Private |
| PUT    | /api/users/password | Private |

### Admin
| Method | Endpoint                | Access |
|--------|-------------------------|--------|
| GET    | /api/admin/stats        | Admin  |
| GET    | /api/admin/orders       | Admin  |
| PUT    | /api/admin/orders/:id   | Admin  |
| GET    | /api/admin/users        | Admin  |
| PUT    | /api/admin/users/:id    | Admin  |
| DELETE | /api/admin/users/:id    | Admin  |

## Deployment

### MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user and whitelist IP (`0.0.0.0/0` for cloud deploys)
3. Copy the connection string to `MONGODB_URI`

### Backend — Render

1. Push code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Connect your repo, set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables from `.env.example`
7. Set `CLIENT_URL` to your Vercel frontend URL

### Frontend — Vercel

1. Import project on [vercel.com](https://vercel.com)
2. Set root directory to `frontend`
3. Framework preset: **Vite**
4. Add environment variable: `VITE_API_URL=https://your-api.onrender.com/api`
5. Deploy

## Tech Stack

**Frontend:** React 19, Vite, React Router DOM, Context API, Tailwind CSS, Axios

**Backend:** Node.js, Express.js, MongoDB, JWT, bcrypt

## Security

- Password hashing with bcrypt (12 rounds)
- JWT authentication on protected routes
- Role-based authorization (user / admin)
- Input validation with express-validator
- CORS restricted to client URL

## License

MIT
=======
# web-technologies-final-project
Final Web Technologies Course Project – A Full-Stack E-Commerce Website for Afghan Handcraft Products using React, Express.js, MongoDB, and REST APIs.

Design and preparat by Shabir Ahmad Atash and Shabir ahmad Nooryar
