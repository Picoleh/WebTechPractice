from pydantic import BaseModel


class ResearchTechCreateUpdate(BaseModel):
    name: str
    description: str
    cost_level: str