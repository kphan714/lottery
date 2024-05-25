import video from "../assets/amended.mp4";
import "../App.css";
export default function Test() {
  return (
    <div>
      <h1>hello</h1>
      <video loop className="video" autoPlay controls width="640" height="300">
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
