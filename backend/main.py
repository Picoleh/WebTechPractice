import os
from pathlib import Path
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


project_root = Path(__file__).resolve().parents[1]
dotenv_path = project_root / ".env" / "dbInfo.env"
load_dotenv(dotenv_path=dotenv_path)

db_path = os.getenv("DB_PATH")
if not db_path:
    raise RuntimeError(
        f"DB_PATH nao encontrado. Verifique o arquivo de ambiente em: {dotenv_path}"
    )

db = create_engine(db_path)


def query(sql: str):
    with db.connect() as conn:
        results = conn.execute(text(sql)).mappings().fetchall()
        return results

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/biomaterials/search")
async def search_biomaterials(q: str):
    sql = f"""SELECT * FROM biomaterials_db.biomaterials WHERE name ILIKE '%{q}%' OR type ILIKE '%{q}%'"""
    return query(sql)

@app.get("/biomaterials")
async def get_biomaterials(page: int):
    sql = f"SELECT * FROM biomaterials_db.biomaterials LIMIT 3 OFFSET {(page - 1) * 3}"

    sql_count = "SELECT COUNT(*) FROM biomaterials_db.biomaterials"
    count_result = query(sql_count)

    return {
        "data": query(sql),
        "meta": {
            "page": page,
            "per_page": 3,
            "total": count_result[0]['count'] if count_result else 0
        }

    }

@app.get("/biomaterials/{id}")
async def get_biomaterial_by_id(id: int):
    sql = f"SELECT * FROM biomaterials_db.biomaterials WHERE id = {id}"
    results = query(sql)
    if results:
        return results[0]
    return {"message": "Biomaterial not found"}


@app.post("/biomaterials")
async def create_biomaterial(biomaterial: dict):
    name = biomaterial.get("name")
    type_ = biomaterial.get("type")
    description = biomaterial.get("description")
    density = biomaterial.get("density")
    biocompatibility = biomaterial.get("biocompatibility")


    sql = f"""
        INSERT INTO biomaterials_db.biomaterials (name, type, description, density, biocompatibility)
        VALUES ('{name}', '{type_}', '{description}', '{density}', '{biocompatibility}')
    """
    with db.connect() as conn:
        conn.execute(text(sql))
        conn.commit()
    return {"message": "Biomaterial created successfully"}


@app.put("/biomaterials/{id}")
async def update_biomaterial(id: int, biomaterial: dict):
    name = biomaterial.get("name")
    type_ = biomaterial.get("type")
    description = biomaterial.get("description")
    density = biomaterial.get("density")
    biocompatibility = biomaterial.get("biocompatibility")

    sql = f"""
        UPDATE biomaterials_db.biomaterials
        SET name='{name}', type='{type_}', description='{description}', density='{density}', biocompatibility='{biocompatibility}'
        WHERE id={id}
    """
    with db.connect() as conn:
        conn.execute(text(sql))
        conn.commit()
    return {"message": "Biomaterial updated successfully"}

@app.delete("/biomaterials/{id}")
async def delete_biomaterial(id: int):
    sql = f"DELETE FROM biomaterials_db.biomaterials WHERE id = {id}"
    with db.connect() as conn:
        conn.execute(text(sql))
        conn.commit()
    return {"message": "Biomaterial deleted successfully"}

