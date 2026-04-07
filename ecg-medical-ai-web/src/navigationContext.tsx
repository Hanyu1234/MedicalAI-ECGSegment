import { createContext, useContext, type ReactNode } from "react";
import type { AppTab } from "./appTab";

const NavCtx = createContext<((t: AppTab) => void) | null>(null);

export function NavProvider({
  navigate,
  children,
}: {
  navigate: (t: AppTab) => void;
  children: ReactNode;
}) {
  return <NavCtx.Provider value={navigate}>{children}</NavCtx.Provider>;
}

export function useNavigateApp(): (t: AppTab) => void {
  const fn = useContext(NavCtx);
  if (!fn) {
    throw new Error("useNavigateApp must be used within NavProvider");
  }
  return fn;
}

export function isAchievementDetailTab(tab: AppTab): boolean {
  return tab === "dataPipeline" || tab === "architecture" || tab === "evaluation" || tab === "workflow";
}
