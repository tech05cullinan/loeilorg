import { motion } from 'motion/react';
import { SectionHeading } from '@/src/components/SectionHeading';
import { CheckCircle2, Heart, Award, Users } from 'lucide-react';
import { SEO } from '@/src/components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

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
        "name": t('nav.about'),
        "item": `${siteUrl}/about`
      }
    ]
  };

  return (
    <div className="pt-32 pb-24">
      <SEO 
        title={t('seo.about.title')} 
        description={t('seo.about.description')} 
        schema={breadcrumbSchema}
      />
      <div className="container mx-auto px-6">
        <SectionHeading 
          title={t('about.title')} 
          subtitle={t('about.subtitle')} 
        />

        {/* Brand Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-6">
            <h3 className="text-3xl font-serif text-gold">{t('about.visionTitle')}</h3>
            <p className="text-lg text-ink/70 leading-relaxed">
              {t('about.story1')}
            </p>
            <p className="text-lg text-ink/70 leading-relaxed">
              {t('about.story2')}
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="space-y-2">
                <h4 className="text-4xl font-serif text-gold">10+</h4>
                <p className="text-xs uppercase tracking-widest font-bold text-ink/50">{t('about.exp')}</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-4xl font-serif text-gold">500+</h4>
                <p className="text-xs uppercase tracking-widest font-bold text-ink/50">{t('about.success')}</p>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-full overflow-hidden border-8 border-card shadow-2xl">
              <img 
                src="/images/ev1.jpeg" 
                alt="About us" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold rounded-full flex items-center justify-center text-white p-4 text-center text-xs font-bold uppercase tracking-tighter -rotate-12">
              {t('about.premium')}
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card p-12 rounded-[2rem] shadow-sm border border-beige"
          >
            <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-8">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl font-serif mb-4">{t('about.missionTitle')}</h3>
            <p className="text-ink/60 leading-relaxed">
              {t('about.missionText')}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card p-12 rounded-[2rem] shadow-sm border border-beige"
          >
            <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-8">
              <Award size={32} />
            </div>
            <h3 className="text-2xl font-serif mb-4">{t('about.visionTextTitle')}</h3>
            <p className="text-ink/60 leading-relaxed">
              {t('about.visionText')}
            </p>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-footer-bg text-footer-text rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <SectionHeading 
              title={t('about.whyTitle')} 
              subtitle={t('about.whySubtitle')} 
              className="text-footer-text"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: <Users />, title: t('about.feature1'), desc: t('about.feature1Desc') },
                { icon: <CheckCircle2 />, title: t('about.feature2'), desc: t('about.feature2Desc') },
                { icon: <Award />, title: t('about.feature3'), desc: t('about.feature3Desc') },
                { icon: <Heart />, title: t('about.feature4'), desc: t('about.feature4Desc') }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto text-white">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-serif">{item.title}</h4>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
