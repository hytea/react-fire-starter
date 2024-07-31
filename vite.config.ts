// vite.config.ts
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  resolve: {
    alias: {
      "#": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "ReactFireStarter",
      fileName: (format) => `react-fire-starter.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "recoil",
        "react-router-dom",
        "firebase",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          recoil: "Recoil",
          "react-router-dom": "ReactRouterDOM",
          firebase: "firebase",
        },
      },
    },
  },
});
