export type FoodCategory =
  | 'Fresh Produce'
  | 'Dry Goods'
  | 'High-Fat/Dairy'
  | 'Frozen'
  | 'Bakery'
  | 'Meat/Poultry';

export type StorageMode = 'Ambient' | 'Chilled' | 'Frozen';

export type AppTheme = 'normal' | 'dark' | 'food';

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
  category: FoodCategory;
  moisture: number; // %
  fat: number; // %
  respiration_rate: number; // mL O2/kg·h
  shelf_life: number; // Days
  temp: number; // °C
  humidity: number; // % RH
  storage_mode: StorageMode;
  // Packaging Price & Economic Parameters (MoFPI Scheme)
  pack_size_grams: number; // Net weight per unit, e.g. 500g
  batch_volume_units: number; // Production run volume, e.g. 10000 units
  commodity_retail_price: number; // Retail selling price per unit in INR ₹, e.g. 150
  target_packaging_budget_per_unit?: number; // Target packaging price ceiling in INR ₹, e.g. 4.50
}

export interface RecommendedMaterial {
  layer_structure: string;
  material_type: string;
  film_thickness_microns: number;
  suitability_reason: string;
}

export interface TechnicalSpecifications {
  target_OTR_cc_m2_day: string;
  target_WVTR_g_m2_day: string;
  sealability_temp_range_C: string;
  tensile_strength_MPa: string;
}

export interface MAPRequirements {
  is_MAP_recommended: boolean;
  gas_composition: {
    O2_percent: string;
    CO2_percent: string;
    N2_percent: string;
  };
  perforation_type: 'None' | 'Micro-perforated' | 'Macro-perforated';
}

export interface SustainabilityScore {
  eco_friendly_alternative: string;
  recyclability_grade: 'A' | 'B' | 'C';
  carbon_footprint_impact: 'Low' | 'Medium' | 'High';
}

export interface MoFPIComplianceNotes {
  is_standards: string[];
  fssai_regulations: string;
  storage_precautions: string[];
  shelf_life_extension_factor: string;
}

export interface PackOutput {
  recommendation_summary: string;
  recommended_materials: RecommendedMaterial[];
  technical_specifications: TechnicalSpecifications;
  MAP_requirements: MAPRequirements;
  sustainability_score: SustainabilityScore;
  packaging_cost_analysis?: PackagingCostAnalysis;
  mofpi_compliance_notes?: MoFPIComplianceNotes;
  engine_source?: string;
}

export interface CommodityPreset {
  id: string;
  name: string;
  category: FoodCategory;
  description: string;
  icon: string;
  data: PackInput;
  keyChallenge: string;
}

export interface CommodityHistoryItem {
  id: string;
  timestamp: number;
  input: PackInput;
  output: PackOutput;
}
