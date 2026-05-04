from fastapi import APIRouter, File, Query, UploadFile

from ..schemas.biomaterial import BiomaterialCreateUpdate, BiomaterialType
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
    search_biomaterial_types,
    create_biomaterial_type,
    update_biomaterial_type,
    delete_biomaterial_type
)

from ..services.image_saver import ImageSaver

router = APIRouter(prefix="/biomaterials", tags=["biomaterials"])

# Biomaterial Types Endpoints
@router.get("/types/search", summary="Search biomaterials types, supports pagination", tags=["Get"])
async def search_biomaterialsTypes_route(q: str = Query(..., min_length=1, description="Search term"), page: int = Query(1, ge=1, description="Page number")):
    return search_biomaterial_types(q, page)

@router.get("/types", summary="Get a list of biomaterials types", tags=["Get"])
async def get_biomaterialsTypes_route(page: int = Query(1, ge=1, description="Page number")):
    return get_biomaterial_types(page)

@router.post("/types", summary="Create a new biomaterial type", tags=["Post"])
async def create_biomaterial_type_route(biomaterial_type: BiomaterialType):
    create_biomaterial_type(biomaterial_type)
    return {"message": "Biomaterial type created successfully"}

@router.put("/types/{id}", summary="Update an existing biomaterial type by its ID", tags=["Put"])
async def update_biomaterial_type_route(id: int, biomaterial_type: BiomaterialType):
    update_biomaterial_type(id, biomaterial_type)
    return {"message": "Biomaterial type updated successfully"}

@router.delete("/types/{id}", summary="Delete a biomaterial type by its ID", tags=["Delete"])
async def delete_biomaterial_type_route(id: int):
    delete_biomaterial_type(id)
    return {"message": "Biomaterial type deleted successfully"}
# -------------------------------


# Biomaterials Endpoints
@router.get("/search", summary="Search biomaterials by name, supports pagination and filtering by type", tags=["Get"])
async def search_biomaterials_route(q: str = Query(..., min_length=1, description="Search term"), page: int = Query(1, ge=1, description="Page number"), types: list[str] = Query([], description="List of types to filter by separated by &")):
    return search_biomaterials(q, page, types)

@router.post("/upload-image", summary="Upload an image for a biomaterial", tags=["Post"])
async def upload_biomaterial_image_route(image: UploadFile = File(...)):
    return await ImageSaver.saveImage(image)

@router.get("", summary="Get a list of biomaterials, supports pagination and filtering by type", tags=["Get"])
async def get_biomaterials_route(page: int = Query(1, ge=1, description="Page number"), types: list[str] = Query([], description="List of types to filter by separated by &")):
    return get_biomaterials(page, types)

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
# -------------------------------