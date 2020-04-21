from schemas.camel import CamelSchema
from models.user import UserModel


class UserSchema(CamelSchema):
    class Meta:
        model = UserModel
        load_only = ("password",)
        dump_only = ("id",)
