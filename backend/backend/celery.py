from __future__ import absolute_import, unicode_literals

import os
from celery import Celery
from celery.schedules import crontab
from .settings import BROKER_URL, CELERY_RESULT_BACKEND



os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend',
            broker=BROKER_URL,
            backend=CELERY_RESULT_BACKEND)

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))

app.conf.beat_schedule = {
    'update-graphs-per-day-contrab': {
        'task': 'hearus.tasks.plot_all',
        'schedule': crontab(minute=0,hour=3),#crontab(minute="*/1"), 
    },
}