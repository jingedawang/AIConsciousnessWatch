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
  const outerRadius = 45;
  const innerRadius = 32;
  const outerCircumference = 2 * Math.PI * outerRadius;
  const innerCircumference = 2 * Math.PI * innerRadius;

  let weightOffset = 0;
  let scoreOffset = 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-12">
      <div className="relative w-64 h-64 mb-8 md:mb-0 md:mr-16">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circles */}
          <circle
            className="text-slate-700"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={outerRadius}
            cx="50"
            cy="50"
          />
          <circle
            className="text-slate-700"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={innerRadius}
            cx="50"
            cy="50"
          />

          {/* Outer ring - Weight proportions */}
          {levels.map((level, index) => {
            const dasharray = outerCircumference;
            const dashoffset = outerCircumference - (level.weight / 100) * outerCircumference;
            const rotation = (weightOffset / 100) * 360;
            weightOffset += level.weight;

            // Light color for outer ring
            const lightColor = level.color.replace('text-', 'text-').replace('-500', '-300');

            return (
              <circle
                key={`weight-${index}`}
                className={lightColor}
                strokeWidth="8"
                strokeDasharray={dasharray}
                strokeDashoffset={dashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={outerRadius}
                cx="50"
                cy="50"
                style={{ transform: `rotate(${rotation - 90}deg)`, transformOrigin: '50% 50%' }}
              />
            );
          })}

          {/* Inner ring - Score percentages within each segment */}
          {levels.map((level, index) => {
            const segmentLength = (level.weight / 100) * innerCircumference;
            const scoreLength = (level.score / 100) * segmentLength;
            const dasharray = `${scoreLength} ${innerCircumference - scoreLength}`;
            const rotation = (scoreOffset / 100) * 360;
            scoreOffset += level.weight;

            return (
              <circle
                key={`score-${index}`}
                className={level.color}
                strokeWidth="8"
                strokeDasharray={dasharray}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={innerRadius}
                cx="50"
                cy="50"
                style={{ transform: `rotate(${rotation - 90}deg)`, transformOrigin: '50% 50%' }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">{overallScore.toFixed(1)}%</span>
          <span className="text-slate-400 text-sm">Overall Score</span>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        {levels.map((level, index) => (
          <div key={index} className="flex items-center">
            <div className="flex items-center mr-4">
              {/* Outer ring indicator */}
              <div className={`w-3 h-3 rounded-sm mr-1 ${level.color.replace('text-', 'bg-').replace('-500', '-300')}`}></div>
              {/* Inner ring indicator */}
              <div className={`w-3 h-3 rounded-sm ${level.color.replace('text-', 'bg-')}`}></div>
            </div>
            <div>
              <span className="font-bold text-white">{level.name}</span>
              <div className="text-slate-400 text-sm">
                <span>Score: {level.score.toFixed(1)}%</span>
                <span className="ml-4">Weight: {level.weight}%</span>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4 pt-4 border-t border-slate-600">
          <div className="text-slate-300 text-sm">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-slate-400 rounded-sm mr-2"></div>
              <span>Outer ring: Weight proportion</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-slate-200 rounded-sm mr-2"></div>
              <span>Inner ring: Achievement level</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallScore;