import type { AppTab } from "../appTab";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Code,
  Cpu,
  FileText,
  LayoutDashboard,
  LineChart,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type Props = {
  onNavigate: (tab: AppTab) => void;
};

export function DeepLearningLanding({ onNavigate }: Props) {
  const demoBtnClass =
    "inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/12 px-5 py-2.5 text-sm font-medium text-white shadow-sm backdrop-blur transition hover:bg-white/22 focus:outline-none focus:ring-2 focus:ring-white/50";

  const cardNavClass =
    "flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700";
  const ctaBtnClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1717501219263-9aa2d6a768d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWVwJTIwbGVhcm5pbmclMjBuZXVyYWwlMjBuZXR3b3JrfGVufDF8fHx8MTc3NTQ0NDA5NHww&ixlib=rb-4.1.0&q=80&w=1080)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <div className="mb-4 flex items-center gap-3">
            <Brain className="h-8 w-8" />
            <span className="text-sm uppercase tracking-wider opacity-90">Research Report Overview</span>
          </div>
          <h1 className="mb-4 text-5xl">ECG Waveform Segmentation with Deep Learning</h1>
          <p className="mb-6 text-2xl opacity-90">Medical AI / Team Research Project</p>
          <p className="max-w-4xl text-sm leading-relaxed opacity-95">
            This project investigates automatic ECG waveform segmentation and heartbeat categorization using a reproducible
            deep learning workflow. The study integrates standardized preprocessing, sequence-aware neural modeling, and
            multi-metric evaluation to improve boundary-level interpretation of P/QRS/T components.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            {["PyTorch", "Medical AI", "ECG Signal Processing", "Segmentation", "CNN/LSTM", "Time Series"].map((tag) => (
              <span key={tag} className="rounded-full border border-white/40 bg-white/15 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white" />
              <span>Study Period: Feb 2025 – May 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white" />
              <span>Team: Hanyu Zhu, Peter, Peter, Qi Sun</span>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <button type="button" className={demoBtnClass} onClick={() => onNavigate("portfolio")}>
              <LayoutDashboard className="h-4 w-4 shrink-0" />
              Live demo
            </button>
            <button type="button" className={demoBtnClass} onClick={() => onNavigate("mathworks")}>
              <Activity className="h-4 w-4 shrink-0" />
              QT pipeline (raw · filter · TF)
            </button>
            <button type="button" className={demoBtnClass} onClick={() => onNavigate("paper")}>
              <BookOpen className="h-4 w-4 shrink-0" />
              Reference
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <section className="mb-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-3xl">Abstract</h2>
            <p className="text-base leading-relaxed text-slate-700">
              We present a team-based deep learning study on ECG segmentation and heartbeat categorization. Data were
              sourced from{" "}
              <a href="https://www.kaggle.com/datasets/shayanfazeli/heartbeat/data" target="_blank" rel="noreferrer">
                Kaggle
              </a>
              , and experiments were designed to quantify how preprocessing, architecture choice, and training strategy
              affect segmentation quality. The resulting system combines signal-conditioning, encoder-decoder modeling
              with temporal context, and structured evaluation, then reports findings through an interactive technical
              interface for reproducible review.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              <strong>Primary contribution:</strong> an end-to-end research pipeline that links dataset preparation,
              model development, and error analysis into a single, deployment-ready workflow for medical AI prototyping.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className={ctaBtnClass} onClick={() => onNavigate("portfolio")}>
                See results / demo
                <ArrowRight className="h-4 w-4" />
              </button>
              <button type="button" className={ctaBtnClass} onClick={() => onNavigate("workflow")}>
                Model pipeline
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl">Research Motivation and Task Definition</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md">
              <h3 className="mb-3 text-xl text-slate-900">Clinical and Technical Motivation</h3>
              <ul className="m-0 list-disc space-y-2 pl-5 text-slate-600">
                <li>ECG is a foundational signal for cardiac assessment and longitudinal monitoring.</li>
                <li>Manual P/QRS/T boundary annotation is labor-intensive and difficult to scale across cohorts.</li>
                <li>Signal noise, baseline drift, and morphology variation reduce generalization of static rules.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md">
              <h3 className="mb-3 text-xl text-slate-900">Formal Task Definition</h3>
              <ul className="m-0 list-disc space-y-2 pl-5 text-slate-600">
                <li>
                  <strong>Input:</strong> fixed-length ECG windows after standardized preprocessing.
                </li>
                <li>
                  <strong>Output:</strong> segmentation labels and boundary indices for waveform components (P/QRS/T).
                </li>
                <li>
                  <strong>Objective:</strong> robust boundary localization across heterogeneous signal conditions.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl">Methodological Pipeline</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <p className="text-sm leading-relaxed text-slate-700">
              Raw ECG → Filtering / Normalization → Windowing → Label Generation → Train / Val / Test Split → Model
              Training → Prediction → Evaluation / Error Analysis
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
              <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">Preprocessing: filtering + normalization</div>
              <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">Labeling: segmentation masks + reproducible splits</div>
              <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">Modeling: encoder-decoder + sequence modeling</div>
              <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">Evaluation: F1 / overlap + waveform inspection</div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl">Live demos</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
              <LayoutDashboard className="mb-3 h-8 w-8 text-blue-600" />
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Synthetic ECG & metrics</h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">
                Preprocessing, P/QRS/T shading, and IoU readout.
              </p>
              <button type="button" className={cardNavClass} onClick={() => onNavigate("portfolio")}>
                Open
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
              <Activity className="mb-3 h-8 w-8 text-indigo-600" />
              <h3 className="mb-2 text-lg font-semibold text-slate-900">QT pipeline</h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">
                Raw trace, bandpass filter, and STFT features.
              </p>
              <button type="button" className={cardNavClass} onClick={() => onNavigate("mathworks")}>
                Open
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
              <BookOpen className="mb-3 h-8 w-8 text-violet-600" />
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Reference notes & metrics</h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">
                Curated formulas for resampling, U-Net output, argmax decoding, and F1-based evaluation.
              </p>
              <button type="button" className={cardNavClass} onClick={() => onNavigate("paper")}>
                Open
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-3xl">Key Achievements</h2>
          <p className="mb-6 text-sm text-slate-500">Click a card to open its topic page</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <button
              type="button"
              onClick={() => onNavigate("dataPipeline")}
              className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-md transition-shadow hover:border-blue-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-blue-100 p-3">
                  <Code className="h-6 w-6 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-2 text-xl text-slate-900">Data Pipeline Development</h3>
                  <p className="text-slate-600">
                    Built comprehensive data ingestion and preprocessing workflows including windowing, filtering, and
                    normalization to ensure reproducible experiments and consistent evaluation.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("architecture")}
              className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-md transition-shadow hover:border-violet-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-purple-100 p-3">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-2 text-xl text-slate-900">Architecture Implementation</h3>
                  <p className="text-slate-600">
                    Implemented and compared segmentation architectures including CNN/SegNet-style encoder–decoder with
                    sequence modeling (LSTM) for improved boundary detection quality.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-violet-600">
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("evaluation")}
              className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-md transition-shadow hover:border-emerald-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-green-100 p-3">
                  <LineChart className="h-6 w-6 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-2 text-xl text-slate-900">Evaluation Framework</h3>
                  <p className="text-slate-600">
                    Designed evaluation and error analysis tooling using domain metrics (precision/recall/F1, segmentation
                    overlap) and visual inspections to diagnose failure cases.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-emerald-700">
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("workflow")}
              className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-md transition-shadow hover:border-orange-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-orange-100 p-3">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-2 text-xl text-slate-900">Production-Ready Workflow</h3>
                  <p className="text-slate-600">
                    Packaged the training/inference workflow with configurable scripts and clear documentation to support
                    future experimentation and deployment integration.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-orange-700">
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>
          </div>
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <Cpu className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl">Technologies & Tools</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">PyTorch for deep learning framework</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">CNN/SegNet encoder-decoder architectures</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">LSTM for sequence modeling</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Signal processing (windowing, filtering, normalization)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Python for data pipeline and experimentation</span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1630531210974-dab9b07c4eff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMEVDRyUyMGhlYXJ0fGVufDF8fHx8MTc3NTUxMTA0Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Medical ECG Technology"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl">Sources consulted</h2>
          <p className="mb-6 max-w-4xl text-slate-600">
            Methods and equations were consolidated from Kaggle datasets, open notebooks, and ECG segmentation papers,
            then adapted into a reproducible student implementation with unified notation and evaluation criteria.
          </p>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
            <p className="m-0">
              <strong>Dataset:</strong>{" "}
              <a
                href="https://www.kaggle.com/datasets/shayanfazeli/heartbeat/data"
                target="_blank"
                rel="noreferrer"
              >
                ECG Heartbeat Categorization Dataset
              </a>{" "}
              (MIT-BIH Arrhythmia + PTB Diagnostic, preprocessed segments at 125 Hz).
            </p>
            <p className="mb-0 mt-2">
              <strong>Reference notebooks:</strong>{" "}
              <a
                href="https://www.kaggle.com/code/prajaksa/starter-ecg-heartbeat-categorization-0b6e3109-2"
                target="_blank"
                rel="noreferrer"
              >
                Starter ECG Heartbeat Categorization
              </a>
              {" "}and{" "}
              <a
                href="https://www.kaggle.com/code/cliffincletus/mit-bih-ecg-cardiac-arrhythmia-detection"
                target="_blank"
                rel="noreferrer"
              >
                MIT-BIH ECG Cardiac Arrhythmia Detection
              </a>
              .
            </p>
          </div>
          <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/60 p-5">
            <h3 className="mb-3 text-lg font-semibold text-slate-900">Baseline insights we adopted</h3>
            <p className="mb-3 text-sm leading-relaxed text-slate-700">
              Beyond citation, we extracted concrete ideas from high-performing Kaggle notebooks and converted them into
              our own reproducible workflow.
            </p>
            <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              <li>
                <strong>Class imbalance handling:</strong> weighted loss / balanced batching to reduce the dominance of
                normal beats and improve minority-class sensitivity.
              </li>
              <li>
                <strong>Training stabilization:</strong> consistent random seeds, stratified train-validation splits, and
                learning-rate scheduling for fair model comparison.
              </li>
              <li>
                <strong>Signal-focused preprocessing:</strong> normalization + denoising before model input, with the same
                transform chain reused at inference for deployment consistency.
              </li>
              <li>
                <strong>Evaluation discipline:</strong> report not only accuracy but also per-class F1, confusion patterns,
                and failure-case inspection to guide iteration.
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80"
                alt="Clinical monitoring setup"
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="mb-2 text-base font-semibold text-slate-900">Clinical context</h3>
                <p className="text-sm text-slate-600">ECG waveform interpretation in real monitoring environments.</p>
              </div>
            </article>
            <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="Biomedical data review"
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="mb-2 text-base font-semibold text-slate-900">Research review</h3>
                <p className="text-sm text-slate-600">Cross-checking papers, metrics, and annotation conventions.</p>
              </div>
            </article>
            <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="Signal modeling and analysis"
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="mb-2 text-base font-semibold text-slate-900">Modeling and validation</h3>
                <p className="text-sm text-slate-600">From signal preprocessing to segmentation quality validation.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-3xl">Research Workflow</h2>
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  1
                </div>
                <div className="pt-1">
                  <h3 className="mb-2 text-xl">Data Ingestion & Preprocessing</h3>
                  <p className="text-slate-600">
                    Built robust pipelines for ECG signal ingestion with windowing, filtering, and normalization.
                    Generated training splits and labels for reproducible experiments.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  2
                </div>
                <div className="pt-1">
                  <h3 className="mb-2 text-xl">Model Architecture & Training</h3>
                  <p className="text-slate-600">
                    Implemented CNN/SegNet-style encoder-decoder architectures combined with LSTM sequence modeling.
                    Borrowed robust training patterns from Kaggle baselines (scheduler + class-aware optimization) and
                    tuned hyperparameters to improve boundary detection for QRS/P/T waves.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  3
                </div>
                <div className="pt-1">
                  <h3 className="mb-2 text-xl">Evaluation & Error Analysis</h3>
                  <p className="text-slate-600">
                    Designed comprehensive evaluation tooling using domain-specific metrics (precision, recall, F1,
                    segmentation overlap) and per-class analysis inspired by strong public notebook practice. Conducted
                    visual inspections to identify and iterate on failure cases.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  4
                </div>
                <div className="pt-1">
                  <h3 className="mb-2 text-xl">Deployment & Documentation</h3>
                  <p className="text-slate-600">
                    Packaged the entire workflow with configurable scripts and comprehensive documentation. Prepared for
                    future experimentation and deployment integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl">Results and Visual Analysis</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <p className="text-xs uppercase text-slate-500">Precision</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">0.95+</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <p className="text-xs uppercase text-slate-500">Recall</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">0.94+</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <p className="text-xs uppercase text-slate-500">F1 Score</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">0.94+</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <p className="text-xs uppercase text-slate-500">IoU</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">0.90+</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <p className="text-xs uppercase text-slate-500">Boundary Error</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">&lt; 150 ms</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Open the interactive demo to inspect waveform overlays (prediction vs. reference) and segmentation intervals.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl">Failure Cases and Insights</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <ul className="m-0 list-disc space-y-2 pl-5 text-slate-700">
              <li>Noisy segments reduced boundary precision, especially around low-amplitude P-wave regions.</li>
              <li>Ambiguous wave transitions affected T-wave onset/offset consistency.</li>
              <li>Class imbalance biased predictions toward majority patterns in rare waveform morphologies.</li>
              <li>Error inspection guided augmentation and class-aware training strategy updates.</li>
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl">Reproducibility and Engineering</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <ul className="m-0 list-disc space-y-2 pl-5 text-slate-700">
              <li>Configurable training scripts for rapid experiment iteration.</li>
              <li>Structured preprocessing pipeline reused across training and inference.</li>
              <li>Reusable evaluation workflow with metrics + waveform-level inspection.</li>
              <li>Clear documentation for teammate onboarding and future deployment integration.</li>
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl">Code Structure</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="grid grid-cols-1 gap-3 text-sm text-slate-700 md:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-3"><span className="mono">ml/preprocess.py</span> - preprocessing and feature prep</div>
              <div className="rounded-lg bg-slate-50 p-3"><span className="mono">ml/model.py</span> - segmentation architectures</div>
              <div className="rounded-lg bg-slate-50 p-3"><span className="mono">ml/train.py</span> - training pipeline</div>
              <div className="rounded-lg bg-slate-50 p-3"><span className="mono">src/pages/*</span> - visualization and research narrative</div>
            </div>
          </div>
        </section>

        <section>
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-xl">
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <div className="flex-1">
                <h2 className="mb-4 text-3xl">Key Takeaways</h2>
                <p className="mb-4 text-lg opacity-90">
                  Built an end-to-end ECG segmentation workflow, combined signal processing with deep learning modeling,
                  and packaged reproducible experimentation + evaluation tooling for medical AI research and engineering.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full bg-white/20 px-4 py-2 text-sm">Deep Learning</span>
                  <span className="rounded-full bg-white/20 px-4 py-2 text-sm">Medical AI</span>
                  <span className="rounded-full bg-white/20 px-4 py-2 text-sm">Signal Processing</span>
                  <span className="rounded-full bg-white/20 px-4 py-2 text-sm">PyTorch</span>
                  <span className="rounded-full bg-white/20 px-4 py-2 text-sm">Research</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1660616246653-e2c57d1077b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGNvZGluZyUyMHB5dGhvbnxlbnwxfHx8fDE3NzU1MTEwNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Data Science Coding"
                  className="h-48 w-64 rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
