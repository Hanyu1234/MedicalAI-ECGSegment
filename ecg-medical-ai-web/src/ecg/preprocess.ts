/** Browser-side preprocessing analogous to resume pipeline: filter + normalize. */

export function bandpassStyle(signal: Float32Array, alpha = 0.12): Float32Array {
  const out = new Float32Array(signal.length);
  let prev = signal[0] ?? 0;
  for (let i = 0; i < signal.length; i++) {
    const x = signal[i]!;
    prev = alpha * x + (1 - alpha) * prev;
    out[i] = x - prev;
  }
  return out;
}

export function zScoreNormalize(signal: Float32Array): Float32Array {
  let sum = 0;
  for (let i = 0; i < signal.length; i++) sum += signal[i]!;
  const mean = sum / signal.length;
  let varSum = 0;
  for (let i = 0; i < signal.length; i++) {
    const d = signal[i]! - mean;
    varSum += d * d;
  }
  const std = Math.sqrt(varSum / signal.length) || 1;
  const out = new Float32Array(signal.length);
  for (let i = 0; i < signal.length; i++) out[i] = (signal[i]! - mean) / std;
  return out;
}
