import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-footer-bg text-footer-text pt-20 pb-10 transition-colors duration-300">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center group" aria-label="L'oeil ORG - Home">
            <img 
              src="/images/logo.png"
              alt="L'oeil ORG Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="text-footer-text/60 text-sm leading-relaxed">
            {t('footer.tagline')}
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="w-10 h-10 rounded-full border border-footer-text/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300" aria-label="Follow us on Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-footer-text/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300" aria-label="Follow us on Facebook">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-footer-text/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300" aria-label="Follow us on Twitter">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-serif font-medium mb-6">{t('footer.quickLinks')}</h4>
          <ul className="space-y-4 text-sm text-footer-text/60">
            <li><Link to="/" className="hover:text-gold transition-colors">{t('nav.home')}</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-colors">{t('nav.about')}</Link></li>
            <li><Link to="/services" className="hover:text-gold transition-colors">{t('nav.services')}</Link></li>
            <li><Link to="/gallery" className="hover:text-gold transition-colors">{t('nav.gallery')}</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-serif font-medium mb-6">{t('nav.services')}</h4>
          <ul className="space-y-4 text-sm text-footer-text/60">
            <li>{t('services.wedding')}</li>
            <li>{t('services.beauty')}</li>
            <li>{t('services.catering')}</li>
            <li>{t('about.feature1')}</li>
            <li>{t('about.feature2')}</li>
            <li>{t('about.feature3')}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-serif font-medium mb-6">{t('nav.contact')}</h4>
          <ul className="space-y-4 text-sm text-footer-text/60">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-brand-orange shrink-0" />
              <span>Cotonou, Bénin</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-brand-orange shrink-0" />
              <span>+229 01 46 56 43 01</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-brand-orange shrink-0" />
              <span>loeilorg@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-20 pt-8 border-t border-footer-text/10 text-center text-footer-text/40 text-[10px] uppercase tracking-widest space-y-2">
        <p>© {new Date().getFullYear()} L’œil ORG. {t('footer.rights')}</p>
        <p className="opacity-50">RCCM : RB/COT/20 A 56910 N | IFU : 202011399913</p>
        <p>TechCullinan</p>
      </div>
    </footer>
  );
};
