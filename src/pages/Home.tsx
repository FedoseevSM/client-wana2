import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Map from '../components/map/Map';
import RideCard from '../components/ride/RideCard';
import { mockRecentRides } from '../data/mockData';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showRideForm, setShowRideForm] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  
  const handleLocationSelect = (longitude: number, latitude: number) => {
    // In a real app, we would use reverse geocoding to get an address
    console.log(`Selected location: ${latitude}, ${longitude}`);
  };

  const toggleRideForm = () => {
    setShowRideForm(!showRideForm);
  };

  const handleRequestRide = () => {
    // Handle ride request logic
    console.log('Requesting ride from', pickupLocation, 'to', dropoffLocation);
    setShowRideForm(false);
  };

  return (
    <div className="h-screen flex flex-col relative">
      <div className="flex-1">
        <Map onLocationSelect={handleLocationSelect} />
      </div>
      
      <AnimatePresence>
        {!showRideForm ? (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute left-0 right-0 bottom-0 pb-20 px-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-t-3xl shadow-lg p-4 pb-6">
              <div className="mb-4">
                <Button 
                  onClick={toggleRideForm}
                  variant="outline" 
                  fullWidth 
                  className="flex items-center"
                >
                  <Search size={16} className="mr-2 text-gray-500" />
                  <span className="text-left text-gray-500">Where to?</span>
                </Button>
              </div>
              
              <div className="flex space-x-3 mb-4 overflow-x-auto py-1 no-scrollbar">
                <Button variant="outline" className="whitespace-nowrap">
                  <Clock size={16} className="mr-2" /> Schedule
                </Button>
                <Button variant="outline" className="whitespace-nowrap">
                  <Star size={16} className="mr-2" /> Favorites
                </Button>
                <Button variant="outline" className="whitespace-nowrap">
                  <MapPin size={16} className="mr-2" /> Home
                </Button>
                <Button variant="outline" className="whitespace-nowrap">
                  <MapPin size={16} className="mr-2" /> Work
                </Button>
              </div>
              
              <h2 className="font-semibold text-lg mb-3">Recent Rides</h2>
              
              <div className="space-y-3">
                {mockRecentRides.slice(0, 2).map((ride) => (
                  <RideCard key={ride.id} ride={ride} />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute left-0 right-0 bottom-0 pb-20 px-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-t-3xl shadow-lg p-4 pb-6">
              <h2 className="font-semibold text-lg mb-4">Request a Ride</h2>
              
              <div className="space-y-4">
                <Input
                  label="Pickup Location"
                  placeholder="Enter pickup address"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  icon={<MapPin size={16} className="text-gray-500" />}
                />
                
                <Input
                  label="Dropoff Location"
                  placeholder="Enter destination address"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  icon={<MapPin size={16} className="text-gray-500" />}
                />
                
                <div className="flex space-x-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={toggleRideForm}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  
                  <Button 
                    variant="primary" 
                    onClick={handleRequestRide}
                    className="flex-1"
                    disabled={!pickupLocation || !dropoffLocation}
                  >
                    Request Ride
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;

export { Home }