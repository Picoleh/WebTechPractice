from ..db.session import execute_write, fetch_all
from ..schemas.researchTech import ResearchTechCreateUpdate

TABLE = "biomaterials_db.research_technologies"
PER_PAGE = 10

# Research Technologies Service
def get_research_technologies_count(sql: str):
    select = sql.find("SELECT")
    from_ = sql.find("FROM")
    columns  = sql[select + 6: from_]
    count_sql = sql.replace(columns, " COUNT(*) AS count ")

    count_result = fetch_all(count_sql)
    return count_result[0]["count"] if count_result else 0


def search_research_technologies(q: str, page: int):
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
            "total": get_research_technologies_count(sql_no_limit),
        },
    }


def get_research_technologies(page: int):
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
            "total": get_research_technologies_count(sql_no_limit),
        },
    }


def get_research_technology_by_id(id: int):
    sql = f"SELECT * FROM {TABLE} WHERE id = :id"
    results = fetch_all(sql, {"id": id})
    if results:
        return results[0]
    return {"message": "Research technology not found"}


def create_research_technology(research_tech: ResearchTechCreateUpdate):
    sql = f"""
        INSERT INTO {TABLE} (name, description, cost_level)
        VALUES (:name, :description, :cost_level)
    """
    execute_write(sql, research_tech.model_dump())


def update_research_technology(id: int, research_tech: ResearchTechCreateUpdate):
    sql = f"""
        UPDATE {TABLE}
        SET name = :name,
            description = :description,
            cost_level = :cost_level
        WHERE id = :id
    """
    params = research_tech.model_dump()
    params["id"] = id
    execute_write(sql, params)


def delete_research_technology(id: int):
    sql = f"DELETE FROM {TABLE} WHERE id = :id"
    execute_write(sql, {"id": id})

