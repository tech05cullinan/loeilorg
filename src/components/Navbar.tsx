import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Sun, Moon, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Button } from './Button';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { scrollY } = useScroll();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { 
      name: t('nav.services'), 
      path: '/services',
      dropdown: [
        { name: t('services.wedding'), path: '/services/wedding' },
        { name: t('services.beauty'), path: '/services/beauty' },
        { name: t('services.catering'), path: '/services/catering' },
      ]
    },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <>
      <motion.nav 
        initial={false}
        animate={{
          top: isScrolled ? 12 : 24,
          width: isScrolled ? '90%' : '80%',
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-1/2 -translate-x-1/2 z-50"
      >
        <motion.div 
          animate={{
            paddingTop: isScrolled ? '0.75rem' : '1rem',
            paddingBottom: isScrolled ? '0.75rem' : '1rem',
            backgroundColor: isScrolled ? 'var(--card-white)' : 'var(--gold-light)',
            boxShadow: isScrolled ? '0 10px 30px -10px rgba(0,0,0,0.1)' : '0 4px 20px -5px rgba(0,0,0,0.05)',
          }}
          className="backdrop-blur-md border border-gold/10 px-8 rounded-full flex items-center justify-between transition-colors duration-300"
        >
          {/* Logo - Tout à gauche */}
          <Link to="/" className="flex items-center group relative z-50" aria-label="L'oeil ORG - Home">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              src="/images/logo/logo-transparent.png " // local image
              alt="L'oeil ORG Logo"
              // Option 2 — recadre l'image vers la droite
              className="h-12 md:h-14 w-24 md:w-32 object-cover object-right transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.dropdown && link.dropdown.some(d => location.pathname === d.path));
              return (
                <div key={link.path} className="relative group/nav">
                  <Link 
                    to={link.path}
                    className={cn(
                      'relative px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 rounded-full flex items-center gap-1',
                      isActive ? 'text-gold' : 'text-ink/60 hover:text-ink'
                    )}
                  >
                    <span className="relative z-10">{link.name}</span>
                    
                    {/* Active Link Indicator (Shared Layout) */}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-active"
                        className="absolute inset-0 z-0 rounded-full bg-gold/5 border border-gold/10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    {/* Hover Background */}
                    {!isActive && (
                      <div className="absolute inset-0 z-0 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300 rounded-full bg-ink/5" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.dropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-300 z-[60]">
                      <div className="bg-card border border-gold/10 rounded-2xl p-2 shadow-2xl min-w-[200px]">
                        {link.dropdown.map((sublink) => (
                          <Link
                            key={sublink.path}
                            to={sublink.path}
                            className={cn(
                              "block px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors",
                              location.pathname === sublink.path ? "bg-gold/10 text-gold" : "text-ink/60 hover:bg-ink/5 hover:text-ink"
                            )}
                          >
                            {sublink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center bg-ink/5 rounded-full p-1 border border-ink/5">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all text-ink hover:bg-ink/5"
              >
                <Globe size={10} className="opacity-70" />
                <span>{language.toUpperCase()}</span>
              </motion.button>

              <div className="w-px h-3 mx-1 opacity-10 bg-ink" />

              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9, rotate: -15 }}
                onClick={toggleTheme}
                className="p-1.5 rounded-full transition-all text-ink hover:bg-ink/5"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ y: 5, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -5, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'light' ? <Moon size={12} /> : <Sun size={12} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>

            <Link to="/contact">
              <Button 
                size="sm" 
                variant="primary" 
                className="relative hidden lg:flex overflow-hidden group rounded-full h-9 px-6"
              >
                <span className="relative z-10 text-[10px] font-bold tracking-widest uppercase">{t('nav.quote')}</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"
                  initial={false}
                />
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="relative z-50 p-2 md:hidden text-ink"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current rounded-full origin-left"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="w-full h-0.5 bg-current rounded-full"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current rounded-full origin-left"
              />
            </div>
          </button>
        </motion.div>
      </motion.nav>

      {/* Immersive Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[45] bg-card/95 backdrop-blur-xl md:hidden flex flex-col pt-32"
          >
            <div className="flex-1 flex flex-col px-10 space-y-6 overflow-y-auto pb-12">
              {navLinks.map((link, i) => (
                <div key={link.path} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link 
                      to={link.path}
                      className={cn(
                        'group flex items-center justify-between text-4xl font-serif font-bold transition-all',
                        location.pathname === link.path ? 'text-gold' : 'text-ink/40 hover:text-ink'
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className={cn("transition-all", location.pathname === link.path ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4")} size={32} />
                    </Link>
                  </motion.div>

                  {/* Mobile Sub-links for Services */}
                  {link.dropdown && (
                    <div className="pl-4 space-y-4 border-l-2 border-gold/20 ml-1">
                      {link.dropdown.map((sublink, subIdx) => (
                        <motion.div
                          key={sublink.path}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 + subIdx * 0.05 }}
                        >
                          <Link
                            to={sublink.path}
                            className={cn(
                              "block text-lg font-medium transition-colors",
                              location.pathname === sublink.path ? "text-gold" : "text-ink/40"
                            )}
                          >
                            {sublink.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-10 border-t border-gold/10 bg-gold/5"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex space-x-6">
                  <button onClick={toggleLanguage} className="text-[10px] font-bold tracking-[0.2em] uppercase text-ink/60 hover:text-gold transition-colors">
                    {language === 'fr' ? 'English' : 'Français'}
                  </button>
                  <button onClick={toggleTheme} className="text-[10px] font-bold tracking-[0.2em] uppercase text-ink/60 hover:text-gold transition-colors">
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </button>
                </div>
              </div>
              <Link to="/contact">
                <Button size="lg" className="w-full rounded-2xl h-14 text-sm font-bold tracking-widest uppercase">
                  {t('nav.quote')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
