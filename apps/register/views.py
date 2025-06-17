# apps\register\views.py

# from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def index(request):
    return HttpResponse("App Register funcionando!")
