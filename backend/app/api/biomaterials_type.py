from fastapi import APIRouter, Query

from ..schemas.biomaterial import BiomaterialType
from ..services.biomaterials_types_service import (
    get_biomaterial_types,
)

