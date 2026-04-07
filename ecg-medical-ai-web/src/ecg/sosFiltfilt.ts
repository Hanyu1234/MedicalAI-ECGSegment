/**
 * Butterworth bandpass SOS for 0.5–40 Hz @ Fs=250 Hz (4th order), scipy-compatible:
 * scipy.signal.butter(4, [0.5, 40], 'bandpass', fs=250, output='sos')
 */
export const QT_BANDPASS_SOS_250HZ: readonly [
  number,
  number,
  number,
  number,
  number,
  number,
][] = [
  [0.02196126343374193, 0.04392252686748386, 0.02196126343374193, 1.0, -0.6215552807265685, 0.1305843533436152],
  [1.0, 2.0, 1.0, 1.0, -0.8176588707461863, 0.5194597165945805],
  [1.0, -2.0, 1.0, 1.0, -1.976514489017057, 0.9766768504796793],
  [1.0, -2.0, 1.0, 1.0, -1.9904258738606502, 0.990584060251276],
];

function reverseCopy(a: Float32Array): Float32Array {
  const n = a.length;
  const o = new Float32Array(n);
  for (let i = 0; i < n; i++) o[i] = a[n - 1 - i]!;
  return o;
}

/** Direct Form I SOS (a0 normalized to 1). */
function sosSection(
  b0: number,
  b1: number,
  b2: number,
  a0: number,
  a1: number,
  a2: number,
  x: Float32Array,
): Float32Array {
  const a1n = a1 / a0;
  const a2n = a2 / a0;
  const n = x.length;
  const y = new Float32Array(n);
  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;
  for (let i = 0; i < n; i++) {
    const xi = x[i]!;
    const yi = b0 * xi + b1 * x1 + b2 * x2 - a1n * y1 - a2n * y2;
    y[i] = yi;
    x2 = x1;
    x1 = xi;
    y2 = y1;
    y1 = yi;
  }
  return y;
}

export function sosfilt(sos: readonly (readonly number[])[], x: Float32Array): Float32Array {
  let y: Float32Array = x;
  for (let r = 0; r < sos.length; r++) {
    const row = sos[r]!;
    const [b0, b1, b2, a0, a1, a2] = row;
    y = sosSection(b0, b1, b2, a0, a1, a2, y);
  }
  return y;
}

/** Forward–backward (zero-phase), analogous to scipy.signal.sosfiltfilt. */
export function sosfiltfilt(sos: readonly (readonly number[])[], x: Float32Array): Float32Array {
  const c1 = sosfilt(sos, x);
  const rev = reverseCopy(c1);
  const c2 = sosfilt(sos, rev);
  return reverseCopy(c2);
}
