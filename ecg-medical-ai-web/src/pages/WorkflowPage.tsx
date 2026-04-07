import { DetailSectionLayout } from "../components/DetailSectionLayout";

export function WorkflowPage() {
  return (
    <DetailSectionLayout
      title="Production-Ready Workflow"
      related={[
        { label: "Live demo", tab: "portfolio" },
        { label: "Reference notes", tab: "paper" },
        { label: "Overview home", tab: "landing" },
      ]}
    >
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>Dataset acquisition</h2>
        <p style={{ margin: "0 0 10px" }}>
          The experiments use Kaggle's <span className="mono">shayanfazeli/heartbeat</span> dataset as a practical
          benchmark for heartbeat-level deep learning tests.
        </p>
        <pre
          style={{
            margin: 0,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--surface)",
            overflowX: "auto",
          }}
        >
{`import kagglehub
path = kagglehub.dataset_download("shayanfazeli/heartbeat")
print(path)`}
        </pre>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>Experiment configuration</h2>
        <p style={{ margin: 0 }}>
          Hyperparameters, data paths, and seeds live in config or CLI for <strong>reproducibility</strong>; log loss,
          per-class F₁, and LR schedules.
        </p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>Baseline inspiration and adaptation</h2>
        <p style={{ margin: "0 0 10px" }}>
          I reviewed strong Kaggle baselines and adapted their preprocessing and model-validation ideas into this
          project's own pipeline and reporting format.
        </p>
        <pre
          style={{
            margin: 0,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--surface)",
            overflowX: "auto",
          }}
        >
{`kaggle kernels pull prajaksa/starter-ecg-heartbeat-categorization-0b6e3109-2
kaggle kernels pull cliffincletus/mit-bih-ecg-cardiac-arrhythmia-detection`}
        </pre>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>Inference & post-processing</h2>
        <p style={{ margin: 0 }}>
          Ship ONNX / TorchScript or native PyTorch; apply argmax, optional smoothing, and export JSON with sample
          indices or millisecond times.
        </p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>Delivery</h2>
        <p style={{ margin: 0 }}>
          This UI is a static Vite build, deployable to <strong>GitHub Pages</strong> via Actions; training code can live
          in the same repo or a separate one.
        </p>
      </section>
      <section>
        <h2 style={{ color: "var(--text)", fontSize: 17, margin: "0 0 10px" }}>Starting point</h2>
        <p style={{ margin: 0 }}>
          <span className="mono">ml/train.py</span> runs a training loop on placeholder data—swap in your{" "}
          <span className="mono">Dataset</span> and label format.
        </p>
      </section>
    </DetailSectionLayout>
  );
}
