import { motion } from 'motion/react';
import { FaWhatsapp } from "react-icons/fa";

const getWhatsAppMessage = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Bonjour L'Oeil org ! Je vous contacte ce matin afin d'avoir plus d'informations sur vos services.";
  } else if (hour >= 12 && hour < 18) {
    return "Bonjour L'Oeil org ! J'espère que vous passez une bonne journée. Je vous contacte cet après-midi afin d'avoir plus d'informations sur vos services.";
  } else if (hour >= 18 && hour < 22) {
    return "Bonsoir L'Oeil org ! Je vous contacte ce soir afin d'avoir plus d'informations sur vos services.";
  } else {
    return "Bonsoir L'Oeil org ! Je vous contacte afin d'avoir plus d'informations sur vos services.";
  }
};

export const FloatingWhatsApp = () => {
  const message = encodeURIComponent(getWhatsAppMessage());
  const whatsappUrl = `https://wa.me/22946564301?text=${message}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[9999999]"
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="group relative flex items-center"
        whileTap={{ scale: 0.92 }}
      >
        {/* Show whatsapp text */}
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute right-16 bg-white text-black text-sm px-4 py-2 rounded-full shadow-lg whitespace-nowrap opacity-0"
        >
          WhatsApp
        </motion.span>

        {/* bouton circulaire */}
        <motion.div
          className="relative w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl cursor-pointer overflow-visible"
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Logo whatsapp */}
          <FaWhatsapp size={32} />

          {/* Animation */}
          <span className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></span>
        </motion.div>
      </motion.a>
    </motion.div>
  );
};
