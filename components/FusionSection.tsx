
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom, Plus, ArrowRight, Hexagon, Zap, Wallet, Lock, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { planets } from '../services/mockData';
import { Planet } from '../types';

// Fix for framer-motion type mismatch
const MotionDiv = motion.div as any;

export const FusionSection: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<1 | 2 | null>(null);
  const [slot1, setSlot1] = useState<Planet | null>(null);
  const [slot2, setSlot2] = useState<Planet | null>(null);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Check wallet connection on mount
  React.useEffect(() => {
    const checkWallet = () => {
      const saved = localStorage.getItem('walletConnected');
      setIsConnected(saved === 'true');
    };
    checkWallet();
    // Listen for storage changes if wallet is connected in another tab/component
    window.addEventListener('storage', checkWallet);
    return () => window.removeEventListener('storage', checkWallet);
  }, [isInventoryOpen]); // Re-check when inventory opens

  const handleSlotClick = (slot: 1 | 2) => {
    if (!isConnected) {
      alert("Lütfen önce cüzdanınızı bağlayın! (Sağ üst köşedeki buton)");
      return;
    }
    setSelectedSlot(slot);
    setIsInventoryOpen(true);
  };

  const handleSelectPlanet = (planet: Planet) => {
    if (selectedSlot === 1) setSlot1(planet);
    if (selectedSlot === 2) setSlot2(planet);
    setIsInventoryOpen(false);
  };

  const InventoryModal = () => (
    /* Fix: use MotionDiv to avoid initial/animate/exit type errors */
    <MotionDiv 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
    >
      <div className="w-full max-w-4xl bg-[#0a0a12] border border-purple-500/30 rounded-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h3 className="font-orbitron font-bold text-xl flex items-center gap-2">
            <Wallet className="text-purple-500" />
            ENVANTER SEÇİMİ
          </h3>
          <button onClick={() => setIsInventoryOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X/></button>
        </div>
        
        <div className="p-6 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {planets.map((planet) => (
            <div 
              key={planet.id}
              onClick={() => handleSelectPlanet(planet)}
              className="bg-black/40 border border-white/10 rounded-xl p-2 cursor-pointer hover:border-purple-500 transition-all group relative overflow-hidden"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-black">
                <img src={planet.image} alt={planet.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="px-1">
                <div className="text-xs text-purple-400 font-mono tracking-widest">{planet.rarity}</div>
                <div className="font-orbitron font-bold text-sm text-white">{planet.name}</div>
              </div>
              {/* Selection Effect */}
              <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </MotionDiv>
  );

  return (
    <div id="fusion" className="min-h-screen pt-24 pb-24 relative overflow-hidden border-t border-white/10">
      <AnimatePresence>
        {isInventoryOpen && <InventoryModal />}
      </AnimatePresence>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-900/10 backdrop-blur-md mb-6">
             <Atom className="w-4 h-4 text-purple-400 animate-spin-slow" />
             <span className="text-purple-300 text-xs font-mono tracking-widest uppercase">Füzyon Reaktörü Çevrimiçi</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-4 tracking-tighter">
            FÜZYON <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">LABORATUVARI</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm border-l-2 border-purple-500 pl-4 text-left md:text-center md:border-l-0 md:border-none">
            İki göksel varlığı birleştirerek yeni, daha nadir ve güçlü kozmik yapılar oluşturun.
            Cüzdanınızdaki varlıkları seçin ve füzyon işlemini başlatın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-8 items-center max-w-5xl mx-auto">
          {/* Slot 1 */}
          <div className="md:col-span-3">
             <div 
                onClick={() => handleSlotClick(1)}
                className={cn(
                  "relative aspect-[3/4] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-8 group transition-all cursor-pointer overflow-hidden",
                  slot1 ? "border-purple-500 bg-purple-900/10" : "border-white/10 bg-white/5 hover:border-purple-500/50 hover:bg-white/10"
                )}
             >
                {slot1 ? (
                  <>
                    <img src={slot1.image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="relative z-10 text-center">
                      <h3 className="font-orbitron font-bold text-2xl mb-1">{slot1.name}</h3>
                      <span className="text-xs bg-purple-600 px-2 py-1 rounded font-mono">{slot1.rarity}</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSlot1(null); }}
                      className="absolute top-2 right-2 bg-black/50 p-1 rounded-full hover:bg-red-500/50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-white/10">
                       {isConnected ? <Plus className="w-8 h-8 text-gray-500 group-hover:text-purple-400" /> : <Lock className="w-8 h-8 text-gray-500" />}
                    </div>
                    <p className="font-orbitron text-gray-400 group-hover:text-white uppercase tracking-widest text-sm">
                      {isConnected ? 'VARLIK SEÇ' : 'CÜZDAN KİLİTLİ'}
                    </p>
                    <p className="text-xs text-gray-600 mt-2 font-mono">Gezegen A</p>
                  </>
                )}
             </div>
          </div>

          {/* Fusion Core */}
          <div className="md:col-span-1 flex justify-center py-8 md:py-0 relative">
             <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse-slow"></div>
             <div className="relative w-24 h-24 bg-black border border-purple-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)] z-10 hud-border">
                <Zap className={cn("w-10 h-10 text-white transition-all", (slot1 && slot2) ? "animate-bounce text-yellow-400" : "opacity-50")} />
             </div>
             {/* Animated Lines */}
             <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent -z-0"></div>
          </div>

          {/* Slot 2 */}
          <div className="md:col-span-3">
             <div 
                onClick={() => handleSlotClick(2)}
                className={cn(
                  "relative aspect-[3/4] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-8 group transition-all cursor-pointer overflow-hidden",
                  slot2 ? "border-cyan-500 bg-cyan-900/10" : "border-white/10 bg-white/5 hover:border-cyan-500/50 hover:bg-white/10"
                )}
             >
                {slot2 ? (
                  <>
                    <img src={slot2.image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="relative z-10 text-center">
                      <h3 className="font-orbitron font-bold text-2xl mb-1">{slot2.name}</h3>
                      <span className="text-xs bg-cyan-600 px-2 py-1 rounded font-mono">{slot2.rarity}</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSlot2(null); }}
                      className="absolute top-2 right-2 bg-black/50 p-1 rounded-full hover:bg-red-500/50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-white/10">
                       {isConnected ? <Plus className="w-8 h-8 text-gray-500 group-hover:text-cyan-400" /> : <Lock className="w-8 h-8 text-gray-500" />}
                    </div>
                    <p className="font-orbitron text-gray-400 group-hover:text-white uppercase tracking-widest text-sm">
                      {isConnected ? 'VARLIK SEÇ' : 'CÜZDAN KİLİTLİ'}
                    </p>
                    <p className="text-xs text-gray-600 mt-2 font-mono">Gezegen B</p>
                  </>
                )}
             </div>
          </div>
        </div>

        <div className="mt-12 text-center">
           <button 
             disabled={!slot1 || !slot2}
             className={cn(
               "px-16 py-6 border rounded-lg font-orbitron font-bold tracking-[0.2em] uppercase transition-all duration-500 hud-border",
               (slot1 && slot2) 
                 ? "bg-white text-black hover:bg-purple-500 hover:text-white hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] hover:border-purple-500"
                 : "bg-black/50 border-white/10 text-gray-600 cursor-not-allowed"
             )}
           >
              {(slot1 && slot2) ? 'FÜZYONU BAŞLAT' : 'FÜZYON İÇİN 2 VARLIK SEÇ'}
           </button>
        </div>
      </div>
    </div>
  );
};
