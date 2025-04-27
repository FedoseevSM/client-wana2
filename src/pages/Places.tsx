import { useState } from 'react';
import { MapPin, Plus, Home, Briefcase, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Map from '../components/map/Map';

const Places = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const savedPlaces = [
    {
      id: '1',
      name: 'Home',
      address: '123 Main St, New York, NY 10001',
      icon: <Home size={20} />,
      type: 'home'
    },
    {
      id: '2',
      name: 'Work',
      address: '456 Park Ave, New York, NY 10022',
      icon: <Briefcase size={20} />,
      type: 'work'
    },
    {
      id: '3',
      name: 'Gym',
      address: '789 Broadway, New York, NY 10003',
      icon: <Star size={20} />,
      type: 'favorite'
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-primary-500 text-white pt-safe-top px-4 pb-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Saved Places</h1>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="relative z-10">
          <Input
            placeholder="Search places"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<MapPin size={16} className="text-gray-500" />}
            className="shadow-lg"
          />
        </div>

        <div className="mt-6">
          <Button
            variant="outline"
            fullWidth
            icon={<Plus size={20} />}
            className="mb-6"
          >
            Add New Place
          </Button>

          <div className="space-y-4">
            {savedPlaces.map((place) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-4"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-500 flex items-center justify-center mr-3">
                    {place.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{place.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {place.address}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Places;

export { Places };