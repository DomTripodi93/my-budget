from db import db


class ExpenseModel(db.Model):
    __tablename__ = 'expenses'

    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.DateTime)
    reconciled = db.Column(db.Boolean)
    account_from = db.Column(db.String(80))
    account_to = db.Column(db.String(80))
    cost = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('UserModel')

    def __init__(self, date_time, user_id, account_from, account_to, cost):
        self.date_time = date_time
        self.reconciled = False
        self.account_from = account_from
        self.account_to = account_to
        self.cost = cost
        self.user_id = user_id

    def json(self):
        return {
            'date_time': self.date_time,
            'id': self.id,
            'account_from': self.account_from,
            'account_to': self.account_to,
            'cost': self.cost,
            'user_id': self.user_id
        }

    @classmethod
    def find_by_reconciled(cls, reconciled):
        return cls.query.filter_by(reconciled==reconciled).all()

    @classmethod
    def find_by_date(cls, date):
        return cls.query.filter_by(date_time.date()==date).all()

    @classmethod
    def find_by_month(cls, month, year):
        return cls.query.filter_by(date_time.month==month & date_time.year==year).all()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls):
        return cls.query.all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
