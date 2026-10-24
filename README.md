# 🏰 Wizard Chess 3D — Standalone Edition

> Interactive 3D Gothic Cathedral Wizard Chess — sculpted stone pieces, cinematic melee captures, stone-shatter physics, and single-player AI. **Zero build step.** Pure ES modules, Three.js via CDN import map, deploy-ready for GitHub Pages.

![Three.js](https://img.shields.io/badge/Three.js-0.170-blue) ![ES Modules](https://img.shields.io/badge/ES%20Modules-native-yellow) ![No Build](https://img.shields.io/badge/build-none-brightgreen) ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-ready-222)

---

## 🙏 Credits & Attribution

This project is a **standalone remake** of the original **Wizard Chess 3D** applet featured in Google's **Gemini 4 Argon Builders Showcase** on Google AI Studio.

### Original Source

| | |
| --- | --- |
| **Original app** | [Wizard Chess 3D — Google AI Studio](https://aistudio.google.com/apps/bundled/wizard-chess-3d?fullscreenApplet=true) |
| **Showcase page** | [Gemini 4 Argon Builders Showcase](https://aistudio.google.com/learn/gemini-4-argon-showcase) |
| **Published by** | Geneviève Huskens — Developer Relations, Google DeepMind |
| **Published on** | October 13, 2026 |
| **AI model** | Gemini 4 Argon |

The **original 3D scene, engine architecture, cathedral model, piece models, animations, and GLSL shaders** were all created by Google DeepMind and demonstrated as part of the Gemini 4 Argon showcase. All credit for the visual design, art direction, and core engine concepts belongs to them.

### What This Fork Changes

This version is a **technical port** — the goal is to strip the original React + Vite + TypeScript build pipeline and ship the same experience as a **zero-dependency, zero-build static site** that runs anywhere:

- ✅ **No React, no Vite, no TypeScript, no `node_modules`** — just `.html`, `.css`, `.js`, and `.glb.gz.b64`
- ✅ **Three.js loaded via import map** from a CDN (`three@0.170.0`)
- ✅ **Hand-written vanilla HUD** replacing the original React shell, with all original mobile-sheet and checkmate-overlay behaviors preserved
- ✅ **Quality tiers** added: automatic `high` / `medium` / `low` detection based on device capabilities
- ✅ **Adaptive resolution scaling** on mobile — pixel ratio dynamically adjusts to hit target FPS
- ✅ **Debounced resize handler** with re-applied pixel ratio
- ✅ **Retina-capped pixel ratio** per tier (1.25 / 1.5 / 2.0) for consistent performance across devices
- ✅ **Deploy-ready for GitHub Pages** via the `.nojekyll` file

### Built With

- **[Three.js 0.170](https://threejs.org/)** — WebGL 2 renderer by Mr.doob and contributors
- **[GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)**, **[OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)**, **[SkeletonUtils](https://threejs.org/docs/#examples/en/utils/SkeletonUtils)** — Three.js add-ons
- **[DecompressionStream API](https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream)** — for client-side gzip decompression of GLB assets
- Custom **GLSL** — flame-tongue shaders, charred ember shader, stone realism hook

Special thanks to **Google DeepMind** and the **Gemini 4 Argon** team for open-sourcing the original applet, and to the **Three.js community** for the rendering foundation.

---

## ✨ Features

- **Gothic Cathedral Sanctum** — Vaulted stone ceilings, lancet windows, a rose window, and twin crackling braziers driven by custom GLSL flame shaders.
- **Sculpted Stone Pieces** — Six rigged, animated piece types loaded from compressed GLB assets.
- **Cinematic Melee Captures** — Attacker lunges forward, the camera glides into a dramatic duel angle on a continuous Bézier arc, the defender shatters into physics shards, and a warm impact flash blooms.
- **Checkmate Sequence** — The defeated King shudders, topples under gravity, bounces on the altar, and a Gothic "Sanctum Judgment" banner rises.
- **Tactical Single-Player AI** — One-ply search with material evaluation, center control, pawn advancement, check bonus, and hanging-piece penalty.
- **Four Camera Presets** — Player Cam, Overhead, Side Profile, and Wide Cathedral view — each toggleable to flip sides.
- **Full 3D Camera Controls** — Orbit, pan, zoom, plus **WASD + R/F** fly-cam and **arrow-key** rotation.
- **Shift + Drag Axis Lock** — Hold Shift and drag to lock orbit rotation to the X or Y axis.
- **Mobile-First Touch UI** — Bottom-sheet controls, tap-to-move, pinch-zoom, and a floating "Show UI" pill when the HUD is hidden.
- **Quality Tiers** — Automatic `high` / `medium` / `low` detection based on device hardware, user agent, and pointer type.
- **Adaptive Resolution** — On mobile, pixel ratio scales down when FPS drops below 45 and scales back up when FPS recovers above 58.
- **Full Chess Rules** — Castling, promotion, check, checkmate, stalemate, and full legal-move filtering.

---

## 🎮 Controls

### Desktop

| Action | Input |
| --- | --- |
| Move piece | **Click** a piece, then click a highlighted destination |
| Orbit camera | **Left-drag** |
| Pan camera | **Right-drag** |
| Zoom | **Scroll** |
| Fly camera | **W / A / S / D** |
| Vertical fly | **R / F** |
| Rotate camera | **Arrow keys** |
| Axis-locked orbit | **Shift + Drag** |
| Hide / show UI | **H** |

### Mobile / Touch

| Action | Input |
| --- | --- |
| Move piece | **Tap** a piece, then tap a highlighted destination |
| Orbit camera | **1-finger drag** |
| Pan camera | **2-finger drag** |
| Zoom | **Pinch** |
| Restore hidden HUD | Tap **Show UI** |

### HUD Buttons

| Button | Function |
| --- | --- |
| **Play as Black / White** | Swap which side the human plays |
| **AI Move** | Force the AI to move immediately |
| **New Game** | Reset the board |
| **Player Cam** | Toggle White / Black player view |
| **Overhead** | Top-down board view (toggle orientation) |
| **Side** | Side-profile view (East / West) |
| **Cathedral** | Wide cathedral backdrop (North / South) |
| **Hide UI [H]** | Toggle cinematic HUD visibility |

---

## 🚀 Getting Started

### No Installation Required

This is a **pure static site**. There is no `npm install`, no build command, and no dependencies to download.

### Run Locally

Because the engine uses ES modules with an import map, you need to serve the files over **HTTP** (not `file://`). Any static server works:

```bash
# Python (built-in on most systems)
python3 -m http.server 8080

# Node
npx serve .

# Or any other static server (nginx, Caddy, Apache, …)
```

Then open **http://localhost:8080** in a modern browser.

### Deploy

The project is **GitHub Pages-ready** thanks to the included `.nojekyll` file:

1. Push the repo to GitHub.
2. Go to **Settings → Pages → Deploy from branch → main / (root)**.
3. Done — your site is live at `https://<user>.github.io/<repo>/`.

Any other static host works identically (Netlify, Vercel, Cloudflare Pages, S3, nginx, etc.). Just upload the root folder as-is.

---

## 📁 Project Structure

```
.
├── .nojekyll                      # Enables GitHub Pages without Jekyll
├── index.html                     # Single-page entry + import map + HUD markup
├── src/
│   ├── styles.css                 # HUD, mobile sheet, checkmate banner, loader
│   └── wizardChessEngine.js       # The 3D engine (scene, AI, rules, physics, shaders)
├── test/
│   └── applet.test.mjs            # Node test suite (HUD, assets, quality tiers)
└── assets/
    └── glb/                       # Base64+gzip compressed GLB models (7 files)
        ├── option8_cathedral.glb.gz.b64
        ├── pawn_white.glb.gz.b64
        ├── rook_white.glb.gz.b64
        ├── knight_white.glb.gz.b64
        ├── bishop_white.glb.gz.b64
        ├── queen_white.glb.gz.b64
        └── king_white.glb.gz.b64
```

> **Note:** Assets are **base64-encoded gzip** containing binary glTF 2.0 (`.glb`) models. The engine decompresses them client-side via the browser's native `DecompressionStream` API — no server-side compression or special headers required.

---

## 🧠 How It Works

### The Engine

`src/wizardChessEngine.js` is a single self-contained module exported as `initWizardChess()`. It owns:

1. **Renderer & Scene** — WebGL2 renderer with ACES tone mapping, soft PCF shadow maps, and a self-contained PMREM environment built from a mini scene of glowing panels (no external HDR file needed).
2. **Asset Loading** — Fetches each `.glb.gz.b64`, base64-decodes it, gunzips it via `DecompressionStream`, then parses with `GLTFLoader`.
3. **Cathedral Shaders** — Custom GLSL flame-tongue shaders + charred-ember-log shader, plus an `onBeforeCompile` stone-realism hook that adds cavity AO and warm-fire GI bounce to the baked cathedral material.
4. **Piece Instantiation** — Clones a single shared template per piece type/color with `SkeletonUtils.clone` so each piece has its own animation mixer.
5. **Board Interaction** — Raycasts against piece meshes and an invisible pick plane to translate clicks into board coordinates.
6. **Move Execution** — Tween-based state machine per move:
   - **Normal move:** arcs the piece toward its destination with a subtle hop.
   - **Capture:** flies the attacker to standoff distance on a quadratic Bézier camera arc, plays the attack clip, shatters the defender into physics shards, then returns the camera to its saved pose.
   - **Castling:** moves the rook in parallel on a mirrored tween.
   - **Promotion:** swaps the pawn's mesh for a fresh Queen instance.
7. **AI Scheduling** — After each move, defers the AI reply by ~540 ms so the human can see the board settle.
8. **Diagnostics** — Exposes `window.__wcDiag` (FPS, draw calls, triangles) and `window.__wizardChessTelemetry` (attack timing, column clearance) for debugging.

### Quality Tiers

The engine auto-detects device capability and chooses one of three quality tiers:

| Tier | Trigger | Pixel Ratio Cap | Shadow Map | Notes |
| --- | --- | --- | --- | --- |
| **High** | Desktop | 2.0 | 2048×2048 | Full stone cavity shader, all window lights |
| **Medium** | Mobile with ≥ 4 cores | 1.5 | 1024×1024 | Reduced lights, cheaper flame noise |
| **Low** | Low-end mobile | 1.25 | 512×512 | No stone cavity shader, no flames, no window lights |

On mobile, the renderer also **adapts resolution dynamically**: if FPS drops below 45, the render scale decreases by 0.05 (min 0.65); if FPS recovers above 58, it ramps back up toward 1.0.

### The AI

`chooseSmartAIMove(color)` scores every legal move on:

- **Material gain** — `PIECE_VALUES[target.type] * 1.15 - PIECE_VALUES[piece.type] * 0.08`
- **Centralization** — closer-to-center destinations score higher
- **Pawn advancement** — forward pawn pushes get a bonus
- **Check bonus** — +45 for delivering check
- **Hanging-piece penalty** — −75% of the moving piece's value if the destination is attacked by the opponent
- **Random jitter** — ±7 so the AI doesn't play identically every game

Ties within 1 point are chosen randomly.

---

## 🧪 Testing

The project ships with a `node:test` suite in `test/applet.test.mjs` that verifies:

- The HUD in `index.html` contains all required controls and **excludes** removed ones (camera speed sliders, notation script bar, multiplayer lobby).
- `index.html` references the engine module, the stylesheet, and the Three.js import map correctly.
- No stale React / Vite / TypeScript build artifacts remain.
- The engine retains all three quality tiers (`high`, `medium`, `low`) with correct pixel-ratio caps and shadow-map sizes.
- All 7 `.glb.gz.b64` assets decode to valid **glTF 2.0** binaries (magic header, version, byte length).

Run with:

```bash
node --test test/
```

No dependencies needed — the test suite uses only Node's built-in `node:test`, `node:assert`, `node:fs`, `node:path`, and `node:zlib`.

---

## 🎨 Customization

Most tunables live near the top of `src/wizardChessEngine.js`:

```js
const BOARD_SQ_SIZE   = 0.34;         // physical size of one square
const BOARD_SURFACE_Y = 0.775;        // height of the altar surface
const PIECE_VALUES    = { pawn: 100, knight: 320, ... };
const ATTACK_SYNC_PROFILES = {
  pawn: { timeScale: 1.15, contactClip: 0.60, blowClip: 0.78, maxLunge: 0.095 },
  // ...
};
```

To change the default scripted demo notation:

```js
const DEFAULT_DIRECTOR_NOTATION =
  '1. e4 d5 2. exd5 Qxd5 3. Nc3 Qd8 4. d4 c6 ...';
```

To bump the pixel-ratio cap for high-tier devices:

```js
const MAX_PIXEL_RATIO = QUALITY === 'low' ? 1.25 : QUALITY === 'medium' ? 1.5 : 2;
```

---

## 🔌 Programmatic API

`window.wizardChess` exposes a rich API for automation, demos, and testing:

```js
// Move a piece directly (bypasses click)
window.wizardChess.executeChessMove(6, 4, 4, 4);

// Reset the board
window.wizardChess.resetChessBoard(true);

// Load a PGN/SAN/UCI notation sequence
window.wizardChess.loadNotation('1. e4 e5 2. Nf3 Nc6 3. Bb5');

// Step through notation one half-move at a time
window.wizardChess.stepScriptForward();
window.wizardChess.stepScriptBackward();

// Snap the camera to a preset
window.wizardChess.setCameraPreset('wide');
window.wizardChess.setCameraPose([0, 2.5, 4], [0, 1, 0]);

// Adjust WASD / arrow-key camera speeds
window.wizardChess.setCameraKeySpeedPercent(75);
window.wizardChess.setCameraRotSpeedPercent(50);

// Set up a custom board scenario
window.wizardChess.setupCustomScenario([
  { type: 'king',  color: 'w', r: 7, c: 4 },
  { type: 'queen', color: 'b', r: 0, c: 3 },
], 'w');

// Trigger the checkmate king-fall sequence
window.wizardChess.triggerCheckmateSequence('b', 'w');

// Grab a diagnostic snapshot
const state = window.wizardChess.getState();
console.log(state.telemetry, state.diag, state.quality);

// Step the simulation manually (for automated screenshots)
window.wizardChess.setManualStepMode(true);
window.wizardChess.stepBy(0.9, 15);
```

A `testColumnCollisionSlide(start, end, steps)` helper is also available for verifying the camera never clips through cathedral pillars during free flight.

---

## 🔧 Debugging

- **`window.__wcDiag`** — Live FPS, draw-call count, triangle count, quality tier, and current render scale.
- **`window.__wizardChessTelemetry`** — Detailed camera and combat telemetry (column deflections, min clearance, attack samples, capture timing).
- **`?autotest=1`** — Enables `preserveDrawingBuffer` (needed for screenshot APIs) and skips the automatic `requestAnimationFrame` loop so you can drive the scene manually.
- **`?side=b`** — Boots the app playing as Black.

---

## 🗺️ Roadmap

- [ ] **Undo** — The engine already captures per-move board snapshots; just needs a HUD button.
- [ ] **Promotion picker** — Currently always promotes to Queen.
- [ ] **PGN export** — Save finished games as standard PGN.
- [ ] **Sound** — Melee clang, stone shatter, and brazier crackle SFX.
- [ ] **Multiplayer** — The engine has full room-sync scaffolding (`BroadcastChannel`, `EventSource`, `localStorage` fallback) but the lobby UI was removed in this simplified fork.

---

## 📜 License

MIT — free to use, modify, and ship.

**Attribution note:** This is a standalone remake of the Wizard Chess 3D reference applet published by Google on Google AI Studio's Gemini 4 Argon Builders Showcase (October 2026). The original 3D scene, engine architecture, cathedral model, piece models, animations, and GLSL shaders were created by **Google DeepMind** for demonstration purposes. Please preserve this README's **Credits & Attribution** section if you redistribute the app.

---

<p align="center">
  <em>“The pieces are moving. Best be on your guard.”</em><br/>
  <strong>♔ Wizard Chess 3D — Standalone Edition ♚</strong><br/>
  <sub>A zero-build port of the original <a href="https://aistudio.google.com/apps/bundled/wizard-chess-3d?fullscreenApplet=true">Gemini 4 Argon showcase applet</a>.</sub>
</p>
