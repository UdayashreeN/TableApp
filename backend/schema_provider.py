schemas = {
    "dataset1": [
        {"field": "id", "label": "ID"},
        {"field": "name", "label": "Name"},
        {"field": "value", "label": "Value"}
    ],
    "dataset2": [
        {"field": "id", "label": "ID"},
        {"field": "name", "label": "Employee"},
        {"field": "value", "label": "Department"}
    ],
    "dataset3": [
        {"field": "id", "label": "ID"},
        {"field": "name", "label": "Product"},
        {"field": "value", "label": "Sales"}
    ]
}

def get_schema(dataset):
    return schemas.get(dataset, [])
