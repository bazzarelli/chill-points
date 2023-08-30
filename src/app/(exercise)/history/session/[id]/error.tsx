"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-10">
      <h2 className="text-error text-xl">Something went wrong!</h2>
      <button
        className="btn btn-error btn-sm btn-outline mt-4"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
