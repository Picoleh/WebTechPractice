from pydantic import BaseModel


class BiomaterialCreateUpdate(BaseModel):
    name: str
    type_id: int
    description: str
    density: float | None = None
    biocompatibility: str
    img_path: str | None = None
    added_by: str | None = None

class BiomaterialType(BaseModel):
    name: str
    description: str
    added_by: str | None = None
