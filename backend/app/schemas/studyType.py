from pydantic import BaseModel


class StudyTypeCreateUpdate(BaseModel):
    name: str
    description: str
    level_evidence: str
    added_by: str | None = None