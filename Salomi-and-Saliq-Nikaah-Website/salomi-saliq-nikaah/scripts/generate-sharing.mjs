import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { wedding } from '../src/config/wedding.js';

const require = createRequire(import.meta.url);
const font = await fs.readFile(require.resolve('@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff'));
const bodyFont = await fs.readFile(require.resolve('@fontsource/manrope/files/manrope-latin-400-normal.woff'));
const el = (type, style, children) => ({ type, props: { style, children } });
const arch = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="630" viewBox="0 0 800 630"><g fill="none" stroke="#d7a3b5" opacity=".4"><path d="M55 630V270C55 211 84 183 130 170C128 132 160 105 205 101C220 68 260 53 300 56C332 27 369 24 400 3C431 24 468 27 500 56C540 53 580 68 595 101C640 105 672 132 670 170C716 183 745 211 745 270V630"/><path d="M66 630V273C66 218 95 192 141 180C139 142 170 116 215 112C229 80 267 65 305 68C338 39 372 37 400 17C428 37 462 39 495 68C533 65 571 80 585 112C630 116 661 142 659 180C705 192 734 218 734 273V630"/></g></svg>`;
const card = el('div', { width: 1200, height: 630, boxSizing: 'border-box', backgroundColor: '#8c3b61', color: '#fff4f7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cormorant', position: 'relative' }, [
  el('div', { position: 'absolute', left: 22, top: 22, width: 1156, height: 586, border: '1px solid #9a6679', display: 'flex' }),
  el('div', { position: 'absolute', left: 29, top: 29, width: 1142, height: 572, border: '1px solid #6d5860', display: 'flex' }),
  { type: 'img', props: { src: `data:image/svg+xml;base64,${Buffer.from(arch).toString('base64')}`, width: 800, height: 630, style: { position: 'absolute', left: 200, top: 0 } } },
  el('div', { fontFamily: 'Manrope', fontSize: 13, letterSpacing: 5, color: '#cca0b1', marginTop: 20 }, 'WITH LOVE & DUAS'),
  el('div', { fontSize: 39, color: '#cca0b1', marginTop: 20 }, wedding.occasion),
  el('div', { display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 69, lineHeight: 1.04, marginTop: 14 }, [
    el('div', {}, wedding.bride),
    el('div', { fontSize: 32, color: '#cca0b1', marginTop: 4, marginBottom: 4 }, '&'),
    el('div', {}, wedding.groom),
  ]),
  el('div', { height: 1, width: 100, backgroundColor: '#9a6679', marginTop: 27, marginBottom: 22 }, ''),
  el('div', { fontFamily: 'Manrope', fontSize: 15, letterSpacing: 1 }, `${wedding.dateLabel} · ${wedding.timeLabel}`),
  el('div', { fontFamily: 'Manrope', fontSize: 13, color: '#dbcdd2', marginTop: 15, maxWidth: 980, textAlign: 'center' }, wedding.venue.fullAddress),
]);
const svg = await satori(card, { width: 1200, height: 630, fonts: [{ name: 'Cormorant', data: font, weight: 400, style: 'normal' }, { name: 'Manrope', data: bodyFont, weight: 400, style: 'normal' }] });
const publicDir = new URL('../public/', import.meta.url);
await fs.mkdir(publicDir, { recursive: true });
await fs.writeFile(new URL('social-preview.png', publicDir), new Resvg(svg).render().asPng());
const monogram = wedding.monogram.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
await fs.writeFile(new URL('favicon.svg', publicDir), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="#8c3b61"/><circle cx="50" cy="50" r="43" fill="none" stroke="#be849a"/><text x="50" y="62" fill="#fff4f7" text-anchor="middle" font-family="Georgia,serif" font-size="30">${monogram}</text></svg>`);
await fs.mkdir(new URL('licenses/', publicDir), { recursive: true });
for (const [family, subset] of [['amiri', 'arabic'], ['cormorant-garamond', 'latin'], ['manrope', 'latin']]) {
  const fontPath = require.resolve(`@fontsource/${family}/files/${family}-${subset}-400-normal.woff2`);
  await fs.copyFile(path.resolve(path.dirname(fontPath), '..', 'LICENSE'), new URL(`licenses/${family}-OFL.txt`, publicDir));
}
console.log('Generated the invitation sharing image and monogram favicon.');
