import React, { useState } from 'react';
import { ShieldCheck, Sparkles, FileText, Download, Award, Zap, Globe, ChevronDown, Check, Sun, Moon, Utensils, Palette } from 'lucide-react';
import { LANGUAGES, LanguageCode, TranslationDictionary } from '../utils/i18n';
import { AppTheme } from '../types';

interface HeaderProps {
  useAi: boolean;
  onToggleAi: (val: boolean) => void;
  onOpenDossier: () => void;
  onExportJson: () => void;
  engineSource?: string;
  isProcessing: boolean;
  currentLang: LanguageCode;
  onSelectLang: (code: LanguageCode) => void;
  currentTheme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
  t: TranslationDictionary;
}

export const Header: React.FC<HeaderProps> = ({
  useAi,
  onToggleAi,
  onOpenDossier,
  onExportJson,
  engineSource,
  isProcessing,
  currentLang,
  onSelectLang,
  currentTheme,
  onSelectTheme,
  t
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const themeOptions: { id: AppTheme; label: string; desc: string; icon: any; emoji: string }[] = [
    {
      id: 'normal',
      label: t.themeNormal,
      desc: t.themeNormalDesc,
      icon: Sun,
      emoji: '☀️'
    },
    {
      id: 'dark',
      label: t.themeDark,
      desc: t.themeDarkDesc,
      icon: Moon,
      emoji: '🌙'
    },
    {
      id: 'food',
      label: t.themeFood,
      desc: t.themeFoodDesc,
      icon: Utensils,
      emoji: '🥗'
    }
  ];

  const activeThemeObj = themeOptions.find((o) => o.id === currentTheme) || themeOptions[0];

  return (
    <header className="border-b border-amber-900/30 bg-slate-950/95 backdrop-blur sticky top-0 z-40 shadow-xl">
      {/* Top MoFPI & FSSAI Authority Bar with warm culinary glow */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 border-b border-amber-800/20 px-4 py-2 text-xs sm:text-sm text-amber-200/90 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 font-bold text-amber-400">
            <Award className="w-4 h-4 text-amber-400" />
            {t.mofpiBadge}
          </span>
          <span className="text-amber-700 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-slate-300 font-medium">
            {t.fssaiBadge}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-emerald-300 font-mono">
          <span className="flex items-center gap-1.5 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Govt. Standards IS 9845 / 10146 / 10141
          </span>
        </div>
      </div>

      {/* Main Navigation, Brand, and Controls */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 flex flex-wrap items-center justify-between gap-3">
        {/* Brand with appetizing Food Theme design */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-amber-500/20 border border-amber-300/40 shrink-0">
            <span className="text-lg">🥗</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1">
                Pack<span className="text-emerald-400">AI</span>
                <span className="text-amber-400 font-serif text-sm sm:text-base font-normal">Food</span>
              </h1>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                MoFPI
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-normal hidden sm:block">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Action Controls: Language Switcher, Theme Switcher, AI Mode, Export, Dossier */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Multilingual Selector (Includes Tamil, Hindi, Telugu, Kannada, Marathi, English) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsLangMenuOpen(!isLangMenuOpen);
                if (isThemeMenuOpen) setIsThemeMenuOpen(false);
              }}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500/10 border border-amber-500/40 text-amber-200 hover:bg-amber-500/20 flex items-center gap-1.5 transition-all shadow-sm"
              title="Change Language (மொழி மாற்றவும்)"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentLangObj.flag}</span>
              <span className="font-semibold text-white">{currentLangObj.nativeLabel}</span>
              <ChevronDown className="w-3 h-3 text-amber-400" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border-2 border-amber-600/40 rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5 space-y-1">
                <div className="px-3 py-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800">
                  Select Language / மொழியைத் தேர்வு செய்க
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      onSelectLang(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-colors ${
                      currentLang === lang.code
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{lang.flag}</span>
                      <div>
                        <span className="block font-bold">{lang.nativeLabel}</span>
                        <span className="text-[10px] opacity-80">{lang.label}</span>
                      </div>
                    </div>
                    {currentLang === lang.code && <Check className="w-4 h-4 shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Switcher: Normal (Default), Dark, Food Warm */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsThemeMenuOpen(!isThemeMenuOpen);
                if (isLangMenuOpen) setIsLangMenuOpen(false);
              }}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-800/80 border border-slate-700/80 text-slate-200 hover:bg-slate-700 hover:text-white flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              title={`${t.themeLabel}: ${activeThemeObj.label}`}
            >
              <span>{activeThemeObj.emoji}</span>
              <span className="font-semibold">{activeThemeObj.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isThemeMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5 space-y-1">
                <div className="px-3 py-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.themeLabel} / Appearance</span>
                </div>
                {themeOptions.map((opt) => {
                  const isSelected = currentTheme === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        onSelectTheme(opt.id);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{opt.emoji}</span>
                        <div>
                          <span className="block font-bold">{opt.label}</span>
                          <span className="text-[10px] opacity-80">{opt.desc}</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* AI vs Deterministic Mode Switch */}
          <button
            type="button"
            onClick={() => onToggleAi(!useAi)}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border-2 flex items-center gap-2 transition-all ${
              useAi
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-900 border-slate-700/80 text-slate-300 hover:text-white'
            }`}
          >
            {useAi ? (
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            ) : (
              <Zap className="w-4 h-4 text-slate-400" />
            )}
            <span className="hidden md:inline">{useAi ? 'AI Engine' : 'Fast Engine'}</span>
            <span className={`w-2 h-2 rounded-full ${useAi ? 'bg-emerald-400' : 'bg-slate-500'}`} />
          </button>

          {/* Export JSON */}
          <button
            type="button"
            onClick={onExportJson}
            className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white flex items-center gap-1.5 transition-all"
            title={t.exportJsonButton}
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">JSON</span>
          </button>

          {/* Dossier Report Button */}
          <button
            type="button"
            onClick={onOpenDossier}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/20"
          >
            <FileText className="w-4 h-4" />
            <span>{t.dossierButton}</span>
          </button>
        </div>
      </div>

      {/* Processing or Status Strip */}
      {isProcessing && (
        <div className="h-1 w-full bg-slate-800 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 animate-[shimmer_1.5s_infinite] w-1/3"></div>
        </div>
      )}
    </header>
  );
};
