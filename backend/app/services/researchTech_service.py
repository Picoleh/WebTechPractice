from ..db.session import execute_write, fetch_all
from ..schemas.researchTech import ResearchTechCreateUpdate

TABLE = "biomaterials_db.research_technologies"
PER_PAGE = 14

# Research Technologies Service
def get_research_technologies_count(sql: str):
    select = sql.find("SELECT")
    from_ = sql.find("FROM")
    columns  = sql[select + 6: from_]
    count_sql = sql.replace(columns, " COUNT(*) AS count ")

    count_result = fetch_all(count_sql)
    return count_result[0]["count"] if count_result else 0


def search_research_technologies(q: str, page: int, limit: int = None):
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
            "total": get_research_technologies_count(sql_no_limit),
        },
    }


def get_research_technologies(page: int, limit: int = None):
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

