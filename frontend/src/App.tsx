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
            height: '400px'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'relative',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              {/* Philosophy Segment */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3498db, #2980b9)',
                transform: 'rotate(0deg)',
                clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)',
                transformOrigin: 'center',
                transition: 'all 0.3s ease'
              }}></div>

              {/* Neuroscience Segment */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #9b59b6, #8e44ad)',
                transform: 'rotate(144deg)',
                clipPath: 'polygon(50% 50%, 50% 0%, 75% 0%, 100% 50%, 75% 100%, 50% 100%)',
                transformOrigin: 'center',
                transition: 'all 0.3s ease'
              }}></div>

              {/* Psychology Segment */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
                transform: 'rotate(216deg)',
                clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)',
                transformOrigin: 'center',
                transition: 'all 0.3s ease'
              }}></div>

              {/* Inner Circle */}
              <div style={{
                position: 'absolute',
                width: '70%',
                height: '70%',
                backgroundColor: '#fff',
                borderRadius: '50%',
                top: '15%',
                left: '15%',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
              }}></div>
            </div>

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
              }}>Overall Support</div>
            </div>
          </div>

          {/* Legend */}
          <div style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '200px'
          }}>
            {data.Levels.map(level => (
              <div key={level.id} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
                cursor: 'pointer',
                padding: '10px',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '4px',
                  marginRight: '10px',
                  background: level.title.includes('哲学') ? 'linear-gradient(135deg, #3498db, #2980b9)' :
                    level.title.includes('神经科学') ? 'linear-gradient(135deg, #9b59b6, #8e44ad)' :
                      'linear-gradient(135deg, #2ecc71, #27ae60)'
                }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: '500',
                    fontSize: '16px'
                  }}>{level.title}</div>
                  <div style={{
                    fontSize: '14px',
                    color: '#7f8c8d'
                  }}>{level.average}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px'
        }}>
          {data.Levels.map(level => (
            <div key={level.id} style={{
              width: '32%',
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease'
            }}>
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
