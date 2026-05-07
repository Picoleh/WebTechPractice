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
      tp.name, COUNT(b.id) AS count FROM biomaterials_db.biomaterial_type tp
      LEFT JOIN biomaterials_db.biomaterials b 
      ON tp.id = b.type_id
      GROUP BY tp.id, tp.name
      ORDER BY tp.name
    """
    trendData = fetch_all(sql)

    sql = """SELECT 
      COUNT(name), DATE_TRUNC('month',created_at) AS month FROM biomaterials_db.study_type
      GROUP BY month
      ORDER BY month
    """
    studyTypeData = fetch_all(sql)

    sql = """SELECT 
    COUNT(title) AS count, b.name, b.img_path FROM biomaterials_db.experiments 
    LEFT JOIN biomaterials_db.biomaterials AS b 
    ON biomaterial_id = b.id GROUP BY b.name, b.img_path 
    ORDER BY count DESC, b.name ASC 
    LIMIT 3
    """

    biomaterialData = fetch_all(sql)

    sql = """SELECT 
    name, NOW()::date - created_at::date AS days 
    FROM biomaterials_db.research_technologies 
    WHERE created_at >= NOW() - INTERVAL '7 days'
    ORDER BY days
    LIMIT 7
    """

    researchTechnologiesData = fetch_all(sql)

    return { "numberCardData": numberCard[0],
             "trendData": trendData,
             "studyTypeData": studyTypeData,
             "biomaterialsData": biomaterialData,
             "researchTechData": researchTechnologiesData }