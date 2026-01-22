import {readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

// 1. Recuperar la carpeta a listar
const dir = process.argv[2] || '.';

// 2. Formateo simple de los tamaños
const formatBytes = (size) => {
  if (size < 1024) return size + ' B';
  return (size / 1024).toFixed(2) + ' KB';
};


// 3. Leer los nombres, sin info
const files = await readdir(dir);


// 4. Leer los detalles de cada archivo
const entries = await Promise.all(
  files.map(async (file) => {
    const filePath = join(dir, file);
    const info = await stat(filePath);

    return {
      name: file,
      isDir: info.isDirectory(),
      size: formatBytes(info.size)
    };
  })
);

// 4.5 Ordenar: directorios primero, luego archivos, ambos alfabéticamente
entries.sort((a, b) => {
if (a.isDir && !b.isDir) return -1;// Directorios antes que archivos, el -1 es para que a vaya antes que b
  if (!a.isDir && b.isDir) return 1; // Archivos después de directorios, el 1 es para que b vaya antes que a
  return a.name.localeCompare(b.name); // Ambos son del mismo tipo, ordenar alfabéticamente
});

// 5. Mostrar la info por consola
for (const entry of entries) {
  console.log(`${entry.isDir ? '📁' : '📄'} ${entry.name} - ${entry.size}`);
}