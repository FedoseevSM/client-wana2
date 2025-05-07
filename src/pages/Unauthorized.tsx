import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ShieldOff } from 'lucide-react';

export function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <ShieldOff size={48} className="text-gray-400 mb-4" />
      <h1 className="mb-4 text-6xl font-bold text-gray-900">401</h1>
      <p className="mb-8 text-xl text-gray-600">Unauthorized Access</p>
      <Button onClick={() => navigate('/')}>Go back home</Button>
    </div>
  );
}