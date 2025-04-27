import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '../components/ui/Input';
import RideCard from '../components/ride/RideCard';
import { mockRecentRides } from '../data/mockData';

const Rides = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-primary-500 text-white pt-safe-top px-4 pb-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Your Rides</h1>
          <button className="p-2 hover:bg-white/10 rounded-full">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="relative z-10">
          <Input
            placeholder="Search rides"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={16} className="text-gray-500" />}
            className="shadow-lg"
          />
        </div>

        <div className="mt-6 space-y-4">
          {mockRecentRides.map((ride, index) => (
            <motion.div
              key={ride.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <RideCard ride={ride} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rides;

export { Rides };