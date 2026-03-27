import { motion } from 'motion/react';
import { SectionHeading } from '@/src/components/SectionHeading';
import { Button } from '@/src/components/Button';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const allServices = [
    {
      slug: 'wedding',
      title: t('services.wedding'),
      description: t('services.weddingDesc'),
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
      features: [t('services.weddingF1'), t('services.weddingF2'), t('services.weddingF3'), t('services.weddingF4')]
    },
    {
      slug: 'beauty',
      title: t('services.beauty'),
      description: t('services.beautyDesc'),
      image: "/images/africaine.jpeg",
      features: [t('services.beautyF1'), t('services.beautyF2'), t('services.beautyF3'), t('services.beautyF4')]
    },
    {
      slug: 'catering',
      title: t('services.catering'),
      description: t('services.cateringDesc'),
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
      features: [t('services.cateringF1'), t('services.cateringF2'), t('services.cateringF3'), t('services.cateringF4')]
    }
  ];

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
        "name": t('nav.services'),
        "item": `${siteUrl}/services`
      }
    ]
  };

  return (
    <div className="pt-32 pb-24">
      <SEO 
        title={t('seo.services.title')} 
        description={t('seo.services.description')} 
        schema={breadcrumbSchema}
      />
      <div className="container mx-auto px-6">
        <SectionHeading 
          title={t('services.title')} 
          subtitle={t('services.subtitle')} 
        />

        <div className="space-y-24">
          {allServices.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-xl group">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="text-4xl font-serif text-ink">{service.title}</h3>
                <p className="text-lg text-ink/60 leading-relaxed">
                  {service.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                        <Check size={12} />
                      </div>
                      <span className="text-sm font-medium text-ink/80">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-8">
                  <Link to={`/services/${service.slug}`} aria-label={`${t('services.learnMore')} ${service.title}`}>
                    <Button className="group" tabIndex={-1}>
                      {t('services.learnMore')} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center bg-beige/30 rounded-[3rem] p-12 md:p-20"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-ink mb-6">{t('cta.title')}</h2>
          <p className="text-lg text-ink/60 mb-10 max-w-2xl mx-auto">{t('cta.text')}</p>
          <Link to="/contact">
            <Button size="lg">
              {t('nav.quote')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
