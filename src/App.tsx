import { useState } from "react";
import "./App.css";
import { GetMOTHistoryVRN } from "./functions/axios";

function App() {
  const [vrn, setVrn] = useState<string>("");
  const [motData, setMotData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <input
        type="text"
        name="vrn"
        id=""
        onChange={(e) => {
          setVrn(e.currentTarget.value);
        }}
      />
      <button
        onClick={async () => {
          setLoading(true);
          const response = await GetMOTHistoryVRN(vrn);
          console.log(response.data);
          setMotData(response.data);
          setLoading(false);
        }}
      >
        Get MOT History
      </button>
      {loading && <p>Loading...</p>}

    </>
  );
}

export default App;
