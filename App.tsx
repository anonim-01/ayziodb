
import React, { useState, useRef, useEffect, Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Removing router
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { SimulationCockpit } from './components/SimulationCockpit';
import { PlanetCard } from './components/PlanetCard';
import { PlanetDetailModal } from './components/PlanetDetailModal';
import { FusionSection } from './components/FusionSection';
import { TokenomicsSection } from './components/TokenomicsSection';
import { RoadmapSection } from './components/RoadmapSection';
import { planets } from './services/mockData';
import { Planet } from './types';
import { 
  Rocket, Activity, Cpu, Radio, Globe, ScanFace, Lock, Play, Pause, RotateCcw, X, Hexagon, Wind, Database, AlertTriangle, Rotate3D, ChevronRight, Gamepad2
} from 'lucide-react';
import { cn } from './lib/utils';

// Fix for framer-motion type mismatch
const MotionDiv = motion.div as any;

// --- Sections as Components ---

// 1. GAME UI HERO PAGE
const GameHero = () => {
  return (
    <div id="cockpit" className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        {/* Placeholder for video - in production use <video> tag */}
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center animate-pulse-slow opacity-50"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] z-10 pointer-events-none"></div>

      {/* Main UI */}
      <div className="relative z-20 text-center w-full max-w-7xl px-6 flex flex-col items-center">
        
        {/* Top HUD */}
        <div className="absolute top-[-30vh] md:top-[-40vh] w-full flex justify-between px-8 text-xs font-mono text-purple-400 opacity-60">
           <div>SYS.VER.2.0.5</div>
           <div>FQCD_MATRIX: ACTIVE</div>
        </div>

        {/* Central Content */}
        {/* Fix: use MotionDiv instead of motion.div to avoid type errors on motion props */}
        <MotionDiv 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="inline-block px-4 py-1 mb-4 border border-purple-500/50 bg-purple-900/20 rounded-sm text-purple-300 text-xs font-mono tracking-[0.5em] backdrop-blur-md">
            GÖREV BAŞLATILIYOR...
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 font-orbitron tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Fİ-VERSE
          </h1>
          <div className="h-[2px] w-32 bg-purple-500 mx-auto my-4 shadow-[0_0_10px_#a855f7]"></div>
          <p className="text-gray-300 font-mono text-lg tracking-widest max-w-2xl mx-auto">
            EVRENİN MATEMATİĞİNİ YENİDEN YAZ.
          </p>
        </MotionDiv>

        {/* Action Buttons (Game Menu Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-8">
           <a href="#collection" onClick={(e) => { e.preventDefault(); document.getElementById('collection')?.scrollIntoView({behavior: 'smooth'}) }} className="group relative p-6 bg-black/40 border border-white/10 hover:border-purple-500 transition-all duration-300 hud-border cursor-pointer">
              <div className="flex items-center justify-between">
                 <div className="text-left">
                    <div className="text-xs text-gray-500 font-mono mb-1">GÖREV 01</div>
                    <div className="text-2xl font-bold font-orbitron text-white group-hover:text-purple-400 transition-colors">KOLEKSİYON</div>
                 </div>
                 <Globe className="w-8 h-8 text-gray-600 group-hover:text-purple-400 transition-colors" />
              </div>
              <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
           </a>

           <a href="#fusion" onClick={(e) => { e.preventDefault(); document.getElementById('fusion')?.scrollIntoView({behavior: 'smooth'}) }} className="group relative p-6 bg-black/40 border border-white/10 hover:border-cyan-500 transition-all duration-300 hud-border cursor-pointer">
              <div className="flex items-center justify-between">
                 <div className="text-left">
                    <div className="text-xs text-gray-500 font-mono mb-1">GÖREV 02</div>
                    <div className="text-2xl font-bold font-orbitron text-white group-hover:text-cyan-400 transition-colors">FÜZYON LAB</div>
                 </div>
                 <Activity className="w-8 h-8 text-gray-600 group-hover:text-cyan-400 transition-colors" />
              </div>
              <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
           </a>
        </div>

        {/* Bottom Status */}
        <div className="mt-16 flex items-center gap-8 text-xs font-mono text-gray-500">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              SUNUCU: AVRUPA-1
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              PING: 14ms
           </div>
        </div>

      </div>
    </div>
  );
};

// 2. COLLECTION PAGE
const CollectionSection = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  return (
    <div id="collection" className="min-h-screen pt-24 pb-24 bg-[#030014] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
           <h2 className="text-4xl font-orbitron font-black text-white mb-2">GALAKSİ <span className="text-purple-500">ENVANTERİ</span></h2>
           <p className="text-gray-400 font-mono">Keşfedilen varlıklar veritabanı.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
          {planets.map((planet) => (
            <PlanetCard 
              key={planet.id} 
              planet={planet} 
              onClick={setSelectedPlanet}
            />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedPlanet && (
          <PlanetDetailModal 
            planet={selectedPlanet} 
            onClose={() => setSelectedPlanet(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Main App Container
function App() {
  return (
    <Layout>
      {/* 1. Hero / Game Menu */}
      <GameHero />

      {/* 2. Simulation Cockpit (Always visible on scroll down) */}
      <div className="bg-black py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <SimulationCockpit />
        </div>
      </div>

      {/* 3. Collection Section */}
      <div id="collection">
        <CollectionSection />
      </div>

      {/* 4. Fusion Section */}
      <div id="fusion">
        <FusionSection />
      </div>

      {/* 5. Tokenomics */}
      <div id="token">
        <TokenomicsSection />
      </div>

      {/* 6. Roadmap */}
      <div id="roadmap">
        <RoadmapSection />
      </div>
    </Layout>
  );
}

export default App;
