const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 5000;

const GOOGLE_MAPS_API_KEY = "AIzaSyB0W9JoNcev8JNjxWQUXWGsAsm8Uq427Co"; 

app.use(cors());

app.get("/routes", async (req, res) => {
  try {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
      return res
        .status(400)
        .json({ error: "Origin and destination are required" });
    }

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
      origin
    )}&destination=${encodeURIComponent(
      destination
    )}&mode=driving&alternatives=true&departure_time=now&traffic_model=best_guess&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return res
        .status(500)
        .json({ error: data.status, details: data.error_message });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching routes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
