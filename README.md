# ScoutOP Follower Tracker

A minimal Next.js follower tracker focused on one job: showing ScoutOP's latest available Instagram follower count and the change observed during the current tracking session.

## What it shows

- Latest available follower count
- Growth since the current tracking session started
- Source status: live, cached, or retrying
- Time of the latest verified update
- Automatic refresh attempts every 15 seconds

## Important data note

The interface only displays values returned by the application's `/api/count` endpoint. If the upstream source is unavailable, the UI keeps the last verified value and clearly switches status instead of inventing second-by-second follower growth.

## Tech stack

- Next.js 15
- React 19
- JavaScript
- Next.js App Router

## Project structure

```text
app/
├── api/          Follower-count API route
├── globals.css   Tracker styling
├── layout.js     App metadata and root layout
└── page.js       Main tracker interface

package.json      Project scripts and dependencies
README.md         Project overview
```

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

## How tracking works

1. The page requests `/api/count` when it loads.
2. The first verified count becomes the session baseline.
3. The app checks the source again every 15 seconds.
4. A valid response updates the displayed count and verification time.
5. Growth is calculated as the latest verified count minus the session baseline.
6. If the request fails, the last verified count remains visible and the status changes to `retrying`.

## Design goal

The project intentionally avoids unrelated dashboards and vanity metrics. The interface stays compact so the follower count, observed growth, and source reliability are immediately understandable.
