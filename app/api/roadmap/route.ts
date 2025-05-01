import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { idea, target_customer, timeline, product_type } = await req.json();

  // Generate both roadmap text and image in parallel
  const [chatData, imageData] = await Promise.all([
    // 1. Generate roadmap text
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ 
          role: 'user', 
          content: `Generate a product roadmap for a ${product_type} called "${idea}" targeting ${target_customer} with a launch timeline of ${timeline}. Return it with three clear phases: Planning, Build, Launch. Format as markdown.`
        }],
        max_tokens: 800,
      }),
    }).then(res => res.json()),

    // 2. Generate roadmap image
    fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: `A visual infographic-style roadmap for a ${product_type} called "${idea}" with key milestones across Planning, Build, and Launch phases.`,
        n: 1,
        size: '1024x1024',
      }),
    }).then(res => res.json())
  ]);

  const roadmapText = chatData.choices?.[0]?.message?.content || 'No roadmap generated.';
  const imageUrl = imageData.data?.[0]?.url || '';

  return NextResponse.json({ roadmapText, imageUrl });
} 