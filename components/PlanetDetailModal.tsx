
import React, { useRef, Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, Rocket, Database, Rotate3D, AlertTriangle, ScanFace, Activity,
  MousePointer2, Move, Search, Play, Pause, Shield, Droplets, Orbit, Disc, Sparkles
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars, Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Planet } from '../types';
import { cn } from '../lib/utils';

// Corrected fix for React Three Fiber intrinsic elements in React 18
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        ambientLight: any;
        directionalLight: any;
        pointLight: any;
        mesh: any;
        ringGeometry: any;
        meshStandardMaterial: any;
        sphereGeometry: any;
        meshBasicMaterial: any;
        group: any;
        [elemName: string]: any;
      }
    }
  }
}

// Fix for framer-motion type mismatch
const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;

const TRANSPARENT_PIXEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Error Boundary Component to handle texture loading failures
class ModelErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn("3D Model loading failed, switching to holographic mode:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Textured Mesh for planets with texture maps
const TexturedPlanetMesh: React.FC<{ planet: Planet }> = ({ planet }) => {
  // Load all potential textures unconditionally to adhere to Hook rules.
  // Use transparent pixel for missing optional textures.
  const textures = useTexture({
    map: planet.textureMap || TRANSPARENT_PIXEL,
    bump: planet.bumpMap || TRANSPARENT_PIXEL,
    cloud: planet.cloudMap || TRANSPARENT_PIXEL,
  });
  
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0005; // Clouds move slightly faster
    }
  });

  return (
    <group>
      {/* Surface */}
      <Sphere args={[1, 64, 64]} scale={2.2}>
        <meshStandardMaterial 
          map={textures.map}
          bumpMap={planet.bumpMap ? textures.bump : undefined}
          bumpScale={0.05}
          roughness={planet.name === 'HELIOS' ? 0.2 : 0.7} // Sun is glossy/emissive-like
          metalness={planet.name === 'HELIOS' ? 0.1 : 0.1}
          emissive={planet.name === 'HELIOS' ? new THREE.Color(planet.color) : new THREE.Color(0x000000)}
          emissiveIntensity={planet.name === 'HELIOS' ? 0.5 : 0}
          color={planet.name.includes('KEPLER') || planet.name.includes('PROXIMA') ? planet.color : 'white'} // Tint fictional planets only
        />
      </Sphere>

      {/* Cloud Layer (Optional) */}
      {planet.cloudMap && (
        <Sphere ref={cloudsRef} args={[1.01, 64, 64]} scale={2.2}>
          <meshStandardMaterial 
            map={textures.cloud}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false} // Prevents Z-fighting
          />
        </Sphere>
      )}
    </group>
  );
};

// Holographic Wireframe Mesh for planets without textures (Placeholder)
const HolographicPlanetMesh = ({ planet }: { planet: Planet }) => {
  return (
    <Sphere args={[1, 32, 32]} scale={2.2}>
      <meshStandardMaterial 
        color={planet.color}
        wireframe={true}
        emissive={planet.color}
        emissiveIntensity={0.8}
        roughness={0.1}
        metalness={0.9}
      />
    </Sphere>
  );
};

