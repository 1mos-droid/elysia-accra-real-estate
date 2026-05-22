import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Award, Users, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function StatsBanner() {
  const { stats, testimonials } = useAppContext();
  const [activeQuote, setActiveQuote] = useState(0);

  const prevQuote = () => {
    setActiveQuote((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextQuote = () => {
    setActiveQuote((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Map stat index to specialized icons for custom trust look
  const getIcon = (idx) => {
    switch (idx) {
      case 0: return <Award className="text-luxury-gold" size={24} />;
      case 1: return <ShieldCheck className="text-luxury-gold" size={24} />;
      case 2: return <Users className="text-luxury-gold" size={24} />;
      default: return <ShieldCheck className="text-luxury-gold" size={24} />;
    }
  };

  return (
    <section className="py-24 bg-[#0F0F11] border-y border-white/5 relative overflow-hidden">
      {/* Editorial aesthetic line detail */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 hidden lg:block pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Grid for Trust Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-24">
          {stats.slice(0, 3).map((stat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: idx * 0.15, cubicBezier: [0.16, 1, 0.3, 1] }}
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-sm glassmorphism-light hover:border-luxury-gold/20 transition-all duration-500"
            >
              {/* Gold Icon Box */}
              <div className="h-14 w-14 rounded-full flex items-center justify-center bg-[#0A0A0B] border border-white/10 mb-6 shadow-lg">
                {getIcon(idx)}
              </div>
              
              {/* Stat Value */}
              <h3 className="font-serif text-4xl md:text-5xl text-white font-semibold tracking-tight text-glow mb-3">
                {stat.value}
              </h3>
              
              {/* Stat Label */}
              <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-bold mb-3">
                {stat.label}
              </h4>
              
              {/* Stat Description */}
              <p className="text-xs text-gray-400 font-sans tracking-wide leading-relaxed font-light">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Client Testimonials Section */}
        <div className="max-w-4xl mx-auto border-t border-white/5 pt-20">
          <div className="flex flex-col items-center text-center">
            
            {/* Fine Title */}
            <div className="flex items-center space-x-2 mb-8">
              <Quote className="text-luxury-gold rotate-180" size={20} />
              <span className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold">Client Retrospective</span>
            </div>

            {/* Quote Carousel */}
            <div className="relative h-[180px] sm:h-[130px] w-full flex items-center justify-center px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQuote}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute"
                >
                  <p className="font-serif text-lg md:text-2xl italic font-light text-gray-200 tracking-wide leading-relaxed">
                    "{testimonials[activeQuote].quote}"
                  </p>
                  
                  <div className="mt-6">
                    <span className="text-xs uppercase tracking-widest text-white font-bold block">
                      {testimonials[activeQuote].author}
                    </span>
                    <span className="text-[10px] tracking-wider text-luxury-gold uppercase mt-1 block">
                      {testimonials[activeQuote].role} &nbsp;|&nbsp; {testimonials[activeQuote].location}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center space-x-6 mt-8 sm:mt-4">
              <button
                onClick={prevQuote}
                className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-luxury-gold transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveQuote(idx)}
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      activeQuote === idx ? "bg-luxury-gold w-4" : "bg-white/20"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextQuote}
                className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-luxury-gold transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
