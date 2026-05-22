import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Eye, AlertCircle, Volume2, X } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PropertiesGrid from "./components/PropertiesGrid";
import StatsBanner from "./components/StatsBanner";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { useAppContext } from "./context/AppContext";
import "./App.css";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { isAdminMode, notifications, siteSettings, dismissNotification } = useAppContext();

  // Helper for notification icons
  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <Sparkles className="text-emerald-400 shrink-0" size={18} />;
      case "lead":
        return <Mail className="text-luxury-gold shrink-0" size={18} />;
      case "warning":
        return <AlertCircle className="text-rose-500 shrink-0" size={18} />;
      default:
        return <Eye className="text-sky-400 shrink-0" size={18} />;
    }
  };

  // Helper for notification colors
  const getNotificationStyles = (type) => {
    switch (type) {
      case "success":
        return "border-emerald-500/30 shadow-emerald-950/20";
      case "lead":
        return "border-luxury-gold/45 shadow-luxury-gold/5";
      case "warning":
        return "border-rose-500/30 shadow-rose-950/20";
      default:
        return "border-sky-500/30 shadow-sky-950/20";
    }
  };

  return (
    <div className="relative bg-[#0A0A0B] text-gray-100 min-h-screen selection:bg-luxury-gold selection:text-luxury-dark">
      {/* Premium Scroll Progress Bar (Only show on public view) */}
      {!isAdminMode && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-luxury-gold origin-left z-[9999]"
          style={{ scaleX }}
        />
      )}

      {/* Navigation Header */}
      <Navbar />

      {/* Main Views Toggle */}
      {isAdminMode ? (
        <AdminPanel />
      ) : (
        <main>
          {/* Hero Section */}
          <Hero />

          {/* Brand Philosophy Segment (Sleek transitional section) */}
          <section id="philosophy" className="py-24 bg-[#0A0A0B] relative flex items-center">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Editorial Left Headline (5 cols) */}
              <div className="lg:col-span-5">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold" />
                  <span className="text-[10px] md:text-xs tracking-[0.4em] text-luxury-gold uppercase font-bold">
                    Accra Enclaves
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-5xl text-white font-light tracking-tight leading-tight">
                  Quiet Luxury, <br />
                  <span className="italic font-normal text-luxury-gold">Redefined.</span>
                </h2>
              </div>
              
              {/* Description Text (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <p className="text-sm text-gray-400 font-sans tracking-wide leading-relaxed font-light">
                  At COD REALTY, we do not simply sell properties. We represent residential milestones. Each home in our portfolio is selected for its architectural integrity, elite craftsmanship, and absolute discretion of location.
                </p>
                <p className="text-sm text-gray-400 font-sans tracking-wide leading-relaxed font-light">
                  From high-security private compounds in Cantonments to panoramic penthouses in the Airport Residential Area, our collection serves as an investment in legacy.
                </p>
                {/* Elegant signature of executive client director */}
                <div className="pt-4 flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-serif text-sm text-luxury-gold italic">
                    C
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-white font-bold block">COD Executive Registry</span>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 mt-0.5 block">Discreet Concierge Services</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Properties Grid */}
          <PropertiesGrid />

          {/* Trust & Authority Stats Banner */}
          <StatsBanner />

          {/* Interactive Contact Lead Capture */}
          <ContactForm />
        </main>
      )}

      {/* Luxury Footer (Hide on admin dashboard to save space) */}
      {!isAdminMode && <Footer />}

      {/* Floating Demo Console Access Button */}
      {!isAdminMode && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => window.dispatchEvent(new CustomEvent('open-admin-login'))}
          className="fixed bottom-8 left-6 md:left-12 z-[9999] glassmorphism px-5 py-3 rounded-full border border-luxury-gold/30 hover:border-luxury-gold shadow-2xl flex items-center space-x-2.5 text-[10px] tracking-[0.18em] uppercase font-bold text-luxury-gold cursor-pointer select-none pointer-events-auto shadow-luxury-gold/5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold animate-pulse shrink-0" />
          <span>⚡ Live Admin Console</span>
        </motion.button>
      )}

      {/* Global Real-time Notification Alert Stack */}
      <div className="fixed bottom-8 right-6 md:right-12 z-[999999] flex flex-col space-y-4 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95, transition: { duration: 0.3 } }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`p-5 glassmorphism rounded-sm border shadow-2xl flex items-start space-x-4 pointer-events-auto relative pr-8 ${getNotificationStyles(
                notif.type
              )}`}
            >
              {getNotificationIcon(notif.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-white mb-1">
                    {notif.title}
                  </h4>
                  {siteSettings.enableSounds && (
                    <span className="text-[8px] tracking-wide text-emerald-400 font-bold uppercase flex items-center space-x-0.5">
                      <span>Live Alert</span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400 font-sans tracking-wide leading-relaxed font-light mb-2 break-words">
                  {notif.message}
                </p>
                <div className="h-0.5 bg-white/5 w-full overflow-hidden rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4.8, ease: "linear" }}
                    className={`h-full ${
                      notif.type === "success" 
                        ? "bg-emerald-400" 
                        : notif.type === "warning" 
                          ? "bg-rose-500" 
                          : notif.type === "lead"
                            ? "bg-luxury-gold" 
                            : "bg-sky-400"
                    }`}
                  />
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => dismissNotification(notif.id)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors duration-200 cursor-pointer"
                aria-label="Close notification"
              >
                <X size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
