import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer"; // Import the visualizer

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }), // Add the visualizer plugin to see bundle size
  ],
  server: {
    host: "0.0.0.0", // This allows access from any device on the network
    port: 3000, // You can change the port if needed
  },
  build: {
    chunkSizeWarningLimit: 1000, // Set to 1000 kB or your preferred size
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.split("node_modules/")[1].split("/")[0]; // Split by modules
          }
        },
      },
    },
  },
});
