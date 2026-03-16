import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const here = path.dirname(fileURLToPath(import.meta.url));

function normalizeBase(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    return "/";
  }
  if (trimmed === "./") {
    return "./";
  }
  if (trimmed.endsWith("/")) {
    return trimmed;
  }
  return `${trimmed}/`;
}

export default defineConfig(() => {
  const envBase = process.env.OPENCLAW_CONTROL_UI_BASE_PATH?.trim();
  const base = envBase ? normalizeBase(envBase) : "./";
  return {
    base,
    publicDir: path.resolve(here, "public"),
    resolve: {
      alias: {
        "node:path": path.resolve(here, "src/shims/path.ts"),
        "node:os": path.resolve(here, "src/shims/os.ts"),
        "node:fs/promises": path.resolve(here, "src/shims/fs-promises.ts"),
        "node:fs": path.resolve(here, "src/shims/fs.ts"),
        "node:util": path.resolve(here, "src/shims/util.ts"),
        "node:url": path.resolve(here, "src/shims/url.ts"),
        "node:module": path.resolve(here, "src/shims/module.ts"),
        "node:process": path.resolve(here, "src/shims/process.ts"),
      },
    },
    optimizeDeps: {
      include: ["lit/directives/repeat.js"],
    },
    build: {
      outDir: path.resolve(here, "../dist/control-ui"),
      emptyOutDir: true,
      sourcemap: true,
      // Keep CI/onboard logs clean; current control UI chunking is intentionally above 500 kB.
      chunkSizeWarningLimit: 1024,
    },
    server: {
      host: true,
      port: 5173,
      strictPort: true,
    },
    define: {
      "process": "{}",
      "process.env": { NODE_ENV: "production" },
      "process.platform": JSON.stringify("browser"),
      "process.getuid": "() => 0",
      "process.cwd": "() => '/'",
      "process.argv": "[]",
      "process.stdout": "{ isTTY: false, write: () => {} }",
      "process.stderr": "{ isTTY: false, write: () => {} }",
      "process.nextTick": "(cb) => setTimeout(cb, 0)",
      "process.on": "() => {}",
      "process.emit": "() => {}",
      "process.browser": "true",
    },
    plugins: [
      {
        name: "control-ui-dev-stubs",
        configureServer(server) {
          server.middlewares.use("/__openclaw/control-ui-config.json", (_req, res) => {
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                basePath: "/",
                assistantName: "",
                assistantAvatar: "",
                assistantAgentId: "",
              }),
            );
          });
        },
      },
    ],
  };
});
