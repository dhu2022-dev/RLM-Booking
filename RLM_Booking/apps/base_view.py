from django.shortcuts import render
from django.views.generic import View

# Homepage route
class home(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'frontend/build/index.html')