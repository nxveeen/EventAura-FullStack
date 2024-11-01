from app import db
from werkzeug.security import generate_password_hash, check_password_hash

# Define the Event model
class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    organizerName = db.Column(db.String, nullable=False)
    organizerEmail = db.Column(db.String, nullable=False)

    def __repr__(self) -> str:
        return f"<EVENT: {self.name} {self.location} {self.date}>"
   