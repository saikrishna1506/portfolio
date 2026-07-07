# saikrishna-portfolio

A one-page portfolio for **Chintha Saikrishna** — Computer Science student & full-stack developer — built around a space/mission theme: a starfield backdrop, a rotating wireframe globe with orbiting "achievement satellites" in the hero, and content sections framed as Mission Log (education), Cargo Bay (skills), Launchpad (projects), and Transmissions (competitive-programming badges). Built with Node.js + Express serving a static frontend (vanilla HTML/CSS/JS, no build step).

## Run it

```bash
npm install
npm start
```
##testing....jdkj

Then open **http://localhost:3000**

You can also just open `public/index.html` directly in a browser.

## Project structure

```
portfolio/
├── server.js              Express static server
├── package.json
└── public/
    ├── index.html          Page sections: hero, mission log, cargo, launchpad, transmissions, contact
    ├── css/style.css        Token system (colors, type, spacing) + orbit/starfield animations, fully responsive
    └── js/script.js         Canvas starfield, scroll-reveal (IntersectionObserver), mobile nav toggle
```

## How to customize

- **Colors**: all theme colors are CSS custom properties at the top of `public/css/style.css` (`:root`) — `--accent-nebula` (purple), `--accent-orbit` (cyan-blue), `--accent-flare` (orange, used sparingly), `--accent-star` (yellow, very sparing).
- **Copy/content**: edit directly in `public/index.html` — each section is clearly commented (`<!-- HERO -->`, `<!-- MISSION LOG -->`, etc).
- **Orbiting satellites**: in the hero, each satellite is a `.orbit-path > .satellite` pair in `index.html`; add/remove `.orbit-N` classes (durations and radii are defined in `style.css`) to add more.
- **Starfield density/speed**: tune the `count` calculation and `speed`/`baseAlpha` ranges near the top of `public/js/script.js`.
- **Reduced motion**: all animations (globe spin, orbits, starfield twinkle, scroll reveals) are disabled automatically for users with `prefers-reduced-motion` set.

## Deploying

Standard Express app — deploys as-is to Render, Railway, Fly.io, or a basic VPS. For Vercel/Netlify you can skip `server.js` entirely and deploy the `public/` folder as a static site.
