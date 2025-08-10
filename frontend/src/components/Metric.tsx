import React from 'react';
import ProgressBar from './ProgressBar';

interface Paper {
  title: string;
  support: string; // This is a value out of 10, e.g., "8.5"
}

interface MetricProps {
  icon: React.ReactNode;
  color: string;
  metric: {
    name: string;
    average: string;
    weight: string;
    papers: Paper[];
  };
}

const Metric: React.FC<MetricProps> = ({ icon, color, metric }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${color}`}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{metric.name}</h3>
            <p className="text-slate-400">Weight: {metric.weight}</p>
          </div>
        </div>
        <div className="text-2xl font-bold text-white">{parseFloat(metric.average).toFixed(1)}</div>
      </div>

      <div className="mt-6 space-y-4">
        {metric.papers.map((paper, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-300">{paper.title}</span>
              <span className="font-semibold text-white">{parseFloat(paper.support).toFixed(1)}</span>
            </div>
            <ProgressBar value={parseFloat(paper.support)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Metric;