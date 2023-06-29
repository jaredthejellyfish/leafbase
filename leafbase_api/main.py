from fastapi import FastAPI
from .classes import Strain
from typing import List
from .database import VectorDB
from dotenv import load_dotenv
import os
import time

load_dotenv(dotenv_path="leafbase_api/.env")

url: str = os.getenv("DB_URL")
key: str = os.getenv("DB_API_KEY")

vdb = VectorDB(url= url, key= key)
app = FastAPI()

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print('{} ran in: {} seconds'.format(func.__name__, end - start))
        return result
    return wrapper

@timer
@app.get("/")
async def root():
    return {"message": "Hello World"}

@timer
@app.post("/liked-plot")
async def liked_plot(strains: List[str]):
    return vdb.liked_strains_spread(strains)
