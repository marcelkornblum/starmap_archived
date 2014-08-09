from django.contrib import admin
from stardata.models import *

class StarAdmin (admin.ModelAdmin):
    list_display = ('starid', 'propername', 'bayerflamsteed', 'distance', 'mag', 'absmag', 'spectrum', 'colorindex')
    search_fields = ['propername', 'bayerflamsteed', 'gliese', 'spectrum', 'colorindex']

admin.site.register(Star, StarAdmin)