#!/usr/bin/env node
/* Prints the photo shot list and which slots are still placeholders.
   Run with:  npm run photos                                            */

'use strict';
const fs = require('fs');
const path = require('path');
const slots = require('../src/data/images');

const DIR = path.join(__dirname, '..', 'src', 'static', 'assets', 'img', 'food');
const EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

function fileFor(name) {
  for (const ext of EXTS) if (fs.existsSync(path.join(DIR, name + ext))) return name + ext;
  return null;
}

function wrap(text, width, indent) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > width) { lines.push(line.trim()); line = w; }
    else line += ' ' + w;
  }
  if (line.trim()) lines.push(line.trim());
  return lines.join('\n' + ' '.repeat(indent));
}

console.log('\n  AL ASHFAZ — PHOTO SHOT LIST');
console.log('  Drop files into src/static/assets/img/food/ named exactly as shown.');
console.log('  JPG is fine. Landscape, at least 1600px wide, straight off the phone is OK.\n');

let have = 0, need = 0;

for (const [name, spec] of Object.entries(slots)) {
  const file = fileFor(name);
  const real = !!file;
  if (real) have++; else need++;
  const mark = real ? '[have]' : spec.optional ? '[want]' : '[NEED]';
  console.log('  ' + mark + '  ' + (name + '.jpg').padEnd(24) + (real ? '· currently: ' + file : ''));
  console.log('          ' + wrap(spec.shot, 74, 10));
  console.log('');
}

console.log('  ' + have + ' slot(s) filled, ' + need + ' still using placeholders cropped');
console.log('  from the printed menu poster.\n');
console.log('  Every placeholder is a low-resolution crop of your poster. They are');
console.log('  there so the site is never empty — replace them when you can.\n');
