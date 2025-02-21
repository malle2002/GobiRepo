"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold">Something went wrong!</h1>
      <p className="mt-2 text-gray-500">{error.message || "An unexpected error occurred."}</p>
      <button
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
