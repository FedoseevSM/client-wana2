import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary-500">
      <div className="h-[45vh] relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="City streets"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-primary-500" />
      </div>

      <div className="relative -mt-6 bg-white dark:bg-gray-900 min-h-[60vh] rounded-t-[2.5rem] px-6 pt-8 pb-safe-bottom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-500 rounded-full p-3">
                <Car className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">RideHub</h1>
            </div>
            <span className="text-sm text-gray-500">v0.1.0</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Your ride, your price</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Name your price and find nearby drivers. Get the best deal for your journey.
            </p>
          </div>

          <div className="space-y-4 pt-6">
            <Button
              onClick={() => navigate('/register')}
              variant="primary"
              fullWidth
              size="lg"
              icon={<ChevronRight />}
              iconPosition="right"
            >
              Create Account
            </Button>

            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              fullWidth
              size="lg"
            >
              Sign In
            </Button>
          </div>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400 pt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;

export { Welcome };