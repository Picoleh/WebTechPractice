from pydantic import BaseModel


class BiomaterialCreateUpdate(BaseModel):
    name: str
    type: str
    description: str
    density: float | None = None
    biocompatibility: str
