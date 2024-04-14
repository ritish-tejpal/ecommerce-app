import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'


// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [react(), viteTsconfigPaths()],
  server: {    
    // this ensures that the browser opens upon server start
    // open: true,
    // this sets a default port to 3000  
    port: 3000, 
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
