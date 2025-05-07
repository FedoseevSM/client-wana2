import { useState } from 'react';
import { Camera, Edit2, CreditCard, MapPin, Star, Shield, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useAuthStore } from '../stores/authStore';
import { useToastStore } from '../stores/toastStore';
import ClientBottomNavigation from '../components/layout/ClientBottomNavigation';

const Profile = () => {
  const { user, logout } = useAuthStore();
  const { addToast } = useToastStore();
  const [isEditing, setIsEditing] = useState(false);
  
  const handleLogout = () => {
    logout();
    addToast({
      title: 'Logged Out',
      message: 'You have been successfully logged out',
      type: 'info',
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    addToast({
      title: 'Profile Updated',
      message: 'Your profile has been successfully updated',
      type: 'success',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="bg-primary-500 text-white pt-safe-top px-4 pb-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button 
            onClick={toggleEdit}
            className="p-2 rounded-full hover:bg-white/10"
          >
            <Edit2 size={20} />
          </button>
        </div>
      </div>
      
      <div className="px-4 -mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-4 mb-4"
        >
          <div className="flex items-center">
            <div className="relative">
              <img 
                src={user?.profilePicture || 'https://randomuser.me/api/portraits/men/32.jpg'} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full">
                  <Camera size={16} />
                </button>
              )}
            </div>
            
            <div className="ml-4">
              <h2 className="text-xl font-bold">{user?.name || 'John Doe'}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.phone || '+27 71 234 5678'}</p>
              
              <div className="flex items-center mt-2">
                <div className="flex items-center text-accent-500">
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">5.0 (48 rides)</span>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-4 flex space-x-3">
              <Button 
                variant="outline" 
                onClick={toggleEdit}
                className="flex-1"
              >
                Cancel
              </Button>
              
              <Button 
                variant="primary" 
                onClick={handleSaveProfile}
                className="flex-1"
              >
                Save Changes
              </Button>
            </div>
          )}
        </motion.div>
        
        <h3 className="font-semibold text-lg mb-3">Account</h3>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3 mb-6"
        >
          <div className="card">
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <CreditCard size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
                <span>Payment Methods</span>
              </div>
              <span className="text-sm text-gray-500">Visa •••• 4242</span>
            </button>
          </div>
          
          <div className="card">
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <MapPin size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
                <span>Saved Locations</span>
              </div>
              <span className="text-sm text-gray-500">3 places</span>
            </button>
          </div>
          
          <div className="card">
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <Shield size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
                <span>Privacy & Security</span>
              </div>
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button 
            variant="outline" 
            fullWidth
            onClick={handleLogout}
            icon={<LogOut size={16} />}
            className="text-error-600 dark:text-error-400 border-error-200 dark:border-error-800 hover:bg-error-50 dark:hover:bg-error-900/20"
          >
            Log Out
          </Button>
        </motion.div>
      </div>
      <ClientBottomNavigation />
    </div>
  );
};

export default Profile;

export { Profile };