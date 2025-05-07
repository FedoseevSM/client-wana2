import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type Ride = Database['public']['Tables']['rides']['Row'];

interface RideState {
  rides: Ride[];
  loading: boolean;
  error: string | null;
  fetchRides: () => Promise<void>;
  createRide: (ride: Omit<Ride, 'id' | 'created_at' | 'completed_at'>) => Promise<void>;
  updateRideStatus: (id: string, status: string) => Promise<void>;
}

export const useRideStore = create<RideState>((set, get) => ({
  rides: [],
  loading: false,
  error: null,
  fetchRides: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ rides: data || [], error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  createRide: async (ride) => {
    try {
      const { error } = await supabase.from('rides').insert([ride]);
      if (error) throw error;
      get().fetchRides();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  updateRideStatus: async (id, status) => {
    try {
      const { error } = await supabase
        .from('rides')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      get().fetchRides();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));