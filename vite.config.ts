import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import netlifyReactRouter from "@netlify/vite-plugin-react-router";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Make .env values (e.g. RESEND_API_KEY) available to server code during `npm run dev`.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  return {
    // netlifyReactRouter packages the server for Netlify Functions when building.
    plugins: [tailwindcss(), reactRouter(), netlifyReactRouter()],
    resolve: {
      tsconfigPaths: true,
    },
  };
});
