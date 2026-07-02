# Dad's Challenge Board

A fun, interactive, and eye-catching client-side dashboard for Dad's challenges! Tailored specifically for Pierce (11) and Graham (13) to log their completions, view details, and track points.

## How to Run

Since the application is client-side only with no external server requirements, you can run it in a few simple ways:

1. **Directly double-click** `index.html` to open it in any web browser.
2. **Serve it locally** (recommended) using any static file server:
   - Python: `python3 -m http.server 8000` (then open `http://localhost:8000`)
   - Node: `npx serve .`

## How to Add/Remove Challenges

To update the challenge list, simply edit the [challenges.js](file:///Users/ww1999/Documents/GitHub/dashboard/challenges.js) file. Each challenge is an object in the `CHALLENGES` array:

```javascript
{
  id: "unique-slug",
  title: "Challenge Name",
  points: 15,
  description: "Description of what they need to do for the challenge."
}
```

Point calculations and status checks will automatically update based on this array.

## Credentials

The logins are hardcoded in the application:
* **Pierce**: username `pierce` / password `password`
* **Graham**: username `graham` / password `password`
