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


def search_study_types(q: str):
    sql = f"SELECT * FROM {TABLE} WHERE name ILIKE '%{q}%'"

    data = fetch_all(sql)
    return data


def get_study_types():
    sql = f"SELECT * FROM {TABLE}"
    data = fetch_all(sql)
    return data


def get_study_type_by_id(id: int):
    sql = f"SELECT * FROM {TABLE} WHERE id = :id"
    results = fetch_all(sql, {"id": id})
    if results:
        return results[0]
    return {"message": "Study type not found"}


def create_study_type(study_type: StudyTypeCreateUpdate):
    sql = f"""
        INSERT INTO {TABLE} (name, description, level_evidence, added_by)
        VALUES (:name, :description, :level_evidence, :added_by)
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

