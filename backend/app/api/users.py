from fastapi import APIRouter, Query

from ..schemas.user import UserCreateUpdate
from ..services.users_service import (
    get_user_by_keycloak_id,
    create_user,
    update_user,
    verify_email
)

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/sync", summary="Sync a user", tags=["Post"])
async def sync_user_route(user: UserCreateUpdate):
    r = get_user_by_keycloak_id(user.keycloak_id)

    if r:
        update_user(user)
    else:
        create_user(user)
    return {"message": "User synced successfully"}

@router.get("/me", summary="Get current user", tags=["Get"])
async def get_current_user_route(keycloak_id: str = Query(..., description="Keycloak ID of the user")):
    r = get_user_by_keycloak_id(keycloak_id)

    if not r:
        return {"message": "User not found"}
    return r

@router.get("/verify-email", summary="Send email verification", tags=["Get"])
async def verify_email_route(keycloak_id: str = Query(..., description="Keycloak ID of the user")):
    verify_email(keycloak_id)
    return {"message": "Verification email sent successfully"}