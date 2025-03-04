from django.urls import path, include
from .views import BookListCreate, BookDetailUpdateDelete , RegisterView, LoginView, UserRoleView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("books/", BookListCreate.as_view(), name="book-list"),
    path("books/<int:pk>/delete/", BookDetailUpdateDelete.as_view(), name="book-detail-delete"),
    path("books/<int:pk>/update/", BookDetailUpdateDelete.as_view(), name="book-detail-update"),
    path("books/<int:pk>/", BookDetailUpdateDelete.as_view(), name="book-detail-view-specific"),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("user-role/", UserRoleView.as_view(), name="user-role"),
]
