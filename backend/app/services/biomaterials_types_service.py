from ..db.session import execute_write, fetch_all
from ..schemas.biomaterial import BiomaterialType

TABLE = "biomaterials_db.biomaterial_type"

def get_biomaterial_types(conditional: str = ""):
    sql = f"SELECT * FROM {TABLE}"
    if conditional:
        sql += f" WHERE {conditional}"
    results = fetch_all(sql)

    return results if results else []