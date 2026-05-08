MyoFlex Bionic - Prosthetic Telemetry Dashboard
A cutting-edge bionic monitoring system that visualizes neural and muscular data in real-time. This application provides a "cyberpunk-inspired" telemetry interface for prosthetic devices, featuring live EMG (Electromyography) signal processing, gesture recognition tracking, and system health diagnostics.
________________________________________
🚀 Key Features
•	Neural Link Visualization: A high-fidelity real-time dashboard showing the status of bionic limb integration.
•	Live EMG Stream: Interactive area charts powered by Recharts that visualize muscle activity (RMS) with a 40-sample rolling window.
•	Gesture Telemetry: Real-time tracking of hand positions (Grip, Pinch, Open, Rest) with AI confidence scoring.
•	Biometric Monitoring: Tracks muscle load, system fatigue, and identifies critical events like fall detection or sensor latency.
•	Cyber-Tech UI: A dark-mode interface utilizing glassmorphism, background radial glows, and Framer Motion for smooth, high-performance animations.
•	WebSocket Integration: Bi-directional communication for low-latency data streaming (200ms refresh rate).
________________________________________
🛠️ Tech Stack
Frontend:
•	React.js: Component-based architecture.
•	Framer Motion: For advanced layout transitions and staggered entry animations.
•	Recharts: High-performance SVG-based data visualization.
•	Lucide-React: Minimalist iconography for bionic stats.
•	WebSockets (Client): For persistent "Neural Link" connections.
Backend:
•	Node.js: Server-side runtime.
•	ws (WebSocket Library): Handles high-frequency telemetry data broadcasting.
•	Simulation Engine: Built-in logic to simulate EMG RMS values, signal strength, and muscle fatigue patterns.
________________________________________
📂 Project Structure
Plaintext
├── src/
│   ├── Dashboard.jsx      # Main Telemetry UI & Logic
│   ├── index.css          # Cyber-tech global styles & fonts
│   └── App.js             # Root component
├── server/
│   └── Server.js          # WebSocket Telemetry Simulator
└── package.json           # Project dependencies
________________________________________
⚙️ Installation & Setup
1. Backend (Simulator)
1.	Install the WebSocket package:
Bash
npm install ws
2.	Start the telemetry simulator:
Bash
node Server.js
2. Frontend (Dashboard)
1.	Install UI dependencies:
Bash
npm install framer-motion lucide-react recharts
2.	Ensure the WebSocket URL in Dashboard.jsx matches your server (default: ws://localhost:8765).
3.	Run the development server:
Bash
npm start
________________________________________
📡 Telemetry Protocol
The server broadcasts a JSON packet every 200ms containing the following bionic metadata:
Field	Type	Description
emg_rms	Float	Raw muscular signal intensity (0 - 600 range).
gesture	String	Classified hand position (REST, GRIP, etc.).
confidence	Float	Probability score of the AI gesture classifier.
fatigue	Boolean	System alert triggered when emg_rms exceeds 450.
latency_ms	Float	Processing delay between sensor and interface.
________________________________________
🛡️ System States
1.	Establishing Link: Initial state while the WebSocket handshake is pending. Features a spinning "Neural Link" loader.
2.	System Online: Live data streaming with green status badge indicators.
3.	Critical Fatigue: Triggered when the muscle load is too high; the "System Fatigue" card appears with a red pulse animation.
________________________________________
📝 License
Distributed under the MIT License. Created for advanced Human-Machine Interface (HMI) prototyping.
