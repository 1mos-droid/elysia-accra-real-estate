import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function Hero() {
  const { siteSettings } = useAppContext();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0B]">
      {/* Background Image with slow zoom */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.65 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
      />

      {/* Luxury Radial/Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/40 to-transparent" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A0A0B]/30 to-[#0A0A0B]/80" />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Fine sub-label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-3 mb-6"
        >
          <span className="h-[1px] w-8 bg-luxury-gold/60" />
          <span className="text-[11px] md:text-xs tracking-[0.5em] text-luxury-gold uppercase font-semibold">
            The Crown Jewels of Accra Real Estate
          </span>
          <span className="h-[1px] w-8 bg-luxury-gold/60" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-8xl tracking-tight text-white leading-[1.1] mb-8 font-light"
        >
          {siteSettings.heroTitle} <br />
          <span className="italic font-normal text-luxury-gold text-glow">{siteSettings.heroTitleItalic}</span>
        </motion.h1>

        {/* Editorial Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-base md:text-xl font-sans text-gray-300 font-light tracking-wide leading-relaxed mb-12"
        >
          {siteSettings.heroDescription}
        </motion.p>


        {/* Dual Actions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a
            href="#listings"
            className="w-full sm:w-auto px-8 py-4 bg-luxury-gold text-[#0A0A0B] text-xs tracking-[0.2em] uppercase font-bold rounded-sm shadow-xl shadow-luxury-gold/15 hover:bg-luxury-gold-light transition-all duration-300 flex items-center justify-center space-x-2 group gold-glow-hover"
          >
            <span>View Exclusive Listings</span>
            <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white text-xs tracking-[0.2em] uppercase font-bold rounded-sm hover:border-white hover:bg-white/5 transition-all duration-300"
          >
            Private Consultation
          </a>
        </motion.div>
      </div>

      {/* Decorative luxury coordinates detail */}
      <div className="absolute bottom-10 left-10 hidden xl:flex flex-col text-[10px] tracking-[0.3em] uppercase text-gray-500 font-light space-y-1">
        <span>Accra, Ghana</span>
        <span className="text-luxury-gold/50">5.6037° N, 0.1870° W</span>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center cursor-pointer"
        onClick={() => {
          document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-semibold mb-2">Scroll to Discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-luxury-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
