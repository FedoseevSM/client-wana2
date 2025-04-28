import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Car, ChevronRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuthStore } from '../../stores/authStore';
import { useToastStore } from '../../stores/toastStore';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('+27');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const { login, isAuthenticated } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handlePhoneSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    addToast({
      title: 'Code Sent',
      message: 'Enter any 6-digit code to continue',
      type: 'info'
    });
  };

  const handleVerificationSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Accept any 6-digit code for testing
      if (verificationCode.length === 6) {
        await login({
          id: '1',
          name: 'Test User',
          email: 'test@example.com'
        });
        addToast({
          title: 'Success',
          message: 'Successfully logged in!',
          type: 'success'
        });
        navigate('/');
      } else {
        throw new Error('Invalid code');
      }
    } catch (error) {
      addToast({
        title: 'Error',
        message: 'Please enter a 6-digit code',
        type: 'error'
      });
    }
  };

  const handleResendCode = () => {
    addToast({
      title: 'Code Resent',
      message: 'Enter any 6-digit code to continue',
      type: 'info'
    });
  };

  return (
    <div className="min-h-screen bg-primary-500">
      <div className="h-[30vh] relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="City streets"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-primary-500" />
      </div>

      <div className="relative -mt-6 bg-white dark:bg-gray-900 min-h-[75vh] rounded-t-[2.5rem] px-6 pt-8 pb-safe-bottom">
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
              <h1 className="text-2xl font-bold">Wana2</h1>
            </div>
          </div>

          {!isVerifying ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Enter your phone number</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  We'll send you a verification code
                </p>
                <div className="PhoneInput-custom">
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="ZA"
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value || '')}
                    className="text-lg"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                icon={<ChevronRight />}
                iconPosition="right"
                disabled={!phoneNumber || phoneNumber.length < 8}
              >
                Continue
              </Button>

              <p className="text-sm text-center text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Enter verification code</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  We sent a code to {phoneNumber}
                </p>
                <Input
                  type="text"
                  placeholder="Enter code"
                  value={verificationCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    if (value.length <= 6) {
                      setVerificationCode(value);
                    }
                  }}
                  required
                  pattern="[0-9]*"
                  maxLength={6}
                  className="text-lg text-center tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setIsVerifying(false)}
                  className="text-primary-500 text-sm font-medium"
                >
                  Change phone number
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                icon={<ChevronRight />}
                iconPosition="right"
                disabled={verificationCode.length !== 6}
              >
                Verify
              </Button>

              <button
                type="button"
                onClick={handleResendCode}
                className="text-primary-500 text-sm font-medium w-full text-center"
              >
                Resend code
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}