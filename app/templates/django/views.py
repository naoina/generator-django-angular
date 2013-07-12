# -*- coding: utf-8 -*-

__author__ = "<%= adminName %> <<%= adminEmail %>>"

import logging

from django.views.generic import TemplateView

logger = logging.getLogger(__name__)


class IndexView(TemplateView):
    template_name = 'index.html'

index = IndexView.as_view()
