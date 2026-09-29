import React from 'react';
import { TechnicalSpecifications, MAPRequirements } from '../types';
import { Gauge, Activity, Thermometer, ShieldCheck, Wind, AlertCircle, Sparkles } from 'lucide-react';

interface BarrierGaugesProps {
  techSpecs: TechnicalSpecifications;
  mapReq: MAPRequirements;
  isProduce: boolean;
  fatContent: number;
  moistureContent: number;
}

export const BarrierGauges: React.FC<BarrierGaugesProps> = ({
  techSpecs,
  mapReq,
  isProduce,
  fatContent,
  moistureContent
}) => {
  return (
    <div className="space-y-4 text-slate-100">
      {/* 1. Technical Barrier Specifications */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0">
              <Gauge className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Technical Barrier Specifications & Permeability Targets
              </h3>
              <p className="text-xs text-slate-400">
                Tested under standard ASTM D3985 (OTR) & ASTM F1249 (WVTR) protocols
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-semibold text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
            IS 9845 Norms
          </span>
        </div>

        {/* 4 Tech Spec Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Target OTR */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Target OTR (Oxygen Transmission)</span>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-800">
                ASTM D3985
              </span>
            </div>
            <div className="text-base sm:text-lg font-bold font-mono text-cyan-300">
              {techSpecs.target_OTR_cc_m2_day}
            </div>
            <div className="text-[11px] text-slate-400">
              Unit: cc / m² · 24h · atm
              {fatContent > 10 && (
                <span className="text-amber-400 font-semibold block mt-0.5">
                  🛡️ Lipid Anti-Rancidity Barrier Enforced (&lt;10)
                </span>
              )}
            </div>
          </div>

          {/* Target WVTR */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Target WVTR (Water Vapor Barrier)</span>
              <span className="text-[10px] font-mono text-blue-300 bg-blue-950 px-1.5 py-0.2 rounded border border-blue-800">
                ASTM F1249
              </span>
            </div>
            <div className="text-base sm:text-lg font-bold font-mono text-blue-300">
              {techSpecs.target_WVTR_g_m2_day}
            </div>
            <div className="text-[11px] text-slate-400">
              Unit: g / m² · 24h
              {moistureContent < 10 && (
                <span className="text-blue-400 font-semibold block mt-0.5">
                  🍪 Anti-Soggy Crisp Shield Enforced (&lt;1.5)
                </span>
              )}
            </div>
          </div>

          {/* Sealability Temp Range */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                Sealing Temperature Window
              </span>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950 px-1.5 py-0.2 rounded border border-amber-800">
                Hot Tack
              </span>
            </div>
            <div className="text-base sm:text-lg font-bold font-mono text-amber-300">
              {techSpecs.sealability_temp_range_C}
            </div>
            <div className="text-[11px] text-slate-400">
              Compatible with continuous Form-Fill-Seal (FFS) jaws
            </div>
          </div>

          {/* Tensile Strength */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-purple-400" />
                Tensile & Puncture
              </span>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-950 px-1.5 py-0.2 rounded border border-purple-800">
                ASTM D882
              </span>
            </div>
            <div className="text-base sm:text-lg font-bold font-mono text-purple-300">
              {techSpecs.tensile_strength_MPa}
            </div>
            <div className="text-[11px] text-slate-400">
              Puncture-resistant against transit drop shock
            </div>
          </div>
        </div>
      </div>

      {/* 2. Modified Atmosphere Packaging (MAP) Parameters */}
      <div className="bg-slate-900/95 border border-emerald-900/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Wind className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Modified Atmosphere Packaging (MAP) Gas Parameters
              </h3>
              <p className="text-xs text-slate-400">
                Food-grade gas flush ratios and breathable perforation engineering
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                mapReq.is_MAP_recommended
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {mapReq.is_MAP_recommended ? '✅ MAP: YES' : 'MAP: NO'}
            </span>

            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-950 border border-slate-700 text-cyan-300">
              Perforation: {mapReq.perforation_type}
            </span>
          </div>
        </div>

        {/* 3 Gas Cylinders */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-semibold uppercase tracking-wider">
              Flushed Headspace Gas Composition
            </span>
            <span className="text-[11px] font-mono text-emerald-400">
              Food Grade Purity &gt; 99.8%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* O2 */}
            <div className="p-3 rounded-lg bg-slate-900 border border-cyan-900/50 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-400">Oxygen (O₂)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                  Gas #1
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                {mapReq.gas_composition.O2_percent}
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                {isProduce
                  ? 'Permits aerobic fruit breathing without anaerobic alcohol fermentation'
                  : 'Purged to stop lipid rancidity and discoloration'}
              </p>
            </div>

            {/* CO2 */}
            <div className="p-3 rounded-lg bg-slate-900 border border-emerald-900/50 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">Carbon Dioxide (CO₂)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                  Gas #2
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                {mapReq.gas_composition.CO2_percent}
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Bacteriostatic inhibitor preventing mold germination without chemical additives
              </p>
            </div>

            {/* N2 */}
            <div className="p-3 rounded-lg bg-slate-900 border border-indigo-900/50 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-400">Nitrogen (N₂)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                  Balance
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                {mapReq.gas_composition.N2_percent}
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Inert pillow filler gas preventing package collapse and product crushing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
