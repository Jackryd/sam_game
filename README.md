# Dealbreakers

A pass-the-phone party game. Add the players, add a pile of traits, then pass
the phone around: each turn shows a trait to whoever's up, and they swipe (or
tap) to decide if it's a dealbreaker — which clears everything they've kept
so far — or a keeper, which adds it to their pile. Every trait is shown
exactly once. Whoever's still holding the most traits at the end wins.

Built with Vite + React + Tailwind CSS + Framer Motion (for the swipeable
card).

## Develop

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds and publishes the app on
every push to `main`. One-time setup after pushing this repo to GitHub:

1. Go to the repo's **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` (or re-run the workflow from the **Actions** tab).

The site will be published at `https://<your-username>.github.io/<repo-name>/`.
No changes are needed for the repo name — `vite.config.js` uses a relative
`base` so the build works at any subpath.
