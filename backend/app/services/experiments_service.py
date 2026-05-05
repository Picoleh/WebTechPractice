from ..db.session import execute_write, fetch_all
from ..schemas.experiment import ExperimentCreateUpdate

TABLE = "biomaterials_db.experiments"
PER_PAGE = 14

# Experiments Service
def get_experiments_count(sql: str):
    select = sql.find("SELECT")
    from_ = sql.find("FROM")
    columns  = sql[select + 6: from_]
    count_sql = sql.replace(columns, " COUNT(*) AS count ")

    count_result = fetch_all(count_sql)
    return count_result[0]["count"] if count_result else 0


def search_experiments(q: str, page: int):
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
            "total": get_experiments_count(sql_no_limit),
        },
    }


def get_experiments(page: int):
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
            "total": get_experiments_count(sql_no_limit),
        },
    }


def get_experiment_by_id(id: int):
    sql = f"SELECT * FROM {TABLE} WHERE id = :id"
    results = fetch_all(sql, {"id": id})
    if results:
        return results[0]
    return {"message": "Experiment not found"}


def create_experiment(experiment: ExperimentCreateUpdate):
    sql = f"""
        INSERT INTO {TABLE} (title, objective, description, start_date, end_date, status, biomaterial_id, study_type_id, results)
        VALUES (:title, :objective, :description, :start_date, :end_date, :status, :biomaterial_id, :study_type_id, :results)
    """
    execute_write(sql, experiment.model_dump())


def update_experiment(id: int, experiment: ExperimentCreateUpdate):
    sql = f"""
        UPDATE {TABLE}
        SET title = :title,
            objective = :objective,
            description = :description,
            start_date = :start_date,
            end_date = :end_date,
            status = :status,
            biomaterial_id = :biomaterial_id,
            study_type_id = :study_type_id,
            results = :results
        WHERE id = :id
    """
    params = experiment.model_dump()
    params["id"] = id
    execute_write(sql, params)


def delete_experiment(id: int):
    sql = f"DELETE FROM {TABLE} WHERE id = :id"
    execute_write(sql, {"id": id})

