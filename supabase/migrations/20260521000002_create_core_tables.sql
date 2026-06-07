-- Create core tables for AthleteEats
-- 2026-05-21: core schema for foods, meal_logs, hydration, training, meal_plans, devices

create table if not exists foods (
  id uuid primary key default gen_random_uuid(),
  barcode text unique,
  name text not null,
  brand text,
  calories numeric,
  protein_g numeric,
  carbs_g numeric,
  fats_g numeric,
  fiber_g numeric,
  sodium_mg numeric,
  potassium_mg numeric,
  serving_size_g numeric,
  is_indian_food boolean default false,
  raw jsonb,
  inserted_at timestamptz default now()
);

create table if not exists food_images (
  id uuid primary key default gen_random_uuid(),
  food_id uuid references foods(id) on delete cascade,
  url text not null,
  provider text,
  metadata jsonb,
  created_at timestamptz default now()
);

create table if not exists meal_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  food_id uuid references foods(id),
  quantity numeric default 1,
  meal_type text,
  notes text,
  logged_at timestamptz default now()
);

create table if not exists hydration_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  amount_ml int not null,
  type text,
  logged_at timestamptz default now()
);

create table if not exists training_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  sport text,
  duration_min int,
  intensity text,
  calories_burned numeric,
  logged_at timestamptz default now()
);

create table if not exists meal_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  plan jsonb not null,
  created_at timestamptz default now()
);

create table if not exists devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  provider text not null,
  provider_user_id text,
  access_token text,
  refresh_token text,
  scopes text,
  last_synced timestamptz
);

-- Indexes for common lookups
create index if not exists idx_foods_barcode on foods(barcode);
create index if not exists idx_meallogs_user on meal_logs(user_id);
create index if not exists idx_hydration_user on hydration_logs(user_id);
create index if not exists idx_training_user on training_sessions(user_id);
