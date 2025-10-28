import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',          // rất quan trọng khi deploy tĩnh
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main:   resolve(__dirname, 'index.html'),
        online: resolve(__dirname, 'online.html'), // ép build thêm trang này
        room: resolve(__dirname, 'room.html'),
      },
    },
  },
});
