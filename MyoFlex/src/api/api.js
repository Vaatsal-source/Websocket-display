import axios from "axios";

const API_BASE = "http://localhost:8000"; // backend later

export const getSensorData = async () => {
  // TEMP: fake data (remove when backend is ready)
  return {
    emg: Math.floor(Math.random() * 1024),
    flex1: Math.floor(Math.random() * 1024),
    flex2: Math.floor(Math.random() * 1024),
    flex3: Math.floor(Math.random() * 1024),
    fall: Math.random() > 0.95,
    gesture: "GRIP",
    confidence: 0.87
  };
};
