from rest_framework import generics, viewsets
from .models import Certificate, CaseStudy, News
from .serializers import CertificateSerializer, CaseStudySerializer, NewsSerializer
from django_filters.rest_framework import DjangoFilterBackend  # This will now work

from rest_framework import viewsets
from .models import CaseStudy
from .serializers import CaseStudySerializer
from django.http import JsonResponse
from django.conf import settings
import os

class CaseStudyViewSet(viewsets.ModelViewSet):
    queryset = CaseStudy.objects.prefetch_related('images').all()
    serializer_class = CaseStudySerializer
    lookup_field = 'slug'

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class CertificateList(generics.ListAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer

class CaseStudyList(generics.ListAPIView):
    queryset = CaseStudy.objects.all()
    serializer_class = CaseStudySerializer

class NewsList(generics.ListAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

class NewsDetail(generics.RetrieveAPIView):  # Add this
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    lookup_field = 'id'

def debug_cloudinary(request):
    return JsonResponse({
        "DEFAULT_FILE_STORAGE": settings.DEFAULT_FILE_STORAGE,
        "CLOUDINARY_CLOUD_NAME": os.environ.get('CLOUDINARY_CLOUD_NAME'),
        "CLOUDINARY_API_KEY": os.environ.get('CLOUDINARY_API_KEY'),
        "CLOUDINARY_API_SECRET": os.environ.get('CLOUDINARY_API_SECRET'),
    })

