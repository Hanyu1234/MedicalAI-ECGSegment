import { useMemo, useState } from "react";
import { EcgCanvas } from "../components/EcgCanvas";
import { computeSegmentationMetrics } from "../ecg/metrics";
import { bandpassStyle, zScoreNormalize } from "../ecg/preprocess";
import { detectQrsPeaks, peaksToPredBeats } from "../ecg/segmentDemo";
import { generateSyntheticEcg } from "../ecg/synthetic";

const SAMPLE_RATE = 360;
const SAMPLES = 3600;

export function PortfolioDemo() {
  const [bpm, setBpm] = useState(72);
  const [seed, setSeed] = useState(0);
  const [showTruth, setShowTruth] = useState(true);
  const [showPred, setShowPred] = useState(true);

  const { processed, beats, pred } = useMemo(() => {
    void seed;
    void bpm;
    const { signal: rawSignal, beats: gt } = generateSyntheticEcg(SAMPLES, SAMPLE_RATE, bpm);
    const filtered = bandpassStyle(rawSignal);
    const processedSignal = zScoreNormalize(filtered);
    const peaks = detectQrsPeaks(processedSignal, Math.floor(SAMPLE_RATE * 0.25));
    const predBeats = peaksToPredBeats(peaks, SAMPLE_RATE);
    return { processed: processedSignal, beats: gt, pred: predBeats };
  }, [bpm, seed]);

  const metrics = useMemo(
    () => computeSegmentationMetrics(beats, pred),
    [beats, pred],
  );

  return (
    <>
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          background: "linear-gradient(180deg, #ffffff 0%, var(--bg-top) 100%)",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 22px 22px" }}>
          <p style={{ margin: 0, color: "var(--accent)", fontSize: 13, letterSpacing: "0.04em" }}>
            Medical AI · Deep Learning Research
          </p>
          <h1 style={{ margin: "10px 0 8px", fontSize: 28, fontWeight: 700, color: "var(--text)" }}>
            ECG wave segmentation (P / QRS / T)
          </h1>
          <p style={{ margin: 0, color: "var(--muted)", maxWidth: 720 }}>
            <strong style={{ color: "var(--text)" }}>What this shows:</strong> a single time-series is partitioned into{" "}
            <strong>P wave</strong>, <strong>QRS complex</strong>, and <strong>T wave</strong> intervals along the same
            trace—three wave classes, one curve, not three separate ECGs.
          </p>
          <pre
            style={{
              margin: "14px 0 0",
              padding: "12px 14px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--muted)",
              fontSize: 12,
              overflow: "auto",
              lineHeight: 1.5,
            }}
          >
            {`time →  … [ P ][  QRS  ][  T ] [ P ][ QRS ][ T ] …
     one lead, continuous samples; shaded bands = class per sample`}
          </pre>
        </div>
      </header>

      <main style={{ flex: 1, maxWidth: 960, margin: "0 auto", padding: "22px", width: "100%" }}>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 280px",
            gap: 20,
            alignItems: "start",
          }}
          className="layout-grid"
        >
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 14, alignItems: "center" }}>
              <label style={{ color: "var(--muted)", fontSize: 14 }}>
                Heart rate (BPM){" "}
                <input
                  type="range"
                  min={48}
                  max={120}
                  value={bpm}
                  onChange={(e) => setBpm(Number(e.target.value))}
                />{" "}
                <span className="mono">{bpm}</span>
              </label>
              <button
                type="button"
                onClick={() => setSeed((s) => s + 1)}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  borderRadius: 8,
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                New synthetic trace
              </button>
            </div>
            <EcgCanvas
              signal={processed}
              sampleRate={SAMPLE_RATE}
              groundTruth={beats}
              predictions={pred}
              showTruth={showTruth}
              showPred={showPred}
            />
            <div style={{ display: "flex", gap: 16, marginTop: 10, flexWrap: "wrap", fontSize: 13 }}>
              <label style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                <input type="checkbox" checked={showTruth} onChange={(e) => setShowTruth(e.target.checked)} />
                Ground-truth regions (synthetic labels)
              </label>
              <label style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                <input type="checkbox" checked={showPred} onChange={(e) => setShowPred(e.target.checked)} />
                Demo predictions (energy-based QRS + heuristics)
              </label>
            </div>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>
              Legend: blue = P, red = QRS, purple = T (synthetic); blue tint = demo detector overlay.
            </p>
          </div>

          <aside
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <h2 style={{ margin: "0 0 12px", fontSize: 16, color: "var(--text)" }}>Evaluation (matched beats)</h2>
            <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--muted)" }}>
              Mean IoU over matched P/QRS/T intervals vs synthetic ground truth.
            </p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ color: "var(--muted)", textAlign: "left" }}>
                  <th style={{ padding: "6px 0" }}>Wave</th>
                  <th>Mean IoU</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>P</td>
                  <td className="mono">{metrics.meanIou.p.toFixed(3)}</td>
                </tr>
                <tr>
                  <td>QRS</td>
                  <td className="mono">{metrics.meanIou.qrs.toFixed(3)}</td>
                </tr>
                <tr>
                  <td>T</td>
                  <td className="mono">{metrics.meanIou.t.toFixed(3)}</td>
                </tr>
              </tbody>
            </table>
            <p style={{ marginTop: 12, fontSize: 13, color: "var(--muted)" }}>
              Matched {metrics.matchedBeats} / {metrics.nGroundTruth} beats · Predicted {metrics.nPredicted} complexes
            </p>
          </aside>
        </section>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 18, marginBottom: 12, color: "var(--text)" }}>Pipeline</h2>
          <ol style={{ margin: 0, paddingLeft: 20, color: "var(--muted)", lineHeight: 1.7 }}>
            <li>
              <strong style={{ color: "var(--text)" }}>Ingestion & preprocessing:</strong> windowing, filtering,
              normalization.
            </li>
            <li>
              <strong style={{ color: "var(--text)" }}>Labels & splits:</strong> synthetic bounds for this demo; offline
              pipelines use curated splits.
            </li>
            <li>
              <strong style={{ color: "var(--text)" }}>Models:</strong> CNN / SegNet-style encoder–decoder with LSTM — see{" "}
              <span className="mono">ml/model.py</span>.
            </li>
            <li>
              <strong style={{ color: "var(--text)" }}>Evaluation:</strong> overlap metrics and visual QA.
            </li>
          </ol>
        </section>
      </main>

      <style>{`
        @media (max-width: 860px) {
          .layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
