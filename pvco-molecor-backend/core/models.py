from django.db import models
from django.utils.text import slugify
from cloudinary_storage.storage import MediaCloudinaryStorage
from cloudinary.models import CloudinaryField

class CaseStudy(models.Model):
    CATEGORY_CHOICES = [
        ('TOM_PVC-O', 'TOM PVC-O Pipes'),
        ('FITTINGS', 'Fittings'),
        ('VALVES', 'Valves'),
    ]
    
    WATER_APPLICATION_CHOICES = [
        ('POTABLE', 'Potable water supply'),
        ('IRRIGATION', 'Irrigation'),
        ('INDUSTRIAL', 'Industrial'),
        ('WASTEWATER', 'Wastewater'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)  # Allow blank for auto-generation
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='TOM_PVC-O')
    water_application = models.CharField(max_length=50, choices=WATER_APPLICATION_CHOICES, default='POTABLE')
    year = models.PositiveIntegerField(null=True, blank=True)
    region = models.CharField(max_length=100, blank=True)
    constructor = models.CharField(max_length=100, blank=True)
    promoter = models.CharField(max_length=100, blank=True)
    total_length = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    specifications = models.JSONField(default=list, blank=True)
    content = models.TextField(blank=True)
    value = models.CharField(max_length=100, blank=True)
    completion_date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=100, blank=True)
    testimonial = models.TextField(blank=True)
    testimonial_author = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class CaseStudyImage(models.Model):
    case_study = models.ForeignKey(CaseStudy, related_name='images', on_delete=models.CASCADE)
    image = CloudinaryField('image', folder='case_studies')
    caption = models.CharField(max_length=200, blank=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.case_study.title}"

class Certificate(models.Model):
    title = models.CharField(max_length=200)
    image = CloudinaryField('image', folder='certificates')
    issued_date = models.DateField()
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title

# class Certificate(models.Model):
#     title = models.CharField(max_length=200)
#     image = models.ImageField(upload_to='certificates/')
#     issued_date = models.DateField()
#     description = models.TextField(blank=True)

#     def __str__(self):
#         return self.title

# class CaseStudy(models.Model):
#     title = models.CharField(max_length=200)
#     content = models.TextField()
#     date = models.DateField()
#     image = models.ImageField(upload_to='case_studies/', blank=True)

#     def __str__(self):
#         return self.title

class News(models.Model):
    CATEGORY_CHOICES = [
        ('NEWS', 'News'),
        ('EVENT', 'Event'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(null=True, blank=True)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, default='NEWS')
    summary = models.TextField(help_text="A short summary or introduction for the news/event.")
    content = models.TextField(blank=True, help_text="The full content of the article. Optional.")
    image = CloudinaryField('image', folder='news')
    published_date = models.DateField()
    event_date_start = models.DateTimeField(null=True, blank=True, help_text="Start date and time of the event.")
    event_date_end = models.DateTimeField(null=True, blank=True, help_text="End date and time of the event.")
    location = models.CharField(max_length=200, blank=True, help_text="Location of the event, e.g., 'Düsseldorf, Germany'.")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
