
interface ScoreProps {
  score: string;
}

function Score({ score }: ScoreProps) {
  return (
    <div className="text-right font-bold text-sky-400">
      Support: {score}
    </div>
  );
}

export default Score;