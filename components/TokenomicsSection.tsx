
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Coins, TrendingUp, Lock, Users } from 'lucide-react';

const data = [
  { name: 'Hazine & Rezerv', value: 40, color: '#a855f7' }, // Purple
  { name: 'Topluluk & Ödüller', value: 30, color: '#38bdf8' }, // Sky
  { name: 'Likidite Havuzu', value: 15, color: '#22c55e' }, // Green
  { name: 'Ekip & Geliştirme', value: 10, color: '#fbbf24' }, // Amber
  { name: 'Airdrop', value: 5, color: '#f472b6' }, // Pink
];

export const TokenomicsSection: React.FC = () => {
  return (
    <section id="token" className="py-24 bg-[#050508] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Chart Side */}
          <div className="w-full md:w-1/2">
             <div className="relative aspect-square max-w-[500px] mx-auto">
                {/* Glowing Background for Chart */}
                <div className="absolute inset-0 bg-purple-500/10 blur-[80px] rounded-full"></div>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      innerRadius={80}
                      outerRadius={160}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff', fontFamily: 'Share Tech Mono' }}
                    />
                    <Legend 
                       layout="vertical" 
                       verticalAlign="middle" 
                       align="right"
                       iconType="circle"
                       wrapperStyle={{ fontFamily: 'Orbitron', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                   <div className="text-3xl font-orbitron font-bold text-white">1M</div>
                   <div className="text-xs text-purple-400 font-mono tracking-widest">TOPLAM ARZ</div>
                </div>
             </div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2 space-y-8">
            <div>
               <h2 className="text-4xl font-orbitron font-black text-white mb-2">
                 Fİ <span className="text-purple-500">TOKEN</span>
               </h2>
               <p className="text-gray-400 leading-relaxed">
                 Evrenin yerel para birimi. Yönetişim, füzyon enerjisi ve pazar yeri işlemleri için kullanılır. 
                 Enflasyonist olmayan, Fibonacci tabanlı yakım mekanizmasına sahiptir.
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors">
                  <Coins className="w-6 h-6 text-purple-400 mb-3" />
                  <h3 className="font-bold text-white mb-1">Staking Ödülleri</h3>
                  <p className="text-xs text-gray-500">Uzun vadeli tutucular için yüksek APY.</p>
               </div>
               <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors">
                  <TrendingUp className="w-6 h-6 text-green-400 mb-3" />
                  <h3 className="font-bold text-white mb-1">Deflasyonist</h3>
                  <p className="text-xs text-gray-500">Her işlemde %1.618 yakım.</p>
               </div>
               <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors">
                  <Lock className="w-6 h-6 text-amber-400 mb-3" />
                  <h3 className="font-bold text-white mb-1">Likidite Kilidi</h3>
                  <p className="text-xs text-gray-500">24 Ay kilitli likidite.</p>
               </div>
               <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors">
                  <Users className="w-6 h-6 text-cyan-400 mb-3" />
                  <h3 className="font-bold text-white mb-1">DAO Yönetişimi</h3>
                  <p className="text-xs text-gray-500">Gezegen sahipleri karar verir.</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
