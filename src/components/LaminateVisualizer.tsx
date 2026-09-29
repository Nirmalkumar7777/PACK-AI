import React from 'react';
import { RecommendedMaterial } from '../types';
import { Layers, Shield, Sparkles, Check, Info } from 'lucide-react';

interface LaminateVisualizerProps {
  materials: RecommendedMaterial[];
  isProduce: boolean;
  perforationType: 'None' | 'Micro-perforated' | 'Macro-perforated';
}

interface ParsedLayer {
  name: string;
  thickness: string;
  role: string;
  color: string;
  textColor: string;
}

export const LaminateVisualizer: React.FC<LaminateVisualizerProps> = ({
  materials,
  isProduce,
  perforationType
}) => {
  const primaryMaterial = materials[0] || {
    layer_structure: 'Multi-layer barrier film',
    material_type: 'Engineered polymer',
    film_thickness_microns: 60,
    suitability_reason: 'Protective food packaging layer'
  };

  const parseLayers = (str: string): ParsedLayer[] => {
    const rawParts = str.split('/').map((s) => s.trim());
    const colors = [
      { bg: 'from-sky-600 to-blue-700', text: 'text-sky-200' },
      { bg: 'from-amber-600 to-amber-700', text: 'text-amber-200' },
      { bg: 'from-emerald-600 to-teal-700', text: 'text-emerald-200' },
      { bg: 'from-indigo-600 to-purple-700', text: 'text-indigo-200' },
      { bg: 'from-rose-600 to-rose-700', text: 'text-rose-200' }
    ];

    return rawParts.map((part, idx) => {
      const match = part.match(/\(([^)]+)\)/);
      const thickness = match ? match[1] : '';
      const name = part.replace(/\([^)]+\)/, '').trim();

      let role = 'Structural Polymer Layer';
      if (idx === 0) role = 'Outer Surface / Protective Print Carrier';
      else if (idx === rawParts.length - 1) role = 'Inner Food Contact & Hermetic Heat Sealant';
      else if (
        name.toLowerCase().includes('foil') ||
        name.toLowerCase().includes('evoh') ||
        name.toLowerCase().includes('met')
      ) {
        role = 'Core Ultra-Barrier (OTR / WVTR / Light Block)';
      } else if (name.toLowerCase().includes('tie')) {
        role = 'Extrusion Adhesive Tie Resin';
      }

      const clr = colors[idx % colors.length];
      return {
        name,
        thickness,
        role,
        color: clr.bg,
        textColor: clr.text
      };
    });
  };

  const parsed = parseLayers(primaryMaterial.layer_structure);

  return (
    <div className="bg-slate-900/95 border border-emerald-900/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4 text-slate-100">
      {/* Title */}
      <div className="flex items-center justify-between flex-wrap gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              Packaging Material Layers & Visual Pouch Cross-Section
            </h3>
            <p className="text-xs text-slate-400">
              Multi-layer laminate construction, polymer thickness, and food contact safety
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-950 border border-emerald-700 text-emerald-400 shadow-sm">
          Total Gauge: {primaryMaterial.film_thickness_microns} µm
        </span>
      </div>

      {/* Cross-section Visual Diagram */}
      <div className="bg-slate-950 rounded-xl p-3.5 sm:p-4 border border-slate-800 space-y-3 relative overflow-hidden">
        {/* Ambient Produce Gas Exchange Simulation if Micro-perforated */}
        {perforationType !== 'None' && (
          <div className="flex items-center justify-between text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-700 px-3 py-1.5 rounded-lg mb-2">
            <span className="flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {perforationType} Membrane Active:
            </span>
            <span className="text-slate-300 text-[11px]">
              Calibrated laser pores allow fruit respiration (Inhales O2 / Exhales CO2)
            </span>
          </div>
        )}

        <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 flex justify-between">
          <span>Atmosphere (Outside Packet) ↑</span>
          <span>Inner Food Contact Layer ↓</span>
        </div>

        {/* Visual Layer Stack with Balanced Typography */}
        <div className="space-y-1.5">
          {parsed.map((layer, index) => (
            <div
              key={index}
              className={`rounded-lg p-2.5 sm:p-3 bg-gradient-to-r ${layer.color} shadow-sm border border-white/20 flex flex-wrap items-center justify-between gap-2 transition-all`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-black/50 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                  L{index + 1}
                </span>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-white drop-shadow">
                    {layer.name}
                  </span>
                  <span className="text-[11px] text-white/90 block font-normal">
                    {layer.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {layer.thickness && (
                  <span className="text-[10px] font-mono font-bold bg-black/50 px-2 py-0.5 rounded text-white border border-white/30">
                    {layer.thickness}
                  </span>
                )}
                {perforationType !== 'None' && isProduce && index === parsed.length - 1 && (
                  <span className="text-[10px] bg-emerald-950 text-emerald-200 px-2 py-0.5 rounded border border-emerald-400 font-mono font-bold">
                    Micro-Vented
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-[10px] uppercase tracking-wider font-semibold text-amber-400 text-right">
          Food Core Content (Packaged Food Product) ↓
        </div>
      </div>

      {/* Material Specifications Cards */}
      <div className="space-y-2.5">
        {materials.map((mat, i) => (
          <div
            key={i}
            className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2"
          >
            <div className="flex items-start justify-between flex-wrap gap-1.5">
              <div>
                <span className="text-[11px] font-semibold text-emerald-400 font-mono">
                  {i === 0 ? 'Primary Recommended Material' : `Alternative Formulation #${i + 1}`}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  {mat.material_type}
                </h4>
              </div>
              <span className="text-[11px] font-mono font-semibold bg-slate-900 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
                {mat.film_thickness_microns} µm
              </span>
            </div>

            <div className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 font-mono">
              <span className="font-semibold text-slate-400 block mb-0.5 text-[11px]">
                Laminate Structure:
              </span>
              <code className="text-emerald-300 text-xs font-semibold">
                {mat.layer_structure}
              </code>
            </div>

            <div className="text-xs text-slate-300 flex items-start gap-2 pt-0.5">
              <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed text-slate-200">
                <span className="font-semibold text-white">Suitability Rationale: </span>
                {mat.suitability_reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
