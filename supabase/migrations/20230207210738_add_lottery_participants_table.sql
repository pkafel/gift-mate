create table lottery_participants(
    id serial primary key,
    name text,
    lottery_id bigint,
    gift_to_user_id bigint,
    nonce text,
    created_at timestamp with time zone default now(),
    CONSTRAINT fk_lottery_id foreign key (lottery_id) references lotteries(id)
);
