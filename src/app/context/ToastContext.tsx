"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Toast {
  id: string;
  message: string;
  type?: "warning" | "error" | "success" | "";
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (
    message: string,
    type?: "warning" | "error" | "success" | ""
  ) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useToast must be used within a ToastProvider"
    );
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (
    message: string,
    type?: "warning" | "error" | "success" | ""
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) =>
      prev.filter((Toast) => Toast.id !== id)
    );
  };

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};
