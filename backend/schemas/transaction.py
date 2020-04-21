from schemas.camel import CamelSchema
from models.transaction import TransactionModel


class TransactionSchema(CamelSchema):
    class Meta:
        model = TransactionModel
        load_only = ("user_id",)
        dump_only = ("id",)