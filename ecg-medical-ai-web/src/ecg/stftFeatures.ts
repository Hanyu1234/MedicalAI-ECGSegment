/**
 * STFT log-magnitudes in 40 bins spanning [0.5, 40] Hz — workflow analogue to
 * MathWorks FSST → 40 features per time step for the LSTM (browser uses STFT for clarity).
 */

export type TfGrid = {
  features: number[][];
  frameCenters: number[];
  binFreqsHz: number[];
};

function hann(n: number): Float32Array {
  const w = new Float32Array(n);
  for (let i = 0; i < n; i++) w[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (n - 1)));
  return w;
}

/** Single DFT bin k for real windowed frame (exact, n = frame length). */
function dftBinMag(frame: Float32Array, k: number): number {
  const n = frame.length;
  const ang0 = (-2 * Math.PI * k) / n;
  let re = 0;
  let im = 0;
  for (let i = 0; i < n; i++) {
    const ang = ang0 * i;
    const v = frame[i]!;
    re += v * Math.cos(ang);
    im += v * Math.sin(ang);
  }
  return Math.hypot(re, im);
}

export function stftLogFeatures40(
  x: Float32Array,
  fs: number,
  opts?: { frameLen?: number; hop?: number; nBins?: number },
): TfGrid {
  const frameLen = opts?.frameLen ?? 128;
  const hop = opts?.hop ?? 8;
  const nBins = opts?.nBins ?? 40;
  const win = hann(frameLen);
  const df = fs / frameLen;
  const fLow = 0.5;
  const fHigh = Math.min(40, fs / 2 - df);
  const binIdx: number[] = [];
  for (let b = 0; b < nBins; b++) {
    const f = fLow + ((fHigh - fLow) * b) / Math.max(1, nBins - 1);
    binIdx.push(Math.max(0, Math.round(f / df)));
  }
  const binFreqsHz = binIdx.map((k) => k * df);

  const frames: number[][] = [];
  const frameCenters: number[] = [];
  for (let start = 0; start + frameLen <= x.length; start += hop) {
    const frame = new Float32Array(frameLen);
    for (let i = 0; i < frameLen; i++) frame[i] = x[start + i]! * win[i]!;
    const row: number[] = [];
    for (const k of binIdx) {
      const kk = Math.min(k, frameLen - 1);
      const m = dftBinMag(frame, kk);
      row.push(Math.log(m + 1e-8));
    }
    frames.push(row);
    frameCenters.push(start + frameLen / 2);
  }

  return { features: frames, frameCenters, binFreqsHz };
}
