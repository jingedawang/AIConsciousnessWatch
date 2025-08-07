import { useEffect, useState } from 'react';

// Interfaces matching the structure of ai-consciousness-watch.json
interface Paper {
  title: string;
  core_argument: string;
  support: string;
  notes: string;
}

interface MetricData {
  id: string;
  name: string;
  description: string;
  weight: string;
  papers: Paper[];
  average: string; // Now string percentage like "61.5%"
}

interface Level {
  id: string;
  title: string;
  subtitle: string;
  average: string; // Now string percentage
  core_question: string;
  metrics: MetricData[];
}interface ConsciousnessData {
  name: string;
  description: string;
  version: string;
  author: string;
  license: string;
  average: string; // Overall average as string percentage
  Levels: Level[];
}

function App() {
  const [data, setData] = useState<ConsciousnessData | null>(null);

  useEffect(() => {
    fetch('/ai-consciousness-watch.json')
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

  if (!data) {
    return <div style={{ background: '#f5f7fa' }} className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div style={{
      fontFamily: 'MiSans, sans-serif',
      backgroundColor: '#f5f7fa',
      color: '#333',
      width: '1200px',
      margin: '0 auto'
    }}>
      <div style={{ width: '100%', padding: '30px' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '36px',
            color: '#2c3e50',
            marginBottom: '10px',
            margin: 0,
            fontWeight: 'bold'
          }}>{data.name}</h1>
          <p style={{
            fontSize: '16px',
            color: '#7f8c8d',
            maxWidth: '600px',
            margin: '0 auto'
          }}>{data.description}</p>
        </header>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '50px',
          position: 'relative',
          height: '400px'
        }}>
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
                color: '#2c3e50'
              }}>{data.average}</div>
              <div style={{
                fontSize: '14px',
                color: '#7f8c8d'
              }}>Overall Score</div>
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
                { light: '#dbeafe', dark: '#3b82f6', name: '哲学', id: 'philosophy' },
                { light: '#e7e5ff', dark: '#8b5cf6', name: '神经科学', id: 'neuroscience' },
                { light: '#dcfce7', dark: '#22c55e', name: '认知科学', id: 'psychology' }
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
                    }}>{level.title}</div>
                    <div style={{
                      fontSize: '12px',
                      color: hoveredLevel === colorSet.id ? colorSet.dark : '#7f8c8d',
                      transition: 'all 0.3s ease'
                    }}>
                      Score: {score.toFixed(1)}% • Weight: {weight}%
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
                    <strong>Focused View:</strong><br />
                    Showing detailed achievement level for this dimension
                  </div>
                ) : (
                  <div>
                    <strong>Overview Mode:</strong><br />
                    Weight proportions • Hover to focus on specific domain
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px'
        }}>
          {data.Levels.map(level => (
            <div
              key={level.id}
              style={{
                width: '32%',
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  color: '#fff',
                  background: level.title.includes('哲学') ? 'linear-gradient(135deg, #3498db, #2980b9)' :
                    level.title.includes('神经科学') ? 'linear-gradient(135deg, #9b59b6, #8e44ad)' :
                      'linear-gradient(135deg, #2ecc71, #27ae60)'
                }}>
                  <i className={
                    level.title.includes('哲学') ? 'ri-book-open-line' :
                      level.title.includes('神经科学') ? 'ri-cpu-line' :
                        'ri-group-line'
                  }></i>
                </div>
                <div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '500'
                  }}>{level.title}</div>
                  <div style={{
                    fontSize: '14px',
                    color: '#7f8c8d',
                    marginTop: '2px'
                  }}>{level.subtitle}</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}>{level.average}</div>
                </div>
              </div>

              <div style={{ marginTop: '15px' }}>
                {level.metrics.map(metric => (
                  <div key={metric.id} style={{ marginBottom: '20px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                        cursor: 'pointer'
                      }}
                      onClick={() => togglePapers(metric.id)}
                    >
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>{metric.name}</div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>{metric.average} <i className="ri-arrow-down-s-line toggle-icon"></i></div>
                    </div>
                    <div style={{
                      height: '8px',
                      backgroundColor: '#ecf0f1',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        height: '100%',
                        borderRadius: '4px',
                        transition: 'width 0.5s ease',
                        width: metric.average,
                        background: level.title.includes('哲学') ? 'linear-gradient(to right, #ff9a9e, #3498db)' :
                          level.title.includes('神经科学') ? 'linear-gradient(to right, #ff9a9e, #9b59b6)' :
                            'linear-gradient(to right, #ff9a9e, #2ecc71)'
                      }}></div>
                    </div>

                    {/* Papers Container - Initially hidden */}
                    <div id={metric.id} style={{
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px',
                      padding: '15px',
                      marginTop: '10px',
                      display: 'none'
                    }}>
                      {metric.papers.map((paper, index) => (
                        <div key={index} style={{
                          padding: '10px',
                          borderBottom: index === metric.papers.length - 1 ? 'none' : '1px solid #ecf0f1'
                        }}>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            marginBottom: '5px'
                          }}>{paper.title}</div>
                          <div style={{
                            fontSize: '12px',
                            color: '#7f8c8d',
                            marginBottom: '5px'
                          }}>Core Argument: {paper.core_argument}</div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{
                              fontSize: '12px',
                              color: '#7f8c8d',
                              marginRight: '10px'
                            }}>Support:</div>
                            <div style={{ display: 'flex' }}>
                              {[1, 2, 3, 4, 5].map(star => (
                                <i
                                  key={star}
                                  className={star <= Math.ceil(parseFloat(paper.support) / 20) ? 'ri-star-fill' : 'ri-star-line'}
                                  style={{
                                    color: star <= Math.ceil(parseFloat(paper.support) / 20) ? '#f1c40f' : '#ecf0f1',
                                    fontSize: '12px',
                                    marginRight: '2px'
                                  }}
                                ></i>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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
