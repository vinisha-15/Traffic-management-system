import { useState } from "react";
import "./App.css";

function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState([]);

  const getRoutes = async () => {
    if (!origin || !destination) {
      alert("Please enter both origin and destination");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/routes?origin=${origin}&destination=${destination}`
      );
      const data = await res.json();

      if (data.error) {
        alert(`Error: ${data.error}`);
        return;
      }

      setRoutes(data.routes);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch routes");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "600px", marginTop: "50px" }}>
      <h2 className="text-center">🚗 Directions Route Finder</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter starting location"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter destination location"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <button className="btn btn-primary w-100" onClick={getRoutes}>
        Get Directions
      </button>

      <pre className="mt-3 p-3 bg-light border rounded">
        {routes.length > 0
          ? routes
              .map((route, i) => {
                const leg = route.legs[0];
                return `Route ${i + 1} (${route.summary}):\n- Normal: ${
                  leg.duration.text
                }\n- With Traffic: ${
                  leg.duration_in_traffic
                    ? leg.duration_in_traffic.text
                    : "Not available"
                }\n`;
              })
              .join("\n")
          : "No routes yet"}
      </pre>
    </div>
  );
}

export default App;
