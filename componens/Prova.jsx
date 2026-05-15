import { useState } from "react";
import { apiUrl } from "../src/config/api";

function App() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult("");

    try {
      const response = await fetch(
        apiUrl("/api/groq/generate"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt:
              "Write a short fantasy quest for 4 level 3 players",
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      setResult(data.result);
      console.log(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Test Groq</button>
      </form>

      {error && <p>{error}</p>}
      {result && <p>{result}</p>}
    </div>
  );
}

export default App;
