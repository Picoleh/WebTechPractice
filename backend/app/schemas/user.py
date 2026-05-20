from pydantic import BaseModel


class UserCreateUpdate(BaseModel):
    keycloak_id: str
    username: str
    first_name: str
    last_name: str
    email: str
    img_path: str | None = None
    