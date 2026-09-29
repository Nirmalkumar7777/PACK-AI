import { PackInput, PackOutput, PackagingCostAnalysis } from '../types';

/**
 * Packaging Price & Economics Computation
 * Evaluates substrate raw material price, polymer area/weight, gas flush cost,
 * and converting/printing according to Indian flexible packaging industry benchmarks & MoFPI norms.
 */
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

  // 1. Film Area per pouch (m²) based on pack net weight
  let filmAreaSqm = 0.075; // default for 500g
  if (packSize <= 100) filmAreaSqm = 0.038;
  else if (packSize <= 250) filmAreaSqm = 0.055;
  else if (packSize <= 500) filmAreaSqm = 0.078;
  else if (packSize <= 1000) filmAreaSqm = 0.115;
  else filmAreaSqm = 0.165;

  // 2. Substrate raw material cost per kg (INR ₹/kg) & density (g/cm³)
  let materialCostPerKg = 210;
  let densityGcm3 = 0.95;

  if (category === 'High-Fat/Dairy' || input.fat > 10) {
    if (input.fat > 25 || input.shelf_life > 90) {
      materialCostPerKg = 415; // 4-tier Al-Foil barrier laminate
      densityGcm3 = 1.25;
    } else {
      materialCostPerKg = 315; // EVOH / PET
      densityGcm3 = 1.05;
    }
  } else if (category === 'Meat/Poultry') {
    materialCostPerKg = 365; // PA / EVOH 7-layer thermoforming web
    densityGcm3 = 1.15;
  } else if (category === 'Fresh Produce') {
    materialCostPerKg = 225; // Breathable BOPP/LDPE or Bio-PLA
    densityGcm3 = 0.94;
  } else if (category === 'Frozen') {
    materialCostPerKg = 295; // BOPA / EVA cold-crack resistant
    densityGcm3 = 1.02;
  } else if (category === 'Dry Goods' && input.moisture < 8) {
    materialCostPerKg = 245; // Met-BOPP crisp duplex
    densityGcm3 = 0.98;
  }

  // 3. Film weight per pouch (grams)
  // Area (m²) * Thickness (µm) * Density (g/cm³)
  const thickness = primaryThicknessMicrons || 60;
  const filmWeightGrams = Number((filmAreaSqm * thickness * densityGcm3).toFixed(2));

  // Raw substrate cost per pouch (INR ₹)
  const rawMaterialCost = Number(((filmWeightGrams / 1000) * materialCostPerKg).toFixed(2));

  // 4. MAP Gas Flush Cost per pouch (INR ₹)
  let gasCost = 0;
  if (isMAP) {
    if (category === 'Fresh Produce') {
      gasCost = 0.35; // O2/CO2 calibrated gas mix
    } else if (category === 'Meat/Poultry') {
      gasCost = 0.45; // High CO2 antimicrobial mix
    } else if (category === 'Bakery') {
      gasCost = 0.38; // CO2 / N2 mold inhibitor
    } else {
      gasCost = 0.22; // High-purity Nitrogen flush
    }
  }

  // 5. Printing, Lamination & Converting (INR ₹ per pouch)
  let convertingCost = 0.75;
  if (perforation === 'Micro-perforated' || perforation === 'Macro-perforated') {
    convertingCost += 0.25; // Laser micro-perforation line tooling
  }
  if (thickness > 80) {
    convertingCost += 0.20; // Heavy duty multi-pass lamination
  }

  // Total unit cost per pouch (INR ₹) & USD ($)
  const totalCostPerPouchINR = Number((rawMaterialCost + gasCost + convertingCost).toFixed(2));
  const totalCostPerPouchUSD = Number((totalCostPerPouchINR / 83.5).toFixed(3));
  const totalBatchCostINR = Math.round(totalCostPerPouchINR * batchVolume);

  // Percentage of commodity retail value
  const costPctOfRetail = retailPrice > 0 ? Number(((totalCostPerPouchINR / retailPrice) * 100).toFixed(1)) : 3.5;

  // MoFPI Subsidy Potential: PMKSY / PMFME provides up to 35% capital support
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

/**
 * PackAI Deterministic Rule & Calculation Engine
 * Strictly enforces all 4 MoFPI constraints & computation rules:
 * 1. High Fat (>10%): Requires low OTR (<10 cc/m²/24h/atm) to prevent rancidity.
 * 2. High Moisture / Dry Crisps: Requires low WVTR (<1.5 g/m²/24h) to avoid soggy texture.
 * 3. Fresh Produce: NEVER select 100% impermeable barriers. Require micro-perforated films or breathable polymers (LDPE/PLA) to match respiration rate and avoid anaerobic fermentation.
 * 4. MAP Gas Flush: Balance O2 and CO2 ratios specifically for respiration control if Category = "Fresh Produce".
 */
