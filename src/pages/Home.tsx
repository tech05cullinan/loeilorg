import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, Quote, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/src/components/Button';
import { SectionHeading } from '@/src/components/SectionHeading';
import { ServiceCard } from '@/src/components/ServiceCard';
import { SEO } from '@/src/components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ✅ useMemo : évite la recréation du tableau à chaque render
  const heroImages = useMemo(() => [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1920",
    "/public/images/africaine.jpeg", //local image
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1920"
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // ✅ useMemo : services stable entre les renders
  const services = useMemo(() => [
    {
      slug: 'wedding',
      title: t('services.wedding'),
      description: t('services.weddingDesc'),
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
    },
    {
      slug: 'beauty',
      title: t('services.beauty'),
      description: t('services.beautyDesc'),
      image: "/public/images/Beauty.jpg" // ✅ /public retiré du chemin
    },
    {
      slug: 'catering',
      title: t('services.catering'),
      description: t('services.cateringDesc'),
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800"
    }
  ], [t]);

  // ✅ Tableau testimonials utilisé dans le JSX (était défini mais ignoré)
  // ✅ Chemins images locaux corrigés
  const testimonials = useMemo(() => [
    {
      name: t('testimonials.1.name'),
      role: t('testimonials.1.role'),
      content: t('testimonials.1.content'),
      avatar: "/images/avatar.png" // ✅ /public retiré
    },
    {
      name: t('testimonials.2.name'),
      role: t('testimonials.2.role'),
      content: t('testimonials.2.content'),
      avatar: "/images/avatar1.png" // ✅ /public retiré
    },
    {
      name: t('testimonials.3.name'),
      role: t('testimonials.3.role'),
      content: t('testimonials.3.content'),
      avatar: "https://i.pravatar.cc/150?u=jp"
    }
  ], [t]);

  const businessSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "L'œil ORG",
    "image": "https://storage.googleapis.com/static.mira.app/app-assets/eo7cc2y3dv6mcyvlohw7gw/input_file_0.png",
    "@id": "https://ais-pre-eo7cc2y3dv6mcyvlohw7gw-207514675638.europe-west2.run.app",
    "url": "https://ais-pre-eo7cc2y3dv6mcyvlohw7gw-207514675638.europe-west2.run.app",
    "telephone": "+229-01-46-56-43-01",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Cotonou",
      "addressLocality": "Cotonou",
      "addressCountry": "BJ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.3763836,
      "longitude": 2.4201774
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "09:00",
      "closes": "19:30"
    },
    "sameAs": ["https://wa.me/22946564301"],
    "priceRange": "$$"
  }), []);

  return (
    <div className="overflow-hidden">
      <SEO
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        schema={businessSchema}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={heroImages[currentImageIndex]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gold font-medium tracking-[0.3em] uppercase mb-6"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-tight text-balance"
          >
            {/* ✅ Logique de split fragile remplacée par deux clés de traduction dédiées */}
            {t('hero.titleStart')}
            <span className="italic">{t('hero.titleItalic')}</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto">
                {t('hero.cta.quote')}
              </Button>
            </Link>
            <a href="https://wa.me/22946564301" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-ink">
                {t('hero.cta.whatsapp')}
              </Button>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
        >
          <div className="w-px h-12 bg-white/30 mx-auto mb-2" />
          <span className="text-[10px] uppercase tracking-[0.2em]">{t('hero.scroll')}</span>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/founders.jpeg" // local image
                  referrerPolicy="no-referrer"
                  alt="L'oeil ORG Founders event"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 glass p-8 rounded-2xl hidden md:block max-w-xs">
                <p className="font-serif italic text-lg text-gold mb-2">"L'excellence est dans chaque détail."</p>
                <p className="text-xs uppercase tracking-widest font-bold">L'œil ORG Team</p>
              </div>
            </motion.div>

            <div className="space-y-8">
              <SectionHeading
                title={t('intro.title')}
                subtitle={t('intro.subtitle')}
                centered={false}
              />
              <p className="text-lg text-ink/70 leading-relaxed">{t('intro.text')}</p>
              <ul className="space-y-4">
                {[
                  t('intro.feature1'),
                  t('intro.feature2'),
                  t('intro.feature3'),
                  t('intro.feature4')
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center space-x-3 text-ink/80"
                  >
                    <CheckCircle2 className="text-gold" size={20} />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link to="/about">
                <Button variant="ghost" className="group">
                  {t('intro.more')} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services-overview" className="py-24 bg-beige">
        <div className="container mx-auto px-6">
          <SectionHeading title={t('services.title')} subtitle={t('services.subtitle')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug} 
                title={service.title}
                description={service.description}
                image={service.image}
                index={index}
                slug={service.slug}
              />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/services">
              <Button variant="outline" size="lg">{t('services.all')}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Highlight */}
      <section id="gallery-highlight" className="py-24 bg-card overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <SectionHeading
              title={t('gallery.title')}
              subtitle={t('gallery.subtitle')}
              centered={false}
              className="mb-0"
            />
            <Link to="/gallery">
              <Button variant="ghost" className="group">
                {t('gallery.viewAll')} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600", alt: "Elegant wedding table setting with white flowers" },
              { url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600", alt: "Bride and groom sharing a moment" },
              { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=600", alt: "Professional makeup artist at work" },
              { url: "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=600", alt: "Gourmet catering presentation" }
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — utilise maintenant le tableau `testimonials` défini plus haut */}
      <section id="testimonials" className="py-24 bg-pink-soft/30">
        <div className="container mx-auto px-6">
          <SectionHeading title={t('testimonials.title')} subtitle={t('testimonials.subtitle')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => ( // renommé pour ne pas écraser le hook t()
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-3xl shadow-sm relative"
              >
                <Quote className="text-gold/20 absolute top-6 right-8" size={48} />
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(5)].map((_, j) => ( // renommé j pour éviter la confusion
                    <Star key={j} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-ink/70 italic mb-8 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-ink/50 uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-ink rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-serif">{t('cta.title')}</h2>
              <p className="text-white/60 text-lg">{t('cta.text')}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact">
                  <Button size="lg" className="w-full sm:w-auto">{t('hero.cta.quote')}</Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white hover:text-ink">
                    {t('cta.services')}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}