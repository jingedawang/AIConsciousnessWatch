import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Score from './Score';

interface Paper {
  title: string;
  core_argument: string;
  support: string;
  notes: string;
}

interface MetricProps {
  metric: {
    id: string;
    name: string;
    description: string;
    weight: string;
    papers: Paper[];
    average: string;
  };
}

function Metric({ metric }: MetricProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 p-4 bg-slate-700 rounded">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-xl font-semibold text-sky-200">{metric.name}</h3>
        <Score score={metric.average} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
        <div className="mt-4">
          <p className="text-slate-400 mb-2">{metric.description}</p>
          <p className="text-slate-400 mb-4">Weight: {metric.weight}</p>
          <div>
            {metric.papers.map((paper, index) => (
              <div key={index} className="mb-4 p-3 bg-slate-600 rounded">
                <h4 className="font-bold">{paper.title}</h4>
                <p className="text-sm text-slate-300 mt-1">{paper.core_argument}</p>
                <p className="text-sm text-slate-400 mt-2">Notes: {paper.notes}</p>
                <div className="text-right font-bold text-sky-400">Support: {paper.support}</div>
              </div>
            ))}
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Metric;