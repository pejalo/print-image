import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // This ensures assets are linked relatively
  build: {
    outDir: 'docs', // required to deploy on gh-pages
  }
})
