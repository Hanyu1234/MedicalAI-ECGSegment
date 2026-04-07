import { useMemo, useState } from "react";
import { EcgCanvas } from "../components/EcgCanvas";
import { SpectrogramCanvas } from "../components/SpectrogramCanvas";
import { computeSegmentationMetrics } from "../ecg/metrics";
import { zScoreNormalize } from "../ecg/preprocess";
import { detectQrsPeaks, peaksToPredBeats } from "../ecg/segmentDemo";
import { QT_BANDPASS_SOS_250HZ, sosfiltfilt } from "../ecg/sosFiltfilt";
import { stftLogFeatures40 } from "../ecg/stftFeatures";
import { generateSyntheticEcg } from "../ecg/synthetic";

const FS = 250;
const SEG_LEN = 5000;

const MW_REF =
  "https://www.mathworks.com/help/signal/ug/waveform-segmentation-using-deep-learning.html";

export function MathWorksQtPipeline() {
  const [bpm, setBpm] = useState(72);
  const [seed, setSeed] = useState(0);
  const [showTruth, setShowTruth] = useState(true);
  const [showPred, setShowPred] = useState(true);

  const { raw, tfGrid, beats, pred, processedForDet } = useMemo(() => {
    void seed;
    const { signal: rawSig, beats: gt } = generateSyntheticEcg(SEG_LEN, FS, bpm);
    const filt = sosfiltfilt(QT_BANDPASS_SOS_250HZ, new Float32Array(rawSig));
    const zf = zScoreNormalize(filt);
    const peaks = detectQrsPeaks(zf, Math.floor(FS * 0.25));
    const predBeats = peaksToPredBeats(peaks, FS);
    const tf = stftLogFeatures40(zf, FS, { frameLen: 128, hop: 8, nBins: 40 });
    return {
      raw: rawSig,
      tfGrid: tf,
      beats: gt,
      pred: predBeats,
      processedForDet: zf,
    };
  }, [bpm, seed]);

  const metrics = useMemo(
    () => computeSegmentationMetrics(beats, pred),
    [beats, pred],
  );

  const durationSec = SEG_LEN / FS;

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
            MathWorks Signal Processing Toolbox
          </p>
          <h1 style={{ margin: "10px 0 8px", fontSize: 26, fontWeight: 700, color: "var(--text)" }}>
            Waveform segmentation (QT · LSTM · raw / filtered / time–frequency)
          </h1>
          <p style={{ margin: 0, color: "var(--muted)", maxWidth: 820, fontSize: 14, lineHeight: 1.65 }}>
            The example &quot;Waveform Segmentation Using Deep Learning&quot; labels each sample of the{" "}
            <strong>QT Database</strong> (~250 Hz, two leads annotated separately) as{" "}
            <strong>P / QRS / T / n/a</strong>, using an <strong>LSTM</strong> sequence classifier. Three training
            branches are compared: (1) raw → LSTM; (2) <strong>0.5–40 Hz bandpass</strong> → same LSTM; (3){" "}
            <strong>FSST</strong> features (<strong>40</strong> dims per time step) →{" "}
            <strong>sequenceInputLayer(40)</strong> + LSTM. Below: <strong>SOS bandpass</strong> and{" "}
            <strong>STFT log-magnitude</strong> (40 bands) as the signal and feature views for (2) and (3).
          </p>
          <p style={{ margin: "12px 0 0", fontSize: 13 }}>
            <a href={MW_REF} target="_blank" rel="noreferrer">
              MathWorks documentation
            </a>
          </p>
        </div>
      </header>

      <main style={{ flex: 1, maxWidth: 960, margin: "0 auto", padding: "22px", width: "100%" }}>
        <section
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <h2 style={{ margin: "0 0 10px", fontSize: 16, color: "var(--text)" }}>Three branches (summary)</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, color: "var(--muted)" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border)" }}>
                <th style={{ padding: "8px 6px" }}>Branch</th>
                <th style={{ padding: "8px 6px" }}>Input</th>
                <th style={{ padding: "8px 6px" }}>~Training accuracy (doc)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "8px 6px", color: "var(--text)" }}>rawNet</td>
                <td style={{ padding: "8px 6px" }}>Single-channel amplitudes</td>
                <td style={{ padding: "8px 6px" }}>~77% sample accuracy (class imbalance)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "8px 6px", color: "var(--text)" }}>filteredNet</td>
                <td style={{ padding: "8px 6px" }}>0.5–40 Hz bandpassed signal</td>
                <td style={{ padding: "8px 6px" }}>&gt; ~80%</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 6px", color: "var(--text)" }}>fsstNet</td>
                <td style={{ padding: "8px 6px" }}>FSST features (40-D per step)</td>
                <td style={{ padding: "8px 6px" }}>&gt; ~90%; stronger P/QRS/T on test vs raw</td>
              </tr>
            </tbody>
          </table>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: "var(--muted)" }}>
            Data prep: ROI table <span className="mono">ROILimits + Value</span> → per-sample mask (QRS wins overlaps)
            → <span className="mono">5000</span>-sample segments; ~70% train / 30% test.
          </p>
        </section>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 14, alignItems: "center" }}>
          <label style={{ color: "var(--muted)", fontSize: 14 }}>
            BPM{" "}
            <input
              type="range"
              min={48}
              max={120}
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
            />{" "}
            <span className="mono">{bpm}</span>
          </label>
          <span className="mono" style={{ color: "var(--muted)", fontSize: 13 }}>
            Fs = {FS} Hz · segment = {SEG_LEN} samples ({durationSec.toFixed(1)} s)
          </span>
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
            New trace
          </button>
        </div>

        <h3 style={{ fontSize: 15, margin: "0 0 8px", color: "var(--text)" }}>① Raw (no bandpass)</h3>
        <EcgCanvas
          signal={zScoreNormalize(raw)}
          sampleRate={FS}
          groundTruth={beats}
          predictions={pred}
          showTruth={showTruth}
          showPred={showPred}
        />

        <h3 style={{ fontSize: 15, margin: "18px 0 8px", color: "var(--text)" }}>
          ② Filtered (0.5–40 Hz Butterworth SOS, zero-phase)
        </h3>
        <EcgCanvas
          signal={processedForDet}
          sampleRate={FS}
          groundTruth={beats}
          predictions={pred}
          showTruth={showTruth}
          showPred={showPred}
        />

        <h3 style={{ fontSize: 15, margin: "18px 0 8px", color: "var(--text)" }}>
          ③ Time–frequency (STFT log-magnitude, 40 bins @ 0.5–40 Hz)
        </h3>
        <SpectrogramCanvas grid={tfGrid} durationSec={durationSec} />

        <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap", fontSize: 13 }}>
          <label style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
            <input type="checkbox" checked={showTruth} onChange={(e) => setShowTruth(e.target.checked)} />
            Synthetic labels (P/QRS/T)
          </label>
          <label style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
            <input type="checkbox" checked={showPred} onChange={(e) => setShowPred(e.target.checked)} />
            Demo predictions (energy + heuristics)
          </label>
        </div>

        <aside
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 16,
            marginTop: 20,
          }}
        >
          <h2 style={{ margin: "0 0 8px", fontSize: 16, color: "var(--text)" }}>P / QRS / T interval IoU</h2>
          <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>
            P / QRS / T mean IoU: {metrics.meanIou.p.toFixed(3)} / {metrics.meanIou.qrs.toFixed(3)} /{" "}
            {metrics.meanIou.t.toFixed(3)} · matched {metrics.matchedBeats}/{metrics.nGroundTruth}
          </p>
        </aside>
      </main>
    </>
  );
}
