import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Generate Your Product Roadmap</h1>
      <p className="mb-8 text-lg text-gray-300 max-w-xl text-center">
        Instantly create a detailed, visual product roadmap for your next big idea.
      </p>
      <Link href="/questions">
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Start Now
        </button>
      </Link>
    </main>
  );
} 