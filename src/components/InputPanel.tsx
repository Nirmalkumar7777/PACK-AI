import React from 'react';
import { PackInput, FoodCategory, StorageMode, CommodityPreset, CommodityHistoryItem } from '../types';
import { COMMODITY_PRESETS } from '../data/presets';
import { TranslationDictionary } from '../utils/i18n';
import { RecentCommodityHistory } from './RecentCommodityHistory';
import {
  AlertTriangle,
  CheckCircle2,
  Wind,
  Droplets,
  Flame,
  Thermometer,
  ShieldAlert,
  Sparkles,
  Package,
  IndianRupee,
  Boxes,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';

interface InputPanelProps {
  input: PackInput;
  onChange: (input: PackInput) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  useAi: boolean;
  t: TranslationDictionary;
  history?: CommodityHistoryItem[];
  onLoadHistoryInput?: (input: PackInput, commodityName: string) => void;
  onViewHistorySolution?: (item: CommodityHistoryItem) => void;
  onReRunHistory?: (input: PackInput) => void;
  onClearHistory?: () => void;
  onRemoveHistoryItem?: (id: string) => void;
}

const CATEGORIES: FoodCategory[] = [
  'Fresh Produce',
  'Dry Goods',
  'High-Fat/Dairy',
  'Frozen',
  'Bakery',
  'Meat/Poultry'
];

const STORAGE_MODES: StorageMode[] = ['Ambient', 'Chilled', 'Frozen'];

export const InputPanel: React.FC<InputPanelProps> = ({
  input,
  onChange,
  onAnalyze,
  isLoading,
  useAi,
  t,
  history,
  onLoadHistoryInput,
  onViewHistorySolution,
  onReRunHistory,
  onClearHistory,
  onRemoveHistoryItem
}) => {
  const handlePresetSelect = (preset: CommodityPreset) => {
    onChange({ ...preset.data });
  };

  const handleChange = <K extends keyof PackInput>(key: K, value: PackInput[K]) => {
    const updated = { ...input, [key]: value };
    // Auto sync storage mode if temp changes drastically
    if (key === 'temp') {
      const num = Number(value);
      if (num <= -10 && updated.storage_mode !== 'Frozen') {
        updated.storage_mode = 'Frozen';
      } else if (num >= 0 && num <= 10 && updated.storage_mode === 'Ambient') {
        updated.storage_mode = 'Chilled';
      }
    }
    onChange(updated);
  };

  const getCategoryLabel = (cat: FoodCategory) => {
    switch (cat) {
      case 'Fresh Produce':
        return `🍎 ${t.categories.produce}`;
      case 'Dry Goods':
        return `🥔 ${t.categories.dryGoods}`;
      case 'High-Fat/Dairy':
        return `🧀 ${t.categories.highFat}`;
      case 'Frozen':
        return `❄️ ${t.categories.frozen}`;
      case 'Bakery':
        return `🍞 ${t.categories.bakery}`;
      case 'Meat/Poultry':
        return `🍗 ${t.categories.meat}`;
    }
  };

  const getStorageModeLabel = (mode: StorageMode) => {
    switch (mode) {
      case 'Ambient':
        return t.ambient;
      case 'Chilled':
        return t.chilled;
      case 'Frozen':
        return t.frozen;
    }
  };

  // Rule constraints active states
  const isRule1Active = input.fat > 10;
  const isRule2Active =
    (input.category === 'Dry Goods' && input.moisture < 8) ||
    (input.category === 'Bakery' && input.moisture < 12);
  const isRule3Active = input.category === 'Fresh Produce';
  const isRule4Active =
    input.category === 'Fresh Produce' || input.shelf_life > 30 || input.category === 'Meat/Poultry';

  return (
    <div className="bg-slate-900/95 border border-amber-900/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-5 text-slate-100">
      {/* Header & Presets */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
              {t.commodityInputHeading}
            </h2>
            <p className="text-xs text-amber-200/80 mt-0.5">
              {t.commodityInputSub}
            </p>
          </div>
          <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-600/40">
            MoFPI Schema
          </span>
        </div>

        {/* Preset Selector Chips with Emojis */}
        <div>
          <label className="text-xs uppercase tracking-wider font-semibold text-amber-400 block mb-2">
            {t.quickPresets}
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1 pb-1">
            {COMMODITY_PRESETS.map((p) => {
              const isSelected =
                input.commodity_name.toLowerCase() === p.data.commodity_name.toLowerCase();
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePresetSelect(p)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all text-left shadow-sm ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-amber-500/20'
                      : 'bg-slate-950/90 border-slate-800 text-slate-300 hover:border-amber-600/50 hover:text-white'
                  }`}
                >
                  <span className="text-base">{p.icon}</span>
                  <span className="truncate max-w-[150px]">{p.data.commodity_name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Input Form with Balanced Inputs */}
      <div className="space-y-4">
        {/* Row 1: Commodity Name & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              {t.commodityName}
            </label>
            <input
              type="text"
              value={input.commodity_name}
              onChange={(e) => handleChange('commodity_name', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors font-medium"
              placeholder={t.commodityNamePlaceholder}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              {t.category}
            </label>
            <select
              value={input.category}
              onChange={(e) => handleChange('category', e.target.value as FoodCategory)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-medium"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {getCategoryLabel(cat)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Moisture & Fat Sliders with Hints */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
          {/* Moisture */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-400" />
                {t.moisture}
              </span>
              <span className="font-mono font-bold text-blue-400 text-sm">
                {input.moisture}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={0.5}
              value={input.moisture}
              onChange={(e) => handleChange('moisture', parseFloat(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <p className="text-[11px] text-slate-400 leading-snug">
              {t.moistureHint}
            </p>
          </div>

          {/* Fat */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                {t.fat}
              </span>
              <span className="font-mono font-bold text-amber-400 text-sm">
                {input.fat}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={0.5}
              value={input.fat}
              onChange={(e) => handleChange('fat', parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <p className="text-[11px] text-slate-400 leading-snug">
              {t.fatHint}
            </p>
          </div>
        </div>

        {/* Row 3: Respiration & Shelf Life */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
          {/* Respiration */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-emerald-400" />
                {t.respirationRate}
              </span>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                {input.respiration_rate}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={150}
              step={1}
              value={input.respiration_rate}
              onChange={(e) => handleChange('respiration_rate', parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <p className="text-[11px] text-slate-400 leading-snug">
              {t.respirationHint}
            </p>
          </div>

          {/* Shelf Life */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-400" />
                {t.shelfLife}
              </span>
              <span className="font-mono font-bold text-white text-sm">
                {input.shelf_life} days
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={365}
              step={1}
              value={input.shelf_life}
              onChange={(e) => handleChange('shelf_life', parseInt(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <p className="text-[11px] text-slate-400 leading-snug">
              {t.shelfLifeHint}
            </p>
          </div>
        </div>

        {/* Row 4: Storage Conditions (Temp, Humidity, Mode) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-1">
              <span className="flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                {t.storageTemp}
              </span>
              <span className="font-mono font-bold text-cyan-400 text-xs">{input.temp}°C</span>
            </label>
            <input
              type="number"
              value={input.temp}
              onChange={(e) => handleChange('temp', parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
              min={-30}
              max={50}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-1">
              <span>{t.ambientHumidity}</span>
              <span className="font-mono font-bold text-blue-400 text-xs">{input.humidity}%</span>
            </label>
            <input
              type="number"
              value={input.humidity}
              onChange={(e) => handleChange('humidity', parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-400 font-mono"
              min={10}
              max={100}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              {t.storageMode}
            </label>
            <select
              value={input.storage_mode}
              onChange={(e) => handleChange('storage_mode', e.target.value as StorageMode)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
            >
              {STORAGE_MODES.map((mode) => (
                <option key={mode} value={mode}>
                  {getStorageModeLabel(mode)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 5: Packaging Price & Commercial Batch Economics */}
        <div className="bg-gradient-to-r from-amber-950/30 via-slate-950 to-emerald-950/30 p-3.5 rounded-xl border border-amber-600/40 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-amber-400" />
                {t.packPriceSection}
              </span>
              <p className="text-[11px] text-slate-300">
                {t.packPriceSub}
              </p>
            </div>
            <span className="text-[11px] font-mono font-semibold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-700">
              MoFPI Scheme Norms
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Net Pack Size */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-1">
                <span>{t.packSize}</span>
                <span className="font-mono font-bold text-emerald-400 text-xs">{input.pack_size_grams || 500}g</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={10}
                  max={25000}
                  step={10}
                  value={input.pack_size_grams || 500}
                  onChange={(e) => handleChange('pack_size_grams', parseFloat(e.target.value) || 100)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono"
                  placeholder="500"
                />
                <span className="absolute right-2.5 top-2 text-[10px] text-slate-400 font-bold font-mono">g</span>
              </div>
            </div>

            {/* Retail MRP */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-1">
                <span>{t.retailPrice}</span>
                <span className="font-mono font-bold text-amber-400 text-xs">₹{input.commodity_retail_price || 150}</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={100000}
                  step={1}
                  value={input.commodity_retail_price || 150}
                  onChange={(e) => handleChange('commodity_retail_price', parseFloat(e.target.value) || 10)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                  placeholder="150"
                />
                <span className="absolute right-2.5 top-2 text-[10px] text-slate-400 font-bold font-mono">₹</span>
              </div>
            </div>

            {/* Batch Volume */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-1">
                <span>{t.batchVolume}</span>
                <span className="font-mono font-bold text-cyan-400 text-xs">
                  {(input.batch_volume_units || 10000).toLocaleString('en-IN')}
                </span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={500}
                  max={10000000}
                  step={1000}
                  value={input.batch_volume_units || 10000}
                  onChange={(e) => handleChange('batch_volume_units', parseFloat(e.target.value) || 1000)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                  placeholder="10000"
                />
                <span className="absolute right-2.5 top-2 text-[10px] text-slate-400 font-bold font-mono">units</span>
              </div>
            </div>

            {/* Target Budget Ceiling */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-1">
                <span>{t.budgetCeiling}</span>
                <span className="font-mono font-bold text-purple-400 text-xs">
                  {input.target_packaging_budget_per_unit ? `₹${input.target_packaging_budget_per_unit}` : 'Optional'}
                </span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0.5}
                  max={100}
                  step={0.1}
                  value={input.target_packaging_budget_per_unit || ''}
                  onChange={(e) =>
                    handleChange(
                      'target_packaging_budget_per_unit',
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-purple-400 font-mono"
                  placeholder="e.g. 4.50"
                />
                <span className="absolute right-2.5 top-2 text-[10px] text-slate-400 font-bold font-mono">₹/unit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time MoFPI Constraints Watcher */}
      <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="font-bold text-white flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            {t.activeRulesTitle}
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            Auto-Checked
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2 text-xs">
          {/* Rule 1: High Fat */}
          <div
            className={`p-2.5 rounded-lg border flex items-start gap-2.5 transition-colors ${
              isRule1Active
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-100'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}
          >
            {isRule1Active ? (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-semibold block text-xs sm:text-sm text-white">
                {t.rule1Title}
              </span>
              <span className="text-[11px] text-slate-300">
                {t.rule1Desc} (Fat: {input.fat}%)
              </span>
            </div>
          </div>

          {/* Rule 2: Dry Crisps */}
          <div
            className={`p-2.5 rounded-lg border flex items-start gap-2.5 transition-colors ${
              isRule2Active
                ? 'bg-blue-500/10 border-blue-500/40 text-blue-100'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}
          >
            {isRule2Active ? (
              <AlertTriangle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-semibold block text-xs sm:text-sm text-white">
                {t.rule2Title}
              </span>
              <span className="text-[11px] text-slate-300">
                {t.rule2Desc} (Moisture: {input.moisture}%)
              </span>
            </div>
          </div>

          {/* Rule 3: Fresh Produce */}
          <div
            className={`p-2.5 rounded-lg border flex items-start gap-2.5 transition-colors ${
              isRule3Active
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-100'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}
          >
            {isRule3Active ? (
              <AlertTriangle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-semibold block text-xs sm:text-sm text-white">
                {t.rule3Title}
              </span>
              <span className="text-[11px] text-slate-300">
                {t.rule3Desc} (Respiration: {input.respiration_rate} mL O2/kg·h)
              </span>
            </div>
          </div>

          {/* Rule 4: MAP Gas Flush */}
          <div
            className={`p-2.5 rounded-lg border flex items-start gap-2.5 transition-colors ${
              isRule4Active
                ? 'bg-purple-500/10 border-purple-500/40 text-purple-100'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}
          >
            {isRule4Active ? (
              <AlertTriangle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-semibold block text-xs sm:text-sm text-white">
                {t.rule4Title}
              </span>
              <span className="text-[11px] text-slate-300">
                {t.rule4Desc}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={onAnalyze}
        disabled={isLoading}
        className="w-full py-3 px-5 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-400 hover:from-amber-400 hover:to-teal-300 text-slate-950 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-50 cursor-pointer"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
            <span>{t.calculating}</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>{t.calculateButton}</span>
          </>
        )}
      </button>

      {/* Local History List (Last 5 Analyzed Commodities) */}
      {history && onLoadHistoryInput && onViewHistorySolution && onClearHistory && onRemoveHistoryItem && (
        <div className="pt-2 border-t border-slate-800">
          <RecentCommodityHistory
            history={history}
            onLoadInput={onLoadHistoryInput}
            onViewSolution={onViewHistorySolution}
            onReRun={onReRunHistory}
            onClearHistory={onClearHistory}
            onRemoveItem={onRemoveHistoryItem}
            t={t}
          />
        </div>
      )}
    </div>
  );
};
