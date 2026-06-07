import { create } from 'zustand';
import { supabase } from '../supabaseClient';

export const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isLoading: false,
  error: null,

  // Register a new user
  register: async (email, password, firstName, lastName) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName, last_name: lastName }
        }
      });

      if (error) throw error;

      // Insert into public.users table (optional, if using a trigger this is handled)
      const { error: profileError } = await supabase
        .from('users')
        .insert([{ id: data.user.id, email, first_name: firstName, last_name: lastName }]);

      if (profileError) console.error("Profile sync error:", profileError);

      set({ user: data.user, isLoading: false });
      return { data };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Login user
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Get user profile from public users table
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      set({ 
        user: { ...data.user, ...profile }, 
        accessToken: data.session?.access_token,
        isLoading: false 
      });
      return { data };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    await supabase.auth.signOut();
    set({
      user: null,
      accessToken: null,
      error: null,
    });
  },

  // Get current user
  getCurrentUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("Not logged in");

      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      set({ user: { ...user, ...profile }, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Update user profile
  updateProfile: async (firstName, lastName) => {
    const { user } = get();
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ first_name: firstName, last_name: lastName })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      set({ user: { ...user, ...data }, isLoading: false });
      return { data };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  }
}));
