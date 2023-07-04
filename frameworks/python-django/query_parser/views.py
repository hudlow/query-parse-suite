from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime, timezone
import json

def index(request):
  parameters = {}
  for param in request.GET:
    parameters[param] = request.GET.get(param)

    if (param == 'cast_to_integer'):
      try:
        parameters[param] = int(parameters[param])
      except:
        parameters[param] = None
    if (param == 'cast_to_float'):
      try:
        parameters[param] = float(parameters[param])
      except:
        parameters[param] = None
    if (param == 'cast_to_boolean'):
      try:
        parameters[param] = bool(parameters[param])
      except:
        parameters[param] = None
    if (param == 'cast_to_date_time'):
      try:
        parameters[param] = datetime.fromisoformat(parameters[param]).astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3]+'Z'
      except:
        parameters[param] = None
  return JsonResponse(parameters)
