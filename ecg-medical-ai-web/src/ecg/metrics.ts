import type { SyntheticBeat } from "./synthetic";
import type { PredBeat } from "./segmentDemo";

function intervalIou(a0: number, a1: number, b0: number, b1: number): number {
  const lo = Math.max(a0, b0);
  const hi = Math.min(a1, b1);
  const inter = Math.max(0, hi - lo);
  const union = Math.max(a1, b1) - Math.min(a0, b0);
  return union <= 0 ? 0 : inter / union;
}

function matchBeats(gt: SyntheticBeat[], pred: PredBeat[]): { g: SyntheticBeat; p: PredBeat }[] {
  const used = new Set<number>();
  const pairs: { g: SyntheticBeat; p: PredBeat }[] = [];
  for (const g of gt) {
    const gMid = (g.qrsStart + g.qrsEnd) / 2;
    let best = -1;
    let bestD = Infinity;
    for (let i = 0; i < pred.length; i++) {
      if (used.has(i)) continue;
      const d = Math.abs(pred[i]!.qrsPeak - gMid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    if (best >= 0 && bestD < 200) {
      used.add(best);
      pairs.push({ g, p: pred[best]! });
    }
  }
  return pairs;
}

export type SegmentationMetrics = {
  matchedBeats: number;
  nGroundTruth: number;
  nPredicted: number;
  meanIou: { p: number; qrs: number; t: number };
};

export function computeSegmentationMetrics(
  gt: SyntheticBeat[],
  pred: PredBeat[],
): SegmentationMetrics {
  const pairs = matchBeats(gt, pred);
  if (pairs.length === 0) {
    return {
      matchedBeats: 0,
      nGroundTruth: gt.length,
      nPredicted: pred.length,
      meanIou: { p: 0, qrs: 0, t: 0 },
    };
  }
  let sp = 0;
  let sq = 0;
  let st = 0;
  for (const { g, p } of pairs) {
    sp += intervalIou(g.pStart, g.pEnd, p.pStart, p.pEnd);
    sq += intervalIou(g.qrsStart, g.qrsEnd, p.qrsStart, p.qrsEnd);
    st += intervalIou(g.tStart, g.tEnd, p.tStart, p.tEnd);
  }
  const n = pairs.length;
  return {
    matchedBeats: n,
    nGroundTruth: gt.length,
    nPredicted: pred.length,
    meanIou: { p: sp / n, qrs: sq / n, t: st / n },
  };
}
