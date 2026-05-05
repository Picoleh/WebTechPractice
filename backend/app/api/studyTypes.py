from fastapi import APIRouter, Query

from ..schemas.studyType import StudyTypeCreateUpdate
from ..services.studyTypes_service import (
    create_study_type,
    delete_study_type,
    get_study_type_by_id,
    get_study_types,
    search_study_types,
    update_study_type,
)

router = APIRouter(prefix="/studyTypes", tags=["studyTypes"])

# Study Types Endpoints
@router.get("/search", summary="Search study types, supports pagination", tags=["Get"])
async def search_studyTypes_route(q: str = Query(..., min_length=1, description="Search term"), page: int = Query(1, ge=1, description="Page number"), limit: int = Query(None, description="Number of items per page, -1 for all")):
    return search_study_types(q, page, limit)

@router.get("", summary="Get a list of study types", tags=["Get"])
async def get_studyTypes_route(page: int = Query(1, ge=1, description="Page number"), limit: int = Query(None, description="Number of items per page, -1 for all")):
    return get_study_types(page, limit)

@router.get("/{id}", summary="Get a study type by its ID", tags=["Get"])
async def get_study_type_by_id_route(id: int):
    return get_study_type_by_id(id)

@router.post("", summary="Create a new study type", tags=["Post"])
async def create_study_type_route(study_type: StudyTypeCreateUpdate):
    create_study_type(study_type)
    return {"message": "Study type created successfully"}

@router.put("/{id}", summary="Update an existing study type by its ID", tags=["Put"])
async def update_study_type_route(id: int, study_type: StudyTypeCreateUpdate):
    update_study_type(id, study_type)
    return {"message": "Study type updated successfully"}

@router.delete("/{id}", summary="Delete a study type by its ID", tags=["Delete"])
async def delete_study_type_route(id: int):
    delete_study_type(id)
    return {"message": "Study type deleted successfully"}
# -------------------------------