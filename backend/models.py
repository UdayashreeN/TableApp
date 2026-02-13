from sqlalchemy import Column, Integer, String
from db import Base

class Record(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    value = Column(String)
