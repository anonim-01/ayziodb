
import { Planet } from '../types';

// Temel Sabitler
export const CONSTANTS = {
  ALPHA: 1 / 137.035999084, // İnce yapı sabiti
  PHI: (1 + Math.sqrt(5)) / 2, // Altın Oran
  PI: Math.PI,
  C: 299792.458, // Işık hızı (km/s)
  H0_PLANCK: 67.4, // Planck Hubble (km/s/Mpc)
  H0_SHOES: 73.0, // SH0ES Hubble
  G: 6.67430e-11, // Newton Gravitational Constant
};

// --- FQCD (Fibonacci-Quantum Cosmological Balance) Formülleri ---

/**
 * FQCD modeline göre teorik Madde Yoğunluğunu (Omega_m) hesaplar.
 * Formül: Ωm = 1/2 * (1 + α/(π*φ) - 1/φ²)
 */
export const calculateFQCDOmegaM = (): number => {
  const term1 = CONSTANTS.ALPHA / (CONSTANTS.PI * CONSTANTS.PHI);
  const term2 = 1 / Math.pow(CONSTANTS.PHI, 2);
  return 0.5 * (1 + term1 - term2);
};

/**
 * Ölçeğe bağlı Phi (φ) değerini hesaplar.
 * @param scale_meters Uzunluk ölçeği (metre cinsinden)
 */
export const calculateScaleDependentPhi = (scale_meters: number): number => {
  const PLANCK_SCALE = 1.6e-35;
  const ATOM_SCALE = 1e-10;
  const GALAXY_SCALE = 3e20; // ~10 kpc
  const HUBBLE_SCALE = 1.4e26;

  // Basit bir logaritmik interpolasyon modeli
  if (scale_meters <= PLANCK_SCALE) return 1.0;
  
  // Kuantum -> Galaktik geçiş (Chameleon mekanizması simülasyonu)
  // Ölçek arttıkça 1.0'dan 1.618'e kayar
  const logScale = Math.log10(scale_meters);
  const logPlanck = Math.log10(PLANCK_SCALE);
  const logGalaxy = Math.log10(GALAXY_SCALE);
  
  // Normalizasyon (0 ile 1 arası)
  const t = Math.max(0, Math.min(1, (logScale - logPlanck) / (logGalaxy - logPlanck)));
  
  // Sigmoid benzeri geçiş
  const transition = t * t * (3 - 2 * t); 
  
  return 1.0 + (CONSTANTS.PHI - 1.0) * transition;
};

/**
 * FQFT modeline göre Galaksi Dönme Hızını hesaplar.
 * v = c * sqrt( -α * r * φ'(r)/φ(r) ) benzeri bir türetme veya
 * G_eff = G0 / φ^2 varsayımı ile.
 */
export const calculateGalaxyRotation = (radius_kpc: number, mass_solar: number): { v_newton: number, v_fqft: number } => {
  const r_m = radius_kpc * 3.086e19; // metre
  const M_kg = mass_solar * 1.989e30; // kg
  
  // Standart Newton
  const v_newton = Math.sqrt((CONSTANTS.G * M_kg) / r_m) / 1000; // km/s

  // FQFT: G_eff ölçeğe bağlı değişiyor
  const phi = calculateScaleDependentPhi(r_m);
  // Eğer phi artıyorsa, G_eff azalır: G_eff = G / phi^2 (Tartıştığımız "zayıflama" paradoksu)
  // Ancak "Karanlık Madde" etkisi için G'nin artması veya metrik etkinin hızı artırması gerekir.
  // Burada FQFT'nin "uzunluk genişlemesi" hipotezini kullanıyoruz: v_obs = phi * v_real
  
  const v_fqft = v_newton * phi; 

  return { v_newton, v_fqft };
};

/**
 * Hubble Parametresinin Kırmızıya Kayma (z) ile evrimi
 * ΛCDM vs FQCD karşılaştırması
 */
export const calculateHubbleEvolution = (z: number): { H_lcdm: number, H_fqcd: number } => {
  // ΛCDM
  const Om = 0.315;
  const Ol = 0.685;
  const E_z = Math.sqrt(Om * Math.pow(1 + z, 3) + Ol);
  const H_lcdm = CONSTANTS.H0_PLANCK * E_z;

  // FQCD (Time-varying Phi hypothesis)
  // H(z) = H0 * E(z) * (phi(z)/phi0)
  const phi_z = CONSTANTS.PHI * (1 + 0.002 * Math.log(1 + z)); // Küçük bir evrim
  const H_fqcd = H_lcdm * (CONSTANTS.PHI / phi_z); // Ters orantı varsayımı

  return { H_lcdm, H_fqcd };
};

// Simülasyon Verisi Üretici
export const generateSimulationData = () => {
  const rotationCurveData = [];
  for (let r = 1; r <= 50; r += 1) {
    // Basit kütle profili (M ~ r for flat disk approximation inside, then point mass)
    const mass = r < 10 ? 1e10 * r : 1e11; 
    const v = calculateGalaxyRotation(r, mass);
    rotationCurveData.push({
      radius: r,
      Newton: v.v_newton,
      FQFT: v.v_fqft,
      Observed: v.v_newton * 1.5 // Gerçek karanlık madde etkisi simülasyonu
    });
  }
  return rotationCurveData;
};
