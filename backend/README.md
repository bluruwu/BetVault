# ⚙️ BetVault Backend (FastAPI)

The **BetVault Backend** is a high-performance REST API designed for data integrity and high throughput. It manages all betting logic, statistical calculations, and database persistence.

## 🛠️ Tech Stack

- **Python 3.10+**: Robust and feature-rich development environment.
- **FastAPI**: Modern, high-performance web framework for building APIs.
- **SQLAlchemy 2.0+**: Powerful Object-Relational Mapping (ORM) for SQL.
- **Alembic**: Database migration tool for SQLAlchemy.
- **Pydantic v2**: Data validation and settings management using Python type annotations.
- **Supabase (PostgreSQL)**: Scalable relational database for distributed betting data.

## 📁 Architecture Overview

```bash
backend/
├── alembic/        # Database migrations
├── app/            # Core application code
│   ├── api/        # REST API endpoints & routers
│   ├── core/       # Global configuration & security
│   ├── db/         # Session management & engine setup
│   ├── models/     # SQLAlchemy database models
│   ├── schemas/    # Pydantic data validation schemas
│   └── main.py     # FastAPI entry point
└── requirements.txt # Project dependencies
```

## 🚀 Setup & Installation

### 1. Environment Configuration
Create a `.env` file in the `backend/` directory:
```env
SQLALCHEMY_DATABASE_URL="postgresql://user:password@host:port/dbname"
```

### 2. Virtual Environment Setup
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Database Migrations
To update your local or production database to the latest schema:
```bash
alembic upgrade head
```

### 4. Running the Server Locally
```bash
uvicorn app.main:app --reload --port 8000
```

## 📖 API Documentation

Once the server is running, you can access the interactive documentation at:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---
Designed for performance, security, and scalability.
