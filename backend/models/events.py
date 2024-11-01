from extensions import db
from uuid import uuid4

# Define the Event model
class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, nullable=False)  # Use DateTime for easier date manipulation
    location = db.Column(db.String, nullable=False)
    organizerName = db.Column(db.String, nullable=False)
    organizerEmail = db.Column(db.String, nullable=False)

    def __repr__(self) -> str:
        return f"<EVENT: {self.name} {self.location} {self.date}>"


    @classmethod
    def get_event_by_name(cls, name):
        return cls.query.filter_by(name = name).first()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()