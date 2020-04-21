from ma import ma

def camelcase(string):
    parts = iter(string.split("_"))
    return next(parts) + "".join(word.title() for word in parts)

class CamelSchema(ma.ModelSchema):
    def on_bind_field(self, field_name, field_obj):
        field_obj.data_key = camelcase(field_obj.data_key or field_name)
