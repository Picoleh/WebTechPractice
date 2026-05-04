from fastapi import APIRouter, Query

from ..schemas.researchTech import ResearchTechCreateUpdate
from ..services.researchTech_service import (
    create_research_technology,
    delete_research_technology,
    get_research_technology_by_id,
    get_research_technologies,
    search_research_technologies,
    update_research_technology,
)

router = APIRouter(prefix="/researchTechs", tags=["researchTechs"])

# Research Technologies Endpoints
@router.get("/search", summary="Search research technologies, supports pagination", tags=["Get"])
async def search_researchTechnologies_route(q: str = Query(..., min_length=1, description="Search term"), page: int = Query(1, ge=1, description="Page number")):
    return search_research_technologies(q, page)

@router.get("", summary="Get a list of research technologies", tags=["Get"])
async def get_researchTechnologies_route(page: int = Query(1, ge=1, description="Page number")):
    return get_research_technologies(page)

@router.get("/{id}", summary="Get a research technology by its ID", tags=["Get"])
async def get_research_technology_by_id_route(id: int):
    return get_research_technology_by_id(id)

@router.post("", summary="Create a new research technology", tags=["Post"])
async def create_research_technology_route(research_tech: ResearchTechCreateUpdate):
    create_research_technology(research_tech)
    return {"message": "Research technology created successfully"}

@router.put("/{id}", summary="Update an existing research technology by its ID", tags=["Put"])
async def update_research_technology_route(id: int, research_tech: ResearchTechCreateUpdate):
    update_research_technology(id, research_tech)
    return {"message": "Research technology updated successfully"}

@router.delete("/{id}", summary="Delete a research technology by its ID", tags=["Delete"])
async def delete_research_technology_route(id: int):
    delete_research_technology(id)
    return {"message": "Research technology deleted successfully"}
# -------------------------------