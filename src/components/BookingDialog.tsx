'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X, CheckCircle, ShieldCheck, Calendar } from 'lucide-react';
import { SERVICES } from '@/lib/services';

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingDialog({ isOpen, onClose }: BookingDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredService, setPreferredService] = useState('orthopedic-rehab');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle native dialog close event (e.g. on ESC key press)
  const handleDialogClose = () => {
    onClose();
  };

  // Close when clicking native dialog backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialogDimensions = dialogRef.current?.getBoundingClientRect();
    if (!dialogDimensions) return;
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={handleDialogClose}
      onClick={handleBackdropClick}
      className="backdrop:bg-[rgba(36,25,27,0.65)] backdrop:backdrop-blur-sm rounded-3xl bg-[#fff5e8] border border-[#ead8c3] text-[var(--ink)] p-0 shadow-2xl max-w-lg w-[92vw] m-auto z-50 overflow-hidden outline-none animate-in fade-in zoom-in-95 duration-200"
      aria-labelledby="booking-dialog-title"
    >
      <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#ead8c3] mb-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--crimson-dark)] font-bold block mb-1">
              FlexLab Appointment Scheduling
            </span>
            <h2 id="booking-dialog-title" className="font-serif text-2xl sm:text-3xl font-bold text-[var(--ink)]">
              Book an Evaluation
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full border border-[#ead8c3] bg-[#fffaf2] text-[var(--ink)] hover:text-[var(--crimson)] hover:border-[var(--crimson)] transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X size={18} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#fbeddc] border border-[#ead8c3] flex items-center justify-center mx-auto text-[var(--crimson)]">
              <CheckCircle size={32} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[var(--ink)]">
              Evaluation Request Received
            </h3>
            <p className="text-sm text-[var(--ink)]/80 max-w-sm mx-auto font-sans leading-relaxed">
              Thank you, {firstName}. Our clinical intake coordinator will reach out to{' '}
              <strong className="text-[var(--crimson-dark)]">{phone || email}</strong> within 1 business day to verify insurance coverage and schedule your initial assessment.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-xs font-semibold hover:bg-[var(--crimson-dark)] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="booking-first-name"
                  className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/80 mb-1.5"
                >
                  First Name <span className="text-[var(--crimson)]">*</span>
                </label>
                <input
                  id="booking-first-name"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Eleanor"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#fffaf2] border border-[#ead8c3] text-sm text-[var(--ink)] placeholder:text-[var(--taupe)] focus:outline-none focus:border-[var(--crimson)] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-last-name"
                  className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/80 mb-1.5"
                >
                  Last Name <span className="text-[var(--crimson)]">*</span>
                </label>
                <input
                  id="booking-last-name"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Vance"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#fffaf2] border border-[#ead8c3] text-sm text-[var(--ink)] placeholder:text-[var(--taupe)] focus:outline-none focus:border-[var(--crimson)] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="booking-phone"
                  className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/80 mb-1.5"
                >
                  Phone <span className="text-[var(--crimson)]">*</span>
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(617) 000-0000"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#fffaf2] border border-[#ead8c3] text-sm text-[var(--ink)] placeholder:text-[var(--taupe)] focus:outline-none focus:border-[var(--crimson)] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-email"
                  className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/80 mb-1.5"
                >
                  Email <span className="text-[var(--crimson)]">*</span>
                </label>
                <input
                  id="booking-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#fffaf2] border border-[#ead8c3] text-sm text-[var(--ink)] placeholder:text-[var(--taupe)] focus:outline-none focus:border-[var(--crimson)] transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="booking-service"
                className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/80 mb-1.5"
              >
                Primary Area of Clinical Concern
              </label>
              <select
                id="booking-service"
                value={preferredService}
                onChange={(e) => setPreferredService(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#fffaf2] border border-[#ead8c3] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--crimson)] transition-colors"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.number} — {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="booking-notes"
                className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)]/80 mb-1.5"
              >
                Symptoms or Doctor Referral Details (Optional)
              </label>
              <textarea
                id="booking-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Briefly describe what movement or activity is currently limited..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#fffaf2] border border-[#ead8c3] text-sm text-[var(--ink)] placeholder:text-[var(--taupe)] focus:outline-none focus:border-[var(--crimson)] transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-sm font-semibold tracking-wide hover:bg-[var(--crimson-dark)] active:scale-[0.99] transition-all cursor-pointer shadow-sm"
              >
                Request Evaluation
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2 text-[10px] font-mono text-[var(--taupe)]">
              <ShieldCheck size={13} className="text-[var(--crimson)]" />
              <span>Confidential & HIPAA-Compliant Intake</span>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
