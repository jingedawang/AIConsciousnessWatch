import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
}

export function LanguageToggle() {
    const { language, setLanguage, t } = useLanguage();
    const { width: windowWidth } = useWindowSize();
    const isMobile = windowWidth <= 768;

    return (
        <div style={{
            position: 'fixed',
            top: isMobile ? '15px' : '20px',
            right: isMobile ? '15px' : '20px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#fff',
            padding: isMobile ? '6px 10px' : '8px 12px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
        }}>
            <i className="ri-global-line" style={{
                fontSize: isMobile ? '14px' : '16px',
                color: '#6b7280'
            }}></i>
            <button
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: '500',
                    color: '#374151',
                    cursor: 'pointer',
                    padding: isMobile ? '3px 6px' : '4px 8px',
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
