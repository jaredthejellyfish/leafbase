'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useToast } from '../ui/use-toast';

const Notifier = () => {
  const { toast } = useToast();
  const params = useSearchParams();

  const notification = params.get('notify');
  const title = params.get('title') || undefined;

  useEffect(() => {
    if (notification || title) {
      const newURL = window.location.pathname; // Get the current path without search params
      window.history.pushState({}, '', newURL);

      toast({
        title: title || '',
        description: notification || '',
      });
    }
  }, [notification, toast, title]);

  return null;
};

export default Notifier;
