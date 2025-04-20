from rest_framework import serializers
from .models import Song, Video, Album, Favorite,ChatMessage
from django.contrib.auth import get_user_model
User = get_user_model()
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User; fields = ('id','username','password')
    def create(self, validated):
        user = User(username=validated['username'])
        user.set_password(validated['password']); user.save(); return user
class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta: model = ChatMessage; fields = '__all__'
class SongSerializer(serializers.ModelSerializer):
    class Meta: model = Song; fields = '__all__'

class VideoSerializer(serializers.ModelSerializer):
    class Meta: model = Video; fields = '__all__'

class AlbumSerializer(serializers.ModelSerializer):
    class Meta: model = Album; fields = ['id','name','owner','songs']

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta: model = Favorite; fields = ['id','user','song','added_at']