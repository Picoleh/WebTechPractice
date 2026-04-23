import os
from pathlib import Path

from dotenv import load_dotenv


def load_settings() -> dict[str, str]:
    backend_root = Path(__file__).resolve().parents[2]
    project_root = backend_root.parent
    dotenv_path = project_root / "backend" / ".env"

    load_dotenv(dotenv_path=dotenv_path)

    db_path = os.getenv("DB_PATH")
    if not db_path:
        raise RuntimeError(
            f"DB_PATH nao encontrado. Verifique o arquivo de ambiente em: {dotenv_path}"
        )
    
    api_key = os.getenv("API_KEY")
    if not api_key:
        raise RuntimeError(
            f"API_KEY nao encontrado. Verifique o arquivo de ambiente em: {dotenv_path}"
        )


    return {
        "db_path": db_path,
        "frontend_origin": "http://localhost:5173",
        "api_key": api_key,
    }


settings = load_settings()
