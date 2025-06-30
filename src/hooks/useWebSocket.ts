import { useEffect, useRef, useState, useCallback } from "react";

interface UseWebSocketOptions {
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  shouldReconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

interface UseWebSocketReturn<T> {
  socket: WebSocket | null;
  connectionStatus: "connecting" | "connected" | "disconnected" | "error";
  lastMessage: T | null;
  sendMessage: (message: string | object) => void;
  reconnect: () => void;
}

export const useWebSocket = <T = unknown>(
  url: string,
  options: UseWebSocketOptions = {}
): UseWebSocketReturn<T> => {
  const {
    onOpen,
    onClose,
    onError,
    shouldReconnect = true,
    reconnectInterval = 3000,
    maxReconnectAttempts = 5,
  } = options;

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected" | "error"
  >("disconnected");
  const [lastMessage, setLastMessage] = useState<T | null>(null);

  const reconnectAttempts = useRef(0);
  const reconnectTimer = useRef<number | null>(null);

  // Store latest options in refs to avoid stale closures
  const optionsRef = useRef({
    onOpen,
    onClose,
    onError,
    shouldReconnect,
    reconnectInterval,
    maxReconnectAttempts,
  });

  optionsRef.current = {
    onOpen,
    onClose,
    onError,
    shouldReconnect,
    reconnectInterval,
    maxReconnectAttempts,
  };

  const sendMessage = useCallback(
    (message: string | object) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          typeof message === "string" ? message : JSON.stringify(message)
        );
      }
    },
    [socket]
  );

  const connect = useCallback(() => {
    const options = optionsRef.current;

    try {
      setConnectionStatus("connecting");
      const ws = new WebSocket(url);

      ws.onopen = () => {
        setConnectionStatus("connected");
        reconnectAttempts.current = 0;
        options.onOpen?.();
      };

      ws.onclose = () => {
        setConnectionStatus("disconnected");
        setSocket(null);
        options.onClose?.();

        if (
          options.shouldReconnect &&
          reconnectAttempts.current < options.maxReconnectAttempts
        ) {
          reconnectAttempts.current++;
          reconnectTimer.current = window.setTimeout(() => {
            connect();
          }, options.reconnectInterval);
        }
      };

      ws.onerror = (error) => {
        setConnectionStatus("error");
        options.onError?.(error);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as T;
          setLastMessage(data);
        } catch {
          // If parsing fails, treat as raw string data
          setLastMessage(event.data as T);
        }
      };

      setSocket(ws);
    } catch {
      setConnectionStatus("error");
      console.error("WebSocket connection error");
    }
  }, [url]);

  const disconnect = useCallback(() => {
    if (reconnectTimer.current) {
      clearTimeout(reconnectTimer.current);
      reconnectTimer.current = null;
    }
    if (socket) {
      socket.close();
    }
  }, [socket]);

  const reconnect = useCallback(() => {
    disconnect();
    reconnectAttempts.current = 0;
    connect();
  }, [disconnect, connect]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
        reconnectTimer.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]); // Only reconnect when URL changes

  // Cleanup socket on unmount
  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return {
    socket,
    connectionStatus,
    lastMessage,
    sendMessage,
    reconnect,
  };
};
