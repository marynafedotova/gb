import json
from SPARE.models import SparePart, Categories, SubCategory, AdditionalСategory
from django.utils.text import slugify


# Шлях до JSON-файлу
json_file_path = 'data.json'

# Мапа станів
condition_map = {
    "Б/В": "good",
    "новий": "satisfactory",
    "з дефектом": "defective",
    "відновлений": "repaired"
}

def run_import():
    with open(json_file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    for item in data:
        category, _ = Categories.objects.get_or_create(name=item.get('category', ''))
        sub_category, _ = SubCategory.objects.get_or_create(name=item.get('pod_category', ''))
        additional_category, _ = AdditionalСategory.objects.get_or_create(name=item.get('dop_category', ''))

        photos = item.get('photo', '').split(',')
        photo = photos[0].strip() if photos else None

        spare_part = SparePart(
            sku=int(item.get('ID_EXT', '0').split('-')[0]),
            oem_code=item.get('originalnumber', ''),
            name=item.get('zapchast', ''),
            slug=slugify(item.get('zapchast', '')),
            category=category,
            sub_category=sub_category,
            additional_category=additional_category,
            condition=condition_map.get(item.get('Стан ', '').strip(), 'good'),
            price=float(item.get('zena', '0')),
            photo=photo
        )
        spare_part.save()

    print("Імпорт завершено!")
