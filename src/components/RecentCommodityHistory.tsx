import React from 'react';
import { CommodityHistoryItem, PackInput } from '../types';
import { TranslationDictionary } from '../utils/i18n';
import {
  History,
  RotateCcw,
  ArrowRight,
  Trash2,
  Layers,
  IndianRupee,
  Clock,
  Sparkles,
  Package
} from 'lucide-react';

interface RecentCommodityHistoryProps {
  history: CommodityHistoryItem[];
  onLoadInput: (input: PackInput, commodityName: string) => void;
  onViewSolution: (item: CommodityHistoryItem) => void;
  onReRun?: (input: PackInput) => void;
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
  t: TranslationDictionary;
}

export const RecentCommodityHistory: React.FC<RecentCommodityHistoryProps> = ({
  history,
  onLoadInput,
  onViewSolution,
  onReRun,
  onClearHistory,
  onRemoveItem,
  t
}) => {
  const formatTime = (timestamp: number) => {
    const diffSec = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
    if (diffSec < 60) return t.historyJustNow;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Fresh Produce':
        return { label: 'Produce', emoji: '🍎', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60' };
      case 'Dry Goods':
        return { label: 'Dry Goods', emoji: '🥔', color: 'bg-amber-950/80 text-amber-300 border-amber-700/60' };
      case 'High-Fat/Dairy':
        return { label: 'Dairy/Fat', emoji: '🧀', color: 'bg-yellow-950/80 text-yellow-300 border-yellow-700/60' };
      case 'Frozen':
        return { label: 'Frozen', emoji: '❄️', color: 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60' };
      case 'Bakery':
        return { label: 'Bakery', emoji: '🍞', color: 'bg-orange-950/80 text-orange-300 border-orange-700/60' };
      case 'Meat/Poultry':
        return { label: 'Meat', emoji: '🍗', color: 'bg-rose-950/80 text-rose-300 border-rose-700/60' };
      default:
        return { label: category, emoji: '🍱', color: 'bg-slate-900 text-slate-300 border-slate-700' };
    }
  };

  return (
    <div className="bg-slate-900/95 border border-amber-900/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4 text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>{t.historyTitle}</span>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                {history.length}/5
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.historySubtitle}
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-rose-950/30 border border-transparent hover:border-rose-900/40 transition-colors cursor-pointer"
            title="Clear all stored items"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.historyClear}</span>
          </button>
        )}
      </div>

      {/* History Items or Empty State */}
      {history.length === 0 ? (
        <div className="p-6 rounded-xl border border-dashed border-slate-800 bg-slate-950/40 text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-slate-900 text-slate-500 flex items-center justify-center mx-auto">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            {t.historyEmpty}
          </p>
          <span className="inline-block text-[11px] text-amber-400/80 font-mono">
            Auto-saves upon calculating recommendation
          </span>
        </div>
      ) : (
        <div className="space-y-2.5">
          {history.map((item, index) => {
            const badge = getCategoryBadge(item.input.category);
            const primaryMaterial = item.output.recommended_materials?.[0]?.layer_structure || 'Barrier Laminate';
            const price = item.output.packaging_cost_analysis?.estimated_cost_per_pouch_inr;

            return (
              <div
                key={item.id}
                className="bg-slate-950/70 border border-slate-800 hover:border-amber-700/50 rounded-xl p-3 sm:p-3.5 transition-all space-y-2.5 group hover:bg-slate-950/90"
              >
                {/* Top Row: Commodity & Badges */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-[260px]">
                      {item.input.commodity_name || 'Unnamed Commodity'}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border flex items-center gap-1 ${badge.color}`}>
                      <span>{badge.emoji}</span>
                      <span>{badge.label}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-400 font-mono">
                      {formatTime(item.timestamp)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-600 hover:text-rose-400 p-1 rounded transition-colors"
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Middle Row: Parameter Chips & Solution Summary */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                    📦 {item.input.pack_size_grams}g
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                    ⏳ {item.input.shelf_life}d shelf
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                    💧 {item.input.moisture}% moisture
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                    🥑 {item.input.fat}% fat
                  </span>

                  {price !== undefined && (
                    <span className="px-2 py-0.5 rounded bg-amber-950/50 border border-amber-700/50 text-amber-300 font-mono font-bold flex items-center gap-0.5">
                      <IndianRupee className="w-3 h-3" />
                      {price.toFixed(2)}/pouch
                    </span>
                  )}
                </div>

                {/* Recommended Film Structure */}
                <div className="text-[11px] text-slate-300 bg-slate-900/90 rounded-lg px-2.5 py-1.5 border border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 truncate">
                    <Layers className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span className="font-mono text-slate-200 truncate">
                      {primaryMaterial}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0 uppercase">
                    {item.output.engine_source || 'MoFPI Rules'}
                  </span>
                </div>

                {/* Bottom Row: Quick Action Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <button
                    type="button"
                    onClick={() => onLoadInput(item.input, item.input.commodity_name)}
                    className="flex-1 min-w-[90px] py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
                    title="Restore all input fields for this commodity"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.historyLoad}</span>
                  </button>

                  {onReRun && (
                    <button
                      type="button"
                      onClick={() => onReRun(item.input)}
                      className="flex-1 min-w-[90px] py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      title="Re-run analysis immediately with these parameters"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Re-run</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onViewSolution(item)}
                    className="flex-1 min-w-[100px] py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Load result and view complete laminate specifications in Step 2"
                  >
                    <span>{t.historyViewSolution}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
