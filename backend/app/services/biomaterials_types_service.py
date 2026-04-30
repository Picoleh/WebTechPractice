from ..db.session import execute_write, fetch_all
from ..schemas.biomaterial import BiomaterialType

TABLE = "biomaterials_db.biomaterial_type"
PER_PAGE = 3

def get_biomaterial_types_count(sql: str):
    select = sql.find("SELECT")
    from_ = sql.find("FROM")
    columns  = sql[select + 6: from_]
    count_sql = sql.replace(columns, " COUNT(*) AS count ")

    count_result = fetch_all(count_sql)
    return count_result[0]["count"] if count_result else 0


def get_biomaterial_types(page: int):
    offset = (page - 1) * PER_PAGE

    sql = f"SELECT * FROM {TABLE}"
    sql_no_limit = sql
    sql += f" ORDER BY id ASC LIMIT {PER_PAGE} OFFSET {offset}"

    data = fetch_all(sql)

    return {
        "data": data,
        "meta": {
            "page": page,
            "per_page": PER_PAGE,
            "total": get_biomaterial_types_count(sql_no_limit),
        },
    }

def search_biomaterial_types(q: str, page: int):
    offset = (page - 1) * PER_PAGE
    sql = f"SELECT * FROM {TABLE} WHERE name ILIKE '%{q}%'"

    sql_no_limit = sql
    sql += f" LIMIT {PER_PAGE} OFFSET {offset}"

    data = fetch_all(sql)
    return {
        "data": data,
        "meta": {
            "page": page,
            "per_page": PER_PAGE,
            "total": get_biomaterial_types_count(sql_no_limit),
        },
    }

def create_biomaterial_type(biomaterial_type: BiomaterialType):
    sql = f"""
        INSERT INTO {TABLE} (name, description)
        VALUES (:name, :description)
    """
    execute_write(sql, biomaterial_type.model_dump())

def update_biomaterial_type(id: int, biomaterial_type: BiomaterialType):
    sql = f"""
        UPDATE {TABLE}
        SET name = :name,
            description = :description
        WHERE id = :id
    """
    params = biomaterial_type.model_dump()
    params["id"] = id
    execute_write(sql, params)

def delete_biomaterial_type(id: int):
    sql = f"DELETE FROM {TABLE} WHERE id = :id"
    execute_write(sql, {"id": id})
