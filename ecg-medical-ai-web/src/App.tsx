import { useState, type CSSProperties } from "react";
import type { AppTab } from "./appTab";
import { isAchievementDetailTab, NavProvider } from "./navigationContext";
import { ArchitecturePage } from "./pages/ArchitecturePage";
import { DataPipelinePage } from "./pages/DataPipelinePage";
import { DeepLearningLanding } from "./pages/DeepLearningLanding";
import { EvaluationPage } from "./pages/EvaluationPage";
import { MathWorksQtPipeline } from "./pages/MathWorksQtPipeline";
import { PaperTheory200104689 } from "./pages/PaperTheory200104689";
import { PortfolioDemo } from "./pages/PortfolioDemo";
import { WorkflowPage } from "./pages/WorkflowPage";

const btn = (active: boolean): CSSProperties => ({
  padding: "6px 12px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: active ? "var(--nav-active-bg)" : "transparent",
  color: "var(--text)",
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: 14,
});

export default function App() {
  const [tab, setTab] = useState<AppTab>("portfolio");

  const landingActive = tab === "landing" || isAchievementDetailTab(tab);

  return (
    <NavProvider navigate={(t) => setTab(t)}>
      <div style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
            position: "sticky",
            top: 0,
            zIndex: 10,
            boxShadow: "0 1px 0 rgba(15, 23, 42, 0.04)",
          }}
        >
          <div
            style={{
              maxWidth: 960,
              margin: "0 auto",
              padding: "10px 22px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontWeight: 600, marginRight: 8 }}>ECG · Medical AI</span>
            <button type="button" onClick={() => setTab("landing")} style={btn(landingActive)}>
              Overview
            </button>
            <button type="button" onClick={() => setTab("portfolio")} style={btn(tab === "portfolio")}>
              Live demo
            </button>
            <button type="button" onClick={() => setTab("mathworks")} style={btn(tab === "mathworks")}>
              QT pipeline (raw · filter · TF)
            </button>
            <button type="button" onClick={() => setTab("paper")} style={btn(tab === "paper")}>
              Reference
            </button>
          </div>
        </div>

        {tab === "landing" ? (
          <DeepLearningLanding onNavigate={(next) => setTab(next)} />
        ) : tab === "portfolio" ? (
          <PortfolioDemo />
        ) : tab === "mathworks" ? (
          <MathWorksQtPipeline />
        ) : tab === "paper" ? (
          <PaperTheory200104689 />
        ) : tab === "dataPipeline" ? (
          <DataPipelinePage />
        ) : tab === "architecture" ? (
          <ArchitecturePage />
        ) : tab === "evaluation" ? (
          <EvaluationPage />
        ) : (
          <WorkflowPage />
        )}

        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "16px 22px 28px",
            color: "var(--muted)",
            fontSize: 13,
            textAlign: "center",
            background: "var(--surface)",
          }}
        >
          Portfolio · ECG segmentation · Feb 2025 – May 2025
        </footer>
      </div>
    </NavProvider>
  );
}
