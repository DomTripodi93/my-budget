from marshmallow import Schema, fields


class CamelCaseSchema(Schema):
    @staticmethod
    def camelcase(string):
        parts = iter(string.split("_"))
        return next(parts) + "".join(word.title() for word in parts)

    def on_bind_field(self, field_name, field_obj):
        field_obj.data_key = camelcase(field_obj.data_key or field_name)
