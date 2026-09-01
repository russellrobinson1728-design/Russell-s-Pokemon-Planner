# Russ's Pokémon League OS — V5

A standalone 90s/early-2000s Pokémon-inspired personal RPG dashboard.

## Deploy
Upload the contents of this folder to the GitHub Pages branch/repository root.

## Supabase sync
1. Create a Supabase project.
2. Open SQL Editor.
3. Run the SQL shown in the app's Sync Center.
4. Copy the Project URL and publishable key from Settings → API Keys.
5. Enter the same URL, key and Trainer ID on PC and phone.
6. On the device containing the newest save, press PUSH LOCAL. On the other device press PULL CLOUD once. Auto-sync then checks for newer cloud data.

Never put a Supabase secret/service-role key in this app. Use the publishable/anon key only.

## Assets
Trainer sprite sheets and app icons live in `assets/`. Friend sprites can be uploaded later from the Friends page.
