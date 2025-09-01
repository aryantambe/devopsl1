from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from datetime import datetime
import os

app = FastAPI(title="Simple Social Media API", version="1.0.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class Post(BaseModel):
    id: Optional[int] = None
    username: str
    content: str
    timestamp: Optional[str] = None
    likes: int = 0

class User(BaseModel):
    username: str
    email: str

# In-memory storage (for simplicity)
posts_db = []
users_db = []
post_counter = 1

# Serve static files (frontend)
app.mount("/static", StaticFiles(directory="frontend"), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_root():
    """Serve the main HTML page"""
    try:
        with open("frontend/index.html", "r") as f:
            html_content = f.read()
        return HTMLResponse(content=html_content, status_code=200)
    except FileNotFoundError:
        return HTMLResponse("<h1>Social Media App</h1><p>Frontend not found</p>")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "social-media-api"}

# User endpoints
@app.post("/api/users", response_model=User)
async def create_user(user: User):
    # Check if user already exists
    for existing_user in users_db:
        if existing_user["username"] == user.username:
            raise HTTPException(status_code=400, detail="Username already exists")
    
    users_db.append({"username": user.username, "email": user.email})
    return user

@app.get("/api/users", response_model=List[User])
async def get_users():
    return users_db

# Post endpoints
@app.post("/api/posts", response_model=Post)
async def create_post(post: Post):
    global post_counter
    
    # Check if user exists
    user_exists = any(user["username"] == post.username for user in users_db)
    if not user_exists:
        raise HTTPException(status_code=404, detail="User not found")
    
    post.id = post_counter
    post.timestamp = datetime.now().isoformat()
    post_counter += 1
    
    post_dict = post.dict()
    posts_db.append(post_dict)
    return post

@app.get("/api/posts", response_model=List[Post])
async def get_posts():
    # Return posts sorted by timestamp (newest first)
    return sorted(posts_db, key=lambda x: x["timestamp"], reverse=True)

@app.get("/api/posts/{post_id}", response_model=Post)
async def get_post(post_id: int):
    for post in posts_db:
        if post["id"] == post_id:
            return post
    raise HTTPException(status_code=404, detail="Post not found")

@app.put("/api/posts/{post_id}/like")
async def like_post(post_id: int):
    for post in posts_db:
        if post["id"] == post_id:
            post["likes"] += 1
            return {"message": "Post liked", "likes": post["likes"]}
    raise HTTPException(status_code=404, detail="Post not found")

@app.delete("/api/posts/{post_id}")
async def delete_post(post_id: int):
    for i, post in enumerate(posts_db):
        if post["id"] == post_id:
            deleted_post = posts_db.pop(i)
            return {"message": "Post deleted", "deleted_post": deleted_post}
    raise HTTPException(status_code=404, detail="Post not found")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
