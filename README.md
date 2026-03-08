# 🛡️ BetVault

**BetVault** is a professional-grade betting tracking and analytics platform. It allows users to record their sports betting history, analyze their performance with real-time statistics (ROI, Win Rate, Profit), and manage their bankroll with data-driven insights.

## 🚀 Key Features

- **Personalized Tracking**: Detailed recording of bets (Market type, target scope, selection, odds, strike).
- **Real-time Analytics**: Instant calculation of Net Profit, ROI, Win Rate, and Streaks.
- **Modern UI/UX**: Dark-themed, responsive interface with professional skeleton loaders and smooth transitions.
- **Advanced State Management**: Powered by **TanStack Query V5** with LocalStorage persistence (instant loads even after refresh).
- **Scalable Architecture**: Robust FastAPI backend with PostgreSQL/Supabase.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: TailwindCSS
- **State/Caching**: TanStack Query V5
- **Forms**: React Hook Form + Zod

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Database**: PostgreSQL (Supabase)
- **ORM**: SQLAlchemy + Alembic (Migrations)
- **Validation**: Pydantic v2

## 📂 Project Structure

```bash
BetVault/
├── frontend/    # React/Vite application
├── backend/     # FastAPI/SQLAlchemy server
└── (global)     # Project management (README, .gitignore)
```

## 🏁 Quick Start

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- PostgreSQL (or Supabase URL)

### Implementation
For detailed instructions on setting up each component, please refer to their respective documentation:

- [Frontend Documentation](frontend/README.md)
- [Backend Documentation](backend/README.md)

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---
Developed by **[@Bluruwu](https://github.com/Bluruwu)**.