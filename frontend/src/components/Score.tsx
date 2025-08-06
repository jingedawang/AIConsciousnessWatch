import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

interface ScoreProps {
  score: string;
}

function Score({ score }: ScoreProps) {
  const percentage = parseFloat(score);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (node) {
      const controls = animate(0, percentage, {
        duration: 1.5,
        onUpdate(value) {
          node.textContent = `${value.toFixed(2)}%`;
        },
      });
      return () => controls.stop();
    }
  }, [percentage]);

  return (
    <div className="relative w-24 h-24">
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
        <circle
          className="text-sky-400"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <span ref={nodeRef} className="absolute inset-0 flex items-center justify-center text-xl font-bold">
        {percentage.toFixed(2)}%
      </span>
    </div>
  );
}

export default Score;