# Tracker Data Integrity

The tracker should prefer trustworthy, explainable data over artificial real-time precision.

## Source rules

- Use a legitimate source that is permitted to provide the follower count.
- Keep the source implementation separate from presentation logic.
- Do not invent intermediate counts between verified readings.
- Clearly distinguish live, cached, stale, and unavailable states.

## Count handling

- Accept a reading only when it is numeric and passes basic validation.
- Preserve the last verified reading when a refresh fails.
- Never treat a failed request as follower loss.
- Record timestamps for verified readings when persistence is added.

## Growth calculations

Growth should compare verified observations. A session baseline is useful for display, but long-term history should use persisted timestamped readings rather than browser-only state.

## Failure behavior

When a source is unavailable, show that status clearly and retry at a reasonable interval. Avoid rapidly polling third-party services or implying second-by-second accuracy when the upstream source does not provide it.

## Privacy and credentials

Keep provider credentials server-side and out of the repository. Do not collect or expose unrelated Instagram account data merely to display a follower count.
