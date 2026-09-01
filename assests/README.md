# Russ's Pokémon League OS V7

Upload the contents of this folder to the root of the GitHub Pages repository.

## Supabase
Run the SQL shown inside Sync Center. Use the project URL and publishable key, never a secret key. Use the same Trainer ID on PC and phone.

## Data model
The app stores the full game state as JSON in `trainer_saves`. Local saves are timestamped; cloud pulls only replace local state when the cloud copy is newer.

## Assets
Trainer and rival sprite sheets are in `assets/`. Badge graphics are SVG files in `assets/badges/`.
