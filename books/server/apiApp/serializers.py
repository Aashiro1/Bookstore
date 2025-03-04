from rest_framework import serializers
from .models import Book, CustomUser


class BookSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Book
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('__all__')


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'name', 'address', 'phone', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            name=validated_data.get('name', ''),
            address=validated_data.get('address', ''),
            phone=validated_data.get('phone', ''),
            password=validated_data['password']
        )
        return user