from django.core import serializers
from django.http import HttpResponse

from stardata.models import *


def stars(request):
    stars = Star.objects.order_by('distance')[:10]
    data = serializers.serialize("json", stars)
    return HttpResponse(data, content_type="application/json")