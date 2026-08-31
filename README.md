# Russ's Pokémon League OS — 90s Edition

This build is a retro 1990s operating-system-style Pokémon life RPG. It uses the supplied Russ and DJ sprite sheets, original SVG badge/emblem artwork, a persistent local save, a journal log, monthly objectives, rewards, inventory, a rival module, friend journeys, and optional Supabase cloud sync.

## Supabase setup

In Supabase SQL Editor, run:

```sql
create table if not exists public.trainer_saves (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.trainer_saves enable row level security;

drop policy if exists league_select on public.trainer_saves;
drop policy if exists league_insert on public.trainer_saves;
drop policy if exists league_update on public.trainer_saves;

create policy league_select on public.trainer_saves
for select to anon using (true);

create policy league_insert on public.trainer_saves
for insert to anon with check (true);

create policy league_update on public.trainer_saves
for update to anon using (true) with check (true);
```

Then put the Project URL and publishable/anon key into the SYNC page. Never put a secret/service-role key in the browser app.

## Deployment

Upload the contents of this folder to a GitHub repository's `main` branch, keeping the `assets/` folder intact. Enable GitHub Pages from `main` / `(root)`.

## Friend sprites

The Friends page accepts an image file for each friend and stores it with the save. The supplied sprite sheets are also kept in `assets/` so more crops/sprites can be added later.
