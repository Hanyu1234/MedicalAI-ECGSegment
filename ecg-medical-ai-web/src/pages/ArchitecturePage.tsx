import { DetailSectionLayout } from "../components/DetailSectionLayout";

export function ArchitecturePage() {
  return (
    <DetailSectionLayout
      title="Architecture Implementation"
      related={[
        { label: "Reference notes: U-Net output & argmax", tab: "paper" },
        { label: "Live demo (trace + masks)", tab: "portfolio" },
        { label: "MathWorks LSTM baseline", tab: "mathworks" },
      ]}
    >
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>1D fully convolutional backbone</h2>
        <p style={{ margin: 0 }}>
          An <strong>encoder–decoder</strong> extracts local morphology at multiple scales; skip connections preserve
          high-frequency detail. The output is a per-sample score map for P / QRS / T vs background (classification or
          boundary regression).
        </p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>Temporal modeling (optional)</h2>
        <p style={{ margin: 0 }}>
          <strong>LSTM / BiLSTM</strong> at the bottleneck or decoder refines labels using cross-beat context, helping
          low-amplitude P/T boundaries.
        </p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>Output head</h2>
        <p style={{ margin: 0 }}>
          Per-time-step logits + <strong>argmax</strong> yield a class sequence; merge constant runs into onset/offset
          pairs. Multi-lead fusion can average logits before decoding.
        </p>
      </section>
      <section>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>Code</h2>
        <p style={{ margin: 0 }}>
          <span className="mono">ml/model.py</span> sketches a SegNet-style stack + LSTM in PyTorch—adjust channels and
          class count for your data.
        </p>
      </section>
    </DetailSectionLayout>
  );
}
