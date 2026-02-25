
import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, Sparkles, Hexagon, Wallet, User } from 'lucide-react';
import { cn } from '../lib/utils';
// import { Link, useLocation } from 'react-router-dom'; // Removing router link

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  // const location = useLocation(); // Removing location hook

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check wallet persistence
    const savedWallet = localStorage.getItem('walletConnected');
    if (savedWallet === 'true') {
      setIsWalletConnected(true);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWalletConnect = () => {
    // Simulation
    if (isWalletConnected) {
      setIsWalletConnected(false);
      localStorage.removeItem('walletConnected');
    } else {
      setIsWalletConnected(true);
      localStorage.setItem('walletConnected', 'true');
    }
  };

  const menuItems = [
    { name: 'KOKPİT', id: 'cockpit' },
    { name: 'KOLEKSİYON', id: 'collection' },
    { name: 'FÜZYON LAB', id: 'fusion' },
    { name: 'TOKENOMİK', id: 'token' },
    { name: 'YOL HARİTASI', id: 'roadmap' }
  ];

  // Custom Navigation Handler to handle fixed header offset and smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; // Height of the fixed header + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else {
        // Fallback for top if id is missing or for cockpit
        if(id === 'cockpit') window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white selection:bg-purple-500 selection:text-white flex flex-col">
      {/* Navigation */}
      <nav 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/0",
          isScrolled ? "bg-[#030014]/90 backdrop-blur-md border-white/10 h-20" : "h-24 bg-gradient-to-b from-black/80 to-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-black border border-purple-500/50 rounded-lg flex items-center justify-center hud-corner">
                <Hexagon className="w-6 h-6 text-purple-400 group-hover:rotate-180 transition-transform duration-700" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-orbitron font-bold text-2xl tracking-wider text-white">Fİ<span className="text-purple-500">VERSE</span></span>
              <span className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">Technoid Collective</span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <a 
                key={item.name} 
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={cn(
                  "px-4 py-2 text-sm font-bold tracking-widest transition-all duration-300 relative group overflow-hidden font-orbitron text-gray-400 hover:text-white"
                )}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
             <button 
                onClick={handleWalletConnect}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-sm font-bold font-orbitron tracking-widest text-xs border transition-all duration-300 hud-border",
                  isWalletConnected 
                    ? "bg-purple-900/20 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
                    : "bg-black/50 border-white/20 text-white hover:bg-purple-900/20 hover:border-purple-500"
                )}
             >
                {isWalletConnected ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    0x7F...3A21
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4" />
                    CÜZDAN BAĞLA
                  </>
                )}
             </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5 h-screen z-50">
            {menuItems.map((item) => (
              <a 
                key={item.name} 
                href={`#${item.id}`}
                className="text-xl font-bold font-orbitron text-gray-300 hover:text-purple-400 tracking-widest border-b border-white/5 pb-2"
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.name}
              </a>
            ))}
            <button 
              onClick={handleWalletConnect}
              className="w-full py-4 bg-purple-600 text-white font-bold font-orbitron tracking-widest mt-4 hud-border"
            >
              {isWalletConnected ? 'BAĞLANDI: 0x7F...3A21' : 'WEB3 BAĞLANTISI KUR'}
            </button>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 relative overflow-hidden mt-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-orbitron text-2xl font-bold mb-4 flex items-center gap-2">
              Fİ<span className="text-purple-500">VERSE</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md font-mono">
              [SİSTEM DURUMU: ÇEVRİMİÇİ]<br/>
              Altın Oran (Φ) protokolü devrede. Yeni nesil NFT ekosistemi operasyonel.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-widest text-xs font-orbitron">Navigasyon</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-mono">
              <li><a href="#collection" onClick={(e) => handleNavClick(e, 'collection')} className="hover:text-purple-400 transition-colors">Koleksiyon</a></li>
              <li><a href="#fusion" onClick={(e) => handleNavClick(e, 'fusion')} className="hover:text-purple-400 transition-colors">Füzyon Lab</a></li>
              <li><a href="#token" onClick={(e) => handleNavClick(e, 'token')} className="hover:text-purple-400 transition-colors">Tokenomik</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-widest text-xs font-orbitron">Veri Akışı</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-mono">
              <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2">Discord <Sparkles className="w-3 h-3" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Twitter X</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Whitepaper v1.0</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-[10px] text-gray-600 font-mono tracking-widest">
          © 2025 Fİ EVRENİ. TÜM HAKLARI SAKLIDIR. PHI PROTOCOL v1.0
        </div>
      </footer>
    </div>
  );
};
