export async function onRequestGet(context) {
  const { env } = context;
  try {
    const content = await env.CONTENT.get('site_content', { type: 'json' });
    return new Response(JSON.stringify(content || null), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });
  } catch {
    return new Response('null', { headers: { 'Content-Type': 'application/json' } });
  }
}
