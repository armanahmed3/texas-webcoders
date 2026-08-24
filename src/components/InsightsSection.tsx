import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  Search,
  RefreshCw,
  Zap
} from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
  seoKeywords: string[];
  generatedAt?: string;
}

export const ARTICLES_LIST: Article[] = [
  {
    id: 'article-1',
    title: 'Architecting Zero-Latency Serverless Web Applications: The 2026 Edge Blueprint',
    subtitle: 'How modern edge SSR, bundle tree-shaking, and micro-frontends achieve 100/100 Google Lighthouse scores.',
    category: 'Web Architecture',
    readTime: '6 min read',
    date: 'August 24, 2026',
    image: '/portfolio-media/texaswebcoders/blogs/blog_1_serverless_edge.jpg',
    excerpt: 'In 2026, web application speed directly dictates Google rankings and checkout conversion rates. Discover how Texas WebCoders builds zero-latency edge architectures.',
    content: [
      'Over 53% of mobile users immediately bounce from sites taking longer than 1.8 seconds to load. For enterprise web applications and regional Texas businesses, every 100ms latency reduction converts directly into a 7.4% increase in sales inquiries.',
      'By moving computation from centralized origin servers to globally distributed Cloudflare & Google Cloud edge nodes, applications serve dynamic content in sub-40 milliseconds. Combining Vite 6 bundle chunking with React 19 Concurrent Rendering eliminates client-side hydration freezes.',
      'At Texas WebCoders, our engineering stack pairs serverless containerized microservices with localized Redis caching layers. This guarantees 99.99% uptime during massive traffic surges while keeping hosting costs minimal.'
    ],
    keyTakeaways: [
      'Edge SSR reduces Time to First Byte (TTFB) to under 35ms globally',
      'Vite 6 route-based code splitting prevents heavy JS bundle execution',
      'Sub-0.5s loading correlates with a 38% increase in organic Google search rankings'
    ],
    seoKeywords: ['Web Architecture 2026', 'Serverless Edge SSR', 'Lighthouse 100 Performance', 'Tyler Web Development', 'Texas Software House']
  },
  {
    id: 'article-2',
    title: 'Cross-Platform Mobile Engineering: React Native New Architecture vs Native Swift & Kotlin',
    subtitle: 'A technical benchmark comparing 60 FPS UI rendering, memory overhead, and maintenance costs for business founders.',
    category: 'Mobile Engineering',
    readTime: '8 min read',
    date: 'August 23, 2026',
    image: '/portfolio-media/texaswebcoders/blogs/blog_2_mobile_architecture.jpg',
    excerpt: 'Building dual iOS and Android apps historically required separate teams. Discover how modern React Native Fabric & TurboModules achieve native 120Hz performance at 50% lower cost.',
    content: [
      'With the introduction of the Fabric C++ renderer and TurboModules, modern React Native has completely eliminated the legacy asynchronous JavaScript bridge. Native C++ bindings now allow direct synchronous memory sharing with iOS Metal and Android Vulkan graphic layers.',
      'For 95% of commercial mobile applications—including telehealth, banking, e-commerce, and logistics dispatch—cross-platform React Native produces identical 60-120 FPS gesture fluidity compared to pure Swift or Kotlin.',
      'Texas WebCoders leverages unified TypeScript codebases across web and mobile platforms, allowing client teams to share up to 82% of business logic, state reducers, and API validation layers.'
    ],
    keyTakeaways: [
      'Fabric Renderer delivers native 120Hz gesture response without thread locking',
      'Unified TypeScript codebases reduce mobile development costs by up to 50%',
      'Hermes V8 runtime drops initial app launch time to under 0.8 seconds'
    ],
    seoKeywords: ['React Native 2026', 'Cross Platform Mobile Development', 'iOS & Android App Agency', 'Texas Mobile App Developer']
  },
  {
    id: 'article-3',
    title: 'Deploying Autonomous Multi-Agent AI Systems in Enterprise SaaS Workflows',
    subtitle: 'Practical implementation patterns for integrating cognitive LLM agents, vector RAG pipelines, and automated customer routing.',
    category: 'AI & Automation',
    readTime: '7 min read',
    date: 'August 22, 2026',
    image: '/portfolio-media/texaswebcoders/blogs/blog_3_ai_agents.jpg',
    excerpt: 'Simple chatbots are obsolete. Explore how modern enterprises deploy self-correcting multi-agent AI networks to automate lead qualification and operations 24/7.',
    content: [
      'The true enterprise power of AI is not isolated chat bubbles—it is proactive multi-agent orchestration. By assigning specialized autonomous agents to customer intake, invoice matching, CRM data enrichment, and calendar scheduling, companies save hundreds of labor hours each month.',
      'Using structured tool calling, deterministic validation gates, and vector embeddings (RAG), agents interact safely with proprietary SQL databases and external APIs without hallucinations.',
      'Texas WebCoders engineers custom AI orchestration pipelines that seamlessly embed into your existing software stack, delivering measurable ROI and 24/7 automated business operations.'
    ],
    keyTakeaways: [
      'Multi-agent architecture automates multi-step workflows without human intervention',
      'Deterministic validation gates prevent hallucination in critical business processes',
      'Average client ROI yields a 4.2x reduction in customer support response latency'
    ],
    seoKeywords: ['Enterprise AI Agents', 'Multi-Agent Systems', 'Workflow Automation 2026', 'Custom Business Software', 'Tyler AI Engineering']
  }
];

