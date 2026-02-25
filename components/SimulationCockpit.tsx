
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { calculateFQCDOmegaM, calculateScaleDependentPhi, generateSimulationData, CONSTANTS } from '../lib/fqcd';
import { Activity, Zap, BarChart3, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const SimulationCockpit: React.FC = () => {
  const [omegaM, setOmegaM] = useState<number>(0);
  const [scalePhi, setScalePhi] = useState<number>(1);
  const [scaleInput, setScaleInput] = useState<number>(1e-35); // Planck scale start
  const [rotationData, setRotationData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'cosmology' | 'galaxy'>('cosmology');

  useEffect(() => {
    // Hesaplamaları yap
    setOmegaM(calculateFQCDOmegaM());
    setRotationData(generateSimulationData());
  }, []);

  useEffect(() => {
    setScalePhi(calculateScaleDependentPhi(scaleInput));
  }, [scaleInput]);

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    // Logaritmik slider simülasyonu
    const realScale = Math.pow(10, val);
    setScaleInput(realScale);
  };

  return (
    <div className="w-full bg-[#050508] border border-white/10 rounded-xl overflow-hidden flex flex-col">
      {/* Header Panel */}
      <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-orbitron font-bold flex items-center gap-2">
            <Activity className="text-purple-500" />
            FQCD SİMÜLASYON LABORATUVARI
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">FIBONACCI-QUANTUM COSMOLOGICAL DYNAMICS v1.0</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('cosmology')}
            className={`px-4 py-2 rounded text-sm font-bold transition-colors ${activeTab === 'cosmology' ? 'bg-purple-600 text-white' : 'bg-transparent border border-white/20 text-gray-400'}`}
          >
            KOZMOLOJİ
          </button>
          <button 
            onClick={() => setActiveTab('galaxy')}
            className={`px-4 py-2 rounded text-sm font-bold transition-colors ${activeTab === 'galaxy' ? 'bg-cyan-600 text-white' : 'bg-transparent border border-white/20 text-gray-400'}`}
          >
            GALAKSİ DİNAMİĞİ
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Control / Info Panel */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Omega_m Prediction Box */}
          <div className="bg-black/40 border border-purple-500/30 p-4 rounded-lg">
            <h3 className="text-sm text-purple-400 font-mono mb-2 uppercase">Ω_m (Madde Yoğunluğu) Tahmini</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-orbitron text-white">{omegaM.toFixed(5)}</span>
              <span className="text-xs text-gray-500 mb-1">FQCD</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 border-t border-white/10 pt-2">
              <span>Planck (Gözlem):</span>
              <span className="text-green-400">0.315 ± 0.007</span>
            </div>
            <div className="mt-2 text-xs">
              <span className={`inline-flex items-center gap-1 ${Math.abs(omegaM - 0.315) < 0.007 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(omegaM - 0.315) < 0.007 ? <CheckCircle2 className="w-3 h-3"/> : <AlertTriangle className="w-3 h-3"/>}
                {Math.abs(omegaM - 0.315) < 0.007 ? '1σ İÇİNDE UYUMLU' : 'UYUMSUZ'}
              </span>
            </div>
          </div>

          {/* Scale Slider */}
          <div className="bg-black/40 border border-cyan-500/30 p-4 rounded-lg">
            <h3 className="text-sm text-cyan-400 font-mono mb-4 uppercase">Ölçek Bağımlı ϕ(ℓ)</h3>
            
            <input 
              type="range" 
              min="-35" 
              max="26" 
              step="0.1"
              defaultValue="-35"
              onChange={handleScaleChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-xs font-mono text-gray-400">
                Ölçek: 10^{Math.log10(scaleInput).toFixed(1)} m
                <br/>
                <span className="text-white font-bold">{
                  scaleInput < 1e-15 ? 'Planck / Atomik' : 
                  scaleInput < 1e16 ? 'Yıldız Sistemi' : 
                  scaleInput < 1e22 ? 'Galaktik' : 'Kozmolojik'
                }</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-orbitron text-cyan-400">{scalePhi.toFixed(4)}</div>
                <span className="text-[10px] text-gray-500">Local Phi Değeri</span>
              </div>
            </div>
          </div>

          {/* Theory Formula */}
          <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-xs font-mono text-gray-400">
            <p className="mb-2 text-white font-bold">Ana Denklem:</p>
            <p>Ω_m = ½(1 + α/πϕ - 1/ϕ²)</p>
            <p className="mt-2 text-gray-500 italic">
              "Evrenin madde içeriği, kuantum elektrodinamik etkileşimler ile uzay-zamanın Fibonacci geometrisi arasındaki dengedir."
            </p>
          </div>

        </div>

        {/* Right Charts Panel */}
        <div className="lg:col-span-2 bg-black/20 border border-white/10 rounded-lg p-4 h-[400px]">
          {activeTab === 'cosmology' ? (
             <div className="h-full flex flex-col">
                <h3 className="text-sm font-bold text-gray-300 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4"/>
                  KOZMOLOJİK SABİTLERİN UYUMU (FQCD vs ΛCDM)
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { name: 'Ω_m', fqcd: 0.3097, planck: 0.315, min: 0.308, max: 0.322 },
                    { name: 'Ω_Λ', fqcd: 0.6903, planck: 0.685, min: 0.678, max: 0.692 },
                    { name: 'σ_8', fqcd: 0.807, planck: 0.811, min: 0.805, max: 0.817 },
                  ]}>
                    <defs>
                      <linearGradient id="colorPlanck" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorFQCD" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis domain={[0, 1]} stroke="#666" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333'}} />
                    <Legend />
                    <Area type="monotone" dataKey="planck" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPlanck)" name="Planck 2018 (Observed)" />
                    <Area type="monotone" dataKey="fqcd" stroke="#8884d8" fillOpacity={1} fill="url(#colorFQCD)" name="FQCD Model (Predicted)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          ) : (
            <div className="h-full flex flex-col">
               <h3 className="text-sm font-bold text-gray-300 mb-4 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4"/>
                  GALAKSİ DÖNME EĞRİLERİ (TEST)
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={rotationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="radius" stroke="#666" label={{ value: 'Yarıçap (kpc)', position: 'insideBottom', offset: -5 }} />
                    <YAxis stroke="#666" label={{ value: 'Hız (km/s)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333'}} />
                    <Legend />
                    <Line type="monotone" dataKey="Newton" stroke="#ef4444" dot={false} strokeWidth={2} name="Newton (Sadece Baryon)" />
                    <Line type="monotone" dataKey="Observed" stroke="#22c55e" dot={false} strokeWidth={2} name="Gözlemlenen (Karanlık Madde)" />
                    <Line type="monotone" dataKey="FQFT" stroke="#8b5cf6" dot={false} strokeWidth={3} name="FQFT (Scale-Dep ϕ)" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-2 text-xs text-center text-gray-500">
                  Not: FQFT eğrisi, ϕ etkisinin efektif kütleçekimi güçlendirdiği değil, uzunluk algısını değiştirdiği hipotezine dayanır.
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
