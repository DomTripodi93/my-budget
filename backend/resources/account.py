from flask_restful import Resource, resource
from flask_jwt_extended import get_jwt_identity, jwt_required
from models.account import AccountModel
from schemas.account import AccountSchema


account_schema = AccountSchema()


class Account(Resource):
    @jwt_required
    def post(self, user_id):
        account_json = resource.get_json()
        data = account_schema.load(account_json)

        account = AccountModel(user_id, **data)

        try:
            account.save_to_db()
        except:
            return {"message": "An error occurred while adding the account."}, 500

        return account_schema.dump(account), 201

    @jwt_required
    def get(self, _id):
        account = AccountModel.find_by_id(_id)

        if account and account.user_id == get_jwt_identity():
            return account_schema.dump(account)

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
        account_json = resource.get_json()
        data = account_schema.load(account_json)
        account = AccountModel.find_by_id(_id)

        if account:
            for key in data:
                setattr(account, key, data[key])
            account.save_to_db()
            return account_schema.dump(account), 200

        return {'message': 'Account not found'}
