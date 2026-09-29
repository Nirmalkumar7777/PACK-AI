import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google Gen AI client if key exists
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI:', err);
  }
}

// Data structures
export interface PackagingCostAnalysis {
  currency: 'INR' | 'USD';
  estimated_cost_per_pouch_inr: number;
  estimated_cost_per_pouch_usd: number;
  film_material_cost_per_kg_inr: number;
  film_area_sqm_per_pouch: number;
  film_weight_grams_per_pouch: number;
  raw_material_cost_per_pouch_inr: number;
  gas_flush_cost_per_pouch_inr: number;
  printing_and_converting_cost_inr: number;
  total_batch_cost_inr: number;
  packaging_cost_percentage_of_retail: number;
  mofpi_subsidy_potential_inr: number;
  cost_tier: 'Budget Economic' | 'Standard Commercial' | 'Premium High-Barrier' | 'Export Grade';
  cost_saving_opportunities: string[];
  is_within_budget?: boolean;
}

export interface PackInput {
  commodity_name: string;
  category: 'Fresh Produce' | 'Dry Goods' | 'High-Fat/Dairy' | 'Frozen' | 'Bakery' | 'Meat/Poultry';
  moisture: number;
  fat: number;
  respiration_rate: number;
  shelf_life: number;
  temp: number;
  humidity: number;
  storage_mode: 'Ambient' | 'Chilled' | 'Frozen';
  pack_size_grams?: number;
  batch_volume_units?: number;
  commodity_retail_price?: number;
  target_packaging_budget_per_unit?: number;
}

export interface PackOutput {
  recommendation_summary: string;
  recommended_materials: Array<{
    layer_structure: string;
    material_type: string;
    film_thickness_microns: number;
    suitability_reason: string;
  }>;
  technical_specifications: {
    target_OTR_cc_m2_day: string;
    target_WVTR_g_m2_day: string;
    sealability_temp_range_C: string;
    tensile_strength_MPa: string;
  };
  MAP_requirements: {
    is_MAP_recommended: boolean;
    gas_composition: {
      O2_percent: string;
      CO2_percent: string;
      N2_percent: string;
    };
    perforation_type: 'None' | 'Micro-perforated' | 'Macro-perforated';
  };
  sustainability_score: {
    eco_friendly_alternative: string;
    recyclability_grade: 'A' | 'B' | 'C';
    carbon_footprint_impact: 'Low' | 'Medium' | 'High';
  };
  packaging_cost_analysis?: PackagingCostAnalysis;
  // Extended MoFPI metadata for UI display
  mofpi_compliance_notes?: {
    is_standards: string[];
    fssai_regulations: string;
    storage_precautions: string[];
    shelf_life_extension_factor: string;
  };
}

