from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from .models import Templates


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Templates
        fields = ['post_id', 'post_shortcode', 'display_url', 'caption', 'hashtag', 'image_b64']


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[
        UniqueValidator(queryset=User.objects.all(), message="Email is already used")])
    username = serializers.CharField(required=True, validators=[
        UniqueValidator(queryset=User.objects.all(), message="Username is already used")])
    password = serializers.CharField(required=True, min_length=8)
    first_name = serializers.CharField(min_length=3)
    last_name = serializers.CharField(min_length=1)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
