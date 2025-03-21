import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { URL } from "./src/router/constants";

export default defineConfig({
  base: URL,
  plugins: [react()],
});
