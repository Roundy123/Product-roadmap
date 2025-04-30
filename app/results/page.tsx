'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { marked } from 'marked';

function emphasizeFirstHeading(html: string) {
  // Replace the first <h1> or <h2> with a larger, bolder style
  return html.replace(
    /<(h1|h2)>(.*?)<\/\1>/i,
    '<h1 style="font-size:2.25rem;font-weight:900;margin-bottom:1.5rem;">$2</h1>'
  );
}

export default function Results() {
  const [roadmapText, setRoadmapText] = useState('');
  const [roadmapImage, setRoadmapImage] = useState('');
  const [html, setHtml] = useState('');
  const router = useRouter();
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRoadmapText(sessionStorage.getItem('roadmapText') || '');
    setRoadmapImage(sessionStorage.getItem('roadmapImage') || '');
  }, []);

  useEffect(() => {
    async function parseMarkdown() {
      let raw = roadmapText || '';
      let parsed = await marked.parse(raw) as string;
      parsed = emphasizeFirstHeading(parsed);
      parsed = parsed.replace(/<li>/g, '<li style=\"margin-bottom:1em;\">');
      setHtml(parsed);
    }
    parseMarkdown();
  }, [roadmapText]);

  const handleRestart = () => {
    sessionStorage.clear();
    router.push('/questions');
  };

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: 'var(--darkreader-background-0c1116, #080b0e)' }}
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Your Product Roadmap</h2>
      <div className="w-full max-w-2xl space-y-6">
        {roadmapImage && (
          <div className="flex flex-col items-center mb-6">
            <h3 className="font-semibold mb-2 text-center text-gray-900">Visual Roadmap:</h3>
            <div className="relative w-full">
              <img
                src={roadmapImage}
                alt="Roadmap Infographic"
                className="object-contain"
                style={{ maxHeight: '50vh', width: '100%', border: 'none', boxShadow: 'none', background: 'none' }}
              />
            </div>
          </div>
        )}
        <div>
          <h3 className="font-semibold mb-2 text-gray-900">Roadmap:</h3>
          <div
            ref={textRef}
            className="prose max-w-none rounded-lg"
            style={{ background: 'rgb(22, 24, 25)', color: 'rgb(156, 152, 146)', fontSize: '16px', boxShadow: 'none', border: 'none', padding: '1.25rem' }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        <button
          onClick={handleRestart}
          className="mt-4 px-6 py-2 rounded hover:opacity-90 text-white"
          style={{ 
            backgroundColor: 'rgb(186, 46, 46)',
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: 600
          }}
        >
          Start Again
        </button>
      </div>
    </main>
  );
} 