import { createContext, useContext } from 'react';
import type { TShowToast } from '~/common';
import useToast from '~/hooks/useToast';

type ToastContextType = {
  showToast: ({ message, severity, showIcon, duration }: TShowToast) => void;
  onOpenChange: (open: boolean) => void;
};

export const ToastContext = createContext<ToastContextType>({
  showToast: () => ({}),
  onOpenChange: () => ({}),
});

export function useToastContext() {
  return useContext(ToastContext);
}

export default function ToastProvider({ children }) {
  const { showToast, onOpenChange } = useToast();

  return (
    <ToastContext.Provider value={{ showToast, onOpenChange }}>{children}</ToastContext.Provider>
  );
}