export function computePackagingCost(
  input: PackInput,
  primaryThicknessMicrons: number,
  isMAP: boolean,
  category: string,
  perforation: string
): PackagingCostAnalysis {
  const packSize = input.pack_size_grams || 500;
  const batchVolume = input.batch_volume_units || 10000;
  const retailPrice = input.commodity_retail_price || 150;
  const targetBudget = input.target_packaging_budget_per_unit;

  let filmAreaSqm = 0.075;
  if (packSize <= 100) filmAreaSqm = 0.038;
  else if (packSize <= 250) filmAreaSqm = 0.055;
  else if (packSize <= 500) filmAreaSqm = 0.078;
  else if (packSize <= 1000) filmAreaSqm = 0.115;
  else filmAreaSqm = 0.165;

  let materialCostPerKg = 210;
  let densityGcm3 = 0.95;

  if (category === 'High-Fat/Dairy' || input.fat > 10) {
    if (input.fat > 25 || input.shelf_life > 90) {
      materialCostPerKg = 415;
      densityGcm3 = 1.25;
    } else {
      materialCostPerKg = 315;
      densityGcm3 = 1.05;
    }
  } else if (category === 'Meat/Poultry') {
    materialCostPerKg = 365;
    densityGcm3 = 1.15;
  } else if (category === 'Fresh Produce') {
    materialCostPerKg = 225;
    densityGcm3 = 0.94;
  } else if (category === 'Frozen') {
    materialCostPerKg = 295;
    densityGcm3 = 1.02;
  } else if (category === 'Dry Goods' && input.moisture < 8) {
    materialCostPerKg = 245;
    densityGcm3 = 0.98;
  }

  const thickness = primaryThicknessMicrons || 60;
  const filmWeightGrams = Number((filmAreaSqm * thickness * densityGcm3).toFixed(2));
  const rawMaterialCost = Number(((filmWeightGrams / 1000) * materialCostPerKg).toFixed(2));

  let gasCost = 0;
  if (isMAP) {
    if (category === 'Fresh Produce') {
      gasCost = 0.35;
    } else if (category === 'Meat/Poultry') {
      gasCost = 0.45;
    } else if (category === 'Bakery') {
      gasCost = 0.38;
    } else {
      gasCost = 0.22;
    }
  }

  let convertingCost = 0.75;
  if (perforation === 'Micro-perforated' || perforation === 'Macro-perforated') {
    convertingCost += 0.25;
  }
  if (thickness > 80) {
    convertingCost += 0.20;
  }

  const totalCostPerPouchINR = Number((rawMaterialCost + gasCost + convertingCost).toFixed(2));
  const totalCostPerPouchUSD = Number((totalCostPerPouchINR / 83.5).toFixed(3));
  const totalBatchCostINR = Math.round(totalCostPerPouchINR * batchVolume);
  const costPctOfRetail = retailPrice > 0 ? Number(((totalCostPerPouchINR / retailPrice) * 100).toFixed(1)) : 3.5;
  const mofpiSubsidyPotential = Math.round(totalBatchCostINR * 0.35);

  let costTier: PackagingCostAnalysis['cost_tier'] = 'Standard Commercial';
  if (totalCostPerPouchINR < 2.0) costTier = 'Budget Economic';
  else if (totalCostPerPouchINR > 4.5) costTier = 'Premium High-Barrier';
  else if (category === 'Fresh Produce' && input.respiration_rate > 50) costTier = 'Export Grade';

  const costSavingOpportunities: string[] = [];
  if (totalCostPerPouchINR > 3.5) {
    costSavingOpportunities.push('Down-gauge sealant layer by 5-10µm using high-tenacity metallocene LLDPE');
  }
  if (isMAP) {
    costSavingOpportunities.push('Adopt on-site Nitrogen PSA generator to reduce cylinder gas flush cost by 45%');
  }
  if (batchVolume >= 50000) {
    costSavingOpportunities.push('High-volume rotogravure cylinder amortization will reduce converting cost by ₹0.20/pouch');
  } else {
    costSavingOpportunities.push('Batch volume scale-up from 10k to 50k units can lower per-unit converting cost by 18%');
  }
  costSavingOpportunities.push('Eligible for up to 35% capital grant under MoFPI PMKSY / PMFME Food Processing Schemes');

  return {
    currency: 'INR',
    estimated_cost_per_pouch_inr: totalCostPerPouchINR,
    estimated_cost_per_pouch_usd: totalCostPerPouchUSD,
    film_material_cost_per_kg_inr: materialCostPerKg,
    film_area_sqm_per_pouch: filmAreaSqm,
    film_weight_grams_per_pouch: filmWeightGrams,
    raw_material_cost_per_pouch_inr: rawMaterialCost,
    gas_flush_cost_per_pouch_inr: gasCost,
    printing_and_converting_cost_inr: convertingCost,
    total_batch_cost_inr: totalBatchCostINR,
    packaging_cost_percentage_of_retail: costPctOfRetail,
    mofpi_subsidy_potential_inr: mofpiSubsidyPotential,
    cost_tier: costTier,
    cost_saving_opportunities: costSavingOpportunities,
    is_within_budget: targetBudget !== undefined && targetBudget > 0 ? totalCostPerPouchINR <= targetBudget : undefined
  };
}

