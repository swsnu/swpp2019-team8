from __future__ import absolute_import, unicode_literals

import os
from celery import Celery
from .settings import BROKER_URL, CELERY_RESULT_BACKEND

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend',
            broker=BROKER_URL,
            backend=CELERY_RESULT_BACKEND)

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print('REquest: {0!r}'.format(self.request))