import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { WEBSITE_PROJECTS } from '../data/categories/websiteProjects';
import { WORDPRESS_PROJECTS } from '../data/categories/wordpressProjects';
import { VIDEO_ANIMATION_PROJECTS } from '../data/categories/videoAnimationProjects';
import { MOBILE_APP_PROJECTS } from '../data/categories/mobileAppProjects';
import { SOFTWARE_CRM_PROJECTS } from '../data/categories/softwareCrmProjects';
import { GRAPHIC_DESIGN_PROJECTS } from '../data/categories/graphicDesignProjects';
import { UI_UX_PROJECTS } from '../data/categories/uiUxProjects';
import { ECOMMERCE_PROJECTS } from '../data/categories/ecommerceProjects';
import { PortfolioProject } from '../types';
import { 
  ExternalLink, 
  Eye, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Pause, 
  Play, 
  Volume2, 
  VolumeX, 
  Maximize2,
  Layers,
  Smartphone,
  Globe,
  Video,
  Monitor,
  Palette,
  ShoppingBag,
  Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Curated top 2 projects per main category for Home Page showcase
const HOME_FEATURED_PROJECTS: PortfolioProject[] = [
  ...WEBSITE_PROJECTS.slice(0, 2),
  ...WORDPRESS_PROJECTS.slice(0, 2),
  ...ECOMMERCE_PROJECTS.slice(0, 2),
  ...UI_UX_PROJECTS.slice(0, 2),
  ...VIDEO_ANIMATION_PROJECTS.slice(0, 2),
  ...MOBILE_APP_PROJECTS.slice(0, 2),
  ...SOFTWARE_CRM_PROJECTS.slice(0, 2),
  ...GRAPHIC_DESIGN_PROJECTS.slice(0, 2)
];

interface PortfolioShowcaseSectionProps {
  onSelectProject: (project: PortfolioProject) => void;
  onNavigateSlide: (slideIndex: number) => void;
  variant?: 'light-blue' | 'black' | 'white' | 'none' | 'transparent';
  isHomePage?: boolean;
}

export const PortfolioShowcaseSection: React.FC<PortfolioShowcaseSectionProps> = ({
  onSelectProject,
  onNavigateSlide,
  variant = 'none',
  isHomePage = false
}) => {
  const isBlack = variant === 'black';
  const isWhite = variant === 'white';
  const isNone = variant === 'none' || variant === 'transparent' || variant === 'light-blue';
  const isDarkBlue = isNone;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGraphicSubCategory, setSelectedGraphicSubCategory] = useState<string>('All Graphic Design');
  const [currentSlidePage, setCurrentSlidePage] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({});

  const categories = [
    'All',
    'Website Development',
    'WordPress Development',
    'E-Commerce',
    'UI / UX Design',
    'Video Animation',
    'Mobile App Development',
    'Software & CRM',
    'Graphic Designing'
  ];

  const graphicSubCategories = [
    'All Graphic Design',
    'Logo Design',
    'Typography',
    'Pitch Deck',
    'Book Cover',
    'Children Book Illustration',
    'Flyers / Brochures',
    'Packaging',
    'Business Card'
  ];

  const filteredProjects = isHomePage
    ? HOME_FEATURED_PROJECTS
    : selectedCategory === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter(p => {
          switch (selectedCategory) {
            case 'Website Development':
              return p.category === 'Website Development';
            case 'WordPress Development':
              return p.category === 'WordPress Development';
            case 'E-Commerce':
            case 'Ecommerce':
              return p.category === 'E-Commerce' || p.category === 'Ecommerce' || p.category === 'E-Commerce Development';
            case 'UI / UX Design':
            case 'UI/UX Design':
              return p.category === 'UI / UX Design' || p.category === 'UI/UX Design' || p.category === 'UI UX';
            case 'Video Animation':
              return p.category === 'Video Animation';
            case 'Mobile App Development':
              return p.category === 'Mobile App Development';
            case 'Software & CRM':
              return p.category === 'Custom Software & CRM' || p.category === 'Software & CRM' || p.category === 'Software and CRM Development';
            case 'Graphic Designing': {
              const isGraphic = p.category === 'Graphic Design' || p.category === 'Graphic Designing' || p.category === 'Logo & Branding' || p.category === 'Logo Designing';
              if (!isGraphic) return false;
              if (selectedGraphicSubCategory === 'All Graphic Design') return true;
              return p.subCategory === selectedGraphicSubCategory;
            }
            default:
              return p.category === selectedCategory;
          }
        });

  // Group filtered projects into chunks of 6 cards per slide layout (3 cols x 2 rows)
  const CARDS_PER_SLIDE = 6;
  const totalPages = Math.ceil(filteredProjects.length / CARDS_PER_SLIDE) || 1;

  // Auto-play interval timer for moving slides
  useEffect(() => {
    if (!isAutoPlaying || isHovered || totalPages <= 1) return;

    const timer = setInterval(() => {
      setSlideDirection(1);
      setCurrentSlidePage((prev) => (prev + 1) % totalPages);
    }, 6000); // Advances slides every 6 seconds

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, totalPages]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'Graphic Designing') {
      setSelectedGraphicSubCategory('All Graphic Design');
    }
    setCurrentSlidePage(0);
  };

  const handleGraphicSubCategoryChange = (subCat: string) => {
    setSelectedGraphicSubCategory(subCat);
    setCurrentSlidePage(0);
  };

  const handleNextSlide = () => {
    setSlideDirection(1);
    setCurrentSlidePage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevSlide = () => {
    setSlideDirection(-1);
    setCurrentSlidePage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const toggleVideoMute = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMutedVideos(prev => ({
      ...prev,
      [projectId]: !(prev[projectId] ?? true)
    }));
  };

  const visibleProjects = filteredProjects.slice(
    currentSlidePage * CARDS_PER_SLIDE,
    (currentSlidePage + 1) * CARDS_PER_SLIDE
  );

  return (
    <section id="portfolio" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen flex flex-col justify-center">
      {/* Curved Rounded Section Shell */}
      <div
        className={`max-w-7xl mx-auto w-full rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 relative overflow-hidden transition-colors duration-300 ${
          isNone
            ? 'bg-transparent text-white border border-white/10 shadow-none'
            : isBlack
              ? 'bg-[#080c14] text-white border border-slate-800 shadow-2xl'
              : 'bg-white text-slate-900 border border-zinc-200 shadow-zinc-900/5'
        }`}
      >
        {/* Decorative Background Accents */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isNone || isBlack ? 'bg-white/5' : 'bg-slate-200/30'
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isNone || isBlack ? 'bg-slate-800/20' : 'bg-slate-200/30'
          }`}
        />

        <div className="relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <span className={`text-xs font-medium uppercase tracking-widest mb-2 block font-['Montserrat'] flex items-center justify-center gap-1.5 ${
              isNone || isBlack ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isHomePage
                  ? 'Featured Flagship Works • Top 2 Projects Per Discipline'
                  : 'Interactive Portfolio Showcase • TexasWebCoders'}
              </span>
            </span>
            <h2 className={`text-3xl sm:text-5xl md:text-6xl font-semibold mb-3 tracking-tight uppercase font-['Montserrat',sans-serif] ${
              isNone || isBlack ? 'text-white' : 'text-slate-950'
            }`}>
              {isHomePage ? 'Featured Client Showcase' : 'Featured Engineering & Design Portfolio'}
            </h2>
            <p className={`max-w-3xl mx-auto text-xs sm:text-sm leading-relaxed ${
              isNone || isBlack ? 'text-slate-300' : 'text-zinc-600'
            }`}>
              {isHomePage
                ? 'A curated selection of our top flagship projects across Web, WordPress, Mobile Apps, Video Animation, Custom CRM, and Graphic Design.'
                : 'Featuring high-resolution auto-scrolling website mockups, 4K 3D video animations, mobile apps, CRM systems, and architectural renders.'}
            </p>

            {/* Filter Category Pills - Only on Dedicated Portfolio Page */}
            {!isHomePage && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      selectedCategory === cat
                        ? isNone || isBlack
                          ? 'bg-white text-slate-950 shadow-md scale-105 font-bold'
                          : 'bg-slate-950 text-white shadow-md scale-105 font-bold'
                        : isNone || isBlack
                          ? 'bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800'
                          : 'bg-white/90 border border-zinc-300 text-zinc-700 hover:text-slate-950 hover:bg-white shadow-sm'
                    }`}
                  >
                    {cat === 'Website Development' && <Globe className="w-3 h-3" />}
                    {cat === 'WordPress Development' && <Layers className="w-3 h-3" />}
                    {cat === 'E-Commerce' && <ShoppingBag className="w-3 h-3" />}
                    {cat === 'UI / UX Design' && <Sparkles className="w-3 h-3" />}
                    {cat === 'Video Animation' && <Video className="w-3 h-3" />}
                    {cat === 'Mobile App Development' && <Smartphone className="w-3 h-3" />}
                    {cat === 'Software & CRM' && <Monitor className="w-3 h-3" />}
                    {cat === 'Graphic Designing' && <Palette className="w-3 h-3" />}
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Dedicated Sub-Category Tabs for Graphic Designing - Only on Dedicated Portfolio Page */}
            {!isHomePage && selectedCategory === 'Graphic Designing' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap justify-center gap-2 mt-4 p-2.5 rounded-2xl max-w-4xl mx-auto backdrop-blur-md border shadow-inner bg-slate-950/60 border-slate-800/80"
              >
                {graphicSubCategories.map((subCat) => {
                  const isActive = selectedGraphicSubCategory === subCat;
                  return (
                    <button
                      key={subCat}
                      onClick={() => handleGraphicSubCategoryChange(subCat)}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer font-['Montserrat'] flex items-center gap-1 ${
                        isActive
                          ? 'bg-white text-slate-950 shadow-md scale-105 font-bold'
                          : 'bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span>{subCat}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </motion.div>

          {/* Animated 6-Card Slide View Grid with Big Media & Auto-Scroll Images */}
          <div
            className="relative min-h-[600px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
              <motion.div
                key={`${selectedCategory}-${currentSlidePage}`}
                custom={slideDirection}
                initial={{ opacity: 0, x: slideDirection > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDirection > 0 ? -100 : 100 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {visibleProjects.map((project, index) => {
                  const isPitchDeck = project.subCategory === 'Pitch Deck';
                  const isVideo = project.mediaType === 'video' || !!project.videoUrl;
                  const isGraphicOrDesign = 
                    project.category === 'Graphic Designing' ||
                    project.category === 'Graphic Design' ||
                    project.category === 'Logo Designing' ||
                    project.category === 'Logo & Branding' ||
                    project.category === 'Interior & 3D Design' ||
                    project.category === 'Interior 3D' ||
                    project.category === 'Video Animation' ||
                    project.subCategory === 'Logo Design' ||
                    project.subCategory === 'Typography' ||
                    project.subCategory === 'Pitch Deck' ||
                    project.subCategory === 'Book Cover' ||
                    project.subCategory === 'Children Book Illustration' ||
                    project.subCategory === 'Flyers / Brochures' ||
                    project.subCategory === 'Packaging' ||
                    project.subCategory === 'Business Card';

                  const isAutoScroll = !isVideo && !isGraphicOrDesign && (
                    project.category === 'Website Development' ||
                    project.category === 'WordPress Development' ||
                    project.category === 'UI / UX Design' ||
                    project.category === 'UI/UX Design' ||
                    project.category === 'E-Commerce' ||
                    project.isAutoScroll === true ||
                    project.mediaType === 'auto-scroll'
                  );
                  const isMuted = mutedVideos[project.id] ?? true;

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      onClick={() => onSelectProject(project)}
                      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 flex flex-col cursor-pointer ${
                        isDarkBlue || isBlack
                          ? 'bg-slate-950 border-slate-800 hover:border-white/60 shadow-xl'
                          : 'bg-white border-zinc-200 hover:border-slate-950 shadow-md hover:shadow-2xl'
                      }`}
                    >
                      {/* Big Media Container - dynamically expanded for Pitch Deck to show full slide deck */}
                      <div className={`relative overflow-hidden bg-slate-900 flex flex-col ${
                        isPitchDeck ? 'h-[520px] sm:h-[600px] lg:h-[680px] bg-slate-950' : 'h-64 sm:h-72'
                      }`}>
                        
                        {/* Video Media Render */}
                        {isPitchDeck ? (
                          /* Full Image Showcase for Pitch Deck */
                          <div className="relative w-full h-full bg-slate-950 flex items-center justify-center p-2.5 sm:p-3 overflow-hidden">
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-full object-contain object-center block rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (!target.src.includes('unsplash')) {
                                  target.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                                }
                              }}
                            />
                            
                            {/* Pitch Deck Preview Indicator */}
                            <div className="absolute bottom-2.5 left-2.5 z-20 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-semibold text-slate-300 border border-slate-800 flex items-center gap-1.5 shadow-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              <span>Full Pitch Deck • Click to Inspect</span>
                            </div>
                          </div>
                        ) : isVideo ? (
                          <div className="relative w-full h-full bg-black flex items-center justify-center">
                            <video
                              src={project.videoUrl}
                              poster={project.imageUrl}
                              autoPlay
                              loop
                              muted={isMuted}
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-cover"
                            />
                            {/* Video Sound Toggle Button */}
                            <button
                              onClick={(e) => toggleVideoMute(project.id, e)}
                              className="absolute bottom-3 right-3 z-30 p-2 rounded-full bg-slate-950/80 hover:bg-white text-white hover:text-slate-950 border border-slate-700 transition-all cursor-pointer shadow-lg"
                              title={isMuted ? 'Unmute Video Audio' : 'Mute Video Audio'}
                            >
                              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        ) : isAutoScroll ? (
                          /* Auto-Scrolling Tall Full-Page Website Mockup */
                          <div className="relative w-full h-full overflow-hidden bg-slate-950">
                            <div className="w-full h-auto animate-auto-scroll">
                              <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-auto object-cover block"
                                loading="lazy"
                                onError={(e) => {
                                  // Fallback high quality tech banner if image fails
                                  const target = e.currentTarget;
                                  if (!target.src.includes('unsplash')) {
                                    target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
                                  }
                                }}
                              />
                            </div>
                            
                            {/* Auto-Scroll Pause Indicator on Hover */}
                            <div className="absolute bottom-2.5 left-2.5 z-20 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-semibold text-slate-300 border border-slate-800 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                              <span>Hover to Pause • Click to Inspect</span>
                            </div>
                          </div>
                        ) : (
                          /* Standard High-Resolution Graphic, Logo, Book Cover, Art Asset */
                          <div className="relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center p-2.5">
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (!target.src.includes('unsplash')) {
                                  target.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                                }
                              }}
                            />
                          </div>
                        )}

                        {/* Category & SubCategory Pill */}
                        <div className="absolute top-2.5 left-2.5 z-20 bg-slate-950/90 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-medium text-white font-['Montserrat'] shadow-md border border-slate-800 flex items-center gap-1">
                          <span>{project.subCategory || project.category}</span>
                        </div>

                        {/* Number Badge */}
                        <div className="absolute top-2.5 right-2.5 z-20 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono font-medium text-slate-900 border border-zinc-200 shadow-md">
                          #{currentSlidePage * CARDS_PER_SLIDE + index + 1}
                        </div>

                        {/* Hover Overlay with Action Button */}
                        <div className="absolute inset-0 bg-slate-950/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white z-30 pointer-events-none">
                          <p className="text-zinc-200 text-[11px] mb-3 leading-relaxed font-medium line-clamp-2">
                            {project.description}
                          </p>
                          <div className="w-full bg-white text-slate-950 py-2.5 px-3 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Inspect Full Architecture</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Details */}
                      <div className={`p-5 flex-1 flex flex-col justify-between ${
                        isDarkBlue || isBlack ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
                      }`}>
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                              {project.clientName}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {project.year}
                            </span>
                          </div>

                          <h3 className={`text-base sm:text-lg font-semibold mb-1.5 font-['Montserrat'] line-clamp-1 transition-colors ${
                            isDarkBlue || isBlack
                              ? 'text-white group-hover:text-slate-200'
                              : 'text-slate-950 group-hover:text-black'
                          }`}>
                            {project.title}
                          </h3>
                          <p className={`text-xs line-clamp-2 mb-3 leading-relaxed ${
                            isDarkBlue || isBlack ? 'text-slate-400' : 'text-zinc-600'
                          }`}>
                            {project.subtitle}
                          </p>
                        </div>

                        {/* Tech Badges & Action */}
                        <div className={`pt-3 border-t flex items-center justify-between gap-2 ${
                          isDarkBlue || isBlack ? 'border-slate-800' : 'border-zinc-100'
                        }`}>
                          <div className="flex flex-wrap gap-1">
                            {project.techStack.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                                  isDarkBlue || isBlack
                                    ? 'bg-slate-900 text-slate-300 border-slate-700'
                                    : 'bg-zinc-100 text-slate-800 border-zinc-200'
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProject(project);
                            }}
                            className={`text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0 ${
                              isDarkBlue || isBlack
                                ? 'text-white hover:text-slate-300'
                                : 'text-slate-950 hover:text-black'
                            }`}
                          >
                            <span>Inspect</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicator Dots & Navigation Bar */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={handlePrevSlide}
              className={`p-2 rounded-xl border transition-all cursor-pointer active:scale-95 ${
                isDarkBlue || isBlack
                  ? 'bg-slate-900/80 border-slate-800 text-white hover:bg-slate-800'
                  : 'bg-white border-zinc-300 text-slate-900 hover:bg-zinc-100 shadow-sm'
              }`}
              title="Previous Projects"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              {Array.from({ length: totalPages }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => {
                    setSlideDirection(dotIdx > currentSlidePage ? 1 : -1);
                    setCurrentSlidePage(dotIdx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlidePage === dotIdx
                      ? isDarkBlue || isBlack
                        ? 'w-7 bg-white shadow-md'
                        : 'w-7 bg-slate-950 shadow-md'
                      : isDarkBlue || isBlack
                        ? 'w-2 bg-slate-700 hover:bg-slate-500'
                        : 'w-2 bg-zinc-300 hover:bg-slate-950'
                  }`}
                  title={`Jump to Slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              className={`p-2 rounded-xl border transition-all cursor-pointer active:scale-95 ${
                isDarkBlue || isBlack
                  ? 'bg-slate-900/80 border-slate-800 text-white hover:bg-slate-800'
                  : 'bg-white border-zinc-300 text-slate-900 hover:bg-zinc-100 shadow-sm'
              }`}
              title="Next Projects"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dedicated Full Portfolio Navigation Button for Home Page */}
          {isHomePage && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => onNavigateSlide(1)}
                className="px-7 py-3.5 rounded-full bg-white text-slate-950 hover:bg-zinc-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-xl hover:scale-105 cursor-pointer font-['Montserrat']"
              >
                <span>View Full Portfolio (285+ Projects & Categories)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Bottom Call To Action Banner */}
          <div className={`mt-14 text-center p-8 rounded-3xl shadow-xl ${
            isDarkBlue || isBlack
              ? 'bg-slate-900/90 border border-slate-800 text-white'
              : 'bg-slate-950 text-white'
          }`}>
            <h3 className="text-2xl sm:text-3xl font-medium text-white mb-2 uppercase font-['Montserrat']">
              Ready For A Custom Engineered Project?
            </h3>
            <p className="text-zinc-300 text-xs sm:text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              Partner with TexasWebCoders to build custom high-speed web apps, interactive 3D motion animations, and enterprise software.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onNavigateSlide(4)}
                className="border-2 border-white/30 text-white hover:bg-white hover:text-slate-950 px-6 py-2.5 font-bold text-xs uppercase tracking-wider transition-all duration-300 rounded-lg cursor-pointer"
              >
                Explore Pricing
              </button>
              <button
                onClick={() => onNavigateSlide(9)}
                className="bg-white text-slate-950 hover:bg-zinc-200 px-6 py-2.5 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg rounded-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
