import Link from 'next/link';

export default function Custom404() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1
        style={{
          fontSize: '6rem',
          fontWeight: 700,
          margin: 0,
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginTop: '1rem',
          marginBottom: '0.5rem',
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          color: '#6b7280',
          maxWidth: '400px',
          marginBottom: '2rem',
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'background-color 0.2s',
          }}
        >
          Go to Docs Home
        </Link>

        <Link
          href="/getting-started/installation"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'transparent',
            color: '#3b82f6',
            border: '1px solid #3b82f6',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'all 0.2s',
          }}
        >
          Getting Started
        </Link>
      </div>

      <div
        style={{
          marginTop: '3rem',
          padding: '1rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '0.5rem',
          maxWidth: '500px',
        }}
      >
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#4b5563' }}>
          <strong>Looking for AI-friendly docs?</strong>
          <br />
          Try{' '}
          <Link href="/llms.txt" style={{ color: '#3b82f6' }}>
            /llms.txt
          </Link>{' '}
          for markdown documentation.
        </p>
      </div>
    </div>
  );
}
