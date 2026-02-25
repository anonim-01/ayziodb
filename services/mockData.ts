
import { Planet } from '../types';

// Using high-quality textures from various reliable GitHub sources (Three.js examples, Solar System repositories)
const ASSETS = {
  SUN: {
    map: "https://raw.githubusercontent.com/mistic100/Solar-System/master/assets/sun.jpg"
  },
  MERCURY: {
    map: "https://raw.githubusercontent.com/mistic100/Solar-System/master/assets/mercury.jpg",
    bump: "https://raw.githubusercontent.com/glebec/universe/master/src/assets/textures/mercury-bump.jpg" 
  },
  VENUS: {
    map: "https://raw.githubusercontent.com/mistic100/Solar-System/master/assets/venus_atmosphere.jpg",
  },
  EARTH: {
    map: "https://raw.githubusercontent.com/mistic100/Solar-System/master/assets/earth.jpg",
    bump: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
    clouds: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png"
  },
  MARS: {
    map: "https://raw.githubusercontent.com/mistic100/Solar-System/master/assets/mars.jpg",
    bump: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mars_1k_normal.jpg"
  },
  JUPITER: {
    map: "https://raw.githubusercontent.com/mistic100/Solar-System/master/assets/jupiter.jpg"
  },
  SATURN: {
    map: "https://raw.githubusercontent.com/mistic100/Solar-System/master/assets/saturn.jpg",
    ring: "https://raw.githubusercontent.com/glebec/universe/master/src/assets/textures/saturn-ring.png"
  },
  URANUS: {
    map: "https://raw.githubusercontent.com/mistic100/Solar-System/master/assets/uranus.jpg",
    ring: "https://raw.githubusercontent.com/glebec/universe/master/src/assets/textures/uranus-ring.png"
  },
  NEPTUNE: {
    map: "https://raw.githubusercontent.com/mistic100/Solar-System/master/assets/neptune.jpg"
  },
  MOON: {
    map: "https://raw.githubusercontent.com/mistic100/Solar-System/master/assets/moon.jpg",
    bump: "https://raw.githubusercontent.com/glebec/universe/master/src/assets/textures/moon-bump.jpg"
  }
};

