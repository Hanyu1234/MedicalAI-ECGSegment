import { useEffect, useRef } from "react";
import type { SyntheticBeat } from "../ecg/synthetic";
import type { PredBeat } from "../ecg/segmentDemo";

type Props = {
  signal: Float32Array;
  sampleRate: number;
  groundTruth?: SyntheticBeat[];
  predictions?: PredBeat[];
  showTruth: boolean;
  showPred: boolean;
};

const COLORS = {
  p: "rgba(37, 99, 235, 0.18)",
  qrs: "rgba(220, 38, 38, 0.2)",
  t: "rgba(67, 56, 202, 0.18)",
  pred: "rgba(37, 99, 235, 0.12)",
  predLine: "rgba(37, 99, 235, 0.85)",
  grid: "rgba(15, 23, 42, 0.08)",
  trace: "#334155",
};

export function EcgCanvas({
  signal,
  sampleRate,
  groundTruth,
  predictions,
  showTruth,
  showPred,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    const padX = 12;
    const padY = 18;
    const plotW = w - padX * 2;
    const plotH = h - padY * 2;

    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = padX + (plotW * i) / 10;
      ctx.beginPath();
      ctx.moveTo(x, padY);
      ctx.lineTo(x, padY + plotH);
      ctx.stroke();
    }
    for (let j = 0; j <= 6; j++) {
      const y = padY + (plotH * j) / 6;
      ctx.beginPath();
      ctx.moveTo(padX, y);
      ctx.lineTo(padX + plotW, y);
      ctx.stroke();
    }

    const n = signal.length;
    const xAt = (i: number) => padX + (i / Math.max(1, n - 1)) * plotW;

    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < n; i++) {
      const v = signal[i]!;
      if (v < min) min = v;
      if (v > max) max = v;
    }
    const mid = (min + max) / 2;
    const amp = Math.max(max - mid, mid - min, 1e-6);
    const yAt = (v: number) => padY + plotH / 2 - ((v - mid) / amp) * (plotH * 0.42);

    const drawBand = (a: number, b: number, fill: string) => {
      ctx.fillStyle = fill;
      ctx.fillRect(xAt(a), padY, xAt(b) - xAt(a), plotH);
    };

    if (showTruth && groundTruth) {
      for (const b of groundTruth) {
        drawBand(b.pStart, b.pEnd, COLORS.p);
        drawBand(b.qrsStart, b.qrsEnd, COLORS.qrs);
        drawBand(b.tStart, b.tEnd, COLORS.t);
      }
    }

    if (showPred && predictions) {
      for (const p of predictions) {
        drawBand(p.pStart, p.pEnd, COLORS.pred);
        drawBand(p.qrsStart, p.qrsEnd, COLORS.pred);
        drawBand(p.tStart, p.tEnd, COLORS.pred);
      }
    }

    ctx.strokeStyle = COLORS.trace;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const x = xAt(i);
      const y = yAt(signal[i]!);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    if (showPred && predictions) {
      ctx.strokeStyle = COLORS.predLine;
      ctx.lineWidth = 1;
      for (const p of predictions) {
        const x = xAt(p.qrsPeak);
        ctx.beginPath();
        ctx.moveTo(x, padY);
        ctx.lineTo(x, padY + plotH);
        ctx.stroke();
      }
    }

    ctx.fillStyle = "#64748b";
    ctx.font = "12px DM Sans, sans-serif";
    const dur = (n / sampleRate).toFixed(2);
    ctx.fillText(`${dur}s @ ${sampleRate} Hz`, padX, h - 6);
  }, [signal, sampleRate, groundTruth, predictions, showTruth, showPred]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: 280,
        display: "block",
        borderRadius: 12,
        border: "1px solid var(--border)",
      }}
    />
  );
}
