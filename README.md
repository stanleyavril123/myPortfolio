# Stanley Avril Portfolio Website

Personal portfolio for Stanley Avril, a software engineering student at Polytechnique Montreal. The site highlights professional experience, technical skills, and selected projects across embedded systems, networked tools, full-stack applications, data pipelines, and AI-assisted automation.

## Features

- Responsive React and Material UI layout
- Recruiter-focused About, Experience, Skills, and Projects sections
- Accessible project cards with detail dialogs
- Resume downloads in English and French
- French/English switching and light/dark themes
- Custom ASCII project artwork and recorded demos inside project details
- Hidden Vim mode: type `:w` and press Enter to open, `:q` and Enter to exit
- Direct email, GitHub, and LinkedIn contact actions

## Technology

- React 18
- Material UI 6
- Vite for development and production builds
- Vitest and React Testing Library for component tests
- GitHub Pages deployment

## Local Development

Use Node.js 20.19+ or 22.12+.

```bash
npm ci
npm start
```

Open `http://localhost:3000` in your browser.

## Production Build

```bash
npm run build
```

## Deployment

Run the checks before publishing:

```bash
npm test
npm run build
```

Publish the build to the `gh-pages` branch:

```bash
npm run deploy
```

The live site is configured for `https://stanleyavril.dev`; `public/CNAME`
preserves that domain in each build. Pushing `main` updates the source;
`npm run deploy` publishes the website.

The publishing script clones `gh-pages` into a temporary directory, commits
only the production build, and pushes normally without rewriting branch
history. It requires Git authentication for `origin` and an existing
`gh-pages` branch. `PAGES_REMOTE` can select a different remote for a local
deployment test.

After building, `npm run test:deploy` verifies publishing against a disposable
local Git repository. It requires Python 3 and never pushes to GitHub.

Editable résumé sources are in `docs/resume`. Demo provenance is documented
in `docs/project-demos.md`. Local environment files, raw phone recordings,
and Python caches are excluded from Git. Only edited demo assets in
`public/demos` are published.
