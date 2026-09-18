# Tracker Source Reliability

Follower-count tracking is only useful when the source and freshness of each value are clear.

## Reliability rules

- Never generate or interpolate follower counts to make the graph look live.
- Store the timestamp of the last verified reading.
- Distinguish a fresh provider response from a cached previous value.
- If the source is unavailable, keep the last verified value and show degraded status instead of replacing it with random data.
- Reject malformed responses before they reach the UI.

## Freshness

The interface should make it possible to understand when the latest successful reading occurred. A frequent client refresh does not mean the upstream source itself updates at the same frequency.

## Validation

Before accepting a reading, verify that the value is numeric, non-negative, plausible for the account, and associated with the expected profile.

## Provider changes

Keep provider-specific parsing isolated so a source change does not require rewriting chart or presentation logic.
