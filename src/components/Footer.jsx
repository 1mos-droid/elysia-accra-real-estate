import { Send } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function Footer() {
  const { siteSettings } = useAppContext();

  return (
    <footer className="bg-[#0A0A0B] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/5 mb-12">
          
          {/* Col 1: Brand & Quote (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#" className="flex flex-col items-start">
              <span className="font-serif text-2xl tracking-[0.25em] text-white">
                COD REALTY
              </span>
              <span className="text-[9px] tracking-[0.4em] text-luxury-gold uppercase font-light">
                & Properties
              </span>
            </a>
            <p className="text-xs text-gray-400 font-sans tracking-wide leading-relaxed font-light max-w-sm">
              "Architecture is the learned game, correct and magnificent, of forms assembled in the light." COD REALTY curate spaces that transcend shelter, defining the zenith of architectural masterworks in West Africa.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-2">
              {[
                { 
                  icon: (
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ), 
                  link: "https://instagram.com" 
                },
                { 
                  icon: (
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  ), 
                  link: "https://linkedin.com" 
                },
                { 
                  icon: (
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ), 
                  link: "https://facebook.com" 
                }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:border-luxury-gold/50 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Accra Enclaves (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[10px] uppercase tracking-widest text-white font-bold">Accra Enclaves</h4>
            <ul className="space-y-3">
              {["Cantonments", "East Legon", "Airport Residential", "Labone", "Roman Ridge"].map((neighborhood, idx) => (
                <li key={idx}>
                  <a
                    href="#listings"
                    className="text-xs text-gray-400 hover:text-luxury-gold transition-colors duration-300 font-sans font-light tracking-wider"
                  >
                    {neighborhood}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-[10px] uppercase tracking-widest text-white font-bold">Philosophy</h4>
            <ul className="space-y-3">
              {["Our Team", "Signature Design", "Off-Market Portal", "Career", "Press Room"].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-xs text-gray-400 hover:text-luxury-gold transition-colors duration-300 font-sans font-light tracking-wider"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Private Bulletin newsletter (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-[10px] uppercase tracking-widest text-white font-bold">The Registry</h4>
            <p className="text-[11px] text-gray-400 font-sans tracking-wide leading-relaxed font-light">
              Receive confidential updates regarding off-market properties and development blueprints.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center mt-2">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-[#121214] border border-white/5 py-2.5 pl-3.5 pr-10 rounded-xs text-[11px] text-white focus:outline-none focus:border-luxury-gold/50"
              />
              <button
                type="submit"
                className="absolute right-2 text-gray-400 hover:text-luxury-gold transition-colors duration-300"
                aria-label="Subscribe"
              >
                <Send size={12} />
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom Block */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-widest uppercase text-gray-500 font-light space-y-4 sm:space-y-0 pt-6">
          <p>© {new Date().getFullYear()} COD REALTY & PROPERTIES. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-luxury-gold transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-luxury-gold transition-colors duration-300">Terms of Registry</a>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-admin-login'))} 
              className="hover:text-luxury-gold transition-colors duration-300 uppercase tracking-widest text-[10px] bg-transparent border-none cursor-pointer focus:outline-none"
            >
              Registry Console
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
