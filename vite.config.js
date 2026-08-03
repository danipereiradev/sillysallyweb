import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { instagramApiPlugin } from './vite-plugins/instagramApi.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Expose non-VITE_ secrets to the Node process for the API plugin
  if (env.INSTAGRAM_ACCESS_TOKEN) {
    process.env.INSTAGRAM_ACCESS_TOKEN = env.INSTAGRAM_ACCESS_TOKEN
  }
  if (env.INSTAGRAM_BUSINESS_ACCOUNT_ID) {
    process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID = env.INSTAGRAM_BUSINESS_ACCOUNT_ID
  }

  return {
    plugins: [react(), instagramApiPlugin()],
  }
})
