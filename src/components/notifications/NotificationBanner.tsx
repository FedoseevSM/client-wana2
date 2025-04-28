import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
}

interface NotificationBannerProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const NotificationBanner = ({ notifications, onDismiss }: NotificationBannerProps) => {
  return (
    <div className="absolute top-safe-top right-4 z-20 w-full max-w-sm space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-start"
          >
            <Bell size={20} className="text-primary-500 flex-shrink-0 mt-0.5" />
            <div className="ml-3 flex-1">
              <p className="font-medium">{notification.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
            </div>
            <button
              onClick={() => onDismiss(notification.id)}
              className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBanner;