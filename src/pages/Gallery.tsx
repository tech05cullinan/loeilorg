import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '@/src/components/SectionHeading';
import { X } from 'lucide-react';
import { SEO } from '@/src/components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

export default function Gallery() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<{ url: string, type: 'image' | 'video' } | null>(null);

  const categories = [
    { id: 'all', label: t('gallery.all') },
    { id: 'wedding', label: t('gallery.weddings') },
    { id: 'beauty', label: t('gallery.beauty') },
    { id: 'events', label: t('gallery.events') },
    { id: 'video', label: t('gallery.videos') || 'Videos' }
  ];

  const galleryItems: { id: number, category: string, url: string, type: 'image' | 'video' }[] = [
    { id: 1, category: "wedding", url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800", type: 'image' },
    { id: 2, category: "video", url: "https://player.vimeo.com/external/494252666.sd.mp4?s=721c8653c004d0033233e72389450c3817f6208d&profile_id=165&oauth2_token_id=57447761", type: 'video' },
    { id: 3, category: "events", url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800", type: 'image' },
    { id: 5, category: "beauty", url: "/images/africaine.jpeg", type: 'image' },
    { id: 6, category: "video", url: "https://player.vimeo.com/external/459389137.sd.mp4?s=9123930460e204116951a613dbcc3729581ce072&profile_id=165&oauth2_token_id=57447761", type: 'video' },
    { id: 7, category: "wedding", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", type: 'image' },
    { id: 8, category: "events", url: "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=800", type: 'image' },
    { id: 9, category: "video", url: "https://player.vimeo.com/external/371433846.sd.mp4?s=231da6ab3a7b4702997447ad313e7f19d996107b&profile_id=139&oauth2_token_id=57447761", type: 'video' },
    { id: 10, category: "events", url: "/images/ev1.jpeg", type: 'image' },
  ];

  const filteredItems = activeCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const siteUrl = 'https://ais-pre-eo7cc2y3dv6mcyvlohw7gw-207514675638.europe-west2.run.app';
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t('nav.home'),
        "item": `${siteUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('nav.gallery'),
        "item": `${siteUrl}/gallery`
      }
    ]
  };

  return (
    <div className="pt-32 pb-24">
      <SEO 
        title={t('seo.gallery.title')} 
        description={t('seo.gallery.description')} 
        schema={breadcrumbSchema}
      />
      <div className="container mx-auto px-6">
        <SectionHeading 
          title={t('gallery.title')} 
          subtitle={t('gallery.subtitle')} 
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id 
                  ? "bg-gold text-white shadow-lg" 
                  : "bg-white text-ink/60 hover:bg-beige border border-beige dark:bg-white dark:text-black dark:hover:bg-beige dark:hover:text-amber-600 dark:border-beige"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="region"
          aria-label="Gallery Grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="aspect-[4/5] rounded-3xl overflow-hidden group cursor-pointer relative w-full text-left focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-4"
                onClick={() => setSelectedItem({ url: item.url, type: item.type })}
                aria-label={`View ${item.category} ${item.type} ${item.id}`}
              >
                {item.type === 'image' ? (
                  <img 
                    src={item.url} 
                    alt={`${item.category} event photography`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <video
                    src={item.url}
                    muted
                    loop
                    playsInline
                    onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseOut={(e) => {
                      const video = e.target as HTMLVideoElement;
                      video.pause();
                      video.currentTime = 0;
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="bg-white/90 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-ink">
                    {item.type === 'video' ? 'Play' : t('gallery.view')}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-12"
              onClick={() => setSelectedItem(null)}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedItem.type === 'video' ? 'Video' : 'Image'} Lightbox`}
            >
              <button 
                className="absolute top-8 right-8 text-white hover:text-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold rounded-full p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(null);
                }}
                aria-label="Close lightbox"
              >
                <X size={40} />
              </button>
              
              {selectedItem.type === 'image' ? (
                <motion.img 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={selectedItem.url} 
                  alt="Full size gallery image"
                  className="max-w-full max-h-full object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full max-w-5xl aspect-video"
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    src={selectedItem.url}
                    controls
                    autoPlay
                    className="w-full h-full rounded-xl shadow-2xl"
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
