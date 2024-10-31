from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from uuid import uuid4

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///events.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the Event model
class Event(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    organizerName = db.Column(db.String, nullable=False)
    organizerEmail = db.Column(db.String, nullable=False)

# Create the database and tables
with app.app_context():
    db.create_all()

# Route to get all events
@app.route("/events", methods=["GET"])
def get_events():
    events = Event.query.all()
    return jsonify([{
        'id': event.id,
        'name': event.name,
        'description': event.description,
        'date': event.date,
        'location': event.location,
        'organizerName': event.organizerName,
        'organizerEmail': event.organizerEmail
    } for event in events]), 200

# Route to get a specific event by ID
@app.route("/events/<event_id>", methods=["GET"])
def get_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    return jsonify({
        'id': event.id,
        'name': event.name,
        'description': event.description,
        'date': event.date,
        'location': event.location,
        'organizerName': event.organizerName,
        'organizerEmail': event.organizerEmail
    }), 200

# Route to create a new event
@app.route("/events", methods=["POST"])
def create_event():
    data = request.get_json()
    event_id = data.get("id")
    if Event.query.get(event_id):
        return jsonify({"error": "Event ID already exists"}), 400
    
    event = Event(
        id=event_id,
        name=data.get("name"),
        description=data.get("description"),
        date=data.get("date"),
        location=data.get("location"),
        organizerName=data.get("organizerName"),
        organizerEmail=data.get("organizerEmail"),
    )
    db.session.add(event)
    db.session.commit()
    return jsonify({
        'id': event.id,
        'name': event.name,
        'description': event.description,
        'date': event.date,
        'location': event.location,
        'organizerName': event.organizerName,
        'organizerEmail': event.organizerEmail
    }), 201

# Route to edit an event by ID
@app.route("/events/<event_id>", methods=["PUT"])
def edit_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    data = request.get_json()
    # Update only provided fields
    for key, value in data.items():
        if value is not None:
            setattr(event, key, value)
    db.session.commit()
    return jsonify({
        'id': event.id,
        'name': event.name,
        'description': event.description,
        'date': event.date,
        'location': event.location,
        'organizerName': event.organizerName,
        'organizerEmail': event.organizerEmail
    }), 200

# Route to delete an event by ID
@app.route("/events/<event_id>", methods=["DELETE"])
def delete_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    db.session.delete(event)
    db.session.commit()
    return jsonify({
        'id': event.id,
        'name': event.name,
        'description': event.description,
        'date': event.date,
        'location': event.location,
        'organizerName': event.organizerName,
        'organizerEmail': event.organizerEmail
    }), 200

if __name__ == "__main__":
    app.run(debug=True)