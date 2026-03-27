import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

const getWhatsAppMessage = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Bonjour L'Oeil org ! 👋 Je vous contacte ce matin afin d'avoir plus d'informations sur vos services.";
  } else if (hour >= 12 && hour < 18) {
    return "Bonjour L'Oeil org ! 👋 J'espère que vous passez une bonne journée. Je vous contacte cet après-midi afin d'avoir plus d'informations sur vos services.";
  } else if (hour >= 18 && hour < 22) {
    return "Bonsoir L'Oeil org ! 👋 Je vous contacte ce soir afin d'avoir plus d'informations sur vos services.";
  } else {
    return "Bonsoir L'Oeil org ! 👋 Je vous contacte afin d'avoir plus d'informations sur vos services.";
  }
};

export const FloatingWhatsApp = () => {
  const message = encodeURIComponent(getWhatsAppMessage());
  const whatsappUrl = `https://wa.me/22946564301?text=${message}`;

  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-24 right-8 md:bottom-8 md:right-8 z-[9999999] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer pointer-events-auto"
    >
      <MessageCircle size={32} />
      <span className="absolute -top-2 -right-2 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
      </span>
    </motion.a>
  );
};
