from ..db.session import execute_write, fetch_all

def get_roles_data():
    query = """
        SELECT id, name
        FROM biomaterials_db.roles
    """
    return fetch_all(query)