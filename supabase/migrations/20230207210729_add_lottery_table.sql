create table lotteries(
    id serial primary key,
    name text,
    description text,
    loterry_uuid uuid default uuid_generate_v4(),
    created_at timestamp with time zone default now()
);
