import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '@/src/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
  slug: string;
  key?: React.Key;
}

export const ServiceCard = ({ title, description, image, index, slug }: ServiceCardProps) => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className="group relative bg-card rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700"
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        {/* Shimmer Placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-beige-light animate-pulse flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        )}
        
        <img 
          src={image} 
          alt={title}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
        <h3 className="text-2xl md:text-3xl font-serif mb-2">{title}</h3>
        <p className="text-white/70 text-sm md:text-base mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          {description}
        </p>
        <Link to={`/services/${slug}`} aria-label={`${t('services.learnMore')} ${title}`}>
          <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-ink" tabIndex={-1}>
            {t('services.learnMore')} <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
