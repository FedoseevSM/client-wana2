import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';
import Button from '../components/ui/Button';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-500 text-white rounded-full">
            <Car size={40} />
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          Welcome to RideHub
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md"
        >
          The smart way to get around. Reliable rides, competitive prices, and a seamless experience.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col w-full max-w-md space-y-4"
        >
          <Button 
            onClick={() => navigate('/login')} 
            variant="primary" 
            fullWidth
            size="lg"
          >
            Sign In
          </Button>
          
          <Button 
            onClick={() => navigate('/register')} 
            variant="outline" 
            fullWidth
            size="lg"
          >
            Create Account
          </Button>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="px-4 py-6 text-center text-gray-500 dark:text-gray-400 text-sm"
      >
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </motion.div>
    </div>
  );
};

export default Welcome;

export { Welcome }