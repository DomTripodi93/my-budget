from flask_restful import Resource, reqparse
from flask_jwt_extended import get_jwt_identity, jwt_required
from models.account import AccountModel


class Account(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        'name',
        type=str,
        required=True,
        help="Account date and time are required"
    )
    parser.add_argument(
        'account_type',
        type=str,
        required=True
    )
    parser.add_argument(
        'active',
        type=bool,
        required=False
    )

    @jwt_required
    def post(self, user_id):
        data = self.parser.parse_args()

        account = AccountModel(user_id, **data)

        try:
            account.save_to_db()
        except:
            return {"message": "An error occurred while adding the account."}, 500

        return account.json(), 201

    @jwt_required
    def get(self, _id):
        account = AccountModel.find_by_id(_id)

        if account and account.user_id == get_jwt_identity():
            return account.json()

        return {'message': 'Account not found'}

    @jwt_required
    def delete(self, _id):
        account = AccountModel.find_by_id(_id)

        if account and account.user_id == get_jwt_identity():
            account.delete_from_db()
            return {'message': f'Account with id:{_id} deleted'}

        return {'message': 'Account not found'}

    @jwt_required
    def put(self, _id):
        data = self.parser.parse_args()
        account = AccountModel.find_by_id(_id)

        if account:
            for key in data:
                setattr(account, key, data[key])
            account.save_to_db()
            return account.json()

        return {'message': 'Account not found'}
