"use client";
import React, { useEffect } from "react";
import { useToast } from "../context/ToastContext";
import Toast from "./toasts";

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
    <div className="fixed top-0 left-0 md:bottom-0 md:right-0 m-4 space-y-2 z-50 size-fit">
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
