from flask_restful import Resource
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from models.transaction import TransactionModel
from schemas.transaction import TransactionSchema
import datetime


transaction_schema = TransactionSchema()


class Transaction(Resource):

    @jwt_required
    def post(self, user_id):
        transaction_json = request.get_json()
        transaction_json.date_time = datetime.datetime.strptime(
            transaction_json.date_time, '%Y-%m-%dT%H:%M:%S'
        )
        data = transaction_schema.load(transaction_json)

        transaction = TransactionModel(user_id, **data)

        try:
            transaction.save_to_db()
        except:
            return {"message": "An error occurred while adding the transaction."}, 500

        return transaction.json(), 201


class TransactionById(Resource):
    @jwt_required
    def get(self, user_id, _id):
        if user_id == get_jwt_identity():
            transaction = TransactionModel.find_by_id(user_id, _id)

            if transaction and transaction.user_id == get_jwt_identity():
                return transaction.json()

            return {'message': 'Transaction not found'}

        return {'message': 'You can only fetch your own transactions'}

    @jwt_required
    def delete(self, user_id, _id):
        if user_id == get_jwt_identity():
            transaction = TransactionModel.find_by_id(user_id, _id)

            if transaction and transaction.user_id == get_jwt_identity():
                transaction.delete_from_db()
                return {'message': f'Transaction with id:{_id} deleted'}

            return {'message': 'Transaction not found'}

        return {'message': 'You can only delete your own transactions'}

    @jwt_required
    def put(self, user_id, _id):
        if user_id == get_jwt_identity():
            transaction_json = request.get_json()
            transaction_json.date_time = datetime.datetime.strptime(
                transaction_json.date_time, '%Y-%m-%dT%H:%M:%S'
            )
            data = transaction_schema.load(transaction_json)
            transaction = TransactionModel.find_by_id(user_id, _id)

            if transaction:
                for key in data:
                    setattr(transaction, key, data[key])
                transaction.save_to_db()
                return transaction.json()

            return {'message': 'Transaction not found'}

        return {'message': 'You can only edit your own transactions'}


class TransactionList(Resource):
    @jwt_required
    def get(self, user_id):
        transactions = [
            transaction.json() for transaction in TransactionModel.find_all(user_id)
        ]
        if transactions:
            return transactions, 200
        return {'message': 'no transactions available'}, 200
