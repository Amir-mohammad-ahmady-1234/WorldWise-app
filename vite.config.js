import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    {
      name: "disable-eslint-warnings",
      transform(code, id) {
        if (id.includes("node_modules")) return code;
        return code.replace(/console\.error\(.*?\)/g, "console.warn('ESLint warning hidden')");
      },
    },
  ],
});

