from django.conf.urls import patterns, url

from stardata import views

urlpatterns = patterns('',
    url(r'^$', views.stars, name='stars')
)