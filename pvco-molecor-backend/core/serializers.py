from rest_framework import serializers
from .models import Certificate, CaseStudy, News
from rest_framework import serializers
from .models import CaseStudy, CaseStudyImage
from rest_framework import serializers
from .models import CaseStudy, CaseStudyImage

class CaseStudyImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = CaseStudyImage
        fields = ['id', 'image_url', 'caption', 'is_featured']

    def get_image_url(self, obj):
        if obj.image and hasattr(obj.image, 'url'):
            return obj.image.url
        return None

class CaseStudySerializer(serializers.ModelSerializer):
    images = CaseStudyImageSerializer(many=True, read_only=True)
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    water_application_display = serializers.CharField(source='get_water_application_display', read_only=True)
    completion_date = serializers.DateField(format='%Y-%m-%d', required=False)

    class Meta:
        model = CaseStudy
        fields = [
            'id', 'title', 'slug', 'category', 'category_display',
            'water_application', 'water_application_display', 'year',
            'region', 'constructor', 'promoter', 'total_length',
            'specifications', 'content', 'value', 'completion_date',
            'location', 'testimonial', 'testimonial_author', 'images',
            'created_at', 'updated_at'
        ]


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if hasattr(instance, 'image') and instance.image and hasattr(instance.image, 'url'):
            representation['image'] = instance.image.url
        return representation



class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if hasattr(instance, 'image') and instance.image and hasattr(instance.image, 'url'):
            representation['image'] = instance.image.url
        return representation