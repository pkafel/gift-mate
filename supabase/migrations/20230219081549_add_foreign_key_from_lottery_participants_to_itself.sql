alter table lottery_participants add constraint fk_id foreign key(gift_to_user_id) references lottery_participants(id);
