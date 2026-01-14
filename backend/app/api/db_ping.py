from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db

router = APIRouter(tags=["db_ping"])

@router.get("/db/ping")
def db_ping(db: Session = Depends(get_db)):
    db.execute(text("select 1"))
    return {"db": "OK"}
