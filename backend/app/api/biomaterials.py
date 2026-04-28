from fastapi import APIRouter, Query

from ..schemas.biomaterial import BiomaterialCreateUpdate
from ..services.biomaterials_service import (
    create_biomaterial,
    delete_biomaterial,
    get_biomaterial_by_id,
    get_biomaterials,
    search_biomaterials,
    update_biomaterial,
)

from ..services.biomaterials_types_service import (
    get_biomaterial_types,
)

router = APIRouter(prefix="/biomaterials", tags=["biomaterials"])


@router.get("/search", summary="Search biomaterials by name or type, supports pagination and filtering by type", tags=["Get"])
async def search_biomaterials_route(q: str = Query(..., min_length=1, description="Search term"), page: int = Query(1, ge=1, description="Page number"), types: list[str] = Query([], description="List of types to filter by separated by &")):
    return search_biomaterials(q, page, types)


@router.get("", summary="Get a list of biomaterials, supports pagination and filtering by type", tags=["Get"])
async def get_biomaterials_route(page: int = Query(1, ge=1, description="Page number"), types: list[str] = Query([], description="List of types to filter by separated by &")):
    return get_biomaterials(page, types)


@router.get("/types", summary="Get a list of biomaterials types", tags=["Get"])
async def get_biomaterialsTypes_route():
    return get_biomaterial_types()


@router.get("/{id}", summary="Get a biomaterial by its ID", tags=["Get"])
async def get_biomaterial_by_id_route(id: int):
    return get_biomaterial_by_id(id)


@router.post("", summary="Create a new biomaterial", tags=["Post"])
async def create_biomaterial_route(biomaterial: BiomaterialCreateUpdate):
    create_biomaterial(biomaterial)
    return {"message": "Biomaterial created successfully"}


@router.put("/{id}", summary="Update an existing biomaterial by its ID", tags=["Put"])
async def update_biomaterial_route(id: int, biomaterial: BiomaterialCreateUpdate):
    update_biomaterial(id, biomaterial)
    return {"message": "Biomaterial updated successfully"}


@router.delete("/{id}", summary="Delete a biomaterial by its ID", tags=["Delete"])
async def delete_biomaterial_route(id: int):
    delete_biomaterial(id)
    return {"message": "Biomaterial deleted successfully"}
