export type RideStatus = 'completed' | 'ongoing' | 'cancelled' | 'scheduled';

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface Driver {
  id: string;
  name: string;
  rating: number;
  profilePicture?: string;
  vehicleInfo: {
    model: string;
    color: string;
    licensePlate: string;
  };
}

export interface Ride {
  id: string;
  userId: string;
  status: RideStatus;
  pickup: Location;
  dropoff: Location;
  distance: number; // in miles
  duration: number; // in minutes
  fare: number;
  createdAt: string;
  scheduledFor?: string;
  completedAt?: string;
  driver?: Driver;
  paymentMethod: string;
  vehicleType: string;
}