import { useParams, Navigate, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowLeft, Calendar, User, Utensils, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/src/components/Button';
import { SEO } from '@/src/components/SEO';

// ✅ Constante extraite hors du composant (valeur statique, jamais recréée)
const SITE_URL = 'https://ais-pre-eo7cc2y3dv6mcyvlohw7gw-207514675638.europe-west2.run.app';

const serviceData = {
  wedding: {
    icon: Calendar,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    key: 'wedding'
  },
  beauty: {
    icon: User,
    image: "/images/aficaine.jpeg",
    key: 'beauty'
  },
  catering: {
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200",
    key: 'catering'
  }
};

// ✅ Type déduit proprement depuis serviceData
type ServiceSlug = keyof typeof serviceData;

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();

  // ✅ Guard clause — assertion de type faite une seule fois
  if (!slug || !(slug in serviceData)) {
    return <Navigate to="/services" replace />;
  }

  const data = serviceData[slug as ServiceSlug];
  const Icon = data.icon;

  // ✅ Schémas JSON-LD mémoïsés — ne se recréent que si slug/t changent
  const combinedSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": t(`services.${data.key}.fullTitle`),
        "description": t(`services.${data.key}.fullDesc`),
        "provider": {
          "@type": "LocalBusiness",
          "name": "L'œil ORG",
          "url": SITE_URL,
          "logo": "/images/logo.png",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cotonou",
            "addressCountry": "BJ"
          }
        },
        "areaServed": {
          "@type": "Country",
          "name": "Benin"
        },
        "image": data.image
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": t('nav.home'),
            "item": `${SITE_URL}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": t('nav.services'),
            "item": `${SITE_URL}/services`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": t(`services.${data.key}.fullTitle`),
            "item": `${SITE_URL}/services/${slug}`
          }
        ]
      }
    ]
  }), [slug, t, data]);

  return (
    <div className="pt-32 pb-24">
      <SEO
        title={t(`seo.services.${data.key}.title`)}
        description={t(`seo.services.${data.key}.description`)}
        schema={combinedSchema}
      />

      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">
            <li>
              <Link to="/" className="hover:text-gold transition-colors">{t('nav.home')}</Link>
            </li>
            <li className="flex items-center space-x-2">
              <ChevronRight size={10} className="text-gold/30" />
              <Link to="/services" className="hover:text-gold transition-colors">{t('nav.services')}</Link>
            </li>
            <li className="flex items-center space-x-2">
              <ChevronRight size={10} className="text-gold/30" />
              <span className="text-gold" aria-current="page">
                {t(`services.${data.key}.fullTitle`)}
              </span>
            </li>
          </ol>
        </nav>

        <Link
          to="/services"
          className="inline-flex items-center text-gold hover:text-gold-dark transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          {t('nav.services')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-beige text-gold mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-ink leading-tight">
                {t(`services.${data.key}.fullTitle`)}
              </h1>
              <p className="text-xl text-ink/70 leading-relaxed">
                {t(`services.${data.key}.fullDesc`)}
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-gold">
                {t(`services.${data.key}.section1Title`)}
              </h2>
              <p className="text-ink/80 leading-relaxed">
                {t(`services.${data.key}.section1Text`)}
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-gold">
                {t(`services.${data.key}.featuresTitle`)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-ink">{t(`services.${data.key}.f${i}Title`)}</h4>
                      <p className="text-sm text-ink/60">{t(`services.${data.key}.f${i}Desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              {/* ✅ tabIndex={-1} retiré — le bouton doit rester accessible au clavier */}
              {/* ✅ aria-label simplifié : pas de backticks imbriqués */}
              <Link
                to="/contact"
                aria-label={t(`services.${data.key}.cta`)}
              >
                <Button size="lg">
                  {t(`services.${data.key}.cta`)}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={data.image}
                alt={t(`services.${data.key}.fullTitle`)}
                className="w-full h-full object-cover"
                // ✅ referrerPolicy retiré — inutile pour les images locales
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-beige rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}