from ..db.session import execute_write, execute_write_returning_id, fetch_all
from ..schemas.experiment import ExperimentCreateUpdate

TABLE = "biomaterials_db.experiments"
TABLE_EXPERIMENT_RESEARCH_TECH = "biomaterials_db.experiments_technologies"
PER_PAGE = 14

# Experiments Service
def get_experiments_count(sql: str):
    select = sql.find("SELECT")
    from_ = sql.find("FROM")
    columns  = sql[select + 6: from_]
    count_sql = sql.replace(columns, " COUNT(*) AS count ")

    count_result = fetch_all(count_sql)
    return count_result[0]["count"] if count_result else 0


def search_experiments(q: str, page: int, limit: int = None):
    page_size = limit if limit and limit > 0 else PER_PAGE
    offset = (page - 1) * page_size
    sql = f"SELECT * FROM {TABLE} WHERE title ILIKE '%{q}%'"

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
            "total": get_experiments_count(sql_no_limit),
        },
    }


def get_experiments(page: int, limit: int = None):
    page_size = limit if limit and limit > 0 else PER_PAGE
    offset = (page - 1) * page_size
    sql = f"SELECT exp.*, ARRAY_AGG(ert.technology_id) AS research_tech_ids FROM {TABLE} exp LEFT JOIN {TABLE_EXPERIMENT_RESEARCH_TECH} ert ON exp.id = ert.experiment_id GROUP BY exp.id"
    
    sql_no_limit = sql
    sql += " ORDER BY exp.id ASC"
    
    # If limit is -1 or 0, return all without pagination
    if not (limit and (limit == -1 or limit == 0)):
        sql += f" LIMIT {page_size} OFFSET {offset}"

    data = fetch_all(sql)

    return {
        "data": data,
        "meta": {
            "page": page,
            "per_page": page_size,
            "total": get_experiments_count(sql_no_limit),
        },
    }


def get_experiment_by_id(id: int):
    sql = f"SELECT exp.*, ARRAY_AGG(ert.technology_id) AS research_tech_ids FROM {TABLE} exp LEFT JOIN {TABLE_EXPERIMENT_RESEARCH_TECH} ert ON exp.id = ert.experiment_id WHERE exp.id = :id GROUP BY exp.id"
    results = fetch_all(sql, {"id": id})
    if results:
        return results[0]
    return {"message": "Experiment not found"}


def create_experiment(experiment: ExperimentCreateUpdate):
    sql = f"""
        INSERT INTO {TABLE} (title, objective, description, start_date, end_date, status, biomaterial_id, study_type_id, results)
        VALUES (:title, :objective, :description, :start_date, :end_date, :status, :biomaterial_id, :study_type_id, :results)
        RETURNING id
    """
    row = execute_write_returning_id(sql, experiment.model_dump())

    for tech_id in experiment.research_tech_ids:
        sql = f"INSERT INTO {TABLE_EXPERIMENT_RESEARCH_TECH} (experiment_id, technology_id) VALUES (:exp_id, :tech_id)"
        execute_write(sql, {"exp_id": row[0], "tech_id": tech_id})


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

    sql = f"DELETE FROM {TABLE_EXPERIMENT_RESEARCH_TECH} WHERE experiment_id = :id"
    execute_write(sql, {"id": id})

    for tech_id in experiment.research_tech_ids:
        sql = f"INSERT INTO {TABLE_EXPERIMENT_RESEARCH_TECH} (experiment_id, technology_id) VALUES (:exp_id, :tech_id)"
        execute_write(sql, {"tech_id": tech_id, "exp_id": id})


def delete_experiment(id: int):
    sql = f"DELETE FROM {TABLE_EXPERIMENT_RESEARCH_TECH} WHERE experiment_id = :id"
    execute_write(sql, {"id": id})

    sql = f"DELETE FROM {TABLE} WHERE id = :id"
    execute_write(sql, {"id": id})

