# Tracker Operations

This guide describes expected runtime behavior for the deployed follower tracker.

## Normal operation

The client periodically requests the count endpoint. The endpoint returns the latest verified value plus enough status information for the UI to distinguish live, cached, and unavailable states.

## Failure behavior

If the upstream source times out or returns invalid data:

1. Do not overwrite the last verified reading.
2. Return a clear degraded status.
3. Avoid rapid retry loops that could amplify provider failures.
4. Recover automatically on a later successful request.

## Monitoring signals

Useful signals include provider success rate, last successful fetch time, response latency, invalid-response count, and cache age.

## Deployment checks

After deployment, verify the count endpoint directly, load the dashboard in a fresh session, confirm the refresh cycle, and simulate or inspect an upstream failure path.

The tracker should prefer stale-but-verified data over fresh-looking fabricated data.
