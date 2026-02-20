const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8765 });

console.log("🟢 WebSocket Server running on ws://localhost:8765");

wss.on("connection", ws => {
  console.log("Client connected");

  let sessionStart = Date.now();

  const interval = setInterval(() => {
    const rms = Math.random() * 600;
    const confidence = Math.random() * 0.3 + 0.7;

    const data = {
      emg_rms: rms,
      signal_strength: Math.min(100, (rms / 600) * 100),
      gesture: ["REST", "GRIP", "PINCH", "OPEN"][Math.floor(Math.random() * 4)],
      confidence: confidence,
      muscle_load: rms / 600,
      fatigue: rms > 450,
      fall_detected: Math.random() < 0.02,
      latency_ms: Math.random() * 20 + 10,
      session_time: Math.floor((Date.now() - sessionStart) / 1000)
    };

    ws.send(JSON.stringify(data));
  }, 200);

  ws.on("close", () => clearInterval(interval));
});
