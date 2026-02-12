import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // 确保 Electron 加载相对路径资源正确
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});