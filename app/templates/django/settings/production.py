# Production Django settings for <%= appName %> project.

from <%= appName %>.settings.base import *

DEBUG = False
TEMPLATE_DEBUG = DEBUG
ASSETS_DEBUG = DEBUG
REQUIRE_DEBUG = DEBUG
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',  # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': '<%= appName %>_production',  # Or path to database file if using sqlite3.
        'USER': '<%= dbAccount %>',  # Not used with sqlite3.
        'PASSWORD': '<%= dbPassword %>',  # Not used with sqlite3.
        'HOST': '',  # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',  # Set to empty string for default. Not used with sqlite3.
    }
}
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

ALLOWED_HOSTS = ['<%= deployHost %>']

MEDIA_URL = '/files/'
STATICFILES_STORAGE = 'require.storage.OptimizedCachedStaticFilesStorage'
