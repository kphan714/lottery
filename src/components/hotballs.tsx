function HotBalls({
  delay,
  ballNumber,
  percentage,
}: {
  delay: number;
  ballNumber: number;
  percentage: number;
}) {
  return (
    <div className="align-center">
      <div className="grid-item" style={{ animationDelay: `${delay}s` }}>
        <div className="ball hot" style={{ animationDelay: `${delay}s` }}>
          <div className="skew">{ballNumber}</div>
          <div className="percent">{percentage}%</div>
        </div>
      </div>
      <div className="shadow" style={{ animationDelay: `${delay}s` }}></div>
    </div>
  );
}

export default HotBalls;
