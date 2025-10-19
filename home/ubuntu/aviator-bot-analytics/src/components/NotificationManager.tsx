'use client';

import { useEffect, useState } from 'react';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

interface NotificationManagerProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
  soundEnabled: boolean;
}

const getNotificationColor = (type: string): string => {
  switch (type) {
    case 'success':
      return 'bg-green-100 dark:bg-green-900 border-green-500 text-green-900 dark:text-green-100';
    case 'error':
      return 'bg-red-100 dark:bg-red-900 border-red-500 text-red-900 dark:text-red-100';
    case 'warning':
      return 'bg-yellow-100 dark:bg-yellow-900 border-yellow-500 text-yellow-900 dark:text-yellow-100';
    case 'info':
    default:
      return 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-900 dark:text-blue-100';
  }
};

export default function NotificationManager({
  notifications,
  onRemove,
  soundEnabled,
}: NotificationManagerProps) {
  useEffect(() => {
    if (soundEnabled && notifications.length > 0) {
      const audio = new Audio(
        'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=='
      );
      audio.play().catch((err) => console.log('Som não pode ser reproduzido:', err));
    }
  }, [notifications, soundEnabled]);

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50 max-w-md">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`border-l-4 p-4 rounded-lg shadow-lg animate-pulse-glow ${getNotificationColor(notification.type)}`}
        >
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium">{notification.message}</p>
            <button
              onClick={() => onRemove(notification.id)}
              className="text-lg font-bold ml-4 hover:opacity-70"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

