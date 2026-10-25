# Google Flow Video Generation Guide for Lemonic.tech

This guide contains the exact prompts and settings to create the Apple-style scroll-film using **Google Flow** (or Google Veo / Imagen Video).

---

## Output Settings
- **Aspect Ratio:** 16:9 Landscape
- **Resolution:** 1080p or 4K
- **Frame Rate:** 24fps
- **Motion Speed:** Slow Motion / Cinematic
- **Color Grading:** Deep charcoal ink (`#191A16`), matte titanium, precision lemon-yellow laser neon (`#DDF45B`).

---

## The 4 Storyboard Chapters

### Scene 1: The Architectural Core (0.00 – 0.25)
* **Visual Action:** Macro slow pull-out of an ultra-clean matte-black tech chassis with geometric edge laser calibration.
* **Google Flow Prompt:**
```
Cinematic macro shot of an ultra-clean matte black titanium and graphite architectural tech monolith emerging from darkness. Subtle precision neon lemon-yellow laser lines (#DDF45B) tracing geometric joints and modular bus sockets. Dark charcoal studio background #191A16, soft rim lighting, photorealistic 8k commercial product hardware photography, static locked camera, 24fps slow motion, zero blur.
```
* **Negative Prompt:**
```
camera movement, camera zoom, extra objects, human hands, blurry, low resolution, colorful glowing gradients, floating blobs, text, watermark
```

---

### Scene 2: Logic Bus & Automation Flow (0.25 – 0.50)
* **Visual Action:** Orthogonal micro-circuit channels illuminate with pulsating lemon-yellow data packets.
* **Google Flow Prompt:**
```
Centered architectural top-down perspective of illuminated fiber-optic data channels and micro-circuits pulsing with clean lemon-yellow light (#DDF45B) across a dark matte carbon circuit substrate. Structured data pulses moving rhythmically through defined routing nodes, completely photorealistic, static locked camera, dark studio lighting, no camera drift.
```
* **Negative Prompt:**
```
camera shake, chaotic lightning, purple colors, blue gradients, messy wires, people, artifacts, watermark
```

---

### Scene 3: Protective Security Matrix (SOC & VAPT) (0.50 – 0.75)
* **Visual Action:** Interlocking geometric shield lattice forming around the processor core.
* **Google Flow Prompt:**
```
Slow controlled turntable motion of a geometric interlocking security shield grid forming around a core processor, precision dark obsidian and brushed steel facets locking together with lemon-tinted edge reflections. High-contrast commercial hardware studio lighting, pitch-black background #191A16, crisp sharp focus.
```
* **Negative Prompt:**
```
sparks, explosions, cartoon, glowing orbs, blur, camera pan, human figures, text
```

---

### Scene 4: Unified Platform Monolith (0.75 – 1.00)
* **Visual Action:** Subsystems complete their lock into a singular monolith with an elegant edge light sweep.
* **Google Flow Prompt:**
```
The multi-layered modular device completes its lock into a singular, ultra-minimalist matte-black server monolith. Studio key lighting sweeps smoothly across the top chamfered edge, catching a clean lemon-accented perimeter line. Centered composition, deep charcoal backdrop, pristine commercial technology finish.
```
* **Negative Prompt:**
```
text, logos, camera shake, distortion, extra objects, watermark
```

---

## Converting Your Video into Scrub Frames

Once you download your generated MP4 from Google Flow (e.g. `flow_hero.mp4`):

1. Place the MP4 in the project root:
   ```bash
   cp ~/Downloads/flow_hero.mp4 ./flow_hero.mp4
   ```

2. Run the automated extractor script:
   ```bash
   python scripts/extract_flow.py flow_hero.mp4 public/frames/hero --fps 12 --width 1400
   ```

3. **Done!** The script will:
   - Extract frames via ffmpeg
   - Encode them as lightweight, high-performance WebP images (~15–25 MB total)
   - Generate `public/frames/hero/manifest.json`

The website will automatically detect the manifest and transition from the procedural canvas fallback to photorealistic video frame scrubbing!
