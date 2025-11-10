from pydantic import BaseModel
from typing import List
from datetime import datetime

class TaskCreate(BaseModel):
    task_text: str
    order: int

class TaskResponse(BaseModel):
    id: int
    task_text: str
    order: int
    
    class Config:
        from_attributes = True

class GoalCreate(BaseModel):
    goal_text: str

class GoalResponse(BaseModel):
    id: int
    goal_text: str
    complexity_score: float
    created_at: datetime
    tasks: List[TaskResponse]
    
    class Config:
        from_attributes = True

