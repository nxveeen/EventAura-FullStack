from flask import Blueprint, jsonify, request
from models.users import User
from flask_jwt_extended import create_access_token, create_refresh_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/register")
def register_user():
    data = request.get_json()
    
    user = User.get_user_by_username(username = data.get("username"))
    if user is not None:
        return jsonify({"success": False, "error": "User already exists"}), 409

    new_user = User(
        username = data.get("username"),
        email = data.get("email")
    )

    new_user.set_password(password = data.get("password"))
    new_user.save()
    return  jsonify({"success": True, "message": "User created", "user":new_user.to_dict()}), 201


@auth_bp.post("/login")
def user_login():
    data = request.get_json()
    print(data)
    user  = User.get_user_by_email(email=  data.get("email"))

    if user and user.check_password(password = data.get("password")):
        access_token = create_access_token(identity = user.username )
        refresh_token = create_refresh_token(identity=user.username)

        return jsonify({
            "success": True,
            "message": "Logged in successfully",
            "user":{
                "id": user.id,
                "username": user.username,
                "email": user.email
            },
            "tokens": {
                "access": access_token,
                "refresh": refresh_token,
            }
        }), 200

    return jsonify({"error":"invalid username or password!!"}), 400