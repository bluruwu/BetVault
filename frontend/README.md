# ✨ BetVault Frontend (React + Vite)

The **BetVault Frontend** is a modern, responsive, and performance-oriented web dashboard for managing betting performance. It prioritizes user experience with instant loading and seamless data synchronization.

## 🛠️ Tech Stack

- **React 19**: Leveraging the latest React features for efficient UI rendering.
- **Vite**: Ultra-fast build tool and development server.
- **TailwindCSS**: Utility-first CSS framework for custom, premium UI components.
- **TanStack Query V5 (React Query)**: Advanced state and cache management.
- **Persistence Layer**: LocalStorage-backed caching for an "instant-on" experience (no skeletons on page reloads).
- **React Hook Form + Zod**: Type-safe form management and validation.

## 📁 Architecture Overview

```bash
frontend/
├── src/
│   ├── app/            # Query client & global configuration
│   ├── features/       # Feature-based organization (Bets, Stats)
│   ├── pages/          # Full-page components & routing
│   ├── routes/         # Application routing logic
│   ├── utils/          # Shared utilities (Formatting, API)
│   └── main.tsx        # Entry point
└── index.html          # HTML template
```

## 🚀 Key Implementation Details

### ⚡ Professional Loading States
Instead of generic spinners, BetVault use **Skeleton UI** components that match the actual card layout. This reduces visual "jumping" and improves perceived performance.

### 🔄 Auto-Sync Architecture
We use a **Cache Invalidation** strategy. When a new bet is created or updated, the system automatically invalidates the related queries (`["bets"]`, `["bet-stats"]`). This ensures the UI is always perfectly in sync with the backend without manual refreshes.

### 💾 Persistence Strategy
By using the `@tanstack/query-async-storage-persister`, the application saves its internal state to the browser's `LocalStorage`. This means that even after a full page refresh (F5), the dashboard displays the last known data instantly while it fetches fresh updates in the background.

## 🏁 Setup & Installation

### 1. Environment Configuration
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL="http://localhost:8000"
```

### 2. Dependency Installation
```bash
npm install
```

### 3. Local Development
```bash
npm run dev
```

---
Built with a focus on UI excellence and state-of-the-art performance.
