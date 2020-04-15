from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_refresh_token_required,
    get_jwt_identity,
    get_raw_jwt,
    jwt_required
)
from models.user import UserModel
from token_blacklist import TOKEN_BLACKLIST
import hashlib
import binascii
import os

_user_parser = reqparse.RequestParser()
_user_parser.add_argument(
    'email',
    type=str,
    required=True,
    help="This field cannot be blank."
)
_user_parser.add_argument(
    'name',
    type=str,
    required=False,
    help="This field cannot be blank."
)
_user_parser.add_argument(
    'password',
    type=str,
    required=True,
    help="This field cannot be blank."
)
_user_parser.add_argument(
    'confirmPassword',
    type=str,
    required=False,
    help="This field cannot be blank."
)


class UserRegister(Resource):
    @staticmethod
    def hash_password(password):
        salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
        pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),
                                      salt, 100000)
        pwdhash = binascii.hexlify(pwdhash)
        return (salt + pwdhash).decode('ascii')

    def post(self):
        user = _user_parser.parse_args()

        if UserModel.find_by_email(user['email']):
            return {"message": "A user with that email already exists"}, 400

        if user['password'] != user['confirmPassword']:
            return {"message": "Input password does not match confirmation"}, 400

        user_to_save = UserModel(
            user['email'], user['name'], UserRegister.hash_password(user['password']))
        user_to_save.save_to_db()

        return {"message": "User created successfully."}, 201


class UserLogin(Resource):
    @staticmethod
    def verify_password(stored_password, provided_password):
        salt = stored_password[:64]
        stored_password = stored_password[64:]
        pwdhash = hashlib.pbkdf2_hmac('sha512',
                                      provided_password.encode('utf-8'),
                                      salt.encode('ascii'),
                                      100000)
        pwdhash = binascii.hexlify(pwdhash).decode('ascii')
        return pwdhash == stored_password

    def post(self):
        data = _user_parser.parse_args()

        user = UserModel.find_by_email(data['email'])

        if user and UserLogin.verify_password(user.password, data['password']):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)
            return {
                'access_token': access_token,
                'refresh_token': refresh_token,
                'id': user.id
            }, 200

        return {"message": "Invalid Credentials!"}, 401


class UserLogout(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        TOKEN_BLACKLIST.add(jti)
        return {"message": "Successfully logged out"}, 200


class User(Resource):
    @classmethod
    @jwt_required
    def get(cls, user_id: int):
        user = UserModel.find_by_id(user_id)
        if not user:
            return {'message': 'User Not Found'}, 404
        if user_id == get_jwt_identity():
            return user.json(), 200
        else:
            return {'message': 'Invalid credentials'}, 401

    @classmethod
    @jwt_required
    def delete(cls, user_id: int):
        user = UserModel.find_by_id(user_id)
        if not user:
            return {'message': 'User Not Found'}, 404
        if user_id == get_jwt_identity():
            user.delete_from_db()
            return {'message': 'User deleted.'}, 200
        else:
            return {'message': 'Invalid credentials'}, 401


class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {'access_token': new_token}, 200
