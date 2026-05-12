from ..db.session import execute_write, fetch_all
from ..schemas.biomaterial import BiomaterialCreateUpdate

TABLE = "biomaterials_db.biomaterials"
PER_PAGE = 12

# Biomaterials Service
def get_biomaterials_count(sql: str):
    select = sql.find("SELECT")
    from_ = sql.find("FROM")
    columns  = sql[select + 6: from_]
    count_sql = sql.replace(columns, " COUNT(*) AS count ")

    count_result = fetch_all(count_sql)
    return count_result[0]["count"] if count_result else 0


def search_biomaterials(q: str, selected_types: list[int]):
    sql = f"SELECT * FROM {TABLE} WHERE name ILIKE '%{q}%'"

    for type in selected_types:
        sql += f" AND type_id = {type}"

    data = fetch_all(sql)
    return data


def get_biomaterials(selected_types: list[int]):
    sql = f"SELECT * FROM {TABLE}"

    data = fetch_all(sql)

    return data


def get_biomaterial_by_id(id: int):
    sql = f"SELECT * FROM {TABLE} WHERE id = :id"
    results = fetch_all(sql, {"id": id})
    if results:
        return results[0]
    return {"message": "Biomaterial not found"}


def create_biomaterial(biomaterial: BiomaterialCreateUpdate):
    sql = f"""
        INSERT INTO {TABLE} (name, type_id, description, density, biocompatibility, img_path)
        VALUES (:name, :type_id, :description, :density, :biocompatibility, :img_path)
    """
    execute_write(sql, biomaterial.model_dump())


def update_biomaterial(id: int, biomaterial: BiomaterialCreateUpdate):
    sql = f"""
        UPDATE {TABLE}
        SET name = :name,
            type_id = :type_id,
            description = :description,
            density = :density,
            biocompatibility = :biocompatibility,
            img_path = :img_path
        WHERE id = :id
    """
    params = biomaterial.model_dump()
    params["id"] = id
    execute_write(sql, params)


def delete_biomaterial(id: int):
    sql = f"DELETE FROM {TABLE} WHERE id = :id"
    execute_write(sql, {"id": id})

