from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.contrib.auth.models import AnonymousUser
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope['user']
        if user is AnonymousUser(): await self.close(); return
        self.room = self.scope['url_route']['kwargs']['room_name']
        await self.channel_layer.group_add(self.room, self.channel_name)
        await self.accept()
    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.room, self.channel_name)
    async def receive(self, text):
        data=json.loads(text); msg=data['message'];
        await self.channel_layer.group_send(
            self.room, {'type':'msg','message':msg,'sender':self.scope['user'].id}
        )
    async def msg(self,event):
        await self.send(text_data=json.dumps(event))