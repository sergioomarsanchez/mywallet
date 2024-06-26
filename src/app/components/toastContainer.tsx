"use client"
import React, { useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import Toast from './toasts';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        removeToast(toasts[0].id);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toasts, removeToast]);

  return (
    <div className="fixed bottom-0 right-0 m-4 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          open={true}
          setOpen={() => removeToast(toast.id)}
          type={toast.type}
        >
          {toast.message}
        </Toast>
      ))}
    </div>
  );
};

export default ToastContainer;
