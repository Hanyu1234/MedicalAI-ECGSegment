import { DetailSectionLayout } from "../components/DetailSectionLayout";

export function EvaluationPage() {
  return (
    <DetailSectionLayout
      title="Evaluation Framework"
      related={[
        { label: "Reference notes: Se / PPV / F₁", tab: "paper" },
        { label: "Synthetic demo IoU", tab: "portfolio" },
        { label: "QT pipeline IoU panel", tab: "mathworks" },
      ]}
    >
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>Clinical boundary error</h2>
        <p style={{ margin: 0 }}>
          For P/QRS/T onsets and offsets, a detection is correct if the absolute time error falls inside a tolerance
          window (commonly <strong>150 ms</strong>). Report mean and std of errors vs references.
        </p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>Detection counts and F₁</h2>
        <p style={{ margin: "0 0 10px" }}>
          Treat each landmark as binary detection: TP / FP / FN → sensitivity{" "}
          <span className="mono">Se = TP / (TP + FN)</span>, PPV{" "}
          <span className="mono">PPV = TP / (TP + FP)</span>, and{" "}
          <span className="mono">F₁ = 2·Se·PPV / (Se + PPV)</span>.
        </p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>Interval overlap</h2>
        <p style={{ margin: 0 }}>
          Frame-wise accuracy or segment <strong>IoU / Dice</strong> against reference masks. This site’s live demo and
          QT page show mean IoU summaries vs synthetic labels.
        </p>
      </section>
      <section>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>Error analysis</h2>
        <p style={{ margin: 0 }}>
          Visual review of FP/FN cases (low P, biphasic T, noisy segments) drives cleaning and augmentation choices.
        </p>
      </section>
    </DetailSectionLayout>
  );
}
