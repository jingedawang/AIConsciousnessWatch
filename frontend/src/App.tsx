import React, { useEffect, useState } from 'react';
import Metric from './components/Metric';
import Score from './components/Score';

interface Paper {
  title: string;
  core_argument: string;
  support: string;
  notes: string;
}

interface Metric {
  id: string;
  name: string;
  description: string;
  weight: string;
  papers: Paper[];
  average: string;
}

interface Level {
  id: string;
  name: string;
  core_question: string;
  metrics: Metric[];
  average: string;
}

interface ConsciousnessData {
  name: string;
  description: string;
  Levels: Level[];
}

function App() {
  const [data, setData] = useState<ConsciousnessData | null>(null);

  useEffect(() => {
    fetch('/ai-consciousness-watch.json')
      .then(response => response.json())
      .then(setData);
  }, []);
  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen">
      <header className="text-center py-12">
        <h1 className="text-5xl font-bold text-sky-400">{data?.name}</h1>
        <p className="text-lg mt-2">{data?.description}</p>
      </header>
      <main className="max-w-4xl mx-auto p-4">
        {data?.Levels.map(level => (
          <div key={level.id} className="bg-slate-800 rounded-lg p-6 mb-8">
            <h2 className="text-3xl font-bold text-sky-300 mb-2">{level.name}</h2>
            <p className="text-slate-400 mb-4">{level.core_question}</p>
            <div className="flex justify-end mb-4">
              <Score score={level.average} />
            </div>
            <div>
              {level.metrics.map(metric => (
                <Metric key={metric.id} metric={metric} />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default App