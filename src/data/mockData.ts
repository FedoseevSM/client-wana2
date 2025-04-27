import { Ride } from '../types/ride';

export const mockRecentRides: Ride[] = [
  {
    id: '1',
    userId: '1',
    status: 'completed',
    pickup: {
      latitude: 40.7128,
      longitude: -74.006,
      address: '350 5th Ave, New York, NY 10118'
    },
    dropoff: {
      latitude: 40.7483,
      longitude: -73.9857,
      address: 'Times Square, New York, NY 10036'
    },
    distance: 2.5,
    duration: 12,
    fare: 18.75,
    createdAt: '2025-06-15T15:30:00Z',
    completedAt: '2025-06-15T15:42:00Z',
    driver: {
      id: 'd1',
      name: 'Michael Johnson',
      rating: 4.8,
      profilePicture: 'https://randomuser.me/api/portraits/men/45.jpg',
      vehicleInfo: {
        model: 'Toyota Camry',
        color: 'Silver',
        licensePlate: 'NYC-3847'
      }
    },
    paymentMethod: 'Visa •••• 4242',
    vehicleType: 'Standard'
  },
  {
    id: '2',
    userId: '1',
    status: 'completed',
    pickup: {
      latitude: 40.7484,
      longitude: -73.9857,
      address: 'Times Square, New York, NY 10036'
    },
    dropoff: {
      latitude: 40.7831,
      longitude: -73.9592,
      address: 'Central Park, New York, NY 10024'
    },
    distance: 1.8,
    duration: 10,
    fare: 14.50,
    createdAt: '2025-06-14T12:15:00Z',
    completedAt: '2025-06-14T12:25:00Z',
    driver: {
      id: 'd2',
      name: 'Sarah Williams',
      rating: 4.9,
      profilePicture: 'https://randomuser.me/api/portraits/women/33.jpg',
      vehicleInfo: {
        model: 'Honda Civic',
        color: 'Blue',
        licensePlate: 'NYC-7621'
      }
    },
    paymentMethod: 'MasterCard •••• 8765',
    vehicleType: 'Economy'
  },
  {
    id: '3',
    userId: '1',
    status: 'cancelled',
    pickup: {
      latitude: 40.7128,
      longitude: -74.006,
      address: '350 5th Ave, New York, NY 10118'
    },
    dropoff: {
      latitude: 40.6413,
      longitude: -73.7781,
      address: 'JFK Airport, Queens, NY 11430'
    },
    distance: 17.5,
    duration: 45,
    fare: 65.00,
    createdAt: '2025-06-13T08:30:00Z',
    driver: undefined,
    paymentMethod: 'Apple Pay',
    vehicleType: 'Premium'
  },
  {
    id: '4',
    userId: '1',
    status: 'scheduled',
    pickup: {
      latitude: 40.7128,
      longitude: -74.006,
      address: '350 5th Ave, New York, NY 10118'
    },
    dropoff: {
      latitude: 40.7527,
      longitude: -73.9772,
      address: 'Grand Central, New York, NY 10017'
    },
    distance: 1.2,
    duration: 8,
    fare: 12.00,
    createdAt: '2025-06-16T10:00:00Z',
    scheduledFor: '2025-06-20T14:30:00Z',
    driver: undefined,
    paymentMethod: 'Visa •••• 4242',
    vehicleType: 'Standard'
  }
];