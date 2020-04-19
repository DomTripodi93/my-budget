from camel import CamelSchema
from models.account import AccountModel


class AccountSchema(CamelSchema):
    class Meta:
        model = AccountModel
        dump_only = ("id",)