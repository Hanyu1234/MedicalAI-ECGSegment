import { useEffect, useRef } from "react";
import type { TfGrid } from "../ecg/stftFeatures";

type Props = {
  grid: TfGrid;
  durationSec: number;
};

function viridis(t: number): [number, number, number] {
  const x = Math.min(1, Math.max(0, t));
  const r = 0.267 + x * (-0.003 + x * (0.994 + x * (-0.357)));
  const g = 0.004 + x * (0.879 + x * (0.01 + x * (0.447)));
  const b = 0.329 + x * (0.644 + x * (0.204 + x * (-0.188)));
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function SpectrogramCanvas({ grid, durationSec }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || grid.features.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const fw = grid.features.length;
    const fh = grid.features[0]!.length;
    let vmin = Infinity;
    let vmax = -Infinity;
    for (const row of grid.features) {
      for (const v of row) {
        if (v < vmin) vmin = v;
        if (v > vmax) vmax = v;
      }
    }
    const vr = vmax - vmin || 1;

    const img = ctx.createImageData(fw, fh);
    for (let tx = 0; tx < fw; tx++) {
      for (let fy = 0; fy < fh; fy++) {
        const v = (grid.features[tx]![fy]! - vmin) / vr;
        const [r, g, b] = viridis(v);
        const fyDraw = fh - 1 - fy;
        const p = (fyDraw * fw + tx) * 4;
        img.data[p] = r;
        img.data[p + 1] = g;
        img.data[p + 2] = b;
        img.data[p + 3] = 255;
      }
    }
    const tmp = document.createElement("canvas");
    tmp.width = fw;
    tmp.height = fh;
    tmp.getContext("2d")!.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(tmp, 0, 0, fw, fh, 0, 0, w, h);

    ctx.fillStyle = "#64748b";
    ctx.font = "11px DM Sans, sans-serif";
    ctx.fillText(`STFT log-|X| · ${fh} bins in 0.5–40 Hz · ~${durationSec.toFixed(2)} s`, 8, h - 6);
  }, [grid, durationSec]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: 200,
        display: "block",
        borderRadius: 12,
        border: "1px solid var(--border)",
      }}
    />
  );
}
