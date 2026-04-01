import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-footer-bg text-footer-text pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          <div className="space-y-5">
            <Link to="/" className="flex items-center" aria-label="L'oeil ORG - Home">
              <img 
                src="/images/logo.png"
                alt="L'oeil ORG Logo"
                className="h-24 w-auto object-contain border-5 rounded-full"
              />
            </Link>

            <p className="text-sm leading-relaxed text-footer-text/70 max-w-xs">
              {t('footer.tagline')}
            </p>

            <div className="flex gap-3 pt-2">
              {[
                { href: 'https://www.instagram.com/loeilorg/', Icon: Instagram },
                { href: 'https://www.facebook.com/loeilorg', Icon: Facebook },
              ].map(({Icon, href}, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-footer-text/20 hover:bg-gold hover:border-gold hover:scale-105 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold tracking-wide mb-5">
              {t('footer.quickLinks')}
            </h4>

            <ul className="space-y-3 text-sm leading-relaxed text-footer-text/70">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/about', label: t('nav.about') },
                { to: '/services', label: t('nav.services') },
                { to: '/gallery', label: t('nav.gallery') },
                { to: '/contact', label: t('nav.contact') }
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="hover:text-gold transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold tracking-wide mb-5">
              {t('nav.services')}
            </h4>

            <ul className="space-y-3 text-sm leading-relaxed text-footer-text/70">
              {[
                t('services.wedding'),
                t('services.beauty'),
                t('services.catering'),
                t('about.feature1'),
                t('about.feature2'),
                t('about.feature3')
              ].map((service, i) => (
                <li
                  key={i}
                  className="hover:text-gold transition-colors duration-300 cursor-default"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold tracking-wide mb-5">
              {t('nav.contact')}
            </h4>

            <ul className="space-y-4 text-sm leading-relaxed text-footer-text/70">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-orange mt-1" />
                <span>Cotonou, Bénin</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-orange" />
                <span>+229 01 46 56 43 01</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-orange" />
                <span>loeilorg@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-footer-text/10 pt-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-footer-text/50 uppercase tracking-wider">

            <p className="text-center md:text-left">
              © {new Date().getFullYear()} L’œil ORG. {t('footer.rights')}
            </p>

            <p className="opacity-60 text-center">
              RCCM : RB/COT/20 A 56910 N | IFU : 202011399913
            </p>

            <p className="opacity-40 text-center md:text-right">
              TechCullinan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};