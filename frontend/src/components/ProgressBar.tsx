import React from 'react';

interface ProgressBarProps {
  value: number; // value from 0 to 10
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const percentage = (value / 10) * 100;
  const color = value > 7 ? 'bg-green-500' : value > 5 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="w-full bg-slate-700 rounded-full h-2.5">
      <div
        className={`${color} h-2.5 rounded-full`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;