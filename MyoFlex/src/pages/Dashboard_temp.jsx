import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  Zap, 
  Cpu, 
  AlertTriangle, 
  Wifi, 
  Clock, 
  Target, 
  ShieldCheck 
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";


export default function Dashboard() {
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({
    gesture: "--",
    confidence: 0,
    muscle_load: 0,
    fatigue: false,
    fall_detected: false,
    latency_ms: 0,
    session_time: 0,
    signal_strength: 0,
  });

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8765");

    ws.onopen = () => setConnected(true);
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setStats(msg);
      setData((prev) => {
        const updated = [...prev, {
          time: new Date().toLocaleTimeString(),
          emg: msg.emg_rms,
        }];
        return updated.slice(-40);
      });
    };
    ws.onclose = () => setConnected(false);

    return () => ws.close();
  }, []);

  if (!connected) {
    return (
      <div style={styles.centered}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          style={styles.loader}
        />
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={styles.loadingText}
        >
          ESTABLISHING NEURAL LINK...
        </motion.h1>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Background Glows based on reference image colors */}
      <div style={styles.bgGlowCyan} />
      <div style={styles.bgGlowGreen} />

      <header style={styles.header}>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 style={styles.mainTitle}>MYOFLEX <span style={{ fontWeight: 300 }}>BIONIC</span></h1>
          <p style={styles.subTitle}>Advanced Prosthetic Telemetry</p>
        </motion.div>

        <motion.div 
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={styles.statusBadge}
        >
          <div style={styles.pulseDot} /> SYSTEM ONLINE
        </motion.div>
      </header>

      {/* ===== Animated Stats Grid ===== */}
      <motion.div 
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        style={styles.grid}
      >
        <StatCard icon={<Target size={18}/>} label="Gesture" value={stats.gesture} color="#3b82f6" />
        <StatCard icon={<ShieldCheck size={18}/>} label="Confidence" value={`${(stats.confidence * 100).toFixed(1)}%`} color="#22c55e" />
        <StatCard icon={<Cpu size={18}/>} label="Muscle Load" value={`${(stats.muscle_load * 100).toFixed(1)}%`} />
        <StatCard icon={<Wifi size={18}/>} label="Signal" value={`${stats.signal_strength.toFixed(0)}%`} />
        <StatCard icon={<Zap size={18}/>} label="Latency" value={`${stats.latency_ms.toFixed(1)}ms`} />
        <StatCard icon={<Clock size={18}/>} label="Session" value={`${stats.session_time}s`} />
        
        <AnimatePresence>
          {stats.fatigue && (
            <StatCard 
              icon={<AlertTriangle size={18}/>} 
              label="System Fatigue" 
              value="CRITICAL" 
              danger 
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* ===== Live Chart Card ===== */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={styles.chartCard}
      >
        <div style={styles.cardHeader}>
          <Activity size={20} color="#3b82f6" />
          <h2 style={styles.cardTitle}>Live EMG Signal Stream</h2>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorEmg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#ffffff0a" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis stroke="#444" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0a0c10', border: '1px solid #ffffff1a', borderRadius: '8px' }}
              itemStyle={{ color: '#3b82f6' }}
            />
            <Area
              type="monotone"
              dataKey="emg"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorEmg)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}


function StatCard({ icon, label, value, danger, color }) {
  const accent = danger ? "#ef4444" : (color || "#ffffff");
  
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
      }}
      whileHover={{ 
        scale: 1.02, 
        backgroundColor: "rgba(255, 255, 255, 0.06)",
        borderColor: "rgba(255, 255, 255, 0.15)"
      }}
      style={{
        ...styles.statCard,
        borderTop: `2px solid ${accent}44`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ color: accent, opacity: 0.8 }}>{icon}</span>
        <div style={styles.statLabel}>{label.toUpperCase()}</div>
      </div>
      <div style={{ ...styles.statValue, color: accent }}>{value}</div>
    </motion.div>
  );
}



const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#05070a", 
    color: "#fff",
    padding: "40px 5vw",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  bgGlowCyan: {
    position: "absolute", top: "-10%", left: "-10%", width: "50vw", height: "50vw",
    background: "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)",
    zIndex: 0, pointerEvents: "none",
  },
  bgGlowGreen: {
    position: "absolute", bottom: "-10%", right: "-10%", width: "50vw", height: "50vw",
    background: "radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)",
    zIndex: 0, pointerEvents: "none",
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    marginBottom: "50px", position: "relative", zIndex: 1,
  },
  mainTitle: { fontSize: "28px", fontWeight: 900, letterSpacing: "3px", margin: 0 },
  subTitle: { fontSize: "12px", color: "#666", letterSpacing: "1px", marginTop: "4px" },
  statusBadge: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "8px 16px", borderRadius: "30px", backgroundColor: "rgba(34, 197, 94, 0.1)",
    border: "1px solid rgba(34, 197, 94, 0.3)",
    color: "#22c55e", fontSize: "11px", letterSpacing: "1px", fontWeight: "bold"
  },
  pulseDot: { width: "6px", height: "6px", backgroundColor: "#22c55e", borderRadius: "50%" },
  grid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px", marginBottom: "40px", position: "relative", zIndex: 1,
  },
  statCard: {
    background: "rgba(255, 255, 255, 0.02)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    transition: "all 0.3s ease",
  },
  statLabel: { fontSize: "10px", color: "#888", letterSpacing: "1.5px" },
  statValue: { fontSize: "32px", fontWeight: "800" },
  chartCard: {
    background: "rgba(255, 255, 255, 0.015)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "32px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    position: "relative", zIndex: 1,
  },
  cardHeader: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px" },
  cardTitle: { fontSize: "16px", fontWeight: "600", color: "#eee", margin: 0 },
  centered: { height: "100vh", backgroundColor: "#05070a", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" },
  loader: { width: "40px", height: "40px", border: "3px solid #3b82f6", borderTopColor: "transparent", borderRadius: "50%", marginBottom: "20px" },
  loadingText: { color: "#3b82f6", fontSize: "14px", letterSpacing: "4px" },
};