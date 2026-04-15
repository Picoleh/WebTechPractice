from sqlalchemy import create_engine, text

from ..core.config import settings

engine = create_engine(settings["db_path"])


def fetch_all(sql: str, params: dict | None = None):
    with engine.connect() as conn:
        return conn.execute(text(sql), params or {}).mappings().fetchall()


def execute_write(sql: str, params: dict | None = None):
    with engine.connect() as conn:
        conn.execute(text(sql), params or {})
        conn.commit()
