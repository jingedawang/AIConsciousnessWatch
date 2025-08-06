import React, { useEffect, useState } from 'react';
import Metric from './components/Metric';
import OverallScore from './components/OverallScore';

// Interfaces matching the structure of ai-consciousness-watch.json
interface Paper {
  title: string;
  core_argument: string;
  support: string; // e.g., "7.5"
  notes: string;
}

interface MetricData {
  id: string;
  name: string;
  description: string;
  weight: string; // e.g., "40%"
  papers: Paper[];
  average: string; // e.g., "7.2"
}

interface Level {
  id: string;
  name: string;
  core_question: string;
  metrics: MetricData[];
  average: string; // e.g., "6.8"
  weight: string; // e.g., "40%"
}

interface ConsciousnessData {
  name: string;
  description: string;
  Levels: Level[];
  overall_average: string;
}

const levelDetails: { [key: string]: { icon: JSX.Element; color: string; metricColor: string } } = {
  'Philosophy': {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25278C12 6.25278 10.7313 4 8.46447 4C6.19764 4 4.5 5.69764 4.5 7.96447C4.5 10.2313 6.19764 12 8.46447 12C10.7313 12 12 9.74722 12 9.74722M12 6.25278C12 6.25278 13.2687 4 15.5355 4C17.8024 4 19.5 5.69764 19.5 7.96447C19.5 10.2313 17.8024 12 15.5355 12C13.2687 12 12 9.74722 12 9.74722M12 12V19.5M8.25 19.5H15.75" /></svg>,
    color: 'text-blue-400',
    metricColor: 'bg-blue-500'
  },
  'Neuroscience': {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 10.5C8.5 9.11929 9.61929 8 11 8H13C14.3807 8 15.5 9.11929 15.5 10.5V13.5C15.5 14.8807 14.3807 16 13 16H11C9.61929 16 8.5 14.8807 8.5 13.5V10.5Z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8V4M12 16V20M8.5 12H4.5M19.5 12H15.5" /></svg>,
    color: 'text-purple-400',
    metricColor: 'bg-purple-500'
  },
  'Psychology': {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.012 12.012 0 0012 4.058 12.012 12.012 0 005.84 10.578L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7l9-5" /></svg>,
    color: 'text-green-400',
    metricColor: 'bg-green-500'
  }
};

function App() {
  const [data, setData] = useState<ConsciousnessData | null>(null);

  useEffect(() => {
    fetch('/ai-consciousness-watch.json')
      .then(response => response.json())
      .then(setData);
  }, []);

  if (!data) {
    return <div className="bg-slate-900 min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  const overallScoreData = data.Levels.map(level => ({
    name: level.name,
    score: parseFloat(level.average),
    weight: parseFloat(level.weight),
    color: levelDetails[level.name]?.color || 'text-gray-400'
  }));

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen font-sans p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white">{data.name}</h1>
        <p className="text-slate-400 mt-4 max-w-3xl mx-auto">{data.description}</p>
      </header>

      <OverallScore levels={overallScoreData} overallScore={parseFloat(data.overall_average)} />

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {data.Levels.map(level => (
          <Metric
            key={level.id}
            icon={levelDetails[level.name]?.icon}
            color={levelDetails[level.name]?.metricColor}
            metric={{
              name: level.name,
              average: level.average,
              weight: level.weight,
              papers: level.metrics.map(m => ({ title: m.name, support: m.average }))
            }}
          />
        ))}
      </main>
    </div>
  );
}

export default App;