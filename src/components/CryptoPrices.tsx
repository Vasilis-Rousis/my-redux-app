import React, { useState, useEffect } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

interface CryptoPrice {
  symbol: string;
  price: string;
  priceChange: string;
  priceChangePercent: string;
  lastUpdateTime: number;
}

interface BinanceTickerData {
  s: string; // symbol
  c: string; // current price
  P: string; // price change percent
  p: string; // price change
}

const CryptoPrices: React.FC = () => {
  const [prices, setPrices] = useState<Record<string, CryptoPrice>>({});
  const [selectedSymbols] = useState([
    "BTCUSDT",
    "ETHUSDT",
    "ADAUSDT",
    "DOGEUSDT",
    "BNBUSDT",
  ]);

  // Create WebSocket URL for multiple symbols
  const wsUrl = `wss://stream.binance.com:9443/ws/${selectedSymbols
    .map((s) => s.toLowerCase() + "@ticker")
    .join("/")}`;

  const { connectionStatus, lastMessage, reconnect } = useWebSocket(wsUrl, {
    onOpen: () => console.log("Connected to Binance WebSocket"),
    onClose: () => console.log("Disconnected from Binance WebSocket"),
    onError: (error) => console.error("WebSocket error:", error),
  });

  useEffect(() => {
    if (lastMessage) {
      const data = lastMessage as BinanceTickerData;
      if (data.s && data.c) {
        setPrices((prev) => ({
          ...prev,
          [data.s]: {
            symbol: data.s,
            price: parseFloat(data.c).toFixed(data.s.includes("USDT") ? 2 : 8),
            priceChange: data.p,
            priceChangePercent: data.P,
            lastUpdateTime: Date.now(),
          },
        }));
      }
    }
  }, [lastMessage]);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "#22c55e";
      case "connecting":
        return "#f59e0b";
      case "error":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getChangeColor = (change: string) => {
    const changeNum = parseFloat(change);
    if (changeNum > 0) return "#22c55e";
    if (changeNum < 0) return "#ef4444";
    return "#6b7280";
  };

  const formatSymbol = (symbol: string) => {
    return symbol.replace("USDT", "/USDT");
  };

  return (
    <div className="crypto-prices">
      <div className="crypto-header">
        <h2>🚀 Live Crypto Prices</h2>
        <div className="connection-status">
          <div
            className="status-indicator"
            style={{ backgroundColor: getStatusColor() }}
          ></div>
          <span className="status-text">
            {connectionStatus === "connected" && "Live"}
            {connectionStatus === "connecting" && "Connecting..."}
            {connectionStatus === "disconnected" && "Disconnected"}
            {connectionStatus === "error" && "Error"}
          </span>
          {connectionStatus !== "connected" && (
            <button onClick={reconnect} className="reconnect-btn">
              Reconnect
            </button>
          )}
        </div>
      </div>

      <div className="crypto-grid">
        {selectedSymbols.map((symbol) => {
          const priceData = prices[symbol];
          if (!priceData) {
            return (
              <div key={symbol} className="crypto-card loading">
                <div className="crypto-symbol">{formatSymbol(symbol)}</div>
                <div className="crypto-price">Loading...</div>
              </div>
            );
          }

          const changePercent = parseFloat(priceData.priceChangePercent);
          const isPositive = changePercent >= 0;

          return (
            <div key={symbol} className="crypto-card">
              <div className="crypto-symbol">
                {formatSymbol(priceData.symbol)}
              </div>
              <div className="crypto-price">${priceData.price}</div>
              <div
                className="crypto-change"
                style={{ color: getChangeColor(priceData.priceChangePercent) }}
              >
                {isPositive ? "+" : ""}
                {changePercent.toFixed(2)}%
              </div>
              <div className="crypto-change-amount">
                ${parseFloat(priceData.priceChange).toFixed(2)}
              </div>
              <div className="last-update">
                Updated:{" "}
                {new Date(priceData.lastUpdateTime).toLocaleTimeString()}
              </div>
            </div>
          );
        })}
      </div>

      <div className="crypto-info">
        <p>
          💡 <strong>Real-time data</strong> from Binance WebSocket API
        </p>
        <p>🔄 Prices update automatically every few seconds</p>
      </div>
    </div>
  );
};

export default CryptoPrices;