export function calculateMoFPIPackaging(input: PackInput): PackOutput {
  const isHighFat = input.fat > 10;
  const isFreshProduce = input.category === 'Fresh Produce';
  const isDryCrisp = (input.category === 'Dry Goods' && input.moisture < 8) || (input.category === 'Bakery' && input.moisture < 12);
  const isHighMoisturePerishable = input.moisture > 60 && !isFreshProduce;

  // 1. Oxygen Transmission Rate (OTR in cc/m²/24h/atm)
  let target_OTR: string;
  if (isFreshProduce) {
    if (input.respiration_rate > 50) {
      target_OTR = '1800 - 3500 (Breathable / Laser Micro-perforated)';
    } else if (input.respiration_rate > 20) {
      target_OTR = '800 - 1500 (Controlled Permeability)';
    } else {
      target_OTR = '350 - 800 (Low-medium Respiration Breathable)';
    }
  } else if (isHighFat) {
    // Constraint 1: High Fat (>10%) requires low OTR (<10 cc/m²/24h/atm)
    if (input.fat > 30 || input.shelf_life > 120) {
      target_OTR = '< 1.5 - 3.0 (Ultra-low OTR barrier to arrest lipid rancidity)';
    } else {
      target_OTR = '< 5.0 - 8.0 (Low OTR to prevent lipid oxidation)';
    }
  } else if (input.category === 'Meat/Poultry') {
    target_OTR = '< 5.0 (High EVOH barrier to inhibit aerobic flora)';
  } else if (input.shelf_life > 180) {
    target_OTR = '< 2.0 (Long shelf-life hermetic barrier)';
  } else {
    target_OTR = '< 15 - 30 (Standard food packaging barrier)';
  }

  // 2. Water Vapor Transmission Rate (WVTR in g/m²/24h)
  let target_WVTR: string;
  if (isDryCrisp) {
    // Constraint 2: High Moisture / Dry Crisps requires low WVTR (<1.5 g/m²/24h) to avoid soggy texture
    target_WVTR = '< 0.5 - 1.2 (Ultra-low WVTR to avoid soggy texture and maintain crispness)';
  } else if (isHighMoisturePerishable) {
    target_WVTR = '< 2.0 - 5.0 (Anti-desiccation moisture retention barrier)';
  } else if (isFreshProduce) {
    target_WVTR = '10 - 25 (Condensation-dissipating anti-fog barrier)';
  } else if (input.category === 'Frozen') {
    target_WVTR = '< 1.0 (Cryogenic moisture barrier to prevent freezer burn)';
  } else {
    target_WVTR = '< 2.5 - 5.0';
  }

  // 3. Recommended Materials & Layer Structures
  let materials: PackOutput['recommended_materials'] = [];
  let sealRange = '120 - 150 °C';
  let tensileStrength = '≥ 45 MPa';

  if (isFreshProduce) {
    // Constraint 3: NEVER select 100% impermeable barriers. Require micro-perforated films or breathable polymers
    if (input.respiration_rate > 45) {
      materials = [
        {
          layer_structure: 'BOPP Anti-Fog (25µm) / Laser Micro-perforated LDPE (30µm)',
          material_type: 'BOPP / LDPE breathable composite',
          film_thickness_microns: 55,
          suitability_reason: `Fresh produce with respiration rate of ${input.respiration_rate} mL O2/kg·h. Formulated with calibrated 60µm micro-perforations to match biological respiration, preventing fatal anaerobic ethanol fermentation while curbing moisture loss.`
        },
        {
          layer_structure: 'Bio-based PLA / PBAT breathable compostable mono-film',
          material_type: 'Bio-PLA / PBAT blend',
          film_thickness_microns: 40,
          suitability_reason: 'Eco-certified biodegradable polymer with inherent high gas permeability, ideal for export-grade organic horticulture under MoFPI green standards.'
        }
      ];
      sealRange = '105 - 130 °C';
      tensileStrength = '≥ 28 MPa';
    } else {
      materials = [
        {
          layer_structure: 'Anti-Fog Treated Cast Polypropylene (CPP 25µm) / LDPE (25µm)',
          material_type: 'CPP / LDPE breathable pouch',
          film_thickness_microns: 50,
          suitability_reason: 'Permeable co-polymer web prevents moisture droplet fogging and maintains equilibrium modified atmosphere (EMA) for moderate respiration rates.'
        }
      ];
      sealRange = '115 - 135 °C';
      tensileStrength = '≥ 32 MPa';
    }
  } else if (isHighFat) {
    if (input.shelf_life > 90 || input.fat > 25) {
      materials = [
        {
          layer_structure: 'BOPET (12µm) / Al-Foil (9µm) / Polyethylene Tie (15µm) / Metallocene LLDPE (50µm)',
          material_type: 'PET / Foil / mLLDPE 4-ply barrier laminate',
          film_thickness_microns: 86,
          suitability_reason: `High fat content (${input.fat}%) triggers rapid lipid auto-oxidation upon light and O2 exposure. Pure aluminum foil foil-core provides absolute zero OTR and UV barrier, with mLLDPE for hermetic contamination-resistant seals.`
        },
        {
          layer_structure: 'BOPP (20µm) / Metallized PET (12µm) / Cast Polypropylene (35µm)',
          material_type: 'Met-BOPET / CPP high barrier',
          film_thickness_microns: 67,
          suitability_reason: 'Cost-effective alternative to foil with OTR < 1.0 cc/m²/day and exceptional grease barrier against free fatty oils.'
        }
      ];
      sealRange = '130 - 165 °C';
      tensileStrength = '≥ 55 MPa';
    } else {
      materials = [
        {
          layer_structure: 'BOPET (12µm) / EVOH-PE Barrier (40µm) / LLDPE (30µm)',
          material_type: 'PET / EVOH / PE recyclable structure',
          film_thickness_microns: 82,
          suitability_reason: 'High-barrier EVOH core maintains OTR < 2.0 cc/m²/day to shield fat from rancidity without requiring metal foil, enabling metal detector line passage.'
        }
      ];
      sealRange = '120 - 150 °C';
      tensileStrength = '≥ 48 MPa';
    }
  } else if (input.category === 'Meat/Poultry') {
    materials = [
      {
        layer_structure: 'PA (Nylon 20µm) / EVOH (5µm) / Adhesive Tie / mPE Sealant (60µm)',
        material_type: 'PA / EVOH / PE 7-layer co-extruded thermoforming film',
        film_thickness_microns: 95,
        suitability_reason: 'Biaxially oriented polyamide offers puncture resistance against sharp bone fragments; EVOH locks out oxygen to prevent bacterial spoilage by Pseudomonas.'
      }
    ];
    sealRange = '125 - 155 °C';
    tensileStrength = '≥ 65 MPa';
  } else if (input.category === 'Frozen') {
    materials = [
      {
        layer_structure: 'BOPA (Nylon 15µm) / Low-temp Impact EVA / LDPE (60µm)',
        material_type: 'BOPA / EVA / PE cold-crack resistant composite',
        film_thickness_microns: 75,
        suitability_reason: `Engineered for sub-zero (${input.temp}°C) cold storage: EVA copolymer prevents brittle fracture and pinholing while blocking sublimation to prevent freezer burn.`
      }
    ];
    sealRange = '115 - 140 °C';
    tensileStrength = '≥ 50 MPa';
  } else if (isDryCrisp) {
    materials = [
      {
        layer_structure: 'BOPP (20µm) / Metallized BOPP (20µm) / Cast Polypropylene (20µm)',
        material_type: 'BOPP / Met-BOPP / CPP triplex crisp laminate',
        film_thickness_microns: 60,
        suitability_reason: 'Engineered for dry snacks (moisture < 8%): high water vapor barrier (WVTR < 1.0 g/m²/day) stops ambient moisture uptake to preserve signature crisp acoustic texture.'
      }
    ];
    sealRange = '115 - 140 °C';
    tensileStrength = '≥ 42 MPa';
  } else {
    materials = [
      {
        layer_structure: 'BOPET (12µm) / Co-extruded LDPE (40µm)',
        material_type: 'PET / LDPE standard retort/stand-up pouch',
        film_thickness_microns: 52,
        suitability_reason: 'Standard MoFPI compliant general food-grade pouch structure offering good optical clarity, mechanical strength, and moisture protection.'
      }
    ];
    sealRange = '120 - 145 °C';
    tensileStrength = '≥ 40 MPa';
  }

  // 4. MAP Requirements (Constraint 4: Balance O2 and CO2 ratios specifically for respiration control if Category = "Fresh Produce")
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
    o2_pct = '< 0.5% (Poultry/Cooked meats; or 70-80% for Fresh Red Beef oxymyoglobin bloom)';
    co2_pct = '20 - 30% (Bacteriostatic inhibition of Gram-negative bacteria)';
    n2_pct = '70 - 80% (Inert anti-collapse pillow gas)';
    perforation = 'None';
  } else if (input.category === 'Bakery') {
    isMAP = true;
    o2_pct = '< 0.5% (Strict oxygen exclusion to arrest mold germination)';
    co2_pct = '25 - 40% (Fungistatic mold inhibition)';
    n2_pct = '60 - 75% (Volumetric pillow fill)';
    perforation = 'None';
  } else if (isHighFat || isDryCrisp) {
    isMAP = true;
    o2_pct = '< 0.5% (Residual oxygen purged below 1% to arrest lipid oxidation)';
    co2_pct = '0 - 10%';
    n2_pct = '90 - 100% (High-purity Nitrogen cushion to prevent transit breakage & rancidity)';
    perforation = 'None';
  } else {
    isMAP = input.shelf_life > 30;
    o2_pct = '< 1%';
    co2_pct = '10 - 20%';
    n2_pct = '80 - 90%';
    perforation = 'None';
  }

  // 5. Sustainability Score
  let eco_alt = 'Recyclable Mono-PE or MDO-PE pouch with EVOH barrier coating';
  let recGrade: 'A' | 'B' | 'C' = 'B';
  let carbonImpact: 'Low' | 'Medium' | 'High' = 'Medium';

  if (isFreshProduce) {
    eco_alt = 'Certified Home-Compostable PLA / PBAT Bio-polymer micro-perforated film';
    recGrade = 'A';
    carbonImpact = 'Low';
  } else if (isHighFat && input.shelf_life > 180) {
    eco_alt = 'High-barrier AlOx-coated Mono-MDO-PE (Fully recyclable in PE stream #4, replaces Al-Foil)';
    recGrade = 'B';
    carbonImpact = 'Medium';
  } else if (input.category === 'Frozen') {
    eco_alt = 'All-PE recyclable mono-material film with metallocene cold-impact toughness';
    recGrade = 'A';
    carbonImpact = 'Low';
  } else {
    eco_alt = 'Paper-based PE extrusion barrier pouch or mono-PP retortable pouch';
    recGrade = 'B';
    carbonImpact = 'Medium';
  }

  const summary = `MoFPI Compliant Barrier Formulation for ${input.commodity_name}: ` +
    (isFreshProduce
      ? `Fresh produce with respiration rate of ${input.respiration_rate} mL O2/kg·h requires engineered breathable micro-perforated film (${perforation}) with controlled O2 (${o2_pct}) and CO2 (${co2_pct}) flush to retard metabolic senescence while strictly preventing anaerobic off-odor fermentation.`
      : isHighFat
      ? `High-fat matrix (${input.fat}%) stored at ${input.temp}°C mandates an ultra-low oxygen transmission barrier (OTR < 10 cc/m²/24h) and high-purity N2 gas purge (< 0.5% residual O2) to arrest lipid peroxidation and rancidity.`
      : isDryCrisp
      ? `Moisture-sensitive crisp product requires tight WVTR (< 1.5 g/m²/24h) and inert nitrogen cushion flush to prevent soggy loss-of-crispness and physical breakage.`
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
        'IS 9845: Limits for Overall Migration of constituents in plastics',
        'IS 10146: Polyethylene for safe food contact and storage',
        'IS 10141: Biaxially Oriented Polypropylene (BOPP) food film',
        'FSSAI Packaging Regulations 2018 (Section 16, Schedules I & II)'
      ],
      fssai_regulations: 'Compliant with FSSAI Section 16 & MoFPI Cold Chain Value Addition Scheme norms.',
      storage_precautions: [
        `Maintain continuous temperature monitoring at ${input.temp}°C ± 1°C without break in cold chain`,
        `Pre-cool produce to target core temperature prior to gas flushing to avoid condensation`,
        `Inspect seal integrity and residual headspace oxygen level weekly (ASTM F3136)`
      ],
      shelf_life_extension_factor: `${Math.round((input.shelf_life * (isMAP ? 2.4 : 1.5)))} days estimated extended shelf life under recommended barrier regimen`
    },
    engine_source: 'MoFPI Deterministic Engineering Rule Engine'
  };
}
