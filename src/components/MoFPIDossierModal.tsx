import React from 'react';
import { PackInput, PackOutput } from '../types';
import { X, Printer, Award, FileCheck, CheckCircle, Shield } from 'lucide-react';

interface MoFPIDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  input: PackInput;
  output: PackOutput;
}

export const MoFPIDossierModal: React.FC<MoFPIDossierModalProps> = ({
  isOpen,
  onClose,
  input,
  output
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-200">
        {/* Modal Controls Header */}
        <div className="sticky top-0 bg-slate-950/90 backdrop-blur border-b border-slate-800 px-6 py-3 flex items-center justify-between z-10 print:hidden">
          <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            Official MoFPI Food Packaging Technical Dossier
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Content */}
        <div className="p-8 space-y-6 print:p-0 print:text-black">
          {/* Official Letterhead */}
          <div className="border-b-2 border-emerald-600 pb-5 text-center space-y-1">
            <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Government of India • Ministry of Food Processing Industries (MoFPI)
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Food Packaging & Barrier Specification Dossier
            </h2>
            <div className="text-xs text-slate-400 flex items-center justify-center gap-4 pt-1 font-mono">
              <span>Doc Ref: MOFPI-PACKAI-{Date.now().toString().slice(-6)}</span>
              <span>•</span>
              <span>Date: {currentDate}</span>
              <span>•</span>
              <span>Compliance: FSSAI Packaging Reg. 2018</span>
            </div>
          </div>

          {/* Section 1: Commodity Profile */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck className="w-4 h-4" />
              1. Food Commodity Profile & Storage Regime
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block">Commodity Name</span>
                <span className="font-bold text-white text-sm">{input.commodity_name}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Category</span>
                <span className="font-bold text-white">{input.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Moisture Content</span>
                <span className="font-bold text-cyan-400">{input.moisture}%</span>
              </div>
              <div>
                <span className="text-slate-400 block">Oil / Fat Content</span>
                <span className="font-bold text-amber-400">{input.fat}%</span>
              </div>
              <div>
                <span className="text-slate-400 block">Respiration Rate</span>
                <span className="font-bold text-emerald-400">{input.respiration_rate} mL O2/kg·h</span>
              </div>
              <div>
                <span className="text-slate-400 block">Target Shelf Life</span>
                <span className="font-bold text-white">{input.shelf_life} Days</span>
              </div>
              <div>
                <span className="text-slate-400 block">Storage Temperature</span>
                <span className="font-bold text-cyan-300">{input.temp}°C ({input.storage_mode})</span>
              </div>
              <div>
                <span className="text-slate-400 block">Ambient Humidity</span>
                <span className="font-bold text-blue-300">{input.humidity}% RH</span>
              </div>
              <div>
                <span className="text-slate-400 block">Unit Net Weight</span>
                <span className="font-bold text-emerald-400">{input.pack_size_grams || 500}g</span>
              </div>
              <div>
                <span className="text-slate-400 block">Retail Selling Price</span>
                <span className="font-bold text-amber-400">₹{input.commodity_retail_price || 150}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Batch Volume</span>
                <span className="font-bold text-cyan-400">{(input.batch_volume_units || 10000).toLocaleString('en-IN')} units</span>
              </div>
              <div>
                <span className="text-slate-400 block">Packaging Budget</span>
                <span className="font-bold text-purple-400">{input.target_packaging_budget_per_unit ? `₹${input.target_packaging_budget_per_unit}` : 'Open'}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              2. Executive Recommendation Summary
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs leading-relaxed text-slate-300">
              {output.recommendation_summary}
            </div>
          </div>

          {/* Section 3: Laminate Engineering */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
              3. Engineered Laminate Architecture
            </h3>
            <div className="space-y-2.5">
              {output.recommended_materials.map((mat, idx) => (
                <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between font-bold text-white">
                    <span>{mat.material_type}</span>
                    <span className="font-mono text-emerald-400">{mat.film_thickness_microns} µm</span>
                  </div>
                  <div className="font-mono text-[11px] text-cyan-300 bg-slate-900 p-2 rounded">
                    Structure: {mat.layer_structure}
                  </div>
                  <p className="text-slate-400 text-[11px]">{mat.suitability_reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Technical & MAP Requirements */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
              4. Technical & MAP Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-semibold">Gas Barrier Permeability Targets</span>
                <div>OTR: <span className="font-mono font-bold text-white">{output.technical_specifications.target_OTR_cc_m2_day}</span></div>
                <div>WVTR: <span className="font-mono font-bold text-white">{output.technical_specifications.target_WVTR_g_m2_day}</span></div>
                <div>Hot Tack Window: <span className="font-mono text-amber-300">{output.technical_specifications.sealability_temp_range_C}</span></div>
                <div>Tensile: <span className="font-mono text-purple-300">{output.technical_specifications.tensile_strength_MPa}</span></div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-semibold">Modified Atmosphere Formulation</span>
                <div>MAP Status: <span className="font-bold text-emerald-400">{output.MAP_requirements.is_MAP_recommended ? 'Mandatory' : 'Optional'}</span></div>
                <div>Oxygen (O2): <span className="font-mono text-cyan-300">{output.MAP_requirements.gas_composition.O2_percent}</span></div>
                <div>Carbon Dioxide (CO2): <span className="font-mono text-emerald-300">{output.MAP_requirements.gas_composition.CO2_percent}</span></div>
                <div>Nitrogen (N2): <span className="font-mono text-indigo-300">{output.MAP_requirements.gas_composition.N2_percent}</span></div>
                <div>Perforation: <span className="font-mono text-white">{output.MAP_requirements.perforation_type}</span></div>
              </div>
            </div>
          </div>

          {/* Section 5: Commercial Packaging Economics & Price Assessment */}
          {output.packaging_cost_analysis && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                <span>5. Commercial Packaging Economics & MoFPI Scheme Assessment</span>
                <span className="text-xs font-mono font-normal text-slate-400">PMKSY / PMFME Guideline Norms</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block">Unit Packaging Price</span>
                  <span className="font-extrabold text-emerald-400 text-base font-mono">
                    ₹{output.packaging_cost_analysis.estimated_cost_per_pouch_inr.toFixed(2)}{' '}
                    <span className="text-xs font-normal text-slate-400">(${output.packaging_cost_analysis.estimated_cost_per_pouch_usd})</span>
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Batch Production Cost</span>
                  <span className="font-extrabold text-white text-base font-mono">
                    ₹{output.packaging_cost_analysis.total_batch_cost_inr.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">% of Commodity Retail Price</span>
                  <span className="font-extrabold text-amber-400 text-base font-mono">
                    {output.packaging_cost_analysis.packaging_cost_percentage_of_retail}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">MoFPI Capital Subsidy (35%)</span>
                  <span className="font-extrabold text-emerald-300 text-base font-mono">
                    ₹{output.packaging_cost_analysis.mofpi_subsidy_potential_inr.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 flex flex-wrap justify-between gap-2 font-mono text-[11px]">
                <span>Film Substrate: ₹{output.packaging_cost_analysis.raw_material_cost_per_pouch_inr} (@ ₹{output.packaging_cost_analysis.film_material_cost_per_kg_inr}/kg)</span>
                <span>•</span>
                <span>Print & Converting: ₹{output.packaging_cost_analysis.printing_and_converting_cost_inr}</span>
                <span>•</span>
                <span>MAP Gas Flushing: ₹{output.packaging_cost_analysis.gas_flush_cost_per_pouch_inr}</span>
                <span>•</span>
                <span className="text-emerald-400">Tier: {output.packaging_cost_analysis.cost_tier}</span>
              </div>
            </div>
          )}

          {/* Section 6: Statutory Standards & Sign-off */}
          <div className="border-t border-slate-800 pt-4 text-xs text-slate-400 space-y-2">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span>Verified under Indian Standard IS 9845 Migration Limits</span>
              <span>MoFPI Quality Standard Seal</span>
            </div>
            <p className="text-[10px] text-slate-500">
              This technical document is generated by PackAI under Ministry of Food Processing Industries specifications for post-harvest loss reduction, cold chain optimization, and export packaging quality assurance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
