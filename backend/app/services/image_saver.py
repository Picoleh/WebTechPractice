import os
from pathlib import Path

from fastapi import UploadFile


class ImageSaver:
    @staticmethod
    async def saveImage(image: UploadFile) -> dict:
        # Preferência: usar o mapeamento de volume em /project/frontend/public (compose mapeia .:/project)
        save_folder = Path("/project/frontend/public")
        save_folder.mkdir(parents=True, exist_ok=True)

        safe_name = Path(image.filename).name
        image_path = save_folder / safe_name

        with open(image_path, "wb") as f:
            f.write(await image.read())

        # Vite serves files in `public/` at the site root, então retornamos `/{filename}`
        return {"url": f"/{safe_name}"}