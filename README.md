# Russ's Pokémon League OS — Final 90s Edition

A self-contained retro RPG life tracker for GitHub Pages.

## Included
- Russ and DJ use the supplied sprite sheets from this build.
- Eight SVG badges plus a shield-style League coat of arms.
- Six-player Pokémon team with staged evolution.
- Froakie → Frogadier → Greninja → Ash-Greninja.
- DJ's team is level-scaled and does not begin fully evolved.
- Friends have gender, three-word trait input, auto-assigned teams, editable profiles and optional custom sprite uploads.
- Unlimited editable monthly goals.
- Objectives can award XP to multiple badges simultaneously.
- Journal / field log.
- Item inventory with quantities.
- Reward shop with real XP redemption.
- Persistent local save.
- Supabase cloud save, automatic push and six-second polling for PC ↔ phone sync.
- Green ONLINE indicator when the Supabase connection is verified.

## GitHub Pages structure
Keep `index.html`, `manifest.json`, and `sw.js` in the repository root. Keep all artwork inside `assets/`.

## Supabase
Create `public.trainer_saves` with:

```sql
create table if not exists public.trainer_saves (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.trainer_saves enable row level security;
create policy "league_select" on public.trainer_saves for select to anon using (true);
create policy "league_insert" on public.trainer_saves for insert to anon with check (true);
create policy "league_update" on public.trainer_saves for update to anon using (true) with check (true);
```

In the app's SYNC page, enter your Supabase Project URL, publishable/anon key and the same Trainer ID on each device.

### Pokémon artwork
The app loads Pokémon artwork from PokeAPI's public sprite repository. If an artwork request fails, the app displays a local placeholder instead of a broken image.
