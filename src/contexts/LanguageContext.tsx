import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // SEO
    'seo.home.title': 'L’œil ORG • Événements & Beauté à Cotonou, Bénin',
    'seo.home.description': 'L’œil ORG rend vos cérémonies originales et inoubliables. Wedding Planning, Beauté, Traiteur et Événements d\'exception à Cotonou.',
    'seo.about.title': 'À Propos de L’œil ORG • Notre Expertise Événementielle',
    'seo.about.description': 'Découvrez l\'histoire de L’œil ORG et notre engagement pour l\'élégance et la créativité dans l\'organisation de vos événements.',
    'seo.services.title': 'Nos Services • Mariage, Beauté et Événements • L’œil ORG',
    'seo.services.description': 'Explorez nos services d\'exception : Wedding Planning, Maquillage, Traiteur, Décoration et bien plus pour vos moments uniques.',
    'seo.gallery.title': 'Galerie de Réalisations • L’œil ORG • Moments d\'Exception',
    'seo.gallery.description': 'Découvrez en images nos plus belles réalisations : mariages, séances beauté et événements organisés par L’œil ORG.',
    'seo.contact.title': 'Contactez L’œil ORG • Devis Gratuit pour Votre Événement',
    'seo.contact.description': 'Prêt à rendre votre événement inoubliable ? Contactez-nous pour un devis gratuit ou une consultation personnalisée.',
    'seo.services.wedding.title': 'Organisation de Mariage & Wedding Planning de Prestige • L’œil ORG',
    'seo.services.wedding.description': 'Confiez votre mariage à L’œil ORG. Organisation complète, gestion des prestataires et coordination pour un mariage élégant et sans stress au Bénin.',
    'seo.services.beauty.title': 'Services de Beauté & Esthétique Professionnels • L’œil ORG',
    'seo.services.beauty.description': 'Sublimez votre beauté naturelle avec L’œil ORG. Maquillage professionnel, coiffure événementielle et soins pour toutes vos occasions spéciales.',
    'seo.services.catering.title': 'Service Traiteur Gourmet & Gastronomie • L’œil ORG',
    'seo.services.catering.description': 'Expériences culinaires raffinées pour vos invités. Menus sur mesure, cocktails créatifs et service professionnel pour vos événements de prestige.',

    // Navbar
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.services': 'Services',
    'nav.gallery': 'Galerie',
    'nav.contact': 'Contact',
    'nav.quote': 'Devis Gratuit',
    
    // Hero
    'hero.subtitle': 'L’œil ORG • Événements & Beauté',
    'hero.title': 'Nous rendons votre cérémonie originale et inoubliable',
    'hero.titleStart': 'Nous rendons votre cérémonie ',   //
    'hero.titleItalic': 'originale et inoubliable',       //
    'hero.cta.quote': 'Demander un devis',
    'hero.cta.whatsapp': 'Contact WhatsApp',
    'hero.scroll': 'Découvrir',
    
    // Intro
    'intro.subtitle': 'Qui sommes-nous',
    'intro.title': "L'art de créer des moments d'exception",
    'intro.text': "Depuis plusieurs années, L’œil ORG accompagne ses clients dans la réalisation de leurs projets les plus ambitieux. Notre mission est de transformer vos rêves en réalité, en apportant une touche d'élégance et d'originalité à chaque événement.",
    'intro.feature1': 'Expertise reconnue en Wedding Planning',
    'intro.feature2': 'Services de beauté haut de gamme',
    'intro.feature3': 'Accompagnement personnalisé de A à Z',
    'intro.feature4': "Réseau de prestataires d'exception",
    'intro.more': 'En savoir plus sur nous',
    
    // Services Section
    'services.subtitle': 'Ce que nous offrons',
    'services.title': "Nos Services d'Exception",
    'services.all': 'Voir tous nos services',
    'services.learnMore': 'En savoir plus',
    
    // Gallery Section
    'gallery.subtitle': 'Galerie',
    'gallery.title': 'Aperçu de nos réalisations',
    'gallery.viewAll': 'Voir toute la galerie',
    'gallery.viewImage': "Voir l'image",
    'gallery.all': 'Tout',
    'gallery.weddings': 'Mariages',
    'gallery.beauty': 'Beauté',
    'gallery.events': 'Événements',
    'gallery.view': 'Voir',
    'gallery.videos': 'Vidéos',
  
    
    // Testimonials
    'testimonials.subtitle': 'Témoignages',
    'testimonials.title': 'Ce que disent nos clients',
    'testimonials.1.name': 'Sophie & Marc',
    'testimonials.1.role': 'Mariés en 2023',
    'testimonials.1.content': "L’œil ORG a transformé notre mariage en un conte de fées. Chaque détail était parfait, nous n'avons eu qu'à profiter de notre journée.",
    'testimonials.2.name': 'Elena Dubois',
    'testimonials.2.role': 'Cliente Beauté',
    'testimonials.2.content': "Le service de maquillage est exceptionnel. Je me suis sentie tellement belle pour mon gala. Je recommande vivement !",
    'testimonials.3.name': 'Jean-Pierre',
    'testimonials.3.role': 'Anniversaire 50 ans',
    'testimonials.3.content': "Une organisation sans faille pour mes 50 ans. Le service traiteur était délicieux et la décoration sublime.",
    
    // CTA Banner
    'cta.title': 'Prêt à rendre votre événement inoubliable ?',
    'cta.text': 'Contactez-nous dès aujourd\'hui pour une consultation gratuite et commencez à planifier votre moment d\'exception.',
    'cta.services': 'Nos Services',
    
    // Footer
    'footer.tagline': 'Nous rendons votre cérémonie originale et inoubliable. Excellence, élégance et créativité au service de vos plus beaux moments.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',
    
    // Contact Page
    'contact.subtitle': 'Contactez-nous',
    'contact.title': 'Parlons de Votre Projet',
    'contact.infoTitle': 'Coordonnées',
    'contact.infoDesc': 'Vous avez une question ou vous souhaitez obtenir un devis personnalisé ? Notre équipe est à votre écoute pour vous accompagner dans tous vos projets.',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.address': 'Adresse',
    'contact.followUs': 'Suivez-nous',
    'contact.quickContact': 'Contact Rapide',
    'contact.whatsappDesc': 'Besoin d\'une réponse immédiate ? Contactez-nous directement sur WhatsApp.',
    'contact.whatsappBtn': 'Discuter sur WhatsApp',
    'contact.formName': 'Nom Complet',
    'contact.formNamePlaceholder': 'Votre nom...',
    'contact.formEmail': 'Email',
    'contact.formEmailPlaceholder': 'votre@email.com',
    'contact.formType': 'Type d\'Événement',
    'contact.typeOther': 'Autre',
    'contact.formMessage': 'Message',
    'contact.formMessagePlaceholder': 'Comment pouvons-nous vous aider ?',
    'contact.formSubmit': 'Envoyer ma demande',
    'contact.formNote': 'Nous vous répondrons sous 24h à 48h.',
    'contact.errorNameRequired': 'Le nom est requis.',
    'contact.errorNameTooShort': 'Le nom doit contenir au moins 2 caractères.',
    'contact.errorEmailRequired': 'L\'adresse email est requise.',
    'contact.errorEmailInvalid': 'Veuillez entrer une adresse email valide.',
    'contact.errorMessageRequired': 'Le message est requis.',
    'contact.errorMessageTooLong': 'Le message est trop long.',
    'contact.errorTypeRequired': 'Veuillez sélectionner un type d\'événement.',
    'contact.formTypePlaceholder': 'Sélectionnez un service...',
    'contact.successTitle': 'Message envoyé !',
    'contact.successDesc': 'Merci pour votre message. Nous vous répondrons dans les 24 à 48h.',
    'contact.sendAnother': 'Envoyer un autre message',
    
    // About Page
    'about.subtitle': 'À Propos de L’œil ORG',
    'about.title': 'Notre Histoire & Notre Passion',
    'about.visionTitle': 'Une vision d\'excellence',
    'about.story1': 'L’œil ORG est né d\'une passion profonde pour l\'élégance et le détail. Fondée avec l\'idée que chaque cérémonie mérite d\'être unique, notre entreprise s\'est rapidement imposée comme une référence dans l\'organisation d\'événements et les services de beauté haut de gamme.',
    'about.story2': 'Notre nom, "L’œil ORG", reflète notre capacité à voir au-delà de l\'ordinaire. Nous avons cet œil attentif qui capte les nuances, les émotions et les détails qui font toute la différence entre un bon événement et un moment inoubliable.',
    'about.exp': 'Années d\'expérience',
    'about.success': 'Événements réussis',
    'about.missionTitle': 'Notre Mission',
    'about.missionText': 'Accompagner nos clients dans les moments les plus importants de leur vie en leur offrant des services d\'organisation et de beauté qui dépassent leurs attentes, tout en respectant leur budget et leur vision.',
    'about.visionTextTitle': 'Notre Vision',
    'about.visionText': 'Devenir le partenaire privilégié pour tous ceux qui recherchent l\'excellence et l\'originalité, en restant à la pointe des tendances tout en préservant l\'élégance intemporelle.',
    'about.whySubtitle': 'Nos Atouts',
    'about.whyTitle': 'Pourquoi nous choisir ?',
    'about.feature1': 'Équipe Experte',
    'about.feature1Desc': 'Des professionnels passionnés et formés.',
    'about.feature2': 'Sur Mesure',
    'about.feature2Desc': 'Chaque projet est unique et personnalisé.',
    'about.feature3': 'Qualité Garantie',
    'about.feature3Desc': 'Nous ne faisons aucun compromis sur la qualité.',
    'about.feature4': 'Passion',
    'about.feature4Desc': 'Nous aimons ce que nous faisons, et ça se voit.',
    'about.premium': 'Qualité Premium',
    
    // Services Page Details
    'services.wedding': 'Wedding Planning',
    'services.weddingDesc': 'Une organisation complète pour le plus beau jour de votre vie. Nous gérons chaque aspect pour que vous puissiez vivre votre rêve sans stress.',
    'services.weddingF1': 'Recherche de lieux d\'exception',
    'services.weddingF2': 'Gestion des prestataires',
    'services.weddingF3': 'Design et décoration florale',
    'services.weddingF4': 'Coordination du jour J',
    
    'services.beauty': 'Beauté & Esthétique',
    'services.beautyDesc': 'Sublimez votre beauté naturelle avec nos services professionnels. Maquillage, coiffure et soins pour toutes vos occasions spéciales.',
    'services.beautyF1': 'Maquillage professionnel',
    'services.beautyF2': 'Coiffure événementielle',
    'services.beautyF3': 'Soins du visage',
    'services.beautyF4': 'Conseils en image',
    
    'services.catering': 'Service Traiteur',
    'services.cateringDesc': 'Une expérience culinaire raffinée pour vos invités. Des menus personnalisés qui raviront les papilles les plus exigeantes.',
    'services.cateringF1': 'Menus sur mesure',
    'services.cateringF2': 'Cocktails et buffets',
    'services.cateringF3': 'Service à table professionnel',
    'services.cateringF4': 'Pâtisserie fine',
    
    'services.requestQuote': 'Demander un devis personnalisé',

    // Service Detail - Wedding
    'services.wedding.fullTitle': 'Organisation de Mariage de Prestige',
    'services.wedding.fullDesc': 'Votre mariage est l\'un des jours les plus importants de votre vie. Chez L’œil ORG, nous comprenons l\'importance de chaque détail. Notre service de Wedding Planning est conçu pour vous offrir une expérience sans stress, de la conception à la réalisation finale.',
    'services.wedding.section1Title': 'Une Approche Personnalisée',
    'services.wedding.section1Text': 'Nous ne croyons pas aux mariages "clés en main". Chaque couple est unique, et votre célébration doit l\'être aussi. Nous prenons le temps de comprendre votre vision, vos goûts et vos priorités pour créer un événement qui vous ressemble vraiment.',
    'services.wedding.featuresTitle': 'Ce que nous incluons',
    'services.wedding.f1Title': 'Recherche de Lieux',
    'services.wedding.f1Desc': 'Accès à des domaines, hôtels et espaces atypiques exclusifs.',
    'services.wedding.f2Title': 'Sélection de Prestataires',
    'services.wedding.f2Desc': 'Traiteurs, photographes, fleuristes et musiciens triés sur le volet.',
    'services.wedding.f3Title': 'Design & Scénographie',
    'services.wedding.f3Desc': 'Création d\'un univers visuel cohérent et élégant.',
    'services.wedding.f4Title': 'Coordination Jour J',
    'services.wedding.f4Desc': 'Présence discrète pour gérer les imprévus et le timing.',
    'services.wedding.cta': 'Planifier mon mariage',

    // Service Detail - Beauty
    'services.beauty.fullTitle': 'Services de Beauté & Esthétique',
    'services.beauty.fullDesc': 'L’œil ORG Beauté vous propose une gamme de services haut de gamme pour vous sublimer. Que ce soit pour votre mariage, un gala ou simplement pour vous faire plaisir, nos experts utilisent les meilleures techniques et produits.',
    'services.beauty.section1Title': 'L\'Excellence au Service de votre Beauté',
    'services.beauty.section1Text': 'Notre équipe de maquilleurs et coiffeurs professionnels se déplace pour vous offrir un service personnalisé. Nous travaillons sur la mise en valeur de vos traits naturels tout en respectant votre style personnel.',
    'services.beauty.featuresTitle': 'Nos Spécialités',
    'services.beauty.f1Title': 'Maquillage Mariée',
    'services.beauty.f1Desc': 'Un teint parfait et un regard sublimé qui tient toute la journée.',
    'services.beauty.f2Title': 'Coiffure Haute Couture',
    'services.beauty.f2Desc': 'Chignons, tresses ou boucles hollywoodiennes sur mesure.',
    'services.beauty.f3Title': 'Soins Préparatoires',
    'services.beauty.f3Desc': 'Préparation de la peau pour un éclat maximal le jour J.',
    'services.beauty.f4Title': 'Ateliers Beauté',
    'services.beauty.f4Desc': 'Apprenez les gestes professionnels avec nos experts.',
    'services.beauty.cta': 'Réserver ma séance',

    // Service Detail - Catering
    'services.catering.fullTitle': 'Gastronomie & Service Traiteur',
    'services.catering.fullDesc': 'Le succès d\'un événement passe souvent par l\'assiette. L’œil ORG collabore avec les meilleurs chefs pour vous proposer une cuisine inventive, savoureuse et magnifiquement présentée.',
    'services.catering.section1Title': 'L\'Art de la Table',
    'services.catering.section1Text': 'Du cocktail dînatoire au dîner assis de prestige, nous adaptons nos menus à vos envies et aux contraintes alimentaires de vos invités. La qualité des produits est notre priorité absolue.',
    'services.catering.featuresTitle': 'Nos Offres Gourmandes',
    'services.catering.f1Title': 'Cocktails Créatifs',
    'services.catering.f1Desc': 'Pièces cocktails originales et animations culinaires en direct.',
    'services.catering.f2Title': 'Dîners Gastronomiques',
    'services.catering.f2Desc': 'Menus élaborés avec des produits frais et de saison.',
    'services.catering.f3Title': 'Buffets Thématiques',
    'services.catering.f3Desc': 'Une présentation spectaculaire pour une convivialité maximale.',
    'services.catering.f4Title': 'Bar à Desserts',
    'services.catering.f4Desc': 'Une fin de repas sucrée et élégante qui marquera les esprits.',
    'services.catering.cta': 'Demander un menu',
  },
  en: {
    // SEO
    'seo.home.title': 'L’œil ORG • Events & Beauty in Cotonou, Benin',
    'seo.home.description': 'L’œil ORG makes your ceremonies original and unforgettable. Wedding Planning, Beauty, Catering and exceptional events in Cotonou.',
    'seo.about.title': 'About L’œil ORG • Our Event Expertise',
    'seo.about.description': 'Discover the history of L’œil ORG and our commitment to elegance and creativity in organizing your events.',
    'seo.services.title': 'Our Services • Wedding, Beauty and Events • L’œil ORG',
    'seo.services.description': 'Explore our exceptional services: Wedding Planning, Makeup, Catering, Decoration and more for your unique moments.',
    'seo.gallery.title': 'Portfolio Gallery • L’œil ORG • Exceptional Moments',
    'seo.gallery.description': 'Discover in images our most beautiful achievements: weddings, beauty sessions and events organized by L’œil ORG.',
    'seo.contact.title': 'Contact L’œil ORG • Free Quote for Your Event',
    'seo.contact.description': 'Ready to make your event unforgettable? Contact us for a free quote or a personalized consultation.',
    'seo.services.wedding.title': 'Wedding Planning & Prestige Organization • L’œil ORG',
    'seo.services.wedding.description': 'Entrust your wedding to L’œil ORG. Complete organization, vendor management, and coordination for a stress-free, elegant wedding in Benin.',
    'seo.services.beauty.title': 'Professional Beauty & Aesthetics Services • L’œil ORG',
    'seo.services.beauty.description': 'Enhance your natural beauty with L’œil ORG. Professional makeup, event hairstyling, and skincare for all your special occasions.',
    'seo.services.catering.title': 'Gourmet Catering & Gastronomy Services • L’œil ORG',
    'seo.services.catering.description': 'Exquisite culinary experiences for your guests. Custom menus, creative cocktails, and professional service for your prestige events.',

    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'nav.quote': 'Free Quote',
    
    // Hero
    'hero.subtitle': 'L’œil ORG • Events & Beauty',
    'hero.title': 'We make your ceremony original and unforgettable',
    'hero.titleStart': 'We make your ceremony ',           //
    'hero.titleItalic': 'original and unforgettable',      //
    'hero.cta.quote': 'Request a Quote',
    'hero.cta.whatsapp': 'WhatsApp Contact',
    'hero.scroll': 'Discover',
    
    // Intro
    'intro.subtitle': 'Who we are',
    'intro.title': 'The art of creating exceptional moments',
    'intro.text': 'For several years, L’œil ORG has been supporting its clients in the realization of their most ambitious projects. Our mission is to transform your dreams into reality, bringing a touch of elegance and originality to every event.',
    'intro.feature1': 'Recognized expertise in Wedding Planning',
    'intro.feature2': 'High-end beauty services',
    'intro.feature3': 'Personalized support from A to Z',
    'intro.feature4': 'Exceptional network of providers',
    'intro.more': 'Learn more about us',
    
    // Services Section
    'services.subtitle': 'What we offer',
    'services.title': 'Our Exceptional Services',
    'services.all': 'See all our services',
    'services.learnMore': 'Learn more',
    
    // Gallery Section
    'gallery.subtitle': 'Gallery',
    'gallery.title': 'Overview of our achievements',
    'gallery.viewAll': 'View full gallery',
    'gallery.viewImage': 'View image',
    'gallery.all': 'All',
    'gallery.weddings': 'Weddings',
    'gallery.beauty': 'Beauty',
    'gallery.events': 'Events',
    'gallery.view': 'View',
    'gallery.videos': 'Videos',
    
    // Testimonials
    'testimonials.subtitle': 'Testimonials',
    'testimonials.title': 'What our clients say',
    'testimonials.1.name': 'Sophie & Marc',
    'testimonials.1.role': 'Married in 2023',
    'testimonials.1.content': "L’œil ORG transformed our wedding into a fairy tale. Every detail was perfect, we just had to enjoy our day.",
    'testimonials.2.name': 'Elena Dubois',
    'testimonials.2.role': 'Beauty Client',
    'testimonials.2.content': "The makeup service is exceptional. I felt so beautiful for my gala. I highly recommend!",
    'testimonials.3.name': 'Jean-Pierre',
    'testimonials.3.role': '50th Birthday',
    'testimonials.3.content': "Flawless organization for my 50th birthday. The catering was delicious and the decoration sublime.",
    
    // CTA Banner
    'cta.title': 'Ready to make your event unforgettable?',
    'cta.text': 'Contact us today for a free consultation and start planning your exceptional moment.',
    'cta.services': 'Our Services',
    
    // Footer
    'footer.tagline': 'We make your ceremony original and unforgettable. Excellence, elegance and creativity at the service of your most beautiful moments.',
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    
    // Contact Page
    'contact.subtitle': 'Contact Us',
    'contact.title': 'Let\'s Talk About Your Project',
    'contact.infoTitle': 'Contact Information',
    'contact.infoDesc': 'Do you have a question or would you like to get a personalized quote? Our team is at your disposal to support you in all your projects.',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.followUs': 'Follow Us',
    'contact.quickContact': 'Quick Contact',
    'contact.whatsappDesc': 'Need an immediate answer? Contact us directly on WhatsApp.',
    'contact.whatsappBtn': 'Chat on WhatsApp',
    'contact.formName': 'Full Name',
    'contact.formNamePlaceholder': 'Your name...',
    'contact.formEmail': 'Email',
    'contact.formEmailPlaceholder': 'your@email.com',
    'contact.formType': 'Event Type',
    'contact.typeOther': 'Other',
    'contact.formMessage': 'Message',
    'contact.formMessagePlaceholder': 'How can we help you?',
    'contact.formSubmit': 'Send my request',
    'contact.formNote': 'We will get back to you within 24h to 48h.',
    'contact.errorNameRequired': 'Name is required.',
    'contact.errorNameTooShort': 'Name must be at least 2 characters.',
    'contact.errorEmailRequired': 'Email address is required.',
    'contact.errorEmailInvalid': 'Please enter a valid email address.',
    'contact.errorMessageRequired': 'Message is required.',
    'contact.errorMessageTooLong': 'Message is too long.',
    'contact.errorTypeRequired': 'Please select an event type.',
    'contact.formTypePlaceholder': 'Select a service...',
    'contact.successTitle': 'Message sent!',
    'contact.successDesc': 'Thank you for your message. We will get back to you within 24 to 48 hours.',
    'contact.sendAnother': 'Send another message',
    
    
    
    // About Page
    'about.subtitle': 'About L’œil ORG',
    'about.title': 'Our History & Our Passion',
    'about.visionTitle': 'A vision of excellence',
    'about.story1': 'L’œil ORG was born from a deep passion for elegance and detail. Founded with the idea that every ceremony deserves to be unique, our company quickly established itself as a reference in event organization and high-end beauty services.',
    'about.story2': 'Our name, "L’œil ORG", reflects our ability to see beyond the ordinary. We have that attentive eye that captures the nuances, emotions and details that make all the difference between a good event and an unforgettable moment.',
    'about.exp': 'Years of experience',
    'about.success': 'Successful events',
    'about.missionTitle': 'Our Mission',
    'about.missionText': 'Support our clients in the most important moments of their lives by offering organization and beauty services that exceed their expectations, while respecting their budget and vision.',
    'about.visionTextTitle': 'Our Vision',
    'about.visionText': 'Become the preferred partner for all those seeking excellence and originality, staying at the forefront of trends while preserving timeless elegance.',
    'about.whySubtitle': 'Our Strengths',
    'about.whyTitle': 'Why choose us?',
    'about.feature1': 'Expert Team',
    'about.feature1Desc': 'Passionate and trained professionals.',
    'about.feature2': 'Tailor-made',
    'about.feature2Desc': 'Each project is unique and personalized.',
    'about.feature3': 'Guaranteed Quality',
    'about.feature3Desc': 'We make no compromise on quality.',
    'about.feature4': 'Passion',
    'about.feature4Desc': 'We love what we do, and it shows.',
    'about.premium': 'Premium Quality',
    
    // Services Page Details
    'services.wedding': 'Wedding Planning',
    'services.weddingDesc': 'Complete organization for the most beautiful day of your life. We manage every aspect so you can live your dream without stress.',
    'services.weddingF1': 'Search for exceptional venues',
    'services.weddingF2': 'Vendor management',
    'services.weddingF3': 'Design and floral decoration',
    'services.weddingF4': 'Day-of coordination',
    
    'services.beauty': 'Beauty & Aesthetics',
    'services.beautyDesc': 'Enhance your natural beauty with our professional services. Makeup, hairstyling, and treatments for all your special occasions.',
    'services.beautyF1': 'Professional makeup',
    'services.beautyF2': 'Event hairstyling',
    'services.beautyF3': 'Facial treatments',
    'services.beautyF4': 'Image consulting',
    
    'services.catering': 'Catering Service',
    'services.cateringDesc': 'A refined culinary experience for your guests. Personalized menus that will delight even the most demanding palates.',
    'services.cateringF1': 'Tailor-made menus',
    'services.cateringF2': 'Cocktails and buffets',
    'services.cateringF3': 'Professional table service',
    'services.cateringF4': 'Fine pastry',
    
    'services.requestQuote': 'Request a personalized quote',

    // Service Detail - Wedding
    'services.wedding.fullTitle': 'Prestige Wedding Planning',
    'services.wedding.fullDesc': 'Your wedding is one of the most important days of your life. At L’œil ORG, we understand the importance of every detail. Our Wedding Planning service is designed to offer you a stress-free experience, from conception to final realization.',
    'services.wedding.section1Title': 'A Personalized Approach',
    'services.wedding.section1Text': 'We don\'t believe in "turnkey" weddings. Every couple is unique, and your celebration should be too. We take the time to understand your vision, tastes, and priorities to create an event that truly reflects you.',
    'services.wedding.featuresTitle': 'What we include',
    'services.wedding.f1Title': 'Venue Sourcing',
    'services.wedding.f1Desc': 'Access to exclusive estates, hotels, and atypical spaces.',
    'services.wedding.f2Title': 'Vendor Selection',
    'services.wedding.f2Desc': 'Hand-picked caterers, photographers, florists, and musicians.',
    'services.wedding.f3Title': 'Design & Scenography',
    'services.wedding.f3Desc': 'Creation of a coherent and elegant visual universe.',
    'services.wedding.f4Title': 'D-Day Coordination',
    'services.wedding.f4Desc': 'Discreet presence to manage unexpected events and timing.',
    'services.wedding.cta': 'Plan my wedding',

    // Service Detail - Beauty
    'services.beauty.fullTitle': 'Beauty & Aesthetic Services',
    'services.beauty.fullDesc': 'L’œil ORG Beauty offers a range of high-end services to enhance your look. Whether it\'s for your wedding, a gala, or just to treat yourself, our experts use the best techniques and products.',
    'services.beauty.section1Title': 'Excellence at the Service of your Beauty',
    'services.beauty.section1Text': 'Our team of professional makeup artists and hairstylists travels to offer you a personalized service. We work on enhancing your natural features while respecting your personal style.',
    'services.beauty.featuresTitle': 'Our Specialties',
    'services.beauty.f1Title': 'Bridal Makeup',
    'services.beauty.f1Desc': 'A perfect complexion and enhanced eyes that last all day.',
    'services.beauty.f2Title': 'Haute Couture Hairstyling',
    'services.beauty.f2Desc': 'Custom buns, braids, or Hollywood curls.',
    'services.beauty.f3Title': 'Preparatory Care',
    'services.beauty.f3Desc': 'Skin preparation for maximum glow on the big day.',
    'services.beauty.f4Title': 'Beauty Workshops',
    'services.beauty.f4Desc': 'Learn professional gestures with our experts.',
    'services.beauty.cta': 'Book my session',

    // Service Detail - Catering
    'services.catering.fullTitle': 'Gastronomy & Catering Service',
    'services.catering.fullDesc': 'The success of an event often depends on what\'s on the plate. L’œil ORG collaborates with the best chefs to offer you inventive, tasty, and beautifully presented cuisine.',
    'services.catering.section1Title': 'The Art of the Table',
    'services.catering.section1Text': 'From cocktail parties to prestige sit-down dinners, we adapt our menus to your desires and your guests\' dietary constraints. Product quality is our absolute priority.',
    'services.catering.featuresTitle': 'Our Gourmet Offers',
    'services.catering.f1Title': 'Creative Cocktails',
    'services.catering.f1Desc': 'Original cocktail pieces and live culinary animations.',
    'services.catering.f2Title': 'Gourmet Dinners',
    'services.catering.f2Desc': 'Menus prepared with fresh and seasonal products.',
    'services.catering.f3Title': 'Thematic Buffets',
    'services.catering.f3Desc': 'A spectacular presentation for maximum conviviality.',
    'services.catering.f4Title': 'Dessert Bar',
    'services.catering.f4Desc': 'A sweet and elegant end to the meal that will leave a lasting impression.',
    'services.catering.cta': 'Request a menu',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
