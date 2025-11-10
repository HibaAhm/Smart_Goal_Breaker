"""
Script to initialize the database.
Run this after setting up your PostgreSQL connection.
"""
from app.database import engine, Base
from app import models

if __name__ == "__main__":
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

