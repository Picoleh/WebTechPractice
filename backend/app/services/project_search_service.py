from ..db.session import execute_write, fetch_all

TABLE = "biomaterials_db.search_index"

def search_project(q: str, limit: int = 10):
    sql = f"""SELECT 
    entity_type, title, content
    FROM biomaterials_db.search_index
    WHERE content ILIKE '%{q}%'
    ORDER BY similarity(content, '{q}') DESC
"""
    
    if not (limit and (limit == -1 or limit == 0)):
        sql += f" LIMIT {limit}"


    data = fetch_all(sql)
    return data