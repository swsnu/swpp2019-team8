from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .models import Petition
from datetime import datetime, timedelta

import matplotlib
matplotlib.use('Agg')
from matplotlib import pyplot as plt
import pandas as pd
import numpy as np


@shared_task
def status_changer(petition_id):
    check_fail.apply_async([petition_id], countdown=86400)
    check_end.apply_async([petition_id], countdown=1900800)

@shared_task
def check_fail(petition_id):
    target_petition = Petition.objects.get(id = petition_id)
    if(target_petition.status == 'preliminary'):
        target_petition.status = 'fail'
        target_petition.save()

@shared_task
def check_end(petition_id):
    target_petition = Petition.objects.get(id = petition_id)
    if(target_petition.status == 'ongoing'):
        target_petition.status = 'end'
        target_petition.save()
        
@shared_task
def plot_graph(petition_id):
    plt_graph.apply_async([petition_id], countdown=10)

@shared_task
def plt_graph(petition_id):
    file_location = './stat/' + str(petition_id) + '.csv'#petition_id
    stat = pd.read_csv(file_location)
    graph_loc = './media/graph/'
    #draw trend graph
    trend = stat['voteDate'].value_counts().sort_index()
    start_date = trend.index[0].split('-')
    year = int(start_date[0])
    month = int(start_date[1])
    date = int(start_date[2])
    time1 = datetime(year, month, date, 0, 0, 0)
    time2 = datetime.now()
    period = (time2-time1).days
    if period is 0 :
        plt.figure()
        trend = trend.cumsum()
        trend.plot()
        plt.axis('off')
        plt.savefig(graph_loc + str(petition_id) + '/trend.jpg')
    else: 
        trend_series = pd.Series(index=(pd.date_range(trend.index[0],periods = period)))
        for i in range(period):
            tmptime = time1 + timedelta(days=1*i)
            comparestr = str(tmptime.year) + "-" + str(tmptime.month) + "-" + str(tmptime.day)
            if not trend.get(comparestr):
                trend_series[comparestr] = 0
            else:
                trend_series[comparestr] = trend[comparestr]
        trend_series = trend_series.cumsum()
        trend_series.plot()
        plt.savefig(graph_loc + str(petition_id) + '/trend.jpg')#petition_id
    #draw gender graph
    gender = stat['gender'].value_counts()
    df_gender = pd.DataFrame()
    for i in range(len(gender)):
        df_gender[gender.index[i]] = [gender.values[i]]
    plt.figure()
    df_gender.plot.barh(stacked=True)
    plt.axis('off')
    plt.savefig(graph_loc + str(petition_id) + '/gender.jpg')
    #draw department graph
    department = stat['department'].value_counts()
    df_department = pd.DataFrame()
    for i in range(len(department)):
        df_department[department.index[i]] = [department.values[i]]
    plt.figure()
    df_department.plot.barh(stacked=True)
    plt.axis('off')
    plt.savefig(graph_loc + str(petition_id) + '/department.jpg')
    #draw studentid graph
    studentid = stat['studentId'].value_counts()
    df_studentid = pd.DataFrame()
    for i in range(len(studentid)):
        df_studentid[studentid.index[i]] = [studentid.values[i]]
    plt.figure()
    df_studentid.plot.barh(stacked=True)
    plt.axis('off')
    plt.savefig(graph_loc + str(petition_id) +'/studentId.jpg')
    plt.close('all')





