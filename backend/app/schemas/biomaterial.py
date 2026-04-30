from pydantic import BaseModel


class BiomaterialCreateUpdate(BaseModel):
    name: str
    type_id: int
    description: str
    density: float | None = None
    biocompatibility: str

class BiomaterialType(BaseModel):
    name: str
    description: str
