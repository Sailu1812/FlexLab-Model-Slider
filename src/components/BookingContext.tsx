'use client';

import React, { createContext, useContext, useState } from 'react';
import BookingDialog from './BookingDialog';

interface BookingContextType {
  openBooking: () => void;
  closeBooking: () => void;
  isOpen: boolean;
}

const BookingContext = createContext<BookingContextType>({
  openBooking: () => {},
  closeBooking: () => {},
  isOpen: false
});

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBooking = () => setIsOpen(true);
  const closeBooking = () => setIsOpen(false);

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking, isOpen }}>
      {children}
      <BookingDialog isOpen={isOpen} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingTriggerButton({
  className = '',
  children,
  onClick
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const { openBooking } = useBooking();

  return (
    <button
      type="button"
      onClick={() => {
        if (onClick) onClick();
        openBooking();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
