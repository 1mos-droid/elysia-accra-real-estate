import { useState } from "react";
import { 
  LayoutDashboard, Home, Mail, Settings, Plus, Trash2, Edit3, Save, 
  Volume2, VolumeX, Sparkles, AlertCircle, Eye, CheckCircle2, RefreshCw, X 
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function AdminPanel() {
  const {
    properties,
    stats,
    leads,
    siteSettings,
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
    resetToDefaults
  } = useAppContext();

  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard", "listings", "leads", "settings"

  // Listing Editor state
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formProp, setFormProp] = useState({
    title: "",
    location: "Cantonments, Accra",
    price: 1000000,
    type: "Villa",
    beds: 4,
    baths: 4,
    sqft: 4000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "",
    tag: "Exclusive",
    featured: false
  });

  // Simulated traffic state
  const [activeVisitors, setActiveVisitors] = useState(24);

  // Preset Unsplash Luxury Images for Admin Easy Pick
  const luxuryPresets = [
    { name: "Modern Glass Compound", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" },
    { name: "Gold Sunset Pool Villa", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" },
    { name: "Sleek Charcoal Concrete", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
    { name: "Rooftop Luxury Deck", url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80" },
    { name: "Sprawling Royal Mansion", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" }
  ];

  // Auto calculate total portfolio value
  const totalPortfolioValue = properties.reduce((sum, p) => sum + p.price, 0);

  // Simulator actions
  const simulateLead = () => {
    const firstNames = ["Moussa", "Elizabeth", "Amina", "Nii", "Robert", "Tariq"];
    const lastNames = ["Diop", "Hargreaves", "Mensah", "Adjei", "Goldman", "Sowah"];
    const interests = ["Villa", "Penthouse", "Duplex"];
    const budgets = ["$500K - $1.0M", "$1.0M - $2.5M", "$2.5M+"];
    const messages = [
      "Hello, I am looking to invest in high-end developments in Accra. Please send brochures on off-market listings.",
      "Seeking a secure dual-kitchen compound for an embassy residence. Cantonments or Ridge preferred.",
      "I wish to schedule a private video consultation this Thursday to view your signature collections.",
      "Please let me know if there are high-floor apartments with helipads or private docks."
    ];

    const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    const randomEmail = `${randomName.toLowerCase().replace(/\s+/g, '')}@luxuryregistry.co.za`;
    const randomInterest = interests[Math.floor(Math.random() * interests.length)];
    const randomBudget = budgets[Math.floor(Math.random() * budgets.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    submitLead({
      name: randomName,
      email: randomEmail,
      interest: randomInterest,
      budget: randomBudget,
      message: randomMessage
    });
  };

  const simulateTrafficSpike = () => {
    const spike = Math.floor(Math.random() * 200) + 120;
    setActiveVisitors(spike);
    triggerNotification("Analytics Spike", `Real-time web visitors surged to ${spike} active sessions.`, "success");
    setTimeout(() => {
      setActiveVisitors(prev => Math.max(20, Math.floor(prev * 0.7)));
    }, 8000);
  };

  const simulatePropertyWatch = () => {
    if (properties.length === 0) return;
    const randomProp = properties[Math.floor(Math.random() * properties.length)];
    triggerNotification(
      "Live Hot Property Alert", 
      `5 users are currently viewing "${randomProp.title}" in Cantonments.`, 
      "info"
    );
  };

  // Listings Form Handlers
  const handleAddSubmit = (e) => {
    e.preventDefault();
    addProperty(formProp);
    setShowAddForm(false);
    // Reset fields
    setFormProp({
      title: "",
      location: "Cantonments, Accra",
      price: 1200000,
      type: "Villa",
      beds: 4,
      baths: 4,
      sqft: 4000,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      description: "",
      tag: "Exclusive",
      featured: false
    });
  };

  const handleEditInit = (property) => {
    setEditingId(property.id);
    setFormProp({ ...property });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateProperty(editingId, formProp);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-[#070708] text-gray-100 flex flex-col font-sans pt-[72px]">
      
      {/* Top Admin Status Bar */}
      <div className="bg-[#0A0A0B] border-b border-white/5 py-4 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Real-time Admin Console</span>
          <span className="text-[10px] text-gray-500">| Secure Decrypted Pipeline</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsAdminMode(false)}
            className="px-5 py-2 bg-luxury-gold text-luxury-dark text-[10px] tracking-widest uppercase font-bold rounded-sm hover:bg-luxury-gold-light transition-all duration-300 cursor-pointer"
          >
            Preview Public Site
          </button>
        </div>
      </div>

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Dynamic Sidebar Tabs (3 cols) */}
        <div className="lg:col-span-3 bg-luxury-card border border-white/5 rounded-xs p-6 space-y-6">
          <div className="text-left pb-4 border-b border-white/5">
            <h2 className="font-serif text-xl text-white font-light tracking-wide">ELYSIA Control</h2>
            <span className="text-[9px] uppercase tracking-widest text-gray-500 mt-1 block">Accra Core Registry</span>
          </div>

          <div className="flex flex-col space-y-2">
            {[
              { id: "dashboard", label: "Dashboard Hub", icon: <LayoutDashboard size={16} /> },
              { id: "listings", label: "Registry Listings", icon: <Home size={16} /> },
              { id: "leads", label: "Lead Inquiries", icon: <Mail size={16} />, badge: leads.filter(l => l.status === "new").length },
              { id: "settings", label: "Site Settings", icon: <Settings size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditingId(null);
                  setShowAddForm(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/25"
                    : "text-gray-400 hover:text-white bg-transparent border border-transparent"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {tab.badge > 0 && (
                  <span className="bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Registry Reset */}
          <div className="pt-8 border-t border-white/5 text-center">
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to restore Elysia to standard default listings? This clears all edits!")) {
                  resetToDefaults();
                }
              }}
              className="text-[9px] tracking-wider uppercase text-gray-500 hover:text-rose-400 transition-colors duration-300 flex items-center justify-center space-x-1.5 mx-auto cursor-pointer"
            >
              <RefreshCw size={11} />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </div>

        {/* Right Side: Tab Workspaces (9 cols) */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              
              {/* Stat Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Total Portfolio value */}
                <div className="bg-luxury-card border border-white/5 p-6 rounded-xs relative overflow-hidden gold-glow">
                  <div className="flex items-center justify-between text-gray-500 mb-4">
                    <span className="text-[10px] tracking-widest uppercase font-bold">Managed Value</span>
                    <Sparkles className="text-luxury-gold" size={16} />
                  </div>
                  <h3 className="font-serif text-3xl text-white font-light tracking-tight text-glow">
                    ${(totalPortfolioValue / 1000000).toFixed(2)}M
                  </h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">
                    Across {properties.length} active listings
                  </p>
                </div>

                {/* Live Visitors Pulsing widget */}
                <div className="bg-luxury-card border border-white/5 p-6 rounded-xs relative overflow-hidden">
                  <div className="flex items-center justify-between text-gray-500 mb-4">
                    <span className="text-[10px] tracking-widest uppercase font-bold">Live Traffic</span>
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <h3 className="font-serif text-3xl text-white font-light tracking-tight text-glow">
                    {activeVisitors} <span className="text-xs text-gray-500 uppercase font-sans tracking-wide">Active</span>
                  </h3>
                  <p className="text-[10px] text-emerald-400/80 uppercase tracking-widest mt-2 flex items-center space-x-1">
                    <span>● Pulse sessions encrypted</span>
                  </p>
                </div>

                {/* Unreviewed Consultation Requests */}
                <div className="bg-luxury-card border border-white/5 p-6 rounded-xs relative overflow-hidden">
                  <div className="flex items-center justify-between text-gray-500 mb-4">
                    <span className="text-[10px] tracking-widest uppercase font-bold">New Inquiries</span>
                    <Mail className="text-luxury-gold" size={16} />
                  </div>
                  <h3 className="font-serif text-3xl text-white font-light tracking-tight text-glow">
                    {leads.filter(l => l.status === "new").length} <span className="text-xs text-gray-500 uppercase font-sans tracking-wide">Leads</span>
                  </h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">
                    Requires immediate callout
                  </p>
                </div>

              </div>

              {/* Real-time Interactive Simulator console */}
              <div className="bg-luxury-card border border-white/5 p-8 rounded-sm">
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold" />
                    <span className="text-[9px] tracking-widest uppercase text-luxury-gold font-bold">Simulation Deck</span>
                  </div>
                  <h3 className="font-serif text-2xl text-white font-light">Real-time Website Simulator</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Click any console node below to simulate real-time live events. Switch to "Public Site" preview afterward to see and test the alerts!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Lead simulator node */}
                  <button
                    onClick={simulateLead}
                    className="p-5 bg-[#0A0A0B] border border-white/5 hover:border-luxury-gold/40 rounded-xs text-left group transition-all duration-300 cursor-pointer gold-glow-hover"
                  >
                    <div className="h-10 w-10 rounded-full bg-[#121214] border border-white/10 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-luxury-dark transition-colors duration-300 mb-4">
                      <Mail size={16} />
                    </div>
                    <h4 className="text-xs tracking-widest uppercase font-bold text-white mb-2">Simulate Inquiry</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                      Fires a simulated premium consultation request. Logs lead into registry and triggers chimes.
                    </p>
                  </button>

                  {/* analytics trigger node */}
                  <button
                    onClick={simulateTrafficSpike}
                    className="p-5 bg-[#0A0A0B] border border-white/5 hover:border-luxury-gold/40 rounded-xs text-left group transition-all duration-300 cursor-pointer gold-glow-hover"
                  >
                    <div className="h-10 w-10 rounded-full bg-[#121214] border border-white/10 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-luxury-dark transition-colors duration-300 mb-4">
                      <RefreshCw size={16} />
                    </div>
                    <h4 className="text-xs tracking-widest uppercase font-bold text-white mb-2">Spike Web Traffic</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                      Simulates a sudden wave of high-net-worth investors opening the portal in Cantonments.
                    </p>
                  </button>

                  {/* alarm trigger node */}
                  <button
                    onClick={simulatePropertyWatch}
                    className="p-5 bg-[#0A0A0B] border border-white/5 hover:border-luxury-gold/40 rounded-xs text-left group transition-all duration-300 cursor-pointer gold-glow-hover"
                  >
                    <div className="h-10 w-10 rounded-full bg-[#121214] border border-white/10 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-luxury-dark transition-colors duration-300 mb-4">
                      <Eye size={16} />
                    </div>
                    <h4 className="text-xs tracking-widest uppercase font-bold text-white mb-2">Property Watch</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                      Triggers a real-time hot notification on the public view indicating multiple active viewers.
                    </p>
                  </button>

                </div>
              </div>

            </div>
          )}

          {/* TAB 2: REGISTRY LISTINGS */}
          {activeTab === "listings" && (
            <div className="space-y-8">
              
              {/* Header Action */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="font-serif text-2xl text-white font-light">Signature Listings</h3>
                  <p className="text-xs text-gray-400 mt-1">Add, update, or de-register luxury masterpieces in the portfolio.</p>
                </div>
                {!showAddForm && !editingId && (
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setShowAddForm(true);
                    }}
                    className="px-4 py-2 bg-luxury-gold text-luxury-dark text-[10px] tracking-widest uppercase font-bold rounded-sm hover:bg-luxury-gold-light transition-all duration-300 flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Plus size={12} />
                    <span>Add Masterpiece</span>
                  </button>
                )}
              </div>

              {/* Add or Edit Form Panel */}
              {(showAddForm || editingId) && (
                <div className="bg-luxury-card border border-luxury-gold/30 p-8 rounded-sm gold-glow">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-serif text-xl text-white font-light flex items-center space-x-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold" />
                      <span>{editingId ? `Modify: ${formProp.title}` : "Register New Masterpiece"}</span>
                    </h4>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingId(null);
                      }}
                      className="text-gray-500 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <form onSubmit={editingId ? handleEditSubmit : handleAddSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Title */}
                      <div>
                        <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Property Title</label>
                        <input
                          type="text"
                          required
                          value={formProp.title}
                          onChange={(e) => setFormProp({ ...formProp, title: e.target.value })}
                          className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold/50"
                          placeholder="e.g. The Obsidian Villa"
                        />
                      </div>

                      {/* Location */}
                      <div>
                        <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Location Enclave</label>
                        <input
                          type="text"
                          required
                          value={formProp.location}
                          onChange={(e) => setFormProp({ ...formProp, location: e.target.value })}
                          className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold/50"
                          placeholder="e.g. Cantonments, Accra"
                        />
                      </div>

                      {/* Price & Type */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Price (USD)</label>
                          <input
                            type="number"
                            required
                            value={formProp.price}
                            onChange={(e) => setFormProp({ ...formProp, price: parseInt(e.target.value) || 0 })}
                            className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold/50"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Structure Type</label>
                          <select
                            value={formProp.type}
                            onChange={(e) => setFormProp({ ...formProp, type: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                          >
                            <option value="Villa">Villa</option>
                            <option value="Penthouse">Penthouse</option>
                            <option value="Duplex">Duplex</option>
                          </select>
                        </div>
                      </div>

                      {/* Beds / Baths / Sqft */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Beds</label>
                          <input
                            type="number"
                            required
                            value={formProp.beds}
                            onChange={(e) => setFormProp({ ...formProp, beds: parseInt(e.target.value) || 0 })}
                            className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Baths</label>
                          <input
                            type="number"
                            required
                            value={formProp.baths}
                            onChange={(e) => setFormProp({ ...formProp, baths: parseFloat(e.target.value) || 0 })}
                            className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">SqFt Area</label>
                          <input
                            type="number"
                            required
                            value={formProp.sqft}
                            onChange={(e) => setFormProp({ ...formProp, sqft: parseInt(e.target.value) || 0 })}
                            className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                          />
                        </div>
                      </div>

                      {/* Tag selector & Featured */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Status Tag</label>
                          <input
                            type="text"
                            value={formProp.tag || ""}
                            onChange={(e) => setFormProp({ ...formProp, tag: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold/50"
                            placeholder="e.g. Exclusive, Selling Fast"
                          />
                        </div>
                        <div className="flex flex-col justify-end pb-3">
                          <label className="flex items-center space-x-3 text-xs text-gray-400 font-semibold cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formProp.featured}
                              onChange={(e) => setFormProp({ ...formProp, featured: e.target.checked })}
                              className="accent-luxury-gold h-4 w-4 bg-[#0A0A0B] border-white/10 rounded"
                            />
                            <span>Featured Showcase Listing</span>
                          </label>
                        </div>
                      </div>

                      {/* Image selector presets */}
                      <div className="md:col-span-2">
                        <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Preset Luxury Images</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {luxuryPresets.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setFormProp({ ...formProp, image: preset.url })}
                              className={`px-3 py-1.5 rounded-sm text-[10px] tracking-wide font-sans border transition-all duration-300 cursor-pointer ${
                                formProp.image === preset.url
                                  ? "bg-luxury-gold/20 text-luxury-gold border-luxury-gold"
                                  : "bg-[#0A0A0B] text-gray-500 border-white/5 hover:text-white"
                              }`}
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          required
                          value={formProp.image}
                          onChange={(e) => setFormProp({ ...formProp, image: e.target.value })}
                          className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold/50"
                          placeholder="Image URL"
                        />
                      </div>

                      {/* Description */}
                      <div className="md:col-span-2">
                        <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Explanatory Description</label>
                        <textarea
                          rows={3}
                          required
                          value={formProp.description}
                          onChange={(e) => setFormProp({ ...formProp, description: e.target.value })}
                          className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold/50 resize-none"
                          placeholder="Provide highly evocative marketing copy detailing security, private pools, smart automation etc."
                        />
                      </div>

                    </div>

                    {/* Submit */}
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddForm(false);
                          setEditingId(null);
                        }}
                        className="px-6 py-3 bg-transparent border border-white/10 text-white text-xs tracking-widest uppercase font-bold rounded-sm hover:bg-white/5 transition-all duration-300 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-3 bg-luxury-gold text-luxury-dark text-xs tracking-widest uppercase font-bold rounded-sm hover:bg-luxury-gold-light transition-all duration-300 flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Save size={14} />
                        <span>{editingId ? "Save Changes" : "Register Masterpiece"}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Properties Grid Table */}
              <div className="bg-luxury-card border border-white/5 rounded-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-[9px] tracking-[0.2em] uppercase text-gray-500 font-bold bg-[#0A0A0B]/60">
                        <th className="py-4 px-6">Masterpiece Details</th>
                        <th className="py-4 px-4">Enclave</th>
                        <th className="py-4 px-4">Beds/Baths</th>
                        <th className="py-4 px-4">Investment Value</th>
                        <th className="py-4 px-4">Badges</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs">
                      {properties.map((property) => (
                        <tr key={property.id} className="hover:bg-[#121214]/40 transition-colors duration-200">
                          
                          {/* Image & Title */}
                          <td className="py-4 px-6 flex items-center space-x-4">
                            <div className="h-12 w-16 bg-[#0A0A0B] rounded-sm overflow-hidden border border-white/10 shrink-0">
                              <img src={property.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h4 className="font-serif text-sm font-semibold text-white">{property.title}</h4>
                              <span className="text-[9px] tracking-wider uppercase text-gray-500 mt-0.5 block">{property.type}</span>
                            </div>
                          </td>

                          {/* Enclave */}
                          <td className="py-4 px-4 text-gray-300 font-medium">
                            {property.location}
                          </td>

                          {/* Beds/Baths */}
                          <td className="py-4 px-4 text-gray-400 font-sans">
                            {property.beds} Bed / {property.baths} Bath
                          </td>

                          {/* Price */}
                          <td className="py-4 px-4 text-white font-bold font-sans">
                            ${property.price.toLocaleString()}
                          </td>

                          {/* Badges */}
                          <td className="py-4 px-4">
                            <div className="flex flex-wrap gap-1.5">
                              {property.featured && (
                                <span className="bg-luxury-gold text-luxury-dark text-[8px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-xs">
                                  Featured
                                </span>
                              )}
                              {property.tag && (
                                <span className="bg-white/5 border border-white/10 text-luxury-gold text-[8px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-xs">
                                  {property.tag}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-6 text-right space-x-3">
                            <button
                              onClick={() => handleEditInit(property)}
                              className="text-gray-400 hover:text-luxury-gold transition-colors duration-300 cursor-pointer"
                              title="Edit Listing"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`De-register "${property.title}" from active portfolios?`)) {
                                  deleteProperty(property.id);
                                }
                              }}
                              className="text-gray-500 hover:text-rose-400 transition-colors duration-300 cursor-pointer"
                              title="Delete Listing"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: LEAD INQUIRIES */}
          {activeTab === "leads" && (
            <div className="space-y-8">
              
              <div>
                <h3 className="font-serif text-2xl text-white font-light">Consultation Ledger</h3>
                <p className="text-xs text-gray-400 mt-1">Review live inquiry logs, investor profiles, and budgets submitted securely.</p>
              </div>

              {leads.length === 0 ? (
                <div className="bg-luxury-card border border-white/5 rounded-xs p-12 text-center text-gray-500">
                  <Mail className="mx-auto mb-4 text-gray-600" size={32} />
                  <p className="text-xs uppercase tracking-widest">No active lead submissions detected</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {leads.map((lead) => (
                    <div 
                      key={lead.id} 
                      className={`bg-luxury-card border rounded-xs p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all duration-300 ${
                        lead.status === "new" 
                          ? "border-luxury-gold/30 gold-glow relative" 
                          : "border-white/5 opacity-70"
                      }`}
                    >
                      {/* Left Block: Lead profile */}
                      <div className="space-y-3 max-w-xl">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-serif text-lg text-white font-light">{lead.name}</h4>
                          <span className="bg-[#0A0A0B] border border-white/10 px-2.5 py-0.5 text-[8px] font-bold tracking-widest text-luxury-gold uppercase rounded-xs">
                            {lead.interest}
                          </span>
                          <span className="bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20 px-2.5 py-0.5 text-[8px] font-bold tracking-widest uppercase rounded-xs">
                            {lead.budget}
                          </span>
                          {lead.status === "new" && (
                            <span className="bg-rose-500 text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-full animate-pulse">
                              Active inquiry
                            </span>
                          )}
                        </div>
                        
                        <p className="text-xs text-gray-400 font-sans">
                          Private Email: <strong className="text-gray-200">{lead.email}</strong>
                        </p>

                        <p className="text-xs italic text-gray-300 font-sans tracking-wide leading-relaxed bg-[#0A0A0B]/40 p-4 rounded-xs border border-white/5">
                          "{lead.message || "No custom specifications submitted."}"
                        </p>

                        <span className="text-[9px] uppercase tracking-wider text-gray-500 block">
                          Submitted: {new Date(lead.date).toLocaleString()}
                        </span>
                      </div>

                      {/* Right Block: Actions */}
                      <div className="flex md:flex-col items-stretch gap-2 shrink-0 w-full md:w-auto">
                        <button
                          onClick={() => markLeadContacted(lead.id)}
                          className={`px-4 py-2.5 rounded-sm text-[10px] tracking-widest uppercase font-bold flex items-center justify-center space-x-1.5 cursor-pointer transition-all duration-300 ${
                            lead.status === "new"
                              ? "bg-emerald-500 text-[#0A0A0B] hover:bg-emerald-400"
                              : "bg-transparent border border-white/15 text-gray-400 hover:text-white"
                          }`}
                        >
                          <CheckCircle2 size={13} />
                          <span>{lead.status === "new" ? "Mark Contacted" : "Mark Pending"}</span>
                        </button>

                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="px-4 py-2.5 bg-[#0A0A0B] border border-white/5 hover:border-rose-500/30 text-gray-500 hover:text-rose-400 rounded-sm text-[10px] tracking-widest uppercase font-bold flex items-center justify-center space-x-1.5 cursor-pointer transition-colors duration-300"
                        >
                          <Trash2 size={13} />
                          <span>Wipe Records</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 4: SITE SETTINGS */}
          {activeTab === "settings" && (
            <div className="bg-luxury-card border border-white/5 p-8 rounded-sm space-y-8">
              
              <div>
                <h3 className="font-serif text-2xl text-white font-light">Site Registry Settings</h3>
                <p className="text-xs text-gray-400 mt-1">Directly overwrite Hero captions, branding descriptors, scrolling announcements, and system alerts in real-time.</p>
              </div>

              <div className="space-y-6">
                
                {/* Hero section customization */}
                <div className="border-t border-white/5 pt-6">
                  <h4 className="text-[10px] tracking-widest uppercase text-luxury-gold font-bold mb-4">Hero Typography Segment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Headline First Line</label>
                      <input
                        type="text"
                        value={siteSettings.heroTitle}
                        onChange={(e) => updateSiteSettings({ heroTitle: e.target.value }, true)}
                        className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Headline Highlight Italic</label>
                      <input
                        type="text"
                        value={siteSettings.heroTitleItalic}
                        onChange={(e) => updateSiteSettings({ heroTitleItalic: e.target.value }, true)}
                        className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Branding Paragraph Caption</label>
                      <textarea
                        rows={3}
                        value={siteSettings.heroDescription}
                        onChange={(e) => updateSiteSettings({ heroDescription: e.target.value }, true)}
                        className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-luxury-gold/50 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Announcement Bar Scroll Settings */}
                <div className="border-t border-white/5 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[10px] tracking-widest uppercase text-luxury-gold font-bold">Scrolling Announcement Bar</h4>
                    <label className="flex items-center space-x-3 text-xs text-gray-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={siteSettings.showAnnouncement}
                        onChange={(e) => updateSiteSettings({ showAnnouncement: e.target.checked })}
                        className="accent-luxury-gold h-4 w-4 bg-[#0A0A0B] border-white/10 rounded"
                      />
                      <span className="text-[9px] tracking-widest uppercase font-bold text-gray-500">Show Announcement</span>
                    </label>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Banner Scroll Message</label>
                    <input
                      type="text"
                      value={siteSettings.announcementBanner}
                      disabled={!siteSettings.showAnnouncement}
                      onChange={(e) => updateSiteSettings({ announcementBanner: e.target.value }, true)}
                      className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-luxury-gold/50 disabled:opacity-40"
                    />
                  </div>
                </div>

                {/* Contact details hotline */}
                <div className="border-t border-white/5 pt-6">
                  <h4 className="text-[10px] tracking-widest uppercase text-luxury-gold font-bold mb-4">Registry Contact Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Hotline Phone</label>
                      <input
                        type="text"
                        value={siteSettings.phone}
                        onChange={(e) => updateSiteSettings({ phone: e.target.value }, true)}
                        className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Office Email Address</label>
                      <input
                        type="email"
                        value={siteSettings.email}
                        onChange={(e) => updateSiteSettings({ email: e.target.value }, true)}
                        className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Bespoke Lounge Address</label>
                      <input
                        type="text"
                        value={siteSettings.address}
                        onChange={(e) => updateSiteSettings({ address: e.target.value }, true)}
                        className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                      />
                    </div>
                  </div>
                </div>

                {/* System Toggles */}
                <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                  <div>
                    <h4 className="text-[10px] tracking-widest uppercase text-luxury-gold font-bold">Audio System</h4>
                    <p className="text-[10px] text-gray-500 mt-1">Play premium chords upon live submissions and simulators.</p>
                  </div>
                  <button
                    onClick={() => updateSiteSettings({ enableSounds: !siteSettings.enableSounds })}
                    className={`p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer ${
                      siteSettings.enableSounds
                        ? "bg-luxury-gold/10 text-luxury-gold border-luxury-gold/30 hover:bg-luxury-gold/20"
                        : "bg-[#0A0A0B] text-gray-600 border-white/5 hover:text-white"
                    }`}
                  >
                    {siteSettings.enableSounds ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
