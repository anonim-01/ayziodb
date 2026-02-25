
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Planet } from '../types';
import { Hexagon, Sparkles, Zap, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

// Fix for framer-motion type mismatch
const MotionDiv = motion.div as any;

interface PlanetCardProps {
  planet: Planet;
  onClick: (planet: Planet) => void;
}

const rarityColors = {
  Legendary: 'border-amber-400 text-amber-400 bg-amber-400/10',
  Epic: 'border-purple-500 text-purple-500 bg-purple-500/10',
  Rare: 'border-blue-500 text-blue-500 bg-blue-500/10',
  Uncommon: 'border-green-500 text-green-500 bg-green-500/10',
  Common: 'border-slate-400 text-slate-400 bg-slate-400/10',
};

const rarityGlows = {
  Legendary: 'shadow-[0_0_30px_rgba(251,191,36,0.3)]',
  Epic: 'shadow-[0_0_30px_rgba(168,85,247,0.3)]',
  Rare: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
  Uncommon: 'shadow-[0_0_30px_rgba(34,197,94,0.2)]',
  Common: 'shadow-[0_0_15px_rgba(148,163,184,0.1)]',
};

export const PlanetCard: React.FC<PlanetCardProps> = ({ planet, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <MotionDiv
      layoutId={`card-${planet.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 8, 
        rotateX: -2,
        zIndex: 10,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative flex-shrink-0 w-[300px] h-[480px] rounded-2xl cursor-pointer perspective-1000",
        "border-2 backdrop-blur-md transition-all duration-500",
        rarityColors[planet.rarity],
        rarityGlows[planet.rarity]
      )}
      onClick={() => onClick(planet)}
    >
      {/* Holographic Shine Overlay */}
      <div className="absolute inset-0 rounded-2xl holo-sheen pointer-events-none z-20"></div>

      {/* Rarity Badge */}
      <div className="absolute top-4 right-4 z-30 px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center gap-1">
        <Sparkles className="w-3 h-3" />
        <span className="text-[10px] font-orbitron font-bold tracking-widest uppercase">{planet.rarity}</span>
      </div>

      {/* Image Container with Parallax Effect */}
      <div className="absolute inset-[2px] rounded-xl overflow-hidden bg-black z-0">
        {!imageError ? (
          <motion.img 
            src={planet.image} 
            alt={planet.name} 
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-125 group-hover:rotate-1"
          />
        ) : (
          <div 
            className="w-full h-full" 
            style={{ 
              background: `radial-gradient(circle at center, ${planet.color}44 0%, #000 70%)` 
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
               <Hexagon className="w-40 h-40 animate-spin-slow" />
            </div>
          </div>
        )}
        
        {/* Dark Gradient Overlay - Reduced opacity for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-20"></div>
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
        
        {/* Floating Hexagon Symbol */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-all duration-700 group-hover:scale-125 pointer-events-none">
           <Hexagon className="w-32 h-32 stroke-[0.5] text-white" />
        </div>

        {/* Planet Info */}
        <MotionDiv 
          className="relative"
          initial={{ y: 0 }}
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-1 h-8 rounded-full transition-all duration-500 group-hover:h-12`} style={{ backgroundColor: planet.color }}></div>
            <div>
              <h3 className="text-3xl font-orbitron font-black text-white leading-none tracking-tighter shadow-black drop-shadow-lg transition-transform duration-300 group-hover:scale-105 origin-left">
                {planet.name}
              </h3>
              <p className="text-[10px] font-mono text-gray-300 tracking-[0.2em] uppercase opacity-80">
                {planet.tag}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 bg-black/70 backdrop-blur-md p-3 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-white/5 group-hover:bg-cyan-400/10 transition-colors">
                <Activity className="w-3 h-3 text-cyan-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 uppercase font-bold">Yönetişim</span>
                <span className="text-sm font-mono font-bold text-white">{planet.traits.governanceMass} M</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-white/5 group-hover:bg-purple-500/10 transition-colors">
                <Zap className="w-3 h-3 text-purple-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 uppercase font-bold">Phi Uyumu</span>
                <span className="text-sm font-mono font-bold text-white">Φ {planet.traits.phiAffinity}</span>
              </div>
            </div>
          </div>

          {/* Hidden "Inspect" Text */}
          <div className="h-0 overflow-hidden group-hover:h-8 transition-all duration-500 flex items-center justify-center mt-2 opacity-0 group-hover:opacity-100">
             <span className="text-[10px] font-orbitron text-white/70 tracking-widest uppercase flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
               Veriyi İncele
             </span>
          </div>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};
