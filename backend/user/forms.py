from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from .models import User

class UserCreationForm(forms.ModelForm):
    password = forms.CharField(label = 'Password', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email', 'nickname', 'gender', 'status', 
                'studentId', 'department', 'major', 'studentStatus')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user

class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ('email', 'nickname', 'gender', 'status',
                'studentId', 'department', 'major', 'studentStatus')

    def clean_password(self):
        return self.initial['password']
