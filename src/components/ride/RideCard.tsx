import { Clock, MapPin, CreditCard, Car } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '../../utils/cn';
import { Ride } from '../../types/ride';
import { Link } from 'react-router-dom';

interface RideCardProps {
  ride: Ride;
  isActive?: boolean;
}

const RideCard = ({ ride, isActive = false }: RideCardProps) => {
  const statusColors = {
    completed: 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300',
    ongoing: 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300',
    cancelled: 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-300',
    scheduled: 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-300',
  };

  const rideTime = new Date(ride.createdAt);

  return (
    <Link
      to={`/ride/${ride.id}`}
      className={cn(
        'block card transition-all duration-200 overflow-hidden',
        isActive ? 'border-primary-500 shadow-md' : 'hover:shadow-md'
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span
            className={cn(
              'text-xs font-medium px-2 py-1 rounded-full',
              statusColors[ride.status]
            )}
          >
            {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Clock size={14} className="mr-1" />
            {formatDistanceToNow(rideTime, { addSuffix: true })}
          </span>
        </div>

        <div className="flex items-center mb-3">
          <Car size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
          <span className="text-sm">{ride.vehicleType} · {ride.driver?.name || 'Unassigned'}</span>
        </div>

        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-start">
            <div className="flex flex-col items-center mr-2">
              <div className="w-3 h-3 rounded-full bg-success-500 mt-1" />
              <div className="w-0.5 h-8 bg-gray-300 dark:bg-gray-700" />
              <div className="w-3 h-3 rounded-full bg-error-500" />
            </div>
            <div className="flex-1">
              <div className="mb-2">
                <p className="text-sm font-medium">Pickup</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{ride.pickup.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Dropoff</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{ride.dropoff.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-800 pt-3">
          <div className="flex items-center">
            <CreditCard size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm">{ride.paymentMethod}</span>
          </div>
          <div className="text-lg font-semibold">R{ride.fare.toFixed(2)}</div>
        </div>
      </div>
    </Link>
  );
};

export default RideCard;