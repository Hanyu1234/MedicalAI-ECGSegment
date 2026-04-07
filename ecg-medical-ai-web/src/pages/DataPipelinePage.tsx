import { DetailSectionLayout } from "../components/DetailSectionLayout";

export function DataPipelinePage() {
  return (
    <DetailSectionLayout
      title="Data Pipeline Development"
      related={[
        { label: "QT pipeline (filter / TF)", tab: "mathworks" },
        { label: "Reference notes: resampling formulas", tab: "paper" },
        { label: "Synthetic ECG demo", tab: "portfolio" },
      ]}
    >
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>Goals</h2>
        <p style={{ margin: 0 }}>
          Turn raw ECG into <strong>reproducible</strong> tensors and labels: align time axes, suppress noise and baseline
          wander, feed fixed windows to the model, and keep train/val splits consistent.
        </p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>Typical stages</h2>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>
            <strong style={{ color: "var(--text)" }}>Rate alignment:</strong> arbitrary Fs → target Fs (e.g. cubic spline
            resampling) so one set of weights serves multiple devices.
          </li>
          <li>
            <strong style={{ color: "var(--text)" }}>Bandpass & drift removal:</strong> e.g. 0.5–40 Hz to emphasize QRS and
            P/T while attenuating wander and HF noise.
          </li>
          <li>
            <strong style={{ color: "var(--text)" }}>Amplitude normalization:</strong> z-score or per-lead scaling to reduce
            inter-subject drift.
          </li>
          <li>
            <strong style={{ color: "var(--text)" }}>Windowing & augmentation:</strong> fixed-length crops, jitter, mixup
            for generalization.
          </li>
          <li>
            <strong style={{ color: "var(--text)" }}>Label alignment:</strong> ROI indices → per-sample class masks (P /
            QRS / T / background), with a clear overlap policy.
          </li>
        </ul>
      </section>
      <section>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>On this site</h2>
        <p style={{ margin: 0 }}>
          Use the buttons above for the <strong>filtered + STFT</strong> view, <strong>reference-based</strong> resampling
          math, and the in-browser <strong>synthetic ECG</strong> trace with shaded intervals.
        </p>
      </section>
    </DetailSectionLayout>
  );
}
