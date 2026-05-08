from fastapi import APIRouter, Query

from ..services.project_search_service import search_project

router = APIRouter(prefix="/project_search", tags=["project_search"])

@router.get("", summary="Search research technologies, supports pagination", tags=["Get"])
async def project_search_route(q: str = Query(..., min_length=1, description="Search term"), limit: int = Query(None, description="Number of items per page, -1 for all")):
    return search_project(q, limit)