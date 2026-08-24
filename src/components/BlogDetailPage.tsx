import React from 'react';
import { Article } from './InsightsSection';
import { ArrowLeft, Calendar, Clock, BookOpen, Share2, Check, ArrowRight, Sparkles, Phone, MessageSquare } from 'lucide-react';

interface BlogDetailPageProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  onNavigateSlide: (slideIndex: number) => void;
  allArticles: Article[];
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  article,
  onBack,
  onSelectArticle,
  onNavigateSlide,
  allArticles
}) => {
  const relatedArticles = allArticles.filter(a => a.id !== article.id);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-['Montserrat'] pb-24 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Sticky Breadcrumb Navigation */}
        <div className="flex items-center justify-between py-6 border-b border-zinc-800 mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors cursor-pointer bg-zinc-900 border border-zinc-800 hover:border-zinc-500 px-4 py-2.5 rounded-xl shadow-md group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-white" />
            <span>Back to All Technical Guides</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
              Texas WebCoders Publications
            </span>
          </div>
        </div>

        {/* Article Header Metadata */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider bg-white text-black px-3.5 py-1 rounded-full font-mono">
              {article.category}
            </span>
            <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              {article.date}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-[1.2]">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
            {article.subtitle}
          </p>
        </div>

        {/* Featured 16:9 AI-Generated Master Graphic */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl mb-12 bg-zinc-950">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Key Takeaways High-Impact Box */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 mb-12 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-white" />
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white font-mono">
              Executive Architectural Takeaways
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {article.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="bg-black border border-zinc-800/80 p-4 rounded-2xl flex items-start gap-3">
                <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                <span className="text-xs text-zinc-300 leading-relaxed font-medium">
                  {takeaway}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Article Full Body Content */}
        <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 sm:p-10 lg:p-12 mb-12 space-y-6 shadow-xl">
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Additional Deep Technical Context */}
          <div className="my-8 p-6 rounded-2xl bg-black border border-zinc-800">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono mb-2">
              Implementation Recommendation
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              When architecting modern applications, decouple frontend presentation layers from monolithic backends using serverless edge functions, isolated microservices, and localized edge caching. This guarantees sub-millisecond execution while minimizing serverless computing expenses.
            </p>
          </div>

          {/* SEO Keywords Tags */}
          <div className="pt-6 border-t border-zinc-800">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-3 font-mono">
              Technical Indexing Tags
            </span>
            <div className="flex flex-wrap gap-2">
              {article.seoKeywords.map((kw, i) => (
                <span key={i} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs rounded-lg font-mono">
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ready to Implement CTA Box */}
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-white/20 p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl mb-16">
          <h3 className="text-2xl sm:text-4xl font-extrabold uppercase text-white max-w-2xl mx-auto leading-tight">
            Ready to Implement This Architecture in Your Project?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Our senior engineering team in Tyler, Texas designs, develops, and deploys high-speed web and mobile systems tailored to your exact operational requirements.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigateSlide(9)}
              className="px-8 py-4 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-2xl flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Architecture Consultation</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
            <a
              href="tel:9032514808"
              className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 hover:border-white transition-all shadow-md inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Call (903) 251-4808</span>
            </a>
          </div>
        </div>

        {/* Related Guides Grid */}
        <div>
          <h3 className="text-xl font-bold uppercase text-white mb-6">
            Continue Reading Technical Guides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectArticle(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden hover:border-white transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-900 relative">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 border border-zinc-700 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-lg">
                    {rel.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-zinc-200 transition-colors mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-900 flex items-center justify-between mt-4">
                    <span className="text-[10px] text-zinc-500 font-mono">{rel.readTime}</span>
                    <span className="text-xs font-bold text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
