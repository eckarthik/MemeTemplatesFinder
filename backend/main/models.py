from django.db import models


# Create your models here.
class Templates(models.Model):
    class Meta:
        db_table = 'templates'
        managed = False

    post_id = models.BigIntegerField(primary_key=True)
    post_shortcode = models.CharField(max_length=15)
    display_url = models.CharField(max_length=300)
    caption = models.CharField(max_length=5000)
    hashtag = models.CharField(max_length=500)
    image_b64 = models.TextField()
