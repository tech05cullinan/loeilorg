import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/src/components/SectionHeading';
import { Button } from '../components/Button';
import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook, Twitter, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { SEO } from '@/src/components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '@/src/lib/utils';

const MAX_MESSAGE_LENGTH = 1000;

export default function Contact() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    type: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; type?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validateField = (name: string, value: string) => {
    let error = '';
    
    if (name === 'name') {
      if (!value.trim()) {
        error = t('contact.errorNameRequired');
      } else if (value.trim().length < 2) {
        error = t('contact.errorNameTooShort');
      }
    }
    
    if (name === 'email') {
      if (!value.trim()) {
        error = t('contact.errorEmailRequired');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = t('contact.errorEmailInvalid');
      }
    }

    if (name === 'type') {
      if (!value) {
        error = t('contact.errorTypeRequired');
      }
    }
    
    if (name === 'message') {
      if (!value.trim()) {
        error = t('contact.errorMessageRequired');
      } else if (value.length > MAX_MESSAGE_LENGTH) {
        error = t('contact.errorMessageTooLong');
      }
    }

    setErrors(prev => ({ ...prev, [name]: error || undefined }));
    return !error;
  };

  const validate = () => {
    const nameValid = validateField('name', formState.name);
    const emailValid = validateField('email', formState.email);
    const typeValid = validateField('type', formState.type);
    const messageValid = validateField('message', formState.message);
    
    return nameValid && emailValid && typeValid && messageValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', type: '', message: '' });
      setErrors({});
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Enforce character limit for message
    if (name === 'message' && value.length > MAX_MESSAGE_LENGTH) {
      return;
    }

    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (name in formState) {
      validateField(name, value);
    }
  };

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
        "name": t('nav.contact'),
        "item": `${siteUrl}/contact`
      }
    ]
  };

  return (
    <div className="pt-32 pb-24">
      <SEO 
        title={t('seo.contact.title')} 
        description={t('seo.contact.description')} 
        schema={breadcrumbSchema}
      />
      <div className="container mx-auto px-6">
        <SectionHeading 
          title={t('contact.title')} 
          subtitle={t('contact.subtitle')} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-3xl font-serif text-ink">{t('contact.infoTitle')}</h3>
              <p className="text-ink/60 leading-relaxed max-w-md">
                {t('contact.infoDesc')}
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 bg-card rounded-2xl shadow-sm flex items-center justify-center text-gold shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-ink/40 mb-1">{t('contact.phone')}</h4>
                  <p className="text-lg font-medium hover:text-gold transition-colors cursor-pointer">+229 01 46 56 43 01</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 bg-card rounded-2xl shadow-sm flex items-center justify-center text-gold shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-ink/40 mb-1">{t('contact.email')}</h4>
                  <p className="text-lg font-medium hover:text-gold transition-colors cursor-pointer">loeilorg@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 bg-card rounded-2xl shadow-sm flex items-center justify-center text-gold shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-ink/40 mb-1">{t('contact.address')}</h4>
                  <p className="text-lg font-medium">Cotonou, Bénin</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-sm uppercase tracking-widest text-ink/40">{t('contact.followUs')}</h4>
              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    aria-label={`Follow us on ${Icon.name}`}
                    className="w-12 h-12 bg-card rounded-full shadow-sm flex items-center justify-center text-ink hover:bg-gold hover:text-white hover:scale-110 transition-all duration-300"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gold/5 p-8 rounded-[2rem] border border-gold/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-gold/10 transition-colors" />
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-4">
                  <MessageCircle className="text-gold" size={32} />
                  <h4 className="text-xl font-serif">{t('contact.quickContact')}</h4>
                </div>
                <p className="text-sm text-ink/60 mb-6">{t('contact.whatsappDesc')}</p>
                <a href="https://wa.me/22946564301" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] border-none shadow-lg shadow-green-500/20">
                    {t('contact.whatsappBtn')}
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-orange-100 p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-ink/5 border border-beige relative overflow-hidden"
          >
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-3xl font-serif">{t('contact.successTitle') || 'Message Envoyé'}</h3>
                <p className="text-ink/60 max-w-xs mx-auto">
                  {t('contact.successDesc') || 'Merci pour votre message. Nous vous répondrons dans les plus brefs délais.'}
                </p>
                <Button onClick={() => setStatus('idle')} variant="outline" type="button">
                  {t('contact.sendAnother') || 'Envoyer un autre message'}
                </Button>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40 ml-1">{t('contact.formName')}</label>
                    <input 
                      id="name"
                      type="text" 
                      name="name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      value={formState.name}
                      onChange={handleChange}
                      className={cn(
                        "w-full bg-beige/30 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-card focus:border-gold/30 focus:ring-4 focus:ring-gold/5 transition-all outline-none",
                        errors.name && "border-red-500/50 bg-red-50/30 focus:border-red-500/50 focus:ring-red-500/5"
                      )} 
                      placeholder={t('contact.formNamePlaceholder')} 
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-1 animate-in fade-in slide-in-from-top-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40 ml-1">{t('contact.formEmail')}</label>
                    <input 
                      id="email"
                      type="email" 
                      name="email"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      value={formState.email}
                      onChange={handleChange}
                      className={cn(
                        "w-full bg-beige/30 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-card focus:border-gold/30 focus:ring-4 focus:ring-gold/5 transition-all outline-none",
                        errors.email && "border-red-500/50 bg-red-50/30 focus:border-red-500/50 focus:ring-red-500/5"
                      )} 
                      placeholder={t('contact.formEmailPlaceholder')} 
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-1 animate-in fade-in slide-in-from-top-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="type" className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40 ml-1">{t('contact.formType')}</label>
                  <div className="relative">
                    <select 
                      id="type"
                      name="type"
                      aria-required="true"
                      aria-invalid={!!errors.type}
                      aria-describedby={errors.type ? "type-error" : undefined}
                      value={formState.type}
                      onChange={handleChange}
                      className={cn(
                        "w-full bg-beige/30 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-card focus:border-gold/30 focus:ring-4 focus:ring-gold/5 transition-all appearance-none outline-none cursor-pointer",
                        errors.type && "border-red-500/50 bg-red-50/30 focus:border-red-500/50 focus:ring-red-500/5"
                      )}
                    >
                      <option value="" disabled>{t('contact.formTypePlaceholder')}</option>
                      <option>{t('services.wedding')}</option>
                      <option>{t('services.beauty')}</option>
                      <option>{t('services.catering')}</option>
                      <option>{t('contact.typeOther')}</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gold/50">
                      <Star size={12} className="fill-gold" />
                    </div>
                  </div>
                  {errors.type && (
                    <p id="type-error" className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-1 animate-in fade-in slide-in-from-top-1">
                      {errors.type}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40 ml-1">{t('contact.formMessage')}</label>
                    <span 
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-widest mr-1",
                        formState.message.length > MAX_MESSAGE_LENGTH * 0.9 ? "text-red-500" : "text-ink/20"
                      )}
                      aria-live="polite"
                    >
                      {formState.message.length} / {MAX_MESSAGE_LENGTH}
                    </span>
                  </div>
                  <textarea 
                    id="message"
                    name="message"
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    rows={6} 
                    value={formState.message}
                    onChange={handleChange}
                    className={cn(
                      "w-full bg-beige/30 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-card focus:border-gold/30 focus:ring-4 focus:ring-gold/5 transition-all resize-none outline-none",
                      errors.message && "border-red-500/50 bg-red-50/30 focus:border-red-500/50 focus:ring-red-500/5"
                    )} 
                    placeholder={t('contact.formMessagePlaceholder')} 
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-1 animate-in fade-in slide-in-from-top-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button 
                  size="lg" 
                  className="w-full shadow-xl shadow-gold/10 group" 
                  disabled={status === 'submitting'}
                >
                  <span className="flex items-center justify-center">
                    {status === 'submitting' ? (
                      <>
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                        />
                        {t('contact.formSubmitting') || 'Envoi...'}
                      </>
                    ) : (
                      <>
                        {t('contact.formSubmit')}
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </Button>
                <p className="text-center text-[10px] text-ink/40 uppercase tracking-[0.2em]">
                  {t('contact.formNote')}
                </p>
              </form>
            )}
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-24 rounded-[3rem] overflow-hidden h-[400px] shadow-lg relative grayscale hover:grayscale-0 transition-all duration-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.044158943485!2d2.420177411030932!3d6.376383593588724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10235502adbb6f19%3A0xbad2c5a7e383a673!2sL'oeilOrg!5e0!3m2!1sen!2sbj!4v1711375200000!5m2!1sen!2sbj" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="L'oeil ORG Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
