import { useLanguage } from '../contexts/LanguageContext';

export function LanguageToggle() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#fff',
            padding: '8px 12px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
        }}>
            <i className="ri-global-line" style={{
                fontSize: '16px',
                color: '#6b7280'
            }}></i>
            <button
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
                title={language === 'zh' ? t('switch.to.english') : t('switch.to.chinese')}
            >
                {language === 'zh' ? 'EN' : '中文'}
            </button>
        </div>
    );
}
