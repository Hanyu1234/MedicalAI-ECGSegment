# Medical AI: ECG Waveform Segmentation with Deep Learning

## 1. Research Background and Problem Definition

Electrocardiogram (ECG) is one of the most important physiological signals in clinical cardiovascular assessment. Compared with rhythm-level classification alone, waveform segmentation, especially boundary detection for P wave, QRS complex, and T wave, is more directly useful for downstream medical analysis because it supports morphology interpretation, interval measurement, and automated reporting.

However, ECG segmentation remains challenging in both research and engineering settings:

- Significant morphology variation across subjects;
- Baseline drift, motion artifacts, and high-frequency noise;
- Class imbalance that can bias training toward majority patterns;
- Time-sensitive boundary localization where global accuracy is insufficient.

To address these issues, this project develops an end-to-end workflow for ECG waveform segmentation and heartbeat-related deep learning experiments, with a strong focus on reproducibility, interpretability, and engineering transferability.

---

## 2. Project Objectives and Significance

The goal of this project is not only to train a single model, but to establish a reusable research pipeline that covers:

1. Data acquisition and standardized preprocessing;
2. Segmentation label organization and train/validation strategy;
3. Deep learning model implementation and iterative tuning;
4. Multi-metric evaluation and failure-case analysis;
5. Frontend-based technical storytelling and result visualization.

This project contributes at two levels:

- **Research level**: consolidating public datasets, public baselines, and paper-based formulations into a structured methodology;
- **Engineering level**: modularizing training/inference logic and integrating it with a deployable frontend for an end-to-end "method -> result -> communication" loop.

---

## 3. Team and Contributions

This project was completed collaboratively by:

- Hanyu Zhu
- Peter Wang
- Qi Sun

Key contributions include:

- Designing and implementing the preprocessing workflow (filtering, normalization, windowing);
- Organizing modeling logic and training configuration for segmentation tasks;
- Building an evaluation and error-analysis framework;
- Developing a research-oriented frontend page for methods, pipeline, results, and insights.

---

## 4. Data Sources and References

### 4.1 Dataset

This project uses the public Kaggle dataset:  
[`shayanfazeli/heartbeat`](https://www.kaggle.com/datasets/shayanfazeli/heartbeat/data)

The dataset is derived from well-known ECG sources including MIT-BIH Arrhythmia and PTB Diagnostic collections, and provides preprocessed heartbeat segments suitable for deep learning experiments and baseline reproduction.

Download example:

```python
import kagglehub
path = kagglehub.dataset_download("shayanfazeli/heartbeat")
print("Path to dataset files:", path)
```

### 4.2 Reference Notebooks

To improve experimental robustness, we studied and adapted ideas from the following public notebooks:

- [`prajaksa/starter-ecg-heartbeat-categorization-0b6e3109-2`](https://www.kaggle.com/code/prajaksa/starter-ecg-heartbeat-categorization-0b6e3109-2)
- [`cliffincletus/mit-bih-ecg-cardiac-arrhythmia-detection`](https://www.kaggle.com/code/cliffincletus/mit-bih-ecg-cardiac-arrhythmia-detection)

Pull commands:

```bash
kaggle kernels pull prajaksa/starter-ecg-heartbeat-categorization-0b6e3109-2
kaggle kernels pull cliffincletus/mit-bih-ecg-cardiac-arrhythmia-detection
```

Instead of directly copying public code, we extracted practical ideas on imbalance handling, training stability, and evaluation granularity, then adapted them to our project design.

---

## 5. Methodology

### 5.1 End-to-End Pipeline

The project follows this workflow:

**Raw ECG -> Filtering / Normalization -> Windowing -> Label Generation -> Train/Val Split -> Model Training -> Prediction -> Evaluation / Error Analysis**

### 5.2 Technical Details

- **Preprocessing**: signal denoising and amplitude normalization, with a consistent transform chain across training and inference;
- **Modeling**: CNN/SegNet-style encoder-decoder architecture with LSTM-based temporal enhancement;
- **Training strategy**: reproducible experiment setup (seed control, hyperparameter management, learning-rate scheduling) with attention to class imbalance;
- **Evaluation**: beyond aggregate metrics, with per-class analysis, boundary quality inspection, and failure-case review;
- **Communication layer**: structured frontend presentation for methods, results, and diagnostic insights.

### 5.3 Evaluation Dimensions

Primary metrics and analysis targets include:

- Precision / Recall / F1;
- IoU (segmentation overlap);
- Boundary detection quality (including tolerance-based interpretation);
- Failure pattern distribution and qualitative error modes.

---

## 6. Repository Structure

- `ecg-medical-ai-web/`: frontend site (Vite + React + TypeScript) for research narrative and visualization;
- `ml/`: model training code skeleton (preprocessing, architecture, training scripts);
- `.github/workflows/deploy-gh-pages.yml`: GitHub Pages CI/CD workflow.

---

## 7. Run Instructions

### 7.1 Frontend (recommended from repository root)

```bash
npm run dev
```

The root script forwards execution to `ecg-medical-ai-web`.

### 7.2 Build Frontend

```bash
npm run build
```

### 7.3 Run ML Code Locally (optional)

```bash
cd ml
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python train.py --epochs 2
```

---

## 8. GitHub Pages Deployment

1. Push the repository to GitHub (`main` or `master`);
2. In repository **Settings -> Pages**, set Source to **GitHub Actions**;
3. The workflow will automatically build and publish `ecg-medical-ai-web`.

If your repository name is not `<username>.github.io`, keep `VITE_BASE=/<repo-name>/`.  
If the repository is exactly `<username>.github.io`, set `VITE_BASE=/`.

---

## 9. Outcomes and Project Success

The success of this project is not limited to "a runnable model." More importantly, we established a complete framework with both research clarity and engineering usability:

1. Built an end-to-end path from public ECG data to segmentation-oriented evaluation;
2. Systematically integrated paper concepts, public baselines, and local implementation choices;
3. Constructed a project structure that supports both demonstration and reproducibility;
4. Improved communication efficiency by converting technical workflows into a readable, visual research page.

From a capability perspective, this project strengthened the team in four dimensions:  
**medical AI problem framing, deep learning experiment design, error analysis, and engineering delivery**.
