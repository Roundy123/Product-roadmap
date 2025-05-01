import Link from 'next/link';
import RotatingCube from './components/Cube';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div style={{ transform: 'scale(0.3)', width: '50px', height: '50px', marginBottom: '3rem' }}>
  <RotatingCube />
</div>

      <h1
        style={{
          fontFamily: 'Playfair Display',
          fontSize: '36px',
          fontWeight: 600,
          color: 'rgb(200, 195, 188)',
          marginBottom: '1rem',
        }}
      >
        Generate Your Product Roadmap
      </h1>
      <p
        style={{
          fontFamily: 'Inter',
          fontSize: '18px',
          fontWeight: 500,
          color: 'rgb(200, 195, 188)',
          marginBottom: '2rem',
          textAlign: 'center',
          maxWidth: 600,
        }}
      >
        Instantly create a detailed, visual product roadmap for your next big idea.
      </p>
      <Link href="/questions">
        <button
          style={{
            backgroundColor: 'rgb(186, 46, 46)',
            color: 'white',
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: 600,
            padding: '10px 28px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          }}
        >
          Start Now
        </button>
      </Link>
    </main>
  );
} 