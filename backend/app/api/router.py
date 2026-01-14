from fastapi import APIRouter
from app.api.health import router as health_router
from app.api.db_ping import router as db_ping
api_router = APIRouter()
api_router.include_router(health_router)
api_router.include_router(db_ping)

