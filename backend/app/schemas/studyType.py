from pydantic import BaseModel


class StudyTypeCreateUpdate(BaseModel):
    name: str
    description: str
    level_evidence: str