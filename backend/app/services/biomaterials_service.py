from ..db.session import execute_write, fetch_all
from ..schemas.biomaterial import BiomaterialCreateUpdate

TABLE = "biomaterials_db.biomaterials"
PER_PAGE = 10

def get_biomaterials_count(sql: str):
    select = sql.find("SELECT")
    from_ = sql.find("FROM")
    columns  = sql[select + 6: from_]
    count_sql = sql.replace(columns, " COUNT(*) AS count ")

    count_result = fetch_all(count_sql)
    return count_result[0]["count"] if count_result else 0

def get_biomaterial_types(conditional: str = ""):
    sql = f"SELECT DISTINCT type FROM {TABLE}"
    if conditional:
        sql += f" WHERE {conditional}"
    results = fetch_all(sql)
    return [row["type"] for row in results] if results else []

def search_biomaterials(q: str, page: int, selected_types: list[str]):
    offset = (page - 1) * PER_PAGE
    sql = f"SELECT * FROM {TABLE} WHERE name ILIKE '%{q}%' OR type ILIKE '%{q}%'"

    for type in selected_types:
        sql += f" AND type = '{type}'"

    sql_no_limit = sql
    sql += f" LIMIT {PER_PAGE} OFFSET {offset}"

    data = fetch_all(sql)
    return {
        "data": data,
        "meta": {
            "page": page,
            "per_page": PER_PAGE,
            "total": get_biomaterials_count(sql_no_limit),
            "types": get_biomaterial_types(f"name ILIKE '%{q}%' OR type ILIKE '%{q}%'")
        },
    }


def get_biomaterials(page: int, selected_types: list[str]):
    offset = (page - 1) * PER_PAGE
    sql = f"SELECT * FROM {TABLE}"
    
    if selected_types:
        sql += " WHERE" + " OR".join([f" type = '{type}'" for type in selected_types])
    
    sql_no_limit = sql
    sql += f" ORDER BY id ASC LIMIT {PER_PAGE} OFFSET {offset}"

    data = fetch_all(sql)

    return {
        "data": data,
        "meta": {
            "page": page,
            "per_page": PER_PAGE,
            "total": get_biomaterials_count(sql_no_limit),
            "types": get_biomaterial_types()
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
