/*
  # Create rides table and related schemas

  1. New Tables
    - `rides`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `status` (text)
      - `pickup_address` (text)
      - `pickup_lat` (numeric)
      - `pickup_lng` (numeric)
      - `dropoff_address` (text)
      - `dropoff_lat` (numeric)
      - `dropoff_lng` (numeric)
      - `distance` (numeric)
      - `duration` (numeric)
      - `fare` (numeric)
      - `payment_method` (text)
      - `vehicle_type` (text)
      - `scheduled_for` (timestamptz)
      - `created_at` (timestamptz)
      - `completed_at` (timestamptz)

  2. Security
    - Enable RLS on `rides` table
    - Add policies for authenticated users to:
      - Read their own rides
      - Create new rides
      - Update their own rides
*/

CREATE TABLE IF NOT EXISTS rides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  status text CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')) DEFAULT 'scheduled',
  pickup_address text NOT NULL,
  pickup_lat numeric NOT NULL,
  pickup_lng numeric NOT NULL,
  dropoff_address text NOT NULL,
  dropoff_lat numeric NOT NULL,
  dropoff_lng numeric NOT NULL,
  distance numeric,
  duration numeric,
  fare numeric NOT NULL,
  payment_method text NOT NULL,
  vehicle_type text DEFAULT 'standard',
  scheduled_for timestamptz,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE rides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own rides"
  ON rides
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create rides"
  ON rides
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own rides"
  ON rides
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);