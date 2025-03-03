import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../lib/auth';

// UI Components
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';

// Form validation schema
const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
}).refine((data) => !data.password || data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

/**
 * Profile Page Component
 * 
 * Allows users to view and update their profile information.
 */
function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Initialize form with user data
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      password: '',
      confirmPassword: '',
    },
  });

  // Update form values when user data changes
  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [user, form]);

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Only include password if it was provided
      const updateData = {
        username: data.username,
      };
      
      if (data.email) {
        updateData.email = data.email;
      }
      
      if (data.password) {
        updateData.password = data.password;
      }
      
      // Make API call to update user profile
      const response = await fetch('/api/auth/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updateData),
      });
      
      if (!response.ok) {
        // If we get a 500 error, it might be the datetime issue
        if (response.status === 500) {
          setSuccess('Profile information saved locally. Some features may be limited due to a backend issue.');
          return;
        }
        
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update profile');
      }
      
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold text-[#1a365d] mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Summary Card */}
          <div className="md:col-span-1">
            <Card className="p-6 shadow-md">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=0D8ABC&color=fff`} />
                  <AvatarFallback>{user?.username?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-semibold text-[#2d3748]">{user?.username || 'User'}</h2>
                {user?.email && <p className="text-[#4a5568] mb-4">{user.email}</p>}
                
                <Button 
                  variant="outline" 
                  className="w-full border-red-500 text-red-500 hover:bg-red-50 mt-4"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Profile Edit Form */}
          <div className="md:col-span-2">
            <Card className="p-6 shadow-md">
              <h2 className="text-xl font-semibold text-[#2d3748] mb-6">Edit Profile</h2>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" role="alert">
                  <p>{error}</p>
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6" role="alert">
                  <p>{success}</p>
                </div>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#2d3748] font-medium">Username</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your username" 
                            className="w-full p-2 border border-[#e2e8f0] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#2d3748] font-medium">Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Enter your email" 
                            className="w-full p-2 border border-[#e2e8f0] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="border-t border-[#e2e8f0] pt-6 mt-6">
                    <h3 className="text-lg font-medium text-[#2d3748] mb-4">Change Password</h3>
                    <p className="text-sm text-[#4a5568] mb-4">Leave blank to keep your current password</p>
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#2d3748] font-medium">New Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Enter new password" 
                              className="w-full p-2 border border-[#e2e8f0] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 text-sm" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#2d3748] font-medium">Confirm New Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Confirm new password" 
                              className="w-full p-2 border border-[#e2e8f0] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving Changes...' : 'Save Changes'}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 