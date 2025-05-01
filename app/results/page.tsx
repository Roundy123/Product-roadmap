'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { marked } from 'marked';
import Timeline from '../components/Timeline';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import VerticalTimelineComponent from '../components/VerticalTimeline';

interface TimelineStep {
  title: string;
  content: string;
  index: number;
}

function emphasizeFirstHeading(html: string) {
  // Replace the first <h1> or <h2> with a larger, bolder style
  return html.replace(
    /<(h1|h2)>(.*?)<\/\1>/i,
    '<h1 style="font-size:2.25rem;font-weight:900;margin-bottom:1.5rem;color:rgb(200, 195, 188);font-family:\'Playfair Display\';">$2</h1>'
  );
}

function extractTimelineSteps(html: string): TimelineStep[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const steps: TimelineStep[] = [];
  
  // Extract h2 elements and their following content
  const h2Elements = doc.querySelectorAll('h2');
  h2Elements.forEach((h2, index) => {
    const step: TimelineStep = {
      title: h2.textContent || '',
      content: '',
      index: index + 1
    };
    
    // Get content until next h2 or end
    let nextElement = h2.nextElementSibling;
    while (nextElement && nextElement.tagName !== 'H2') {
      // Check if this is the start of a new phase (like "Post Phase 3")
      if (nextElement.textContent?.includes('Post Phase')) {
        break;
      }
      step.content += nextElement.outerHTML;
      nextElement = nextElement.nextElementSibling;
    }
    
    steps.push(step);

    // If we stopped because we found a "Post Phase" section, create a new step for it
    if (nextElement?.textContent?.includes('Post Phase')) {
      const postPhaseStep: TimelineStep = {
        title: nextElement.textContent?.replace('Post Phase 3', 'Post Phase 3:') || '',
        content: '',
        index: steps.length + 1
      };
      
      // Get content for the post phase step
      nextElement = nextElement.nextElementSibling;
      while (nextElement && nextElement.tagName !== 'H2') {
        postPhaseStep.content += nextElement.outerHTML;
        nextElement = nextElement.nextElementSibling;
      }
      
      steps.push(postPhaseStep);
    }
  });
  
  return steps;
}

export default function Results() {
  const [roadmapText, setRoadmapText] = useState('');
  const [roadmapImage, setRoadmapImage] = useState('');
  const [html, setHtml] = useState('');
  const [timelineSteps, setTimelineSteps] = useState<TimelineStep[]>([]);
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
      // Style all headings
      parsed = parsed.replace(/<h2>/g, '<h2 style="font-size:1.5rem;font-weight:700;margin-top:2rem;margin-bottom:1rem;color:rgb(200, 195, 188);font-family:\'Inter\';">');
      parsed = parsed.replace(/<h3>/g, '<h3 style="font-size:1.25rem;font-weight:600;margin-top:1.5rem;margin-bottom:0.75rem;color:rgb(200, 195, 188);font-family:\'Inter\';">');
      // Style lists
      parsed = parsed.replace(/<ul>/g, '<ul style="margin-left:1.5rem;margin-bottom:1.5rem;">');
      parsed = parsed.replace(/<ol>/g, '<ol style="margin-left:1.5rem;margin-bottom:1.5rem;">');
      parsed = parsed.replace(/<li>/g, '<li style="margin-bottom:0.75rem;line-height:1.6;">');
      // Style paragraphs
      parsed = parsed.replace(/<p>/g, '<p style="margin-bottom:1.25rem;line-height:1.6;">');
      setHtml(parsed);
      setTimelineSteps(extractTimelineSteps(parsed));
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
      <h2
        style={{
          fontFamily: 'Playfair Display',
          fontSize: '36px',
          fontWeight: 600,
          color: 'rgb(200, 195, 188)',
          marginBottom: '1rem',
        }}
      >
        Your Product Roadmap
      </h2>
      <div className="w-full max-w-2xl space-y-6">
        {roadmapImage && (
          <div className="flex flex-col items-center mb-6">
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

        {/* Original Timeline Visualization */}
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700" style={{ top: '3rem' }} />
          {timelineSteps.map((step, index) => (
            <div key={index} className="relative pl-12 mb-8">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center" style={{ top: '0.25rem' }}>
                <span className="text-white font-bold">{step.index}</span>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-xl font-bold mb-2" style={{ color: 'rgb(200, 195, 188)', fontFamily: 'Inter' }}>
                  {step.title}
                </h3>
                <div 
                  className="prose prose-invert"
                  style={{ color: 'rgb(200, 195, 188)', fontFamily: 'Inter', fontSize: '16px', lineHeight: '1.6' }}
                  dangerouslySetInnerHTML={{ __html: step.content }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Vertical Timeline Roadmap */}
        {/* <VerticalTimelineComponent steps={timelineSteps} /> */}

        <div className="mt-8 text-center">
          <h3 
            className="text-2xl font-bold mb-4"
            style={{ 
              color: 'rgb(200, 195, 188)',
              fontFamily: 'Playfair Display'
            }}
          >
            Like what you see?
          </h3>
          <p 
            className="mb-6"
            style={{ 
              color: 'rgb(200, 195, 188)',
              fontFamily: 'Inter',
              fontSize: '18px',
              fontWeight: 500,
              lineHeight: '1.6'
            }}
          >
            Get expert guidance and support to bring your product vision to life. Our team is ready to help you refine your roadmap and accelerate your journey to market.
          </p>
          <a
            href="https://hyperproduct.club"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-lg hover:opacity-90 text-white"
            style={{ 
              backgroundColor: 'rgb(186, 46, 46)',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '8px'
            }}
          >
            Get Started with Hyper Product Club
          </a>
        </div>

        <button
          onClick={handleRestart}
          className="mt-4 px-6 py-2 hover:opacity-90 text-white"
          style={{ 
            backgroundColor: 'rgb(60, 60, 60)',
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: 500,
            borderRadius: '8px'
          }}
        >
          Start Again
        </button>
      </div>
    </main>
  );
} 