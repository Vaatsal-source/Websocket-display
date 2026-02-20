import { useEffect, useState } from "react";

export default function useWebSocket(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8765");

    ws.onmessage = event => {
      setData(JSON.parse(event.data));
    };

    ws.onerror = err => console.error("WS Error", err);

    return () => ws.close();
  }, [url]);

  return data;
}
