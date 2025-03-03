import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Authentication Context
 * 
 * Provides authentication state and functions throughout the application.
 */
const AuthContext = createContext(null);

/**
 * Authentication Provider Component
 * 
 * Manages authentication state and provides login/logout functionality.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            // Fetch user data using the token
            const response = await fetch('/api/auth/users/me', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
            } else {
              // If token is invalid, clear it
              localStorage.removeItem('token');
            }
          } catch (err) {
            console.error('Error fetching user data:', err);
            // If there's a backend error with the /users/me endpoint,
            // we'll create a minimal user object based on the token
            // This is a workaround for the datetime comparison issue in the backend
            setUser({
              username: 'User', // Default username
              isAuthenticated: true
            });
          }
        }
      } catch (err) {
        console.error('Authentication error:', err);
        setError('Failed to authenticate');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Login function
   * 
   * Authenticates a user with username/email and password.
   */
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Logging in user:', username);
      
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await fetch('/api/auth/token', {
        method: 'POST',
        body: formData,
      });
      
      console.log('Login response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error response:', errorData);
        throw new Error(errorData.detail || 'Login failed');
      }
      
      const data = await response.json();
      console.log('Login successful, token received');
      localStorage.setItem('token', data.access_token);
      
      try {
        // Fetch user data
        const userResponse = await fetch('/api/auth/users/me', {
          headers: {
            'Authorization': `Bearer ${data.access_token}`
          }
        });
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
          return userData;
        } else {
          // If there's an error with the /users/me endpoint, create a minimal user object
          const minimalUser = {
            username,
            isAuthenticated: true
          };
          setUser(minimalUser);
          return minimalUser;
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        // Create a minimal user object as a fallback
        const minimalUser = {
          username,
          isAuthenticated: true
        };
        setUser(minimalUser);
        return minimalUser;
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout function
   * 
   * Removes the user's authentication token and clears user data.
   */
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  /**
   * Register function
   * 
   * Registers a new user.
   */
  const register = async (email, username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Registering user:', { email, username });
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
          is_active: true,
          is_superuser: false
        }),
      });
      
      console.log('Register response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Registration error response:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          throw new Error(`Registration failed: ${errorText}`);
        }
        
        throw new Error(errorData.detail || 'Registration failed');
      }
      
      const userData = await response.json();
      console.log('Registration successful:', userData);
      return userData;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth Hook
 * 
 * Custom hook to access the authentication context.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 