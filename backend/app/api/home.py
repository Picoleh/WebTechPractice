from fastapi import APIRouter

from ..services.home import get_home_data

router = APIRouter(prefix="", tags=["home"])

@router.get("/")
async def root():
    return get_home_data()