'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Questions() {
  const [form, setForm] = useState({
    idea: '',
    target_customer: '',
    timeline: '',
    product_type: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    sessionStorage.setItem('roadmapText', data.roadmapText);
    sessionStorage.setItem('roadmapImage', data.imageUrl);
    setLoading(false);
    router.push('/results');
  };

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: 'var(--darkreader-background-0c1116, #080b0e)' }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 rounded-lg shadow space-y-4"
        style={{ background: 'rgba(20,20,20,0.95)' }}
      >
        <h2 
          style={{
            color: 'rgb(186, 184, 182)',
            colorScheme: 'dark',
            display: 'block',
            fontFamily: 'Playfair Display',
            fontSize: '36px',
            fontWeight: 600
          }}
        >
          Product Roadmap Wizard
        </h2>
        <label className="block" style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 500, color: 'rgb(186, 184, 182)' }}>
          What's your product idea?
          <input 
            name="idea" 
            value={form.idea} 
            onChange={handleChange} 
            required 
            className="w-full mt-1 p-2 rounded border bg-black" 
            style={{ 
              fontFamily: 'Inter', 
              fontSize: '18px', 
              fontWeight: 500, 
              color: 'rgb(186, 184, 182)' 
            }} 
          />
        </label>
        <label className="block" style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 500, color: 'rgb(186, 184, 182)' }}>
          Who is your target customer?
          <input 
            name="target_customer" 
            value={form.target_customer} 
            onChange={handleChange} 
            required 
            className="w-full mt-1 p-2 rounded border bg-black" 
            style={{ 
              fontFamily: 'Inter', 
              fontSize: '18px', 
              fontWeight: 500, 
              color: 'rgb(186, 184, 182)' 
            }} 
          />
        </label>
        <label className="block" style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 500, color: 'rgb(186, 184, 182)' }}>
          What is your launch timeline?
          <select 
            name="timeline" 
            value={form.timeline} 
            onChange={handleChange} 
            required 
            className="w-full mt-1 p-2 rounded border bg-black" 
            style={{ 
              fontFamily: 'Inter', 
              fontSize: '18px', 
              fontWeight: 500, 
              color: 'rgb(186, 184, 182)' 
            }}
          >
            <option value="">Select...</option>
            <option value="1 month">1 month</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
            <option value="12 months">12 months</option>
          </select>
        </label>
        <label className="block" style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 500, color: 'rgb(186, 184, 182)' }}>
          What type of product is it?
          <select 
            name="product_type" 
            value={form.product_type} 
            onChange={handleChange} 
            required 
            className="w-full mt-1 p-2 rounded border bg-black" 
            style={{ 
              fontFamily: 'Inter', 
              fontSize: '18px', 
              fontWeight: 500, 
              color: 'rgb(186, 184, 182)' 
            }}
          >
            <option value="">Select...</option>
            <option value="SaaS">SaaS</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Hardware">Hardware</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 rounded-lg hover:opacity-90 text-white"
            style={{ 
              backgroundColor: 'rgb(186, 46, 46)',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: 600
            }}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 600 }}>
                Generating...
                <span className="ml-2 animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white border-solid" />
              </span>
            ) : (
              'Generate Roadmap'
            )}
          </button>
        </div>
      </form>
    </main>
  );
} 