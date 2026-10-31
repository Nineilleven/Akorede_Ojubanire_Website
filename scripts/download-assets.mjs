// Downloads every image and video the site uses into ./assets
// Usage (from the project root):  node scripts/download-assets.mjs
// Needs Node 18 or newer.
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { dirname } from 'node:path';

const manifest = JSON.parse(await readFile(new URL('./assets-manifest.json', import.meta.url), 'utf8'));
let ok = 0, skipped = 0, failed = 0;

for (const a of manifest) {
  const dest = new URL('../' + a.file, import.meta.url);
  try { await access(dest); skipped++; continue; } catch {}
  await mkdir(dirname(dest.pathname), { recursive: true });
  try {
    const res = await fetch(a.url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    ok++;
    console.log('downloaded', a.file);
  } catch (err) {
    failed++;
    console.error('FAILED', a.file, '-', err.message, '\n   source:', a.url);
  }
}
console.log(`\nDone. ${ok} downloaded, ${skipped} already there, ${failed} failed.`);
if (failed) process.exitCode = 1;
