import { Suspense } from "react";
export function ModelErrorBoundary({ children, fallback }) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}
