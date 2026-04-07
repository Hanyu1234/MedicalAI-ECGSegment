import { KaTeX } from "../components/KaTeX";

const ARXIV = "https://arxiv.org/abs/2001.04689";

export function PaperTheory200104689() {
  return (
    <div style={{ flex: 1, maxWidth: 900, margin: "0 auto", padding: "22px 22px 40px", width: "100%" }}>
      <header style={{ marginBottom: 28 }}>
        <p style={{ margin: 0, color: "var(--accent)", fontSize: 13, letterSpacing: "0.04em" }}>
          Reference Notes · arXiv:2001.04689v1
        </p>
        <h1 style={{ margin: "10px 0 8px", fontSize: 26, fontWeight: 700, color: "var(--text)" }}>
          Deep Learning for ECG Segmentation — formulas & metrics
        </h1>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 14, lineHeight: 1.65 }}>
          This section summarizes and reproduces key formulas from Moskalenko, Zolotykh, Osipov (2020). A{" "}
          <strong>1D U-Net-style fully convolutional network</strong> segments P/QRS/T <strong>onsets and offsets</strong>{" "}
          at arbitrary sampling rates. Sections 2-3 below follow the original notation.
        </p>
        <p style={{ margin: "12px 0 0", fontSize: 14 }}>
          <a href={ARXIV} target="_blank" rel="noreferrer">
            arXiv:2001.04689
          </a>
        </p>
      </header>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12, color: "var(--text)" }}>1. Task and output shape</h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: "0 0 12px" }}>
          For each sample, the network outputs scores for four classes: P, QRS, T, or none. The output tensor has size{" "}
          <KaTeX tex="4\times \ell" /> (the paper writes <span className="mono">(4, l)</span>), where{" "}
          <KaTeX tex="\ell" /> is the sequence length.
        </p>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "16px 18px",
            overflow: "auto",
          }}
        >
          <KaTeX
            display
            tex="\mathbf{S}\in\mathbb{R}^{4\times \ell},\quad S_{c,j}\ \text{score for class } c\ \text{at time index } j"
          />
        </div>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12, color: "var(--text)" }}>
          2. Preprocessing: resampling via cubic spline
        </h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: "0 0 12px" }}>
          Let the input be <KaTeX tex="\mathbf{x}=(x_1,\ldots,x_n)" /> at rate <KaTeX tex="\nu" />; the network is trained
          at rate <KaTeX tex="\mu" /> (500 Hz in the experiments). Duration <KaTeX tex="T=n/\nu" />. Divide{" "}
          <KaTeX tex="[0,T]" /> into <KaTeX tex="n" /> equal subintervals and take midpoints <KaTeX tex="t_i" />, build a
          cubic spline through <KaTeX tex="\{(t_i,x_i)\}" />, then resample on a new grid.
        </p>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "16px 18px",
            overflow: "auto",
          }}
        >
          <KaTeX display tex="t_i=\frac{(2i-1)\,T}{2n},\qquad i=1,\ldots,n" />
          <div style={{ height: 12 }} />
          <KaTeX display tex="m=\lceil \mu T\rceil,\qquad t'_i=\frac{(2i-1)\,T}{2m},\qquad i=1,\ldots,m" />
        </div>
        <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: "12px 0 0", fontSize: 13 }}>
          Evaluate the spline on <KaTeX tex="\mathbf{t}'" /> to obtain a length-<KaTeX tex="m" /> sequence for the network.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12, color: "var(--text)" }}>3. Architecture (1D U-Net style)</h2>
        <ul style={{ color: "var(--muted)", lineHeight: 1.75, paddingLeft: 20, margin: "0 0 12px" }}>
          <li>1D convolutions + BatchNorm + ReLU; max-pooling in the encoder; transposed conv (UpConv) + concat with skip
            features (zero-padding for length).</li>
          <li>Kernel size 9, padding 4; transposed conv kernel 8, stride 2, padding 3; final conv kernel 1.</li>
          <li>
            Differences from 2D U-Net: 1D convs; copy + zero-pad instead of crop so the output length matches the input.
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12, color: "var(--text)" }}>4. Post-processing: argmax and contiguous runs</h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: "0 0 12px" }}>
          Apply argmax along the class dimension per time step, merge consecutive equal labels into intervals to obtain
          onset/offset indices.
        </p>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "16px 18px",
            overflow: "auto",
          }}
        >
          <KaTeX
            display
            tex="\hat{y}_j=\arg\max_{c\in\{1,2,3,4\}} S_{c,j},\qquad j=1,\ldots,\ell"
          />
        </div>
        <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: "12px 0 0", fontSize: 13 }}>
          Multi-lead: forward each lead independently, then <strong>average scores</strong> before decoding (as in the
          paper).
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12, color: "var(--text)" }}>5. Evaluation (AAMI tolerance and F₁)</h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: "0 0 12px" }}>
          An onset or offset is correct if its absolute time error vs the reference is within <strong>150 ms</strong> (TP);
          otherwise count FP/FN. From TP, FP, FN define sensitivity (recall) Se, positive predictive value (precision)
          PPV, and F₁.
        </p>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "16px 18px",
            overflow: "auto",
          }}
        >
          <KaTeX display tex="\mathrm{Se}=\frac{\mathrm{TP}}{\mathrm{TP}+\mathrm{FN}},\qquad \mathrm{PPV}=\frac{\mathrm{TP}}{\mathrm{TP}+\mathrm{FP}}" />
          <div style={{ height: 12 }} />
          <KaTeX display tex="F_1=\frac{2\,\mathrm{Se}\cdot \mathrm{PPV}}{\mathrm{Se}+\mathrm{PPV}}" />
        </div>
        <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: "12px 0 0", fontSize: 13 }}>
          Reported F₁ lower bounds (abstract) on LUDB are about 97.8% / 99.5% / 99.9% for P/T boundaries and QRS.
        </p>
      </section>
    </div>
  );
}
