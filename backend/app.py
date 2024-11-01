from flask import Flask
from flask_cors import CORS
from extensions import db, jwt 
from auth import auth_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_prefixed_env(prefix="APP")  

    try:
        # initialize app
        db.init_app(app)
        jwt.init_app(app)
        
        # create database if not present
        with app.app_context():
            db.create_all()

        # register blueprints
        app.register_blueprint(auth_bp, url_prefix="/auth")


    except Exception as e:
        print(f"Error initializing the database: {e}")
    
    return app


# # Create the database and tables


# # Route to get all events
# @app.route("/events", methods=["GET"])
# def get_events():
#     events = Event.query.all()
#     return jsonify([{
#         'id': event.id,
#         'name': event.name,
#         'description': event.description,
#         'date': event.date,
#         'location': event.location,
#         'organizerName': event.organizerName,
#         'organizerEmail': event.organizerEmail
#     } for event in events]), 200

# # Route to get a specific event by ID
# @app.route("/events/<event_id>", methods=["GET"])
# def get_event(event_id):
#     event = Event.query.get(event_id)
#     if not event:
#         return jsonify({"error": "Event not found"}), 404
#     return jsonify({
#         'id': event.id,
#         'name': event.name,
#         'description': event.description,
#         'date': event.date,
#         'location': event.location,
#         'organizerName': event.organizerName,
#         'organizerEmail': event.organizerEmail
#     }), 200

# # Route to create a new event
# @app.route("/events", methods=["POST"])
# def create_event():
#     data = request.get_json()
#     event_id = data.get("id")
#     if Event.query.get(event_id):
#         return jsonify({"error": "Event ID already exists"}), 400
    
#     event = Event(
#         id=event_id,
#         name=data.get("name"),
#         description=data.get("description"),
#         date=data.get("date"),
#         location=data.get("location"),
#         organizerName=data.get("organizerName"),
#         organizerEmail=data.get("organizerEmail"),
#     )
#     db.session.add(event)
#     db.session.commit()
#     return jsonify({
#         'id': event.id,
#         'name': event.name,
#         'description': event.description,
#         'date': event.date,
#         'location': event.location,
#         'organizerName': event.organizerName,
#         'organizerEmail': event.organizerEmail
#     }), 201

# # Route to edit an event by ID
# @app.route("/events/<event_id>", methods=["PUT"])
# def edit_event(event_id):
#     event = Event.query.get(event_id)
#     if not event:
#         return jsonify({"error": "Event not found"}), 404
#     data = request.get_json()
#     # Update only provided fields
#     for key, value in data.items():
#         if value is not None:
#             setattr(event, key, value)
#     db.session.commit()
#     return jsonify({
#         'id': event.id,
#         'name': event.name,
#         'description': event.description,
#         'date': event.date,
#         'location': event.location,
#         'organizerName': event.organizerName,
#         'organizerEmail': event.organizerEmail
#     }), 200

# # Route to delete an event by ID
# @app.route("/events/<event_id>", methods=["DELETE"])
# def delete_event(event_id):
#     event = Event.query.get(event_id)
#     if not event:
#         return jsonify({"error": "Event not found"}), 404
#     db.session.delete(event)
#     db.session.commit()
#     return jsonify({
#         'id': event.id,
#         'name': event.name,
#         'description': event.description,
#         'date': event.date,
#         'location': event.location,
#         'organizerName': event.organizerName,
#         'organizerEmail': event.organizerEmail
#     }), 200

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
