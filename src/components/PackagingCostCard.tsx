import React, { useState } from 'react';
import { PackagingCostAnalysis, PackInput } from '../types';
import { TranslationDictionary } from '../utils/i18n';
import {
  IndianRupee,
  BadgePercent,
  Coins,
  Package,
  TrendingDown,
  Building2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  Layers,
  Wind,
  Printer,
  Award,
  Sparkles
} from 'lucide-react';

interface PackagingCostCardProps {
  cost: PackagingCostAnalysis;
  input: PackInput;
  t?: TranslationDictionary;
}

export const PackagingCostCard: React.FC<PackagingCostCardProps> = ({ cost, input, t }) => {
  const [showInUsd, setShowInUsd] = useState(false);

  const formatCurrency = (inrVal: number, usdVal?: number) => {
    if (showInUsd) {
      const val = usdVal !== undefined ? usdVal : inrVal / 83.5;
      return `$${val.toFixed(3)}`;
    }
    return `₹${inrVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatBatchTotal = (inrVal: number) => {
    if (showInUsd) {
      return `$${(inrVal / 83.5).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
    return `₹${inrVal.toLocaleString('en-IN')}`;
  };

  const getTierColor = (tier: PackagingCostAnalysis['cost_tier']) => {
    switch (tier) {
      case 'Budget Economic':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Standard Commercial':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Premium High-Barrier':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Export Grade':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
  };

  const targetBudget = input.target_packaging_budget_per_unit;
  const isBudgetSet = targetBudget !== undefined && targetBudget > 0;
  const budgetDiff = isBudgetSet ? Number((targetBudget - cost.estimated_cost_per_pouch_inr).toFixed(2)) : 0;
  const isUnderBudget = budgetDiff >= 0;

  return (
    <div className="bg-gradient-to-br from-amber-950/20 via-slate-900 to-emerald-950/20 border border-amber-800/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4 text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2.5 border-b border-amber-900/30 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Coins className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 flex-wrap">
              <span>Packaging Price & Economics</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getTierColor(cost.cost_tier)}`}>
                {cost.cost_tier}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Unit packaging price, batch run cost, and MoFPI subsidy
            </p>
          </div>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setShowInUsd(false)}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
              !showInUsd
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            INR (₹)
          </button>
          <button
            type="button"
            onClick={() => setShowInUsd(true)}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
              showInUsd
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      {/* Top 4 Key Economic Stat Cards with Balanced Font Size */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Estimated Price Per Pouch */}
        <div className="bg-slate-950 p-3 sm:p-3.5 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Price Per Pouch</span>
            <Package className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400">
            {formatCurrency(cost.estimated_cost_per_pouch_inr, cost.estimated_cost_per_pouch_usd)}
          </div>
          <div className="text-[11px] text-slate-400">
            For {input.pack_size_grams || 500}g pack
          </div>
        </div>

        {/* Total Batch Production Run Cost */}
        <div className="bg-slate-950 p-3 sm:p-3.5 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Batch Run Cost</span>
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-white">
            {formatBatchTotal(cost.total_batch_cost_inr)}
          </div>
          <div className="text-[11px] text-slate-400">
            For {(input.batch_volume_units || 10000).toLocaleString('en-IN')} units
          </div>
        </div>

        {/* Packaging Cost as % of Retail Price */}
        <div className="bg-slate-950 p-3 sm:p-3.5 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>% of Retail MRP</span>
            <BadgePercent className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-amber-400">
            {cost.packaging_cost_percentage_of_retail}%
          </div>
          <div className="text-[11px] text-slate-400">
            {cost.packaging_cost_percentage_of_retail <= 6
              ? '✅ Optimal (<6%)'
              : cost.packaging_cost_percentage_of_retail <= 10
              ? '⚠️ Moderate (6-10%)'
              : '❌ High (>10%)'}
          </div>
        </div>

        {/* MoFPI Scheme Capital Subsidy */}
        <div className="bg-slate-950 p-3 sm:p-3.5 rounded-xl border border-emerald-900/50 space-y-1">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
            <span>MoFPI Subsidy</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-emerald-950 text-emerald-300 rounded border border-emerald-800 font-mono">
              35% Grant
            </span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-emerald-300">
            {formatBatchTotal(cost.mofpi_subsidy_potential_inr)}
          </div>
          <div className="text-[11px] text-slate-400">
            Capital grant eligibility
          </div>
        </div>
      </div>

      {/* Budget Variance Alert */}
      {isBudgetSet && (
        <div
          className={`p-3 rounded-xl border flex items-center justify-between gap-2.5 text-xs sm:text-sm ${
            isUnderBudget
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {isUnderBudget ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <div>
              <span className="font-semibold">
                {isUnderBudget ? 'Within Budget:' : 'Over Budget:'}
              </span>{' '}
              Target ₹{targetBudget} vs Calculated ₹{cost.estimated_cost_per_pouch_inr}/unit
            </div>
          </div>
          <div className="font-mono font-bold text-xs sm:text-sm whitespace-nowrap">
            {isUnderBudget ? (
              <span className="text-emerald-400">₹{Math.abs(budgetDiff)} Savings/unit</span>
            ) : (
              <span className="text-rose-400">+₹{Math.abs(budgetDiff)} Over/unit</span>
            )}
          </div>
        </div>
      )}

      {/* Cost Component Breakdown */}
      <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-semibold uppercase tracking-wider">
            Cost Structure Breakdown
          </span>
          <span className="text-[11px] font-mono text-amber-400 font-semibold">
            Substrate Rate: ₹{cost.film_material_cost_per_kg_inr}/kg
          </span>
        </div>

        {/* Visual Stacked Progress Bar */}
        <div className="h-2.5 w-full rounded-full bg-slate-900 overflow-hidden flex shadow-inner">
          <div
            style={{
              width: `${(cost.raw_material_cost_per_pouch_inr / cost.estimated_cost_per_pouch_inr) * 100}%`
            }}
            className="bg-blue-500 hover:opacity-90 transition-all"
            title={`Raw Film Substrate: ₹${cost.raw_material_cost_per_pouch_inr}`}
          />
          <div
            style={{
              width: `${(cost.printing_and_converting_cost_inr / cost.estimated_cost_per_pouch_inr) * 100}%`
            }}
            className="bg-purple-500 hover:opacity-90 transition-all"
            title={`Printing & Converting: ₹${cost.printing_and_converting_cost_inr}`}
          />
          {cost.gas_flush_cost_per_pouch_inr > 0 && (
            <div
              style={{
                width: `${(cost.gas_flush_cost_per_pouch_inr / cost.estimated_cost_per_pouch_inr) * 100}%`
              }}
              className="bg-emerald-500 hover:opacity-90 transition-all"
              title={`MAP Gas Flushing: ₹${cost.gas_flush_cost_per_pouch_inr}`}
            />
          )}
        </div>

        {/* 3 Component Breakdown Columns with Balanced Typography */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5">
          {/* Substrate */}
          <div className="bg-slate-900/90 p-3 rounded-lg border border-blue-900/40 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-blue-400 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                Raw Film
              </span>
              <span className="text-[10px] font-mono font-bold bg-blue-950 text-blue-300 px-1.5 py-0.2 rounded border border-blue-800">
                {Math.round((cost.raw_material_cost_per_pouch_inr / cost.estimated_cost_per_pouch_inr) * 100)}%
              </span>
            </div>
            <div className="text-base font-bold font-mono text-white">
              {formatCurrency(cost.raw_material_cost_per_pouch_inr)}
            </div>
            <div className="text-[11px] text-slate-400 leading-tight">
              {cost.film_weight_grams_per_pouch}g polymer @ ₹{cost.film_material_cost_per_kg_inr}/kg
            </div>
          </div>

          {/* Converting & Printing */}
          <div className="bg-slate-900/90 p-3 rounded-lg border border-purple-900/40 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-purple-400 flex items-center gap-1">
                <Printer className="w-3.5 h-3.5" />
                Print & Convert
              </span>
              <span className="text-[10px] font-mono font-bold bg-purple-950 text-purple-300 px-1.5 py-0.2 rounded border border-purple-800">
                {Math.round((cost.printing_and_converting_cost_inr / cost.estimated_cost_per_pouch_inr) * 100)}%
              </span>
            </div>
            <div className="text-base font-bold font-mono text-white">
              {formatCurrency(cost.printing_and_converting_cost_inr)}
            </div>
            <div className="text-[11px] text-slate-400 leading-tight">
              8-color rotogravure & pouch converting
            </div>
          </div>

          {/* MAP Gas Flush */}
          <div className="bg-slate-900/90 p-3 rounded-lg border border-emerald-900/40 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <Wind className="w-3.5 h-3.5" />
                MAP Gas
              </span>
              <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800">
                {cost.gas_flush_cost_per_pouch_inr > 0
                  ? `${Math.round((cost.gas_flush_cost_per_pouch_inr / cost.estimated_cost_per_pouch_inr) * 100)}%`
                  : '0%'}
              </span>
            </div>
            <div className="text-base font-bold font-mono text-white">
              {formatCurrency(cost.gas_flush_cost_per_pouch_inr)}
            </div>
            <div className="text-[11px] text-slate-400 leading-tight">
              {cost.gas_flush_cost_per_pouch_inr > 0
                ? 'High-purity N2/CO2 gas purge'
                : 'No gas flush needed'}
            </div>
          </div>
        </div>
      </div>

      {/* MoFPI Cost Saving Opportunities */}
      <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
        <span className="text-xs sm:text-sm font-semibold text-amber-400 flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-400" />
          MoFPI Commercial Optimization Recommendations:
        </span>
        <ul className="space-y-1.5 text-xs text-slate-300">
          {cost.cost_saving_opportunities.map((opp, idx) => (
            <li key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{opp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
