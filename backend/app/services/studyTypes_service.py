from ..db.session import execute_write, fetch_all
from ..schemas.studyType import StudyTypeCreateUpdate

TABLE = "biomaterials_db.study_type"
PER_PAGE = 14

# Study Types Service
def get_study_types_count(sql: str):
    select = sql.find("SELECT")
    from_ = sql.find("FROM")
    columns  = sql[select + 6: from_]
    count_sql = sql.replace(columns, " COUNT(*) AS count ")

    count_result = fetch_all(count_sql)
    return count_result[0]["count"] if count_result else 0


def search_study_types(q: str, page: int, limit: int = None):
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
            "total": get_study_types_count(sql_no_limit),
        },
    }


def get_study_types(page: int, limit: int = None):
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
            "total": get_study_types_count(sql_no_limit),
        },
    }


def get_study_type_by_id(id: int):
    sql = f"SELECT * FROM {TABLE} WHERE id = :id"
    results = fetch_all(sql, {"id": id})
    if results:
        return results[0]
    return {"message": "Study type not found"}


def create_study_type(study_type: StudyTypeCreateUpdate):
    sql = f"""
        INSERT INTO {TABLE} (name, description, level_evidence)
        VALUES (:name, :description, :level_evidence)
    """
    execute_write(sql, study_type.model_dump())


def update_study_type(id: int, study_type: StudyTypeCreateUpdate):
    sql = f"""
        UPDATE {TABLE}
        SET name = :name,
            description = :description,
            level_evidence = :level_evidence
        WHERE id = :id
    """
    params = study_type.model_dump()
    params["id"] = id
    execute_write(sql, params)


def delete_study_type(id: int):
    sql = f"DELETE FROM {TABLE} WHERE id = :id"
    execute_write(sql, {"id": id})

