import { create } from 'zustand';
import { ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type?: ToastType;
  duration?: number;
  icon?: ReactNode;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => 
    set((state) => ({
      toasts: [
        ...state.toasts, 
        { 
          ...toast, 
          id: Date.now().toString(), 
          duration: toast.duration || 5000 
        }
      ],
    })),
  removeToast: (id) => 
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));