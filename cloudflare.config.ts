import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "beaver-builders",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-22",
    compatibilityFlags: [
      "nodejs_compat",
      "nodejs_compat_populate_process_env",
    ],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
   env: {
  ASSETS: bindings.assets(),
  DATABASE_URL: bindings.secret(),
  RESEND_API_KEY: bindings.secret(),
  ENQUIRY_TO: bindings.secret(),
  ENQUIRY_FROM: bindings.secret(),
},
  }),
});