from rest_framework import viewsets, generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db.models import Count
from django.contrib.auth import get_user_model
from .models import Song, Video, Album, Favorite, ChatMessage
from .serializers import (
    RegisterSerializer, SongSerializer, VideoSerializer,
    AlbumSerializer, FavoriteSerializer, ChatMessageSerializer
)

User = get_user_model()

class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.none()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class LoginAPIView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]

class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.filter(is_approved=True).order_by('-created_at')
    serializer_class = SongSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user, is_approved=False)

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.filter(is_approved=True).order_by('-created_at')
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user, is_approved=False)

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all().order_by('-created_at')
    serializer_class = AlbumSerializer
    permission_classes = [permissions.IsAuthenticated]

class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorite.objects.all().order_by('-added_at')
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class TopFavoritesAPIView(generics.ListAPIView):
    queryset = Song.objects.filter(is_approved=True).annotate(
        fav_count=Count('favorite')
    ).order_by('-fav_count')[:10]
    serializer_class = SongSerializer
    permission_classes = [permissions.AllowAny]

class ChatMessageViewSet(viewsets.ModelViewSet):
    serializer_class = ChatMessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        other = self.request.query_params.get('user')
        return (
            ChatMessage.objects.filter(sender=user, recipient_id=other) |
            ChatMessage.objects.filter(sender_id=other, recipient=user)
        )