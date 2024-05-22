import { useEffect, useState } from "react";
import "./App.css";
import mockBalls from "./GetHotSpotNumbers_Response.json";
import HotBalls from "./components/hotballs";
const arr = Array(10).fill("cell");
const arr2 = Array(11).fill("cell");
console.log("ARR", arr);

const endpoint =
  "https://drawgamefunc.azurewebsites.net/api/GetHotSpotNumbers/";
const lastNumGames = 20;
const daysAgo = 20;
const hotCount = 10;
const coldCount = 10;
const topBullsEyeCount = 10;

class ApiError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}
interface BallsCount {
  hotCount: any[];
  coldCount: any[];
  topBullsEyeCount: any[];
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
    <div className="page">
      <h1 className="heading">Hot Numbers</h1>
      <div className="grid-container">
        {balls.hotNumbers?.map((el, index) => (
          <HotBalls
            delay={index * 0.2}
            ballNumber={el.number}
            percentage={el.percent}
          />
        ))}
      </div>
      <h1 className="heading">Cold Numbers</h1>
      <div className="grid-container">
        {balls.coldNumbers?.map((el, index) => (
          <div key={el.number} className="grid-item">
            <div
              className="ball cold"
              style={{ animationDelay: `${index * 0.2 + 2}s` }}
            >
              {el.number}
            </div>
          </div>
        ))}
      </div>
      <h1 className="heading">Bulls Eye</h1>
      <div className="grid-container">
        {balls.topBullsEye?.map((el, index) => (
          <div key={el.number} className="grid-item">
            <div
              className="ball bullseye"
              style={{ animationDelay: `${index * 0.2 + 3.5}s` }}
            >
              {el.number}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
