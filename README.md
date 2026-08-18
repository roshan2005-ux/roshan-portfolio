# Roshan Ebinesar — Developer Portfolio

A modern, premium, dark-themed personal portfolio built with plain HTML, CSS and
JavaScript — no frameworks, no build step. Made to be easy to open in VS Code,
edit, and deploy.

## About

This site introduces Roshan Ebinesar, a Computer Science Engineering student
and Full-Stack Developer, with an additional interest in cybersecurity. It's
built to be realistic and honest: real skills are labeled clearly, in-progress
skills are marked **Learning**, and unfinished projects are marked
**Coming Soon** rather than faked.

## Features

- Sticky glass-effect navbar with active-section highlighting and a mobile menu
- Animated hero section with a typing-effect terminal card and floating tech badges
- About, Skills, Projects, Learning Journey (timeline), Education, and
  Certifications sections
- Certificate lightbox/modal with keyboard (Esc) support
- Scroll-reveal animations, respecting `prefers-reduced-motion`
- Fully responsive from 320px up to large desktops
- No external JS frameworks or CSS libraries — just semantic HTML, modern CSS
  (variables, Flexbox, Grid), and vanilla JavaScript
- Google Fonts (Inter + JetBrains Mono) loaded via `<link>` — the only external
  dependency, used purely for typography

## Technologies

- HTML5 (semantic markup)
- CSS3 (custom properties, Grid, Flexbox, media queries)
- Vanilla JavaScript (IntersectionObserver for reveals/typing/active-nav)

## Folder Structure

```
roshan-portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
│
└── assets/
    ├── profile/        → profile photo, favicon
    ├── projects/        → project screenshots (e.g. wolfscanx.png)
    ├── certificates/     → certificate images (e.g. certificate-01.jpg)
    └── resume/          → Roshan_Ebinesar_Resume.pdf
```

Each `assets/` subfolder contains a `README_PLACEHOLDER.txt` explaining
exactly what to drop in there.

## How to Run Locally

No build tools required.

1. Download or clone the project folder.
2. Open `index.html` directly in a browser, **or** for the best experience
   (so relative paths behave exactly like on a real server), serve it locally:
   ```bash
   # from inside the roshan-portfolio folder
   python3 -m http.server 5500
   ```
   Then visit `http://localhost:5500` in your browser.

## How to Customize

### Profile photo
Add an image to `assets/profile/` and reference it in `index.html` wherever
you'd like to add a photo (e.g. inside `.hero__content` or `.about__grid`).

### Projects
Edit the three `.project-card` blocks inside the `#projects` section in
`index.html`:
- Replace `YOUR_WOLFSCANX_GITHUB_LINK` and `YOUR_WOLFSCANX_LIVE_LINK` with
  real URLs once available.
- Add a screenshot at `assets/projects/wolfscanx.png` (the card already
  points to this path).
- Replace the two `COMING_SOON` project cards with real content once those
  projects are ready — update the heading, description, `chip` tech tags,
  and links.

### Certificates
1. Add certificate images to `assets/certificates/` (e.g. `certificate-01.jpg`).
2. In `index.html`, update each `.cert-card` button's:
   - `data-cert` → path to the image
   - `data-title` → certificate name
   - `data-meta` → platform & year
   - Visible text inside the button (certificate name, platform, year)

### Resume
Place your PDF at `assets/resume/Roshan_Ebinesar_Resume.pdf`. The
**Download Resume** button in the hero section already links to this exact
path — no code changes needed once the file is in place.

### Social links
Search `index.html` for these placeholders and replace them everywhere
they appear (hero, GitHub/LinkedIn cards, contact section, footer):
- `YOUR_GITHUB_URL`
- `YOUR_LINKEDIN_URL`
- `YOUR_EMAIL`

### Colors & fonts
All colors live as CSS variables at the top of `style.css` under `:root`
(`--bg`, `--accent`, etc.) — change them there and the whole site updates.

## What You Need To Change

Before publishing, replace every placeholder below:

- [ ] `YOUR_GITHUB_URL` (hero, GitHub/LinkedIn cards, contact, footer)
- [ ] `YOUR_LINKEDIN_URL` (hero, GitHub/LinkedIn cards, contact, footer)
- [ ] `YOUR_EMAIL` (hero, contact, footer)
- [ ] `assets/resume/Roshan_Ebinesar_Resume.pdf` (add the real file)
- [ ] Profile photo (optional — add to `assets/profile/`)
- [ ] `assets/projects/wolfscanx.png` (WolfScanX screenshot)
- [ ] `YOUR_WOLFSCANX_GITHUB_LINK`
- [ ] `YOUR_WOLFSCANX_LIVE_LINK`
- [ ] Certificate names, platforms, years, and images (3 placeholders)
- [ ] Exact college name / year, if it differs from what's shown in the
      Education section
- [ ] Favicon at `assets/profile/favicon.png`

## Deployment

### GitHub

```bash
# From inside the roshan-portfolio folder
git init
git add .
git commit -m "Initial commit: Roshan Ebinesar portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/roshan-portfolio.git
git push -u origin main
```

Then verify the repository by visiting `https://github.com/YOUR_USERNAME/roshan-portfolio`
and confirming all files (including `assets/`) uploaded correctly.

### GitHub Pages

1. On GitHub, open your `roshan-portfolio` repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
5. Wait a minute, then refresh the page — GitHub will show your live URL
   (usually `https://YOUR_USERNAME.github.io/roshan-portfolio/`).

### Vercel

1. Go to [vercel.com](https://vercel.com) and log in (or create an account)
   using your GitHub account.
2. Click **Add New… → Project**.
3. Select **Import** next to your `roshan-portfolio` GitHub repository.
4. Leave the default settings (no framework preset needed — this is a static
   site) and click **Deploy**.
5. Once deployment finishes, Vercel shows your live URL.
6. To redeploy: every time you `git push` new commits to `main`, Vercel
   automatically rebuilds and redeploys the live site — no extra steps needed.

## Notes

This portfolio intentionally avoids inflated claims (no fake years of
experience, fake companies, or fake statistics). Skills that are still in
progress are labeled **Learning**, and unfinished projects are labeled
**Coming Soon** — update both honestly as your experience grows.
