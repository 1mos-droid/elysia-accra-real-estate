import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bed, Bath, Maximize2, MapPin, DollarSign, Calendar } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function PropertiesGrid() {
  const { properties } = useAppContext();
  const [filter, setFilter] = useState("All");
  const [currency, setCurrency] = useState("USD"); // "USD" or "GHS"

  // Filter listings based on selection
  const filteredProperties = filter === "All" 
    ? properties 
    : properties.filter(p => p.type === filter);


  // Formatting helpers
  const formatPrice = (val, curr) => {
    if (curr === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }).format(val);
    } else {
      const ghsVal = properties.find(p => p.price === val)?.priceGHS || (val * 14.5); // Fallback conversion
      return new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
        maximumFractionDigits: 0
      }).format(ghsVal).replace("GHS", "GH₵");
    }
  };

  return (
    <section id="listings" className="py-24 md:py-32 bg-[#0A0A0B] relative">
      {/* Editorial Decorative Background Text */}
      <div className="absolute top-10 right-10 opacity-[0.01] pointer-events-none hidden lg:block">
        <span className="font-serif text-[12rem] tracking-widest font-bold uppercase text-white">
          Accra
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold" />
              <span className="text-[10px] md:text-xs tracking-[0.4em] text-luxury-gold uppercase font-semibold">
                Bespoke Residences
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-light tracking-tight leading-tight">
              Our Exclusive <br />
              <span className="italic font-normal text-luxury-gold">Signature Collection</span>
            </h2>
          </div>

          {/* Interactive Currency Switcher */}
          <div className="flex items-center space-x-4 self-start md:self-end">
            <span className="text-[10px] tracking-widest uppercase text-gray-400 font-semibold">Show Currency:</span>
            <div className="flex bg-[#121214] p-1 rounded-sm border border-white/5">
              <button
                onClick={() => setCurrency("USD")}
                className={`px-4 py-1.5 rounded-xs text-[10px] tracking-widest font-bold uppercase transition-all duration-300 ${
                  currency === "USD" 
                    ? "bg-luxury-gold text-[#0A0A0B] shadow-sm" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency("GHS")}
                className={`px-4 py-1.5 rounded-xs text-[10px] tracking-widest font-bold uppercase transition-all duration-300 ${
                  currency === "GHS" 
                    ? "bg-luxury-gold text-[#0A0A0B] shadow-sm" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                GHC (₵)
              </button>
            </div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-white/5 pb-6">
          {["All", "Villa", "Penthouse", "Duplex"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2.5 rounded-full text-xs tracking-widest uppercase transition-all duration-300 font-medium ${
                filter === type
                  ? "bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30"
                  : "text-gray-400 hover:text-white bg-transparent border border-transparent"
              }`}
            >
              {type === "All" ? "All Masterpieces" : `${type}s`}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
                key={property.id}
                className="group relative flex flex-col bg-luxury-card border border-white/5 rounded-xs overflow-hidden gold-glow-hover"
              >
                {/* Image Container with Hover zoom */}
                <div className="relative h-[280px] md:h-[320px] overflow-hidden">
                  {/* Dynamic Tag */}
                  {property.tag && (
                    <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-sm bg-[#0A0A0B]/85 backdrop-blur-md border border-white/10 text-[9px] tracking-[0.2em] uppercase text-luxury-gold font-bold">
                      {property.tag}
                    </div>
                  )}

                  {property.featured && (
                    <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-sm bg-luxury-gold text-[#0A0A0B] text-[9px] tracking-[0.2em] uppercase font-bold shadow-md">
                      Featured
                    </div>
                  )}

                  {/* High-res Image */}
                  <motion.img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[0.16, 1, 0.3, 1] group-hover:scale-108"
                  />

                  {/* Absolute Glass overlay on hover */}
                  <div className="absolute inset-0 bg-[#0A0A0B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Absolute Schedule viewing button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[0.16, 1, 0.3, 1] z-20">
                    <a
                      href="#contact"
                      className="px-6 py-3 bg-white text-[#0A0A0B] text-xs tracking-widest uppercase font-bold rounded-sm shadow-xl hover:bg-luxury-gold hover:text-white transition-colors duration-300 flex items-center space-x-2"
                    >
                      <Calendar size={14} />
                      <span>Schedule Viewing</span>
                    </a>
                  </div>
                </div>

                {/* Property Information Card */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location Badge */}
                    <div className="flex items-center space-x-1.5 mb-2.5 text-gray-400">
                      <MapPin size={13} className="text-luxury-gold" />
                      <span className="text-[11px] tracking-widest uppercase font-medium">{property.location}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl text-white font-light group-hover:text-luxury-gold transition-colors duration-300 mb-3">
                      {property.title}
                    </h3>

                    {/* Description excerpt */}
                    <p className="text-xs text-gray-400 font-sans tracking-wide leading-relaxed font-light mb-6 line-clamp-2">
                      {property.description}
                    </p>
                  </div>

                  <div>
                    {/* Amenities Badges Row */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mb-6">
                      <div className="flex flex-col items-start">
                        <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Bedrooms</span>
                        <div className="flex items-center space-x-1.5 text-gray-200 text-xs font-semibold">
                          <Bed size={13} className="text-luxury-gold" />
                          <span>{property.beds}</span>
                        </div>
                      </div>

                      <div className="h-6 w-[1px] bg-white/5" />

                      <div className="flex flex-col items-start">
                        <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Bathrooms</span>
                        <div className="flex items-center space-x-1.5 text-gray-200 text-xs font-semibold">
                          <Bath size={13} className="text-luxury-gold" />
                          <span>{property.baths}</span>
                        </div>
                      </div>

                      <div className="h-6 w-[1px] bg-white/5" />

                      <div className="flex flex-col items-start">
                        <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Area</span>
                        <div className="flex items-center space-x-1.5 text-gray-200 text-xs font-semibold">
                          <Maximize2 size={13} className="text-luxury-gold" />
                          <span>{property.sqft.toLocaleString()} <span className="text-[9px] font-normal text-gray-400">SqFt</span></span>
                        </div>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] tracking-widest uppercase text-gray-400 font-bold">Investment Value</span>
                      <span className="text-xl font-bold tracking-tight text-white font-sans">
                        {formatPrice(property.price, currency)}
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Premium Banner Callout */}
        <div className="mt-16 text-center">
          <p className="text-xs tracking-widest text-gray-400 uppercase font-light">
            Looking for something fully bespoke? Let us curate off-market opportunities.{" "}
            <a href="#contact" className="text-luxury-gold font-bold underline underline-offset-4 hover:text-luxury-gold-light transition-colors duration-300">
              Speak with our Concierge
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
