from db import db


class RecurringTransactionModel(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    last_date = db.Column(db.DateTime)
    next_date = db.Column(db.DateTime)
    recurring_interval = db.column(db.Integer)
    account_from = db.Column(db.String(80))
    account_to = db.Column(db.String(80))
    cost = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('UserModel')

    @classmethod
    def find_by_reconciled(cls, user_id, reconciled):
        return cls.query.filter(db.transactions.user_id==user_id & db.transactions.reconciled==reconciled).all()

    @classmethod
    def find_by_id(cls, user_id, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
