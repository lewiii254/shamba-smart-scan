import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Translation {
  [key: string]: string | Translation;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  translations: Translation;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    translations: {
      app: {
        title: 'AI Crop Doctor',
        tagline: 'Advanced Plant Disease Detection',
      },
      navigation: {
        scan: 'Scan',
        history: 'History',
        about: 'About',
        droneAnalysis: 'Drone Analysis',
        pestPrediction: 'Pest Prediction',
        partnerships: 'Partnerships',
      },
      scan: {
        title: 'Crop Doctor AI',
        description: 'Our advanced AI model analyzes plant images to detect diseases and provide treatment recommendations',
        uploadImage: 'Upload plant image',
        analyze: 'Analyze',
        analyzing: 'Analyzing...',
        newScan: 'New Scan',
      },
      voice: {
        startListening: 'Start Voice Command',
        stopListening: 'Stop Listening',
        speak: 'Speak Result',
        listening: 'Listening...',
      }
    }
  },
  {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    flag: '🇰🇪',
    translations: {
      app: {
        title: 'AI Daktari wa Mazao',
        tagline: 'Utambuzi wa Juu wa Magonjwa ya Mimea',
      },
      navigation: {
        scan: 'Chunguza',
        history: 'Historia',
        about: 'Kuhusu',
        droneAnalysis: 'Uchambuzi wa Drone',
        pestPrediction: 'Utabiri wa Wadudu',
        partnerships: 'Ushirikiano',
      },
      scan: {
        title: 'AI Daktari wa Mazao',
        description: 'Mfumo wetu wa kisasa wa AI unachambua picha za mimea kutambua magonjwa na kutoa mapendekezo ya matibabu',
        uploadImage: 'Pakia picha ya mmea',
        analyze: 'Chambua',
        analyzing: 'Inachambua...',
        newScan: 'Uchunguzi Mpya',
      },
      voice: {
        startListening: 'Anza Amri ya Sauti',
        stopListening: 'Acha Kusikiliza',
        speak: 'Sema Matokeo',
        listening: 'Inasikiliza...',
      }
    }
  },
  {
    code: 'yo',
    name: 'Yoruba',
    nativeName: 'Yorùbá',
    flag: '🇳🇬',
    translations: {
      app: {
        title: 'AI Dokita Ire',
        tagline: 'Iwadii Aisan Eso Ti O Ga Ju',
      },
      navigation: {
        scan: 'Wo',
        history: 'Itan',
        about: 'Nipa',
        droneAnalysis: 'Itupalẹ Drone',
        pestPrediction: 'Asọtẹlẹ Kokoro',
        partnerships: 'Ajọṣepọ',
      },
      scan: {
        title: 'AI Dokita Ire',
        description: 'Ẹrọ AI wa ti o ga julọ n ṣe ayewo awọn aworan eso lati rii awọn aisan ati pese awọn imọran itọju',
        uploadImage: 'Gbe aworan eso soke',
        analyze: 'Ṣe ayewo',
        analyzing: 'N ṣe ayewo...',
        newScan: 'Ayewo Tuntun',
      },
      voice: {
        startListening: 'Bẹrẹ Aṣẹ Ohun',
        stopListening: 'Duro Igbọran',
        speak: 'Sọ Abajade',
        listening: 'Ngbọ...',
      }
    }
  }
];

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (languageCode: string) => void;
  t: (key: string) => string;
  availableLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const setLanguage = (languageCode: string) => {
    const language = languages.find(lang => lang.code === languageCode);
    if (language) {
      setCurrentLanguage(language);
      localStorage.setItem('preferredLanguage', languageCode);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    // Use unknown type first, then safely cast
    let value: unknown = currentLanguage.translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t,
      availableLanguages: languages
    }}>
      {children}
    </LanguageContext.Provider>
  );
};