// Deterministic MoFPI rule engine enforcing all 4 strict prompt constraints:
// 1. High Fat (>10%): Requires low OTR (<10 cc/m²/24h/atm) to prevent rancidity.
// 2. High Moisture / Dry Crisps: Requires low WVTR (<1.5 g/m²/24h) to avoid soggy texture.
// 3. Fresh Produce: NEVER select 100% impermeable barriers. Require micro-perforated films or breathable polymers (LDPE/PLA) to match respiration rate and avoid anaerobic fermentation.
// 4. MAP Gas Flush: Balance O2 and CO2 ratios specifically for respiration control if Category = "Fresh Produce".
export function computeMoFPIRuleEngine(input: PackInput): PackOutput {
  const isHighFat = input.fat > 10;
  const isFreshProduce = input.category === 'Fresh Produce';
  const isDryCrisp = (input.category === 'Dry Goods' && input.moisture < 8) || (input.category === 'Bakery' && input.moisture < 12);
  const isHighMoisturePerishable = input.moisture > 60 && !isFreshProduce;

  // 1. OTR calculation
  let target_OTR: string;
  if (isFreshProduce) {
    if (input.respiration_rate > 60) {
      target_OTR = '1500 - 3500 (Breathable / Laser Micro-perforated)';
    } else if (input.respiration_rate > 20) {
      target_OTR = '800 - 1500 (Controlled Permeability)';
    } else {
      target_OTR = '300 - 800 (Low-medium Respiration Breathable)';
    }
  } else if (isHighFat) {
    target_OTR = '< 1.5 - 5.0 (Ultra-low OTR barrier to arrest lipid photo-oxidation)';
  } else if (input.category === 'Meat/Poultry') {
    target_OTR = '< 5.0 (EVOH/PVDC High Barrier to suppress aerobic spoilage flora)';
  } else if (input.shelf_life > 180) {
    target_OTR = '< 2.0 (Long shelf-life barrier standard)';
  } else {
    target_OTR = '< 15 - 30 (Standard barrier protection)';
  }

  // 2. WVTR calculation
  let target_WVTR: string;
  if (isDryCrisp || (input.moisture < 10 && input.humidity > 50)) {
    target_WVTR = '< 0.5 - 1.2 (Ultra-low moisture ingress barrier to prevent loss of crispness)';
  } else if (isHighMoisturePerishable) {
    target_WVTR = '< 2.0 - 5.0 (Anti-desiccation moisture retention barrier)';
  } else if (isFreshProduce) {
    target_WVTR = '10 - 25 (Anti-fog condensation dispersing microporous)';
  } else if (input.category === 'Frozen') {
    target_WVTR = '< 1.0 (Cryogenic moisture retention to prevent freezer burn)';
  } else {
    target_WVTR = '< 2.5 - 5.0';
  }

  // 3. Recommended Materials & Layer Structures
  let materials: PackOutput['recommended_materials'] = [];
  let sealRange = '115 - 145 °C';
  let tensileStrength = '≥ 45 MPa';

  if (isFreshProduce) {
    if (input.respiration_rate > 50) {
      materials = [
        {
          layer_structure: 'BOPP Anti-Fog (25µm) / Laser Micro-perforated LDPE (30µm)',
          material_type: 'BOPP / LDPE breathable composite',
          film_thickness_microns: 55,
          suitability_reason: `Formulated specifically for Fresh Produce with high respiration (${input.respiration_rate} mL O2/kg·h). Never 100% impermeable: utilizes calibrated micro-perforations to prevent anaerobic ethanol fermentation while retaining moisture.`
        },
        {
          layer_structure: 'Bio-based PLA / PBAT breathable compostable mono-film',
          material_type: 'Bio-PLA / PBAT blend',
          film_thickness_microns: 40,
          suitability_reason: 'MoFPI green packaging initiative standard: naturally high gas transmission rate matching physiological respiration and zero micro-plastic residue.'
        }
      ];
      sealRange = '105 - 130 °C';
      tensileStrength = '≥ 28 MPa';
    } else {
      materials = [
        {
          layer_structure: 'Macro/Micro-vented Cast Polypropylene (CPP) / LDPE',
          material_type: 'CPP / LDPE engineered breathable web',
          film_thickness_microns: 45,
          suitability_reason: 'Provides anti-fog optics and controlled gaseous exchange matching moderate respiration rates to retard ripening without off-odors.'
        }
      ];
      sealRange = '110 - 135 °C';
      tensileStrength = '≥ 32 MPa';
    }
  } else if (isHighFat) {
    if (input.shelf_life > 90) {
      materials = [
        {
          layer_structure: 'BOPET (12µm) / Al-Foil (9µm) / Polyethylene Tie (15µm) / Metallocene LLDPE (50µm)',
          material_type: 'PET / Foil / mLLDPE 4-tier hermetic barrier',
          film_thickness_microns: 86,
          suitability_reason: `High fat content (${input.fat}%) demands rigorous protection against free radical rancidity and lipid peroxidation; Al-foil provides 0.00 OTR and 0.00 WVTR transmission with mLLDPE for hermetic hot-tack sealing.`
        },
        {
          layer_structure: 'BOPP (20µm) / Metallized PET (12µm) / Cast Polypropylene (35µm)',
          material_type: 'Met-BOPET / CPP high barrier',
          film_thickness_microns: 67,
          suitability_reason: 'Economical alternative to foil: met-barrier reduces OTR < 1.0 cc/m²/day while providing high puncture and grease resistance against free fats.'
        }
      ];
      sealRange = '130 - 165 °C';
      tensileStrength = '≥ 55 MPa';
    } else {
      materials = [
        {
          layer_structure: 'BOPET (12µm) / EVOH-coated PE (40µm) / LLDPE (30µm)',
          material_type: 'PET / EVOH / PE recyclable structure',
          film_thickness_microns: 82,
          suitability_reason: 'EVOH core provides OTR < 2.0 to protect fats while maintaining chlorine-free recyclable potential under MoFPI sustainable waste norms.'
        }
      ];
      sealRange = '120 - 150 °C';
      tensileStrength = '≥ 48 MPa';
    }
  } else if (input.category === 'Meat/Poultry') {
    materials = [
      {
        layer_structure: 'PA (Nylon 20µm) / EVOH (5µm) / Tie / mPE Sealant (60µm)',
        material_type: 'PA / EVOH / PE 7-layer co-extruded thermoforming web',
        film_thickness_microns: 95,
        suitability_reason: 'Polyamide ensures high puncture resistance against bones; EVOH creates impermeable oxygen barrier to suppress aerobic bacterial spoilage.'
      }
    ];
    sealRange = '125 - 155 °C';
    tensileStrength = '≥ 65 MPa';
  } else if (input.category === 'Frozen') {
    materials = [
      {
        layer_structure: 'Biaxially Oriented Nylon (BOPA 15µm) / Low-temp Impact EVA / LDPE (60µm)',
        material_type: 'BOPA / EVA / PE cold-crack resistant composite',
        film_thickness_microns: 75,
        suitability_reason: `Tailored for ${input.temp}°C frozen logistics: prevents embrittlement, pinhole flex-cracking, and cryogenic moisture loss (freezer burn).`
      }
    ];
    sealRange = '115 - 140 °C';
    tensileStrength = '≥ 50 MPa';
  } else if (isDryCrisp) {
    materials = [
      {
        layer_structure: 'BOPP (20µm) / Metallized BOPP (20µm) / Extrusion PE (15µm)',
        material_type: 'BOPP / Met-BOPP / PE duplex crisp laminate',
        film_thickness_microns: 55,
        suitability_reason: 'Dual BOPP layers offer moisture barrier WVTR < 1.0 g/m²/day to keep water activity aw < 0.35, preserving crispy texture and preventing oil oxidative off-notes.'
      }
    ];
    sealRange = '110 - 135 °C';
    tensileStrength = '≥ 40 MPa';
  } else {
    materials = [
      {
        layer_structure: 'BOPET (12µm) / Co-ex LDPE (40µm)',
        material_type: 'PET / LDPE standard retortable/stand-up pouch',
        film_thickness_microns: 52,
        suitability_reason: 'MoFPI compliant general food-grade pouch structure offering good optical clarity, mechanical strength, and moisture protection.'
      }
    ];
    sealRange = '120 - 145 °C';
    tensileStrength = '≥ 42 MPa';
  }

  // 4. MAP Requirements
  let isMAP = false;
  let o2_pct = '0%';
  let co2_pct = '0%';
  let n2_pct = '100% (Balance)';
  let perforation: PackOutput['MAP_requirements']['perforation_type'] = 'None';

  if (isFreshProduce) {
    isMAP = true;
    if (input.respiration_rate > 50) {
      o2_pct = '3 - 5%';
      co2_pct = '5 - 8%';
      n2_pct = '87 - 92% (Balance)';
      perforation = 'Micro-perforated';
    } else if (input.respiration_rate > 20) {
      o2_pct = '5 - 8%';
      co2_pct = '4 - 6%';
      n2_pct = '86 - 91% (Balance)';
      perforation = 'Micro-perforated';
    } else {
      o2_pct = '8 - 12%';
      co2_pct = '2 - 5%';
      n2_pct = '83 - 90% (Balance)';
      perforation = 'Micro-perforated';
    }
  } else if (input.category === 'Meat/Poultry') {
    isMAP = true;
    o2_pct = '0% (< 0.5% for poultry/cooked; 70-80% for red meat bloom preservation)';
    co2_pct = '20 - 30% (Antimicrobial bacteriostatic action)';
    n2_pct = '70 - 80% (Inert cushion filler)';
    perforation = 'None';
  } else if (input.category === 'Bakery') {
    isMAP = true;
    o2_pct = '< 0.5% (Oxygen scavenging to inhibit mold/aspergillus)';
    co2_pct = '25 - 40% (Fungistatic mold inhibition)';
    n2_pct = '60 - 75% (Volumetric anti-collapse)';
    perforation = 'None';
  } else if (isHighFat || isDryCrisp) {
    isMAP = true;
    o2_pct = '< 0.5% (Residual oxygen flushed below 1% to stop lipid oxidation)';
    co2_pct = '0 - 10%';
    n2_pct = '90 - 100% (High-purity Nitrogen cushion to prevent breakage and rancidity)';
    perforation = 'None';
  } else {
    isMAP = input.shelf_life > 30;
    o2_pct = '< 1%';
    co2_pct = '10 - 20%';
    n2_pct = '80 - 90%';
    perforation = 'None';
  }

  // 5. Sustainability Score
  let eco_alt = 'Recyclable Mono-PE or MDO-PE pouch with barrier coating';
  let recGrade: 'A' | 'B' | 'C' = 'B';
  let carbonImpact: 'Low' | 'Medium' | 'High' = 'Medium';

  if (isFreshProduce) {
    eco_alt = 'Certified Home-Compostable PLA / PBAT Bio-polymer micro-perforated film';
    recGrade = 'A';
    carbonImpact = 'Low';
  } else if (isHighFat && input.shelf_life > 180) {
    eco_alt = 'High-barrier AlOx-coated Mono-MDO-PE (Fully recyclable in PE stream, replaces Al-Foil)';
    recGrade = 'B';
    carbonImpact = 'Medium';
  } else if (input.category === 'Frozen') {
    eco_alt = 'All-PE recyclable mono-material film with metallocene toughness';
    recGrade = 'A';
    carbonImpact = 'Low';
  } else {
    eco_alt = 'Paper-based PE extrusion barrier pouch or mono-PP retort pouch';
    recGrade = 'B';
    carbonImpact = 'Medium';
  }

  const summary = `MoFPI Compliant Barrier Formulation for ${input.commodity_name}: ` +
    (isFreshProduce
      ? `Fresh produce with respiration rate of ${input.respiration_rate} mL O2/kg·h requires engineered permeable micro-perforated film (${perforation}) with controlled O2 (${o2_pct}) and CO2 (${co2_pct}) flush to halt senescence while completely avoiding anaerobic fermentation.`
      : isHighFat
      ? `High-fat matrix (${input.fat}%) stored at ${input.temp}°C requires critical oxygen barrier (OTR < 10 cc/m²/24h) and high-purity N2 flush (< 0.5% residual O2) to arrest lipid peroxidation and rancidity.`
      : isDryCrisp
      ? `Dry food product sensitive to moisture absorption requires WVTR < 1.5 g/m²/24h and nitrogen pillow gas-flush to safeguard crispness and structural integrity.`
      : `Optimized multi-barrier structure calibrated for target shelf life of ${input.shelf_life} days under ${input.storage_mode} (${input.temp}°C / ${input.humidity}% RH) conditions.`);

  const primaryThickness = materials[0]?.film_thickness_microns || 60;
  const costAnalysis = computePackagingCost(input, primaryThickness, isMAP, input.category, perforation);

  return {
    recommendation_summary: summary,
    recommended_materials: materials,
    technical_specifications: {
      target_OTR_cc_m2_day: target_OTR,
      target_WVTR_g_m2_day: target_WVTR,
      sealability_temp_range_C: sealRange,
      tensile_strength_MPa: tensileStrength
    },
    MAP_requirements: {
      is_MAP_recommended: isMAP,
      gas_composition: {
        O2_percent: o2_pct,
        CO2_percent: co2_pct,
        N2_percent: n2_pct
      },
      perforation_type: perforation
    },
    sustainability_score: {
      eco_friendly_alternative: eco_alt,
      recyclability_grade: recGrade,
      carbon_footprint_impact: carbonImpact
    },
    packaging_cost_analysis: costAnalysis,
    mofpi_compliance_notes: {
      is_standards: [
        'IS 9845 (Overall Migration Limits for Plastics in contact with Foodstuffs)',
        'IS 10146 (Polyethylene for food contact)',
        'IS 10141 (BOPP for food packaging)',
        'FSSAI Packaging Regulations, 2018 (Schedule I & II)'
      ],
      fssai_regulations: 'Compliant with FSSAI Section 16 & MoFPI Cold Chain Value Addition Scheme norms.',
      storage_precautions: [
        `Maintain continuous temperature monitoring at ${input.temp}°C ± 1°C`,
        `Pre-cool to target core temp prior to gas flushing to prevent thermal condensation`,
        `Inspect seal integrity and residual headspace oxygen level weekly`
      ],
      shelf_life_extension_factor: `${Math.round((input.shelf_life * (isMAP ? 2.4 : 1.5)))} days estimated extended shelf life under recommended barrier regimen`
    }
  };
}

