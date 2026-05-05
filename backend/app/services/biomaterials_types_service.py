from ..db.session import execute_write, fetch_all
from ..schemas.biomaterial import BiomaterialType

TABLE = "biomaterials_db.biomaterial_type"
PER_PAGE = 14

def get_biomaterial_types_count(sql: str):
    select = sql.find("SELECT")
    from_ = sql.find("FROM")
    columns  = sql[select + 6: from_]
    count_sql = sql.replace(columns, " COUNT(*) AS count ")

    count_result = fetch_all(count_sql)
    return count_result[0]["count"] if count_result else 0


def get_biomaterial_types(page: int, limit: int = None):
    page_size = limit if limit and limit > 0 else PER_PAGE
    offset = (page - 1) * page_size

    sql = f"SELECT * FROM {TABLE}"
    sql_no_limit = sql
    sql += " ORDER BY id ASC"
    
    # If limit is -1 or 0, return all without pagination
    if not (limit and (limit == -1 or limit == 0)):
        sql += f" LIMIT {page_size} OFFSET {offset}"

    data = fetch_all(sql)

    return {
        "data": data,
        "meta": {
            "page": page,
            "per_page": page_size,
            "total": get_biomaterial_types_count(sql_no_limit),
        },
    }

def search_biomaterial_types(q: str, page: int, limit: int = None):
    page_size = limit if limit and limit > 0 else PER_PAGE
    offset = (page - 1) * page_size
    sql = f"SELECT * FROM {TABLE} WHERE name ILIKE '%{q}%'"

    sql_no_limit = sql
    
    # If limit is -1 or 0, return all without pagination
    if not (limit and (limit == -1 or limit == 0)):
        sql += f" LIMIT {page_size} OFFSET {offset}"

    data = fetch_all(sql)
    return {
        "data": data,
        "meta": {
            "page": page,
            "per_page": page_size,
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
