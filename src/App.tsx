/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { PackInput, PackOutput, CommodityHistoryItem, AppTheme } from './types';
import { COMMODITY_PRESETS } from './data/presets';
import { calculateMoFPIPackaging } from './utils/packEngine';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { LaminateVisualizer } from './components/LaminateVisualizer';
import { BarrierGauges } from './components/BarrierGauges';
import { SustainabilityCard } from './components/SustainabilityCard';
import { JsonViewer } from './components/JsonViewer';
import { MoFPIDossierModal } from './components/MoFPIDossierModal';
import { PackagingCostCard } from './components/PackagingCostCard';
import { EasyPackagingGuide } from './components/EasyPackagingGuide';
import { LanguageCode, TRANSLATIONS } from './utils/i18n';
import {
  FileText,
  Layers,
  Gauge,
  Code2,
  Leaf,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  Clock,
  Sparkles,
  Coins,
  ArrowRight,
  ArrowLeft,
  Utensils,
  Lightbulb,
  Printer
} from 'lucide-react';

export default function App() {
  // Theme state: defaults to 'normal' (clean standard light), changeable to 'dark' or 'food'
  const [theme, setTheme] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem('packai_theme_preference');
      if (saved === 'normal' || saved === 'dark' || saved === 'food') {
        return saved;
      }
    } catch (e) {
      console.warn('Failed to parse theme from localStorage', e);
    }
    return 'normal';
  });

  // Keep html data-theme attribute synchronized with theme state
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('packai_theme_preference', theme);
    } catch (e) {
      console.warn('Failed to save theme preference', e);
    }
  }, [theme]);

  // Multilingual state (default: English, user can toggle Tamil, Hindi, Telugu, Kannada, Marathi)
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const t = useMemo(() => TRANSLATIONS[currentLang] || TRANSLATIONS.en, [currentLang]);

  // Primary 2-Tab workflow: 'input_and_pricing' (Tab 1) vs 'solution_and_specs' (Tab 2)
  const [primaryTab, setPrimaryTab] = useState<'input_and_pricing' | 'solution_and_specs'>('input_and_pricing');

  // Solution Sub-Tab for Tab 2
  const [solutionSubTab, setSolutionSubTab] = useState<'materials' | 'barriers' | 'sustainability' | 'json'>('materials');

  // Initial state with Alphonso Mango
  const [input, setInput] = useState<PackInput>(COMMODITY_PRESETS[0].data);
  const [useAi, setUseAi] = useState<boolean>(true);
  const [output, setOutput] = useState<PackOutput>(() => calculateMoFPIPackaging(COMMODITY_PRESETS[0].data));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Local storage history of the last 5 analyzed commodities
  const HISTORY_STORAGE_KEY = 'packai_commodity_history_v1';
  const [history, setHistory] = useState<CommodityHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.slice(0, 5);
        }
      }
    } catch (e) {
      console.warn('Failed to parse history from localStorage', e);
    }
    // Default initial historical item (Alphonso Mango)
    const initialPreset = COMMODITY_PRESETS[0];
    const initialOutput = calculateMoFPIPackaging(initialPreset.data);
    return [
      {
        id: 'init-mango-1',
        timestamp: Date.now() - 1000 * 60 * 3,
        input: initialPreset.data,
        output: initialOutput
      }
    ];
  });

  // Save analysis result to history (stores max 5 items, newest first)
  const saveToHistory = (inputData: PackInput, outputData: PackOutput) => {
    setHistory((prev) => {
      // Remove any existing entry with the same commodity name so it floats to top
      const filtered = prev.filter(
        (h) => h.input.commodity_name.trim().toLowerCase() !== inputData.commodity_name.trim().toLowerCase()
      );
      const newItem: CommodityHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        timestamp: Date.now(),
        input: { ...inputData },
        output: { ...outputData }
      };
      const updated = [newItem, ...filtered].slice(0, 5);
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save history to localStorage', e);
      }
      return updated;
    });
  };

  // Compute recommendation
  const handleAnalyze = async (overrideInput?: PackInput) => {
    const currentInput = overrideInput || input;
    setIsLoading(true);
    setStatusMessage(null);

    const baseline = calculateMoFPIPackaging(currentInput);

    if (!useAi) {
      setOutput(baseline);
      saveToHistory(currentInput, baseline);
      setIsLoading(false);
      setStatusMessage(`MoFPI Deterministic Engine: Packaging & Price Model Calculated for ${currentInput.commodity_name}!`);
      setPrimaryTab('solution_and_specs');
      setTimeout(() => setStatusMessage(null), 3500);
      return;
    }

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentInput, useAi: true })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: PackOutput = await response.json();
      setOutput(data);
      saveToHistory(currentInput, data);
      setStatusMessage(`AI Packaging Engine: Formulation generated for ${currentInput.commodity_name}!`);
      // Automatically navigate user to Tab 2 to review the solution
      setPrimaryTab('solution_and_specs');
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      console.warn('API call failed, falling back to deterministic calculation:', err);
      setOutput(baseline);
      saveToHistory(currentInput, baseline);
      setStatusMessage(`MoFPI deterministic formulation applied for ${currentInput.commodity_name}`);
      setPrimaryTab('solution_and_specs');
      setTimeout(() => setStatusMessage(null), 3500);
    } finally {
      setIsLoading(false);
    }
  };

  // History action handlers
  const handleLoadHistoryInput = (historicalInput: PackInput, commodityName: string) => {
    setInput({ ...historicalInput });
    window.scrollTo({ top: 100, behavior: 'smooth' });
    setStatusMessage(`Parameters restored for "${commodityName}". Ready to adjust or re-calculate.`);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleViewHistorySolution = (item: CommodityHistoryItem) => {
    setInput({ ...item.input });
    setOutput({ ...item.output });
    setPrimaryTab('solution_and_specs');
    setStatusMessage(`Loaded previous packaging solution for "${item.input.commodity_name}"`);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleReRunHistory = (historicalInput: PackInput) => {
    setInput({ ...historicalInput });
    handleAnalyze(historicalInput);
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear history from localStorage', e);
    }
    setStatusMessage('Analysis history cleared.');
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handleRemoveHistoryItem = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to update history', e);
      }
      return updated;
    });
  };

  // Auto-calculate on input changes when in deterministic mode for responsive feedback
  useEffect(() => {
    if (!useAi) {
      setOutput(calculateMoFPIPackaging(input));
    }
  }, [input, useAi]);

  // Export JSON directly
  const handleExportJson = () => {
    const strictOutput = {
      recommendation_summary: output.recommendation_summary,
      recommended_materials: output.recommended_materials,
      technical_specifications: output.technical_specifications,
      MAP_requirements: output.MAP_requirements,
      sustainability_score: output.sustainability_score,
      packaging_cost_analysis: output.packaging_cost_analysis
    };
    const blob = new Blob([JSON.stringify(strictOutput, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `packai-${input.commodity_name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isProduce = input.category === 'Fresh Produce';

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 transition-colors duration-200"
      data-theme={theme}
    >
      {/* Header with Multilingual Switcher & Theme Changer */}
      <Header
        useAi={useAi}
        onToggleAi={setUseAi}
        onOpenDossier={() => setIsDossierOpen(true)}
        onExportJson={handleExportJson}
        engineSource={output.engine_source}
        isProcessing={isLoading}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        currentTheme={theme}
        onSelectTheme={setTheme}
        t={t}
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Status Notification Toast */}
        {statusMessage && (
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border-2 border-emerald-500/50 text-emerald-200 px-5 py-3 rounded-2xl text-sm sm:text-base flex items-center justify-between shadow-2xl">
            <span className="flex items-center gap-2.5 font-bold">
              <Sparkles className="w-5 h-5 text-amber-400" />
              {statusMessage}
            </span>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-slate-400 hover:text-white font-bold p-1 text-lg"
            >
              ✕
            </button>
          </div>
        )}

        {/* PRIMARY 2-TAB SWITCHER (Separating the work into 2 clear steps) */}
        <div className="bg-slate-900/90 p-1.5 sm:p-2 rounded-2xl border border-amber-900/40 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Tab 1 Button */}
          <button
            type="button"
            onClick={() => setPrimaryTab('input_and_pricing')}
            className={`p-3 sm:p-3.5 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer ${
              primaryTab === 'input_and_pricing'
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-950/80 text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl ${
                primaryTab === 'input_and_pricing'
                  ? 'bg-slate-950 text-amber-400'
                  : 'bg-slate-900 text-amber-400 border border-amber-500/30'
              }`}
            >
              📋
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm sm:text-base font-bold tracking-tight">
                  {t.tab1Name}
                </span>
                {output.packaging_cost_analysis && (
                  <span
                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      primaryTab === 'input_and_pricing'
                        ? 'bg-slate-950 text-amber-300'
                        : 'bg-amber-950 text-amber-300 border border-amber-700'
                    }`}
                  >
                    ₹{output.packaging_cost_analysis.estimated_cost_per_pouch_inr}/unit
                  </span>
                )}
              </div>
              <p
                className={`text-xs font-normal truncate ${
                  primaryTab === 'input_and_pricing' ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                {t.tab1Desc}
              </p>
            </div>
          </button>

          {/* Tab 2 Button */}
          <button
            type="button"
            onClick={() => setPrimaryTab('solution_and_specs')}
            className={`p-3 sm:p-3.5 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer ${
              primaryTab === 'solution_and_specs'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-950/80 text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl ${
                primaryTab === 'solution_and_specs'
                  ? 'bg-slate-950 text-emerald-400'
                  : 'bg-slate-900 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              📦
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm sm:text-base font-bold tracking-tight">
                  {t.tab2Name}
                </span>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    primaryTab === 'solution_and_specs'
                      ? 'bg-slate-950 text-emerald-300'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  }`}
                >
                  Verified MoFPI
                </span>
              </div>
              <p
                className={`text-xs font-normal truncate ${
                  primaryTab === 'solution_and_specs' ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                {t.tab2Desc}
              </p>
            </div>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1 CONTENT: Food Details, Commodity Schema & Price Calculator */}
        {/* ======================================================== */}
        {primaryTab === 'input_and_pricing' && (
          <div className="space-y-7">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
              {/* Left Column: Commodity Input Schema (7 cols) */}
              <div className="lg:col-span-7 space-y-7">
                <InputPanel
                  input={input}
                  onChange={setInput}
                  onAnalyze={() => handleAnalyze()}
                  isLoading={isLoading}
                  useAi={useAi}
                  t={t}
                  history={history}
                  onLoadHistoryInput={handleLoadHistoryInput}
                  onViewHistorySolution={handleViewHistorySolution}
                  onReRunHistory={handleReRunHistory}
                  onClearHistory={handleClearHistory}
                  onRemoveHistoryItem={handleRemoveHistoryItem}
                />
              </div>

              {/* Right Column: Packaging Price & Commercial Batch Economics (5 cols) */}
              <div className="lg:col-span-5 space-y-7">
                {/* Commercial Price Card */}
                {output.packaging_cost_analysis && (
                  <PackagingCostCard
                    cost={output.packaging_cost_analysis}
                    input={input}
                    t={t}
                  />
                )}

                {/* Banner prompting user to view the technical solution */}
                <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 p-4 sm:p-5 rounded-2xl border border-emerald-600/40 shadow-lg space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400">
                      Step 2 Ready
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      IS 9845 / ASTM D3985
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    Packaging Barrier Layers & Specifications Calculated
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    View the multi-layer polymer cross-section, gas flush ratios, and ASTM barrier test values in Step 2.
                  </p>
                  <button
                    type="button"
                    onClick={() => setPrimaryTab('solution_and_specs')}
                    className="w-full py-2.5 px-3.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <span>Proceed to Packaging Solution & Layers</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Easy-to-Understand Food Packaging Science Human Guide */}
            <EasyPackagingGuide t={t} />
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2 CONTENT: Packaging Solution, Layers & Technical Specs */}
        {/* ======================================================== */}
        {primaryTab === 'solution_and_specs' && (
          <div className="space-y-5">
            {/* Top Bar with Navigation back to Step 1 + Print Dossier */}
            <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-900/80 p-3 sm:p-3.5 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setPrimaryTab('input_and_pricing')}
                className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Food Details & Price Calculator</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsDossierOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.dossierButton}</span>
                </button>
              </div>
            </div>

            {/* Executive Summary Card with Food Theme Styling & Balanced Text */}
            <div className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-emerald-950/30 border border-amber-600/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider border border-amber-500/40">
                    {t.executiveSummary}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-200">
                    {input.commodity_name} ({input.category})
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-xs font-mono">
                  {output.packaging_cost_analysis && (
                    <div className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-emerald-400" />
                      <span>₹{output.packaging_cost_analysis.estimated_cost_per_pouch_inr}/unit</span>
                      <span className="text-slate-400">({output.packaging_cost_analysis.packaging_cost_percentage_of_retail}% MRP)</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-slate-300 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Target: {input.shelf_life} Days</span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                {output.recommendation_summary}
              </p>

              {/* Shelf Life Extension Bar & Commercial Subsidies */}
              <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Estimated Spoilage Reduction:
                  <span className="font-mono font-bold text-emerald-400 text-xs sm:text-sm">
                    {output.mofpi_compliance_notes?.shelf_life_extension_factor || 'Up to 2.4x Shelf Life Extension'}
                  </span>
                </span>
                {output.packaging_cost_analysis && (
                  <span className="font-mono text-xs font-semibold text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-800">
                    MoFPI Capital Grant Potential: ₹{output.packaging_cost_analysis.mofpi_subsidy_potential_inr.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            {/* Sub-Tabs for Deep Technical Inspection */}
            <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2.5 overflow-x-auto">
              <button
                type="button"
                onClick={() => setSolutionSubTab('materials')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  solutionSubTab === 'materials'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{t.laminateLayers}</span>
              </button>

              <button
                type="button"
                onClick={() => setSolutionSubTab('barriers')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  solutionSubTab === 'barriers'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>{t.technicalSpecs}</span>
              </button>

              <button
                type="button"
                onClick={() => setSolutionSubTab('sustainability')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  solutionSubTab === 'sustainability'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>{t.sustainabilityTitle}</span>
              </button>

              <button
                type="button"
                onClick={() => setSolutionSubTab('json')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  solutionSubTab === 'json'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>{t.jsonOutput}</span>
              </button>
            </div>

            {/* Sub-Tab View Rendering */}
            <div className="space-y-6">
              {solutionSubTab === 'materials' && (
                <LaminateVisualizer
                  materials={output.recommended_materials}
                  isProduce={isProduce}
                  perforationType={output.MAP_requirements.perforation_type}
                />
              )}

              {solutionSubTab === 'barriers' && (
                <BarrierGauges
                  techSpecs={output.technical_specifications}
                  mapReq={output.MAP_requirements}
                  isProduce={isProduce}
                  fatContent={input.fat}
                  moistureContent={input.moisture}
                />
              )}

              {solutionSubTab === 'sustainability' && (
                <SustainabilityCard
                  score={output.sustainability_score}
                  compliance={output.mofpi_compliance_notes}
                />
              )}

              {solutionSubTab === 'json' && (
                <JsonViewer data={output} />
              )}
            </div>

            {/* Bottom Quick-Action Bar */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t-2 border-slate-900">
              <button
                type="button"
                onClick={() => setPrimaryTab('input_and_pricing')}
                className="px-5 py-3 rounded-2xl text-sm sm:text-base font-bold border-2 border-slate-700 bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 text-amber-400" />
                <span>Modify Food Input or Pack Budget</span>
              </button>

              <button
                type="button"
                onClick={() => setIsDossierOpen(true)}
                className="px-6 py-3 rounded-2xl text-sm sm:text-base font-black bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 flex items-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer"
              >
                <FileText className="w-5 h-5" />
                <span>{t.dossierButton}</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Official MoFPI Dossier Printable Modal */}
      <MoFPIDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        input={input}
        output={output}
      />

      {/* Food-Themed Footer */}
      <footer className="border-t-2 border-amber-900/20 bg-slate-950 px-4 py-6 text-center text-xs sm:text-sm text-slate-400 space-y-1">
        <p className="font-semibold text-slate-300">
          PackAI • Expert Food Packaging & Barrier Material Recommendation Engine • Ministry of Food Processing Industries (MoFPI), Government of India
        </p>
        <p className="text-xs text-slate-500 font-mono">
          Complies with FSSAI (Packaging) Regulations 2018, Bureau of Indian Standards (IS 9845, IS 10146, IS 10141) & ASTM barrier test norms.
        </p>
      </footer>
    </div>
  );
}
