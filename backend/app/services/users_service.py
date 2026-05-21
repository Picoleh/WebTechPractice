from ..db.session import execute_write, fetch_all
from ..schemas.user import UserCreateUpdate
import requests

TABLE = "biomaterials_db.users"
KEYCLOAK_URL = "http://keycloak:8080"
REALM = "biomaterials"
CLIENT_ID = "backend-admin"
CLIENT_SECRET = "pGXifYumeicpSMXMOUKa9AmlQJajdD0X"

def get_admin_token():
    url = f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/token"

    response = requests.post(
        url,
        data={
            "grant_type": "client_credentials",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
        },
        headers={
            "Content-Type": "application/x-www-form-urlencoded"
        }
    )

    response.raise_for_status()

    return response.json()["access_token"]

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

def verify_email(user_id: str):
    token = get_admin_token()

    url = f"{KEYCLOAK_URL}/admin/realms/{REALM}/users/{user_id}/send-verify-email"

    response = requests.put(
        url,
        headers={
            "Authorization": f"Bearer {token}"
        }
    )

    response.raise_for_status()