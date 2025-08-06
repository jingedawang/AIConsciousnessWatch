import React from 'react';

interface LevelScore {
  name: string;
  score: number;
  weight: number;
  color: string;
}

interface OverallScoreProps {
  levels: LevelScore[];
  overallScore: number;
}

const OverallScore: React.FC<OverallScoreProps> = ({ levels, overallScore }) => {
  const circumference = 2 * Math.PI * 45;
  let offset = 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-12">
      <div className="relative w-64 h-64 mb-8 md:mb-0 md:mr-16">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-slate-700"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          {
            levels.map((level, index) => {
              const dasharray = circumference;
              const dashoffset = circumference - (level.weight / 100) * circumference;
              const rotation = (offset / 100) * 360;
              offset += level.weight;

              return (
                <circle
                  key={index}
                  className={level.color}
                  strokeWidth="10"
                  strokeDasharray={dasharray}
                  strokeDashoffset={dashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                  style={{ transform: `rotate(${rotation - 90}deg)`, transformOrigin: '50% 50%' }}
                />
              )
            })
          }
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-bold text-white">{overallScore.toFixed(1)}</span>
          <span className="text-slate-400">Overall Support</span>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        {levels.map((level, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-4 h-4 rounded-sm mr-3 ${level.color.replace('text-', 'bg-')}`}></div>
            <div>
              <span className="font-bold text-white">{level.name}</span>
              <div className="text-slate-400">
                <span>{level.score.toFixed(1)}/10</span>
                <span className="ml-4">Weight: {level.weight}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverallScore;