import { useEffect, useRef } from "react";

function Balls({
  delay,
  ballNumber,
  percentage,
  type,
}: {
  delay: number;
  ballNumber: number;
  percentage: number;
  type: "hot" | "cold" | "bullseye";
}) {
  const effect = useRef<HTMLCanvasElement>(null);

  // useEffect(() => {
  //   if (effect.current) {
  //     let ctx = effect.current.getContext("2d");
  //     let y0 = effect.current.height;
  //     ctx?.fillRect(0, y0, 20, -20);
  //     ctx.fillStyle = "rgb(200,100,100)";
  //   }
  // }, []);

  return (
    <div className="align-center">
      {/* <canvas ref={effect} id="effect"></canvas> */}
      <div className="grid-item" style={{ animationDelay: `${delay}s` }}>
        <div className={`ball ${type}`} style={{ animationDelay: `${delay}s` }}>
          <div className="skew">{ballNumber}</div>
          <div className="percent">{percentage}%</div>
        </div>
      </div>
      <div className="shadow" style={{ animationDelay: `${delay}s` }}></div>
    </div>
  );
}

export default Balls;
