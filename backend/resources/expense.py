from flask_restful import Resource, reqparse
from flask_jwt_extended import get_jwt_identity, jwt_required
from models.expense import ExpenseModel
import datetime


class Expense(Resource):
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

        expense = ExpenseModel(user_id, **data)

        try:
            expense.save_to_db()
        except:
            return {"message": "An error occurred while adding the transaction."}, 500

        return expense.json(), 201

    @jwt_required
    def get(self, _id):
        expense = ExpenseModel.find_by_id(_id)

        if expense:
            return expense.json()
            
        return {'message': 'Transaction not found'}

    @jwt_required
    def delete(self, _id):
        expense = ExpenseModel.find_by_id(_id)

        if expense:
            expense.delete_from_db()
            return {'message': f'Transaction with id:{_id} deleted'}

        return {'message': 'Transaction not found'}

    @jwt_required
    def put(self, _id):
        data = self.parser.parse_args()

        expense = ExpenseModel.find_by_id(_id)

        if expense:
            for key in data:
                expense[key] = data[key]
            expense.save_to_db() 
            return expense.json()

        return {'message': 'Transaction not found'}
