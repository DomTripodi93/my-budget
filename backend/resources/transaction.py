from flask_restful import Resource, reqparse
from flask_jwt_extended import get_jwt_identity, jwt_required
from models.transaction import TransactionModel
import datetime


class Transaction(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        'date_time',
        type=datetime,
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

    @jwt_required
    def post(self, user_id):
        data = self.parser.parse_args()

        transaction = TransactionModel(user_id, **data)

        try:
            transaction.save_to_db()
        except:
            return {"message": "An error occurred while adding the transaction."}, 500

        return transaction.json(), 201

    @jwt_required
    def get(self, _id):
        transaction = TransactionModel.find_by_id(_id)

        if transaction:
            return transaction.json()

        return {'message': 'Transaction not found'}

    @jwt_required
    def delete(self, _id):
        transaction = TransactionModel.find_by_id(_id)

        if transaction:
            transaction.delete_from_db()
            return {'message': f'Transaction with id:{_id} deleted'}

        return {'message': 'Transaction not found'}

    @jwt_required
    def put(self, _id):
        data = self.parser.parse_args()

        transaction = TransactionModel.find_by_id(_id)

        if transaction:
            for key in data:
                transaction[key] = data[key]
            transaction.save_to_db() 
            return transaction.json()

        return {'message': 'Transaction not found'}
