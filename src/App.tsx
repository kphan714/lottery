import { useEffect, useState } from "react";
import "./App.css";
import mockBalls from "./GetHotSpotNumbers_Response.json";
import Balls from "./components/balls";
import backgroundImage from "./assets/pexels-padrinan-255379.jpg";

// dimensions 3840 x 2160

const endpoint =
  "https://drawgamefunc.azurewebsites.net/api/GetHotSpotNumbers/";
const lastNumGames = 20;
const daysAgo = 30;
const hotCount = 10;
const coldCount = 1;
const topBullsEyeCount = 10;

class ApiError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

type MockBalls = typeof mockBalls;
async function fetchBalls() {
  const lotteryApi = new URL(endpoint);
  lotteryApi.pathname += `${lastNumGames}/${daysAgo}/${hotCount}/${coldCount}/${topBullsEyeCount}`;

  console.log("endpoint", lotteryApi.href);
  let apiResponse: Response;

  try {
    apiResponse = await fetch(lotteryApi);
  } catch (error) {
    if (error instanceof Error)
      console.log("THIS FETCH ERRROR OCCURRED: ", error.message, mockBalls);
    return mockBalls;
  }

  console.log("apiResponse: ", apiResponse);

  if (!apiResponse.ok) {
    throw new ApiError(`${apiResponse.status}`);
  }

  return (await apiResponse.json()) as MockBalls;
}

function App() {
  const [hasLoaded, setLoaded] = useState(false);

  const [balls, setBalls] = useState<MockBalls>({
    hotNumbers: [],
    coldNumbers: [],
    topBullsEyeCount: [],
  } as unknown as MockBalls);

  useEffect(() => {
    try {
      const returnedBalls = fetchBalls();
      returnedBalls.then((balls) => {
        setBalls(balls);
      });
    } catch (error) {
      let errorMsg: string = "";
      // make sure this check satisfies ApiError class
      if (error instanceof Error) {
        alert(error.message);
        errorMsg = error.message;
      }
    }
    setLoaded(true);
  }, []);

  return (
    <div className="fullscreen">
      <div className="page" style={{ backgroundImage }}>
        <h1 className="heading" style={{ color: "red" }}>
          Hot Numbers
        </h1>
        <div className="grid-container">
          {balls.hotNumbers?.map((el, index) => (
            <Balls
              delay={index * 0.2}
              ballNumber={el.number}
              percentage={el.percent}
              type="hot"
            />
          ))}
        </div>
        <h1 className="heading" style={{ color: "skyblue" }}>
          Cold Numbers
        </h1>
        <div className="grid-container">
          {balls.coldNumbers?.map((el, index) => (
            <Balls
              delay={index * 0.2 + 2}
              ballNumber={el.number}
              percentage={el.percent}
              type="cold"
            />
          ))}
        </div>
        <h1 className="heading" style={{ color: "darkred" }}>
          Bulls Eye
        </h1>
        <div className="grid-container">
          {balls.topBullsEye?.map((el, index) => (
            <Balls
              delay={index * 0.2 + 3}
              ballNumber={el.number}
              percentage={el.percent}
              type="bullseye"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
