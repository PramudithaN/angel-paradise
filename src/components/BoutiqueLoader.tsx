import React from 'react';

export const BoutiqueSpinner: React.FC<{ message?: string }> = ({
  message = "Loading gentle pieces...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4 animate-fadeIn">
      <div className="relative w-14 h-14">
        {/* Outer pulsating ring */}
        <div className="absolute inset-0 rounded-full border-2 border-rose-200 animate-ping opacity-40" />
        {/* Inner spinning halo */}
        <div className="w-14 h-14 rounded-full border-2 border-rose-400 border-t-transparent animate-spin" />
        {/* Center brand monogram */}
        <div className="absolute inset-0 flex items-center justify-center font-heading font-bold text-lg text-rose-500 italic">
          A
        </div>
      </div>
      <p className="text-xs font-medium text-bark-400 tracking-wider uppercase">
        {message}
      </p>
    </div>
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-bark-100 shadow-soft animate-pulse flex flex-col">
      {/* Image frame placeholder */}
      <div className="aspect-[4/5] bg-linen/70 relative">
        <div className="absolute top-3.5 left-3.5 w-16 h-5 rounded-full bg-bark-200/50" />
      </div>
      {/* Details placeholder */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-4 bg-linen rounded-md w-3/4" />
          <div className="h-3 bg-linen rounded-md w-1/2" />
        </div>
        <div className="pt-3 border-t border-bark-100/60 flex items-center justify-between">
          <div className="h-5 bg-linen rounded-md w-16" />
          <div className="h-8 bg-rose-100/60 rounded-full w-24" />
        </div>
      </div>
    </div>
  );
};
