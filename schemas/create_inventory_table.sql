create table inventory (
    inventory_id int(11)  AUTO_INCREMENT PRIMARY KEY,
    inventory_shipping_date varchar(100),
    inventory_productname varchar(100),
    inventory_sku varchar(100),
    inventory_qtyorderd int(20),
    inventory_damages int(11),
    inventory_user_id int(11)
    createdAt timestamp not null default current_timestamp,
    updatedAt timestamp not null default current_timestamp
);

