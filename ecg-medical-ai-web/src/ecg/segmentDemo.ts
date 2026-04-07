/**
 * Lightweight demo "segmentation": QRS peaks via energy threshold + P/T windows.
 * Illustrates evaluation loop; not a trained PyTorch model (see /ml in repo).
 */

export type PredBeat = {
  qrsPeak: number;
  pStart: number;
  pEnd: number;
  qrsStart: number;
  qrsEnd: number;
  tStart: number;
  tEnd: number;
};

export function detectQrsPeaks(signal: Float32Array, minDistance: number): number[] {
  const sq = new Float32Array(signal.length);
  for (let i = 0; i < signal.length; i++) sq[i] = signal[i]! * signal[i]!;
  let thr = 0;
  for (let i = 0; i < sq.length; i++) thr += sq[i]!;
  thr = (thr / sq.length) * 2.5;

  const peaks: number[] = [];
  let last = -Infinity;
  for (let i = 2; i < sq.length - 2; i++) {
    if (sq[i]! < thr) continue;
    if (sq[i]! < sq[i - 1]! || sq[i]! < sq[i + 1]!) continue;
    if (i - last < minDistance) continue;
    peaks.push(i);
    last = i;
  }
  return peaks;
}

export function peaksToPredBeats(peaks: number[], sampleRate: number): PredBeat[] {
  const rrEst = estimateRr(peaks, sampleRate);
  return peaks.map((pk) => {
    const halfQrs = Math.max(8, Math.floor(sampleRate * 0.04));
    const qrsStart = Math.max(0, pk - halfQrs);
    const qrsEnd = Math.min(pk + halfQrs, peaks[peaks.length - 1]! + 200);
    const tW = Math.floor(rrEst * 0.18);
    const pStart = Math.max(0, qrsStart - Math.floor(rrEst * 0.14));
    const pEnd = Math.max(pStart + 2, qrsStart - Math.floor(rrEst * 0.04));
    const tStart = qrsEnd + Math.floor(rrEst * 0.06);
    const tEnd = Math.min(tStart + tW, qrsEnd + Math.floor(rrEst * 0.35));
    return { qrsPeak: pk, pStart, pEnd, qrsStart, qrsEnd, tStart, tEnd };
  });
}

function estimateRr(peaks: number[], sampleRate: number): number {
  if (peaks.length < 2) return sampleRate;
  const diffs: number[] = [];
  for (let i = 1; i < peaks.length; i++) diffs.push(peaks[i]! - peaks[i - 1]!);
  diffs.sort((a, b) => a - b);
  return diffs[Math.floor(diffs.length / 2)] ?? sampleRate;
}
