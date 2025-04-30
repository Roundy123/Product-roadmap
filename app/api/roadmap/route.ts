import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { idea, target_customer, timeline, product_type } = await req.json();

  // 1. Generate roadmap text
  const chatPrompt = `
Generate a product roadmap for a ${product_type} called "${idea}" targeting ${target_customer} with a launch timeline of ${timeline}.
Return it with three clear phases: Planning, Build, Launch. Format as markdown.
`;

  const chatRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: chatPrompt }],
      max_tokens: 800,
    }),
  });
  const chatData = await chatRes.json();
  const roadmapText = chatData.choices?.[0]?.message?.content || 'No roadmap generated.';

  // 2. Generate roadmap image
  const imagePrompt = `A visual infographic-style roadmap for a ${product_type} called "${idea}" with key milestones across Planning, Build, and Launch phases.`;
  const imageRes = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: imagePrompt,
      n: 1,
      size: '1024x1024',
    }),
  });
  const imageData = await imageRes.json();
  const imageUrl = imageData.data?.[0]?.url || '';

  return NextResponse.json({ roadmapText, imageUrl });
} 