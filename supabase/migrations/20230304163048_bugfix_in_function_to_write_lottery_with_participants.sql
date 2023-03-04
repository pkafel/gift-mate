create or replace function add_lottery_with_participants(name_arg text, description_arg text, participants_arg text)
returns uuid
language plpgsql
as $$
declare
  new_row bigint;
  participants_after_split text[] = string_to_array(participants_arg, ',');
  participant text;
  participant_ids bigint[];
  number_of_participants int = array_length(participants_after_split, 1);
  shift int = floor(random() * (number_of_participants - 1) + 1)::int;
  shareable_lottery_uuid uuid = uuid_generate_v4();
begin
  insert into lotteries(name, description, lottery_uuid)
  values (name_arg, description_arg, shareable_lottery_uuid)
  returning id into new_row;

  foreach participant in array participants_after_split loop
    insert into lottery_participants(name, lottery_id, nonce) 
    values(btrim(participant), new_row, substr(md5(random()::text), 0, 8));
  end loop;

  select array_agg(id) into participant_ids from lottery_participants where lottery_id=new_row order by random();

  for i in 1 .. array_upper(participant_ids, 1)
  loop
    -- The bug was in calculating index of assigned user - in previous version it was i+shift
    update lottery_participants set gift_to_user_id=participant_ids[((i+shift-1) % number_of_participants)+1] where id=participant_ids[i];
  end loop;

  return shareable_lottery_uuid;
end;
$$;
