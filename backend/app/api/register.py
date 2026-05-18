from fastapi import APIRouter

from ..services.register_service import get_roles_data

router = APIRouter(prefix="/register", tags=["register"])

# @router.get("")
# async def root():
#     return get_home_data()

@router.get("/roles")
async def get_roles():
    return get_roles_data()