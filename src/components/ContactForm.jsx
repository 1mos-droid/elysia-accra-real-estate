import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, ArrowRight, User, KeyRound, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function ContactForm() {
  const { siteSettings, submitLead } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "Villa",
    budget: "$1.0M - $2.5M",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLead(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        interest: "Villa",
        budget: "$1.0M - $2.5M",
        message: ""
      });
    }, 5000); // Hide toast after 5s
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0A0A0B] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Form and Sidebar Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Contact Information Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold" />
                <span className="text-[10px] md:text-xs tracking-[0.4em] text-luxury-gold uppercase font-bold">
                  Exclusive Inquiries
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-light tracking-tight leading-tight mb-6">
                Begin Your <br />
                <span className="italic font-normal text-luxury-gold">Private Journey</span>
              </h2>
              <p className="text-xs text-gray-400 font-sans tracking-wide leading-relaxed font-light">
                Whether seeking a secondary estate, an investment penthouse, or private land acquisition, our dedicated concierge team is ready to assist with absolute discretion.
              </p>
            </div>

            {/* Contact Details Cards */}
            <div className="space-y-6">
              
              <div className="flex items-start space-x-4 p-5 rounded-xs bg-[#121214] border border-white/5">
                <div className="h-10 w-10 rounded-full bg-[#0A0A0B] flex items-center justify-center border border-white/10 shrink-0">
                  <Phone size={14} className="text-luxury-gold" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Direct Line</h4>
                  <a href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`} className="text-sm font-sans font-medium text-white hover:text-luxury-gold transition-colors duration-300">
                    {siteSettings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 rounded-xs bg-[#121214] border border-white/5">
                <div className="h-10 w-10 rounded-full bg-[#0A0A0B] flex items-center justify-center border border-white/10 shrink-0">
                  <Mail size={14} className="text-luxury-gold" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Private Office</h4>
                  <a href={`mailto:${siteSettings.email}`} className="text-sm font-sans font-medium text-white hover:text-luxury-gold transition-colors duration-300">
                    {siteSettings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 rounded-xs bg-[#121214] border border-white/5">
                <div className="h-10 w-10 rounded-full bg-[#0A0A0B] flex items-center justify-center border border-white/10 shrink-0">
                  <MapPin size={14} className="text-luxury-gold" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Bespoke Lounge</h4>
                  <p className="text-sm font-sans text-white leading-relaxed font-light">
                    {siteSettings.address}
                  </p>
                </div>
              </div>

            </div>
          </div>


          {/* Right Side: Lead Capture Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#121214] border border-white/5 p-8 md:p-12 rounded-sm relative gold-glow">
            
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Field Grid: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Full Name */}
                <div className="relative group">
                  <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">
                    Your Name
                  </label>
                  <div className="relative flex items-center">
                    <User size={14} className="absolute left-4 text-gray-500 group-focus-within:text-luxury-gold transition-colors duration-300" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kenneth Mensah"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-11 pr-4 py-3.5 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold/60 focus:ring-1 focus:ring-luxury-gold/30 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="relative group">
                  <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">
                    Private Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail size={14} className="absolute left-4 text-gray-500 group-focus-within:text-luxury-gold transition-colors duration-300" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. k.mensah@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-11 pr-4 py-3.5 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold/60 focus:ring-1 focus:ring-luxury-gold/30 transition-all duration-300"
                    />
                  </div>
                </div>

              </div>

              {/* Property Interest Toggle Tabs */}
              <div>
                <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-3">
                  Primary Property Interest
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Villa", "Penthouse", "Duplex"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, interest: type})}
                      className={`py-3 rounded-xs border text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 ${
                        formData.interest === type
                          ? "bg-luxury-gold/10 text-luxury-gold border-luxury-gold"
                          : "bg-[#0A0A0B] text-gray-400 border-white/5 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range Toggle Tabs */}
              <div>
                <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-3">
                  Investment Capital Range
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["$500K - $1.0M", "$1.0M - $2.5M", "$2.5M+"].map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setFormData({...formData, budget: range})}
                      className={`py-3 rounded-xs border text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 ${
                        formData.budget === range
                          ? "bg-luxury-gold/10 text-luxury-gold border-luxury-gold"
                          : "bg-[#0A0A0B] text-gray-400 border-white/5 hover:text-white"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom message field */}
              <div>
                <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">
                  Special Requirements (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about specific security, square footage, or neighborhood amenities you require..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3.5 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold/60 focus:ring-1 focus:ring-luxury-gold/30 transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                className="w-full py-4.5 bg-luxury-gold text-[#0A0A0B] text-xs tracking-[0.25em] uppercase font-bold rounded-sm shadow-xl hover:bg-luxury-gold-light transition-all duration-300 flex items-center justify-center space-x-2 group gold-glow-hover cursor-pointer"
              >
                <span>Request Consultation Portfolio</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

            </form>
          </div>

        </div>

      </div>

      {/* Floating Elegant Success Toast with glassmorphism */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-6 md:right-12 z-50 p-6 glassmorphism rounded-sm border border-luxury-gold/30 shadow-2xl max-w-sm relative pr-10"
          >
            <div className="flex items-start space-x-4">
              <CheckCircle className="text-luxury-gold shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-1.5">Consultation Requested</h4>
                <p className="text-[11px] text-gray-400 font-sans tracking-wide leading-relaxed font-light mb-2">
                  Thank you, <strong className="text-white">{formData.name}</strong>. An executive client director will contact you securely at <strong className="text-white">{formData.email}</strong> within two hours.
                </p>
                <div className="h-0.5 bg-luxury-gold/20 w-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4.8, ease: "linear" }}
                    className="h-full bg-luxury-gold"
                  />
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSubmitted(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors duration-200 cursor-pointer"
              aria-label="Close success message"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
