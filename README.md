# Lemonic.tech Agency Website

Engineering-led agency website for **Lemonic.tech**, delivering digital product development, marketing visibility, workflow automation, and cybersecurity services.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **GSAP + ScrollTrigger**, and **Lenis**.

---

## Architecture Overview

1. **Opening Cinematic Scroll Stage (`src/components/scroll/`):**
   - 4-chapter narrative arc scrubbed on scroll position (similar to Apple hardware landing pages).
   - **Dual-Engine Scrubber**:
     - **WebP Frame Sequence Scrubber**: Uses a sliding decode window with `createImageBitmap` and `HTMLImageElement` fallback for 60fps scrubbing of generated video frames.
     - **Procedural Canvas Fallback**: When video frames are not present, renders an interactive HTML5 canvas isometric architectural matrix with precision coordinate telemetry and laser bus lines in `#191A16` and `#DDF45B`.
   - Synchronized floating HUD captions that smoothly interpolate opacity and elevation.

2. **Full Brand Homepage (`src/components/sections/`):**
   - **Brand Manifesto**: Core engineering stance.
   - **8 Services Spectrum**: Problem-solution mapping for every service line.
   - **Delivery Framework**: 4-stage lifecycle (Understand, Scope, Build/Assess, Handover).
   - **Working Standards**: Concrete engineering practices (no buzzwords, full code ownership, written boundaries).
   - **Frequently Asked Questions**: Direct answers to client scope and process questions.
   - **Closing Action CTA**: Direct consultation invitation.

3. **8 Individual Service Pages (`src/app/services/[slug]/`):**
   - Web Development (`/services/web-development`)
   - App Development (`/services/app-development`)
   - Digital Marketing (`/services/digital-marketing`)
   - SEO and AEO (`/services/seo-aeo`)
   - AI Automation (`/services/ai-automation`)
   - Workflow Automation (`/services/workflow-automation`)
   - SOC Services (`/services/soc`)
   - VAPT (`/services/vapt`)
   - Each page features distinct problem definitions, technical capabilities, deliverables, explicit inclusion/exclusion boundaries, lifecycle phases, and service-specific FAQs.

4. **Agency & Engagement Pages:**
   - Working Approach (`/approach`): Delivery lifecycle, change management, and security Rules of Engagement.
   - About Us (`/about`): Factual agency profile grounded in engineering principles.
   - Contact (`/contact`): Zod-validated enquiry form with query-parameter service preselection (`?service=...`), honeypot spam protection, and pluggable email provider adapters.
   - Privacy Policy (`/privacy`) & Engagement Terms (`/terms`).
   - Custom 404 (`/not-found`).

---

## Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm or pnpm
- Python 3 + ffmpeg (for video frame extraction)

### Installation
```bash
git clone <repo-url> lemonic-tech
cd lemonic-tech
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Video Asset Workflow (Google Flow)

If you generate cinematic video assets with **Google Flow** or **Veo**:

1. Refer to `docs/GOOGLE_FLOW_PROMPTS.md` for exact copy-paste prompts formatted for the Lemonic aesthetic (`#191A16` ink and `#DDF45B` lemon highlights).
2. Download your generated MP4 (e.g., `flow_video.mp4`).
3. Slices frames and build the manifest in one command:
   ```bash
   python scripts/extract_flow.py flow_video.mp4 public/frames/hero --fps 12 --width 1400
   ```
4. The website will immediately detect `public/frames/hero/manifest.json` and switch from the procedural canvas fallback to photorealistic video scrubbing.

---

## Verification & Build Commands

- **Type Check**:
  ```bash
  npx tsc --noEmit
  ```
- **Lint**:
  ```bash
  npm run lint
  ```
- **Production Build**:
  ```bash
  npm run build
  ```

---

## Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

| Variable | Description | Default / Example |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL | `https://lemonic.tech` |
| `CONTACT_TO_EMAIL` | Destination email for project enquiries | `hello@lemonic.tech` |
| `CONTACT_FROM_EMAIL` | Sender address for system notifications | `noreply@lemonic.tech` |
| `EMAIL_PROVIDER_API_KEY` | Resend or email provider API key | *(Optional in dev - uses Console logger)* |

---

## Compliance & 21 No-AI-Slop Writing Rules

Every line of copy has been verified against the PRD Gate:
- **No empty buzzwords**: Zero instances of *delve, foster, leverage, utilize, facilitate, empower, streamline, robust, cutting-edge, paradigm shift, game changer, tapestry, realm, beacon, etc.*
- **Zero fabricated proof**: No fake client logos, made-up metrics, or placeholder case studies.
- **Strict security boundaries**: VAPT requires written Rules of Engagement; SOC outlines defined triage hours without unapproved 24/7 claims.
- **Accessible & Responsive**: Keyboard navigable, visible focus states, WCAG 2.2 AA contrast, and zero horizontal overflow.
