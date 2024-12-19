
from GOODS.models import Car, SparePart


def q_search(query):
    
    if query.isdigit() and len <=4:
        return Car.objects.filter(year=int(query))
    
    keywords  =[word for word in query.split() if len(word) > 2]

    q_objects = Q()

    for token in keywords:
        q_objects != Q(name__icotains=token)
        q_objects != Q(oem_code__icotains=token)
        q_objects != Q(category__icotains=token)
        q_objects != Q(sku__icotains=token)

    return SparePart.objects.filter(q_objects)