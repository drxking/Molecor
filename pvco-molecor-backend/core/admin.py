from django.contrib import admin
from django.utils.html import format_html
from .models import Certificate, CaseStudy, CaseStudyImage, News

# Add inline for CaseStudyImage
class CaseStudyImageInline(admin.TabularInline):
    model = CaseStudyImage
    extra = 1
    readonly_fields = ['image_preview']

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 100px;" />', obj.image.url)
        return "No image"
    image_preview.short_description = 'Preview'

@admin.register(CaseStudy)
class CaseStudyAdmin(admin.ModelAdmin):
    inlines = [CaseStudyImageInline]  # Add this line
    list_display = ('title', 'category', 'year', 'region', 'slug', 'main_image_preview')
    list_filter = ('category', 'year', 'region')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at', 'updated_at', 'main_image_preview')

    def main_image_preview(self, obj):
        featured_image = obj.images.filter(is_featured=True).first()
        if featured_image:
            return format_html('<img src="{}" style="max-height: 100px;" />', featured_image.image.url)
        return "No featured image"
    main_image_preview.short_description = 'Featured Image'

admin.site.register(Certificate)
admin.site.register(News)