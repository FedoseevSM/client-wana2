import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Phone, MessageSquare, Star } from 'lucide-react';
import Button from '../ui/Button';
import { useToastStore } from '../../stores/toastStore';

interface ActiveRideProps {
  driver: {
    name: string;
    avatar: string;
    rating: number;
    car: {
      model: string;
      color: string;
      plate: string;
    };
  };
}

const ActiveRide = ({ driver }: ActiveRideProps) => {
  const [estimatedTime, setEstimatedTime] = useState(5);
  const { addToast } = useToastStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedTime((prev) => Math.max(0, prev - 1));
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleCall = () => {
    addToast({
      title: 'Calling Driver',
      message: 'Connecting to driver...',
      type: 'info'
    });
  };

  const handleMessage = () => {
    addToast({
      title: 'Message Sent',
      message: 'Your message has been sent to the driver',
      type: 'success'
    });
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-3xl shadow-lg"
    >
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={driver.avatar}
              alt={driver.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium">{driver.name}</h3>
              <div className="flex items-center">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="ml-1 text-sm">{driver.rating}</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary-500">
              {estimatedTime} min
            </div>
            <div className="text-sm text-gray-500">arrival</div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Car size={16} />
          <span>
            {driver.car.color} {driver.car.model} · {driver.car.plate}
          </span>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            fullWidth
            onClick={handleCall}
            icon={<Phone size={18} />}
          >
            Call
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={handleMessage}
            icon={<MessageSquare size={18} />}
          >
            Message
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActiveRide;