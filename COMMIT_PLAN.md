# Git Commit Plan

Follow this sequence when initializing the repository. Each commit should be atomic and focused.

## Phase 1: Project Foundation

```bash
git init
git add .gitignore README.md COMMIT_PLAN.md
git commit -m "chore: initialize project with documentation"
```

## Phase 2: Backend Core

```bash
git add backend/package.json backend/.env.example backend/.gitignore
git add backend/config/ backend/models/
git commit -m "feat(backend): add database models and configuration"
```

```bash
git add backend/middleware/ backend/utils/
git commit -m "feat(backend): add auth middleware, validation, and JWT utilities"
```

```bash
git add backend/controllers/
git commit -m "feat(backend): implement API controllers for auth, products, orders, users, admin"
```

```bash
git add backend/routes/ backend/server.js
git commit -m "feat(backend): add REST API routes and Express server"
```

```bash
git add backend/scripts/seed.js
git commit -m "feat(backend): add database seed script with sample products"
```

## Phase 3: Frontend Foundation

```bash
git add frontend/package.json frontend/vite.config.js frontend/index.html
git add frontend/.env.example frontend/.gitignore frontend/vercel.json frontend/public/
git commit -m "chore(frontend): scaffold Vite + React 19 project"
```

```bash
git add frontend/src/index.css frontend/src/main.jsx frontend/src/api/
git add frontend/src/utils/ frontend/src/constants/
git commit -m "feat(frontend): add Tailwind styles, API client, and utilities"
```

## Phase 4: State Management

```bash
git add frontend/src/context/ frontend/src/hooks/
git commit -m "feat(frontend): add Auth, Cart, and Theme context with custom hooks"
```

## Phase 5: UI Components

```bash
git add frontend/src/components/
git commit -m "feat(frontend): add reusable UI components with glassmorphism design"
```

## Phase 6: Pages & Routing

```bash
git add frontend/src/pages/HomePage.jsx frontend/src/pages/ProductsPage.jsx
git add frontend/src/pages/ProductDetailPage.jsx frontend/src/pages/CartPage.jsx
git commit -m "feat(frontend): add shop, product detail, and cart pages"
```

```bash
git add frontend/src/pages/CheckoutPage.jsx frontend/src/pages/LoginPage.jsx
git add frontend/src/pages/RegisterPage.jsx frontend/src/pages/DashboardPage.jsx
git commit -m "feat(frontend): add checkout, auth, and user dashboard pages"
```

```bash
git add frontend/src/pages/admin/ frontend/src/App.jsx
git commit -m "feat(frontend): add admin dashboard with product, order, and user management"
```

## Phase 7: Final Polish

```bash
# After testing locally
git add .
git commit -m "docs: finalize README with deployment and API documentation"
```

## Recommended Branch Strategy

| Branch      | Purpose                          |
|-------------|----------------------------------|
| `main`      | Production-ready code            |
| `develop`   | Integration branch               |
| `feature/*` | Individual features              |

## Tags (after first release)

```bash
git tag -a v1.0.0 -m "Initial release - Boot Handcraft Afghanistan e-commerce platform"
git push origin v1.0.0
```
