import { useState, useEffect, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  title: string;
  message?: string;
  type?: ToastType;
  duration?: number;
  onClose: (id: string) => void;
  icon?: ReactNode;
}

const Toast = ({ id, title, message, type = 'info', duration = 5000, onClose, icon }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  const getTypeStyles = (): string => {
    switch (type) {
      case 'success':
        return 'bg-success-50 dark:bg-success-900/20 border-success-500 text-success-800 dark:text-success-200';
      case 'error':
        return 'bg-error-50 dark:bg-error-900/20 border-error-500 text-error-800 dark:text-error-200';
      case 'warning':
        return 'bg-warning-50 dark:bg-warning-900/20 border-warning-500 text-warning-800 dark:text-warning-200';
      case 'info':
      default:
        return 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-800 dark:text-primary-200';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'relative w-full max-w-sm overflow-hidden rounded-lg border-l-4 shadow-md',
            getTypeStyles()
          )}
        >
          <div className="p-4 pr-10">
            <div className="flex items-start">
              {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}
              <div>
                <h3 className="text-sm font-medium">{title}</h3>
                {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;