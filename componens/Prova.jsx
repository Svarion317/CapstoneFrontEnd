import { useState } from "react";

function App() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/groq/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt:
              "Scrivimi una quest fantasy breve per 4 giocatori di livello 3",
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Errore nella richiesta");
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
