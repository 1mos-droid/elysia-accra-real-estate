import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Phone, Lock, Key, Undo2, Play } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
  const { siteSettings, isAdminMode, setIsAdminMode, triggerNotification } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Passcode modal states
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Listen to global registry console login events
    const handleGlobalLoginTrigger = () => {
      setShowPasscodeModal(true);
      setPasscode("");
      setErrorMsg("");
    };
    window.addEventListener("open-admin-login", handleGlobalLoginTrigger);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("open-admin-login", handleGlobalLoginTrigger);
    };
  }, []);

  // Keyboard accessibility for Passcode Modal
  useEffect(() => {
    if (!showPasscodeModal) return;

    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        handleNumClick(e.key);
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === "Escape") {
        e.preventDefault();
        setShowPasscodeModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPasscodeModal, passcode]);

  // Handle Numpad Clicks
  const handleNumClick = (num) => {
    setErrorMsg("");
    if (passcode.length < 4) {
      const newCode = passcode + num;
      setPasscode(newCode);
      
      // Auto check if length is 4
      if (newCode === "1234") {
        setTimeout(() => {
          setIsAdminMode(true);
          setShowPasscodeModal(false);
          setPasscode("");
          triggerNotification("Registry Unlocked", "Access granted. Welcome back, Client Director.", "success");
        }, 300);
      } else if (newCode.length === 4) {
        setTimeout(() => {
          setErrorMsg("Access Denied: Invalid Security Signature");
          setPasscode("");
        }, 300);
      }
    }
  };

  const handleBackspace = () => {
    setPasscode(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPasscode("");
    setErrorMsg("");
  };

  return (
    <>
      {/* Dynamic Scrolling Announcement Bar */}
      {siteSettings.showAnnouncement && (
        <div className="fixed top-0 left-0 w-full z-[52] bg-luxury-gold text-luxury-dark py-2 px-4 overflow-hidden select-none border-b border-luxury-gold/20 shadow-md">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
            }
            .marquee-inner {
              display: inline-block;
              padding-left: 20%;
              white-space: nowrap;
              animation: marquee 28s linear infinite;
            }
            .marquee-inner span {
              display: inline-block;
              padding-right: 4rem;
            }
          `}} />
          <div className="w-full overflow-hidden text-[9px] font-bold tracking-[0.25em] uppercase">
            <div className="marquee-inner">
              <span>{siteSettings.announcementBanner}</span>
              <span>{siteSettings.announcementBanner}</span>
              <span>{siteSettings.announcementBanner}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Nav Header Container */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ top: siteSettings.showAnnouncement ? "32px" : "0px" }}
        className={`fixed left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-[#0A0A0B]/85 backdrop-blur-md border-b border-white/5"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo Brand */}
          <a href="#" className="flex flex-col items-start group">
            <span className="font-serif text-2xl tracking-[0.25em] text-white group-hover:text-luxury-gold transition-colors duration-300 flex items-center space-x-1">
              <span>COD REALTY</span>
              {isAdminMode && (
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse ml-1.5 self-center" title="Real-time Session Active" />
              )}
            </span>
            <span className="text-[9px] tracking-[0.4em] text-luxury-gold uppercase font-light">
              & Properties
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {["Listings", "Philosophy", "Services", "Contact"].map((item, idx) => (
              <a
                key={idx}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-sans tracking-widest text-gray-300 hover:text-luxury-gold transition-colors duration-300 uppercase font-medium"
              >
                {item}
              </a>
            ))}
            {isAdminMode && (
              <button
                onClick={() => setIsAdminMode(false)}
                className="text-xs font-sans tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors duration-300 uppercase font-bold border border-emerald-500/30 px-3 py-1 rounded bg-emerald-500/5 cursor-pointer"
              >
                Dashboard
              </button>
            )}
          </div>

          {/* Contact & CTA Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
              className="flex items-center space-x-2 text-xs tracking-widest text-gray-300 hover:text-luxury-gold transition-colors duration-300 uppercase"
            >
              <Phone size={14} className="text-luxury-gold" />
              <span>{siteSettings.phone}</span>
            </a>
            
            {/* Elegant Lock Icon Entry */}
            <button
              onClick={() => {
                if (isAdminMode) {
                  setIsAdminMode(false);
                  triggerNotification("Session Paused", "Returned to public luxury layout preview.", "info");
                } else {
                  setShowPasscodeModal(true);
                }
              }}
              className={`p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer ${
                isAdminMode 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20" 
                  : "bg-[#121214] text-gray-400 border-white/5 hover:text-luxury-gold hover:border-luxury-gold/50"
              }`}
              title={isAdminMode ? "Exit Admin Mode" : "Registry Console Login"}
            >
              {isAdminMode ? <Lock size={13} className="text-emerald-400" /> : <Lock size={13} />}
            </button>

            <a
              href="#contact"
              className="relative px-6 py-2.5 overflow-hidden group rounded-sm border border-luxury-gold/40 text-xs tracking-widest text-white uppercase font-semibold transition-all duration-300 hover:border-luxury-gold gold-glow-hover"
            >
              <span className="relative z-10">Enquire Now</span>
              <span className="absolute inset-0 bg-luxury-gold/5 scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]"></span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={() => {
                if (isAdminMode) {
                  setIsAdminMode(false);
                } else {
                  setShowPasscodeModal(true);
                }
              }}
              className={`p-2 rounded-full border ${
                isAdminMode 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                  : "bg-[#121214] text-gray-400 border-white/5"
              }`}
            >
              <Lock size={14} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-luxury-gold transition-colors duration-300"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#0A0A0B]/98 backdrop-blur-xl flex flex-col justify-center px-8 md:hidden"
          >
            <div className="flex flex-col space-y-8 text-center">
              {["Listings", "Philosophy", "Services", "Contact"].map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-3xl tracking-widest text-gray-100 hover:text-luxury-gold transition-colors duration-300"
                >
                  {item}
                </motion.a>
              ))}

              {isAdminMode && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => {
                    setIsAdminMode(false);
                    setIsOpen(false);
                  }}
                  className="font-serif text-3xl tracking-widest text-emerald-400"
                >
                  Admin Portal
                </motion.button>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-8 border-t border-white/10 flex flex-col items-center space-y-6"
              >
                <a
                  href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                  className="flex items-center space-x-2 text-sm tracking-widest text-gray-300 hover:text-luxury-gold"
                >
                  <Phone size={16} className="text-luxury-gold" />
                  <span>{siteSettings.phone}</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full max-w-[280px] text-center px-8 py-4 bg-luxury-gold text-[#0A0A0B] text-xs tracking-widest uppercase font-bold rounded-sm shadow-lg shadow-luxury-gold/10 hover:bg-luxury-gold-light transition-colors duration-300"
                >
                  Request Consultation
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vault Passcode Numeric Login Modal */}
      <AnimatePresence>
        {showPasscodeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-luxury-dark/95 backdrop-blur-2xl px-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="max-w-md w-full bg-[#121214] border border-white/5 rounded-xs p-8 flex flex-col items-center text-center relative gold-glow"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPasscodeModal(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Secure Vault Logo */}
              <div className="h-16 w-16 rounded-full bg-[#0A0A0B] border border-luxury-gold/20 flex items-center justify-center mb-6 shadow-xl">
                <Key className="text-luxury-gold animate-pulse" size={26} />
              </div>

              <span className="text-[10px] tracking-[0.4em] text-luxury-gold uppercase font-bold mb-2">
                COD REALTY Secure Registry
              </span>
              <h3 className="font-serif text-2xl text-white font-light mb-6">
                Enter Decryption Signature
              </h3>

              {/* Passcode Display Indicators */}
              <div className="flex space-x-4 mb-8">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`h-4.5 w-4.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                      passcode.length > idx
                        ? "bg-luxury-gold border-luxury-gold shadow-md shadow-luxury-gold/30"
                        : "border-white/10 bg-[#0A0A0B]"
                    }`}
                  >
                    {passcode.length > idx && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0B]" />
                    )}
                  </div>
                ))}
              </div>

              {/* Error signature feedback */}
              <div className="h-6 mb-6">
                <AnimatePresence>
                  {errorMsg && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[10px] uppercase tracking-wider text-rose-500 font-bold"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Numpad Layout Grid */}
              <div className="grid grid-cols-3 gap-4 max-w-[280px] w-full mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumClick(num.toString())}
                    className="h-14 rounded-full bg-[#0A0A0B] border border-white/5 flex items-center justify-center text-lg font-semibold text-white hover:text-luxury-dark hover:bg-luxury-gold hover:border-luxury-gold active:scale-95 transition-all duration-200 cursor-pointer shadow-md select-none font-sans"
                  >
                    {num}
                  </button>
                ))}
                
                {/* Clear */}
                <button
                  onClick={handleClear}
                  className="h-14 rounded-full bg-transparent border border-white/5 flex items-center justify-center text-[10px] tracking-widest uppercase font-bold text-gray-500 hover:text-white hover:border-white/20 active:scale-95 transition-all duration-200 cursor-pointer select-none font-sans"
                >
                  Clear
                </button>

                {/* 0 */}
                <button
                  onClick={() => handleNumClick("0")}
                  className="h-14 rounded-full bg-[#0A0A0B] border border-white/5 flex items-center justify-center text-lg font-semibold text-white hover:text-luxury-dark hover:bg-luxury-gold hover:border-luxury-gold active:scale-95 transition-all duration-200 cursor-pointer shadow-md select-none font-sans"
                >
                  0
                </button>

                {/* Delete / Backspace */}
                <button
                  onClick={handleBackspace}
                  className="h-14 rounded-full bg-transparent border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center select-none"
                >
                  <Undo2 size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsAdminMode(true);
                  setShowPasscodeModal(false);
                  setPasscode("");
                  triggerNotification("Registry Unlocked", "Quick access signature bypass authorized. Welcome.", "success");
                }}
                className="w-full max-w-[240px] mb-6 py-3 bg-transparent border border-luxury-gold/30 hover:border-luxury-gold hover:bg-luxury-gold/5 text-luxury-gold text-[10px] tracking-[0.2em] uppercase font-bold rounded-sm transition-all duration-300 cursor-pointer"
              >
                ⚡ Quick Demo Sign-In
              </button>

              <p className="text-[9px] tracking-wider uppercase text-gray-600">
                Authorized Client Concierge Registry Console. <br />
                Security Signature required. Use passcode: <strong className="text-luxury-gold font-bold">1234</strong>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
