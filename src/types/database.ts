export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          phone: string | null
          profile_picture: string | null
          rating: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          phone?: string | null
          profile_picture?: string | null
          rating?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          phone?: string | null
          profile_picture?: string | null
          rating?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      rides: {
        Row: {
          id: string
          user_id: string
          status: string
          pickup_address: string
          pickup_lat: number
          pickup_lng: number
          dropoff_address: string
          dropoff_lat: number
          dropoff_lng: number
          distance: number | null
          duration: number | null
          fare: number
          payment_method: string
          vehicle_type: string
          scheduled_for: string | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          status?: string
          pickup_address: string
          pickup_lat: number
          pickup_lng: number
          dropoff_address: string
          dropoff_lat: number
          dropoff_lng: number
          distance?: number | null
          duration?: number | null
          fare: number
          payment_method: string
          vehicle_type?: string
          scheduled_for?: string | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          pickup_address?: string
          pickup_lat?: number
          pickup_lng?: number
          dropoff_address?: string
          dropoff_lat?: number
          dropoff_lng?: number
          distance?: number | null
          duration?: number | null
          fare?: number
          payment_method?: string
          vehicle_type?: string
          scheduled_for?: string | null
          created_at?: string
          completed_at?: string | null
        }
      }
    }
  }
}