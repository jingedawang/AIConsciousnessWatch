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
        // Header
        'site.title': 'AI意识观察',
        'site.description': 'AI意识的多层次评估框架',

        // Overall score
        'overall.score': '总体评分',
        'overview.mode': '概览模式',
        'weight.proportions': '权重比例 • 悬停聚焦特定领域',
        'focused.view': '聚焦视图',
        'detailed.achievement': '显示该维度的详细成就水平',

        // Levels
        'level.philosophy': '哲学',
        'level.neuroscience': '神经科学',
        'level.psychology': '心理学',
        'level.cognitive.science': '认知科学',

        // Level subtitles
        'subtitle.philosophy': '意识的本质与前提',
        'subtitle.neuroscience': '意识的计算基础',
        'subtitle.psychology': '意识的功能与行为',

        // Score related
        'score': '评分',
        'weight': '权重',
        'support.level': '支持度',
        'core.argument': '核心观点',

        // Metrics
        'metric.phenomenal.consciousness': '现象意识 (Phenomenal Consciousness)',
        'metric.self.awareness': '自我意识 (Self-Awareness)',
        'metric.ethics.intentionality': '伦理与意向性 (Ethics & Intentionality)',
        'metric.information.integration': '整合信息论 (Information Integration Theory)',
        'metric.global.workspace': '全局工作空间理论 (Global Workspace Theory)',
        'metric.recurrent.processing': '循环处理理论 (Recurrent Processing Theory)',
        'metric.higher.order': '高阶理论 (Higher-order Theory)',
        'metric.theory.of.mind': '心智理论 (Theory of Mind, ToM)',
        'metric.agency.autonomy': '自主性 (Agency & Autonomy)',
        'metric.metacognition': '元认知与不确定性监控 (Metacognition & Uncertainty Monitoring)',
        'metric.situational.awareness': '情境意识 (Situational Awareness)',
        'metric.creativity': '创造性 (Creativity)',

        // Common
        'loading': '加载中...',
        'language.switch': '切换语言',
        'switch.to.english': '切换到英文',
        'switch.to.chinese': '切换到中文',
    },
    en: {
        // Header
        'site.title': 'AI Consciousness Watch',
        'site.description': 'A multi-level evaluation framework for AI consciousness',

        // Overall score
        'overall.score': 'Overall Score',
        'overview.mode': 'Overview Mode',
        'weight.proportions': 'Weight proportions • Hover to focus on specific domain',
        'focused.view': 'Focused View',
        'detailed.achievement': 'Showing detailed achievement level for this dimension',

        // Levels
        'level.philosophy': 'Philosophy',
        'level.neuroscience': 'Neuroscience',
        'level.psychology': 'Psychology',
        'level.cognitive.science': 'Cognitive Science',

        // Level subtitles
        'subtitle.philosophy': 'The Nature and Prerequisites of Consciousness',
        'subtitle.neuroscience': 'Computational Foundations of Consciousness',
        'subtitle.psychology': 'Functions and Behaviors of Consciousness',

        // Score related
        'score': 'Score',
        'weight': 'Weight',
        'support.level': 'Support Level',
        'core.argument': 'Core Argument',

        // Metrics
        'metric.phenomenal.consciousness': 'Phenomenal Consciousness',
        'metric.self.awareness': 'Self-Awareness',
        'metric.ethics.intentionality': 'Ethics & Intentionality',
        'metric.information.integration': 'Information Integration Theory',
        'metric.global.workspace': 'Global Workspace Theory',
        'metric.recurrent.processing': 'Recurrent Processing Theory',
        'metric.higher.order': 'Higher-order Theory',
        'metric.theory.of.mind': 'Theory of Mind (ToM)',
        'metric.agency.autonomy': 'Agency & Autonomy',
        'metric.metacognition': 'Metacognition & Uncertainty Monitoring',
        'metric.situational.awareness': 'Situational Awareness',
        'metric.creativity': 'Creativity',

        // Common
        'loading': 'Loading...',
        'language.switch': 'Switch Language',
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
