import { realpathSync } from 'node:fs'
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages serves the site from /<repo>/; the deploy workflow sets BASE_PATH.
  base: process.env.BASE_PATH ?? '/',
  cacheDir: '.vite-cache',
  server: {
    fs: {
      // Dependencies may be symlinked to a shared checkout during local development.
      allow: [searchForWorkspaceRoot(process.cwd()), realpathSync('node_modules')],
    },
  },
  plugins: [react(), tailwindcss()],
})
