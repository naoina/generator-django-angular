# -*- coding: utf-8 -*-


__author__ = "<%= adminName %> <<%= adminEmail %>>"

import logging

from django import forms as djangoforms
from django.utils.translation import ugettext as _

logger = logging.getLogger(__name__)


class ModelForm(djangoforms.ModelForm):
    def __init__(self, *args, **kwargs):
        djangoforms.ModelForm.__init__(self, *args, **kwargs)
        for name, field in self.fields.items():
            field.error_messages['required'] = \
                _(u'%(fieldname)s is required.') % {'fieldname': field.label}
