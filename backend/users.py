from flask import Blueprint, jsonify, request
from models.users import User
from flask_jwt_extended import jwt_required

users_bp = Blueprint("users", __name__)

@users_bp.get("/all")
@jwt_required()
def get_all_users():
    page = request.args.get("page", default=1, type=int)
    per_page = request.args.get("per_page", default=10, type=int)
    users_paginated = User.query.paginate(page=page, per_page=per_page, error_out=False)
    
    users = [{"id": user.id, "email": user.email, "username": user.username} for user in users_paginated.items]

    return jsonify({
        "users": users,
        "total": users_paginated.total,
        "page": users_paginated.page,
        "per_page": users_paginated.per_page,
        "pages": users_paginated.pages
    })


