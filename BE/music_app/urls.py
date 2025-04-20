# music_app/urls.py

from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import (
    RegisterAPIView,
    SongViewSet,
    VideoViewSet,
    AlbumViewSet,
    FavoriteViewSet,
    TopFavoritesAPIView,
    ChatMessageViewSet,
)
from .consumers import ChatConsumer

router = DefaultRouter()
router.register(r'videos',    VideoViewSet)
router.register(r'albums',    AlbumViewSet)
router.register(r'songs',     SongViewSet)
router.register(r'favorites', FavoriteViewSet)
router.register(r'chat',      ChatMessageViewSet, basename='chat')

urlpatterns = [
    # ─── AUTH ENDPOINTS ───────────────────────────────────────────────────────
    # Register:
    path('auth/register/', RegisterAPIView.as_view(), name='register'),
    # JWT “login” → issue access & refresh:
    path('auth/token/',         TokenObtainPairView.as_view(),  name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(),    name='token_refresh'),
    path('auth/token/verify/',  TokenVerifyView.as_view(),     name='token_verify'),

    # ─── YOUR APP ENDPOINTS ───────────────────────────────────────────────────
    path('top-favorites/', TopFavoritesAPIView.as_view(), name='top-favorites'),
    path('', include(router.urls)),
]

# WebSocket chat route (if you’re using Channels)
websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>[^/]+)/$', ChatConsumer.as_asgi()),
]
