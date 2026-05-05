from fastapi import APIRouter, Query

from ..schemas.experiment import ExperimentCreateUpdate
from ..services.experiments_service import (
    create_experiment,
    delete_experiment,
    get_experiment_by_id,
    get_experiments,
    search_experiments,
    update_experiment,
)

router = APIRouter(prefix="/experiments", tags=["experiments"])

# Experiments Endpoints
@router.get("/search", summary="Search experiments, supports pagination", tags=["Get"])
async def search_experiments_route(q: str = Query(..., min_length=1, description="Search term"), page: int = Query(1, ge=1, description="Page number"), limit: int = Query(None, description="Number of items per page, -1 for all")):
    return search_experiments(q, page, limit)

@router.get("", summary="Get a list of experiments", tags=["Get"])
async def get_experiments_route(page: int = Query(1, ge=1, description="Page number"), limit: int = Query(None, description="Number of items per page, -1 for all")):
    return get_experiments(page, limit)

@router.get("/{id}", summary="Get an experiment by its ID", tags=["Get"])
async def get_experiment_by_id_route(id: int):
    return get_experiment_by_id(id)

@router.post("", summary="Create a new experiment", tags=["Post"])
async def create_experiment_route(experiment: ExperimentCreateUpdate):
    create_experiment(experiment)
    return {"message": "Experiment created successfully"}

@router.put("/{id}", summary="Update an existing experiment by its ID", tags=["Put"])
async def update_experiment_route(id: int, experiment: ExperimentCreateUpdate):
    update_experiment(id, experiment)
    return {"message": "Experiment updated successfully"}

@router.delete("/{id}", summary="Delete an experiment by its ID", tags=["Delete"])
async def delete_experiment_route(id: int):
    delete_experiment(id)
    return {"message": "Experiment deleted successfully"}
# -------------------------------