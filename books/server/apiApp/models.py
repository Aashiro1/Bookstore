from django.db import models
from django.contrib.auth.models import AbstractUser

class Book(models.Model):
    book_name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    genre = models.CharField(max_length=50)
    description = models.TextField()
    year = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='book_images/', null=True, blank=True)  # New field

    def __str__(self):
        return f"{self.book_name} by {self.author}"



class CustomUser(AbstractUser):
    name = models.CharField(max_length=100)
    address = models.TextField()
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.username
