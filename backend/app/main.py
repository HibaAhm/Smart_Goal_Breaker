from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import logging
from app.database import get_db, engine, Base
from app import models, schemas
from app.ai_service import break_down_goal

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Goal Breaker API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Goal Breaker API is running"}

@app.post("/api/goals", response_model=schemas.GoalResponse)
def create_goal(goal: schemas.GoalCreate, db: Session = Depends(get_db)):
    """
    Create a new goal and break it down into tasks using AI.
    """
    try:
        logger.info(f"Creating goal: {goal.goal_text}")
        
        # Call AI service to break down the goal
        logger.info("Calling AI service...")
        ai_result = break_down_goal(goal.goal_text)
        logger.info(f"AI result received: {len(ai_result.get('tasks', []))} tasks")
        
        # Create goal in database
        logger.info("Creating goal in database...")
        db_goal = models.Goal(
            goal_text=goal.goal_text,
            complexity_score=ai_result["complexity_score"]
        )
        db.add(db_goal)
        db.flush()  # Get the goal ID
        logger.info(f"Goal created with ID: {db_goal.id}")
        
        # Create tasks
        logger.info("Creating tasks...")
        for task_data in ai_result["tasks"]:
            db_task = models.Task(
                goal_id=db_goal.id,
                task_text=task_data["task_text"],
                order=task_data["order"]
            )
            db.add(db_task)
        
        db.commit()
        db.refresh(db_goal)
        logger.info("Goal and tasks saved successfully")
        
        return db_goal
    except Exception as e:
        db.rollback()
        logger.error(f"Error creating goal: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error creating goal: {str(e)}")

@app.get("/api/goals", response_model=List[schemas.GoalResponse])
def get_goals(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Get all goals with their tasks.
    """
    goals = db.query(models.Goal).offset(skip).limit(limit).all()
    return goals

@app.get("/api/goals/{goal_id}", response_model=schemas.GoalResponse)
def get_goal(goal_id: int, db: Session = Depends(get_db)):
    """
    Get a specific goal by ID with its tasks.
    """
    goal = db.query(models.Goal).filter(models.Goal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    return goal

