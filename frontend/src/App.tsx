import { useEffect, useState } from 'react';
import { useLanguage } from './contexts/LanguageContext';
import { LanguageToggle } from './components/LanguageToggle';

// Interfaces for multilingual data structure
interface MultiLangText {
  zh: string;
  en: string;
}

interface Paper {
  title: string;
  url: string;
  core_argument: MultiLangText;
  support: string;
  notes: MultiLangText | string;
}

interface MetricData {
  id: string;
  name: MultiLangText;
  description: MultiLangText;
  weight: string;
  papers: Paper[];
  average: string;
}

interface Level {
  id: string;
  title: MultiLangText;
  subtitle: MultiLangText;
  average: string;
  core_question: MultiLangText;
  metrics: MetricData[];
}

interface ConsciousnessData {
  name: MultiLangText;
  description: MultiLangText;
  version: string;
  author: string;
  license: string;
  average: string;
  Levels: Level[];
}

function App() {
  const { language, t } = useLanguage();
  const [data, setData] = useState<ConsciousnessData | null>(null);

  useEffect(() => {
    fetch('/ai-consciousness-watch-i18n.json')
      .then(response => response.json())
      .then(setData);
  }, []);

  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  const togglePapers = (id: string) => {
    const container = document.getElementById(id);
    const icon = container?.previousElementSibling?.previousElementSibling?.querySelector('.toggle-icon');

    if (container && icon) {
      if (container.style.display === 'block') {
        container.style.display = 'none';
        icon.classList.remove('rotate-icon');
      } else {
        container.style.display = 'block';
        icon.classList.add('rotate-icon');
      }
    }
  };

  // Helper function to get text in current language
  const getText = (text: MultiLangText | string): string => {
    if (typeof text === 'string') return text;
    return text[language];
  };

  if (!data) {
    return (
      <div style={{ background: '#f5f7fa' }} className="min-h-screen flex items-center justify-center">
        {t('loading')}
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: 'MiSans, sans-serif',
      backgroundColor: '#f5f7fa',
      color: '#333',
      minHeight: '100vh',
      width: '100%'
    }}>
      <LanguageToggle />

      <div style={{
        width: '1200px',
        minWidth: '1200px',
        margin: '0 auto',
        padding: '30px'
      }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '36px',
            color: '#2c3e50',
            marginBottom: '10px',
            margin: 0,
            fontWeight: 'bold'
          }}>{getText(data.name)}</h1>
          <p style={{
            fontSize: '16px',
            color: '#7f8c8d',
            maxWidth: '600px',
            margin: '0 auto'
          }}>{getText(data.description)}</p>
        </header>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '50px',
          position: 'relative',
          height: '400px'
        }}>
          {/* 项目介绍 - 绝对定位在左侧 */}
          <div style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '20px',
            width: '300px',
            textAlign: 'left',
            fontSize: '13px',
            lineHeight: '1.6',
            color: '#4b5563',
            zIndex: 1
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <i className="ri-information-line" style={{
                fontSize: '16px',
                color: '#3b82f6',
                marginRight: '6px'
              }}></i>
              <h3 style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                {language === 'zh' ? '关于这个项目' : 'About This Project'}
              </h3>
            </div>
            <p style={{ margin: '0 0 10px 0' }}>
              {language === 'zh'
                ? '本项目旨在将学术界对AI意识的研究成果转化为直观的评分体系，以人类意识为100%基准，评估当前AI的意识水平。我们基于哲学、神经科学和心理学三个维度建立多层次评估框架。'
                : 'This project aims to transform academic research on AI consciousness into an intuitive scoring system. Using human consciousness as a 100% benchmark, we assess the current consciousness level of AI based on a multi-level framework across philosophy, neuroscience, and psychology dimensions.'
              }
            </p>
            <p style={{ margin: '0 0 10px 0' }}>
              <strong>{language === 'zh' ? '完整报告：' : 'Full Report: '}</strong>
              {language === 'zh'
                ? <>详细的分析和方法论请参见项目仓库中的<a href="https://github.com/jingedawang/AIConsciousnessWatch/blob/main/Report.md" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>完整报告文档</a>。</>
                : <>For detailed analysis and methodology, please refer to the <a href="https://jingewang.substack.com/p/is-ai-conscious" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>full report</a> on Substack.</>
              }
            </p>
            <p style={{ margin: 0 }}>
              <strong>{language === 'zh' ? '数据更新：' : 'Data Updates: '}</strong>
              {language === 'zh'
                ? '我们会定期更新最新的研究成果，添加新发表的相关论文，并调整评估权重。用户可通过GitHub提交贡献或建议。'
                : 'We regularly update with the latest research findings, add newly published relevant papers, and adjust evaluation weights. Users can contribute suggestions via GitHub.'
              }
            </p>
          </div>

          <div style={{
            position: 'relative',
            width: '400px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="400" height="400" viewBox="0 0 120 120" style={{ overflow: 'visible' }}>
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
              />

              {hoveredLevel ? (
                // When hovering: show full circle for selected level
                <>
                  {/* Full circle background (light color) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    fill="none"
                    stroke={
                      hoveredLevel === 'philosophy' ? '#dbeafe' :
                        hoveredLevel === 'neuroscience' ? '#e7e5ff' :
                          '#dcfce7'
                    }
                    strokeWidth="12"
                  />

                  {/* Filled portion (dark color) showing achievement level */}
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    fill="none"
                    stroke={
                      hoveredLevel === 'philosophy' ? '#3b82f6' :
                        hoveredLevel === 'neuroscience' ? '#8b5cf6' :
                          '#22c55e'
                    }
                    strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 45 * (
                      hoveredLevel === 'philosophy' ? 0.2758 :
                        hoveredLevel === 'neuroscience' ? 0.3775 :
                          0.6314
                    )} ${2 * Math.PI * 45 * (1 - (
                      hoveredLevel === 'philosophy' ? 0.2758 :
                        hoveredLevel === 'neuroscience' ? 0.3775 :
                          0.6314
                    ))}`}
                    strokeDashoffset={`-${2 * Math.PI * 45 * 0.25}`}
                    transform="rotate(0 60 60)"
                    strokeLinecap="round"
                    style={{
                      transition: 'stroke-dasharray 0.6s ease-out',
                      transformOrigin: '60px 60px'
                    }}
                  />
                </>
              ) : (
                // Default state: show segments by weight proportion
                // Starting from top (0°) and going counter-clockwise: Philosophy → Neuroscience → Psychology
                <>
                  {/* Philosophy segment - 40% (starts at top, goes counter-clockwise) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 45 * 0.4} ${2 * Math.PI * 45 * 0.6}`}
                    strokeDashoffset="0"
                    transform="rotate(-90 60 60)"
                    strokeLinecap="round"
                    style={{ transition: 'opacity 0.3s ease' }}
                  />

                  {/* Neuroscience segment - 20% (follows philosophy counter-clockwise) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 45 * 0.2} ${2 * Math.PI * 45 * 0.8}`}
                    strokeDashoffset={`-${2 * Math.PI * 45 * 0.4}`}
                    transform="rotate(-90 60 60)"
                    strokeLinecap="round"
                    style={{ transition: 'opacity 0.3s ease' }}
                  />

                  {/* Psychology segment - 40% (follows neuroscience counter-clockwise) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 45 * 0.4} ${2 * Math.PI * 45 * 0.6}`}
                    strokeDashoffset={`-${2 * Math.PI * 45 * 0.6}`}
                    transform="rotate(-90 60 60)"
                    strokeLinecap="round"
                    style={{ transition: 'opacity 0.3s ease' }}
                  />
                </>
              )}
            </svg>

            {/* Center Info */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 10
            }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: hoveredLevel ? (
                  hoveredLevel === 'philosophy' ? '#3b82f6' :
                    hoveredLevel === 'neuroscience' ? '#8b5cf6' :
                      hoveredLevel === 'psychology' ? '#22c55e' :
                        '#2c3e50'
                ) : '#2c3e50',
                transition: 'all 0.3s ease'
              }}>
                {hoveredLevel ? (
                  hoveredLevel === 'philosophy' ? parseInt(data.Levels[0].average) + '%' :
                    hoveredLevel === 'neuroscience' ? parseInt(data.Levels[1].average) + '%' :
                      hoveredLevel === 'psychology' ? parseInt(data.Levels[2].average) + '%' :
                        parseInt(data.average) + '%'
                ) : parseInt(data.average) + '%'}
              </div>
              <div style={{
                fontSize: '14px',
                color: hoveredLevel ? (
                  hoveredLevel === 'philosophy' ? '#3b82f6' :
                    hoveredLevel === 'neuroscience' ? '#8b5cf6' :
                      hoveredLevel === 'psychology' ? '#22c55e' :
                        '#7f8c8d'
                ) : '#7f8c8d',
                transition: 'all 0.3s ease'
              }}>
                {hoveredLevel ? (
                  hoveredLevel === 'philosophy' ? getText(data.Levels[0].title) :
                    hoveredLevel === 'neuroscience' ? getText(data.Levels[1].title) :
                      hoveredLevel === 'psychology' ? getText(data.Levels[2].title) :
                        t('overall.score')
                ) : t('overall.score')}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '240px'
          }}>
            {data.Levels.map((level, index) => {
              const colors = [
                { light: '#dbeafe', dark: '#3b82f6', name: getText(level.title), id: 'philosophy' },
                { light: '#e7e5ff', dark: '#8b5cf6', name: getText(level.title), id: 'neuroscience' },
                { light: '#dcfce7', dark: '#22c55e', name: getText(level.title), id: 'psychology' }
              ];

              const colorSet = colors[index];
              const weight = index === 0 ? 40 : index === 1 ? 20 : 40;
              const score = parseFloat(level.average.replace('%', ''));

              return (
                <div
                  key={level.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '15px',
                    cursor: 'pointer',
                    padding: '12px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    backgroundColor: hoveredLevel === colorSet.id ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                    border: hoveredLevel === colorSet.id ? `2px solid ${colorSet.dark}` : '2px solid transparent'
                  }}
                  onMouseEnter={() => setHoveredLevel(colorSet.id)}
                  onMouseLeave={() => setHoveredLevel(null)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginRight: '12px' }}>
                    {/* Color indicator */}
                    <div style={{
                      width: '18px',
                      height: '18px',
                      backgroundColor: hoveredLevel === colorSet.id ? colorSet.light : colorSet.dark,
                      borderRadius: '4px',
                      border: hoveredLevel === colorSet.id ? `2px solid ${colorSet.dark}` : 'none',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}>
                      {hoveredLevel === colorSet.id && (
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: `${score}%`,
                          height: '100%',
                          backgroundColor: colorSet.dark,
                          borderRadius: '2px',
                          transition: 'width 0.3s ease'
                        }}></div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontWeight: hoveredLevel === colorSet.id ? 'bold' : '600',
                      color: hoveredLevel === colorSet.id ? colorSet.dark : '#2c3e50',
                      fontSize: '15px',
                      transition: 'all 0.3s ease'
                    }}>{getText(level.title)}</div>
                    <div style={{
                      fontSize: '12px',
                      color: hoveredLevel === colorSet.id ? colorSet.dark : '#7f8c8d',
                      transition: 'all 0.3s ease'
                    }}>
                      {t('score')}: {Math.round(score)}% • {t('weight')}: {Math.round(weight)}%
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Interactive explanation */}
            <div style={{
              marginTop: '20px',
              padding: '12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#6c757d',
                lineHeight: '1.4'
              }}>
                {hoveredLevel ? (
                  <div>
                    <strong>{t('focused.view')}:</strong><br />
                    {t('detailed.achievement')}
                  </div>
                ) : (
                  <div>
                    <strong>{t('overview.mode')}:</strong><br />
                    {t('weight.proportions')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px',
          gap: '24px'
        }}>
          {data.Levels.map(level => {
            const colors = [
              { primary: '#3b82f6', light: '#dbeafe', bg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' },
              { primary: '#8b5cf6', light: '#e7e5ff', bg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
              { primary: '#22c55e', light: '#dcfce7', bg: 'linear-gradient(135deg, #22c55e, #16a34a)' }
            ];
            const colorIndex = getText(level.title).includes('哲学') || getText(level.title).includes('Philosophy') ? 0 :
              getText(level.title).includes('神经科学') || getText(level.title).includes('Neuroscience') ? 1 : 2;
            const colorSet = colors[colorIndex];

            return (
              <div
                key={level.id}
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid rgba(0,0,0,0.06)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
              >
                {/* Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px',
                    color: '#fff',
                    background: colorSet.bg,
                    fontSize: '20px'
                  }}>
                    <i className={
                      getText(level.title).includes('哲学') || getText(level.title).includes('Philosophy') ? 'ri-book-open-line' :
                        getText(level.title).includes('神经科学') || getText(level.title).includes('Neuroscience') ? 'ri-cpu-line' :
                          'ri-group-line'
                    }></i>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>{getText(level.title)}</div>
                    <div style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      lineHeight: '1.4'
                    }}>{getText(level.subtitle)}</div>
                  </div>
                  <div style={{
                    background: colorSet.primary,
                    color: '#fff',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    fontSize: '16px',
                    fontWeight: '600',
                    textAlign: 'center',
                    minWidth: '64px'
                  }}>
                    <div>{parseInt(level.average)}%</div>
                  </div>
                </div>

                {/* Metrics */}
                <div>
                  {level.metrics.map(metric => (
                    <div key={metric.id} style={{ marginBottom: '24px' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '12px',
                          cursor: 'pointer',
                          padding: '8px 0'
                        }}
                        onClick={() => togglePapers(metric.id)}
                      >
                        <div>
                          <div style={{
                            fontSize: '15px',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '2px'
                          }}>{getText(metric.name)}</div>
                          <div style={{
                            fontSize: '12px',
                            color: '#9ca3af',
                            backgroundColor: '#f3f4f6',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            display: 'inline-block'
                          }}>{t('weight')} {parseInt(metric.weight)}%</div>
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: colorSet.primary
                          }}>{parseInt(metric.average)}%</div>
                          <i className="ri-arrow-down-s-line toggle-icon" style={{
                            fontSize: '16px',
                            color: '#9ca3af'
                          }}></i>
                        </div>
                      </div>

                      {/* Modern Progress Bar */}
                      <div style={{
                        height: '6px',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        <div style={{
                          height: '100%',
                          borderRadius: '3px',
                          transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                          width: metric.average,
                          background: colorSet.primary
                        }}></div>
                      </div>

                      {/* Papers Container */}
                      <div id={metric.id} style={{
                        backgroundColor: '#f8fafc',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px',
                        display: 'none',
                        border: '1px solid #e2e8f0'
                      }}>
                        {metric.papers.map((paper, index) => (
                          <div key={index} style={{
                            padding: '12px',
                            borderBottom: index === metric.papers.length - 1 ? 'none' : '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginBottom: index === metric.papers.length - 1 ? '0' : '8px',
                            backgroundColor: '#fff'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              marginBottom: '8px'
                            }}>
                              <a
                                href={paper.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: colorSet.primary,
                                  textDecoration: 'none',
                                  fontSize: '14px',
                                  fontWeight: '500',
                                  flex: 1,
                                  lineHeight: '1.4'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.textDecoration = 'underline';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.textDecoration = 'none';
                                }}
                              >
                                {paper.title}
                              </a>
                              <i className="ri-external-link-line" style={{
                                fontSize: '14px',
                                color: '#9ca3af',
                                marginLeft: '8px',
                                cursor: 'pointer'
                              }}></i>
                            </div>
                            <div style={{
                              fontSize: '12px',
                              color: '#6b7280',
                              lineHeight: '1.5',
                              marginBottom: '8px'
                            }}>
                              <strong>{t('core.argument')}：</strong>{getText(paper.core_argument)}
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{
                                  fontSize: '12px',
                                  color: '#6b7280',
                                  marginRight: '8px'
                                }}>{t('support.level')}：</span>
                                <div style={{ display: 'flex' }}>
                                  {[1, 2, 3, 4, 5].map(star => (
                                    <i
                                      key={star}
                                      className={star <= Math.ceil(parseFloat(paper.support) / 20) ? 'ri-star-fill' : 'ri-star-line'}
                                      style={{
                                        color: star <= Math.ceil(parseFloat(paper.support) / 20) ? '#fbbf24' : '#d1d5db',
                                        fontSize: '14px',
                                        marginRight: '2px'
                                      }}
                                    ></i>
                                  ))}
                                </div>
                              </div>
                              <div style={{
                                backgroundColor: colorSet.light,
                                color: colorSet.primary,
                                padding: '2px 8px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: '600'
                              }}>
                                {parseInt(paper.support)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 页脚 */}
        <footer style={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: '30px',
          paddingBottom: '30px',
          marginTop: '50px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
            flexWrap: 'wrap',
            marginBottom: '20px'
          }}>
            {/* 完整报告链接 */}
            <a
              href={language === 'zh' ? 'https://github.com/jingedawang/AIConsciousnessWatch/blob/main/Report.md' : 'https://jingewang.substack.com/p/is-ai-conscious'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#374151',
                textDecoration: 'none',
                fontSize: '14px',
                padding: '8px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <i className="ri-file-text-line" style={{ fontSize: '18px' }}></i>
              <span>
                {language === 'zh' ? '完整报告' : 'Full Report'}
              </span>
            </a>

            {/* GitHub链接 */}
            <a
              href="https://github.com/jingedawang/AIConsciousnessWatch"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#374151',
                textDecoration: 'none',
                fontSize: '14px',
                padding: '8px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <i className="ri-github-line" style={{ fontSize: '18px' }}></i>
              <span>
                {language === 'zh' ? '查看源码' : 'View Codebase'}
              </span>
            </a>

            {/* LinkedIn链接 */}
            <a
              href="https://www.linkedin.com/in/wangjinge/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#374151',
                textDecoration: 'none',
                fontSize: '14px',
                padding: '8px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <i className="ri-linkedin-line" style={{ fontSize: '18px' }}></i>
              <span>
                {language === 'zh' ? '联系作者' : 'Contact'}
              </span>
            </a>
          </div>

          <div style={{
            fontSize: '12px',
            color: '#9ca3af',
            lineHeight: '1.5'
          }}>
            <p style={{ margin: '0 0 4px 0' }}>
              {language === 'zh'
                ? `© 2025 ${data.author} · ${data.license} 许可证`
                : `© 2025 ${data.author} · ${data.license} License`
              }
            </p>
            <p style={{ margin: 0 }}>
              {language === 'zh'
                ? `版本 ${data.version} · AI意识的多层次评估框架`
                : `Version ${data.version} · A multi-level assessment framework for AI consciousness`
              }
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        .rotate-icon {
          transform: rotate(180deg);
        }
        .toggle-icon {
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default App;
