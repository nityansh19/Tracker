# Tracker Testing Guide

## Display

- Verify the follower count uses Indian number formatting consistently.
- Check positive, zero, and negative growth presentation.
- Confirm loading, cached, retrying, and live status states are readable.
- Test the layout on narrow mobile and desktop widths.

## Data refresh

- Verify a successful response updates the count and timestamp.
- Verify an invalid response does not replace the last verified count.
- Simulate a failed request and confirm the UI enters a retrying state without showing false follower loss.
- Confirm the refresh interval does not create duplicate timers after navigation or hot reload.

## API boundary

- Reject malformed upstream data.
- Keep provider errors from exposing private configuration.
- Confirm cache behavior is intentional and documented.

## Before deployment

Run a production build, test the tracker with the provider available and unavailable, and inspect the deployed network responses to confirm credentials are not exposed to the browser.
