from fastapi import APIRouter, Query

from ..schemas.user import UserCreateUpdate
from ..services.users_service import (
    get_user_by_keycloak_id,
    create_user
)

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/sync", summary="Sync a user", tags=["Post"])
async def sync_user_route(user: UserCreateUpdate):
    r = get_user_by_keycloak_id(user.keycloak_id)

    if r:
        return {"message": "User already exists"}
    create_user(user)
    return {"message": "User synced successfully"}