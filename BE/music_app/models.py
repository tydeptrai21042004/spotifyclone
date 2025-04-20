from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Song(models.Model):
    title        = models.CharField(max_length=200)
    artist       = models.CharField(max_length=200)
    album        = models.CharField(max_length=200, blank=True)
    audio_file   = models.FileField(upload_to='songs/')
    favorite     = models.BooleanField(default=False)
    is_approved  = models.BooleanField(default=False)
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} — {self.artist}"


class Video(models.Model):
    title        = models.CharField(max_length=200)
    artist       = models.CharField(max_length=200)
    video_file   = models.FileField(upload_to='videos/')
    uploaded_by  = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    is_approved  = models.BooleanField(default=False)
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Album(models.Model):
    name         = models.CharField(max_length=200)
    owner        = models.ForeignKey(User, on_delete=models.CASCADE)
    songs        = models.ManyToManyField(
                      Song,
                      blank=True,
                      related_name='albums'
                  )
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class ChatMessage(models.Model):
    sender      = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_msgs')
    recipient   = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recv_msgs')
    content     = models.TextField()
    timestamp   = models.DateTimeField(auto_now_add=True)


class Favorite(models.Model):
    user        = models.ForeignKey(User, on_delete=models.CASCADE)
    song        = models.ForeignKey(
                    Song,
                    on_delete=models.CASCADE,
                    related_name='favorites'
                 )
    added_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'song')
