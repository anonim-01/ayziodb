
import React from 'react';
import { CheckCircle2, Circle, Milestone } from 'lucide-react';
import { cn } from '../lib/utils';

const roadmapData = [
  {
    phase: "FAZ 1",
    title: "Başlangıç (Genesis)",
    date: "Q1 2025",
    completed: true,
    items: ["Konsept Tasarımı", "FQCD Modelinin Geliştirilmesi", "İlk 10 Gezegenin Arzı", "Topluluk Kurulumu"]
  },
  {
    phase: "FAZ 2",
    title: "Füzyon Çağı",
    date: "Q2 2025",
    completed: false,
    active: true,
    items: ["Füzyon Laboratuvarı Beta", "Token Lansmanı (IDO)", "Staking Platformu", "İlk Birleşme Etkinliği"]
  },
  {
    phase: "FAZ 3",
    title: "Kolonizasyon",
    date: "Q3 2025",
    completed: false,
    items: ["Gezegen Yüzeyi Keşfi", "Kaynak Madenciliği Oyunu", "Pazar Yeri V2", "DAO Oylamaları"]
  },
  {
    phase: "FAZ 4",
    title: "Çoklu Evren",
    date: "Q4 2025",
    completed: false,
    items: ["Cross-chain Entegrasyonu", "VR Deneyimi", "Mobil Uygulama", "İkinci Galaksi Keşfi"]
  }
];

export const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-24 bg-black relative border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="text-4xl font-orbitron font-black text-white mb-4">
             YOL <span className="text-cyan-500">HARİTASI</span>
           </h2>
           <p className="text-gray-400 font-mono">Evrenin genişleme planı.</p>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-white/10 md:left-1/2 md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {roadmapData.map((item, index) => (
              <div key={index} className={cn(
                "relative flex flex-col md:flex-row gap-8 items-start md:items-center",
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              )}>
                
                {/* Content Box */}
                <div className="ml-12 md:ml-0 flex-1 w-full md:w-[calc(50%-40px)]">
                  <div className={cn(
                    "p-6 rounded-xl border backdrop-blur-sm transition-all duration-300",
                    item.active 
                      ? "bg-purple-900/10 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]" 
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  )}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={cn(
                          "text-xs font-bold tracking-widest px-2 py-1 rounded mb-2 inline-block",
                          item.active ? "bg-purple-500 text-white" : "bg-white/10 text-gray-400"
                        )}>
                          {item.phase}
                        </span>
                        <h3 className="text-xl font-orbitron font-bold text-white">{item.title}</h3>
                      </div>
                      <span className="font-mono text-sm text-gray-500">{item.date}</span>
                    </div>
                    
                    <ul className="space-y-2">
                      {item.items.map((subItem, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                           <div className={cn("w-1.5 h-1.5 rounded-full", item.completed ? "bg-green-500" : "bg-gray-600")}></div>
                           {subItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 flex items-center justify-center bg-black border-4 border-black rounded-full z-10">
                   <div className={cn(
                     "w-full h-full rounded-full flex items-center justify-center border-2",
                     item.completed ? "bg-green-500 border-green-500" : 
                     item.active ? "bg-black border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" : "bg-black border-gray-700"
                   )}>
                      {item.completed ? <CheckCircle2 className="w-4 h-4 text-white" /> : 
                       item.active ? <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" /> : 
                       <Circle className="w-4 h-4 text-gray-700" />}
                   </div>
                </div>

                {/* Empty Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
