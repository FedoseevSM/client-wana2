import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Settings, Clock, MapPin, HelpCircle, Info } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface MenuItem {
  label: string;
  path: string;
  icon: JSX.Element;
}

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const menuItems: MenuItem[] = [
    { label: 'Profile', path: '/profile', icon: <User size={20} /> },
    { label: 'Rides', path: '/rides', icon: <Clock size={20} /> },
    { label: 'Places', path: '/places', icon: <MapPin size={20} /> },
    { label: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    { label: 'Help', path: '/help', icon: <HelpCircle size={20} /> },
    { label: 'About', path: '/about', icon: <Info size={20} /> },
  ];

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 z-50 shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <img
                        src={user?.profilePicture || "https://randomuser.me/api/portraits/men/32.jpg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{user?.name || "Guest"}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">+27 71 234 5678</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-auto py-4">
                  {menuItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavigate(item.path)}
                      className="flex items-center w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <span className="text-gray-500 dark:text-gray-400 mr-3">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Wana2 v0.1.0
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default BurgerMenu;