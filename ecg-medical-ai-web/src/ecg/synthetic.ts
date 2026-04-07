/** Synthetic single-lead ECG-like signal for portfolio demo (not clinical). */

export type SyntheticBeat = {
  pStart: number;
  pEnd: number;
  qrsStart: number;
  qrsEnd: number;
  tStart: number;
  tEnd: number;
};

export function generateSyntheticEcg(
  samples: number,
  sampleRate: number,
  heartRateBpm: number,
): { signal: Float32Array; beats: SyntheticBeat[] } {
  const rr = (60 / heartRateBpm) * sampleRate;
  const beats: SyntheticBeat[] = [];
  let t = 0;
  while (t + rr < samples) {
    const p0 = t + rr * 0.08;
    const pq = t + rr * 0.18;
    const qrs0 = t + rr * 0.22;
    const qrs1 = t + rr * 0.3;
    const t0 = t + rr * 0.42;
    const t1 = t + rr * 0.62;
    beats.push({
      pStart: p0,
      pEnd: pq,
      qrsStart: qrs0,
      qrsEnd: qrs1,
      tStart: t0,
      tEnd: t1,
    });
    t += rr;
  }

  const signal = new Float32Array(samples);
  for (let i = 0; i < samples; i++) {
    let v = 0;
    for (const b of beats) {
      const p = gaussian(i, (b.pStart + b.pEnd) / 2, 4) * 0.12;
      const qrs =
        gaussian(i, (b.qrsStart + b.qrsEnd) / 2, 2.2) * 1.0 -
        gaussian(i, b.qrsStart + 1, 1.2) * 0.35;
      const tw = gaussian(i, (b.tStart + b.tEnd) / 2, 7) * 0.22;
      v += p + qrs + tw;
    }
    v += (Math.random() - 0.5) * 0.04;
    signal[i] = v;
  }

  return { signal, beats };
}

function gaussian(x: number, mu: number, sigma: number): number {
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z);
}
