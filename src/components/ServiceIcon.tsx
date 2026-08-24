import React from 'react';
import {
  Cpu,
  Globe,
  Smartphone,
  ShoppingBag,
  Sparkles,
  Palette,
  Cloud,
  Network,
  Boxes,
  ShieldCheck,
  PenTool,
  Film,
  Box,
  Gauge,
  Code2,
  Video,
  Bot,
  Binary,
  Layers,
  Search,
  Server
} from 'lucide-react';

interface ServiceIconProps {
  serviceId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isLight?: boolean;
}

export const getServiceIconElement = (serviceId: string, className = "w-6 h-6") => {
  const id = serviceId.toLowerCase();
  
  if (id.includes('graphic') || id.includes('logo') || id.includes('branding')) {
    return <PenTool className={className} />;
  }
  if (id.includes('software') || id.includes('crm') || id.includes('erp')) {
    return <Cpu className={className} />;
  }
  if (id.includes('website') || id.includes('web_') || id.includes('web-')) {
    return <Globe className={className} />;
  }
  if (id.includes('mobile') || id.includes('app')) {
    return <Smartphone className={className} />;
  }
  if (id.includes('ecommerce') || id.includes('store') || id.includes('shop')) {
    return <ShoppingBag className={className} />;
  }
  if (id.includes('automation') || id.includes('agent') || id.includes('bot')) {
    return <Bot className={className} />;
  }
  if (id.includes('ai') || id.includes('machine_learning') || id.includes('neural')) {
    return <Sparkles className={className} />;
  }
  if (id.includes('ui_ux') || id.includes('design_system') || id.includes('product_design')) {
    return <Palette className={className} />;
  }
  if (id.includes('saas') || id.includes('cloud') || id.includes('devops') || id.includes('server')) {
    return <Cloud className={className} />;
  }
  if (id.includes('api') || id.includes('network') || id.includes('backend')) {
    return <Network className={className} />;
  }
  if (id.includes('wordpress') || id.includes('cms')) {
    return <Boxes className={className} />;
  }
  if (id.includes('security') || id.includes('audit') || id.includes('compliance')) {
    return <ShieldCheck className={className} />;
  }
  if (id.includes('animation') || id.includes('3d_animation') || id.includes('motion')) {
    return <Film className={className} />;
  }
  if (id.includes('video') || id.includes('editing') || id.includes('production')) {
    return <Video className={className} />;
  }
  if (id.includes('render') || id.includes('interior') || id.includes('exterior') || id.includes('floorplan')) {
    return <Box className={className} />;
  }
  if (id.includes('seo') || id.includes('speed') || id.includes('search')) {
    return <Search className={className} />;
  }

  return <Code2 className={className} />;
};

export const ServiceIcon: React.FC<ServiceIconProps> = ({
  serviceId,
  size = 'md',
  className = '',
  isLight = false
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5 rounded-lg',
    md: 'w-12 h-12 p-2.5 rounded-xl',
    lg: 'w-14 h-14 p-3 rounded-2xl',
    xl: 'w-16 h-16 p-3.5 rounded-2xl'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
    xl: 'w-8 h-8'
  };

  const themeClasses = isLight
    ? 'bg-zinc-100 border border-zinc-300 text-slate-950 group-hover:bg-slate-950 group-hover:text-white group-hover:border-slate-950 shadow-sm'
    : 'bg-slate-900 border border-slate-700 text-white group-hover:bg-white group-hover:text-slate-950 group-hover:border-white shadow-md';

  return (
    <div
      className={`flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 ${sizeClasses[size]} ${themeClasses} ${className}`}
    >
      {getServiceIconElement(serviceId, iconSizeClasses[size])}
    </div>
  );
};
