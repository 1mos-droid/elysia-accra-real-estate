import React, { createContext, useContext, useState, useEffect } from "react";
import { properties as defaultProperties, stats as defaultStats, testimonials as defaultTestimonials } from "../data/properties";

const AppContext = createContext();

const initialSiteSettings = {
  phone: "+233 24 000 0000",
  email: "concierge@elysia.com",
  address: "Villaggio Vista, North Airport Road, Airport Residential Area, Accra, Ghana",
  heroTitle: "Discover Your Next",
  heroTitleItalic: "Masterpiece",
  heroDescription: "An elite collection of private villas, architectural landmarks, and breathtaking sky-penthouses in Cantonments, East Legon, and Airport Residential.",
  announcementBanner: "ELYSIA Private Registry: Exclusive off-market residences available in Cantonments. Enquire privately.",
  showAnnouncement: true,
  enableSounds: true
};

const defaultLeads = [
  {
    id: "lead-1",
    name: "Dr. Adrian Boateng",
    email: "a.boateng@hargreaves-group.com",
    interest: "Villa",
    budget: "$2.5M+",
    message: "Seeking a fully detached smart villa in Cantonments with high perimeter security, absolute privacy, and an Olympic-size swimming pool.",
    date: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    status: "new" // "new", "contacted"
  },
  {
    id: "lead-2",
    name: "Sonia Mensah",
    email: "sonia@mensahcorp.co.uk",
    interest: "Penthouse",
    budget: "$1.0M - $2.5M",
    message: "Interested in the Aura Heights Penthouse. I require private elevator access and a high floor with unobstructed views of the city skyline.",
    date: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    status: "contacted"
  }
];

export const AppProvider = ({ children }) => {
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem("elysia_properties");
    return saved ? JSON.parse(saved) : defaultProperties;
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("elysia_stats");
    return saved ? JSON.parse(saved) : defaultStats;
  });

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem("elysia_testimonials");
    return saved ? JSON.parse(saved) : defaultTestimonials;
  });

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem("elysia_leads");
    return saved ? JSON.parse(saved) : defaultLeads;
  });

  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem("elysia_settings");
    return saved ? JSON.parse(saved) : initialSiteSettings;
  });

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("elysia_properties", JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem("elysia_stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem("elysia_testimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem("elysia_leads", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem("elysia_settings", JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Audio trigger helper
  const playAlertSound = () => {
    if (!siteSettings.enableSounds) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      // Luxury double-chime note
      const playNote = (freq, startTime, duration) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = audioCtx.currentTime;
      // Premium warm gold chord tones (E5 followed by G#5/B5)
      playNote(659.25, now, 0.4); // E5
      playNote(830.61, now + 0.15, 0.5); // G#5
      playNote(987.77, now + 0.20, 0.6); // B5
    } catch (e) {
      console.warn("Audio Context play failed: ", e);
    }
  };

  // Push realtime notifications to public screen
  const triggerNotification = (title, message, type = "info") => {
    const id = Date.now().toString();
    const newNotif = { id, title, message, type };
    setNotifications((prev) => [newNotif, ...prev].slice(0, 5));
    playAlertSound();
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };


  // CRUD Actions
  const addProperty = (property) => {
    const newProperty = {
      ...property,
      id: Date.now(),
      priceGHS: property.price * 14.5 // Quick calculation for Accra market
    };
    setProperties((prev) => [newProperty, ...prev]);
    triggerNotification("Portfolio Update", `Added masterpiece: "${property.title}" in ${property.location}.`, "success");
  };

  const updateProperty = (id, updatedFields) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updatedFields,
              priceGHS: updatedFields.price ? updatedFields.price * 14.5 : p.priceGHS
            }
          : p
      )
    );
    const item = properties.find((p) => p.id === id);
    triggerNotification("Portfolio Update", `Updated listing details for "${updatedFields.title || item.title}".`, "info");
  };

  const deleteProperty = (id) => {
    const item = properties.find((p) => p.id === id);
    setProperties((prev) => prev.filter((p) => p.id !== id));
    triggerNotification("Portfolio Update", `De-registered listing: "${item ? item.title : id}" from active registry.`, "warning");
  };

  const updateStat = (idx, updatedStat) => {
    setStats((prev) => {
      const newStats = [...prev];
      newStats[idx] = { ...newStats[idx], ...updatedStat };
      return newStats;
    });
    triggerNotification("Authority Stats Edited", `Updated ${updatedStat.label || "stat card"}.`, "info");
  };

  const submitLead = (leadData) => {
    const newLead = {
      ...leadData,
      id: "lead-" + Date.now(),
      date: new Date().toISOString(),
      status: "new"
    };
    setLeads((prev) => [newLead, ...prev]);
    triggerNotification("New Lead Submission", `Consultation request received from ${leadData.name}.`, "lead");
  };

  const markLeadContacted = (id) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: l.status === "new" ? "contacted" : "new" } : l))
    );
    const item = leads.find((l) => l.id === id);
    triggerNotification("Registry Updated", `Lead "${item.name}" marked as contacted.`, "info");
  };

  const deleteLead = (id) => {
    const item = leads.find((l) => l.id === id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
    triggerNotification("Registry Cleaned", `Removed lead "${item ? item.name : id}" from registry records.`, "warning");
  };

  const updateSiteSettings = (newSettings, quiet = false) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
    if (!quiet) {
      triggerNotification("Branding Modified", "Global site settings updated successfully in real-time.", "success");
    }
  };

  const resetToDefaults = () => {
    localStorage.removeItem("elysia_properties");
    localStorage.removeItem("elysia_stats");
    localStorage.removeItem("elysia_testimonials");
    localStorage.removeItem("elysia_leads");
    localStorage.removeItem("elysia_settings");
    
    setProperties(defaultProperties);
    setStats(defaultStats);
    setTestimonials(defaultTestimonials);
    setLeads(defaultLeads);
    setSiteSettings(initialSiteSettings);
    
    triggerNotification("System Restored", "ELYSIA registry database has been reset to default Cantonments portfolios.", "info");
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        stats,
        testimonials,
        leads,
        siteSettings,
        isAdminMode,
        notifications,
        setIsAdminMode,
        addProperty,
        updateProperty,
        deleteProperty,
        updateStat,
        submitLead,
        markLeadContacted,
        deleteLead,
        updateSiteSettings,
        triggerNotification,
        dismissNotification,
        playAlertSound,
        resetToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
