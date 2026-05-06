from ..db.session import execute_write, fetch_all

def get_home_data():
    sql = """SELECT
      (SELECT COUNT(id) FROM biomaterials_db.biomaterials) as total_Biomaterials,
      (SELECT COUNT(id) FROM biomaterials_db.study_type) as study_Types,
      (SELECT COUNT(id) FROM biomaterials_db.experiments WHERE status = 'In Progress') as active_Experiments,
      (SELECT COUNT(id) FROM biomaterials_db.experiments WHERE created_at >= NOW() - INTERVAL '7 days') as new_Submissions
    """
    numberCard = fetch_all(sql)

    sql = """SELECT 
        tp.name,
        DATE_TRUNC('month', b.created_at) AS month,
        COUNT(b.id) AS count
        FROM biomaterials_db.biomaterial_type tp
        LEFT JOIN biomaterials_db.biomaterials b 
        ON tp.id = b.type_id
        GROUP BY tp.id, tp.name, month
        ORDER BY month ASC, tp.name;
    """
    trendData = fetch_all(sql)
    return { "numberCardData": numberCard[0],
             "trendData": trendData }