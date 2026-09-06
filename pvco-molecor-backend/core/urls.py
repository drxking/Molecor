from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    NewsList, 
    NewsDetail, 
    CaseStudyViewSet,  # Remove CaseStudyList as it's handled by the ViewSet
    CertificateList,
    debug_cloudinary
)

# Initialize router
router = DefaultRouter()

# Register the CaseStudyViewSet with the router
router.register(r'case-studies', CaseStudyViewSet, basename='case-study')

urlpatterns = [
    # News Endpoints
    path('news/', NewsList.as_view(), name='news-list'),
    path('news/<int:id>/', NewsDetail.as_view(), name='news-detail'),

    # Certificates Endpoint
    path('certificates/', CertificateList.as_view(), name='certificate-list'),

    # Debug Endpoint
    path('debug-cloudinary/', debug_cloudinary),
]

# Include the router URLs
urlpatterns += router.urls