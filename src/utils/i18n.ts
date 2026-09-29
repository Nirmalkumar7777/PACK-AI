export type LanguageCode = 'en' | 'ta' | 'hi' | 'te' | 'kn' | 'mr';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी', flag: '🇮🇳' },
];

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  mofpiBadge: string;
  fssaiBadge: string;
  tab1Name: string;
  tab1Desc: string;
  tab2Name: string;
  tab2Desc: string;
  quickPresets: string;
  commodityInputHeading: string;
  commodityInputSub: string;
  commodityName: string;
  commodityNamePlaceholder: string;
  category: string;
  moisture: string;
  moistureHint: string;
  fat: string;
  fatHint: string;
  respirationRate: string;
  respirationHint: string;
  shelfLife: string;
  shelfLifeHint: string;
  storageTemp: string;
  ambientHumidity: string;
  storageMode: string;
  ambient: string;
  chilled: string;
  frozen: string;
  packPriceSection: string;
  packPriceSub: string;
  packSize: string;
  retailPrice: string;
  batchVolume: string;
  budgetCeiling: string;
  calculateButton: string;
  calculating: string;
  activeRulesTitle: string;
  rule1Title: string;
  rule1Desc: string;
  rule2Title: string;
  rule2Desc: string;
  rule3Title: string;
  rule3Desc: string;
  rule4Title: string;
  rule4Desc: string;
  executiveSummary: string;
  estimatedPricePerUnit: string;
  totalBatchCost: string;
  percentOfMrp: string;
  mofpiSubsidy: string;
  easyGuideTitle: string;
  easyGuideSub: string;
  whatIsOtr: string;
  whatIsOtrAnswer: string;
  whatIsWvtr: string;
  whatIsWvtrAnswer: string;
  whatIsMap: string;
  whatIsMapAnswer: string;
  whatIsMicroPerf: string;
  whatIsMicroPerfAnswer: string;
  laminateLayers: string;
  technicalSpecs: string;
  sustainabilityTitle: string;
  jsonOutput: string;
  dossierButton: string;
  exportJsonButton: string;
  historyTitle: string;
  historySubtitle: string;
  historyEmpty: string;
  historyLoad: string;
  historyViewSolution: string;
  historyClear: string;
  historyJustNow: string;
  themeLabel: string;
  themeNormal: string;
  themeDark: string;
  themeFood: string;
  themeNormalDesc: string;
  themeDarkDesc: string;
  themeFoodDesc: string;
  categories: {
    produce: string;
    dryGoods: string;
    highFat: string;
    frozen: string;
    bakery: string;
    meat: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appName: 'PackAI Food Packaging Engine',
    appSubtitle: 'MoFPI Government-Approved Food Packaging & Barrier Price Optimizer',
    mofpiBadge: 'Ministry of Food Processing Industries (MoFPI) Guidelines',
    fssaiBadge: 'FSSAI Packaging Regulations 2018 • BIS IS 9845 Certified',
    tab1Name: 'Step 1: Food Details & Price Calculator',
    tab1Desc: 'Enter commodity traits, pack weight, batch quantity & packaging cost targets',
    tab2Name: 'Step 2: Packaging Solution & Material Layers',
    tab2Desc: 'Inspect layer architecture, barrier specs, gas flush ratios & official dossier',
    quickPresets: 'Select a Popular Indian Food Preset',
    commodityInputHeading: 'Food Commodity Specifications & Storage',
    commodityInputSub: 'Input the exact food characteristics to generate customized food-grade packaging',
    commodityName: 'Food / Commodity Name',
    commodityNamePlaceholder: 'e.g. Alphonso Mango, Potato Chips, Malai Paneer',
    category: 'Food Category',
    moisture: 'Moisture Content (%)',
    moistureHint: 'Water in food. High moisture causes mold; low moisture dry foods become soggy.',
    fat: 'Oil / Fat Content (%)',
    fatHint: 'Above 10% fat causes rancid smell & bad taste if exposed to oxygen and light.',
    respirationRate: 'Respiration Rate (mL O2/kg·h)',
    respirationHint: 'Living fruits & vegetables breathe oxygen. Requires micro-perforations to avoid rotting.',
    shelfLife: 'Target Shelf Life (Days)',
    shelfLifeHint: 'How many days this package must protect freshness and prevent spoilage.',
    storageTemp: 'Storage Temperature (°C)',
    ambientHumidity: 'Ambient Humidity (% RH)',
    storageMode: 'Storage Mode',
    ambient: 'Ambient (Room Temp)',
    chilled: 'Chilled Cold-Chain (0-10°C)',
    frozen: 'Deep Frozen (-18°C)',
    packPriceSection: 'Packaging Price & Production Batch Economics',
    packPriceSub: 'Calculate cost per pouch, batch budget, and eligible MoFPI government subsidies',
    packSize: 'Pack Size (Net Weight)',
    retailPrice: 'Retail MRP Price (₹)',
    batchVolume: 'Batch Quantity (Units)',
    budgetCeiling: 'Target Packaging Budget (₹/unit)',
    calculateButton: 'Calculate MoFPI Packaging & Price Model',
    calculating: 'Analyzing Food Science & Cost...',
    activeRulesTitle: 'MoFPI Compulsory Food Safety & Quality Safeguards',
    rule1Title: 'High Fat (>10%): Mandatory Oxygen Block (OTR < 10)',
    rule1Desc: 'Prevents lipid photo-oxidation and rancid taste using foil or EVOH barrier.',
    rule2Title: 'Dry Crisps / High Moisture: Vapor Block (WVTR < 1.5)',
    rule2Desc: 'Stops air moisture from turning chips and biscuits soft and soggy.',
    rule3Title: 'Fresh Produce: Strictly NEVER 100% Hermetic',
    rule3Desc: 'Fresh horticultural items must breathe through laser micro-holes to prevent ethanol fermentation.',
    rule4Title: 'Modified Atmosphere Gas Flush (MAP)',
    rule4Desc: 'Replaces stale air with custom Nitrogen and CO2 to stop bacteria and mold.',
    executiveSummary: 'Executive Packaging Recommendation',
    estimatedPricePerUnit: 'Price Per Pouch',
    totalBatchCost: 'Total Batch Cost',
    percentOfMrp: '% of Retail Price',
    mofpiSubsidy: 'MoFPI 35% Capital Grant',
    easyGuideTitle: 'Food Packaging Science Explained in Simple Words',
    easyGuideSub: 'Understand why each barrier layer and gas flush is selected for your food item',
    whatIsOtr: 'What is OTR (Oxygen Transmission Rate)?',
    whatIsOtrAnswer: 'OTR measures how much oxygen leaks through the plastic pouch into your food. Lower numbers mean higher protection. High-fat food like ghee, chips, and paneer need low OTR so fats don’t spoil and turn stinky.',
    whatIsWvtr: 'What is WVTR (Moisture Transmission)?',
    whatIsWvtrAnswer: 'WVTR measures how easily water vapor enters or leaves the packet. Dry foods like bhujia, wafers, and cookies need ultra-low WVTR to stay crispy and fresh in humid weather.',
    whatIsMap: 'What is MAP (Modified Atmosphere Packaging)?',
    whatIsMapAnswer: 'Instead of ordinary air, the packet is flushed with pure food-grade Nitrogen (N2) to cushion snacks, and Carbon Dioxide (CO2) to kill fungal mold and bacteria without preservatives.',
    whatIsMicroPerf: 'Why do fruits need Micro-perforations?',
    whatIsMicroPerfAnswer: 'Harvested fruits like mangoes and strawberries continue breathing after harvest. If sealed in airtight plastic, they suffocate and produce foul alcohol fumes. Laser micro-holes allow gentle breathing.',
    laminateLayers: 'Packaging Material Layers & Visual Pouch Cross-Section',
    technicalSpecs: 'Technical Specifications & Gas Parameters',
    sustainabilityTitle: 'Eco-Friendly & Circular Packaging Score',
    jsonOutput: 'Standard MoFPI JSON Output',
    dossierButton: 'Print MoFPI Technical Dossier',
    exportJsonButton: 'Export JSON',
    historyTitle: 'Recent Analysis History (Last 5)',
    historySubtitle: 'Quickly restore parameters or review past packaging solutions',
    historyEmpty: 'No previous analyses stored yet. Run an analysis above to build your history.',
    historyLoad: 'Restore Data',
    historyViewSolution: 'View Solution',
    historyClear: 'Clear History',
    historyJustNow: 'Just now',
    themeLabel: 'Theme',
    themeNormal: 'Normal (Light)',
    themeDark: 'Dark Mode',
    themeFood: 'Food Warm',
    themeNormalDesc: 'Crisp, clean standard daylight theme',
    themeDarkDesc: 'Sleek high-contrast dark theme',
    themeFoodDesc: 'Warm saffron and harvest culinary palette',
    categories: {
      produce: 'Fresh Fruits & Vegetables',
      dryGoods: 'Dry Goods & Snacks',
      highFat: 'Dairy & High-Fat Foods',
      frozen: 'Frozen Foods',
      bakery: 'Bakery & Bread',
      meat: 'Meat, Poultry & Seafood'
    }
  },
  ta: {
    appName: 'பேக்ஏஐ (PackAI) உணவு பேக்கேஜிங் என்ஜின்',
    appSubtitle: 'உணவு பதப்படுத்தும் அமைச்சக (MoFPI) அங்கீகரிக்கப்பட்ட உணவுப் பாதுகாப்பு & பேக்கிங் விலை கால்குலேட்டர்',
    mofpiBadge: 'மத்திய உணவு பதப்படுத்தும் தொழில் அமைச்சகம் (MoFPI) வழிகாட்டுதல்கள்',
    fssaiBadge: 'FSSAI பேக்கேஜிங் விதிமுறைகள் 2018 • BIS IS 9845 சான்றளிக்கப்பட்டது',
    tab1Name: 'படி 1: உணவு விவரங்கள் & பேக்கிங் விலை கணக்கீடு',
    tab1Desc: 'உணவுத் தன்மை, பாக்கெட் எடை, தொகுதி எண்ணிக்கை மற்றும் பேக்கிங் செலவை உள்ளிடவும்',
    tab2Name: 'படி 2: பேக்கேஜிங் தீர்வு & அடுக்கு விவரங்கள்',
    tab2Desc: 'பாலிமர் லேயர்கள், வாயு கலவை விகிதம், நிலைத்தன்மை மற்றும் அதிகாரப்பூர்வ ஆவணத்தை பார்க்கவும்',
    quickPresets: 'பிரபலமான உணவு மாதிரியைத் தேர்ந்தெடுக்கவும்',
    commodityInputHeading: 'உணவுப் பொருள் விவரக்குறிப்புகள் & சேமிப்பு நிபந்தனைகள்',
    commodityInputSub: 'சரியான உணவு பேக்கேஜிங் மற்றும் விலையை கணக்கிட பின்வரும் விவரங்களை உள்ளிடவும்',
    commodityName: 'உணவு / பொருளின் பெயர்',
    commodityNamePlaceholder: 'எ.கா: அல்போன்சா மாம்பழம், உருளைக்கிழங்கு சிப்ஸ், பன்னீர்',
    category: 'உணவு வகை',
    moisture: 'ஈரப்பதம் (%) [Moisture Content]',
    moistureHint: 'உணவில் உள்ள நீர் அளவு. அதிக ஈரப்பதம் பூஞ்சையை உண்டாக்கும்; குறைந்த ஈரப்பதம் கொண்டவை நமுத்துப் போகும்.',
    fat: 'எண்ணெய் / கொழுப்பு அளவு (%) [Fat/Oil]',
    fatHint: '10% க்கும் அதிகமான கொழுப்பு காற்றில் பட்டால் சிதைந்து கெட்ட வாடை (ரான்சிடிட்டி) ஏற்படும்.',
    respirationRate: 'சுவாச வீதம் (mL O2/kg·h) [Respiration]',
    respirationHint: 'பழங்கள் மற்றும் காய்கறிகள் அறுவடைக்குப் பிறகும் சுவாசிக்கின்றன. காற்று நுண்துளைகள் அவசியம்.',
    shelfLife: 'தேவையான காலாவதி நாட்கள் (Shelf Life)',
    shelfLifeHint: 'இந்த பாக்கெட் எத்தனை நாட்கள் உணவை கெடாமல் புதியதாக பாதுகாக்க வேண்டும்.',
    storageTemp: 'சேமிப்பு வெப்பநிலை (°C)',
    ambientHumidity: 'சுற்றுப்புற ஈரப்பதம் (% RH)',
    storageMode: 'சேமிப்பு முறை',
    ambient: 'சாதாரண அறை வெப்பநிலை (Ambient)',
    chilled: 'குளிர்சாதன சேமிப்பு (Chilled 0-10°C)',
    frozen: 'ஆழ்ந்த உறைநிலை (Deep Frozen -18°C)',
    packPriceSection: 'பேக்கேஜிங் விலை & வணிக உற்பத்தி மதிப்பீடு',
    packPriceSub: 'ஒரு பாக்கெட்டின் விலை, மொத்த உற்பத்தி செலவு மற்றும் அரசு மானியத்தை கணக்கிடுங்கள்',
    packSize: 'பாக்கெட் அளவு (நிகர எடை)',
    retailPrice: 'சில்லறை விற்பனை விலை MRP (₹)',
    batchVolume: 'உற்பத்தி எண்ணிக்கை (Units)',
    budgetCeiling: 'இலக்கு பேக்கேஜிங் பட்ஜெட் (₹/யூனிட்)',
    calculateButton: 'பேக்கேஜிங் தீர்வு & விலையை கணக்கிடுக',
    calculating: 'உணவு அறிவியல் மற்றும் செலவு பகுப்பாய்வு...',
    activeRulesTitle: 'MoFPI கட்டாய உணவு பாதுகாப்பு & தர விதிகள்',
    rule1Title: 'அதிக கொழுப்பு (>10%): ஆக்சிஜன் தடை அவசியம் (OTR < 10)',
    rule1Desc: 'கொழுப்பு கெட்டுப் போகாமல் இருக்க அலுமினியம் ஃபாயில் அல்லது EVOH அடுக்கு பயன்பாடு.',
    rule2Title: 'மொருமொருப்பான சிப்ஸ்: நீராவி தடை (WVTR < 1.5)',
    rule2Desc: 'சிப்ஸ் மற்றும் பிஸ்கட் நமுத்துப்போகாமல் மொறுமொறுப்பாக இருக்க ஈரப்பத தடுப்பு.',
    rule3Title: 'பழங்கள் & காய்கறிகள்: லேசர் நுண்துளைகள் கட்டாயம்',
    rule3Desc: 'பழங்கள் சுவாசிக்க நுண்துளைகள் தேவை; காற்று புகாத பாக்கெட்டில் அடைத்தால் அழுகிவிடும்.',
    rule4Title: 'பாதுகாப்பு வாயு நிரப்புதல் (MAP Gas Flush)',
    rule4Desc: 'பாக்கெட்டில் உள்ள கெட்ட காற்றை அகற்றி நைட்ரஜன் & CO2 வாயுவை செலுத்துதல்.',
    executiveSummary: 'பேக்கேஜிங் முதன்மை பரிந்துரை சுருக்கம்',
    estimatedPricePerUnit: 'ஒரு பாக்கெட் விலை',
    totalBatchCost: 'மொத்த உற்பத்தி செலவு',
    percentOfMrp: 'MRP விலையில் சதவீதம்',
    mofpiSubsidy: 'அரசு மானிய சாத்தியம் (35%)',
    easyGuideTitle: 'எளிய தமிழில் உணவு பேக்கேஜிங் அறிவியல் விளக்கம்',
    easyGuideSub: 'உங்கள் உணவுப் பொருளுக்கு இந்த பேக்கேஜிங் மற்றும் வாயுக்கள் ஏன் தேவை என்பதை எளிதாகப் புரிந்து கொள்ளுங்கள்',
    whatIsOtr: 'OTR (ஆக்சிஜன் பரிமாற்ற வீதம்) என்றால் என்ன?',
    whatIsOtrAnswer: 'பாக்கெட்டுக்குள் எவ்வளவு ஆக்சிஜன் நுழைகிறது என்பதை OTR குறிக்கிறது. குறைந்த எண் என்றால் அதிக பாதுகாப்பு. நெய், சிப்ஸ், பன்னீர் போன்ற கொழுப்பு உணவுகள் கெட்டு துர்நாற்றம் அடிக்காமல் இருக்க குறைந்த OTR அவசியம்.',
    whatIsWvtr: 'WVTR (நீராவி பரிமாற்ற வீதம்) என்றால் என்ன?',
    whatIsWvtrAnswer: 'காற்றில் உள்ள ஈரப்பதம் பாக்கெட்டுக்குள் எவ்வளவு வேகமாக நுழைகிறது என்பதைக் குறிக்கும். சிப்ஸ், முறுக்கு, பிஸ்கட் போன்றவை நமுத்துப் போகாமல் மொறுமொறுப்பாக இருக்க குறைந்த WVTR தேவை.',
    whatIsMap: 'MAP (மாற்றியமைக்கப்பட்ட வளிமண்டல பேக்கேஜிங்) என்றால் என்ன?',
    whatIsMapAnswer: 'உணவு கெடாமல் இருக்க சாதாரண காற்றை வெளியேற்றி, உணவு-தர நைட்ரஜன் (N2) மற்றும் கார்பன் டை ஆக்சைடு (CO2) வாயுக்களை பாக்கெட்டுக்குள் அடைப்பது.',
    whatIsMicroPerf: 'பழங்களுக்கு நுண்துளைகள் (Micro-perforation) ஏன் தேவை?',
    whatIsMicroPerfAnswer: 'பழங்கள் அறுவடை செய்த பிறகும் சுவாசிக்கின்றன. முழுவதுமாக அடைக்கப்பட்ட பாக்கெட்டில் ஆக்ஸிஜன் தீர்ந்து அழுகி ஆல்கஹால் வாசனை வரும். லேசர் நுண்துளைகள் அவற்றை சுவாசிக்க வைக்கின்றன.',
    laminateLayers: 'பேக்கேஜிங் பொருள் அடுக்குகள் & வடிவமைப்பு',
    technicalSpecs: 'தொழில்நுட்ப விவரக்குறிப்புகள் & வாயு அளவு',
    sustainabilityTitle: 'சுற்றுச்சூழல் நட்பு & மறுசுழற்சி மதிப்பீடு',
    jsonOutput: 'MoFPI அதிகாரப்பூர்வ JSON வெளியீடு',
    dossierButton: 'MoFPI அதிகாரப்பூர்வ ஆவணத்தை அச்சிடுங்கள்',
    exportJsonButton: 'JSON பதிவிறக்குக',
    historyTitle: 'சமீபத்திய பகுப்பாய்வு வரலாறு (கடைசி 5)',
    historySubtitle: 'முந்தைய முடிவுகளை விரைவாக மீட்டெடுக்கவும் அல்லது மீண்டும் இயக்கவும்',
    historyEmpty: 'முந்தைய பகுப்பாய்வு வரலாறு எதுவும் இல்லை. மேலே உள்ள உணவை பகுப்பாய்வு செய்யுங்கள்.',
    historyLoad: 'தரவை ஏற்று',
    historyViewSolution: 'முடிவை பார்',
    historyClear: 'வரலாற்றை நீக்கு',
    historyJustNow: 'சற்று முன்',
    themeLabel: 'தீம்',
    themeNormal: 'இயல்பு (Normal)',
    themeDark: 'இருண்ட (Dark)',
    themeFood: 'உணவு தீம் (Food)',
    themeNormalDesc: 'தெளிவான, சுத்தமான நிலையான ஒளி தீம்',
    themeDarkDesc: 'நவீன இருண்ட வண்ண வடிவமைப்பு',
    themeFoodDesc: 'மஞ்சள் மற்றும் குங்குமப்பூ உணவு வண்ணத் தீம்',
    categories: {
      produce: 'புதிய பழங்கள் & காய்கறிகள்',
      dryGoods: 'உலர்ந்த பொருட்கள் & தின்பண்டங்கள்',
      highFat: 'பால் & கொழுப்பு உணவுகள்',
      frozen: 'உறைந்த உணவுகள் (Frozen)',
      bakery: 'ரொட்டி & பேக்கரி உணவுகள்',
      meat: 'இறைச்சி & கடல் உணவுகள்'
    }
  },
  hi: {
    appName: 'पैकएआई (PackAI) खाद्य पैकेजिंग इंजन',
    appSubtitle: 'खाद्य प्रसंस्करण उद्योग मंत्रालय (MoFPI) अनुमोदित बैरियर सामग्री एवं मूल्य अनुकूलक',
    mofpiBadge: 'खाद्य प्रसंस्करण उद्योग मंत्रालय (MoFPI) भारत सरकार दिशानिर्देश',
    fssaiBadge: 'FSSAI पैकेजिंग विनियम 2018 • BIS IS 9845 प्रमाणित',
    tab1Name: 'चरण 1: खाद्य विवरण एवं पैकेजिंग मूल्य कैलकुलेटर',
    tab1Desc: 'खाद्य गुण, पैक का वजन, बैच मात्रा और पैकेजिंग लागत लक्ष्य दर्ज करें',
    tab2Name: 'चरण 2: पैकेजिंग समाधान एवं सामग्री स्तर',
    tab2Desc: 'परत वास्तुकला, बैरियर विनिर्देश, गैस फ्लश अनुपात और सरकारी डोजियर देखें',
    quickPresets: 'लोकप्रिय भारतीय खाद्य प्रीसेट चुनें',
    commodityInputHeading: 'खाद्य उत्पाद विनिर्देश एवं भंडारण की स्थिति',
    commodityInputSub: 'सटीक पैकेजिंग सामग्री एवं लागत प्राप्त करने के लिए खाद्य गुण दर्ज करें',
    commodityName: 'खाद्य / उत्पाद का नाम',
    commodityNamePlaceholder: 'उदा. अल्फांसो आम, आलू के चिप्स, मलाई पनीर, देसी घी',
    category: 'खाद्य श्रेणी',
    moisture: 'नमी की मात्रा (%) [Moisture Content]',
    moistureHint: 'खाद्य में पानी। अधिक नमी से फफूंद लगती है; कम नमी वाली कुरकुरी चीजें सील जाती हैं।',
    fat: 'तेल / वसा की मात्रा (%) [Fat/Oil]',
    fatHint: '10% से अधिक वसा ऑक्सीजन और प्रकाश के संपर्क में आने पर बासी व दुर्गंधयुक्त हो जाती है।',
    respirationRate: 'श्वसन दर (mL O2/kg·h) [Respiration]',
    respirationHint: 'ताजे फल और सब्जियां सांस लेते हैं। सड़ने से बचाने के लिए लेजर माइक्रो-छिद्र अनिवार्य हैं।',
    shelfLife: 'लक्षित शेल्फ लाइफ (दिन)',
    shelfLifeHint: 'यह पैकेट भोजन को कितने दिनों तक पूरी तरह ताजा रखेगा।',
    storageTemp: 'भंडारण तापमान (°C)',
    ambientHumidity: 'परिवेश आर्द्रता (% RH)',
    storageMode: 'भंडारण मोड',
    ambient: 'सामान्य तापमान (Ambient)',
    chilled: 'शीत-श्रृंखला (Chilled 0-10°C)',
    frozen: 'डीप फ्रोजन (Deep Frozen -18°C)',
    packPriceSection: 'पैकेजिंग मूल्य एवं वाणिज्यिक बैच अर्थशास्त्र',
    packPriceSub: 'प्रति पाउच लागत, कुल बैच बजट एवं MoFPI सरकारी सब्सिडी की गणना करें',
    packSize: 'पैक आकार (शुद्ध वजन)',
    retailPrice: 'खुदरा एमआरपी मूल्य (₹)',
    batchVolume: 'बैच उत्पादन संख्या (Units)',
    budgetCeiling: 'अधिकतम पैकेजिंग बजट सीमा (₹/पाउच)',
    calculateButton: 'पैकेजिंग समाधान एवं लागत की गणना करें',
    calculating: 'खाद्य विज्ञान और लागत विश्लेषण प्रगति पर...',
    activeRulesTitle: 'MoFPI अनिवार्य खाद्य सुरक्षा एवं गुणवत्ता नियम',
    rule1Title: 'उच्च वसा (>10%): ऑक्सीजन अवरोध अनिवार्य (OTR < 10)',
    rule1Desc: 'ऑक्सीजन से वसा को खराब होने से बचाने हेतु एल्यूमीनियम फॉयल या EVOH बैरियर।',
    rule2Title: 'कुरकुरा भोजन: जलवाष्प अवरोध अनिवार्य (WVTR < 1.5)',
    rule2Desc: 'चिप्स, नमकीन और बिस्कुट को सीलने से बचाने के लिए नमी अवरोधक।',
    rule3Title: 'ताजी उपज: कभी भी पूरी तरह एयरटाइट नहीं',
    rule3Desc: 'फल-सब्जियों को सांस लेने के लिए लेजर माइक्रो-छिद्र आवश्यक हैं ताकि सड़न न हो।',
    rule4Title: 'संशोधित वायुमंडल गैस फ्लश (MAP Gas Flush)',
    rule4Desc: 'पैकेट से खराब हवा निकालकर नाइट्रोजन व CO2 गैस भरना।',
    executiveSummary: 'कार्यकारी पैकेजिंग अनुशंसा सारांश',
    estimatedPricePerUnit: 'प्रति पाउच मूल्य',
    totalBatchCost: 'कुल बैच उत्पादन लागत',
    percentOfMrp: 'MRP का प्रतिशत',
    mofpiSubsidy: 'MoFPI 35% पूंजीगत सब्सिडी',
    easyGuideTitle: 'खाद्य पैकेजिंग विज्ञान को सरल भाषा में समझें',
    easyGuideSub: 'जानें कि आपके भोजन को सुरक्षित रखने के लिए प्रत्येक परत और गैस क्यों आवश्यक है',
    whatIsOtr: 'OTR (ऑक्सीजन संचरण दर) क्या है?',
    whatIsOtrAnswer: 'OTR मापता है कि पैकेट में कितनी ऑक्सीजन लीक हो रही है। कम संख्या बेहतर सुरक्षा दर्शाती है। घी, चिप्स और पनीर जैसे वसायुक्त उत्पादों को कम OTR चाहिए ताकि वे दुर्गंध न मारें।',
    whatIsWvtr: 'WVTR (नमी संचरण दर) क्या है?',
    whatIsWvtrAnswer: 'WVTR बताता है कि नमी कितनी आसानी से पैकेट में घुसती है। चिप्स, वेफर्स और बिस्कुट को कुरकुरा रखने के लिए बहुत कम WVTR चाहिए।',
    whatIsMap: 'MAP (मॉडिफाइड एटमॉस्फियर पैकेजिंग) क्या है?',
    whatIsMapAnswer: 'पैकेट से सामान्य हवा निकालकर उसमें खाद्य-ग्रेड नाइट्रोजन (सुरक्षा कुशन हेतु) और कार्बन डाइऑक्साइड (फफूंद व बैक्टीरिया मारने हेतु) भरी जाती है।',
    whatIsMicroPerf: 'फलों के लिए माइक्रो-परफोरेशन क्यों जरूरी है?',
    whatIsMicroPerfAnswer: 'पेड़ से तोड़ने के बाद भी फल जीवित रहते हैं और सांस लेते हैं। बिना छिद्र वाले पैकेट में वे घुट जाते हैं और सड़ जाते हैं। लेजर छिद्र उन्हें धीरे-धीरे सांस लेने देते हैं।',
    laminateLayers: 'पैकेजिंग सामग्री की परतें एवं संरचना',
    technicalSpecs: 'तकनीकी विनिर्देश एवं गैस अनुपात',
    sustainabilityTitle: 'पर्यावरण-अनुकूल एवं पुनर्चक्रण रेटिंग',
    jsonOutput: 'MoFPI मानक JSON आउटपुट',
    dossierButton: 'MoFPI तकनीकी डोजियर प्रिंट करें',
    exportJsonButton: 'JSON निर्यात करें',
    historyTitle: 'हालिया विश्लेषण इतिहास (अंतिम 5)',
    historySubtitle: 'पिछले मापदंडों को तुरंत लोड करें या पैकेजिंग समाधान देखें',
    historyEmpty: 'कोई पिछला विश्लेषण सहेजा नहीं गया है। इतिहास बनाने हेतु ऊपर विश्लेषण चलाएं।',
    historyLoad: 'डेटा लोड करें',
    historyViewSolution: 'समाधान देखें',
    historyClear: 'इतिहास साफ़ करें',
    historyJustNow: 'अभी-अभी',
    themeLabel: 'थीम',
    themeNormal: 'सामान्य (Normal)',
    themeDark: 'डार्क मोड (Dark)',
    themeFood: 'खाद्य थीम (Food)',
    themeNormalDesc: 'साफ़, मानक और पढ़ने में आसान लाइट थीम',
    themeDarkDesc: 'आधुनिक गहरा डार्क थीम',
    themeFoodDesc: 'केसरिया व खाद्य प्रसंस्करण वॉर्म थीम',
    categories: {
      produce: 'ताजे फल एवं सब्जियां',
      dryGoods: 'सूखा सामान एवं नमकीन/स्नैक्स',
      highFat: 'डेयरी एवं वसायुक्त उत्पाद',
      frozen: 'फ्रोजन खाद्य पदार्थ',
      bakery: 'बेकरी एवं ब्रेड उत्पाद',
      meat: 'मांस, पोल्ट्री एवं समुद्री भोजन'
    }
  },
  te: {
    appName: 'ప్యాక్ఏఐ (PackAI) ఫుడ్ ప్యాకేజింగ్ ఇంజిన్',
    appSubtitle: 'ఆహార శుద్ధి పరిశ్రమల మంత్రిత్వ శాఖ (MoFPI) ఆమోదిత ప్యాకేజింగ్ & ధర కాలిక్యులేటర్',
    mofpiBadge: 'MoFPI భారత ప్రభుత్వం అధికారిక మార్గదర్శకాలు',
    fssaiBadge: 'FSSAI ప్యాకేజింగ్ నిబంధనలు 2018 • BIS IS 9845 ధృవీకరించబడింది',
    tab1Name: 'దశ 1: ఆహార వివరాలు & ధర కాలిక్యులేటర్',
    tab1Desc: 'ఆహార లక్షణాలు, ప్యాక్ బరువు, బ్యాచ్ పరిమాణం మరియు ప్యాకేజింగ్ ఖర్చులను నమోదు చేయండి',
    tab2Name: 'దశ 2: ప్యాకేజింగ్ పరిష్కారం & సాంకేతిక వివరాలు',
    tab2Desc: 'లేయర్ నిర్మాణం, గ్యాస్ ఫ్లష్ నిష్పత్తులు మరియు అధికారిక ప్రభుత్వ నివేదికను వీక్షించండి',
    quickPresets: 'ప్రసిద్ధ ఆహార ప్రీసెట్‌ను ఎంచుకోండి',
    commodityInputHeading: 'ఆహార పదార్థాల వివరాలు & నిల్వ పరిస్థితులు',
    commodityInputSub: 'ఖచ్చితమైన ప్యాకేజింగ్ మెటీరియల్ మరియు ఖర్చు పొందడానికి ఆహార గుణాలను నమోదు చేయండి',
    commodityName: 'ఆహార ఉత్పత్తి పేరు',
    commodityNamePlaceholder: 'ఉదా: మామిడి పండ్లు, పొటాటో చిప్స్, పన్నీర్, నెయ్యి',
    category: 'ఆహార వర్గం',
    moisture: 'తేమ శాతం (%) [Moisture Content]',
    moistureHint: 'ఆహారంలోని నీటి పరిమాణం. అధిక తేమ వల్ల బూజు పడుతుంది; తక్కువ తేమ ఉన్నవి మెత్తబడతాయి.',
    fat: 'నూనె / కొవ్వు పరిమాణం (%) [Fat/Oil]',
    fatHint: '10% కంటే ఎక్కువ కొవ్వు గాలికి గురైతే దుర్వాసన మరియు చేదు వస్తుంది.',
    respirationRate: 'శ్వాసక్రియ రేటు (mL O2/kg·h)',
    respirationHint: 'తాజా పండ్లు మరియు కూరగాయలు శ్వాసిస్తాయి. కుళ్ళిపోకుండా ఉండటానికి మైక్రో-రంధ్రాలు అవసరం.',
    shelfLife: 'లక్ష్య నిల్వ కాలం (రోజులు)',
    shelfLifeHint: 'ఈ ప్యాకెట్ ఆహారాన్ని ఎన్ని రోజుల పాటు తాజాగా రక్షించాలి.',
    storageTemp: 'నిల్వ ఉష్ణోగ్రత (°C)',
    ambientHumidity: 'పరిసర తేమ (% RH)',
    storageMode: 'నిల్వ విధానం',
    ambient: 'సాధారణ ఉష్ణోగ్రత (Ambient)',
    chilled: 'శీతల నిల్వ (Chilled 0-10°C)',
    frozen: 'డీప్ ఫ్రోజెన్ (-18°C)',
    packPriceSection: 'ప్యాకేజింగ్ ధర & ఉత్పత్తి బ్యాచ్ ఆర్థిక విశ్లేషణ',
    packPriceSub: 'ఒక్కో ప్యాకెట్ ఖర్చు, మొత్తం బ్యాచ్ బడ్జెట్ మరియు ప్రభుత్వ సబ్సిడీని లెక్కించండి',
    packSize: 'ప్యాక్ పరిమాణం (నికర బరువు)',
    retailPrice: 'రిటైల్ MRP ధర (₹)',
    batchVolume: 'ఉత్పత్తి బ్యాచ్ పరిమాణం (యూనిట్లు)',
    budgetCeiling: 'గరిష్ట ప్యాకేజింగ్ బడ్జెట్ (₹/యూనిట్)',
    calculateButton: 'ప్యాకేజింగ్ పరిష్కారం & ధరను లెక్కించండి',
    calculating: 'ఆహార శాస్త్రం మరియు ఖర్చు విశ్లేషణ జరుగుతోంది...',
    activeRulesTitle: 'MoFPI తప్పనిసరి ఆహార భద్రతా నిబంధనలు',
    rule1Title: 'అధిక కొవ్వు (>10%): ఆక్సిజన్ నిరోధం తప్పనిసరి (OTR < 10)',
    rule1Desc: 'కొవ్వు పాడవకుండా ఉండటానికి అల్యూమినియం ఫాయిల్ లేదా EVOH అడ్డంకి వాడకం.',
    rule2Title: 'కరకరలాడే చిప్స్: తేమ నిరోధకం (WVTR < 1.5)',
    rule2Desc: 'చిప్స్ మరియు బిస్కెట్లు మెత్తబడకుండా కరకరలాడేలా ఉంచే తేమ రక్షణ.',
    rule3Title: 'తాజా పండ్లు: ఎట్టి పరిస్థితుల్లోనూ ఎయిర్‌టైట్ చేయకూడదు',
    rule3Desc: 'పండ్లు శ్వాసించడానికి లేజర్ సూక్ష్మ రంధ్రాలు అవసరం; గాలి లేకపోతే కుళ్ళిపోతాయి.',
    rule4Title: 'రక్షిత వాయువు ఫ్లష్ (MAP Gas Flush)',
    rule4Desc: 'ప్యాకెట్ నుండి చెడు గాలిని తొలగించి నత్రజని మరియు CO2 వాయువును నింపడం.',
    executiveSummary: 'ప్యాకేజింగ్ సిఫార్సు సారాంశం',
    estimatedPricePerUnit: 'ఒక్కో ప్యాకెట్ ధర',
    totalBatchCost: 'మొత్తం బ్యాచ్ ఖర్చు',
    percentOfMrp: 'MRP లో శాతం',
    mofpiSubsidy: 'MoFPI 35% గ్రాంట్ సబ్సిడీ',
    easyGuideTitle: 'సులభమైన శైలిలో ఫుడ్ ప్యాకేజింగ్ సైన్స్ వివరణ',
    easyGuideSub: 'మీ ఆహార రక్షణ కోసం ప్రతి లేయర్ మరియు గ్యాస్ ఎందుకు అవసరమో తెలుసుకోండి',
    whatIsOtr: 'OTR అంటే ఏమిటి?',
    whatIsOtrAnswer: 'ప్యాకెట్ లోపలికి ఎంత ఆక్సిజన్ చొరబడుతుందో OTR కొలుస్తుంది. తక్కువ సంఖ్య అంటే ఎక్కువ రక్షణ. నెయ్యి, చిప్స్, పన్నీర్ వంటి కొవ్వు పదార్థాలు పాడవకుండా ఉండటానికి తక్కువ OTR అవసరం.',
    whatIsWvtr: 'WVTR అంటే ఏమిటి?',
    whatIsWvtrAnswer: 'తేమ ఎంత సులభంగా ప్యాకెట్‌లోకి ప్రవేశిస్తుందో WVTR చెబుతుంది. చిప్స్, బిస్కెట్లు మెత్తబడకుండా కరకరలాడాలంటే అతి తక్కువ WVTR ఉండాలి.',
    whatIsMap: 'MAP గ్యాస్ ఫ్లష్ అంటే ఏమిటి?',
    whatIsMapAnswer: 'సాధారణ గాలికి బదులుగా ఫుడ్-గ్రేడ్ నైట్రోజన్ మరియు కార్బన్ డయాక్సైడ్ నింపి బూజు, బ్యాక్టీరియా రాకుండా సహజంగా ఆహారాన్ని కాపాడటం.',
    whatIsMicroPerf: 'పండ్లకు సూక్ష్మ రంధ్రాలు ఎందుకు కావాలి?',
    whatIsMicroPerfAnswer: 'కోసిన తర్వాత కూడా పండ్లు శ్వాసిస్తాయి. గాలి చొరబడని ప్యాకెట్‌లో ఆక్సిజన్ అయిపోయి దుర్వాసనతో కూడిన ఆల్కహాల్ తయారవుతుంది. లేజర్ రంధ్రాలు శ్వాసను అందిస్తాయి.',
    laminateLayers: 'ప్యాకేజింగ్ మెటీరియల్ లేయర్లు & నిర్మాణం',
    technicalSpecs: 'సాంకేతిక వివరాలు & వాయు నిష్పత్తులు',
    sustainabilityTitle: 'పర్యావరణ హిత & రీసైక్లింగ్ రేటింగ్',
    jsonOutput: 'అధికారిక MoFPI JSON అవుట్‌పుట్',
    dossierButton: 'ప్రభుత్వ సాంకేతిక నివేదికను ప్రింట్ చేయండి',
    exportJsonButton: 'JSON ఎగుమతి చేయండి',
    historyTitle: 'ఇటీవలి విశ్లేషణ చరిత్ర (గత 5)',
    historySubtitle: 'మునుపటి ఫలితాలను త్వరగా రీలోడ్ చేయండి లేదా సొల్యూషన్ చూడండి',
    historyEmpty: 'ఇంతవరకు ఏ విశ్లేషణ చరిత్ర లేదు. ఫలితాన్ని రూపొందించడానికి పైన విశ్లేషణను ప్రారంభించండి.',
    historyLoad: 'డేటాను లోడ్ చేయి',
    historyViewSolution: 'సొల్యూషన్ చూడండి',
    historyClear: 'చరిత్ర క్లియర్ చేయి',
    historyJustNow: 'ఇప్పుడే',
    themeLabel: 'థీమ్',
    themeNormal: 'సాధారణ (Normal)',
    themeDark: 'డార్క్ మోడ్ (Dark)',
    themeFood: 'ఫుడ్ థీమ్ (Food)',
    themeNormalDesc: 'స్పష్టమైన, ప్రమాణిక లైట్ థీమ్',
    themeDarkDesc: 'ఆధునిక డార్క్ రంగు శైలి',
    themeFoodDesc: 'కుంకుమపువ్వు & ఆహార ప్రాసెసింగ్ థీమ్',
    categories: {
      produce: 'తాజా పండ్లు & కూరగాయలు',
      dryGoods: 'ఎండిన వస్తువులు & స్నాక్స్',
      highFat: 'పాల ఉత్పత్తులు & కొవ్వు ఆహారాలు',
      frozen: 'ఘనీభవించిన ఆహారాలు (Frozen)',
      bakery: 'బేకరీ & బ్రెడ్ ఉత్పత్తులు',
      meat: 'మాంసం, పౌల్ట్రీ & సీఫుడ్'
    }
  },
  kn: {
    appName: 'ಪ್ಯಾಕ್‌ಎಐ (PackAI) ಆಹಾರ ಪ್ಯಾಕೇಜಿಂಗ್ ಎಂಜಿನ್',
    appSubtitle: 'ಆಹಾರ ಸಂಸ್ಕರಣಾ ಕೈಗಾರಿಕೆಗಳ ಸಚಿವಾಲಯ (MoFPI) ಅನುಮೋದಿತ ಪ್ಯಾಕೇಜಿಂಗ್ ಮತ್ತು ಬೆಲೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    mofpiBadge: 'MoFPI ಭಾರತ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಮಾರ್ಗಸೂಚಿಗಳು',
    fssaiBadge: 'FSSAI ಪ್ಯಾಕೇಜಿಂಗ್ ನಿಯಮಗಳು 2018 • BIS IS 9845 ಪ್ರಮಾಣೀಕೃತ',
    tab1Name: 'ಹಂತ 1: ಆಹಾರದ ವಿವರಗಳು ಮತ್ತು ಪ್ಯಾಕಿಂಗ್ ಬೆಲೆ',
    tab1Desc: 'ಆಹಾರದ ಗುಣಗಳು, ಪ್ಯಾಕ್ ತೂಕ, ಬ್ಯಾಚ್ ಪ್ರಮಾಣ ಮತ್ತು ಪ್ಯಾಕೇಜಿಂಗ್ ವೆಚ್ಚದ ಗುರಿಗಳನ್ನು ನಮೂದಿಸಿ',
    tab2Name: 'ಹಂತ 2: ಪ್ಯಾಕೇಜಿಂಗ್ ಪರಿಹಾರ ಮತ್ತು ಪದರಗಳ ವಿವರ',
    tab2Desc: 'ಲೇಯರ್ ವಿನ್ಯಾಸ, ತಡೆಗೋಡೆ ಗುಣಲಕ್ಷಣಗಳು, ಗ್ಯಾಸ್ ಫ್ಲಶ್ ಮತ್ತು ಅಧಿಕೃತ ವರದಿಯನ್ನು ವೀಕ್ಷಿಸಿ',
    quickPresets: 'ಜನಪ್ರಿಯ ಆಹಾರ ಪ್ರಿಸೆಟ್ ಆಯ್ಕೆಮಾಡಿ',
    commodityInputHeading: 'ಆಹಾರ ಉತ್ಪನ್ನದ ವಿವರಣೆ ಮತ್ತು ಶೇಖರಣಾ ಪರಿಸ್ಥಿತಿಗಳು',
    commodityInputSub: 'ನಿಖರವಾದ ಪ್ಯಾಕೇಜಿಂಗ್ ವಸ್ತು ಮತ್ತು ವೆಚ್ಚವನ್ನು ಪಡೆಯಲು ಆಹಾರ ಗುಣಲಕ್ಷಣಗಳನ್ನು ನಮೂದಿಸಿ',
    commodityName: 'ಆಹಾರ ಉತ್ಪನ್ನದ ಹೆಸರು',
    commodityNamePlaceholder: 'ಉದಾ: ಆಲ್ಫಾನ್ಸೋ ಮಾವು, ಆಲೂಗಡ್ಡೆ ಚಿಪ್ಸ್, ಪನ್ನೀರ್, ತುಪ್ಪ',
    category: 'ಆಹಾರ ವರ್ಗ',
    moisture: 'ತೇವಾಂಶ ಪ್ರಮಾಣ (%) [Moisture]',
    moistureHint: 'ಆಹಾರದಲ್ಲಿರುವ ನೀರಿನ ಪ್ರಮಾಣ. ಹೆಚ್ಚು ತೇವಾಂಶದಿಂದ ಶಿಲೀಂಧ್ರ ಬರುತ್ತದೆ; ಕಡಿಮೆ ತೇವಾಂಶದವು ಮೆತ್ತಗಾಗುತ್ತವೆ.',
    fat: 'ಎಣ್ಣೆ / ಕೊಬ್ಬಿನ ಪ್ರಮಾಣ (%) [Fat/Oil]',
    fatHint: '10% ಕ್ಕಿಂತ ಹೆಚ್ಚು ಕೊಬ್ಬು ಗಾಳಿಗೆ ಒಡ್ಡಿಕೊಂಡರೆ ದುರ್ವಾಸನೆ ಉಂಟಾಗುತ್ತದೆ (ರ‍್ಯಾನ್ಸಿಡಿಟಿ).',
    respirationRate: 'ಉಸಿರಾಟದ ದರ (mL O2/kg·h)',
    respirationHint: 'ತಾಜಾ ಹಣ್ಣು ಮತ್ತು ತರಕಾರಿಗಳು ಉಸಿರಾಡುತ್ತವೆ. ಕೊಳೆಯುವುದನ್ನು ತಡೆಯಲು ಸೂಕ್ಷ್ಮ ರಂಧ್ರಗಳು ಅಗತ್ಯ.',
    shelfLife: 'ಉದ್ದೇಶಿತ ಶೆಲ್ಫ್ ಲೈಫ್ (ದಿನಗಳು)',
    shelfLifeHint: 'ಈ ಪ್ಯಾಕೆಟ್ ಆಹಾರವನ್ನು ಎಷ್ಟು ದಿನಗಳವರೆಗೆ ಸಂಪೂರ್ಣವಾಗಿ ತಾಜಾವಾಗಿ ರಕ್ಷಿಸಬೇಕು.',
    storageTemp: 'ಶೇಖರಣಾ ತಾಪಮಾನ (°C)',
    ambientHumidity: 'ಸುತ್ತಮುತ್ತಲಿನ ತೇವಾಂಶ (% RH)',
    storageMode: 'ಶೇಖರಣಾ ವಿಧಾನ',
    ambient: 'ಸಾಮಾನ್ಯ ತಾಪಮಾನ (Ambient)',
    chilled: 'ಶೀತಲ ಶೇಖರಣೆ (Chilled 0-10°C)',
    frozen: 'ಡೀಪ್ ಫ್ರೋಜನ್ (-18°C)',
    packPriceSection: 'ಪ್ಯಾಕೇಜಿಂಗ್ ಬೆಲೆ ಮತ್ತು ವಾಣಿಜ್ಯ ಬ್ಯಾಚ್ ಲೆಕ್ಕಾಚಾರ',
    packPriceSub: 'ಪ್ರತಿ ಪೌಚ್ ವೆಚ್ಚ, ಒಟ್ಟು ಬ್ಯಾಚ್ ಬಜೆಟ್ ಮತ್ತು ಸರ್ಕಾರದ ಸಬ್ಸಿಡಿಯನ್ನು ಲೆಕ್ಕಹಾಕಿ',
    packSize: 'ಪ್ಯಾಕ್ ಗಾತ್ರ (ನಿವ್ವಳ ತೂಕ)',
    retailPrice: 'ಚಿಲ್ಲರೆ ಎಂಆರ್‌ಪಿ ಬೆಲೆ (₹)',
    batchVolume: 'ಉತ್ಪಾದನಾ ಬ್ಯಾಚ್ ಪ್ರಮಾಣ (ಯೂನಿಟ್‌ಗಳು)',
    budgetCeiling: 'ಗರಿಷ್ಠ ಪ್ಯಾಕೇಜಿಂಗ್ ಬಜೆಟ್ (₹/ಯೂನಿಟ್)',
    calculateButton: 'ಪ್ಯಾಕೇಜಿಂಗ್ ಪರಿಹಾರ ಮತ್ತು ಬೆಲೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ',
    calculating: 'ಆಹಾರ ವಿಜ್ಞಾನ ಮತ್ತು ವೆಚ್ಚ ವಿಶ್ಲೇಷಣೆ ಪ್ರಗತಿಯಲ್ಲಿದೆ...',
    activeRulesTitle: 'MoFPI ಕಡ್ಡಾಯ ಆಹಾರ ಸುರಕ್ಷತಾ ನಿಯಮಗಳು',
    rule1Title: 'ಅಧಿಕ ಕೊಬ್ಬು (>10%): ಆಮ್ಲಜನಕ ತಡೆ ಕಡ್ಡಾಯ (OTR < 10)',
    rule1Desc: 'ಕೊಬ್ಬು ಕೆಡದಂತೆ ತಡೆಯಲು ಅಲ್ಯೂಮಿನಿಯಂ ಫಾಯಿಲ್ ಅಥವಾ EVOH ತಡೆಗೋಡೆ ಬಳಕೆ.',
    rule2Title: 'ಗರಿಗರಿಯಾದ ಆಹಾರ: ತೇವಾಂಶ ತಡೆಗೋಡೆ (WVTR < 1.5)',
    rule2Desc: 'ಚಿಪ್ಸ್ ಮತ್ತು ಬಿಸ್ಕತ್ತುಗಳು ಮೆತ್ತಗಾಗದಂತೆ ಗರಿಗರಿಯಾಗಿಡಲು ತೇವಾಂಶ ತಡೆ.',
    rule3Title: 'ತಾಜಾ ತೋಟಗಾರಿಕಾ ಬೆಳೆಗಳು: ಸಂಪೂರ್ಣ ಗಾಳಿಬಂಧನ ನಿಷೇಧ',
    rule3Desc: 'ಹಣ್ಣು-ತರಕಾರಿಗಳು ಉಸಿರಾಡಲು ಲೇಸರ್ ಸೂಕ್ಷ್ಮ ರಂಧ್ರಗಳು ಕಡ್ಡಾಯ.',
    rule4Title: 'ರಕ್ಷಣಾತ್ಮಕ ಅನಿಲ ಫ್ಲಶ್ (MAP Gas Flush)',
    rule4Desc: 'ಪ್ಯಾಕೆಟ್‌ನಿಂದ ಕೆಟ್ಟ ಗಾಳಿ ತೆಗೆದು ಸಾರಜನಕ ಮತ್ತು CO2 ಅನಿಲ ತುಂಬುವುದು.',
    executiveSummary: 'ಪ್ಯಾಕೇಜಿಂಗ್ ಶಿಫಾರಸಿನ ಸಾರಾಂಶ',
    estimatedPricePerUnit: 'ಪ್ರತಿ ಪೌಚ್ ಬೆಲೆ',
    totalBatchCost: 'ಒಟ್ಟು ಬ್ಯಾಚ್ ವೆಚ್ಚ',
    percentOfMrp: 'MRP ಯಲ್ಲಿ ಶೇಕಡಾವಾರು',
    mofpiSubsidy: 'MoFPI 35% ಸರ್ಕಾರದ ಅನುದಾನ',
    easyGuideTitle: 'ಆಹಾರ ಪ್ಯಾಕೇಜಿಂಗ್ ವಿಜ್ಞಾನದ ಸರಳ ವಿವರಣೆ',
    easyGuideSub: 'ನಿಮ್ಮ ಆಹಾರ ರಕ್ಷಣೆಗಾಗಿ ಪ್ರತಿಯೊಂದು ಪದರ ಮತ್ತು ಅನಿಲ ಏಕೆ ಬೇಕು ಎಂದು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ',
    whatIsOtr: 'OTR ಅಂದರೆ ಏನು?',
    whatIsOtrAnswer: 'ಪ್ಯಾಕೆಟ್ ಒಳಗೆ ಎಷ್ಟು ಆಮ್ಲಜನಕ ಸೋರಿಕೆಯಾಗುತ್ತದೆ ಎಂಬುದನ್ನು OTR ಅಳೆಯುತ್ತದೆ. ಕಡಿಮೆ ಸಂಖ್ಯೆ ಎಂದರೆ ಹೆಚ್ಚು ರಕ್ಷಣೆ. ತುಪ್ಪ, ಚಿಪ್ಸ್ ಮತ್ತು ಪನ್ನೀರ್‌ನಂತಹ ಕೊಬ್ಬಿನ ಆಹಾರಗಳು ಕೆಡದಂತೆ ಇರಲು ಕಡಿಮೆ OTR ಬೇಕು.',
    whatIsWvtr: 'WVTR ಅಂದರೆ ಏನು?',
    whatIsWvtrAnswer: 'ತೇವಾಂಶವು ಎಷ್ಟು ಸುಲಭವಾಗಿ ಪ್ಯಾಕೆಟ್‌ಗೆ ಪ್ರವೇಶಿಸುತ್ತದೆ ಎಂಬುದನ್ನು WVTR ತೋರಿಸುತ್ತದೆ. ಚಿಪ್ಸ್, ಬಿಸ್ಕತ್ತುಗಳು ಗರಿಗರಿಯಾಗಿರಲು ಅತಿ ಕಡಿಮೆ WVTR ಬೇಕು.',
    whatIsMap: 'MAP ಗ್ಯಾಸ್ ಫ್ಲಶ್ ಎಂದರೇನು?',
    whatIsMapAnswer: 'ಸಾಮಾನ್ಯ ಗಾಳಿಯ ಬದಲು ಆಹಾರ-ದರ್ಜೆಯ ಸಾರಜನಕ ಮತ್ತು ಕಾರ್ಬನ್ ಡೈಆಕ್ಸೈಡ್ ತುಂಬಿ ಶಿಲೀಂಧ್ರ ಮತ್ತು ಬ್ಯಾಕ್ಟೀರಿಯಾಗಳನ್ನು ತಡೆಗಟ್ಟುವುದು.',
    whatIsMicroPerf: 'ಹಣ್ಣುಗಳಿಗೆ ಸೂಕ್ಷ್ಮ ರಂಧ್ರಗಳು ಏಕೆ ಬೇಕು?',
    whatIsMicroPerfAnswer: 'ಕೊಯ್ದ ನಂತರವೂ ಹಣ್ಣುಗಳು ಉಸಿರಾಡುತ್ತವೆ. ಗಾಳಿಯಾಡದ ಪ್ಯಾಕೆಟ್‌ನಲ್ಲಿ ಆಮ್ಲಜನಕ ಮುಗಿದು ಆಲ್ಕೋಹಾಲ್ ವಾಸನೆ ಬರುತ್ತದೆ. ಲೇಸರ್ ರಂಧ್ರಗಳು ಅವುಗಳನ್ನು ಜೀವಂತವಾಗಿರಿಸುತ್ತವೆ.',
    laminateLayers: 'ಪ್ಯಾಕೇಜಿಂಗ್ ವಸ್ತುಗಳ ಪದರಗಳು ಮತ್ತು ರಚನೆ',
    technicalSpecs: 'ತಾಂತ್ರಿಕ ವಿವರಣೆಗಳು ಮತ್ತು ಅನಿಲ ಅನುಪಾತ',
    sustainabilityTitle: 'ಪರಿಸರ ಸ್ನೇಹಿ ಮತ್ತು ಮರುಬಳಕೆ ರೇಟಿಂಗ್',
    jsonOutput: 'ಅಧಿಕೃತ MoFPI JSON ಔಟ್‌ಪುಟ್',
    dossierButton: 'ಅಧಿಕೃತ ವರದಿಯನ್ನು ಮುದ್ರಿಸಿ',
    exportJsonButton: 'JSON ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    historyTitle: 'ಇತ್ತೀಚಿನ ವಿಶ್ಲೇಷಣೆ ಇತಿಹಾಸ (ಕೊನೆಯ 5)',
    historySubtitle: 'ಹಿಂದಿನ ಫಲಿತಾಂಶಗಳನ್ನು ತ್ವರಿತವಾಗಿ ಮರುಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಪರಿಶೀಲಿಸಿ',
    historyEmpty: 'ಯಾವುದೇ ವಿಶ್ಲೇಷಣಾ ಇತಿಹಾಸವಿಲ್ಲ. ಹೊಸ ಫಲಿತಾಂಶ ಪಡೆಯಲು ಮೇಲೆ ವಿಶ್ಲೇಷಿಸಿ.',
    historyLoad: 'ಡೇಟಾ ಲೋಡ್ ಮಾಡಿ',
    historyViewSolution: 'ಪರಿಹಾರ ವೀಕ್ಷಿಸಿ',
    historyClear: 'ಇತಿಹಾಸ ತೆರವುಗೊಳಿಸಿ',
    historyJustNow: 'ಈಗಷ್ಟೇ',
    themeLabel: 'ಥೀಮ್',
    themeNormal: 'ಸಾಮಾನ್ಯ (Normal)',
    themeDark: 'ಡಾರ್ಕ್ ಮೋಡ್ (Dark)',
    themeFood: 'ಆಹಾರ ಥೀಮ್ (Food)',
    themeNormalDesc: 'ಸ್ವಚ್ಛ, ಪ್ರಮಾಣಿತ ಹಗಲು ಬೆಳಕಿನ ಥೀಮ್',
    themeDarkDesc: 'ಆಧುನಿಕ ಕಡು ಕಪ್ಪು ಶೈಲಿ',
    themeFoodDesc: 'ಕೇಸರಿ ಮತ್ತು ಆಹಾರ ಸಂಸ್ಕರಣಾ ಬೆಚ್ಚಗಿನ ಥೀಮ್',
    categories: {
      produce: 'ತಾಜಾ ಹಣ್ಣುಗಳು ಮತ್ತು ತರಕಾರಿಗಳು',
      dryGoods: 'ಒಣ ಪದಾರ್ಥಗಳು ಮತ್ತು ತಿಂಡಿಗಳು',
      highFat: 'ಡೈರಿ ಮತ್ತು ಕೊಬ್ಬಿನ ಆಹಾರಗಳು',
      frozen: 'ಘನೀಕೃತ ಆಹಾರಗಳು (Frozen)',
      bakery: 'ಬೇಕರಿ ಮತ್ತು ಬ್ರೆಡ್ ಉತ್ಪನ್ನಗಳು',
      meat: 'ಮಾಂಸ, ಕೋಳಿ ಮತ್ತು ಸಮುದ್ರಾಹಾರ'
    }
  },
  mr: {
    appName: 'पॅकएआय (PackAI) अन्न पॅकेजिंग इंजिन',
    appSubtitle: 'अन्न प्रक्रिया उद्योग मंत्रालय (MoFPI) मान्यताप्राप्त पॅकेजिंग साहित्य व किंमत ऑप्टिमायझर',
    mofpiBadge: 'अन्न प्रक्रिया उद्योग मंत्रालय (MoFPI) भारत सरकार मार्गदर्शक तत्त्वे',
    fssaiBadge: 'FSSAI पॅकेजिंग नियम २०१८ • BIS IS 9845 प्रमाणित',
    tab1Name: 'टप्पा १: अन्न तपशील व पॅकिंग किंमत कॅल्क्युलेटर',
    tab1Desc: 'अन्नाचे गुणधर्म, पॅकचे वजन, बॅचचे प्रमाण आणि पॅकेजिंग बजेट लक्ष्य प्रविष्ट करा',
    tab2Name: 'टप्पा २: पॅकेजिंग उपाय व तांत्रिक स्तर रचना',
    tab2Desc: 'मटेरियल थर, बॅरियर वैशिष्ट्ये, गॅस फ्लश प्रमाण आणि अधिकृत अहवाल पहा',
    quickPresets: 'लोकप्रिय भारतीय खाद्य प्रीसेट निवडा',
    commodityInputHeading: 'खाद्य उत्पादन वैशिष्ट्ये आणि साठवण अटी',
    commodityInputSub: 'अचूक पॅकेजिंग सामग्री व खर्च मिळवण्यासाठी अन्नाचे गुणधर्म प्रविष्ट करा',
    commodityName: 'खाद्यपदार्थाचे नाव',
    commodityNamePlaceholder: 'उदा. हापूस आंबा, बटाटा वेफर्स, पनीर, तूप',
    category: 'अन्न श्रेणी',
    moisture: 'ओलाव्याचे प्रमाण (%) [Moisture Content]',
    moistureHint: 'अन्नातील पाण्याचे प्रमाण. जास्त ओलाव्याने बुरशी येते; कमी ओलावा असलेले पदार्थ मऊ पडतात.',
    fat: 'तेल / चरबीचे प्रमाण (%) [Fat/Oil]',
    fatHint: '१०% पेक्षा जास्त चरबी हवा आणि प्रकाशाच्या संपर्कात आल्यास खराब होते व दुर्गंधी येते.',
    respirationRate: 'श्वसन दर (mL O2/kg·h)',
    respirationHint: 'ताजी फळे व भाज्या श्वास घेतात. कुजणे टाळण्यासाठी मायक्रो-छिद्र आवश्यक आहेत.',
    shelfLife: 'अपेक्षित शेल्फ लाइफ (दिवस)',
    shelfLifeHint: 'हे पॅकेट अन्नाला किती दिवस पूर्णपणे ताजे ठेवेल.',
    storageTemp: 'साठवण तापमान (°C)',
    ambientHumidity: 'सभोवतालची आर्द्रता (% RH)',
    storageMode: 'साठवणूक पद्धत',
    ambient: 'सामान्य तापमान (Ambient)',
    chilled: 'शीत साठवणूक (Chilled 0-10°C)',
    frozen: 'डीप फ्रोजन (-18°C)',
    packPriceSection: 'पॅकेजिंग किंमत आणि व्यावसायिक बॅच अर्थशास्त्र',
    packPriceSub: 'प्रति पाऊच खर्च, एकूण बॅच बजेट आणि MoFPI सरकारी सबसिडीची गणना करा',
    packSize: 'पॅक आकार (निव्वळ वजन)',
    retailPrice: 'किरकोळ एमआरपी किंमत (₹)',
    batchVolume: 'बॅच उत्पादन संख्या (Units)',
    budgetCeiling: 'कमाल पॅकेजिंग बजेट मर्यादा (₹/पाऊच)',
    calculateButton: 'पॅकेजिंग उपाय व खर्चाची गणना करा',
    calculating: 'अन्न विज्ञान आणि खर्च विश्लेषण प्रगतीपथावर...',
    activeRulesTitle: 'MoFPI अनिवार्य अन्न सुरक्षा व गुणवत्ता नियम',
    rule1Title: 'उच्च चरबी (>10%): ऑक्सिजन अवरोध अनिवार्य (OTR < 10)',
    rule1Desc: 'चरबी खराब होऊ नये म्हणून ॲल्युमिनियम फॉइल किंवा EVOH बॅरियर थर.',
    rule2Title: 'कुरकुरीत अन्न: जलबाष्प अवरोध (WVTR < 1.5)',
    rule2Desc: 'वेफर्स आणि बिस्किटे मऊ पडू नयेत म्हणून ओलावा प्रतिबंधक.',
    rule3Title: 'ताजी फळे व भाज्या: कधीही पूर्णपणे हवाबंद करू नये',
    rule3Desc: 'फळे श्वास घेण्यासाठी लेसर सूक्ष्म छिद्रे आवश्यक आहेत.',
    rule4Title: 'संरक्षक वायू फ्लश (MAP Gas Flush)',
    rule4Desc: 'पॅकेटमधील खराब हवा काढून नायट्रोजन आणि CO2 वायू भरणे.',
    executiveSummary: 'पॅकेजिंग शिफारस सारांश',
    estimatedPricePerUnit: 'प्रति पाऊच किंमत',
    totalBatchCost: 'एकूण बॅच उत्पादन खर्च',
    percentOfMrp: 'किरकोळ एमआरपीच्या %',
    mofpiSubsidy: 'MoFPI ३५% सरकारी अनुदान',
    easyGuideTitle: 'अन्न पॅकेजिंग विज्ञान सोप्या भाषेत समजून घ्या',
    easyGuideSub: 'आपल्या अन्नाचे रक्षण करण्यासाठी प्रत्येक थर आणि वायू का आवश्यक आहे ते जाणून घ्या',
    whatIsOtr: 'OTR म्हणजे काय?',
    whatIsOtrAnswer: 'पॅकेटमध्ये किती ऑक्सिजन शिरतो हे OTR मोजते. कमी संख्या म्हणजे जास्त संरक्षण. तूप, चिप्स आणि पनीर यांसारख्या चरबीयुक्त पदार्थांना कमी OTR आवश्यक आहे.',
    whatIsWvtr: 'WVTR म्हणजे काय?',
    whatIsWvtrAnswer: 'ओलावा किती सहजतेने पॅकेटमध्ये शिरतो हे WVTR दर्शवते. वेफर्स व बिस्किटे कुरकुरीत ठेवण्यासाठी अतिशय कमी WVTR आवश्यक आहे.',
    whatIsMap: 'MAP गॅस फ्लश म्हणजे काय?',
    whatIsMapAnswer: 'साध्या हवेऐवजी फूड-ग्रेड नायट्रोजन आणि कार्बन डायऑक्साईड भरून बुरशी व जिवाणू नष्ट करणे.',
    whatIsMicroPerf: 'फळांसाठी सूक्ष्म छिद्रे का आवश्यक आहेत?',
    whatIsMicroPerfAnswer: 'झाडावरून तोडल्यानंतरही फळे जिवंत असतात आणि श्वास घेतात. हवा नसलेल्या पाकिटात त्यांचा गुदमरून दुर्गंधी येते. लेसर छिद्रे त्यांना जिवंत ठेवतात.',
    laminateLayers: 'पॅकेजिंग साहित्य थर आणि रचना',
    technicalSpecs: 'तांत्रिक वैशिष्ट्ये आणि वायू प्रमाण',
    sustainabilityTitle: 'पर्यावरण-पूरक आणि पुनर्वापर रेटिंग',
    jsonOutput: 'MoFPI अधिकृत JSON आउटपुट',
    dossierButton: 'MoFPI अधिकृत अहवाल प्रिंट करा',
    exportJsonButton: 'JSON डाउनलोड करा',
    historyTitle: 'अलीकडील विश्लेषण इतिहास (शेवटचे ५)',
    historySubtitle: 'मागील निकाल त्वरित रीलोड करा किंवा पॅकेजिंग उपाय तपासा',
    historyEmpty: 'अद्याप कोणताही विश्लेषण इतिहास उपलब्ध नाही. निकाल मिळविण्यासाठी वरील विश्लेषण सुरू करा.',
    historyLoad: 'डेटा लोड करा',
    historyViewSolution: 'उपाय पहा',
    historyClear: 'इतिहास हटवा',
    historyJustNow: 'आत्ताच',
    themeLabel: 'थीम',
    themeNormal: 'सामान्य (Normal)',
    themeDark: 'डार्क मोड (Dark)',
    themeFood: 'खाद्य थीम (Food)',
    themeNormalDesc: 'स्वच्छ, मानक आणि वाचण्यास सुलभ लाइट थीम',
    themeDarkDesc: 'आधुनिक गडद डार्क थीम',
    themeFoodDesc: 'केसर व अन्न प्रक्रिया वॉर्म थीम',
    categories: {
      produce: 'ताजी फळे आणि भाज्या',
      dryGoods: 'सुके पदार्थ आणि स्नॅक्स/वेफर्स',
      highFat: 'डेअरी आणि चरबीयुक्त पदार्थ',
      frozen: 'गोठवलेले अन्न (Frozen)',
      bakery: 'बेकरी आणि ब्रेड उत्पादने',
      meat: 'मांस, पोल्ट्री आणि सीफूड'
    }
  }
};
