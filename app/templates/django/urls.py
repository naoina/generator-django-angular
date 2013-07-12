from django.conf import settings
from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^robots\.txt$', include('robots.urls')),
    url(r'^$',
        '<%= appName %>.views.index',
        name='root'),
)

if settings.DEBUG:
    urlpatterns += patterns(
        '',
        url(r'^files/(?P<path>.*)$',
            'django.views.static.serve', {
                'document_root': settings.MEDIA_ROOT,
            }),
    )
