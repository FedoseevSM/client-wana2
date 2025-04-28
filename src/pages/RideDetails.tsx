import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Phone, MessageSquare, Star, CreditCard } from 'lucide-react';
import Button from '../components/ui/Button';
import Map from '../components/map/Map';
import { mockRecentRides } from '../data/mockData';
import { useToastStore } from '../stores/toastStore';

const RideDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  
  // Find the ride from mock data
  const ride = mockRecentRides.find(r => r.id === id);
  
  if (!ride) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Ride not found</h1>
        <Button onClick={() => navigate('/home')}>Go back home</Button>
      </div>
    );
  }
  
  const statusColors = {
    completed: 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300',
    ongoing: 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300',
    cancelled: 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-300',
    scheduled: 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-300',
  };
  
  const handleCallDriver = () => {
    addToast({
      title: 'Calling Driver',
      message: 'Connecting to driver...',
      type: 'info',
    });
  };
  
  const handleMessageDriver = () => {
    addToast({
      title: 'Message Sent',
      message: 'Your message has been sent to the driver',
      type: 'success',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 pt-safe-top px-4 py-4 shadow-sm">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold">Ride Details</h1>
            <div className="flex items-center">
              <Clock size={14} className="text-gray-500 dark:text-gray-400 mr-1" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(ride.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}{' '}
                · {new Date(ride.createdAt).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="h-48">
          <Map />
        </div>
        
        <div className="p-4 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  statusColors[ride.status]
                }`}
              >
                {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
              </span>
              <span className="font-semibold text-lg">R{ride.fare.toFixed(2)}</span>
            </div>
            
            <div className="flex flex-col space-y-3 mb-4">
              <div className="flex items-start">
                <div className="flex flex-col items-center mr-2">
                  <div className="w-3 h-3 rounded-full bg-success-500 mt-1" />
                  <div className="w-0.5 h-12 bg-gray-300 dark:bg-gray-700" />
                  <div className="w-3 h-3 rounded-full bg-error-500" />
                </div>
                <div className="flex-1">
                  <div className="mb-3">
                    <p className="text-sm font-medium">Pickup</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{ride.pickup.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Dropoff</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{ride.dropoff.address}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Distance</p>
                <p className="font-medium">{ride.distance} miles</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                <p className="font-medium">{ride.duration} mins</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Payment</p>
                <p className="font-medium flex items-center">
                  <CreditCard size={14} className="mr-1" />
                  Card
                </p>
              </div>
            </div>
          </motion.div>
          
          {ride.driver && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="card p-4"
            >
              <h2 className="font-semibold mb-3">Driver Information</h2>
              <div className="flex items-center mb-4">
                <img
                  src={ride.driver.profilePicture || 'https://randomuser.me/api/portraits/men/45.jpg'}
                  alt="Driver"
                  className="w-14 h-14 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-medium">{ride.driver.name}</h3>
                  <div className="flex items-center">
                    <div className="flex items-center text-accent-500">
                      <Star size={14} className="fill-current" />
                    </div>
                    <span className="ml-1 text-sm">{ride.driver.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {ride.driver.vehicleInfo.color} {ride.driver.vehicleInfo.model}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-sm mb-1">License Plate</p>
                  <p className="font-medium">{ride.driver.vehicleInfo.licensePlate}</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    icon={<Phone size={18} />}
                    onClick={handleCallDriver}
                    className="px-3"
                  >
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    icon={<MessageSquare size={18} />}
                    onClick={handleMessageDriver}
                    className="px-3"
                  >
                    Message
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
          
          {ride.status === 'completed' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Button
                variant="primary"
                fullWidth
                onClick={() => navigate('/home')}
              >
                Book Again
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideDetails;

export { RideDetails }