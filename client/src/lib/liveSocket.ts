import { API_BASE_URL, getAuthToken } from "@/config/api.config";

let ioPromise: Promise<any> | null = null;
let socketInstance: any = null;

function loadIo(): Promise<any> {
  if ((window as any).io) return Promise.resolve((window as any).io);
  if (ioPromise) return ioPromise;
  ioPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-socketio-client]");
    if (existing) {
      existing.addEventListener("load", () => resolve((window as any).io));
      existing.addEventListener("error", reject);
      return;
    }
    const script = document.createElement("script");
    script.src = `${API_BASE_URL || ""}/socket.io/socket.io.js`;
    script.async = true;
    script.dataset.socketioClient = "1";
    script.onload = () => resolve((window as any).io);
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
  return ioPromise;
}

export async function getLiveSocket(): Promise<any> {
  if (socketInstance && socketInstance.connected) return socketInstance;
  const io = await loadIo();
  if (socketInstance) {
    try { socketInstance.disconnect(); } catch {}
    socketInstance = null;
  }
  const token = getAuthToken();
  socketInstance = io(API_BASE_URL || undefined, {
    transports: ["websocket", "polling"],
    auth: { token },
    reconnection: true,
  });
  return socketInstance;
}

export function disconnectLiveSocket() {
  if (socketInstance) {
    try { socketInstance.disconnect(); } catch {}
    socketInstance = null;
  }
}
