from pydantic import BaseModel


class ExperimentCreateUpdate(BaseModel):
    title: str
    objective: str
    description: str
    start_date: str
    end_date: str
    status: str
    biomaterial_id: int
    study_type_id: int
    research_tech_ids: list[int] 
    results: str
    added_by: str | None = None
    