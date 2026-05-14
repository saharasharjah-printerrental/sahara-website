'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#071325',
          color: '#d7e3fc',
          fontFamily: 'system-ui, sans-serif',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: 480, textAlign: 'center' }}>
          <h1 style={{ fontSize: 22, marginBottom: 12 }}>Something went wrong</h1>
          <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 8 }}>
            The page failed to load. Please try again.
          </p>
          {error?.digest && (
            <p style={{ fontSize: 12, opacity: 0.5, marginBottom: 20 }}>
              Reference: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              background: '#d4af37',
              color: '#071325',
              border: 'none',
              borderRadius: 8,
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
