/* Texas WebCoders: live AI and business headlines from Google News, plus any tech topics trending on Google Trends.
   GET /api/news  ->  {"updated":"...","items":[{"title","source","link","date","topic"}],"trends":["..."]}
   Only headlines, sources and links are shown, always pointing to the publisher. Vercel's CDN caches this for an hour. */
const { send } = require('./_util');

const FEEDS = [
  ['AI for business', '"artificial intelligence" small business when:14d'],
  ['AI assistants', '"AI chatbot" OR "AI receptionist" OR "voice AI" business when:14d'],
  ['Automation', '"AI agents" OR "workflow automation" business when:14d'],
  ['Texas tech', 'Texas AI startups technology when:14d']
];
const TECH = /\b(ai|a\.i\.|openai|chatgpt|claude|gemini|copilot|google|apple|microsoft|nvidia|tesla|amazon|meta|software|tech|technology|app|iphone|android|startup|cyber|robot\w*|chip\w*|data)\b/i;

const decode = s => s.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&#(\d+);/g, (m, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (m, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
const tag = (xml, name) => { const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`)); return m ? decode(m[1]) : ''; };
const items = xml => xml.match(/<item>[\s\S]*?<\/item>/g) || [];

async function get(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TexasWebCoders/1.0)' }, signal: AbortSignal.timeout(8000) });
  if (!r.ok) throw new Error(`${url} answered ${r.status}`);
  return r.text();
}

async function news([topic, q]) {
  const xml = await get(`https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`);
  return items(xml).slice(0, 12).map(x => {
    const source = tag(x, 'source'), title = tag(x, 'title');
    return { title: source && title.endsWith(` - ${source}`) ? title.slice(0, -source.length - 3) : title, source, link: tag(x, 'link'), date: new Date(tag(x, 'pubDate')).toISOString(), topic };
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return send(res, 405, { error: 'Use GET' }); }
  const [lists, trendXml] = await Promise.all([
    Promise.allSettled(FEEDS.map(news)),
    get('https://trends.google.com/trending/rss?geo=US').catch(() => '')
  ]);
  const seen = new Set();
  const list = lists.flatMap(r => r.status === 'fulfilled' ? r.value : [])
    .filter(i => { const k = i.title.toLowerCase().slice(0, 60); if (!i.title || seen.has(k) || !i.link.startsWith('https://news.google.com/')) return false; seen.add(k); return true; })
    .sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 24);
  if (!list.length) return send(res, 502, { error: 'News is unavailable right now' });
  const trends = items(trendXml).map(x => tag(x, 'title')).filter(t => TECH.test(t)).slice(0, 8);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.end(JSON.stringify({ updated: new Date().toISOString(), items: list, trends }));
};
