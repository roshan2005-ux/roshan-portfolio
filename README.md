# Roshan Ebinesar — Cinematic Developer Portfolio

A premium, cinematic, and immersive developer portfolio for **Roshan Ebinesar**, Computer Science Engineering student and Full-Stack Developer. Inspired by high-end technology films and 3D interactive reels.

---

## Key Highlights & Real Verified Assets

- **Cinematic Character Visual**: Real professional suit portrait (`assets/profile/roshan-portrait.jpg`) featured in the fullscreen cinematic intro and hero section with atmospheric lighting and 3D depth.
- **FusionX 2026 Hackathon (3rd Prize & Team Leader)**: Real certificate (`assets/certificates/fusionx-2026-certificate.jpg`) from the 24-hour hackathon conducted by the AWS Student Builder Group at SKP Engineering College (10.9.2026).
- **AWS Student Community Day 2026**: Real certificate of appreciation (`assets/certificates/aws-student-community-day-2026.jpg`) held on 31st August 2026 at SKP Engineering College, Tiruvannamalai.
- **Placement Launchpad AI**: Featured major project showcase linked directly to GitHub repository: [https://github.com/roshan2005-ux/Placement-launchpad-ai](https://github.com/roshan2005-ux/Placement-launchpad-ai).
- **WolfScanX**: Android QR-code scanner and cybersecurity project preview (`assets/projects/wolfscanx.png`).
- **Student Management System & Naan Mudhalvan Certifications**: Complete verified certificates preserved and accessible through the interactive modal viewer.
- **Verified Official Resume**: Accessible directly via View / Download PDF at `assets/resume/Roshan_Ebinesar_Resume.pdf`.

---

## Architectural & Cinematic Features

1. **Fullscreen Cinematic Opening**:
   - Black screen sequence with ambient particle emergence, atmospheric volumetric lighting, portrait illumination, rim-light glow, and typography reveal.
   - Includes seamless transition to hero and an instant `[ESC] / [ENTER]` bypass.
2. **60 FPS Canvas Nebula & Particle Field**:
   - Lightweight, battery-efficient particle constellation with mouse deflection and auto-pause when out of view.
3. **Floating HUD Glass Panels**:
   - 3D glassmorphic interface panels floating around the portrait with depth parallax.
4. **Interactive 3D Tilt**:
   - Real-time perspective transforms on hover for cards and certificates.
5. **Accessible Lightbox Modal**:
   - Native `<dialog>` element supporting both high-resolution certificates and PDF previews with light-dismiss (click outside) and keyboard `[ESC]` support.
6. **Desktop Cinematic Cursor**:
   - Reactive cursor with contextual action labels (`VIEW`, `OPEN`, `LINK`), automatically disabled on touch devices.
7. **Accessibility & Performance**:
   - Full support for `prefers-reduced-motion: reduce`.
   - Semantic HTML5, ARIA labels, responsive down to 320px mobile screens.

---

## Folder Structure

```
roshan-portfolio/
├── index.html          → Semantic structure, cinematic intro, hero, showcases, modal
├── style.css           → Dark cinematic design system, glassmorphism, 3D tilt, responsive queries
├── script.js           → Canvas engine, intro controller, parallax, cursor, modal logic
├── README.md           → Project documentation
└── assets/
    ├── profile/
    │   ├── roshan-portrait.jpg   → Real suit portrait (hero centerpiece & intro)
    │   ├── roshan.jpeg          → Profile image
    │   └── favicon.png          → Site favicon
    ├── certificates/
    │   ├── fusionx-2026-certificate.jpg        → Real 24h Hackathon 3rd Prize certificate
    │   ├── aws-student-community-day-2026.jpg  → Real AWS Community Day certificate
    │   ├── NM_Certificate.pdf                  → Naan Mudhalvan Certificate 01
    │   ├── NM_Certificate (1).pdf              → Naan Mudhalvan Certificate 02
    │   └── ROSHAN EBINESAR.J (1).pdf           → Internship Certificate
    ├── projects/
    │   └── wolfscanx.png                       → WolfScanX app concept preview
    └── resume/
        └── Roshan_Ebinesar_Resume.pdf          → Official verified resume
```

---

## How to Run Locally

No build tools or heavy node modules needed:

```bash
# Serve with Python locally
python -m http.server 5500
```
Then visit `http://localhost:5500` in your browser.
