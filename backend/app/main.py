from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .api.biomaterials import router as biomaterials_router
# from .api.biomaterials_type import router as biomaterials_types_router
from .core.config import settings

app = FastAPI(
    title="BioMat API",
    description="biomaterials management API for BioMatVenv project",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings["frontend_origin"]],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def credential_middleware(request, call_next):

    #print(f"Incoming request: {request.method} {request.url.path} {request.headers}")

    if request.method == "OPTIONS" or request.url.path == "/openapi.json":
        return await call_next(request)
    
    api_key = (
        request.headers.get("apiKey")
        or request.query_params.get("api_key")
    )

    if api_key != settings["api_key"]:
        return JSONResponse(status_code=401, content={"detail": "Unauthorized"})
    
    return await call_next(request)

@app.get("/")
async def root():
    return {"message": "Hello World"}


app.include_router(biomaterials_router)
# app.include_router(biomaterials_types_router)
