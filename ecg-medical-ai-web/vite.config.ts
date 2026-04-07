import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Set VITE_BASE in GitHub Actions to your repo name, e.g. /ecg-medical-ai-web/
const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base,
});
