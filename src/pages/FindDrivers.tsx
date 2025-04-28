import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Car, Clock, MapPin, Star, X } from 'lucide-react';
import Map from '../components/map/Map';
import Button from '../components/ui/Button';
import ActiveRide from '../components/ride/ActiveRide';

interface FindDriversProps {
  pickup: string;
  dropoff: string;
  price: string;
  onClose: () => void;
}

interface DriverOffer {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  car: {
    model: string;
    color: string;
    plate: string;
  };
  price: number;
  timeLeft: number;
}

const FindDrivers = ({ pickup, dropoff, price, onClose }: FindDriversProps) => {
  const navigate = useNavigate();
  const [currentOffer, setCurrentOffer] = useState<DriverOffer | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    // Simulate finding a driver after 3 seconds
    const driverTimer = setTimeout(() => {
      setCurrentOffer({
        id: '1',
        name: 'Michael Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 4.8,
        car: {
          model: 'Toyota Camry',
          color: 'Silver',
          plate: 'ABC 123'
        },
        price: Number(price),
        timeLeft: 10
      });
    }, 3000);

    return () => clearTimeout(driverTimer);
  }, [price]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (currentOffer && timeLeft > 0 && !isAccepted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isAccepted) {
      setCurrentOffer(null);
      setTimeLeft(10);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentOffer, timeLeft, isAccepted]);

  const handleAcceptOffer = () => {
    setIsAccepted(true);
  };

  const handleDeclineOffer = () => {
    setCurrentOffer(null);
    setTimeLeft(10);
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50">
      <div className="h-full flex flex-col">
        <div className="bg-white dark:bg-gray-800 pt-safe-top px-4 py-4 shadow-sm">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold">
                {isAccepted ? 'Driver is on the way' : 'Finding Drivers'}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isAccepted ? 'Track your ride in real-time' : 'Estimated arrival: 3-5 minutes'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <Map showDriverLocation={isAccepted} />
          
          <AnimatePresence>
            {currentOffer && !isAccepted && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-3xl shadow-lg p-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={currentOffer.avatar}
                        alt={currentOffer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{currentOffer.name}</h3>
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm">{currentOffer.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-500">
                        R{currentOffer.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        {timeLeft}s left
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Car size={16} />
                    <span>
                      {currentOffer.car.color} {currentOffer.car.model} · {currentOffer.car.plate}
                    </span>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={handleAcceptOffer}
                      icon={<Clock size={18} />}
                    >
                      Accept ({timeLeft}s)
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isAccepted && currentOffer && (
            <ActiveRide driver={currentOffer} />
          )}
        </div>

        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-t-3xl shadow-lg p-4"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Car size={20} className="text-primary-500 mr-2" />
                <span className="font-medium">Your Ride</span>
              </div>
              <span className="text-xl font-bold text-primary-500">R{price}</span>
            </div>

            <div className="flex items-start space-x-2">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-success-500" />
                <div className="w-0.5 h-12 bg-gray-300 dark:bg-gray-700" />
                <div className="w-3 h-3 rounded-full bg-error-500" />
              </div>
              <div className="flex-1">
                <div className="mb-4">
                  <p className="text-sm font-medium">Pickup</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{pickup}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Dropoff</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{dropoff}</p>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={onClose}
            >
              Cancel Ride
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FindDrivers;