const PlanetModel = ({ planet }: { planet: Planet }) => {
  const groupRef = useRef<any>(null);

  useFrame(() => { 
    if (groupRef.current) {
       groupRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Error Boundary wraps the textured mesh to fallback to holographic if textures fail */}
        <ModelErrorBoundary fallback={<HolographicPlanetMesh planet={planet} />}>
           {planet.textureMap ? (
             // Key is essential to force remount and reset hooks when planet changes
             <TexturedPlanetMesh key={planet.id} planet={planet} />
           ) : (
             <HolographicPlanetMesh planet={planet} />
           )}
        </ModelErrorBoundary>
        
        {/* Atmosphere Glow */}
        <mesh scale={2.25}>
           <sphereGeometry args={[1, 64, 64]} />
           <meshStandardMaterial
             color={planet.color}
             transparent
             opacity={0.15}
             roughness={1}
             side={THREE.FrontSide}
             blending={THREE.AdditiveBlending}
             depthWrite={false}
           />
        </mesh>

        {/* Rings */}
        {planet.traits.ringCount > 0 && (
           <mesh rotation={[Math.PI / 2.5, 0, 0]}>
              <ringGeometry args={[2.6, 3.8, 128]} />
              <meshStandardMaterial 
                color={planet.color} 
                side={THREE.DoubleSide} 
                transparent 
                opacity={0.4} 
                metalness={0.4} 
                roughness={0.6} 
              />
           </mesh>
        )}
      </group>
    </Float>
  );
};

const Scene = ({ planet, autoRotate }: { planet: Planet; autoRotate: boolean }) => (
  <>
    <ambientLight intensity={0.1} />
    <pointLight position={[20, 10, 10]} intensity={2.5} color="#ffffff" />
    <pointLight position={[-10, -10, -5]} intensity={0.5} color={planet.color} />
    
    <Stars radius={200} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
    
    <PlanetModel planet={planet} />
    
    <OrbitControls 
      makeDefault
      enableZoom={true} 
      enablePan={false}
      enableRotate={true}
      enableDamping={true}
      dampingFactor={0.05}
      autoRotate={autoRotate} 
      autoRotateSpeed={0.8} 
      minDistance={3.5} 
      maxDistance={8} 
      target={[0, 0, 0]}
    />
  </>
);

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'Legendary': return 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10 shadow-[0_0_15px_rgba(250,204,21,0.3)]';
    case 'Epic': return 'text-purple-400 border-purple-400/50 bg-purple-400/10 shadow-[0_0_15px_rgba(168,85,247,0.3)]';
    case 'Rare': return 'text-blue-400 border-blue-400/50 bg-blue-400/10 shadow-[0_0_15px_rgba(96,165,250,0.3)]';
    case 'Uncommon': return 'text-green-400 border-green-400/50 bg-green-400/10 shadow-[0_0_15px_rgba(74,222,128,0.3)]';
    default: return 'text-gray-400 border-gray-400/50 bg-gray-400/10';
  }
};

const TraitBar = ({ label, value, icon: Icon, color, max = 100 }: any) => (
  <div className="bg-white/5 p-3 rounded-lg border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-colors">
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-wider">
        <Icon className="w-3 h-3" /> {label}
      </div>
      <div className={`text-sm font-mono font-bold ${color}`}>{value}</div>
    </div>
    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
      <MotionDiv 
        initial={{ width: 0 }} 
        animate={{ width: `${Math.min((value / max) * 100, 100)}%` }} 
        transition={{ duration: 1, delay: 0.2 }}
        className={`h-full ${color.replace('text-', 'bg-')}`}
      />
    </div>
  </div>
);

