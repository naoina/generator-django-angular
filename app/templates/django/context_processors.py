# -*- coding: utf-8 -*-

__author__ = "<%= adminName %> <<%= adminEmail %>>"

import logging

from django.contrib.sites.models import Site

logger = logging.getLogger(__name__)


def site(request):
    return {'site': Site.objects.get_current()}
