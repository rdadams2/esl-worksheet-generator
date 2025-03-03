"""Script to test the authentication.

This script tests the authentication by registering a user, logging in, and accessing protected routes.
"""

import sys
import os
import requests
import json

# Base URL for the API
BASE_URL = "http://localhost:8002"

def register_user(email: str, username: str, password: str) -> dict:
    """Register a new user.
    
    Args:
        email: Email address
        username: Username
        password: Password
        
    Returns:
        dict: Response JSON
    """
    url = f"{BASE_URL}/auth/register"
    data = {
        "email": email,
        "username": username,
        "password": password
    }
    
    response = requests.post(url, json=data)
    print(f"Register response: {response.status_code}")
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.text}")
        return {}

def login(username: str, password: str) -> str:
    """Login and get an access token.
    
    Args:
        username: Username
        password: Password
        
    Returns:
        str: Access token
    """
    url = f"{BASE_URL}/auth/token"
    data = {
        "username": username,
        "password": password
    }
    
    response = requests.post(url, data=data)
    print(f"Login response: {response.status_code}")
    
    if response.status_code == 200:
        return response.json().get("access_token", "")
    else:
        print(f"Error: {response.text}")
        return ""

def get_current_user(token: str) -> dict:
    """Get the current user.
    
    Args:
        token: Access token
        
    Returns:
        dict: User information
    """
    url = f"{BASE_URL}/auth/users/me"
    headers = {
        "Authorization": f"Bearer {token}"
    }
    
    response = requests.get(url, headers=headers)
    print(f"Get current user response: {response.status_code}")
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.text}")
        return {}

def test_authentication():
    """Test the authentication flow."""
    # Register a new user
    email = "test@example.com"
    username = "testuser"
    password = "testpassword"
    
    user = register_user(email, username, password)
    print(f"Registered user: {json.dumps(user, indent=2)}")
    
    # Login
    token = login(username, password)
    if not token:
        print("Login failed")
        return
        
    print(f"Access token: {token}")
    
    # Get current user
    current_user = get_current_user(token)
    print(f"Current user: {json.dumps(current_user, indent=2)}")

if __name__ == "__main__":
    test_authentication() 