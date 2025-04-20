import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import music_app.urls as music_routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'spotify_clone.settings')
application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter(music_routing.websocket_urlpatterns)
    ),
})