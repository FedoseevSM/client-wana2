import { useLocation, useNavigate } from 'react-router-dom';
import { Home, MapPin, Clock, User } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface NavItem {
  label: string;
  path: string;
  icon: JSX.Element;
}

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const navItems: NavItem[] = [
    {
      label: 'Home',
      path: '/',
      icon: <Home size={24} />,
    },
    {
      label: 'Rides',
      path: '/rides',
      icon: <Clock size={24} />,
    },
    {
      label: 'Places',
      path: '/places',
      icon: <MapPin size={24} />,
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: <User size={24} />,
    },
  ];

  return (
    <div className="block bottom-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-safe-bottom">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              className={cn(
                'flex flex-col items-center justify-center relative',
                isActive ? 'text-primary-500' : 'text-gray-500 dark:text-gray-400',
              )}
              onClick={() => navigate(item.path)}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute top-0 w-12 h-1 bg-primary-500 rounded-b-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;