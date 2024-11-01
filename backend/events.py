from flask import request, Blueprint, jsonify
from flask_jwt_extended import jwt_required
from models.events import Event
from extensions import db  
from datetime import datetime
from uuid import uuid4

events_bp = Blueprint("events", __name__)

@events_bp.post("/add")  
@jwt_required()          
def add_event():
    data = request.get_json()

    # Validate the input data
    required_fields = ["name", "description", "date", "location", "organizerName", "organizerEmail"]
    if not all(key in data for key in required_fields):
        return jsonify({"message": "Missing data"}), 400

    # Parse the date string into a datetime object
    try:
        event_date = datetime.strptime(data["date"], "%Y-%m-%d")  
    except ValueError:
        return jsonify({"message": "Invalid date format. Use YYYY-MM-DD."}), 400

    # Create a new event instance
    new_event = Event(
        id=data["id"],  
        name=data["name"],
        description=data["description"],
        date=event_date,  
        location=data["location"],
        organizerName=data["organizerName"],
        organizerEmail=data["organizerEmail"]
    )

    new_event.save()

    # Return the created event details
    return jsonify({"message": "Event created", "event": {
        "id": new_event.id,
        "name": new_event.name,
        "description": new_event.description,
        "date": new_event.date.strftime("%Y-%m-%d"),
        "location": new_event.location,
        "organizerName": new_event.organizerName,
        "organizerEmail": new_event.organizerEmail
    }}), 201

@events_bp.get("/all")
@jwt_required()
def get_all_events():
    page = request.args.get("page", default=1, type=int)
    per_page = request.args.get("per_page", default=10, type=int)
    events_paginated = Event.query.paginate(page=page, per_page=per_page, error_out=False)
    print(request)

    all_events = [
        {
            "id": event.id,
            "name": event.name,
            "description": event.description,
            "date": event.date.strftime("%Y-%m-%d") if event.date else None,  
            "location": event.location,
            "organizerName": event.organizerName,
            "organizerEmail": event.organizerEmail
        } 
        for event in events_paginated.items
    ]

    # Return paginated results with metadata
    return jsonify({
        "events": all_events,
        "total": events_paginated.total,
        "page": events_paginated.page,
        "per_page": events_paginated.per_page,
        "pages": events_paginated.pages
    })
