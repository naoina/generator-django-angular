# -*- coding: utf-8 -*-


__author__ = "<%= adminName %> <<%= adminEmail %>>"

import logging

from django.contrib.auth.models import AbstractUser
from django.db import models

logger = logging.getLogger(__name__)


class User(AbstractUser):
    """<%= appName %> Custom User Model"""
