import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Map from '../components/map/Map';
import ClientBottomNavigation from '../components/layout/ClientBottomNavigation';

interface FormData {
  clientName: string;
  clientPhone: string;
  pickupAddress: string;
  dropoffAddress: string;
  pickupLat: string;
  pickupLng: string;
  dropoffLat: string;
  dropoffLng: string;
  price: string;
  scheduledTime: string;
}

const ClientHome = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    clientPhone: '',
    pickupAddress: '',
    dropoffAddress: '',
    pickupLat: '',
    pickupLng: '',
    dropoffLat: '',
    dropoffLng: '',
    price: '',
    scheduledTime: new Date(Date.now() + 3600000).toISOString().slice(0, 16)
  });

  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLocationSelect = (longitude: number, latitude: number, address?: string) => {
    if (!formData.pickupAddress) {
      setFormData({
        ...formData,
        pickupAddress: address || '',
        pickupLat: latitude.toString(),
        pickupLng: longitude.toString()
      });
    } else {
      setFormData({
        ...formData,
        dropoffAddress: address || '',
        dropoffLat: latitude.toString(),
        dropoffLng: longitude.toString()
      });
    }
  };

  const validateForm = (): boolean => {
    if (!formData.clientName || !formData.clientPhone || !formData.pickupAddress || 
        !formData.dropoffAddress || !formData.pickupLat || !formData.pickupLng || 
        !formData.dropoffLat || !formData.dropoffLng || !formData.price || !formData.scheduledTime) {
      setFormError('Please fill out all fields');
      return false;
    }
    
    const priceValue = parseFloat(formData.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setFormError('Please enter a valid price');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setFormData({
        clientName: '',
        clientPhone: '',
        pickupAddress: '',
        dropoffAddress: '',
        pickupLat: '',
        pickupLng: '',
        dropoffLat: '',
        dropoffLng: '',
        price: '',
        scheduledTime: new Date(Date.now() + 3600000).toISOString().slice(0, 16)
      });
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setFormError('Failed to create order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">

      <div className="relative -mt-6 bg-white dark:bg-gray-800 min-h-[65vh] rounded-t-[2.5rem] px-6 pt-8">
        {success && (
          <div className="bg-success-100 dark:bg-success-900/20 text-success-800 dark:text-success-200 p-4 rounded-lg mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Order created successfully!
          </div>
        )}
        
        {formError && (
          <div className="bg-error-100 dark:bg-error-900/20 text-error-800 dark:text-error-200 p-4 rounded-lg mb-4 flex items-center">
            <XCircle className="w-5 h-5 mr-2" />
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
            <div className="space-y-4">
              <Input
                label="Name"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              <Input
                label="Phone"
                name="clientPhone"
                type="tel"
                value={formData.clientPhone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Ride Details</h3>
            <div className="space-y-4">
              <Input
                label="Pickup Location"
                name="pickupAddress"
                value={formData.pickupAddress}
                readOnly
                placeholder="Select on map"
                icon={<MapPin className="w-4 h-4" />}
              />
              <Input
                label="Dropoff Location"
                name="dropoffAddress"
                value={formData.dropoffAddress}
                readOnly
                placeholder="Select on map"
                icon={<MapPin className="w-4 h-4" />}
              />
              <Input
                label="Price (R)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter your offer"
              />
              <Input
                label="Scheduled Time"
                name="scheduledTime"
                type="datetime-local"
                value={formData.scheduledTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            isLoading={isLoading}
          >
            Request Ride
          </Button>
        </form>
      </div>
      <ClientBottomNavigation />
    </div>
  );
};

export default ClientHome;