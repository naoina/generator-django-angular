# -*- coding: utf-8 -*-

from <%= appName %> import views


class TestIndexView(object):
    def test_template_name(self):
        assert views.IndexView.template_name == 'index.html'
