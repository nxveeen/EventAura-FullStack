from flask import Blueprint, jsonify, request
from models.users import User
from flask_jwt_extended import create_access_token, create_refresh_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/register")
def register_user():
    data = request.get_json()
    user = User.get_user_by_username(username = data.get("username", None))
    if user is not None:
        return jsonify({"error ": "user already exists"}), 409

    new_user = User(
        username = data.get("username",None),
        email = data.get("email", None)
    )

    new_user.set_password(password = data.get("password",None))
    new_user.save()

    return jsonify({"message ": "user created"}), 201


@auth_bp.post("/login")
def user_login():
    data = request.get_json()
    user  = User.get_user_by_username(username = data.get("username"))

    if user and user.check_password(password = data.get("password")):
        access_token = create_access_token(identity = user.username)
        refresh_token = create_refresh_token(identity=user.username)

        return jsonify({
            "message": "logged in",
            "tokens": {
                "access": access_token,
                "refresh": refresh_token,
            }
        }), 200

    return jsonify({"error":"invalid username or password!!"}), 400