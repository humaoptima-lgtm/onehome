import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('Building with OpenNext...');
execSync('npx opennextjs-cloudflare build', { stdio: 'inherit' });

console.log('Post-processing for Cloudflare Pages...');

// 1. Move assets to the root of the output directory
fs.cpSync('.open-next/assets', '.open-next', { recursive: true });

// 2. Rename worker.js to _worker.js
fs.renameSync('.open-next/worker.js', '.open-next/_worker.js');

// 3. Create _routes.json to ensure static assets bypass the worker
const routes = {
  version: 1,
  include: ["/*"],
  exclude: ["/_next/*", "/favicon.ico", "/images/*", "/assets/*"]
};
fs.writeFileSync('.open-next/_routes.json', JSON.stringify(routes, null, 2));

// 4. Create .nojekyll to ensure Cloudflare doesn't ignore _next
fs.writeFileSync('.open-next/.nojekyll', '');

console.log('Done! Ready for Cloudflare Pages deployment.');
