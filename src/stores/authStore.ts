import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  profilePicture: string | null;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phone: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      login: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const user: User = {
          id: data.user.id,
          name: profile?.name || null,
          email: data.user.email,
          phone: profile?.phone || null,
          profilePicture: profile?.profile_picture || null,
          role: 'user',
        };

        set({ user, isAuthenticated: true, token: data.session?.access_token || null });
      },
      loginWithPhone: async (phone: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          phone,
          password,
        });

        if (error) throw error;

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const user: User = {
          id: data.user.id,
          name: profile?.name || null,
          email: data.user.email,
          phone: profile?.phone || null,
          profilePicture: profile?.profile_picture || null,
          role: 'user',
        };

        set({ user, isAuthenticated: true, token: data.session?.access_token || null });
      },
      register: async (email: string, password: string, name: string) => {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (authError) throw authError;
        if (!authData.user) throw new Error('Registration failed');

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              name,
              email,
            },
          ]);

        if (profileError) throw profileError;

        const user: User = {
          id: authData.user.id,
          name,
          email: authData.user.email,
          phone: null,
          profilePicture: null,
          role: 'user',
        };

        set({ user, isAuthenticated: true, token: authData.session?.access_token || null });
      },
      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, isAuthenticated: false, token: null });
      },
      updateUser: async (userData) => {
        const { user } = get();
        if (!user) return;

        const { error } = await supabase
          .from('profiles')
          .update({
            name: userData.name,
            phone: userData.phone,
            profile_picture: userData.profilePicture,
          })
          .eq('id', user.id);

        if (error) throw error;

        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
      isAdmin: () => get().user?.role === 'admin',
    }),
    {
      name: 'auth-storage',
    }
  )
);