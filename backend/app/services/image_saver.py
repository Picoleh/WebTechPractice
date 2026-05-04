from pathlib import Path

from fastapi import UploadFile

class ImageSaver:
    saveFolderPath = Path(__file__).resolve().parents[3] / "frontend" / "src" / "assets" / "savedImages"

    @staticmethod
    async def saveImage(image: UploadFile) -> dict:
        ImageSaver.saveFolderPath.mkdir(parents=True, exist_ok=True)
        
        if image:
            imagePath = ImageSaver.saveFolderPath / image.filename
            with open(imagePath, "wb") as f:
                f.write(await image.read())

        return {"url": str(imagePath)}