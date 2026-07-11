import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the built app works when served from a GitHub Pages
// project subpath (https://<user>.github.io/<repo>/) without hardcoding
// the repo name.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
