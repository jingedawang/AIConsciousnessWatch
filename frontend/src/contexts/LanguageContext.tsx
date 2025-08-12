import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'zh' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof translations.zh) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
    zh: {
        // Overall score
        'overall.score': '总体评分',
        'overview.mode': '概览模式',
        'weight.proportions': '权重比例 • 悬停聚焦特定领域',
        'focused.view': '聚焦视图',
        'detailed.achievement': '显示该维度的详细成就水平',

        // Score related
        'score': '评分',
        'weight': '权重',
        'support.level': '支持度',
        'core.argument': '核心观点',

        // Common
        'loading': '加载中...',
        'switch.to.english': '切换到英文',
        'switch.to.chinese': '切换到中文',
    },
    en: {
        // Overall score
        'overall.score': 'Overall Score',
        'overview.mode': 'Overview Mode',
        'weight.proportions': 'Weight proportions • Hover to focus on specific domain',
        'focused.view': 'Focused View',
        'detailed.achievement': 'Showing detailed achievement level for this dimension',

        // Score related
        'score': 'Score',
        'weight': 'Weight',
        'support.level': 'Support Level',
        'core.argument': 'Core Argument',

        // Common
        'loading': 'Loading...',
        'switch.to.english': 'Switch to English',
        'switch.to.chinese': '切换到中文',
    }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('zh');

    const t = (key: keyof typeof translations.zh): string => {
        return translations[language][key as keyof typeof translations[typeof language]] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