export const PlanetDetailModal = ({ planet, onClose }: { planet: Planet; onClose: () => void }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [mintStatus, setMintStatus] = useState<'idle' | 'minting' | 'success' | 'error'>('idle');
  
  const handleMint = () => {
    if (!isConfirmed) return;
    setMintStatus('minting');
    
    // Simulate transaction delay
    setTimeout(() => {
      setMintStatus('success');
    }, 2000);
  };
  
  if (!planet) return null;

  return (
    /* Fix: use MotionDiv to avoid initial/animate/exit type errors */
    <MotionDiv 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
    >
      <div className="absolute inset-0 pointer-events-none" onClick={onClose}></div>

      {/* Fix: use MotionDiv to avoid layoutId type error */}
      <MotionDiv 
        layoutId={`card-${planet.id}`}
        className="relative w-full max-w-6xl bg-[#0a0a12] border border-purple-500/30 rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.2)] flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 3D Visual Area */}
        <div className="w-full md:w-3/5 h-[400px] md:h-auto relative group bg-gradient-to-b from-[#0a0a12] to-black flex justify-center items-center overflow-hidden">
          
          <div className="absolute inset-0 z-10 cursor-move w-full h-full">
            <Canvas 
              camera={{ position: [0, 0, 6], fov: 40 }} 
              className="w-full h-full"
            >
              <Suspense fallback={null}>
                <Scene planet={planet} autoRotate={autoRotate} />
              </Suspense>
            </Canvas>
          </div>
          
          <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none"></div>
          
          <div className="absolute top-4 left-4 z-20 pointer-events-none opacity-70 flex items-center gap-2 text-xs font-mono text-cyan-400">
             <Rotate3D className="w-4 h-4 animate-spin-slow" />
             <span>GERÇEK ZAMANLI RENDER</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex flex-col items-start gap-2">
              <div className={cn("px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest backdrop-blur-md", getRarityColor(planet.rarity))}>
                {planet.rarity}
              </div>
              <div>
                <h2 className="text-4xl font-orbitron font-black text-white drop-shadow-lg">{planet.name}</h2>
                <span className="text-purple-400 font-mono text-xs">{planet.tag}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
               <button 
                 onClick={() => setAutoRotate(!autoRotate)}
                 className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors border border-white/10"
                 title={autoRotate ? "Durdur" : "Döndür"}
               >
                 {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
               </button>
               
               <div className="hidden md:flex items-center gap-3 px-3 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <MousePointer2 className="w-3 h-3 text-cyan-400" /> Döndür
                  </div>
                  <div className="w-[1px] h-3 bg-white/20"></div>
                  <div className="flex items-center gap-1">
                    <Search className="w-3 h-3 text-purple-400" /> Yakınlaştır
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Data Panel */}
        <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center relative bg-[#0a0a12]/95 backdrop-blur-xl border-l border-white/5">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Database className="w-4 h-4" /> Varlık Verileri
            </h3>
            <p className="text-gray-300 font-light leading-relaxed border-l-2 border-purple-500 pl-4 mb-4">
              {planet.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400 italic bg-white/5 p-3 rounded-lg border border-white/5">
              <Sparkles className="w-4 h-4 text-yellow-500/50" />
              "{planet.motto}"
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
             <TraitBar 
               label="Yönetişim" 
               value={planet.traits.governanceMass} 
               icon={Activity} 
               color="text-purple-400" 
             />
             <TraitBar 
               label="Phi Uyumu" 
               value={planet.traits.phiAffinity} 
               icon={Rotate3D} 
               color="text-cyan-400" 
             />
             <TraitBar 
               label="Entropi Kalkanı" 
               value={planet.traits.entropyShield} 
               icon={Shield} 
               color="text-emerald-400" 
             />
             <TraitBar 
               label="Likidite" 
               value={planet.traits.liquidityDepth} 
               icon={Droplets} 
               color="text-blue-400" 
             />
             
             <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex items-center justify-between">
                 <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-wider">
                   <Orbit className="w-3 h-3" /> Yörünge
                 </div>
                 <div className="text-sm font-mono font-bold text-white">{planet.traits.orbit} AU</div>
             </div>
             
             <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex items-center justify-between">
                 <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-wider">
                   <Disc className="w-3 h-3" /> Halkalar
                 </div>
                 <div className="text-sm font-mono font-bold text-white">{planet.traits.ringCount}</div>
             </div>
          </div>

          <div className="mt-auto">
             <div className="flex items-start gap-3 mb-4 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
               <input 
                 type="checkbox" 
                 id="confirm-mint" 
                 checked={isConfirmed}
                 onChange={(e) => setIsConfirmed(e.target.checked)}
                 disabled={mintStatus !== 'idle'}
                 className="mt-1 accent-purple-500 w-4 h-4 cursor-pointer disabled:opacity-50"
               />
               <label htmlFor="confirm-mint" className="text-xs text-gray-400 cursor-pointer select-none">
                 <span className="flex items-center gap-1 text-yellow-400 font-bold mb-1">
                   <AlertTriangle className="w-3 h-3" />
                   Gaz Ücreti Onayı
                 </span>
                 Bu NFT'nin mintlenmesi Ethereum ağında işlem gerektirir. Gaz ücretleri ağ yoğunluğuna göre değişebilir.
               </label>
             </div>

             <div className="flex gap-4">
               <button 
                 onClick={handleMint}
                 disabled={!isConfirmed || mintStatus === 'minting' || mintStatus === 'success'}
                 className={cn(
                   "flex-1 py-4 font-bold rounded-lg uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2",
                   isConfirmed && mintStatus === 'idle'
                     ? "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]" 
                     : mintStatus === 'success'
                     ? "bg-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                     : "bg-white/5 text-gray-500 cursor-not-allowed border border-white/10"
                 )}
               >
                 {mintStatus === 'minting' ? (
                   <>
                     <Rotate3D className="w-5 h-5 animate-spin" />
                     Minting...
                   </>
                 ) : mintStatus === 'success' ? (
                   <>
                     <Rocket className="w-5 h-5" />
                     Mint Successful!
                   </>
                 ) : (
                   <>
                     <Rocket className="w-5 h-5" />
                     Mintle (0.05 ETH)
                   </>
                 )}
               </button>
               <button className="px-6 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-lg transition-colors">
                 <ScanFace className="w-5 h-5" />
               </button>
             </div>
          </div>

        </div>
      </MotionDiv>
    </MotionDiv>
  );
};
