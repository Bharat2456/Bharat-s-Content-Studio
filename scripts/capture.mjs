// Generates docs/screenshots/*.png and docs/demo.mp4 + docs/demo.gif from the running site.
// Usage:  npm i --no-save playwright && npx playwright install chromium && node scripts/capture.mjs
import { chromium } from 'playwright';
import http from 'http'; import fs from 'fs'; import path from 'path'; import { execSync } from 'child_process';
const root = path.resolve(import.meta.dirname, '..'), out = path.join(root, 'docs'), shots = path.join(out, 'screenshots');
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg' };
const srv = http.createServer((q, r) => { const f = path.join(root, q.url.split('?')[0].replace(/\/$/, '/index.html') || 'index.html'); fs.readFile(f, (e, b) => e ? (r.writeHead(404), r.end()) : (r.writeHead(200, { 'Content-Type': mime[path.extname(f)] || 'application/octet-stream' }), r.end(b))); }).listen(4173);
const B = 'http://localhost:4173/', wait = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: out, size: { width: 1280, height: 800 } } });
const p = await ctx.newPage(); const shot = n => p.screenshot({ path: path.join(shots, n + '.png') });
const theme = t => p.evaluate(t => { document.documentElement.dataset.theme = t; localStorage.setItem('theme', t); }, t);
await p.goto(B); await wait(1500); await shot('landing-light');
await p.mouse.wheel(0, 700); await wait(1200); await shot('features-light');
await theme('dark'); await p.evaluate(() => scrollTo(0, 0)); await wait(1200); await shot('landing-dark');
await p.goto(B + 'builder.html'); await wait(1200); await shot('builder-dark');
await theme('light'); await wait(600); await shot('builder-light');
await p.goto(B + 'studio.html#img'); await wait(1000); await shot('dashboard-light');
await p.fill('textarea[name=prompt]', 'A lone astronaut walking through a neon-lit Mumbai street at night, cinematic'); await p.click('text=Generate');
await p.waitForSelector('#out img', { timeout: 90000 }).catch(() => {}); await wait(1500); await shot('image-generation');
await theme('dark'); await wait(600);
for (const id of ['cin', 'mkt', 'agent']) { await p.goto(B + 'studio.html#' + id); await wait(1400); await shot('studio-' + id); }
await ctx.close(); await browser.close(); srv.close();
const vid = fs.readdirSync(out).find(f => f.endsWith('.webm'));
try { execSync(`ffmpeg -y -i "${path.join(out, vid)}" -c:v libx264 -pix_fmt yuv420p -movflags +faststart "${path.join(out, 'demo.mp4')}"`, { stdio: 'ignore' });
  execSync(`ffmpeg -y -i "${path.join(out, 'demo.mp4')}" -vf "fps=8,scale=800:-1:flags=lanczos" "${path.join(out, 'demo.gif')}"`, { stdio: 'ignore' }); fs.unlinkSync(path.join(out, vid)); }
catch { console.log('ffmpeg not found: the recording is saved as', vid); }
console.log('Done. Files are in docs/');
