from django.shortcuts import render
from django.template import context

def news(request):

    context = {

    }

    return render(request, 'content/news.html', context)


def pre_order(request):

    context = {

    }

    return render(request, 'content/pre-order.html', context)
