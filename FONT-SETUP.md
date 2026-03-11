# Font Setup — NexaGen CT Simulator

The app now uses **local fonts** instead of Google Fonts so they work offline.

## One-time setup (do this once)

1. Create a `fonts/` folder in your repo root.

2. Download these 5 files from Google Fonts and put them in `fonts/`:

   | File to save as | Download from |
   |---|---|
   | `ShareTechMono-Regular.ttf` | https://fonts.google.com/specimen/Share+Tech+Mono → Download family |
   | `Rajdhani-Regular.ttf` | https://fonts.google.com/specimen/Rajdhani → Download family |
   | `Rajdhani-Medium.ttf` | (same download, multiple weights included) |
   | `Rajdhani-SemiBold.ttf` | (same download) |
   | `Rajdhani-Bold.ttf` | (same download) |

   The downloaded zip will contain all the TTF files — just rename and move them into `fonts/`.

3. Commit the `fonts/` folder to GitHub.

## That's it

The service worker (`sw.js`) will automatically cache the font files on first load,
so the app looks correct even when fully offline.

## Why this matters

Previously the fonts were loaded from `fonts.googleapis.com` at runtime.
In offline mode (PWA installed on phone), that request fails and the app
rendered in generic fallback fonts, losing its medical-console aesthetic.
