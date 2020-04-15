from db import db


class AccountModel(db.Model):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    account_type = db.Column(db.String(80))
    active = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('UserModel')

    def __init__(self, user_id, name, account_type, account_to, cost):
        self.name = name
        self.account_type = account_type
        self.active = True
        self.user_id = user_id

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'account_type': self.account_type,
            'active': self.active
        }

    @classmethod
    def find_by_active(cls, user_id, active):
        return cls.query.filter_by(user_id==user_id & active==active).all()

    @classmethod
    def find_by_type(cls, user_id, account_type):
        return cls.query.filter_by(user_id==user_id & account_type==account_type).all()

    @classmethod
    def find_by_type_and_active(cls, user_id, account_type, active):
        return cls.query.filter_by(user_id==user_id & account_type==account_type & active==active).all()

    @classmethod
    def find_by_id(cls, user_id, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, user_id):
        return cls.query.filter_by(user_id==user_id).all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_type_db(self):
        db.session.delete(self)
        db.session.commit()
