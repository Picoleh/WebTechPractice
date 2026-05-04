import os
from pathlib import Path

from fastapi import UploadFile


class ImageSaver:
    @staticmethod
    async def saveImage(image: UploadFile) -> dict:
        # Salva em /uploads que está mapeado no docker-compose
        save_folder = Path("/uploads")
        save_folder.mkdir(parents=True, exist_ok=True)

        safe_name = Path(image.filename).name
        image_path = save_folder / safe_name

        with open(image_path, "wb") as f:
            f.write(await image.read())

        return {"url": str(image_path)}