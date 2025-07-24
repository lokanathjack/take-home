import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>404 - Page Not Found</h1>
      <p style={{ color: '#6b7280', margin: '1rem 0' }}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/" style={{ color: '#2563eb', textDecoration: 'underline' }}>Go back home</Link>
    </div>
  );
} 