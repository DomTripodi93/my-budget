from flask_restful import Resource, reqparse
from flask_jwt_extended import get_jwt_identity, jwt_required
from models.transaction import TransactionModel
import datetime


parser = reqparse.RequestParser()
parser.add_argument(
    'date_time',
    type=str,
    required=True,
    help="Transaction date and time are required"
)
parser.add_argument(
    'account_from',
    type=str,
    required=False
)
parser.add_argument(
    'account_to',
    type=str,
    required=False
)
parser.add_argument(
    'cost',
    type=float,
    required=True,
    help="Transaction value is required"
)


class Transaction(Resource):

    @jwt_required
    def post(self, user_id):
        data = parser.parse_args()
        data.date_time = datetime.datetime.strptime(
            parser.parse_args().date_time, '%Y-%m-%dT%H:%M:%S'
        )

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
            data = parser.parse_args()
            data.date_time = datetime.datetime.strptime(
                parser.parse_args().date_time, '%Y-%m-%dT%H:%M:%S'
            )
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
