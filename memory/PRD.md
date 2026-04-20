# PITCH11 — Cricket Team Manager · PRD

## Original problem statement
Build a modern, responsive cricket team management web app hostable on GitHub
Pages (static only). Three core flows: **Add Player** · **Players list** ·
**Generate Teams**. Dark-green cricket palette. Mobile-first. localStorage
persistence. Rating slider. Balanced team generation (<5% diff).

## Architecture & tech
- **Stack:** React (CRA) + TailwindCSS + shadcn/ui, no backend.
- **Persistence:** `localStorage` — keys `cricket_players_v1`,
  `cricket_seeded_v1`, `cricket_theme_v1`.
- **Routing:** none (tabs-only single page) → works at any sub-path.
- **Deployment:** `"homepage": "."` in package.json ⇒ relative assets.
  README covers `gh-pages` deploy.

## User personas
- **Captain / organiser** of a pick-up cricket team who wants to add players,
  mark who's showing up today, and split them into fair teams in 10 seconds.

## Core requirements (static)
- Add player with name / skill (Batsman, Bowler, WK, All-Rounder) / rating 1–100.
- List players with search, edit, delete.
- Toggle availability per player, pick 2–4 teams, greedy+swap balancer.
- Balance Δ% under 5% on spec dataset (currently **0.19%** for 3 teams,
  **0% / 0.5%** for 2 / 4 teams).
- Dark/light toggle, confetti burst, reset teams, sticky bottom nav,
  iPhone safe-area padding.

## Implemented (Feb 2026)
- [x] App shell with 3-tab sticky bottom nav + theme toggle header
- [x] 20-player seed on first mount (lazy `useState` init, StrictMode-safe)
- [x] Add-player form with skill chips + 1–100 slider + toast
- [x] Players list with rating badges, skill badges, search, edit dialog, delete
- [x] Availability checkboxes + select-all / clear-all
- [x] Team generator: 2/3/4-team balancer (greedy + pairwise-swap refinement)
- [x] Team result cards (gradient green, gold totals, player list)
- [x] Confetti + balance-diff chip + reset button
- [x] Light/dark theme with persistence
- [x] localStorage persistence across reloads
- [x] `homepage: "."` for GitHub Pages sub-path hosting
- [x] README with full deploy instructions

## Files of note
- `frontend/src/App.js` — tab shell + lazy seed init
- `frontend/src/components/cricket/*` — feature components
- `frontend/src/lib/teamBalancer.js` — greedy + 2-opt swap refinement
- `frontend/src/lib/seedData.js` — 20-player user dataset
- `frontend/src/index.css` — cricket palette, fonts, bottom-nav, team cards

## Backlog
- P1: Export teams as image/share link
- P1: Per-skill balancing constraint (ensure each team has ≥1 WK, ≥1 bowler)
- P2: Match history / past team snapshots
- P2: CSV import/export of squad
- P2: Random captain / vice-captain picker per team

## Test credentials
N/A — no auth, fully client-side.
