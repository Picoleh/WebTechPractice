from ..db.session import execute_write, fetch_all
from ..schemas.biomaterial import BiomaterialType

TABLE = "biomaterials_db.biomaterial_type"

def get_biomaterial_types():
    sql = f"SELECT * FROM {TABLE}"
    results = fetch_all(sql)

    return results if results else []