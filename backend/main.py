import random
import time
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from db import Base, engine, SessionLocal
from models import Record
from schema_provider import get_schema

Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/schema/{dataset}")
def schema(dataset: str):
    return get_schema(dataset)

@app.get("/api/{dataset}")
def read_data(dataset: str, db: Session = Depends(get_db)):
    return db.query(Record).all()

@app.get("/api/slow/{dataset}")
def slow_data(dataset: str, db: Session = Depends(get_db)):
    delay = random.randint(5, 10)
    time.sleep(delay)
    return db.query(Record).all()

@app.post("/api/{dataset}")
def create(record: dict, db: Session = Depends(get_db)):
    new_record = Record(name=record["name"], value=record["value"])
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record

@app.delete("/api/{dataset}/{id}")
def delete(id: int, db: Session = Depends(get_db)):
    db_record = db.query(Record).filter(Record.id == id).first()
    if not db_record:
        raise HTTPException(404)
    db.delete(db_record)
    db.commit()
    return {"message": "Deleted"}
