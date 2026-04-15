from ..db.session import execute_write, fetch_all
from ..schemas.biomaterial import BiomaterialCreateUpdate

TABLE = "biomaterials_db.biomaterials"
PER_PAGE = 3


def search_biomaterials(q: str):
    sql = f"SELECT * FROM {TABLE} WHERE name ILIKE :query OR type ILIKE :query"
    return fetch_all(sql, {"query": f"%{q}%"})


def get_biomaterials(page: int):
    offset = (page - 1) * PER_PAGE
    data_sql = f"SELECT * FROM {TABLE} LIMIT :limit OFFSET :offset"
    count_sql = f"SELECT COUNT(*) AS count FROM {TABLE}"

    data = fetch_all(data_sql, {"limit": PER_PAGE, "offset": offset})
    count_result = fetch_all(count_sql)

    return {
        "data": data,
        "meta": {
            "page": page,
            "per_page": PER_PAGE,
            "total": count_result[0]["count"] if count_result else 0,
        },
    }


def get_biomaterial_by_id(id: int):
    sql = f"SELECT * FROM {TABLE} WHERE id = :id"
    results = fetch_all(sql, {"id": id})
    if results:
        return results[0]
    return {"message": "Biomaterial not found"}


def create_biomaterial(biomaterial: BiomaterialCreateUpdate):
    sql = f"""
        INSERT INTO {TABLE} (name, type, description, density, biocompatibility)
        VALUES (:name, :type, :description, :density, :biocompatibility)
    """
    execute_write(sql, biomaterial.model_dump())


def update_biomaterial(id: int, biomaterial: BiomaterialCreateUpdate):
    sql = f"""
        UPDATE {TABLE}
        SET name = :name,
            type = :type,
            description = :description,
            density = :density,
            biocompatibility = :biocompatibility
        WHERE id = :id
    """
    params = biomaterial.model_dump()
    params["id"] = id
    execute_write(sql, params)


def delete_biomaterial(id: int):
    sql = f"DELETE FROM {TABLE} WHERE id = :id"
    execute_write(sql, {"id": id})
