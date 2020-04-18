from camel import CamelSchema
from models.transaction import TransactionModel


class TransactionSchema(CamelSchema):
    class Meta:
        model = TransactionModel
        dump_only = ("id",)