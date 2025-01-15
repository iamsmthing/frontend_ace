"use client";

import { LoadingSpinner } from "./loading-spinner";

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <LoadingSpinner size={32} className="text-primary" />
    </div>
  );
}