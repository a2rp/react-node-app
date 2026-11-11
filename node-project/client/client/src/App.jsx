import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [apiState, setApiState] = useState({ status: "loading", message: "" });

  const checkApi = useCallback(async () => {
    setApiState({ status: "loading", message: "Checking the Express API…" });

    try {
      const response = await fetch("/api", {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`The API responded with status ${response.status}.`);
      }

      const payload = await response.json();
      if (typeof payload.message !== "string") {
        throw new Error("The API response did not contain a message.");
      }

      setApiState({ status: "online", message: payload.message, payload });
    } catch {
      setApiState({
        status: "offline",
        message: "Could not reach the API. Start the Express server and try again.",
      });
    }
  }, []);

  useEffect(() => {
    checkApi();
  }, [checkApi]);

  return (
    <main className="app-shell">
      <div className="background-glow glow-left" aria-hidden="true" />
      <div className="background-glow glow-right" aria-hidden="true" />

      <section className="dashboard" aria-labelledby="page-title">
        <header className="topbar">
          <a className="brand" href="/" aria-label="React Node API Demo home">
            <span className="brand-mark" aria-hidden="true">RN</span>
            <span>React Node Demo</span>
          </a>
          <span className="project-badge">FULL-STACK STARTER</span>
        </header>

        <div className="hero">
          <p className="eyebrow">A tiny client-to-server connection</p>
          <h1 id="page-title">React <span>+</span> Node</h1>
          <p className="intro">
            A React page calling a real Express JSON API. Check the connection,
            inspect the response, and use this as a clean starting point.
          </p>
        </div>

        <section className={`api-card ${apiState.status}`} aria-live="polite" aria-atomic="true">
          <div className="card-heading">
            <div>
              <p className="card-label">SERVER CONNECTION</p>
              <h2>{apiState.status === "online" ? "API is connected" : apiState.status === "offline" ? "API is unavailable" : "Connecting to API"}</h2>
            </div>
            <span className={`status-indicator ${apiState.status}`} aria-label={apiState.status} />
          </div>

          <p className="status-message">{apiState.message}</p>

          {apiState.payload && (
            <pre className="response-json"><code>{JSON.stringify(apiState.payload, null, 2)}</code></pre>
          )}

          {apiState.status !== "online" && (
            <button className="retry-button" type="button" onClick={checkApi} disabled={apiState.status === "loading"}>
              {apiState.status === "loading" ? "Checking…" : "Retry connection"}
            </button>
          )}
        </section>

        <div className="endpoint-row">
          <span>REQUEST</span>
          <code><b>GET</b> /api</code>
          <span className="endpoint-detail">JSON · Express · port 3001</span>
        </div>

        <footer className="footer">
          <span>Built with React and Express</span>
          <span>Run the API and client in separate terminals</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
