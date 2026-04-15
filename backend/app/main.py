from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.biomaterials import router as biomaterials_router
from .core.config import settings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings["frontend_origin"]],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


app.include_router(biomaterials_router)
