
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';

export interface PlanetTrait {
  name: string;
  value: number; // 0-100
  description: string;
}

export interface Planet {
  id: string;
  name: string;
  tag: string; // e.g., "The Source"
  description: string;
  rarity: Rarity;
  image: string;
  textureMap?: string; // URL for 3D texture
  bumpMap?: string; // Optional bump/normal map
  cloudMap?: string; // Optional cloud layer texture
  ringMap?: string; // Optional ring texture
  video?: string;
  traits: {
    orbit: number;
    ringCount: number;
    phiAffinity: number;
    entropyShield: number;
    liquidityDepth: number;
    governanceMass: number;
  };
  motto: string;
  color: string;
}

export interface FusionCombination {
  planetA: string;
  planetB: string;
  result: string;
  bonus: string;
}
