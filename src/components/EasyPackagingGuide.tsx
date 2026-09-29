import React, { useState } from 'react';
import { TranslationDictionary } from '../utils/i18n';
import {
  HelpCircle,
  ShieldAlert,
  Wind,
  Droplets,
  Flame,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Lightbulb,
  HeartHandshake,
  CheckCircle2,
  Apple,
  Cookie,
  Beef,
  Milk
} from 'lucide-react';

interface EasyPackagingGuideProps {
  t: TranslationDictionary;
}

export const EasyPackagingGuide: React.FC<EasyPackagingGuideProps> = ({ t }) => {
  const [openSection, setOpenSection] = useState<string | null>('otr');

  const toggle = (sec: string) => {
    setOpenSection(openSection === sec ? null : sec);
  };

  const cards = [
    {
      id: 'otr',
      icon: '🛡️',
      color: 'border-amber-500/40 bg-amber-950/20 text-amber-200',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      foodAnalogy: '🧈 Oxygen Shield for Butter, Ghee & Chips',
      title: t.whatIsOtr,
      answer: t.whatIsOtrAnswer,
      realExample:
        'Example: A packet of fried Potato Chips or Desi Ghee has fat. Oxygen in the air attacks oil molecules within days, turning them bitter and smelly. An Al-Foil or EVOH barrier cuts oxygen entry to near zero!'
    },
    {
      id: 'wvtr',
      icon: '💧',
      color: 'border-blue-500/40 bg-blue-950/20 text-blue-200',
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      foodAnalogy: '🍪 Raincoat for Biscuits & Namkeen',
      title: t.whatIsWvtr,
      answer: t.whatIsWvtrAnswer,
      realExample:
        'Example: During Indian monsoons (85% humidity), crisp wafers absorb water from humid air and turn rubbery in hours. Metallized BOPP film locks water vapor out so snacks stay crunchy for 6 months.'
    },
    {
      id: 'map',
      icon: '💨',
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-200',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      foodAnalogy: '🍗 Protective Clean Gas Pillow',
      title: t.whatIsMap,
      answer: t.whatIsMapAnswer,
      realExample:
        'Example: Instead of packing chicken, bread, or paneer with normal room air (which breeds mold), packaging machines flush 30% CO2 to put mold to sleep, and 70% pure Nitrogen to protect the soft food from crushing.'
    },
    {
      id: 'micro',
      icon: '🥭',
      color: 'border-rose-500/40 bg-rose-950/20 text-rose-200',
      tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      foodAnalogy: '🍎 Breathing Lungs for Fresh Fruits & Greens',
      title: t.whatIsMicroPerf,
      answer: t.whatIsMicroPerfAnswer,
      realExample:
        'Example: Mangoes and strawberries are living organisms inhaling O2 and exhaling CO2. If sealed in airtight plastic, they suffocate and ferment into sour alcohol. Micro-laser holes provide calibrated respiration.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-amber-950/20 via-slate-900 to-emerald-950/20 border border-amber-600/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3 border-b border-amber-900/30 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <Lightbulb className="w-4 h-4 text-amber-400" />
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              {t.easyGuideTitle}
            </h3>
          </div>
          <p className="text-xs text-amber-200/80 max-w-2xl">
            {t.easyGuideSub}
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
          <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
          Human Guide
        </span>
      </div>

      {/* 4 Interactive Food Science Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cards.map((card) => {
          const isOpen = openSection === card.id;
          return (
            <div
              key={card.id}
              className={`rounded-xl border transition-all p-3.5 sm:p-4 cursor-pointer ${
                isOpen
                  ? `${card.color} shadow-md shadow-black/40`
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
              onClick={() => toggle(card.id)}
            >
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{card.icon}</span>
                  <div>
                    <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full border ${card.tagColor}`}>
                      {card.foodAnalogy}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                      {card.title}
                    </h4>
                  </div>
                </div>
                <button
                  type="button"
                  className="p-1 rounded-md text-slate-400 hover:text-white"
                >
                  {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {isOpen && (
                <div className="mt-3 pt-2.5 border-t border-white/10 space-y-2 text-xs text-slate-200 leading-relaxed">
                  <p className="font-normal text-slate-200">{card.answer}</p>
                  <div className="bg-black/30 p-2.5 rounded-lg border border-white/10 text-[11px] text-amber-200">
                    <span className="font-bold text-amber-300">💡 Practical Reality: </span>
                    {card.realExample}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MoFPI Government Grant Tip */}
      <div className="bg-gradient-to-r from-emerald-950/60 to-slate-950 p-3 sm:p-3.5 rounded-xl border border-emerald-800/50 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h5 className="text-xs sm:text-sm font-bold text-white">
              Government Financial Subsidy for Food Processors & Farmers
            </h5>
            <p className="text-[11px] text-slate-300">
              Under PMKSY and PMFME schemes, food businesses get 35% to 50% capital subsidies for MAP packaging machines & testing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
