# Russ's Pokémon League OS — V8

Final polished 3-column RPG dashboard build.

## Structure
- `index.html` — application
- `assets/` — trainer, DJ, walking sprites, badges and icons
- `manifest.json` / `sw.js` — PWA support

## GitHub Pages
Upload the contents of this folder to the repository root. `index.html` must be at the root.

## Supabase
Create `public.trainer_saves` with the SQL shown inside Sync Center. Use the project's HTTPS URL and publishable key. Do not put a service-role/secret key in the browser.

## Cache
If an older build remains visible, unregister the old service worker in browser Application settings and reload once.
