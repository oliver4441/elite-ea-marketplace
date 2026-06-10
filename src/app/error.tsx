"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#050505" }}>
      <div className="glass-card rounded-2xl p-10 text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#D4AF37" }}>
          Something went wrong
        </h1>
        <p className="text-gray-400 mb-6">
          An unexpected error occurred. Please try again or contact support.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-gold px-6 py-2 rounded-lg font-medium"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="btn-outline-gold px-6 py-2 rounded-lg font-medium"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