interface InsightsSectionProps {
  variant?: 'black' | 'white' | 'light-blue' | 'none' | 'transparent';
  onNavigateSlide?: (slideIndex: number) => void;
  onSelectArticle?: (article: Article) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  variant = 'black',
  onNavigateSlide,
  onSelectArticle
}) => {
  const [articles, setArticles] = useState<Article[]>(ARTICLES_LIST);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationNotice, setGenerationNotice] = useState<string | null>(null);

  // Fetch live published blogs on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
            setArticles(data.blogs);
          }
        }
      } catch (err) {
        console.log('[BLOG NOTICE] Using default verified articles');
      }
    };

    fetchBlogs();
  }, []);

  // Compute dynamic category list
  const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.seoKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleArticleClick = (article: Article) => {
    if (onSelectArticle) {
      onSelectArticle(article);
    }
  };

  // Trigger instant on-demand AI daily blog generation
  const handleGenerateDailyArticle = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setGenerationNotice('AI writing and synthesizing today\'s technical guide...');

    try {
      const res = await fetch('/api/blogs/generate-daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.article) {
          setArticles((prev) => [data.article, ...prev]);
          setGenerationNotice(`✨ Published: "${data.article.title.slice(0, 45)}..."`);
          setTimeout(() => setGenerationNotice(null), 5000);
        }
      }
    } catch (err) {
      setGenerationNotice('Failed to generate article. Check server connection.');
      setTimeout(() => setGenerationNotice(null), 4000);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-10 sm:py-16 relative bg-black text-white min-h-[85vh] flex flex-col justify-start font-['Montserrat']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-white text-xs font-semibold uppercase tracking-wider mb-3 font-mono">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Engineering & Architecture Insights • Texas WebCoders</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase font-['Montserrat',sans-serif] mb-3 text-white">
            Technical Guides & Articles
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Architectural blueprints, local SEO growth strategies, AI agent workflows, and full-stack benchmarks authored by Texas WebCoders.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-8 bg-zinc-950 p-3 rounded-2xl border border-zinc-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search technical guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Articles Compact Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              whileHover={{ y: -4 }}
              onClick={() => handleArticleClick(article)}
              className="group bg-zinc-950 border border-zinc-800/80 hover:border-white rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between transition-all duration-300 cursor-pointer"
            >
              <div>
                {/* Article Header Image (Crisp 16:9 AI-Generated Graphic) */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-black/90 border border-zinc-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg backdrop-blur-md font-mono">
                    {article.category}
                  </div>

                  {/* Read Time */}
                  <div className="absolute top-2.5 right-2.5 bg-black/90 text-zinc-300 text-[10px] font-medium px-2 py-0.5 rounded-lg flex items-center gap-1 backdrop-blur-md border border-zinc-700 font-mono">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Article Card Content - No Author Names */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-1.5 font-mono">
                    <Calendar className="w-3 h-3 text-zinc-500" />
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="text-zinc-400">Technical Guide</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-zinc-200 transition-colors line-clamp-2 leading-snug font-['Montserrat',sans-serif] mb-2">
                    {article.title}
                  </h3>

                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>

                  {/* Keyword Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {article.seoKeywords.slice(0, 2).map((kw, i) => (
                      <span key={i} className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md font-mono">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Article Footer & Read Button */}
              <div className="p-4 sm:p-5 pt-0 border-t border-zinc-900 flex items-center justify-between mt-auto">
                <span className="text-[11px] text-zinc-500 font-mono">Texas WebCoders</span>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12 bg-zinc-950 rounded-2xl border border-zinc-800">
            <Search className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white mb-1">No articles found matching "{searchQuery}"</h3>
            <p className="text-zinc-400 text-xs mb-3">Try searching for keywords like "SEO", "AI", "Mobile", or "Web".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="px-3.5 py-1.5 bg-white text-black text-xs font-bold rounded-lg cursor-pointer"
            >
              Reset Search Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
