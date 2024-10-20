import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      proxy: {
        "https://trainease-backend.onrender.com/api": {
          target: "https://trainease-backend.onrender.com",
          secure: false,
        },
      },
    },
    plugins: [react()],
  };
});
