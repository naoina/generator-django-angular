# -*- coding: utf-8 -*-

import pytest
from django.contrib.auth import get_user_model


def create_user(username):
    return get_user_model().objects.create(username=username)


@pytest.mark.django_db
class TestUser(object):
    def test_user(self):
        assert 0
