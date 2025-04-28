import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Star, Car, X, Crosshair, CreditCard, Wallet } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Map from '../components/map/Map';
import BurgerMenu from '../components/layout/BurgerMenu';
import FindDrivers from './FindDrivers';

const Home = () => {
  const [showRideForm, setShowRideForm] = useState(false);
  const [showFindDrivers, setShowFindDrivers] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [price, setPrice] = useState('150');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');

  const handleLocationSelect = (longitude: number, latitude: number, address?: string) => {
    if (address) {
      if (!pickupLocation) {
        setPickupLocation(address);
      } else if (!dropoffLocation) {
        setDropoffLocation(address);
      }
    }
  };

  const toggleRideForm = () => {
    setShowRideForm(!showRideForm);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPrice(value);
  };

  const handleFindDrivers = () => {
    setShowFindDrivers(true);
  };

  return (
    <div className="h-screen flex flex-col relative">
      <div className="absolute top-safe-top left-4 z-10 flex items-center">
        <BurgerMenu />
        {/* <div className="ml-3 flex items-center">
          <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
            <Car className="w-5 h-5 text-primary-500" />
          </div>
          <span className="ml-2 text-lg font-bold text-white">Wana2</span>
        </div> */}
      </div>
      
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
            className="absolute left-0 bottom-0 right-0"
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
                        <p className="font-medium">Your Price</p>
                        <p className="text-sm text-gray-500">Enter your offer</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xl font-bold text-primary-500">R</span>
                      <input
                        type="text"
                        value={price}
                        onChange={handlePriceChange}
                        className="w-20 text-xl font-bold text-primary-500 bg-transparent border-none focus:outline-none text-right"
                        placeholder="0"
                      />
                    </div>
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
                <h2 className="text-lg font-semibold">Set Location</h2>
                <button 
                  onClick={toggleRideForm}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-4 space-y-4">
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      label="Pickup Location"
                      placeholder="Enter pickup address"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      icon={<MapPin className="w-4 h-4 text-gray-500" />}
                    />
                    <button
                      onClick={() => {}}
                      className="absolute right-2 top-9 p-2 text-gray-500 hover:text-primary-500"
                    >
                      <Crosshair size={16} />
                    </button>
                  </div>
                  
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

                  <div className="flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-primary-500 mr-2">R</span>
                    <input
                      type="text"
                      value={price}
                      onChange={handlePriceChange}
                      className="text-3xl font-bold text-primary-500 bg-transparent border-none focus:outline-none text-center w-32"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setPaymentMethod('cash')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                        paymentMethod === 'cash'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Wallet size={18} />
                      <span>Cash</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                        paymentMethod === 'card'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <CreditCard size={18} />
                      <span>Card</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleFindDrivers}
                  disabled={!pickupLocation || !dropoffLocation}
                >
                  Find Drivers
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFindDrivers && (
          <FindDrivers
            pickup={pickupLocation}
            dropoff={dropoffLocation}
            price={price}
            onClose={() => setShowFindDrivers(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;

export { Home };