import { useEffect, useRef } from "react";
import ParticleGenerator from "../particle-generator";

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

  useEffect(() => {
    const canvas = effect.current;
    console.log("canvas", canvas);
    const particles = new ParticleGenerator(canvas!);

    console.log("particles", particles);
    particles?.moveUp("square", { x: 50, y: 50 }, { x: 200, y: 200 }, 1);
  }, []);

  return (
    <div className="align-center">
      <video width="200" height="100" loop={true} muted={true}>
        <source src="../assets/91087-629483817_small.mp4" type="video/mp4" />
      </video>
      {/* <canvas ref={effect} id="effect" width="500px" height="500px"></canvas> */}
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
