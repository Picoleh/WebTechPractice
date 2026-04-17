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

router = APIRouter(prefix="/biomaterials", tags=["biomaterials"])


@router.get("/search")
async def search_biomaterials_route(q: str = Query(..., min_length=1), page: int = Query(1, ge=1), types: list[str] = Query([])):
    return search_biomaterials(q, page, types)


@router.get("")
async def get_biomaterials_route(page: int = Query(1, ge=1), types: list[str] = Query([])):
    return get_biomaterials(page, types)


@router.get("/{id}")
async def get_biomaterial_by_id_route(id: int):
    return get_biomaterial_by_id(id)


@router.post("")
async def create_biomaterial_route(biomaterial: BiomaterialCreateUpdate):
    create_biomaterial(biomaterial)
    return {"message": "Biomaterial created successfully"}


@router.put("/{id}")
async def update_biomaterial_route(id: int, biomaterial: BiomaterialCreateUpdate):
    update_biomaterial(id, biomaterial)
    return {"message": "Biomaterial updated successfully"}


@router.delete("/{id}")
async def delete_biomaterial_route(id: int):
    delete_biomaterial(id)
    return {"message": "Biomaterial deleted successfully"}