// API Route for recommendation
app.post('/api/recommend', async (req, res) => {
  try {
    const input: PackInput = req.body;
    const useAi: boolean = Boolean(req.body.useAi && aiClient);

    // Baseline calculation from rule engine
    const baseline = computeMoFPIRuleEngine(input);

    if (!useAi || !aiClient) {
      return res.json({
        ...baseline,
        engine_source: 'MoFPI Deterministic Engineering Rule Engine'
      });
    }

    // Call Gemini API for enhanced packaging science
    const prompt = `You are "PackAI", an expert Food Packaging & Barrier Material Recommendation Engine working under the guidelines of the Ministry of Food Processing Industries (MoFPI).

Your task is to analyze food commodity attributes and storage conditions, then output optimized packaging materials, barrier specifications, and Modified Atmosphere Packaging (MAP) parameters.

### INPUT DATA:
- Commodity Name: ${input.commodity_name}
- Category: ${input.category}
- Moisture Content (%): ${input.moisture}
- Oil/Fat Content (%): ${input.fat}
- Respiration Rate (mL O2/kg·h): ${input.respiration_rate}
- Target Shelf Life (Days): ${input.shelf_life}
- Storage Temp (°C): ${input.temp}
- Ambient Relative Humidity (%): ${input.humidity}
- Storage Mode: ${input.storage_mode}
- Target Pack Size (Net Weight): ${input.pack_size_grams || 500}g
- Production Batch Volume: ${input.batch_volume_units || 10000} units
- Commodity Retail Selling Price: INR ₹${input.commodity_retail_price || 150}

### CONSTRAINTS & COMPUTATION RULES:
1. High Fat (>10%): Requires low OTR (<10 cc/m²/24h/atm) to prevent rancidity.
2. High Moisture / Dry Crisps: Requires low WVTR (<1.5 g/m²/24h) to avoid soggy texture.
3. Fresh Produce: NEVER select 100% impermeable barriers. Require micro-perforated films or breathable polymers (LDPE/PLA) to match respiration rate and avoid anaerobic fermentation.
4. MAP Gas Flush: Balance O2 and CO2 ratios specifically for respiration control if Category = "Fresh Produce".

### EXPECTED OUTPUT FORMAT (JSON ONLY, NO MARKDOWN, NO CODEBLOCK TICKS):
{
  "recommendation_summary": "Short executive summary of packaging approach.",
  "recommended_materials": [
    {
      "layer_structure": "Primary / Laminate construction (e.g., PET / Al-Foil / LDPE)",
      "material_type": "Primary polymer name",
      "film_thickness_microns": 50,
      "suitability_reason": "Explanation based on input properties"
    }
  ],
  "technical_specifications": {
    "target_OTR_cc_m2_day": "Target value or range",
    "target_WVTR_g_m2_day": "Target value or range",
    "sealability_temp_range_C": "e.g., 120-150",
    "tensile_strength_MPa": "Min mechanical strength requirement"
  },
  "MAP_requirements": {
    "is_MAP_recommended": true,
    "gas_composition": {
      "O2_percent": "e.g., 3-5%",
      "CO2_percent": "e.g., 5-10%",
      "N2_percent": "Balance"
    },
    "perforation_type": "None / Micro-perforated / Macro-perforated"
  },
  "sustainability_score": {
    "eco_friendly_alternative": "Biodegradable/Recyclable polymer suggestion (e.g., PLA film)",
    "recyclability_grade": "A / B / C",
    "carbon_footprint_impact": "Low / Medium / High"
  }
}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '';
    let parsed: PackOutput;
    try {
      parsed = JSON.parse(text);
    } catch {
      // Fallback clean
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleaned);
    }

    // Merge baseline metadata and computed cost analysis
    return res.json({
      ...parsed,
      packaging_cost_analysis: baseline.packaging_cost_analysis,
      mofpi_compliance_notes: baseline.mofpi_compliance_notes,
      engine_source: 'Gemini 3.8 Flash + MoFPI Packaging Intelligence'
    });
  } catch (error: any) {
    console.error('Error in /api/recommend:', error);
    // Graceful fallback to deterministic rule engine
    const baseline = computeMoFPIRuleEngine(req.body);
    return res.json({
      ...baseline,
      engine_source: 'MoFPI Deterministic Engineering Rule Engine (Fallback)'
    });
  }
});

// Start server and mount Vite
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`PackAI MoFPI Engine running on http://localhost:${PORT}`);
  });
}

startServer();
