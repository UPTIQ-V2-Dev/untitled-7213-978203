import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth';
import { getStoredUser, isAuthenticated, clearAuthData } from '@/lib/api';
import type { LoginRequest, SignupRequest, User } from '@/types/user';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: () => getStoredUser(),
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'user'], data.user);
      navigate('/');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (userData: SignupRequest) => authService.register(userData),
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'user'], data.user);
      navigate('/');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'user'], null);
      queryClient.clear();
      navigate('/login');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Clear local data even if logout request fails
      clearAuthData();
      queryClient.setQueryData(['auth', 'user'], null);
      queryClient.clear();
      navigate('/login');
    },
  });

  return {
    user: user as User | null,
    isAuthenticated: isAuthenticated(),
    isLoading: isLoadingUser,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};