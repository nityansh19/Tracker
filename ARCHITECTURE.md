# Tracker Architecture

## Goal

Keep the tracker simple, transparent, and honest about the quality of its follower-count source.

The application should never simulate follower movement when the upstream source is unavailable.

## Request flow

```text
Browser
   │
   └── GET /api/count
           │
           └── follower data source
                   │
                   ├── valid response → return followers + source state
                   └── failure        → surface unavailable/cached behavior
```

## Client behavior

`app/page.js` handles the visible tracking session.

1. Request the follower count when the page loads.
2. Store the first verified value as the session baseline.
3. Re-check `/api/count` every 15 seconds.
4. Update the count only when a valid numeric value is returned.
5. Calculate session growth from the baseline.
6. Keep the last verified value if the source temporarily fails.
7. Show the current source state as `live`, `cached`, or `retrying`.

## Main files

```text
app/page.js       Tracker state, refresh loop, and UI
app/api/          Server-side follower-count endpoint
app/globals.css   Visual styling
app/layout.js     Root layout and metadata
```

## Data rules

- Do not manufacture per-second growth.
- Do not replace a failed request with a random value.
- Keep the last verified count visible during temporary failures.
- Make source reliability visible to the user.
- Keep upstream credentials or private integration details server-side.

## Scope

This repository is intentionally a focused tracker, not a full social analytics platform. Additional features should only be added when they improve follower-growth visibility or source reliability without cluttering the interface.
