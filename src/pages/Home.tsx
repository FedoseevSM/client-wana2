import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Star, Car, DollarSign, ChevronDown, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Map from '../components/map/Map';

const Home = () => {
  const [showRideForm, setShowRideForm] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [price, setPrice] = useState(15);

  const handleLocationSelect = (longitude: number, latitude: number) => {
    console.log(`Selected location: ${latitude}, ${longitude}`);
  };

  const toggleRideForm = () => {
    setShowRideForm(!showRideForm);
  };

  const handleRequestRide = () => {
    console.log('Requesting ride with price:', price);
    setShowRideForm(false);
  };

  const handlePriceChange = (amount: number) => {
    setPrice(Math.max(5, price + amount));
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
            className="absolute left-0 right-0 bottom-0 pb-20"
          >
            <div className="bg-white dark:bg-gray-900 rounded-t-3xl shadow-lg px-4 pt-2 pb-6">
              <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4" />
              
              <Button 
                onClick={toggleRideForm}
                variant="outline" 
                fullWidth 
                className="mb-4"
              >
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                    <Search className="w-5 h-5 text-primary-500" />
                  </div>
                  <span className="flex-grow text-left ml-3 text-gray-500">Where to?</span>
                </div>
              </Button>

              <div className="space-y-4">
                <div className="flex space-x-3 overflow-x-auto py-2 no-scrollbar">
                  <Button variant="outline" className="flex-shrink-0">
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                  <Button variant="outline" className="flex-shrink-0">
                    <Star className="w-4 h-4 mr-2" />
                    Saved Places
                  </Button>
                  <Button variant="outline" className="flex-shrink-0">
                    <MapPin className="w-4 h-4 mr-2" />
                    Work
                  </Button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                        <Car className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <p className="font-medium">Current Price</p>
                        <p className="text-sm text-gray-500">Set your own price</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-primary-500" />
                      <span className="text-xl font-bold text-primary-500">{price}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handlePriceChange(-1)}
                      className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-900 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <span className="text-xl font-bold">-</span>
                    </button>
                    <div className="text-center">
                      <DollarSign className="w-6 h-6 text-primary-500 inline-block" />
                      <span className="text-3xl font-bold">{price}</span>
                    </div>
                    <button
                      onClick={() => handlePriceChange(1)}
                      className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-900 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <span className="text-xl font-bold">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-white dark:bg-gray-900"
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-semibold">Request Ride</h2>
                <button 
                  onClick={toggleRideForm}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-4 space-y-4">
                <div className="space-y-4">
                  <Input
                    label="Pickup Location"
                    placeholder="Enter pickup address"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    icon={<MapPin className="w-4 h-4 text-gray-500" />}
                  />
                  
                  <Input
                    label="Dropoff Location"
                    placeholder="Enter destination address"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    icon={<MapPin className="w-4 h-4 text-gray-500" />}
                  />
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Car className="w-5 h-5 text-primary-500" />
                      <span className="font-medium">Your Price</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">~15 min</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handlePriceChange(-1)}
                      className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-900 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <span className="text-xl font-bold">-</span>
                    </button>
                    <div className="text-center">
                      <DollarSign className="w-6 h-6 text-primary-500 inline-block" />
                      <span className="text-3xl font-bold">{price}</span>
                    </div>
                    <button
                      onClick={() => handlePriceChange(1)}
                      className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-900 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <span className="text-xl font-bold">+</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleRequestRide}
                  disabled={!pickupLocation || !dropoffLocation}
                >
                  Find Drivers
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;

export { Home };