import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Bell, Globe, Shield, HelpCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../stores/themeStore';

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useThemeStore();
  const [notifications, setNotifications] = useState(true);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 pt-safe-top px-4 py-4">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-3">Appearance</h2>
          <div className="card">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                {theme === 'dark' ? (
                  <Moon size={20} className="text-primary-500 mr-3" />
                ) : (
                  <Sun size={20} className="text-primary-500 mr-3" />
                )}
                <span>Dark Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold mb-3">Notifications</h2>
          <div className="card">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Bell size={20} className="text-primary-500 mr-3" />
                <span>Push Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notifications}
                  onChange={toggleNotifications}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-3">General</h2>
          <div className="card space-y-1">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center">
                <Globe size={20} className="text-primary-500 mr-3" />
                <span>Language</span>
              </div>
              <span className="text-sm text-gray-500">English</span>
            </button>
            
            <div className="w-full h-px bg-gray-100 dark:bg-gray-700"></div>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center">
                <Shield size={20} className="text-primary-500 mr-3" />
                <span>Privacy</span>
              </div>
            </button>
            
            <div className="w-full h-px bg-gray-100 dark:bg-gray-700"></div>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center">
                <HelpCircle size={20} className="text-primary-500 mr-3" />
                <span>Help & Support</span>
              </div>
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4"
        >
          <p>RideHub v0.1.0</p>
          <p className="mt-1">© 2025 RideHub Inc.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;

export { Settings }