export const planets: Planet[] = [
  {
    id: 'helios',
    name: 'HELIOS',
    tag: 'The Source',
    description: 'Sistemin kalbi, yaşamın ve enerjinin kaynağı. Mutlak otorite ve başlangıç noktası.',
    rarity: 'Legendary',
    image: 'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?q=80&w=1000&auto=format&fit=crop',
    textureMap: ASSETS.SUN.map,
    motto: "Işık her şeyden önce gelir.",
    color: '#fbbf24',
    traits: {
      orbit: 0,
      ringCount: 0,
      phiAffinity: 100,
      entropyShield: 95,
      liquidityDepth: 90,
      governanceMass: 100
    }
  },
  {
    id: 'mercury',
    name: 'MERCURY',
    tag: 'The Messenger',
    description: 'Hız, iletişim ve veri aktarımı. Evrenin sinir sistemi.',
    rarity: 'Common',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop',
    textureMap: ASSETS.MERCURY.map,
    bumpMap: ASSETS.MERCURY.bump,
    motto: "Bilgi, ışıktan hızlıdır.",
    color: '#94a3b8',
    traits: {
      orbit: 20,
      ringCount: 0,
      phiAffinity: 40,
      entropyShield: 20,
      liquidityDepth: 30,
      governanceMass: 15
    }
  },
  {
    id: 'venus',
    name: 'VENUS',
    tag: 'The Harmony',
    description: 'Estetik, uyum ve çekim gücü. Değerlerin ve sanatın merkezi.',
    rarity: 'Uncommon',
    image: 'https://images.unsplash.com/photo-1614314169000-4852068697e2?q=80&w=1000&auto=format&fit=crop',
    textureMap: ASSETS.VENUS.map,
    motto: "Güzellik matematiktir.",
    color: '#e5e7eb',
    traits: {
      orbit: 30,
      ringCount: 0,
      phiAffinity: 90,
      entropyShield: 50,
      liquidityDepth: 50,
      governanceMass: 40
    }
  },
  {
    id: 'gaia',
    name: 'GAIA',
    tag: 'The Life',
    description: 'Büyüme, bereket ve döngüsellik. Yaşamın filizlendiği ana kucağı.',
    rarity: 'Rare',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000&auto=format&fit=crop',
    textureMap: ASSETS.EARTH.map,
    bumpMap: ASSETS.EARTH.bump,
    cloudMap: ASSETS.EARTH.clouds,
    motto: "Her son bir başlangıçtır.",
    color: '#3b82f6',
    traits: {
      orbit: 40,
      ringCount: 0,
      phiAffinity: 88,
      entropyShield: 70,
      liquidityDepth: 80,
      governanceMass: 60
    }
  },
  {
    id: 'mars',
    name: 'MARS',
    tag: 'The Warrior',
    description: 'Eylem, cesaret ve fetih. Sınırları zorlayan agresif güç.',
    rarity: 'Common',
    image: 'https://images.unsplash.com/photo-1614728853970-bc2f41147cd2?q=80&w=1000&auto=format&fit=crop',
    textureMap: ASSETS.MARS.map,
    bumpMap: ASSETS.MARS.bump,
    motto: "Güç, iradenin eseridir.",
    color: '#ef4444',
    traits: {
      orbit: 50,
      ringCount: 0,
      phiAffinity: 30,
      entropyShield: 60,
      liquidityDepth: 20,
      governanceMass: 55
    }
  },
  {
    id: 'jupiter',
    name: 'JUPITER',
    tag: 'The King',
    description: 'Genişleme, şans ve bilgelik. En büyük kütle, en büyük etki.',
    rarity: 'Epic',
    image: 'https://images.unsplash.com/photo-1614732414444-096e6f580211?q=80&w=1000&auto=format&fit=crop',
    textureMap: ASSETS.JUPITER.map,
    motto: "Büyümek kaçınılmazdır.",
    color: '#d97706',
    traits: {
      orbit: 60,
      ringCount: 1,
      phiAffinity: 75,
      entropyShield: 85,
      liquidityDepth: 95,
      governanceMass: 90
    }
  },
  {
    id: 'saturn',
    name: 'SATURN',
    tag: 'The Judge',
    description: 'Zaman, disiplin ve sınırlar. Yapıyı koruyan halkaların efendisi.',
    rarity: 'Epic',
    image: 'https://images.unsplash.com/photo-1614730341194-75c60740a2d3?q=80&w=1000&auto=format&fit=crop',
    textureMap: ASSETS.SATURN.map,
    motto: "Zaman her şeyin ilacıdır.",
    color: '#eab308',
    traits: {
      orbit: 70,
      ringCount: 7,
      phiAffinity: 92,
      entropyShield: 90,
      liquidityDepth: 70,
      governanceMass: 85
    }
  },
  {
    id: 'uranus',
    name: 'URANUS',
    tag: 'The Awakener',
    description: 'Ani değişimler, devrim ve özgünlük. Buz devinin soğuk nefesi.',
    rarity: 'Rare',
    image: 'https://images.unsplash.com/photo-1614726365607-f9e5c9b7b9d5?q=80&w=1000&auto=format&fit=crop',
    textureMap: ASSETS.URANUS.map,
    motto: "Değişim tek sabittir.",
    color: '#22d3ee',
    traits: {
      orbit: 75,
      ringCount: 2,
      phiAffinity: 60,
      entropyShield: 40,
      liquidityDepth: 60,
      governanceMass: 45
    }
  },
  {
    id: 'neptune',
    name: 'NEPTUNE',
    tag: 'The Mystic',
    description: 'Hayaller, illüzyonlar ve sonsuz okyanus. Bilinçaltının derinlikleri.',
    rarity: 'Rare',
    image: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?q=80&w=1000&auto=format&fit=crop',
    textureMap: ASSETS.NEPTUNE.map,
    motto: "Gerçek, görünenin ötesindedir.",
    color: '#3b82f6',
    traits: {
      orbit: 80,
      ringCount: 4,
      phiAffinity: 95,
      entropyShield: 55,
      liquidityDepth: 100,
      governanceMass: 50
    }
  },
  {
    id: 'pluto',
    name: 'PLUTO',
    tag: 'The Transformer',
    description: 'Yıkım, dönüşüm ve yeniden doğuş. En uçtaki gizli güç.',
    rarity: 'Legendary',
    image: 'https://images.unsplash.com/photo-1614726365156-339247c72db8?q=80&w=1000&auto=format&fit=crop',
    textureMap: ASSETS.MOON.map,
    bumpMap: ASSETS.MOON.bump,
    motto: "Sondan korkma, başlangıcı kucakla.",
    color: '#94a3b8',
    traits: {
      orbit: 90,
      ringCount: 1,
      phiAffinity: 99,
      entropyShield: 100,
      liquidityDepth: 40,
      governanceMass: 95
    }
  }
];
