from ..db.session import execute_write, fetch_all
from ..schemas.user import UserCreateUpdate

TABLE = "biomaterials_db.users"

def get_user_by_keycloak_id(keycloak_id: str):
    sql = f"SELECT * FROM {TABLE} WHERE keycloak_id = :keycloak_id"
    results = fetch_all(sql, {"keycloak_id": keycloak_id})
    if results:
        return results[0]
    return None

def update_user(user: UserCreateUpdate):
    hasImage = ""
    if user.img_path and user.img_path != "":
        hasImage = ", img_path = :img_path"
    sql = f"UPDATE {TABLE} SET username = :username, first_name = :first_name, last_name = :last_name, email = :email {hasImage} WHERE keycloak_id = :keycloak_id"
    execute_write(sql, params=user.model_dump())

def create_user(user: UserCreateUpdate):
    sql = f"INSERT INTO {TABLE} (keycloak_id, username, first_name, last_name, email, img_path) VALUES (:keycloak_id, :username, :first_name, :last_name, :email, :img_path)"
    execute_write(sql, params=user.model_dump())