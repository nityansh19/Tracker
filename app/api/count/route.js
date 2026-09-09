const FALLBACK = 4599350;

function extractCount(html) {
  const patterns = [
    /([\d,]+)\s+followers/i,
    /followers[^\d]{0,80}([\d,]{5,})/i,
    /"followers"\s*:\s*"?([\d,]+)"?/i
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      const n = Number(match[1].replaceAll(',', ''));
      if (Number.isFinite(n) && n > 100000) return n;
    }
  }
  return null;
}

export async function GET() {
  try {
    const response = await fetch('https://socialblade.com/instagram/user/scoutop/realtime', {
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; ScoutOPFollowerTracker/1.0)',
        'accept-language': 'en-US,en;q=0.9'
      },
      cache: 'no-store'
    });
    if (!response.ok) throw new Error(`source ${response.status}`);
    const html = await response.text();
    const followers = extractCount(html);
    if (!followers) throw new Error('count not found');
    return Response.json({ followers, live: true, source: 'Social Blade', checkedAt: new Date().toISOString() }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  } catch {
    return Response.json({ followers: FALLBACK, live: false, source: 'fallback', checkedAt: new Date().toISOString() }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  }
}
