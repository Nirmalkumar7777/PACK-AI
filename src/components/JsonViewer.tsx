import React, { useState } from 'react';
import { PackOutput } from '../types';
import { Code2, Copy, Check, Download, ExternalLink } from 'lucide-react';

interface JsonViewerProps {
  data: PackOutput;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  // Extract strict JSON schema per user specification
  const strictOutput = {
    recommendation_summary: data.recommendation_summary,
    recommended_materials: data.recommended_materials.map((m) => ({
      layer_structure: m.layer_structure,
      material_type: m.material_type,
      film_thickness_microns: m.film_thickness_microns,
      suitability_reason: m.suitability_reason
    })),
    technical_specifications: {
      target_OTR_cc_m2_day: data.technical_specifications.target_OTR_cc_m2_day,
      target_WVTR_g_m2_day: data.technical_specifications.target_WVTR_g_m2_day,
      sealability_temp_range_C: data.technical_specifications.sealability_temp_range_C,
      tensile_strength_MPa: data.technical_specifications.tensile_strength_MPa
    },
    MAP_requirements: {
      is_MAP_recommended: data.MAP_requirements.is_MAP_recommended,
      gas_composition: {
        O2_percent: data.MAP_requirements.gas_composition.O2_percent,
        CO2_percent: data.MAP_requirements.gas_composition.CO2_percent,
        N2_percent: data.MAP_requirements.gas_composition.N2_percent
      },
      perforation_type: data.MAP_requirements.perforation_type
    },
    sustainability_score: {
      eco_friendly_alternative: data.sustainability_score.eco_friendly_alternative,
      recyclability_grade: data.sustainability_score.recyclability_grade,
      carbon_footprint_impact: data.sustainability_score.carbon_footprint_impact
    },
    packaging_cost_analysis: data.packaging_cost_analysis
      ? {
          estimated_cost_per_pouch_inr: data.packaging_cost_analysis.estimated_cost_per_pouch_inr,
          estimated_cost_per_pouch_usd: data.packaging_cost_analysis.estimated_cost_per_pouch_usd,
          film_material_cost_per_kg_inr: data.packaging_cost_analysis.film_material_cost_per_kg_inr,
          gas_flush_cost_per_pouch_inr: data.packaging_cost_analysis.gas_flush_cost_per_pouch_inr,
          printing_and_converting_cost_inr: data.packaging_cost_analysis.printing_and_converting_cost_inr,
          total_batch_cost_inr: data.packaging_cost_analysis.total_batch_cost_inr,
          packaging_cost_percentage_of_retail: `${data.packaging_cost_analysis.packaging_cost_percentage_of_retail}%`,
          mofpi_subsidy_potential_inr: data.packaging_cost_analysis.mofpi_subsidy_potential_inr,
          cost_tier: data.packaging_cost_analysis.cost_tier
        }
      : undefined
  };

  const jsonString = JSON.stringify(strictOutput, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `packai-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              PackAI Expected JSON Output Format
            </h3>
            <p className="text-xs text-slate-400">
              Strictly structured according to the MoFPI specification schema
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800 flex items-center gap-1.5 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy JSON</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .json</span>
          </button>
        </div>
      </div>

      {/* Code Container */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
        <div className="bg-slate-900/80 px-4 py-1.5 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>JSON Schema Response (Strict Spec)</span>
          <span className="text-emerald-400 font-semibold">Valid MoFPI Format</span>
        </div>

        <pre className="p-4 text-xs font-mono text-emerald-300/90 overflow-x-auto max-h-96 leading-relaxed selection:bg-emerald-900 selection:text-white">
          <code>{jsonString}</code>
        </pre>
      </div>
    </div>
  );
};
