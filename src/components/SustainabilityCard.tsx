import React from 'react';
import { SustainabilityScore, MoFPIComplianceNotes } from '../types';
import { Leaf, Recycle, Globe, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

interface SustainabilityCardProps {
  score: SustainabilityScore;
  compliance?: MoFPIComplianceNotes;
}

export const SustainabilityCard: React.FC<SustainabilityCardProps> = ({
  score,
  compliance
}) => {
  const getGradeBadge = (grade: 'A' | 'B' | 'C') => {
    switch (grade) {
      case 'A':
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
          desc: 'Readily Recyclable or Certified Compostable Mono-material (MoFPI Green Mission Preferred)'
        };
      case 'B':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
          desc: 'Recyclable with compatibilizers or chemical recycling streams'
        };
      case 'C':
        return {
          bg: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
          desc: 'Multi-material non-separable laminate (requires specialized waste-to-energy recovery)'
        };
    }
  };

  const gradeInfo = getGradeBadge(score.recyclability_grade);

  return (
    <div className="bg-slate-900/95 border border-emerald-900/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4 text-slate-100">
      {/* Title */}
      <div className="flex items-center justify-between flex-wrap gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center shrink-0">
            <Leaf className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              Sustainability & Circular Economy Scoring
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated under MoFPI Plastic Waste Management Rules & EPR Norms
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-semibold text-teal-300 bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-700">
          EPR Compliant
        </span>
      </div>

      {/* Grid of Scores with Balanced Fonts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Recyclability Grade */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Recycle className="w-3.5 h-3.5 text-emerald-400" />
              Recyclability Grade
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${gradeInfo.bg}`}>
              Grade {score.recyclability_grade}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 pt-0.5 leading-snug">
            {gradeInfo.desc}
          </p>
        </div>

        {/* Carbon Footprint Impact */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Carbon Footprint
            </span>
            <span className="text-xs font-mono font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
              {score.carbon_footprint_impact}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 pt-0.5 leading-snug">
            Life Cycle Assessment (LCA) impact relative to rigid tin/glass containers.
          </p>
        </div>

        {/* Extended Shelf Life Factor */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Shelf-Life Factor
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              1.5x - 2.4x
            </span>
          </div>
          <p className="text-[11px] text-slate-300 pt-0.5 leading-snug">
            {compliance?.shelf_life_extension_factor || 'Drastic reduction in food post-harvest loss.'}
          </p>
        </div>
      </div>

      {/* Eco-Friendly Alternative Recommendation */}
      <div className="bg-slate-950/90 p-3.5 rounded-xl border border-emerald-900/40 space-y-1.5">
        <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          MoFPI Recommended Eco-Friendly Alternative:
        </span>
        <p className="text-xs sm:text-sm text-white font-semibold bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/50">
          {score.eco_friendly_alternative}
        </p>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Aligns with the National Green Packaging Mission: Transitioning unrecyclable multi-material pouches to mono-material polyethylene (PE) or bio-based compostable polyesters with barrier coatings.
        </p>
      </div>

      {/* Statutory Standards Compliance */}
      {compliance && (
        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-200 block">
            Statutory Bureau of Indian Standards (BIS) & FSSAI Compliance:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {compliance.is_standards.map((std, i) => (
              <div key={i} className="flex items-start gap-1.5 text-slate-300 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{std}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
