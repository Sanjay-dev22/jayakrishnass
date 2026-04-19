create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  collaboration text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

create policy "Anyone can insert messages"
on public.messages
for insert
to anon, authenticated
with check (
  length(name) between 1 and 120
  and length(email) between 3 and 255
  and length(message) between 1 and 5000
);