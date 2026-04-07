import type { ReactNode } from "react";
import { useNavigateApp } from "../navigationContext";
import type { AppTab } from "../appTab";

type Props = {
  title: string;
  children: ReactNode;
  related?: { label: string; tab: AppTab }[];
};

export function DetailSectionLayout({ title, children, related }: Props) {
  const go = useNavigateApp();

  return (
    <div style={{ flex: 1, maxWidth: 900, margin: "0 auto", padding: "22px 22px 48px", width: "100%" }}>
      <button
        type="button"
        onClick={() => go("landing")}
        style={{
          background: "transparent",
          border: "none",
          color: "var(--accent)",
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: 14,
          marginBottom: 20,
          padding: 0,
        }}
      >
        ← Back to overview
      </button>

      <header style={{ marginBottom: 28 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "var(--text)" }}>{title}</h1>
      </header>

      {related && related.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {related.map((r) => (
            <button
              key={r.tab}
              type="button"
              onClick={() => go(r.tab)}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--text)",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 13,
                padding: "8px 12px",
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      ) : null}

      <div style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15 }}>{children}</div>
    </div>
  );
}
