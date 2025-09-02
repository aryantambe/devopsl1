from flask import Blueprint, jsonify, request
from app.storage import posts, add_post

post_routes = Blueprint("posts", __name__)

@post_routes.route("/posts", methods=["GET"])
def get_posts():
    return jsonify(posts)

@post_routes.route("/posts", methods=["POST"])
def create_post():
    data = request.json
    if not data or "author" not in data or "content" not in data:
        return jsonify({"error": "Invalid request"}), 400
    post = add_post(data["author"], data["content"])
    return jsonify(post), 201
