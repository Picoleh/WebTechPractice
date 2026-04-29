from ..db.session import execute_write, fetch_all
from ..schemas.biomaterial import BiomaterialCreateUpdate

TABLE = "biomaterials_db.biomaterials"
PER_PAGE = 10

# Biomaterials Service
def get_biomaterials_count(sql: str):
    select = sql.find("SELECT")
    from_ = sql.find("FROM")
    columns  = sql[select + 6: from_]
    count_sql = sql.replace(columns, " COUNT(*) AS count ")

    count_result = fetch_all(count_sql)
    return count_result[0]["count"] if count_result else 0


def search_biomaterials(q: str, page: int, selected_types: list[int]):
    offset = (page - 1) * PER_PAGE
    sql = f"SELECT * FROM {TABLE} WHERE name ILIKE '%{q}%'"

    for type in selected_types:
        sql += f" AND type_id = {type}"

    sql_no_limit = sql
    sql += f" LIMIT {PER_PAGE} OFFSET {offset}"

    data = fetch_all(sql)
    return {
        "data": data,
        "meta": {
            "page": page,
            "per_page": PER_PAGE,
            "total": get_biomaterials_count(sql_no_limit),
        },
    }


def get_biomaterials(page: int, selected_types: list[int]):
    offset = (page - 1) * PER_PAGE
    sql = f"SELECT * FROM {TABLE}"
    
    if selected_types:
        sql += " WHERE" + " OR".join([f" type_id = {type}" for type in selected_types])
    
    sql_no_limit = sql
    sql += f" ORDER BY id ASC LIMIT {PER_PAGE} OFFSET {offset}"

    data = fetch_all(sql)

    return {
        "data": data,
        "meta": {
            "page": page,
            "per_page": PER_PAGE,
            "total": get_biomaterials_count(sql_no_limit),
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
        INSERT INTO {TABLE} (name, type_id, description, density, biocompatibility)
        VALUES (:name, :type, :description, :density, :biocompatibility)
    """
    execute_write(sql, biomaterial.model_dump())


def update_biomaterial(id: int, biomaterial: BiomaterialCreateUpdate):
    sql = f"""
        UPDATE {TABLE}
        SET name = :name,
            type_id = :type,
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
