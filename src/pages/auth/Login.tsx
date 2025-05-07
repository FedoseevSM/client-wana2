import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Car, ChevronRight, Mail, Phone, Key, MessageSquare } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuthStore } from '../../stores/authStore';
import { useToastStore } from '../../stores/toastStore';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Logo from '../../../assets/logo.png';

type AuthMethod = 'phone' | 'email';
type PhoneAuthMethod = 'code' | 'password';

export function Login() {
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
  const [phoneAuthMethod, setPhoneAuthMethod] = useState<PhoneAuthMethod>('password');
  const [phoneNumber, setPhoneNumber] = useState('+27');
  const [phonePassword, setPhonePassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { login, loginWithPhone, isAuthenticated } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      if (authMethod === 'phone') {
        if (phoneAuthMethod === 'password') {
          if (!phoneNumber || !phonePassword) {
            throw new Error('Please enter both phone number and password');
          }
          await loginWithPhone(phoneNumber, phonePassword);
          addToast({
            title: 'Success',
            message: 'Successfully logged in!',
            type: 'success'
          });
          navigate('/');
        } else {
          setIsVerifying(true);
          addToast({
            title: 'Service Unavailable',
            message: 'Code verification is currently under maintenance. Please use password authentication instead.',
            type: 'warning'
          });
        }
      } else {
        if (email && password) {
          await login(email, password);
          addToast({
            title: 'Success',
            message: 'Successfully logged in!',
            type: 'success'
          });
          navigate('/');
        } else {
          throw new Error('Please enter both email and password');
        }
      }
    } catch (error) {
      addToast({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Authentication failed',
        type: 'error'
      });
    }
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
        <img src={Logo} alt="Logo" className="w-132 h-34" />
            </div>
          </div>

          <div className="flex space-x-2 mb-6">
            <Button
              variant={authMethod === 'phone' ? 'primary' : 'outline'}
              onClick={() => setAuthMethod('phone')}
              icon={<Phone size={20} />}
              fullWidth
            >
              Phone
            </Button>
            <Button
              variant={authMethod === 'email' ? 'primary' : 'outline'}
              onClick={() => setAuthMethod('email')}
              icon={<Mail size={20} />}
              fullWidth
            >
              Email
            </Button>
          </div>

          {authMethod === 'phone' && (
            <div className="flex space-x-2 mb-6">
              <Button
                variant={phoneAuthMethod === 'password' ? 'primary' : 'outline'}
                onClick={() => setPhoneAuthMethod('password')}
                icon={<Key size={20} />}
                fullWidth
              >
                Password
              </Button>
              <Button
                variant={phoneAuthMethod === 'code' ? 'primary' : 'outline'}
                onClick={() => setPhoneAuthMethod('code')}
                icon={<MessageSquare size={20} />}
                fullWidth
              >
                Code
              </Button>
            </div>
          )}

          {authMethod === 'phone' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Sign in with phone</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {phoneAuthMethod === 'password' 
                    ? 'Enter your phone number and password'
                    : 'Enter your phone number to receive a verification code'}
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
                {phoneAuthMethod === 'password' && (
                  <Input
                    type="password"
                    placeholder="Password"
                    value={phonePassword}
                    onChange={(e) => setPhonePassword(e.target.value)}
                    required
                  />
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                icon={<ChevronRight />}
                iconPosition="right"
                disabled={phoneAuthMethod === 'password' ? !phoneNumber || !phonePassword : !phoneNumber}
              >
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Sign in with email</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Enter your email and password
                </p>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                icon={<ChevronRight />}
                iconPosition="right"
                disabled={!email || !password}
              >
                Sign In
              </Button>

              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="hidden text-primary-500 text-sm font-medium w-full text-center"
              >
                Forgot password?
              </button>
            </form>
          )}

        </motion.div>
      </div>
    </div>
  );
}