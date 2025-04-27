import { createPortal } from 'react-dom';
import { useToastStore } from '../../stores/toastStore';
import Toast from './Toast';

export const Toaster = () => {
  const { toasts, removeToast } = useToastStore();

  return createPortal(
    <div className="fixed top-0 right-0 z-50 p-4 space-y-4 max-h-screen overflow-hidden pointer-events-none">
      <div className="flex flex-col items-end space-y-2 pointer-events-auto">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            title={toast.title}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            icon={toast.icon}
            onClose={removeToast}
          />
        ))}
      </div>
    </div>,
    document.body
  );
};