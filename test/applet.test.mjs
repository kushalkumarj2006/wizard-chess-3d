import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = process.cwd();

test('Standalone HUD in index.html includes required game & camera controls, excludes removed features', () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');

  // Must include simplified game & camera controls
  for (const requiredId of [
    'btn-side-toggle',
    'btn-ai-move',
    'btn-reset',
    'btn-cam-player',
    'btn-cam-top',
    'btn-cam-side',
    'btn-cam-wide',
    'btn-hide-ui',
    'controls-hint',
    'captured-tray'
  ]) {
    assert.ok(html.includes(`id="${requiredId}"`), `Missing required HUD control #${requiredId}`);
  }

  // Must NOT include camera speed sliders, script mode bar, or multiplayer lobby
  for (const forbiddenId of [
    'cam-speed-wrap',
    'input-cam-speed',
    'rot-speed-wrap',
    'input-rot-speed',
    'script-bar',
    'btn-script-modal',
    'btn-script-prev',
    'btn-script-next',
    'btn-lobby',
    'lobby-modal',
    'room-pill',
    'btn-checkmate-stepback'
  ]) {
    assert.ok(!html.includes(forbiddenId), `Forbidden UI element #${forbiddenId} found in index.html`);
  }
});

test('index.html references the engine module and the correct asset base path', () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');

  // Must boot the engine via ES module import
  assert.ok(
    html.includes("import { initWizardChess } from './src/wizardChessEngine.js'"),
    'index.html must import initWizardChess from ./src/wizardChessEngine.js'
  );
  assert.ok(
    html.includes('initWizardChess()'),
    'index.html must actually call initWizardChess()'
  );

  // Must link the stylesheet
  assert.ok(
    html.includes('./src/styles.css'),
    'index.html must link ./src/styles.css'
  );

  // Must use the standalone Three.js importmap (CDN)
  assert.ok(
    html.includes('type="importmap"'),
    'index.html must contain an importmap block for three.js'
  );
  assert.ok(
    html.includes('"three":') && html.includes('three@0.170.0'),
    'index.html importmap must reference three@0.170.0'
  );
});

test('No React / Vite / TypeScript build artifacts remain', () => {
  // If these exist the standalone HTML is not actually standalone
  const staleBuildFiles = [
    'src/App.tsx',
    'src/main.tsx',
    'package.json',
    'vite.config.ts',
    'tsconfig.json'
  ];
  for (const f of staleBuildFiles) {
    assert.ok(
      !fs.existsSync(path.join(ROOT, f)),
      `Build-step file ${f} still present — remove it if you switched to the standalone HTML`
    );
  }
});

test('wizardChessEngine.js retains desktop high-tier + mobile medium/low tiers', () => {
  const engine = fs.readFileSync(path.join(ROOT, 'src/wizardChessEngine.js'), 'utf-8');

  // Must define the three quality tiers
  assert.ok(engine.includes("QUALITY === 'high'"), 'Engine must reference high-tier path');
  assert.ok(engine.includes("QUALITY === 'medium'"), 'Engine must reference medium-tier path');
  assert.ok(engine.includes("QUALITY === 'low'"), 'Engine must reference low-tier path');

  // Must cap pixel ratio per tier (1.25 / 1.5 / 2)
  assert.ok(engine.includes('MAX_PIXEL_RATIO'), 'Engine must define MAX_PIXEL_RATIO');
  assert.ok(engine.includes('1.25') && engine.includes('1.5'), 'Engine must use tiered pixel ratio caps');

  // Must set tiered shadow map size
  assert.ok(engine.includes('shadowSize'), 'Engine must define shadowSize');
  assert.ok(
    engine.includes("512") && engine.includes("1024") && engine.includes("2048"),
    'Engine must use 512 / 1024 / 2048 shadow sizes'
  );

  // Must expose diagnostics
  assert.ok(engine.includes('window.__wcDiag'), 'Engine must expose window.__wcDiag');
  assert.ok(engine.includes('window.wizardChess'), 'Engine must expose window.wizardChess');

  // Must contain the mobile-facing scene keys
  assert.ok(engine.includes('isMobile'), 'Engine must reference isMobile');
  assert.ok(engine.includes('renderScale'), 'Engine must reference renderScale for adaptive resolution');
});

test('All 7 compressed 3D assets (.glb.gz.b64) decode and gunzip to valid glTF 2.0 binary models', () => {
  const expectedModels = [
    'option8_cathedral',
    'pawn_white',
    'rook_white',
    'knight_white',
    'bishop_white',
    'queen_white',
    'king_white'
  ];
  for (const name of expectedModels) {
    // NOTE: assets live next to index.html (not inside public/ like the Vite build had)
    const b64Path = path.join(ROOT, 'assets/glb', `${name}.glb.gz.b64`);
    assert.ok(fs.existsSync(b64Path), `Missing 3D asset ${b64Path}`);
    const b64Text = fs.readFileSync(b64Path, 'utf-8').trim();
    assert.ok(b64Text.length > 1000, `Asset ${name}.glb.gz.b64 is unexpectedly small`);
    const gzBuf = Buffer.from(b64Text, 'base64');
    const glbBuf = zlib.gunzipSync(gzBuf);
    const magic = glbBuf.toString('ascii', 0, 4);
    const version = glbBuf.readUInt32LE(4);
    const totalLen = glbBuf.readUInt32LE(8);
    assert.equal(magic, 'glTF', `Invalid glTF magic header for ${name}`);
    assert.equal(version, 2, `Invalid glTF version for ${name}`);
    assert.equal(totalLen, glbBuf.length, `Mismatched glTF byte length for ${name}`);
  }
});
